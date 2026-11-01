"use client"

import { useEditor, EditorContent, ReactRenderer } from "@tiptap/react"
import { Extension } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import { Table } from "@tiptap/extension-table"
import { TableRow } from "@tiptap/extension-table-row"
import { TableCell } from "@tiptap/extension-table-cell"
import { TableHeader } from "@tiptap/extension-table-header"
import { TaskList } from "@tiptap/extension-task-list"
import { TaskItem } from "@tiptap/extension-task-item"
import { Typography } from "@tiptap/extension-typography"
import Suggestion from "@tiptap/suggestion"
import tippy, { Instance } from 'tippy.js'
import 'tippy.js/dist/tippy.css'

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Type,
  Clock,
  Table as TableIcon,
  CheckSquare,
  Layout
} from "lucide-react"
import React, { useState, useEffect } from "react"
import { CommandList, getSuggestionItems } from "./editor/extensions/SlashCommandItems"
import MediaLibraryModal from "./MediaLibraryModal"

interface EditorProps {
  content: string
  onChange: (content: string) => void
}

// CUSTOM SLASH COMMAND EXTENSION FOR ELITE CMS
const SlashCommand = Extension.create({
  name: "slashCommand",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }: any) => {
          props.command({ editor, range })
        },
      },
    }
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})

const Editor = ({ content, onChange }: EditorProps) => {
  const [wordCount, setWordCount] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc list-outside leading-relaxed space-y-2',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal list-outside leading-relaxed space-y-2',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-brand pl-6 py-2 italic font-serif text-content-secondary bg-brand-muted my-6 rounded-r-xl',
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class: 'rounded-xl bg-surface-muted p-6 font-mono text-sm border border-border my-6 text-content-primary',
          },
        },
      }),
      Underline,
      Typography,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-brand underline underline-offset-4 font-bold hover:text-brand-hover transition-colors',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-2xl border border-border shadow-lg my-10 mx-auto block max-w-full',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full my-8 bg-surface rounded-xl overflow-hidden',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border-b border-border-subtle last:border-0',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'bg-surface-muted font-bold text-brand text-xs uppercase tracking-widest p-4 text-left font-sans',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'p-4 text-sm text-content-secondary font-serif border-r border-border-subtle last:border-0',
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: 'not-prose pl-2 space-y-4 my-8',
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'flex items-start gap-4',
        },
      }),
      Placeholder.configure({
        placeholder: "Type '/' to see your Elite widget library...",
      }),
      SlashCommand.configure({
        suggestion: {
          items: getSuggestionItems,
          render: () => {
            let component: any
            let popup: any

            return {
              onStart: (props: any) => {
                component = new ReactRenderer(CommandList, {
                  props,
                  editor: props.editor,
                })

                if (!props.clientRect) {
                  return
                }

                popup = tippy("body", {
                  getReferenceClientRect: props.clientRect,
                  appendTo: () => document.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: "manual",
                  placement: "bottom-start",
                })
              },

              onUpdate(props: any) {
                component.updateProps(props)

                if (!props.clientRect) {
                  return
                }

                popup[0].setProps({
                  getReferenceClientRect: props.clientRect,
                })
              },

              onKeyDown(props: any) {
                if (props.event.key === "Escape") {
                  popup[0].hide()
                  return true
                }
                return component.ref?.onKeyDown(props)
              },

              onExit() {
                popup[0].destroy()
                component.destroy()
              },
            }
          },
        },
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
      
      const text = editor.getText()
      const words = text.split(/\s+/).filter(word => word.length > 0)
      setWordCount(words.length)
      setReadingTime(Math.ceil(words.length / 200))
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[600px] font-serif leading-relaxed text-content-secondary px-4 md:px-12 py-12 selection:bg-brand/20",
      },
    },
  })

  // Set initial stats
  useEffect(() => {
    if (editor) {
      const text = editor.getText()
      const words = text.split(/\s+/).filter(word => word.length > 0)
      setWordCount(words.length)
      setReadingTime(Math.ceil(words.length / 200))
    }
  }, [editor])

  if (!editor) return null

  const addImage = () => {
    setShowMediaLibrary(true)
  }

  const handleMediaSelect = (mediaUrl: string) => {
    editor.chain().focus().setImage({ src: mediaUrl }).run()
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href
    const url = window.prompt("Methodology Link URL", previousUrl)
    if (url === null) return
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  return (
    <div className="w-full bg-surface/30 border border-border rounded-[32px] overflow-hidden shadow-2xl flex flex-col anim-fade border-dashed hover:border-brand/20 transition-all">
      {/* Visual Indicator: Slash Menu Hint */}
      <div className="bg-brand/5 px-8 pt-6 pb-2">
         <p className="text-[10px] font-bold text-brand uppercase tracking-widest flex items-center gap-2">
           <Layout className="w-3 h-3" /> Core Canvas Block
         </p>
      </div>

      {/* Premium Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 md:p-6 bg-surface/40 border-b border-border">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-3 rounded-2xl transition-all ${editor.isActive("bold") ? "text-brand bg-brand/10 shadow-inner" : "text-content-muted hover:text-content-primary"}`}
            title="Bold"
          >
            <Bold className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-3 rounded-2xl transition-all ${editor.isActive("italic") ? "text-brand bg-brand/10" : "text-content-muted hover:text-content-primary"}`}
            title="Italic"
          >
            <Italic className="w-5 h-5" />
          </button>
          
          <div className="w-px h-6 bg-border-subtle mx-2" />

          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-3 rounded-2xl transition-all ${editor.isActive("heading", { level: 1 }) ? "text-brand bg-brand/10" : "text-content-muted hover:text-content-primary"}`}
            title="H1"
          >
            <Heading1 className="w-5 h-5" />
          </button>
          
          <div className="w-px h-6 bg-border-subtle mx-2" />

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-3 rounded-2xl transition-all ${editor.isActive("bulletList") ? "text-brand bg-brand/10" : "text-content-muted hover:text-content-primary"}`}
            title="Bullets"
          >
            <List className="w-5 h-5" />
          </button>

          <button
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            className="p-3 rounded-2xl transition-all text-content-muted hover:text-brand hover:bg-accent"
            title="Insert Table"
          >
            <TableIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={`p-3 rounded-2xl transition-all ${editor.isActive("taskList") ? "text-brand bg-brand/10" : "text-content-muted hover:text-content-primary"}`}
            title="Task List"
          >
            <CheckSquare className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-border-subtle mx-2" />

          <button
            onClick={setLink}
            className={`p-3 rounded-2xl transition-all ${editor.isActive("link") ? "text-brand bg-brand/10" : "text-content-muted hover:text-content-primary"}`}
            title="Methodology Link"
          >
            <LinkIcon className="w-5 h-5" />
          </button>
          <button
            onClick={addImage}
            className="p-3 rounded-2xl transition-all text-content-muted hover:text-content-primary"
            title="Visual Media"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 bg-surface-muted p-2 rounded-2xl border border-border-subtle">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-xl">
            <Clock className="w-4 h-4 text-brand" />
            <span className="text-[10px] font-bold text-content-secondary uppercase leading-none">{readingTime} MIN READ</span>
          </div>
          <div className="flex items-center gap-1.5 pr-2">
            <span className="text-[10px] font-bold text-brand uppercase leading-none tracking-tighter">{wordCount} WORDS</span>
          </div>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 bg-surface">
        <EditorContent editor={editor} />
      </div>

      {/* Bubble Menu for quick formatting - temporarily disabled due to import issues */}
      {/* {editor && (
        <BubbleMenu editor={editor} options={{ offset: 12 }} className="flex bg-surface border border-border rounded-2xl overflow-hidden shadow-lg anim-fade-up border-border p-1 gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-3 rounded-xl transition-all ${editor.isActive("bold") ? "text-brand bg-brand/10" : "text-content-secondary hover:bg-accent hover:text-content-primary"}`}
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-3 rounded-xl transition-all ${editor.isActive("italic") ? "text-brand bg-brand/10" : "text-content-secondary hover:bg-accent hover:text-content-primary"}`}
          >
            <Italic className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-border-subtle my-auto mx-1" />
          <button
            onClick={setLink}
            className={`p-3 rounded-xl transition-all ${editor.isActive("link") ? "text-brand bg-brand/10" : "text-content-secondary hover:bg-accent hover:text-content-primary"}`}
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </BubbleMenu>
      )} */}

      <MediaLibraryModal
        isOpen={showMediaLibrary}
        onClose={() => setShowMediaLibrary(false)}
        onSelect={handleMediaSelect}
      />
    </div>
  )
}

export default Editor
