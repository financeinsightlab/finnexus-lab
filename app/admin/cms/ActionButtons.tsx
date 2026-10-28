"use client"

import { Clock, CheckCircle2, Trash2, Eye, ThumbsUp, Archive, RotateCcw } from "lucide-react"
import { togglePublishPostForm, deletePostForm, transitionContentStatusForm } from "@/actions/cms-actions"
import { useTransition } from "react"
import { useRouter } from "next/navigation"

interface ActionButtonsProps {
  post: {
    id: string
    published: boolean
    contentStatus?: string | null
    title?: string
  }
}

/** PART C — workflow actions on the existing contentStatus column. */
export default function ActionButtons({ post }: ActionButtonsProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const status = (post.contentStatus || (post.published ? "PUBLISHED" : "DRAFT")).toUpperCase()

  const run = (fn: () => Promise<void>) =>
    startTransition(async () => {
      await fn()
      router.refresh()
    })

  const handleTogglePublish = () => {
    if (!confirm(`Are you sure you want to ${post.published ? "unpublish" : "publish"} this post?`)) return
    run(async () => {
      const formData = new FormData()
      formData.append("id", post.id)
      await togglePublishPostForm(formData)
    })
  }

  const handleTransition = (next: string, label: string) => {
    if (!confirm(`Move "${post.title || "this post"}" to ${label}?`)) return
    run(async () => {
      const formData = new FormData()
      formData.append("id", post.id)
      formData.append("next", next)
      await transitionContentStatusForm(formData)
    })
  }

  const handleDelete = () => {
    if (!confirm("Are you sure you want to permanently delete this post? Prefer Archive to keep it recoverable.")) return
    run(async () => {
      const formData = new FormData()
      formData.append("id", post.id)
      await deletePostForm(formData)
    })
  }

  const actionClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-muted text-content-muted transition-colors hover:bg-accent hover:text-content-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"

  return (
    <div className="flex items-center justify-end gap-2 transition-opacity">
      {status === "DRAFT" && (
        <button type="button" onClick={() => handleTransition("REVIEW", "In Review")} disabled={isPending}
          className={`${actionClass} hover:border-warning/40 hover:bg-warning-muted hover:text-warning`}
          title="Send to Review" aria-label="Send post to review"><Eye className="h-4 w-4" /></button>
      )}
      {status === "REVIEW" && (
        <button type="button" onClick={() => handleTransition("APPROVED", "Approved")} disabled={isPending}
          className={`${actionClass} hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-500`}
          title="Approve for publish" aria-label="Approve post"><ThumbsUp className="h-4 w-4" /></button>
      )}
      {status === "REVIEW" && (
        <button type="button" onClick={() => handleTransition("DRAFT", "Draft (changes requested)")} disabled={isPending}
          className={actionClass} title="Request changes (back to Draft)" aria-label="Send back to draft"><RotateCcw className="h-4 w-4" /></button>
      )}
      {status === "ARCHIVED" && (
        <button type="button" onClick={() => handleTransition("DRAFT", "Draft (restore)")} disabled={isPending}
          className={actionClass} title="Restore to Draft" aria-label="Restore archived post"><RotateCcw className="h-4 w-4" /></button>
      )}
      {status !== "ARCHIVED" && (
        <button type="button" onClick={handleTogglePublish} disabled={isPending}
          className={`${actionClass} hover:border-success/40 hover:bg-success-muted hover:text-success`}
          title={post.published ? "Unpublish" : "Publish"} aria-label={post.published ? "Unpublish post" : "Publish post"}>
          {post.published ? <Clock className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
        </button>
      )}
      {status !== "ARCHIVED" && (
        <button type="button" onClick={() => handleTransition("ARCHIVED", "Archived")} disabled={isPending}
          className={actionClass} title="Archive (keeps record, removes from site)" aria-label="Archive post"><Archive className="h-4 w-4" /></button>
      )}
      <button type="button" onClick={handleDelete} disabled={isPending}
        className={`${actionClass} hover:border-error/40 hover:bg-error-muted hover:text-error`}
        title="Permanently delete" aria-label="Delete post"><Trash2 className="h-4 w-4" /></button>
    </div>
  )
}
