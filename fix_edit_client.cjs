const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'app/admin/cms/new/EditorClient.tsx');
const destPath = path.join(__dirname, 'app/admin/cms/edit/[id]/EditClient.tsx');

let src = fs.readFileSync(srcPath, 'utf8');

// 1. Imports
src = src.replace(
  'import { createPost, PostFormData } from "@/actions/cms-actions"',
  'import { updatePost, PostFormData } from "@/actions/cms-actions"'
);
src = src.replace(
  'import { ArticleType } from "@prisma/client"',
  'import { ArticleType, Post } from "@prisma/client"'
);

// 2. Component signature
src = src.replace(
  'export default function EditorClient() {',
  'export default function EditClient({ post }: { post: Post & { author: { name: string | null } } }) {'
);

// 3. State initializers
src = src.replace('const [title, setTitle] = useState("")', 'const [title, setTitle] = useState(post.title || "")');
src = src.replace('const [slug, setSlug] = useState("")', 'const [slug, setSlug] = useState(post.slug || "")');
src = src.replace('const [excerpt, setExcerpt] = useState("")', 'const [excerpt, setExcerpt] = useState(post.excerpt || "")');
src = src.replace('const [content, setContent] = useState("")', 'const [content, setContent] = useState(post.content || "")');
src = src.replace('const [type, setType] = useState<ArticleType>("RESEARCH")', 'const [type, setType] = useState<ArticleType>(post.type || "RESEARCH")');
src = src.replace('const [featuredImage, setFeaturedImage] = useState("")', 'const [featuredImage, setFeaturedImage] = useState(post.featuredImage || "")');

src = src.replace('const [seoTitle, setSeoTitle] = useState("")', 'const [seoTitle, setSeoTitle] = useState(post.seoTitle || "")');
src = src.replace('const [metaDescription, setMetaDescription] = useState("")', 'const [metaDescription, setMetaDescription] = useState(post.metaDescription || "")');
src = src.replace('const [focusKeywords, setFocusKeywords] = useState("")', 'const [focusKeywords, setFocusKeywords] = useState(post.focusKeywords || "")');

src = src.replace('const [ogTitle, setOgTitle] = useState("")', 'const [ogTitle, setOgTitle] = useState(post.ogTitle || "")');
src = src.replace('const [ogImage, setOgImage] = useState("")', 'const [ogImage, setOgImage] = useState(post.ogImage || "")');

src = src.replace(
  'const [difficulty, setDifficulty] = useState<"BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT">("INTERMEDIATE")', 
  'const [difficulty, setDifficulty] = useState<any>(post.difficulty || "INTERMEDIATE")'
);
src = src.replace(
  'const [targetAudience, setTargetAudience] = useState<string[]>(["Executives", "Analysts"])', 
  'const [targetAudience, setTargetAudience] = useState<string[]>(post.targetAudience?.length ? post.targetAudience : ["Executives", "Analysts"])'
);
src = src.replace(
  'const [contentStatus, setContentStatus] = useState<"DRAFT" | "REVIEW" | "APPROVED" | "PUBLISHED">("DRAFT")', 
  'const [contentStatus, setContentStatus] = useState<any>(post.contentStatus || "DRAFT")'
);
src = src.replace(
  'const [estimatedReadingTime, setEstimatedReadingTime] = useState<number>(5)', 
  'const [estimatedReadingTime, setEstimatedReadingTime] = useState<number>(post.estimatedReadingTime || 5)'
);
src = src.replace(
  'const [tags, setTags] = useState<string[]>([])', 
  'const [tags, setTags] = useState<string[]>(post.tags || [])'
);

// 4. Save logic
src = src.replace(
  'await createPost(data)',
  'await updatePost(post.id, data)'
);

// 5. Update header string
src = src.replace(
  '<span className="text-[10px] text-[#0D6E6E] font-bold uppercase tracking-widest mt-0.5">Drafting Elite Report</span>',
  '<span className="text-[10px] text-[#0D6E6E] font-bold uppercase tracking-widest mt-0.5">Editing Elite Report</span>'
);

fs.writeFileSync(destPath, src);
console.log('Successfully updated EditClient.tsx');
