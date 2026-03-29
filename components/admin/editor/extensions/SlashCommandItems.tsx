"use client"

import React, { 
  forwardRef, 
  useEffect, 
  useImperativeHandle, 
  useState 
} from "react"
import { 
  Type, 
  Heading1, 
  Heading2, 
  List, 
  ListOrdered, 
  Quote, 
  CheckSquare, 
  Table as TableIcon,
  MousePointer2,
  Layout,
  ChevronDown
} from "lucide-react"

export const CommandList = forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = props.items[index]
    if (item) {
      props.command(item)
    }
  }

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [props.items])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === "ArrowUp") {
        upHandler()
        return true
      }
      if (event.key === "ArrowDown") {
        downHandler()
        return true
      }
      if (event.key === "Enter") {
        enterHandler()
        return true
      }
      return false
    },
  }))

  return (
    <div className="bg-[#1A1F2E] border border-[#2D3748] rounded-2xl shadow-2xl overflow-hidden min-w-[280px] anim-fade-up">
      <div className="p-2 border-b border-white/5 bg-white/5">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 py-1">Widget Library</p>
      </div>
      <div className="p-1 max-h-[400px] overflow-y-auto no-scrollbar">
        {props.items.length ? (
          props.items.map((item: any, index: number) => (
            <button
              key={index}
              onClick={() => selectItem(index)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                index === selectedIndex ? "bg-[#0D6E6E] text-white" : "text-slate-400 hover:bg-white/5"
              }`}
            >
              <div className={`p-2 rounded-lg ${index === selectedIndex ? "bg-white/20" : "bg-white/5 text-slate-500"}`}>
                {item.icon}
              </div>
              <div>
                <p className="text-xs font-bold">{item.title}</p>
                <p className={`text-[10px] ${index === selectedIndex ? "text-white/70" : "text-slate-600"}`}>
                  {item.description}
                </p>
              </div>
            </button>
          ))
        ) : (
          <div className="p-4 text-center text-xs text-slate-500">No widgets found</div>
        )}
      </div>
    </div>
  )
})

CommandList.displayName = "CommandList"

export const getSuggestionItems = ({ query }: { query: string }) => {
  return [
    {
      title: "Heading 1",
      description: "Large consultancy header",
      icon: <Heading1 className="w-4 h-4" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run()
      },
    },
    {
      title: "Heading 2",
      description: "Section subdivision",
      icon: <Heading2 className="w-4 h-4" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run()
      },
    },
    {
      title: "Bullet List",
      description: "Simple bullet points",
      icon: <List className="w-4 h-4" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run()
      },
    },
    {
        title: "Table",
        description: "High-density data grid",
        icon: <TableIcon className="w-4 h-4" />,
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        },
    },
    {
      title: "Task List",
      description: "Methodology checklist",
      icon: <CheckSquare className="w-4 h-4" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run()
      },
    },
    {
      title: "Quote",
      description: "Executive summary callout",
      icon: <Quote className="w-4 h-4" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).toggleBlockquote().run()
      },
    },
    {
      title: "Elite Button",
      description: "Call to action widget",
      icon: <MousePointer2 className="w-4 h-4" />,
      command: ({ editor, range }: any) => {
        editor.chain().focus().deleteRange(range).insertContent('<p><a href="#" class="btn-primary inline-flex">Click Here</a></p>').run()
      },
    },
    {
        title: "Accent Box",
        description: "Emphasized methodology note",
        icon: <Layout className="w-4 h-4" />,
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).insertContent('<div style="background: rgba(13, 110, 110, 0.1); border-left: 4px solid #0D6E6E; padding: 1.5rem; border-radius: 0.75rem; color: #cbd5e1;"><p><strong>Key Insight:</strong> Enter your expert analysis here...</p></div>').run()
        },
      },
  ].filter(item => item.title.toLowerCase().startsWith(query.toLowerCase()))
}
