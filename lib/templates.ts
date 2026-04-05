import { ArticleType } from "@prisma/client"

export interface ContentTemplate {
  id: string
  name: string
  description: string
  type: ArticleType
  icon: string
  tags: string[]
  content: string
  title: string
  excerpt: string
  featuredImage?: string
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT"
  targetAudience: string[]
  estimatedReadingTime: number
}

export const contentTemplates: ContentTemplate[] = [
  {
    id: "research-report",
    name: "Research Report",
    description: "Comprehensive research report with data analysis, methodology, and findings",
    type: "RESEARCH",
    icon: "📊",
    tags: ["research", "data", "analysis", "report"],
    title: "Market Analysis: [Industry] Trends and Insights",
    excerpt: "This comprehensive research report examines key trends, market dynamics, and strategic implications for stakeholders in the [industry] sector.",
    content: `<h1>Executive Summary</h1>
<p>This report provides an in-depth analysis of the current state and future trajectory of the [industry] market. Key findings indicate significant growth opportunities in emerging segments, while traditional models face disruption from technological innovation.</p>

<h2>Methodology</h2>
<p>Our analysis combines primary research, expert interviews, and secondary data sources to provide a holistic view of market dynamics.</p>

<div class="accent-box">
<p><strong>Key Insight:</strong> The convergence of AI and traditional business processes is creating new value chains worth approximately $X billion by 2027.</p>
</div>

<h2>Market Overview</h2>
<p>The global [industry] market was valued at $X billion in 2024 and is projected to reach $Y billion by 2029, growing at a CAGR of Z%.</p>

<h3>Key Drivers</h3>
<ul>
<li>Digital transformation initiatives</li>
<li>Regulatory changes</li>
<li>Consumer behavior shifts</li>
<li>Technological advancements</li>
</ul>

<h2>Strategic Recommendations</h2>
<p>Based on our analysis, we recommend the following strategic actions:</p>

<div class="warning-callout">
<p><strong>Warning:</strong> Companies that fail to adapt to these trends risk losing market share to more agile competitors.</p>
</div>

<h2>Conclusion</h2>
<p>The [industry] sector is at an inflection point. Organizations that strategically position themselves for the coming changes will capture disproportionate value.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    difficulty: "ADVANCED",
    targetAudience: ["Executives", "Analysts", "Investors"],
    estimatedReadingTime: 15
  },
  {
    id: "insight-article",
    name: "Insight Article",
    description: "Thought leadership piece with actionable insights and practical recommendations",
    type: "INSIGHT",
    icon: "💡",
    tags: ["insights", "thought-leadership", "strategy"],
    title: "Why [Trend] Matters for Business Leaders",
    excerpt: "Exploring the implications of emerging trends and providing actionable guidance for decision-makers navigating complex business landscapes.",
    content: `<h1>The Strategic Imperative of [Trend]</h1>
<p>In today's rapidly evolving business environment, [trend] has emerged as a critical factor determining competitive advantage. This article explores why leaders must pay attention and how to respond effectively.</p>

<div class="quick-tip">
<p><strong>Pro Tip:</strong> Start with small pilot projects to test [trend] applications before scaling across the organization.</p>
</div>

<h2>Understanding the Shift</h2>
<p>The traditional approach to [domain] is being fundamentally reshaped by three key forces:</p>

<ol>
<li><strong>Technological enablement:</strong> New tools make previously impossible approaches feasible</li>
<li><strong>Changing expectations:</strong> Stakeholders now expect [capability] as standard</li>
<li><strong>Competitive pressure:</strong> Early adopters are gaining market share</li>
</ol>

<h2>Practical Implementation Framework</h2>
<p>To successfully leverage [trend], organizations should follow this four-phase approach:</p>

<div class="timeline">
<h4>Implementation Roadmap</h4>
<ul>
<li><strong>Phase 1:</strong> Assessment and opportunity identification (Weeks 1-4)</li>
<li><strong>Phase 2:</strong> Pilot design and stakeholder alignment (Weeks 5-8)</li>
<li><strong>Phase 3:</strong> Execution and measurement (Weeks 9-16)</li>
<li><strong>Phase 4:</strong> Scaling and optimization (Months 5-12)</li>
</ul>
</div>

<h2>Measuring Success</h2>
<p>Key performance indicators should include both quantitative and qualitative metrics:</p>

<div class="stat-card">
<h4>Expected Impact</h4>
<p class="stat-value">42%</p>
<p class="stat-label">Efficiency Improvement</p>
</div>

<h2>Conclusion</h2>
<p>[Trend] represents both challenge and opportunity. By taking a structured, evidence-based approach, leaders can transform potential disruption into sustainable advantage.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    difficulty: "INTERMEDIATE",
    targetAudience: ["Managers", "Directors", "Entrepreneurs"],
    estimatedReadingTime: 8
  },
  {
    id: "case-study",
    name: "Case Study",
    description: "Detailed examination of a specific project, initiative, or company experience",
    type: "CASE_STUDY",
    icon: "📈",
    tags: ["case-study", "success-story", "implementation"],
    title: "Case Study: How [Company] Achieved [Result]",
    excerpt: "A detailed examination of the strategies, challenges, and outcomes of a successful implementation that delivered measurable business value.",
    content: `<h1>Case Study: [Company]'s Journey to [Outcome]</h1>
<p>This case study examines how [Company], a [industry] firm, successfully implemented [solution] to address [challenge] and achieve [result].</p>

<h2>Background and Challenge</h2>
<p>[Company] faced significant challenges including [specific problems]. These issues were impacting [business metrics] and threatening [strategic objectives].</p>

<div class="accent-box">
<p><strong>Key Insight:</strong> The root cause analysis revealed that legacy processes, not technology limitations, were the primary constraint.</p>
</div>

<h2>Solution Design</h2>
<p>The implementation team developed a multi-faceted approach centered on three pillars:</p>

<table>
<thead>
<tr>
<th>Pillar</th>
<th>Description</th>
<th>Owner</th>
</tr>
</thead>
<tbody>
<tr>
<td>Process Redesign</td>
<td>Streamlined workflows and eliminated bottlenecks</td>
<td>Operations Lead</td>
</tr>
<tr>
<td>Technology Enablement</td>
<td>Implemented [specific tools/platforms]</td>
<td>CTO</td>
</tr>
<tr>
<td>Change Management</td>
<td>Comprehensive training and communication plan</td>
<td>HR Director</td>
</tr>
</tbody>
</table>

<h2>Implementation Journey</h2>
<p>The project followed an agile methodology with two-week sprints and regular stakeholder reviews.</p>

<div class="goal-tracker">
<h4>Project Progress</h4>
<div class="progress-bar">
<div class="progress-fill" style="width: 100%"></div>
</div>
<p>Completed on time and 15% under budget</p>
</div>

<h2>Results and Impact</h2>
<p>The implementation delivered significant measurable outcomes:</p>

<ul>
<li><strong>Efficiency:</strong> Reduced processing time by 65%</li>
<li><strong>Cost:</strong> Achieved 30% reduction in operational expenses</li>
<li><strong>Quality:</strong> Improved accuracy from 85% to 99.7%</li>
<li><strong>Satisfaction:</strong> Employee satisfaction increased by 40 points</li>
</ul>

<div class="stat-card">
<h4>ROI Achievement</h4>
<p class="stat-value">3.2x</p>
<p class="stat-label">Return on Investment</p>
</div>

<h2>Lessons Learned</h2>
<p>Key takeaways from this implementation include:</p>

<div class="warning-callout">
<p><strong>Critical Success Factor:</strong> Executive sponsorship and cross-functional collaboration were the most important determinants of success.</p>
</div>

<h2>Conclusion</h2>
<p>This case study demonstrates that with the right approach, [challenge] can be transformed into [opportunity], delivering substantial value to the organization.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    difficulty: "INTERMEDIATE",
    targetAudience: ["Practitioners", "Consultants", "Students"],
    estimatedReadingTime: 12
  },
  {
    id: "quick-guide",
    name: "Quick Guide",
    description: "Step-by-step practical guide for implementing specific techniques or processes",
    type: "INSIGHT",
    icon: "🚀",
    tags: ["guide", "how-to", "tutorial"],
    title: "Step-by-Step Guide to [Process]",
    excerpt: "A practical, actionable guide to implementing best practices and avoiding common pitfalls in [domain].",
    content: `<h1>The Complete Guide to [Process]</h1>
<p>This guide provides a comprehensive, step-by-step approach to mastering [process], with practical tips and real-world examples.</p>

<div class="quick-tip">
<p><strong>Before You Begin:</strong> Ensure you have stakeholder buy-in and clear success metrics defined.</p>
</div>

<h2>Prerequisites</h2>
<p>Before starting, make sure you have:</p>

<div class="task-list">
<ul data-type="taskList">
<li data-checked="true"><label><input type="checkbox" checked="checked"><span>Clear objectives and success criteria</span></label></li>
<li data-checked="true"><label><input type="checkbox" checked="checked"><span>Necessary tools and resources allocated</span></label></li>
<li data-checked="false"><label><input type="checkbox"><span>Stakeholder alignment secured</span></label></li>
<li data-checked="false"><label><input type="checkbox"><span>Baseline measurements established</span></label></li>
</ul>
</div>

<h2>Step 1: Preparation Phase</h2>
<p>Begin by conducting a thorough assessment of your current state:</p>

<ol>
<li><strong>Map existing processes:</strong> Document current workflows and pain points</li>
<li><strong>Identify stakeholders:</strong> Create a RACI matrix for all involved parties</li>
<li><strong>Set benchmarks:</strong> Establish baseline metrics for comparison</li>
<li><strong>Secure resources:</strong> Allocate budget, personnel, and tools</li>
</ol>

<h2>Step 2: Design Phase</h2>
<p>Develop your implementation plan with these key elements:</p>

<div class="accent-box">
<p><strong>Design Principle:</strong> Keep the user experience at the center of all design decisions.</p>
</div>

<h2>Step 3: Implementation Phase</h2>
<p>Execute your plan with attention to these critical success factors:</p>

<ul>
<li><strong>Communication:</strong> Regular updates to all stakeholders</li>
<li><strong>Testing:</strong> Validate each component before full deployment</li>
<li><strong>Training:</strong> Comprehensive education for all users</li>
<li><strong>Support:</strong> Establish help resources and escalation paths</li>
</ul>

<h2>Step 4: Measurement and Optimization</h2>
<p>Continuously monitor performance and make data-driven improvements:</p>

<div class="stat-card">
<h4>Expected Improvement</h4>
<p class="stat-value">58%</p>
<p class="stat-label">Process Efficiency Gain</p>
</div>

<h2>Common Pitfalls to Avoid</h2>
<p>Based on industry experience, beware of these common mistakes:</p>

<div class="warning-callout">
<p><strong>Avoid:</strong> Underestimating change management requirements and training needs.</p>
</div>

<h2>Conclusion</h2>
<p>By following this structured approach, you can successfully implement [process] and achieve measurable improvements in [outcomes].</p>`,
    featuredImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    difficulty: "BEGINNER",
    targetAudience: ["Beginners", "Practitioners", "Team Leads"],
    estimatedReadingTime: 10
  }
]

export function applyTemplate(template: ContentTemplate) {
  return {
    title: template.title,
    excerpt: template.excerpt,
    content: template.content,
    type: template.type,
    featuredImage: template.featuredImage,
    difficulty: template.difficulty,
    targetAudience: template.targetAudience,
    estimatedReadingTime: template.estimatedReadingTime,
    tags: template.tags
  }
}