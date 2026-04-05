"use client"

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef
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
  ChevronDown,
  BarChart,
  PieChart,
  AlertTriangle,
  FileText,
  Code,
  Video,
  Calendar,
  TrendingUp,
  Users,
  Target,
  Zap,
  Image as ImageIcon,
  Link as LinkIcon,
  Divide,
  Columns,
  Grid3x3,
  BookOpen,
  Lightbulb,
  Award,
  Shield,
  Globe,
  Cpu,
  Database,
  FileCode,
  GitBranch,
  LineChart,
  PieChart as PieChartIcon,
  BarChart3,
  Clock,
  DollarSign,
  TrendingDown,
  ThumbsUp,
  MessageSquare,
  UserCheck,
  Star,
  Heart,
  Flag,
  AlertCircle,
  Info,
  HelpCircle,
  CheckCircle,
  XCircle,
  PlusCircle,
  MinusCircle
} from "lucide-react"

interface CommandListProps {
  items: CommandItem[]
  command: (item: CommandItem) => void
}

export const CommandList = forwardRef<{ onKeyDown: (event: { event: KeyboardEvent }) => boolean }, CommandListProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const itemsRef = useRef(props.items)

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

  useEffect(() => {
    itemsRef.current = props.items
    // Use requestAnimationFrame to avoid synchronous state update during render
    requestAnimationFrame(() => {
      setSelectedIndex(0)
    })
  }, [props.items])

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
          props.items.map((item: CommandItem, index: number) => (
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

import { Editor } from '@tiptap/core'

interface CommandItem {
  title: string
  description: string
  icon: React.ReactNode
  command: (props: { editor: Editor; range: { from: number; to: number } }) => void
}

export const getSuggestionItems = ({ query }: { query: string }): CommandItem[] => {
  const items: CommandItem[] = [
    {
      title: "Heading 1",
      description: "Large consultancy header",
      icon: <Heading1 className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run()
      },
    },
    {
      title: "Heading 2",
      description: "Section subdivision",
      icon: <Heading2 className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run()
      },
    },
    {
      title: "Bullet List",
      description: "Simple bullet points",
      icon: <List className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<ul><li>First item</li><li>Second item</li><li>Third item</li></ul>').run()
      },
    },
    {
      title: "Numbered List",
      description: "Sequenced steps",
      icon: <ListOrdered className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<ol><li>First step</li><li>Second step</li><li>Third step</li></ol>').run()
      },
    },
    {
      title: "Table",
      description: "High-density data grid",
      icon: <TableIcon className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<table><thead><tr><th>Header 1</th><th>Header 2</th><th>Header 3</th></tr></thead><tbody><tr><td>Data 1</td><td>Data 2</td><td>Data 3</td></tr><tr><td>Data 4</td><td>Data 5</td><td>Data 6</td></tr></tbody></table>').run()
      },
    },
    {
      title: "Task List",
      description: "Methodology checklist",
      icon: <CheckSquare className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<ul data-type="taskList"><li data-type="taskItem" data-checked="false">Task 1</li><li data-type="taskItem" data-checked="false">Task 2</li><li data-type="taskItem" data-checked="true">Completed task</li></ul>').run()
      },
    },
    {
      title: "Quote",
      description: "Executive summary callout",
      icon: <Quote className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<blockquote><p>Important quote or executive insight goes here.</p></blockquote>').run()
      },
    },
    {
      title: "Elite Button",
      description: "Call to action widget",
      icon: <MousePointer2 className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<p><a href="#" class="btn-primary inline-flex px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#0D6E6E] to-teal-600 hover:opacity-90 transition-all">Click Here</a></p>').run()
      },
    },
    {
      title: "Accent Box",
      description: "Emphasized methodology note",
      icon: <Layout className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="accent-box"><p><strong>Key Insight:</strong> Enter your expert analysis here...</p></div>').run()
      },
    },
    {
      title: "Warning Callout",
      description: "Important notice or caution",
      icon: <AlertTriangle className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="warning-callout"><p><strong>Warning:</strong> This content requires careful consideration...</p></div>').run()
      },
    },
    {
      title: "Data Chart",
      description: "Visual data representation",
      icon: <BarChart className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="data-chart-placeholder"><p><em>Chart: Insert your data visualization here</em></p></div>').run()
      },
    },
    {
      title: "Code Block",
      description: "Technical code snippet",
      icon: <Code className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<pre><code class="language-javascript">// Your code here\nconsole.log("Hello world");</code></pre>').run()
      },
    },
    {
      title: "Video Embed",
      description: "Embed video content",
      icon: <Video className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="video-embed"><p>Video embed placeholder - replace with actual embed code</p></div>').run()
      },
    },
    {
      title: "Timeline",
      description: "Chronological sequence",
      icon: <Calendar className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="timeline"><h4>Timeline</h4><ul><li>Phase 1: Research</li><li>Phase 2: Analysis</li><li>Phase 3: Implementation</li></ul></div>').run()
      },
    },
    {
      title: "Statistic Card",
      description: "Highlight key metrics",
      icon: <TrendingUp className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="stat-card"><h4>Key Metric</h4><p class="stat-value">42%</p><p class="stat-label">Growth Rate</p></div>').run()
      },
    },
    {
      title: "Team Profile",
      description: "Team member introduction",
      icon: <Users className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="team-profile"><h4>Team Member</h4><p><strong>Role:</strong> Senior Analyst</p><p><strong>Expertise:</strong> Data Science</p></div>').run()
      },
    },
    {
      title: "Goal Tracker",
      description: "Progress towards objectives",
      icon: <Target className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="goal-tracker"><h4>Goal Progress</h4><div class="progress-bar"><div class="progress-fill" style="width: 75%"></div></div><p>75% complete</p></div>').run()
      },
    },
    {
      title: "Quick Tip",
      description: "Short helpful hint",
      icon: <Zap className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="quick-tip"><p><strong>Pro Tip:</strong> Use this technique to improve results...</p></div>').run()
      },
    },
    // NEW ELEMENTS ADDED FOR ENHANCED CONTENT CREATION
    {
      title: "Data Freshness Tracker",
      description: "Auto-tracked statistic for dashboard",
      icon: <Clock className="w-4 h-4 text-emerald-400" />,
      command: ({ editor, range }) => {
        const value = window.prompt("Statistic value (e.g., '2,027 dark stores')");
        if (!value) return;
        const date = window.prompt("Data collection date (YYYY-MM-DD)", new Date().toISOString().split('T')[0]);
        if (!date) return;
        const halfLife = window.prompt("Half-life in days before it becomes stale", "45");
        
        editor.chain().focus().deleteRange(range).insertContent(
          `<blockquote class="fresh-data-card" style="border-left: 4px solid #10b981; padding: 1rem 1.5rem; margin: 1.5rem 0; background: rgba(16, 185, 129, 0.05); border-radius: 0 0.5rem 0.5rem 0;">` +
          `<p style="margin-bottom: 0.25rem;">🟢 <strong>Live Tracked Data:</strong> ${value}</p>` +
          `<p style="font-size: 0.875rem; color: #64748b; margin-top: 0;"><em>(Collected: ${date} | Decay Rate: ${halfLife || 45}d)</em></p>` + 
          `</blockquote><p></p>`
        ).run();
      },
    },
    {
      title: "Image Gallery",
      description: "Grid of multiple images",
      icon: <Grid3x3 className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="image-gallery"><h4>Image Gallery</h4><div class="gallery-grid"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Image 1" /><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Image 2" /><img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Image 3" /></div></div>').run()
      },
    },
    {
      title: "Comparison Table",
      description: "Side-by-side feature comparison",
      icon: <Columns className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="comparison-table"><table><thead><tr><th>Feature</th><th>Option A</th><th>Option B</th></tr></thead><tbody><tr><td>Cost</td><td>$100</td><td>$200</td></tr><tr><td>Performance</td><td>High</td><td>Medium</td></tr><tr><td>Support</td><td>24/7</td><td>Business Hours</td></tr></tbody></table></div>').run()
      },
    },
    {
      title: "Financial Metric",
      description: "Key financial indicator",
      icon: <DollarSign className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="financial-metric"><div class="metric-header"><span class="metric-label">Revenue Growth</span><span class="metric-trend positive">+15.2%</span></div><div class="metric-value">$2.4M</div><div class="metric-period">Q4 2025</div></div>').run()
      },
    },
    {
      title: "Process Flow",
      description: "Step-by-step workflow",
      icon: <GitBranch className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="process-flow"><h4>Implementation Process</h4><ol><li>Discovery & Analysis</li><li>Strategy Development</li><li>Execution</li><li>Review & Optimization</li></ol></div>').run()
      },
    },
    {
      title: "Testimonial",
      description: "Customer feedback quote",
      icon: <MessageSquare className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="testimonial"><div class="testimonial-content">"This solution transformed our business operations and increased efficiency by 40%."</div><div class="testimonial-author"><strong>Sarah Chen</strong><br/><span>CEO, TechCorp Inc.</span></div></div>').run()
      },
    },
    {
      title: "Risk Assessment",
      description: "Risk analysis matrix",
      icon: <AlertCircle className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="risk-assessment"><h4>Risk Matrix</h4><div class="risk-grid"><div class="risk-item high">High Impact</div><div class="risk-item medium">Medium Impact</div><div class="risk-item low">Low Impact</div></div></div>').run()
      },
    },
    {
      title: "Case Study",
      description: "Detailed success story",
      icon: <BookOpen className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="case-study"><h4>Case Study: Digital Transformation</h4><div class="case-study-stats"><div class="stat"><div class="stat-number">+85%</div><div class="stat-label">Efficiency Gain</div></div><div class="stat"><div class="stat-number">$1.2M</div><div class="stat-label">Cost Savings</div></div></div></div>').run()
      },
    },
    {
      title: "Technology Stack",
      description: "Tech tools and platforms",
      icon: <Cpu className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="tech-stack"><h4>Technology Stack</h4><div class="tech-items"><span class="tech-item">React</span><span class="tech-item">Node.js</span><span class="tech-item">PostgreSQL</span><span class="tech-item">AWS</span></div></div>').run()
      },
    },
    {
      title: "Data Visualization",
      description: "Advanced chart/graph",
      icon: <LineChart className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="data-visualization"><h4>Market Trends Analysis</h4><div class="chart-placeholder"><p>Interactive chart showing quarterly growth metrics</p></div></div>').run()
      },
    },
    {
      title: "Executive Summary",
      description: "High-level overview",
      icon: <Award className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="executive-summary"><h4>Executive Summary</h4><p>This report analyzes market opportunities and provides strategic recommendations for expansion into emerging markets.</p><div class="key-points"><div class="key-point"><strong>Market Size:</strong> $45B by 2027</div><div class="key-point"><strong>Growth Rate:</strong> 12.5% CAGR</div></div></div>').run()
      },
    },
    {
      title: "FAQ Section",
      description: "Frequently asked questions",
      icon: <HelpCircle className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="faq-section"><h4>Frequently Asked Questions</h4><div class="faq-item"><div class="faq-question">What is the implementation timeline?</div><div class="faq-answer">Typically 6-8 weeks depending on complexity.</div></div><div class="faq-item"><div class="faq-question">What support is included?</div><div class="faq-answer">24/7 technical support and monthly strategy reviews.</div></div></div>').run()
      },
    },
    {
      title: "Call to Action",
      description: "Prominent action button",
      icon: <MousePointer2 className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="cta-section"><h4>Ready to Transform Your Business?</h4><p>Schedule a consultation with our experts to discuss your specific needs.</p><a href="#" class="cta-button">Book a Discovery Call</a></div>').run()
      },
    },
    {
      title: "Milestone Timeline",
      description: "Key achievement dates",
      icon: <Clock className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="milestone-timeline"><h4>Project Milestones</h4><div class="milestone"><div class="milestone-date">Q1 2025</div><div class="milestone-title">Market Research Completed</div></div><div class="milestone"><div class="milestone-date">Q2 2025</div><div class="milestone-title">Prototype Development</div></div></div>').run()
      },
    },
    {
      title: "Competitive Analysis",
      description: "Market competitor comparison",
      icon: <TrendingDown className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent('<div class="competitive-analysis"><h4>Competitive Landscape</h4><div class="competitor-grid"><div class="competitor"><div class="competitor-name">Competitor A</div><div class="competitor-strength">Strong brand</div></div><div class="competitor"><div class="competitor-name">Competitor B</div><div class="competitor-strength">Low pricing</div></div></div></div>').run()
      },
    },
  ]
  
  return items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
}
