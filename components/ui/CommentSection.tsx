import React from "react"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { addCommentAction, deleteCommentAction } from "@/actions/comment-actions"
import { VerificationBadge } from "./VerificationBadge"

export async function CommentSection({ postId, predictionId, currentPath }: { postId?: string, predictionId?: string, currentPath: string }) {
  const session = await auth()

  // Fetch comments
  const comments = await prisma.comment.findMany({
    where: {
      ...(postId ? { postId } : {}),
      ...(predictionId ? { predictionId } : {})
    },
    include: {
      author: {
        select: { id: true, name: true, role: true, customBadge: true, image: true }
      }
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-8 mt-12 pt-12 border-t border-white/10">
      <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
        💬 Community Discussion <span className="text-sm font-bold text-slate-500 ml-2">({comments.length})</span>
      </h3>

      {/* Comment Input */}
      {session?.user ? (
        <form action={addCommentAction} className="relative">
          <input type="hidden" name="postId" value={postId || ""} />
          <input type="hidden" name="predictionId" value={predictionId || ""} />
          <input type="hidden" name="path" value={currentPath} />
          <textarea
            name="content"
            required
            rows={3}
            placeholder="Share your insights..."
            className="w-full bg-[#1A1F2E]/50 border border-white/10 rounded-2xl p-4 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-[#0D6E6E] focus:ring-1 focus:ring-[#0D6E6E] resize-none transition-all"
          />
          <div className="absolute bottom-3 right-3">
            <button type="submit" className="px-4 py-2 bg-white text-black hover:bg-slate-200 rounded-xl text-xs font-bold transition-colors">
              Post Comment
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 rounded-2xl bg-[#1A1F2E]/50 border border-white/5 text-center">
          <p className="text-slate-400 text-sm">You must be logged in to participate in the discussion.</p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0D6E6E] to-teal-400 flex items-center justify-center shrink-0 overflow-hidden border border-white/10">
              {comment.author.image ? (
                <img src={comment.author.image} alt={comment.author.name || "User"} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold text-sm">{comment.author.name?.[0] || "?"}</span>
              )}
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-white text-sm">{comment.author.name || "Anonymous"}</span>
                  <VerificationBadge role={comment.author.role} customBadge={comment.author.customBadge} />
                </div>
                
                {/* Delete Button (Owner or Admin) */}
                {session?.user && (session.user.id === comment.authorId || session.user.role === "ADMIN") && (
                  <form action={deleteCommentAction}>
                    <input type="hidden" name="commentId" value={comment.id} />
                    <input type="hidden" name="path" value={currentPath} />
                    <button type="submit" className="text-slate-500 hover:text-red-400 transition-colors text-xs font-mono ml-4">
                      delete
                    </button>
                  </form>
                )}
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                {comment.content}
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                {new Date(comment.createdAt).toLocaleDateString()} &middot; {new Date(comment.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
