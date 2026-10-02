'use client';

// components/comments/CommentsSection.tsx — Comments 2.0 UI (Pillar D)
//
// Client component: fetches threaded comments, supports replies, emoji
// reactions and @mentions. Requires a signed-in user to post.

import { useCallback, useEffect, useMemo, useState } from 'react';

export interface CommentNode {
    id: string;
    content: string;
    authorName: string | null;
    authorImage: string | null;
    parentId: string | null;
    status: string;
    reactions: { emoji: string; count: number }[];
    replies: CommentNode[];
    createdAt: string;
    editedAt: string | null;
}

interface CommentsSectionProps {
    postId?: string;
    predictionId?: string;
    isLoggedIn: boolean;
    heading?: string;
}

const REACTIONS = ['👍', '🔥', '💡', '🎯', '🙌'] as const;

function timeAgo(iso: string): string {
    const then = new Date(iso).getTime();
    if (Number.isNaN(then)) return '';
    const seconds = Math.max(0, Math.floor((Date.now() - then) / 1000));
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(iso).toLocaleDateString();
}

function CommentCard({
    node,
    depth,
    isLoggedIn,
    onReply,
    onReact,
}: {
    node: CommentNode;
    depth: number;
    isLoggedIn: boolean;
    onReply: (parentId: string, content: string) => Promise<void>;
    onReact: (commentId: string, emoji: string) => Promise<void>;
}) {
    const [replying, setReplying] = useState(false);
    const [draft, setDraft] = useState('');
    const [busy, setBusy] = useState(false);

    const initials = (node.authorName ?? '?').trim().charAt(0).toUpperCase();

    const submitReply = async () => {
        if (!draft.trim()) return;
        setBusy(true);
        try {
            await onReply(node.id, draft.trim());
            setDraft('');
            setReplying(false);
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className={depth > 0 ? 'mt-4 border-l border-slate-200 pl-4 dark:border-white/10' : 'mt-5'}>
            <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-sm font-semibold text-teal-700 dark:text-teal-300">
                    {node.authorImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={node.authorImage} alt="" className="h-9 w-9 rounded-full object-cover" />
                    ) : (
                        initials
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                            {node.authorName ?? 'Anonymous'}
                        </span>
                        <span className="text-xs text-slate-400">{timeAgo(node.createdAt)}</span>
                        {node.editedAt && <span className="text-xs text-slate-400">· edited</span>}
                    </div>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {node.content}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        {REACTIONS.map((emoji) => {
                            const match = node.reactions.find((r) => r.emoji === emoji);
                            return (
                                <button
                                    key={emoji}
                                    type="button"
                                    disabled={!isLoggedIn}
                                    onClick={() => void onReact(node.id, emoji)}
                                    className="rounded-full border border-slate-200 px-2 py-0.5 text-xs transition hover:border-teal-400 hover:bg-teal-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10"
                                    title={isLoggedIn ? 'React' : 'Sign in to react'}
                                >
                                    {emoji}
                                    {match ? <span className="ml-1 text-slate-500">{match.count}</span> : null}
                                </button>
                            );
                        })}
                        {depth < 3 && (
                            <button
                                type="button"
                                disabled={!isLoggedIn}
                                onClick={() => setReplying((v) => !v)}
                                className="ml-1 text-xs font-medium text-teal-700 hover:underline disabled:cursor-not-allowed disabled:opacity-50 dark:text-teal-300"
                            >
                                {replying ? 'Cancel' : 'Reply'}
                            </button>
                        )}
                    </div>

                    {replying && (
                        <div className="mt-3">
                            <textarea
                                value={draft}
                                onChange={(e) => setDraft(e.target.value)}
                                rows={2}
                                placeholder={`Reply to ${node.authorName ?? 'this comment'}…`}
                                className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm dark:border-white/10 dark:bg-[#111c31]"
                            />
                            <div className="mt-2 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => void submitReply()}
                                    disabled={busy || !draft.trim()}
                                    className="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                                >
                                    {busy ? 'Posting…' : 'Post reply'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {node.replies.map((child) => (
                <CommentCard
                    key={child.id}
                    node={child}
                    depth={depth + 1}
                    isLoggedIn={isLoggedIn}
                    onReply={onReply}
                    onReact={onReact}
                />
            ))}
        </div>
    );
}

export default function CommentsSection({
    postId,
    predictionId,
    isLoggedIn,
    heading = 'Discussion',
}: CommentsSectionProps) {
    const [comments, setComments] = useState<CommentNode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [draft, setDraft] = useState('');
    const [posting, setPosting] = useState(false);

    const query = useMemo(() => {
        const params = new URLSearchParams();
        if (postId) params.set('postId', postId);
        if (predictionId) params.set('predictionId', predictionId);
        return params.toString();
    }, [postId, predictionId]);

    const load = useCallback(async () => {
        if (!query) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/comments?${query}`, { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to load comments');
            const data = (await res.json()) as { comments: CommentNode[] };
            setComments(data.comments ?? []);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load comments');
        } finally {
            setLoading(false);
        }
    }, [query]);

    useEffect(() => {
        void load();
    }, [load]);

    const submit = async (content: string, parentId?: string) => {
        const res = await fetch('/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content, postId, predictionId, parentId }),
        });
        if (!res.ok) {
            const body = (await res.json().catch(() => ({}))) as { error?: string };
            throw new Error(body.error ?? 'Failed to post comment');
        }
        await load();
    };

    const handleTopLevelSubmit = async () => {
        if (!draft.trim() || posting) return;
        setPosting(true);
        try {
            await submit(draft.trim());
            setDraft('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to post comment');
        } finally {
            setPosting(false);
        }
    };

    const handleReact = async (commentId: string, emoji: string) => {
        await fetch(`/api/comments/${commentId}/reactions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emoji }),
        });
        await load();
    };

    const totalCount = useMemo(() => {
        const count = (nodes: CommentNode[]): number =>
            nodes.reduce((sum, n) => sum + 1 + count(n.replies), 0);
        return count(comments);
    }, [comments]);

    return (
        <section className="mt-12 border-t border-slate-200 pt-8 dark:border-white/10">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {heading} <span className="text-slate-400">({totalCount})</span>
            </h2>

            {isLoggedIn ? (
                <div className="mt-4">
                    <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        rows={3}
                        placeholder="Share your analysis… use @handle to mention someone."
                        className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-white/10 dark:bg-[#111c31]"
                    />
                    <div className="mt-2 flex justify-end">
                        <button
                            type="button"
                            onClick={() => void handleTopLevelSubmit()}
                            disabled={posting || !draft.trim()}
                            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                        >
                            {posting ? 'Posting…' : 'Post comment'}
                        </button>
                    </div>
                </div>
            ) : (
                <p className="mt-3 text-sm text-slate-500">
                    <a href="/login" className="font-semibold text-teal-700 hover:underline dark:text-teal-300">
                        Sign in
                    </a>{' '}
                    to join the discussion.
                </p>
            )}

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            {loading && <p className="mt-4 text-sm text-slate-400">Loading discussion…</p>}

            {!loading && comments.length === 0 && (
                <p className="mt-4 text-sm text-slate-400">No comments yet — be the first to weigh in.</p>
            )}

            <div className="mt-2">
                {comments.map((node) => (
                    <CommentCard
                        key={node.id}
                        node={node}
                        depth={0}
                        isLoggedIn={isLoggedIn}
                        onReply={(parentId, content) => submit(content, parentId)}
                        onReact={handleReact}
                    />
                ))}
            </div>
        </section>
    );
}
