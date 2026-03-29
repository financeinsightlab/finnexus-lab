'use client';

import { useState, useEffect, useMemo } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const FORCE_DEFINITIONS = [
  {
    id: 'rivalry',
    name: 'Competitive Rivalry',
    icon: '⚔️',
    description: 'Intensity of competition among existing players in the market.',
    factors: ['Number of competitors', 'Product differentiation', 'Exit barriers', 'Industry growth rate'],
  },
  {
    id: 'newEntrants',
    name: 'Threat of New Entrants',
    icon: '🚪',
    description: 'Ease with which new competitors can enter and challenge established players.',
    factors: ['Capital requirements', 'Regulatory barriers', 'Brand identity strength', 'Economies of scale'],
  },
  {
    id: 'substitutes',
    name: 'Threat of Substitutes',
    icon: '🔄',
    description: 'Likelihood that customers will switch to an alternative product or service.',
    factors: ['Alternative product availability', 'Switching cost', 'Price-performance ratio', 'Buyer propensity to substitute'],
  },
  {
    id: 'buyerPower',
    name: 'Bargaining Power of Buyers',
    icon: '🛒',
    description: 'Ability of customers to drive prices down or demand better quality.',
    factors: ['Volume of buyer purchases', 'Switching cost for buyers', 'Price sensitivity', 'Buyer concentration'],
  },
  {
    id: 'supplierPower',
    name: 'Bargaining Power of Suppliers',
    icon: '🏭',
    description: 'Ability of suppliers to influence your input costs and terms.',
    factors: ['Supplier concentration', 'Availability of substitutes for inputs', 'Cost of switching suppliers', 'Forward integration threat'],
  },
];

const INDUSTRY_TEMPLATES = {
  general: {
    name: 'General Business',
    keywords: [],
    ratings: { rivalry: 3, newEntrants: 3, substitutes: 3, buyerPower: 3, supplierPower: 3 },
    notes: {
      rivalry: 'Standard competitive landscape for {{COMPANY}} in the {{INDUSTRY}} sector. Moderate price competition.',
      newEntrants: 'Moderate capital requirements and regulatory hurdles for new players entering {{INDUSTRY}}.',
      substitutes: 'Standard alternatives exist; {{COMPANY}} must focus on core value proposition to prevent switching.',
      buyerPower: 'Buyers have some choice but are balanced by {{COMPANY}}\'s service quality and brand.',
      supplierPower: 'Balanced power between {{COMPANY}} and its key vendors/suppliers.',
    }
  },
  fintech: {
    name: 'Indian Fintech',
    keywords: ['fintech', 'upi', 'payment', 'banking', 'nbfc'],
    ratings: { rivalry: 4, newEntrants: 3, substitutes: 4, buyerPower: 5, supplierPower: 3 },
    notes: {
      rivalry: 'Paytm, PhonePe, GPay dominate UPI. High product commoditization with low differentiation on core flows.',
      newEntrants: 'RBI licensing is a 12-18 month barrier. NBFC/PPI licenses require ₹2Cr+ min net worth.',
      substitutes: 'UPI is a substitute for credit. WhatsApp Pay and ONDC offer zero-commission alternatives.',
      buyerPower: 'SMEs highly price-sensitive. Churn is high if any competitor offers 0.1% lower MDR.',
      supplierPower: 'NPCI controls UPI rails — near-monopolistic. AWS/Azure provide stable cloud infra.',
    }
  },
  ecommerce: {
    name: 'E-commerce & D2C',
    keywords: ['ecommerce', 'e-commerce', 'd2c', 'retail online', 'marketplace', 'store'],
    ratings: { rivalry: 5, newEntrants: 4, substitutes: 3, buyerPower: 4, supplierPower: 3 },
    notes: {
      rivalry: 'Amazon/Flipkart dominate. Price wars and heavy discounting are standard for {{COMPANY}}.',
      newEntrants: 'Low barriers for niche players, but high CAC (Customer Acquisition Cost) makes scale hard.',
      substitutes: 'Social commerce (Instagram/FB) and Quick Commerce (Blinkit) are rising threats.',
      buyerPower: 'High transparency; customers easily compare prices across {{COMPANY}} and competitors.',
      supplierPower: 'Wholesale suppliers have moderate power, but logistics partners are the critical bottleneck.',
    }
  },
  saas: {
    name: 'SaaS & Enterprise Software',
    keywords: ['saas', 'software', 'cloud', 'b2b software', 'crm', 'erp'],
    ratings: { rivalry: 3, newEntrants: 4, substitutes: 2, buyerPower: 3, supplierPower: 2 },
    notes: {
      rivalry: 'Fragmented market. {{COMPANY}} competes on specific feature sets and integration depth.',
      newEntrants: 'High R&D costs and "Sticky" enterprise workflows create barriers to entry.',
      substitutes: 'Excel/Google Sheets remain the #1 substitute for most specialized software.',
      buyerPower: 'Enterprise buyers demand custom pricing; high switching costs reduce buyer leverage.',
      supplierPower: 'Cloud providers (AWS/Azure) are the only major suppliers; low switching risk.',
    }
  },
  retail: {
    name: 'Traditional Retail & FMCG',
    keywords: ['retail', 'shop', 'mart', 'supermarket', 'fmcg', 'offline'],
    ratings: { rivalry: 4, newEntrants: 2, substitutes: 4, buyerPower: 3, supplierPower: 4 },
    notes: {
      rivalry: 'Intense local competition. Location and shelf-space are the primary battlegrounds.',
      newEntrants: 'High real estate Capex and supply chain complexity deter new large-scale entrants.',
      substitutes: 'Quick-commerce and e-commerce are rapidly cannibalizing traditional retail footfall.',
      buyerPower: 'Individual shoppers have low power, but organized retail chains demand high margins.',
      supplierPower: 'Global brands (HUL, P&G) hold massive power over small retailers regarding credit/supply.',
    }
  }
};


type ForceId = 'rivalry' | 'newEntrants' | 'substitutes' | 'buyerPower' | 'supplierPower';

interface ForceRatings {
  rivalry: number;
  newEntrants: number;
  substitutes: number;
  buyerPower: number;
  supplierPower: number;
}

const INTENSITY_LABELS = ['', 'Very Low', 'Low', 'Moderate', 'High', 'Very High'];
const INTENSITY_COLORS: Record<number, string> = {
  1: 'text-green-600 bg-green-50',
  2: 'text-green-500 bg-green-50',
  3: 'text-yellow-600 bg-yellow-50',
  4: 'text-orange-600 bg-orange-50',
  5: 'text-red-600 bg-red-50',
};

export default function PortersFiveForcesCalc({ slug, isPremiumUser }: { slug: string; isPremiumUser?: boolean }) {
  const [companyName, setCompanyName] = useState('GeoSeoLab');
  const [industry, setIndustry] = useState('Indian Fintech');
  const [notes, setNotes] = useState<Record<ForceId, string>>(INDUSTRY_TEMPLATES.fintech.notes);
  const [ratings, setRatings] = useState<ForceRatings>(INDUSTRY_TEMPLATES.fintech.ratings);
  const [lastDetectedIndustry, setLastDetectedIndustry] = useState('fintech');

  // Auto-Detect Industry Template
  useEffect(() => {
    const lowerIndustry = industry.toLowerCase();
    let detectedKey: keyof typeof INDUSTRY_TEMPLATES = 'general';

    // Find first matching template
    for (const [key, template] of Object.entries(INDUSTRY_TEMPLATES)) {
      if (key === 'general') continue;
      if (template.keywords.some(kw => lowerIndustry.includes(kw))) {
        detectedKey = key as keyof typeof INDUSTRY_TEMPLATES;
        break;
      }
    }

    // Only update if industry type actually changed (to avoid overwriting user edits every keystroke)
    if (detectedKey !== lastDetectedIndustry) {
      setNotes(INDUSTRY_TEMPLATES[detectedKey].notes);
      setRatings(INDUSTRY_TEMPLATES[detectedKey].ratings);
      setLastDetectedIndustry(detectedKey);
    }
  }, [industry, lastDetectedIndustry]);


  const [isLocked, setIsLocked] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isPremiumUser) { setIsLocked(false); return; }
    const key = `used_tool_${slug}`;
    const firstUsed = localStorage.getItem(key);
    if (!firstUsed) { localStorage.setItem(key, Date.now().toString()); }
    else if (Date.now() - parseInt(firstUsed) > 30 * 60 * 1000) setIsLocked(true);
  }, [slug, isPremiumUser]);

  useEffect(() => {
    if (isPremiumUser || localStorage.getItem(`unlocked_${slug}`)) setIsLocked(false);
  }, [slug, isPremiumUser]);

  const calculations = useMemo(() => {
    const average = (Object.values(ratings) as number[]).reduce((a, b) => a + b, 0) / 5;
    const radarData = FORCE_DEFINITIONS.map(f => ({
      subject: f.name.split(' ').slice(-2).join(' '),
      value: ratings[f.id as ForceId],
      fullName: f.name,
    }));

    let attractiveness = '';
    let insightText = '';
    let attractivenessScore = 0;

    if (average >= 4.2) {
      attractiveness = 'Very Unattractive';
      attractivenessScore = 1;
      insightText = `Structurally Hostile Industry: An average force intensity of ${average.toFixed(1)}/5 reveals an extremely competitive, low-margin environment. Buyers hold maximum leverage (${INTENSITY_LABELS[ratings.buyerPower]} at ${ratings.buyerPower}/5) while competitive rivalry simultaneously compresses margins from the inside. Porter's model predicts that no player in this industry will sustain above-average profitability long-term without a radical, defensible moat. Avoid aggressive capital deployment until a proprietary differentiation strategy is locked.`;
    } else if (average >= 3.5) {
      attractiveness = 'Unattractive';
      attractivenessScore = 2;
      insightText = `Challenging Industry Dynamics: With a composite force intensity of ${average.toFixed(1)}/5, this industry faces significant structural headwinds. The most critical threat is ${FORCE_DEFINITIONS.reduce((a, b) => ratings[a.id as ForceId] > ratings[b.id as ForceId] ? a : b).name} at ${ratings[FORCE_DEFINITIONS.reduce((a, b) => ratings[a.id as ForceId] > ratings[b.id as ForceId] ? a : b).id as ForceId]}/5. Focus your competitive strategy on converting your highest-threat force into a barrier — e.g., if buyer power is the dominant threat, lock customers into proprietary integrations, data ecosystems, or long-term contracts to impede switching.`;
    } else if (average >= 2.5) {
      attractiveness = 'Moderately Attractive';
      attractivenessScore = 3;
      insightText = `Balanced Competitive Landscape: This industry enjoys a moderate force intensity profile at ${average.toFixed(1)}/5. There are manageable threats from ${FORCE_DEFINITIONS.filter(f => ratings[f.id as ForceId] >= 3).map(f => f.name).join(' and ')}. Companies with a clear, differentiated value proposition can build durable competitive advantages and attract institutional capital. The window for market leadership is open but not guaranteed — move decisively on product differentiation and customer stickiness before the next wave of entrants arrives.`;
    } else {
      attractiveness = 'Highly Attractive';
      attractivenessScore = 4;
      insightText = `Rare Structural Advantage: An average force intensity of only ${average.toFixed(1)}/5 identifies an exceptionally favorable competitive environment. Low buyer power, minimal substitute threats, and high entry barriers create conditions for monopolistic or near-monopolistic profit margins — precisely the structure that allowed Berkshire Hathaway's portfolio to compound at 19% for five decades. Rush to capture market share aggressively before competitors inevitably recognize and enter this structural opportunity.`;
    }

    return { average, radarData, attractiveness, attractivenessScore, insightText };
  }, [ratings]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, tag: `unlocked_${slug}` }) });
      if (res.ok) { localStorage.setItem(`unlocked_${slug}`, 'true'); setIsLocked(false); setShowEmailGate(false); }
    } finally { setLoading(false); }
  };

  const attractivenessColors = ['', 'bg-red-100 text-red-800', 'bg-orange-100 text-orange-800', 'bg-yellow-100 text-yellow-800', 'bg-green-100 text-green-800'];

  return (
    <div className="min-h-screen bg-gray-50 py-10 relative">
      <div className="wrap max-w-7xl mx-auto">
        <div className="mb-6">
          <p className="text-teal-600 font-medium mb-2">Premium Web Calculator</p>
          <h1 className="text-3xl font-bold text-brand-navy">Porter's Five Forces Analysis</h1>
          <p className="text-brand-slate">Michael Porter's framework for competitive industry attractiveness scoring and strategic positioning.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-brand-teal border border-gray-100 mb-8 flex gap-4 max-w-4xl">
          <div className="text-3xl pt-1">💡</div>
          <div>
            <h3 className="font-bold text-brand-navy mb-1">What this tool actually does</h3>
            <p className="text-sm text-brand-slate leading-relaxed">
              Developed at Harvard Business School, Porter's Five Forces is the gold-standard strategic analysis tool for evaluating whether an industry is structurally attractive or hostile. By quantifying the power dynamics between competitors, buyers, suppliers, substitutes, and potential entrants, this model generates an objective "Competitive Intensity Score" for any industry.
            </p>
          </div>
        </div>

        {/* Company Setup */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 max-w-2xl">
          <h3 className="font-bold text-brand-navy mb-4">Analysis Setup</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company / Brand Name</label>
              <input type="text" className="input w-full" value={companyName} onChange={e => setCompanyName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Industry / Sector</label>
              <input type="text" className="input w-full" value={industry} onChange={e => setIndustry(e.target.value)} />
            </div>
          </div>
        </div>

        <div className={`${isLocked ? 'blur-md pointer-events-none select-none opacity-40' : ''} transition-all duration-700`}>
          {/* Competitive Forces Scoring */}
          <div className="space-y-4 mb-8">
            {FORCE_DEFINITIONS.map(force => (
              <div key={force.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl">{force.icon}</span>
                      <h3 className="font-bold text-brand-navy text-lg">{force.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${INTENSITY_COLORS[ratings[force.id as ForceId]]}`}>
                        {INTENSITY_LABELS[ratings[force.id as ForceId]]} ({ratings[force.id as ForceId]}/5)
                      </span>
                    </div>
                    <p className="text-sm text-brand-slate mb-3">{force.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {force.factors.map(f => <span key={f} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">{f}</span>)}
                    </div>
                    <textarea
                      className="w-full text-sm border border-gray-200 rounded-lg p-3 text-gray-600 resize-none focus:ring-1 focus:ring-brand-teal focus:border-brand-teal outline-none"
                      rows={2}
                      placeholder={`Describe your specific ${force.name.toLowerCase()} context...`}
                      value={notes[force.id as ForceId]
                        .replace(/{{COMPANY}}/g, companyName || 'your company')
                        .replace(/{{INDUSTRY}}/g, industry || 'this sector')}
                      onChange={e => setNotes(prev => ({ ...prev, [force.id]: e.target.value }))}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2 ml-4">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Intensity</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(v => (
                        <button
                          key={v}
                          onClick={() => setRatings(prev => ({ ...prev, [force.id]: v }))}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${ratings[force.id as ForceId] === v
                            ? 'bg-brand-navy text-white shadow-md scale-110'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400">1=Low Risk · 5=High Risk</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Results Dashboard */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-brand-navy mb-6">Five Forces Radar Analysis</h3>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={calculations.radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#334155' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 10 }} tickCount={6} />
                    <Radar name="Force Intensity" dataKey="value" stroke="#ef4444" fill="#ef4444" fillOpacity={0.25} strokeWidth={2} />
                    <Tooltip formatter={(v: any) => [`${v}/5 — ${INTENSITY_LABELS[v]}`, 'Intensity']} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-brand-navy mb-4">Industry Attractiveness Score</h3>
                <div className="text-center py-6">
                  <div className="text-6xl font-extrabold text-brand-navy mb-2">{calculations.average.toFixed(1)}<span className="text-2xl text-gray-400">/5</span></div>
                  <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mt-2 ${attractivenessColors[calculations.attractivenessScore]}`}>
                    {calculations.attractiveness} Industry
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Composite Force Intensity Score for {industry}</p>
                </div>
              </div>
              <div className="space-y-2">
                {FORCE_DEFINITIONS.map(f => (
                  <div key={f.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{f.icon} {f.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-100 rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: `${(ratings[f.id as ForceId] / 5) * 100}%`, background: ratings[f.id as ForceId] >= 4 ? '#ef4444' : ratings[f.id as ForceId] >= 3 ? '#f59e0b' : '#22c55e' }}></div>
                      </div>
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${INTENSITY_COLORS[ratings[f.id as ForceId]]}`}>{ratings[f.id as ForceId]}/5</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Excel Summary Table */}
          <div className="bg-white border border-gray-300 shadow-lg rounded-sm overflow-hidden mb-8">
            <div className="bg-[#107c41] text-white px-3 py-1 text-[11px] font-medium flex items-center gap-2">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M2 3h20v4H2zm0 6h6v12H2zm8 0h12v3H10zm0 4.5h12v3H10zm0 4.5h12v3H10z"/></svg>
              <span>Porters_Five_Forces_{companyName.replace(/\s+/g,'_')}_{industry.replace(/\s+/g,'_')}.xlsx</span>
            </div>
            <div className="bg-white border-b border-gray-300 px-3 py-1.5 text-[11px] flex items-center gap-2">
              <span className="font-bold italic text-gray-400 px-1">fx</span>
              <div className="bg-white border border-blue-300 w-full px-2 py-0.5 h-5 flex items-center shadow-inner text-xs">=AVERAGE(Rivalry, NewEntrants, Substitutes, BuyerPower, SupplierPower)</div>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-[11px] whitespace-nowrap border-collapse select-text">
                <thead>
                  <tr>
                    <th className="bg-gray-100 border border-gray-300 w-8 sticky left-0"></th>
                    <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-bold text-gray-600 uppercase sticky left-6 z-30 min-w-[220px]">Competitive Force</th>
                    <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-center font-bold text-gray-600 uppercase min-w-[100px]">Score (1–5)</th>
                    <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-center font-bold text-gray-600 uppercase">Intensity Level</th>
                    <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-center font-bold text-gray-600 uppercase">Industry Impact</th>
                    <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-bold text-gray-600 uppercase min-w-[350px]">Strategic Notes ({companyName})</th>
                  </tr>
                </thead>
                <tbody>
                  {FORCE_DEFINITIONS.map((f, idx) => {
                    const score = ratings[f.id as ForceId];
                    const impact = score >= 4 ? '🔴 Severely Limits Margins' : score === 3 ? '🟡 Manageable with Strategy' : '🟢 Structural Advantage';
                    return (
                      <tr key={f.id} className="hover:bg-blue-50/30 group">
                        <td className="border border-gray-300 bg-gray-100 text-center font-bold text-gray-400 text-xs w-6 sticky left-0 z-20">{idx + 1}</td>
                        <td className="border border-gray-200 px-3 py-2 font-bold sticky left-6 z-20 bg-white">{f.icon} {f.name}</td>
                        <td className={`border border-gray-200 px-3 py-2 text-center font-mono font-extrabold text-[14px] ${score >= 4 ? 'text-red-600 bg-red-50' : score === 3 ? 'text-yellow-600 bg-yellow-50' : 'text-green-600 bg-green-50'}`}>{score}.0x</td>
                        <td className={`border border-gray-200 px-3 py-2 text-center font-bold text-xs`}>{INTENSITY_LABELS[score]}</td>
                        <td className="border border-gray-200 px-3 py-2 text-center text-xs">{impact}</td>
                        <td className="border border-gray-200 px-4 py-2 text-gray-600 text-[10px] leading-relaxed max-w-[350px] whitespace-normal">
                          {notes[f.id as ForceId]
                            .replace(/{{COMPANY}}/g, companyName || 'your company')
                            .replace(/{{INDUSTRY}}/g, industry || 'this sector')}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="bg-[#eef3fb]">
                    <td className="border border-gray-300 bg-gray-100 text-center font-bold text-gray-400 text-xs w-6 sticky left-0 z-20">Σ</td>
                    <td className="border border-gray-200 px-3 py-2 font-extrabold text-[#0b5c96] uppercase sticky left-6 z-20 bg-[#eef3fb]">COMPOSITE SCORE (AVERAGE)</td>
                    <td className={`border border-gray-200 px-3 py-2 text-center font-extrabold text-[16px] ${attractivenessColors[calculations.attractivenessScore]}`}>{calculations.average.toFixed(2)}</td>
                    <td className="border border-gray-200 px-3 py-2 text-center font-bold">{calculations.attractiveness}</td>
                    <td colSpan={2} className="border border-gray-200 px-4 py-2 text-xs italic text-gray-500">Composite rating across all 5 forces for {industry}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-brand-navy p-6 rounded-2xl shadow-lg relative overflow-hidden border-t-4 border-t-purple-500">
            <h3 className="font-bold text-white mb-2 text-sm flex items-center gap-2 uppercase tracking-widest border-b border-white/10 pb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></span>
              Strategic Analyst (Porter's Framework)
            </h3>
            <p className="text-purple-50 text-sm leading-relaxed pt-2 font-light">{calculations.insightText}</p>
          </div>
        </div>

        {isLocked && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm">
            <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg text-center border border-gray-100 flex flex-col items-center">
              <div className="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-3">Model Locked</h3>
              <p className="text-brand-slate mb-8">Unlock Porter's Five Forces Analyzer and all 10 premium calculators.</p>
              {!showEmailGate ? (
                <button onClick={() => setShowEmailGate(true)} className="btn btn-primary w-full text-lg py-4 shadow-xl">Unlock Premium Access</button>
              ) : (
                <form onSubmit={handleSubscribe} className="w-full space-y-4">
                  <input type="email" placeholder="Enter your work email..." className="input w-full" value={email} onChange={e => setEmail(e.target.value)} required />
                  <button type="submit" disabled={loading} className="btn btn-primary w-full">{loading ? 'Verifying...' : 'Pay & Subscribe'}</button>
                  <button type="button" onClick={() => setShowEmailGate(false)} className="text-sm text-gray-500">Cancel</button>
                </form>
              )}
            </div>
          </div>
        )}

        <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-brand-navy mb-6">Porter's Five Forces Glossary</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {FORCE_DEFINITIONS.map(f => (
              <div key={f.id} className="space-y-2">
                <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">{f.icon}</span> {f.name}</h4>
                <p className="text-sm text-brand-slate leading-relaxed"><strong>Key Factors:</strong> {f.factors.join(', ')}. {f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
