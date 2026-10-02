"use client"

import { Clock, CheckCircle2, Trash2 } from "lucide-react"
import { togglePublishPostForm, deletePostForm } from "@/actions/cms-actions"
import { useTransition } from "react"

interface ActionButtonsProps {
  post: {
    id: string
    published: boolean
  }
}

export default function ActionButtons({ post }: ActionButtonsProps) {
  const [isPending, startTransition] = useTransition()

  const handleTogglePublish = () => {
    if (!confirm(`Are you sure you want to ${post.published ? "unpublish" : "publish"} this post?`)) {
      return
    }

    startTransition(async () => {
      const formData = new FormData()
      formData.append("id", post.id)
      await togglePublishPostForm(formData)
    })
  }

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return
    }

    startTransition(async () => {
      const formData = new FormData()
      formData.append("id", post.id)
      await deletePostForm(formData)
    })
  }

  const actionClass = "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-muted text-content-muted transition-colors hover:bg-accent hover:text-content-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"

  return (
    <div className="flex items-center justify-end gap-2 transition-opacity">
      <button
        type="button"
        onClick={handleTogglePublish}
        disabled={isPending}
        className={`${actionClass} hover:border-success/40 hover:bg-success-muted hover:text-success`}
        title={post.published ? "Unpublish" : "Publish"}
        aria-label={post.published ? "Unpublish post" : "Publish post"}
      >
        {post.published ? <Clock className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
      </button>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className={`${actionClass} hover:border-error/40 hover:bg-error-muted hover:text-error`}
        title="Remove Archive"
        aria-label="Delete post"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}
