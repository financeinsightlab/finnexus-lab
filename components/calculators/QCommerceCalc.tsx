'use client';

import { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';

export default function QCommerceCalc({ slug, isPremiumUser }: { slug: string; isPremiumUser?: boolean }) {
  // Dark Store Operations
  const [ordersPerDay, setOrdersPerDay] = useState(300);
  const [avgOrderValue, setAvgOrderValue] = useState(450);
  const [deliveryFee, setDeliveryFee] = useState(25);

  // Cost Structure
  const [darkStoreRent, setDarkStoreRent] = useState(150_000); // monthly
  const [staffCount, setStaffCount] = useState(25);
  const [avgStaffSalary, setAvgStaffSalary] = useState(18_000); // monthly per person
  const [pickingCostPerOrder, setPickingCostPerOrder] = useState(18);
  const [lastMilePerOrder, setLastMilePerOrder] = useState(35);
  const [cogsPercent, setCogsPercent] = useState(62); // product COGS

  // Platform & Ops
  const [platformFeePercent, setPlatformFeePercent] = useState(18);
  const [returnRate, setReturnRate] = useState(3);
  const [marketingPercent, setMarketingPercent] = useState(8);

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
    const ordersPerMonth = ordersPerDay * 30;
    const grossRevenue = ordersPerMonth * avgOrderValue;
    const deliveryRevenue = ordersPerMonth * deliveryFee;
    const totalRevenue = grossRevenue + deliveryRevenue;

    // COGS / Product Cost
    const productCogs = grossRevenue * (cogsPercent / 100);
    const platformFees = totalRevenue * (platformFeePercent / 100);
    const returnsLoss = grossRevenue * (returnRate / 100);
    const grossProfit = totalRevenue - productCogs - platformFees - returnsLoss;
    const cm1Margin = (grossProfit / totalRevenue) * 100;

    // Variable Delivery Costs
    const pickingCosts = ordersPerMonth * pickingCostPerOrder;
    const lastMileCosts = ordersPerMonth * lastMilePerOrder;
    const cm2 = grossProfit - pickingCosts - lastMileCosts;
    const cm2Margin = (cm2 / totalRevenue) * 100;

    // Fixed Store Costs
    const staffCosts = staffCount * avgStaffSalary;
    const totalFixedCosts = darkStoreRent + staffCosts;
    const storeEbitda = cm2 - totalFixedCosts;
    const ebitdaMargin = (storeEbitda / totalRevenue) * 100;

    // Marketing
    const marketingSpend = totalRevenue * (marketingPercent / 100);
    const netStoreProfit = storeEbitda - marketingSpend;
    const netMargin = (netStoreProfit / totalRevenue) * 100;

    // Unit Economics
    const revPerOrder = totalRevenue / ordersPerMonth;
    const cogsPerOrder = productCogs / ordersPerMonth;
    const platformFeePerOrder = platformFees / ordersPerMonth;
    const variableCostPerOrder = pickingCostPerOrder + lastMilePerOrder;
    const fixedCostPerOrder = (totalFixedCosts + marketingSpend) / ordersPerMonth;
    const totalCostPerOrder = cogsPerOrder + platformFeePerOrder + variableCostPerOrder + fixedCostPerOrder;
    const contributionMarginPerOrder = revPerOrder - cogsPerOrder - platformFeePerOrder - variableCostPerOrder;
    const breakEvenOrders = totalFixedCosts / (contributionMarginPerOrder > 0 ? contributionMarginPerOrder : 1);

    // Scenario: Scale to 500, 1000, 2000 orders/day
    const scenarios = [150, 300, 500, 800, 1200, 1800].map(opd => {
      const opm = opd * 30;
      const rev = opm * avgOrderValue + opm * deliveryFee;
      const cogs = rev * (cogsPercent / 100);
      const pf = rev * (platformFeePercent / 100);
      const ret = opm * avgOrderValue * (returnRate / 100);
      const gp = rev - cogs - pf - ret;
      const vd = opm * (pickingCostPerOrder + lastMilePerOrder);
      const cm2s = gp - vd;
      const ebitda = cm2s - totalFixedCosts - rev * (marketingPercent / 100);
      return { orders: `${opd}/day`, EBITDA: Math.round(ebitda), Revenue: Math.round(rev / 1000) };
    });

    // Cost Waterfall
    const waterfall = [
      { name: 'Total Revenue', value: Math.round(totalRevenue / 1000) },
      { name: '- Product COGS', value: -Math.round(productCogs / 1000) },
      { name: '- Platform Fees', value: -Math.round(platformFees / 1000) },
      { name: 'CM1 (Gross Profit)', value: Math.round(cm2 / 1000) },
      { name: '- Picking & Delivery', value: -Math.round((pickingCosts + lastMileCosts) / 1000) },
      { name: 'CM2', value: Math.round(cm2 / 1000) },
      { name: '- Fixed (Rent + Staff)', value: -Math.round(totalFixedCosts / 1000) },
      { name: '- Marketing', value: -Math.round(marketingSpend / 1000) },
      { name: 'Net Store EBITDA', value: Math.round(netStoreProfit / 1000) },
    ];

    let insightText = '';
    if (netStoreProfit < 0) {
      insightText = `Loss-Making Dark Store: At ${ordersPerDay} orders/day, your dark store burns ₹${Math.abs(Math.round(netStoreProfit/1000))}K per month. The fixed cost base (₹${Math.round(totalFixedCosts/1000)}K rent + staff) requires a minimum ${Math.ceil(breakEvenOrders / 30)} orders/day to break even. Your most critical lever is Last-Mile Cost at ₹${lastMilePerOrder}/order — even a 20% reduction here saves ₹${Math.round(ordersPerMonth * lastMilePerOrder * 0.2 / 1000)}K/month. Consider dark store consolidation or delivery batching to survive.`;
    } else if (ebitdaMargin < 8) {
      insightText = `Thin Dark Store Margins Warning: Store-level EBITDA is barely positive at ${ebitdaMargin.toFixed(1)}% margin. Q-Commerce requires a minimum 10-15% EBITDA to absorb central overhead, tech infrastructure, and geographic expansion costs. Prioritize increasing Average Order Value above ₹${Math.round(avgOrderValue * 1.15)} (currently ₹${avgOrderValue}) through cross-sell and bundled product recommendations to improve economics without adding fixed cost.`;
    } else {
      insightText = `Profitable Unit Economics: Congratulations — your dark store generates a healthy ₹${Math.round(netStoreProfit/1000)}K monthly store-level EBITDA at ${ebitdaMargin.toFixed(1)}% margin from ${ordersPerDay} daily orders. Contribution Margin 2 (after picking & delivery) is ₹${contributionMarginPerOrder.toFixed(0)}/order, meaning every incremental order above your breakeven of ${Math.ceil(breakEvenOrders)} monthly orders generates near-pure profit. You are ready to invest in geographic expansion to the next dark store catchment zone.`;
    }

    return { ordersPerMonth, totalRevenue, grossProfit, cm1Margin, cm2, cm2Margin, storeEbitda, ebitdaMargin, netStoreProfit, netMargin, contributionMarginPerOrder, breakEvenOrders, revPerOrder, totalCostPerOrder, scenarios, waterfall, insightText, staffCosts, totalFixedCosts, pickingCosts, lastMileCosts, marketingSpend, platformFees, productCogs };
  }, [ordersPerDay, avgOrderValue, deliveryFee, darkStoreRent, staffCount, avgStaffSalary, pickingCostPerOrder, lastMilePerOrder, cogsPercent, platformFeePercent, returnRate, marketingPercent]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, tag: `unlocked_${slug}` }) });
      if (res.ok) { localStorage.setItem(`unlocked_${slug}`, 'true'); setIsLocked(false); setShowEmailGate(false); }
    } finally { setLoading(false); }
  };

  const fmt = (n: number, currency = '₹') => `${currency}${Math.abs(n) >= 1e6 ? (n/1e6).toFixed(2)+'M' : Math.abs(n) >= 1e3 ? (n/1e3).toFixed(0)+'K' : n}`;

  return (
    <div className="min-h-screen bg-gray-50 py-10 relative">
      <div className="wrap max-w-7xl mx-auto">
        <div className="mb-6">
          <p className="text-teal-600 font-medium mb-2">Premium Web Calculator</p>
          <h1 className="text-3xl font-bold text-brand-navy">Q-Commerce Unit Economics Model</h1>
          <p className="text-brand-slate">Dark store P&L, Contribution Margin waterfall & breakeven engine for quick-commerce operators.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-brand-teal border border-gray-100 mb-8 flex gap-4 max-w-4xl">
          <div className="text-3xl pt-1">💡</div>
          <div>
            <h3 className="font-bold text-brand-navy mb-1">What this tool actually does</h3>
            <p className="text-sm text-brand-slate leading-relaxed">
              Q-Commerce (Swiggy Instamart, Blinkit, Zepto) is one of the most economically complex business models in tech — for every ₹1 of Revenue, there are hidden costs at 5 different layers before a rupee of profit is visible. This model exposes each cost layer individually using the Contribution Margin methodology to find the exact daily order volume needed to break even.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 relative">
          {/* Sidebar */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24 z-20 space-y-4">
            <h3 className="font-bold text-brand-navy border-b pb-4">Operating Assumptions</h3>
            <div className="bg-blue-50/50 -mx-6 px-6 py-4">
              <h4 className="font-bold text-blue-900 text-[11px] uppercase tracking-widest mb-3">Dark Store Volume</h4>
              <div className="space-y-3">
                {[
                  { label: 'Daily Orders', val: ordersPerDay, set: setOrdersPerDay },
                  { label: 'Avg Order Value (₹)', val: avgOrderValue, set: setAvgOrderValue, prefix: '₹' },
                  { label: 'Delivery Fee per Order (₹)', val: deliveryFee, set: setDeliveryFee, prefix: '₹' },
                ].map(({ label, val, set, prefix }) => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                    <div className="relative">
                      {prefix && <span className="absolute left-3 top-2 text-gray-400 text-sm">{prefix}</span>}
                      <input type="number" className={`input w-full py-1.5 text-sm ${prefix ? 'pl-7' : ''}`} value={val} onChange={e => set(Number(e.target.value))} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800 text-xs border-b pb-1">Cost Structure (Monthly)</h4>
              {[
                { label: 'Dark Store Rent (₹/mo)', val: darkStoreRent, set: setDarkStoreRent },
                { label: 'Staff Headcount', val: staffCount, set: setStaffCount },
                { label: 'Avg Staff Salary (₹/mo)', val: avgStaffSalary, set: setAvgStaffSalary },
                { label: 'Picking Cost / Order (₹)', val: pickingCostPerOrder, set: setPickingCostPerOrder },
                { label: 'Last-Mile Delivery / Order (₹)', val: lastMilePerOrder, set: setLastMilePerOrder },
                { label: 'Product COGS %', val: cogsPercent, set: setCogsPercent, suffix: '%' },
                { label: 'Platform Fee %', val: platformFeePercent, set: setPlatformFeePercent, suffix: '%' },
                { label: 'Return Rate %', val: returnRate, set: setReturnRate, suffix: '%' },
                { label: 'Marketing % of Revenue', val: marketingPercent, set: setMarketingPercent, suffix: '%' },
              ].map(({ label, val, set, suffix }) => (
                <div key={label}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <div className="relative">
                    <input type="number" className="input w-full py-1 text-sm bg-gray-50" value={val} onChange={e => set(Number(e.target.value))} />
                    {suffix && <span className="absolute right-3 top-2 text-gray-400 text-sm">{suffix}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className={`lg:col-span-3 space-y-8 ${isLocked ? 'blur-md pointer-events-none select-none opacity-40' : ''} transition-all duration-700`}>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { label: 'Monthly Revenue', val: fmt(calculations.totalRevenue), sub: `${ordersPerDay} orders × ${30} days`, color: 'blue' },
                { label: 'CM2 (after Delivery)', val: fmt(calculations.cm2), sub: `${calculations.cm2Margin.toFixed(1)}% CM2 margin`, color: 'green' },
                { label: 'Net Store EBITDA', val: fmt(calculations.netStoreProfit), sub: `${calculations.netMargin.toFixed(1)}% net margin`, color: calculations.netStoreProfit >= 0 ? 'teal' : 'red' },
              ].map(({ label, val, sub, color }) => (
                <div key={label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                  <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-30 group-hover:scale-150 transition-transform bg-${color}-100`}></div>
                  <div className="relative z-10">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">{label}</p>
                    <h4 className={`text-3xl font-bold ${calculations.netStoreProfit < 0 && label.includes('EBITDA') ? 'text-red-500' : 'text-brand-navy'}`}>{val}</h4>
                    <p className="text-xs text-brand-slate mt-1">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Breakeven */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <p className="text-xs font-semibold text-yellow-700 uppercase tracking-widest mb-1">Breakeven Orders/Mo</p>
                <p className="text-3xl font-bold text-brand-navy">{Math.ceil(calculations.breakEvenOrders).toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">≈ {Math.ceil(calculations.breakEvenOrders / 30)}/day needed</p>
              </div>
              <div className="text-center p-4 bg-sky-50 rounded-xl">
                <p className="text-xs font-semibold text-sky-700 uppercase tracking-widest mb-1">Revenue per Order</p>
                <p className="text-3xl font-bold text-brand-navy">₹{Math.round(calculations.revPerOrder)}</p>
                <p className="text-xs text-gray-500 mt-1">incl. delivery fee charged</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <p className="text-xs font-semibold text-red-700 uppercase tracking-widest mb-1">All-In Cost per Order</p>
                <p className="text-3xl font-bold text-brand-navy">₹{Math.round(calculations.totalCostPerOrder)}</p>
                <p className="text-xs text-gray-500 mt-1">COGS + delivery + fixed share</p>
              </div>
            </div>

            {/* Scale Scenarios Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-brand-navy mb-6">Order Volume Scenarios — Store EBITDA (₹K/month)</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={calculations.scenarios} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="orders" tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={v => `₹${v}K`} tick={{ fontSize: 11 }} />
                    <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="4 4" />
                    <Tooltip formatter={(v: any) => `₹${v}K`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0/0.1)' }} />
                    <Bar dataKey="EBITDA" name="Monthly EBITDA (₹K)" fill="#0d9488" radius={[4, 4, 0, 0]}>
                      {calculations.scenarios.map((s, i) => <Bar key={i} dataKey="EBITDA" fill={s.EBITDA >= 0 ? '#0d9488' : '#ef4444'} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Excel Matrix */}
            <div className="bg-white border border-gray-300 shadow-lg rounded-sm overflow-hidden">
              <div className="bg-[#107c41] text-white px-3 py-1 text-[11px] font-medium flex items-center gap-2">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M2 3h20v4H2zm0 6h6v12H2zm8 0h12v3H10zm0 4.5h12v3H10zm0 4.5h12v3H10z"/></svg>
                <span>Q_Commerce_Dark_Store_Unit_Economics.xlsx</span>
              </div>
              <div className="bg-white border-b border-gray-300 px-3 py-1.5 text-[11px] flex items-center gap-2">
                <span className="font-bold italic text-gray-400 px-1">fx</span>
                <div className="bg-white border border-blue-300 w-full px-2 py-0.5 h-5 flex items-center shadow-inner text-xs">
                  =CM2 - FixedCosts - Marketing = Store_EBITDA
                </div>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="w-full text-[11px] whitespace-nowrap border-collapse select-text">
                  <thead>
                    <tr>
                      <th className="bg-gray-100 border border-gray-300 w-8 sticky left-0"></th>
                      <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-bold text-gray-600 uppercase sticky left-6 z-30 min-w-[250px]">P&L Line Item</th>
                      <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-center font-bold text-gray-600 uppercase">Monthly (₹)</th>
                      <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-center font-bold text-gray-600 uppercase">Per Order (₹)</th>
                      <th className="border border-gray-300 bg-gray-100 px-3 py-2 text-center font-bold text-gray-600 uppercase">% of Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { i: '1', label: 'Gross Product Revenue', mo: calculations.totalRevenue - calculations.ordersPerMonth * deliveryFee, por: avgOrderValue, pct: ((calculations.totalRevenue - calculations.ordersPerMonth * deliveryFee)/calculations.totalRevenue)*100, bold: true },
                      { i: '2', label: 'Delivery Fee Revenue', mo: calculations.ordersPerMonth * deliveryFee, por: deliveryFee, pct: (calculations.ordersPerMonth * deliveryFee/calculations.totalRevenue)*100 },
                      { i: '3', label: 'TOTAL REVENUE', mo: calculations.totalRevenue, por: Math.round(calculations.revPerOrder), pct: 100, bold: true, highlight: 'blue' },
                      { i: '4', label: '  (—) Product COGS', mo: -calculations.productCogs, por: -(calculations.productCogs/calculations.ordersPerMonth), pct: -(cogsPercent), neg: true },
                      { i: '5', label: '  (—) Platform Fees', mo: -calculations.platformFees, por: -(calculations.platformFees/calculations.ordersPerMonth), pct: -(platformFeePercent), neg: true },
                      { i: '6', label: '  (—) Returns Loss', mo: -(calculations.totalRevenue - calculations.ordersPerMonth * deliveryFee) * returnRate/100, por: -avgOrderValue * returnRate/100, pct: -returnRate, neg: true },
                      { i: '7', label: 'CONTRIBUTION MARGIN 1 (Gross)', mo: calculations.grossProfit, por: Math.round(calculations.cm2 / calculations.ordersPerMonth + pickingCostPerOrder + lastMilePerOrder), pct: calculations.cm1Margin, bold: true, highlight: 'green' },
                      { i: '8', label: '  (—) Picking Cost', mo: -calculations.pickingCosts, por: -pickingCostPerOrder, pct: -(calculations.pickingCosts/calculations.totalRevenue)*100, neg: true },
                      { i: '9', label: '  (—) Last-Mile Delivery', mo: -calculations.lastMileCosts, por: -lastMilePerOrder, pct: -(calculations.lastMileCosts/calculations.totalRevenue)*100, neg: true },
                      { i: '10', label: 'CONTRIBUTION MARGIN 2 (Net Delivery)', mo: calculations.cm2, por: Math.round(calculations.contributionMarginPerOrder), pct: calculations.cm2Margin, bold: true, highlight: 'teal' },
                      { i: '11', label: '  (—) Dark Store Rent', mo: -darkStoreRent, por: -(darkStoreRent/calculations.ordersPerMonth), pct: -(darkStoreRent/calculations.totalRevenue)*100 },
                      { i: '12', label: '  (—) Staff Cost', mo: -calculations.staffCosts, por: -(calculations.staffCosts/calculations.ordersPerMonth), pct: -(calculations.staffCosts/calculations.totalRevenue)*100 },
                      { i: '13', label: '  (—) Marketing Spend', mo: -calculations.marketingSpend, por: -(calculations.marketingSpend/calculations.ordersPerMonth), pct: -marketingPercent },
                      { i: '14', label: 'NET STORE EBITDA', mo: calculations.netStoreProfit, por: Math.round(calculations.netStoreProfit/calculations.ordersPerMonth), pct: calculations.netMargin, bold: true, highlight: 'navy' },
                    ].map(row => (
                      <tr key={row.i} className={`hover:bg-blue-50/30 group ${row.highlight === 'navy' ? 'bg-[#eef3fb]' : row.highlight === 'green' ? 'bg-green-50/20' : row.highlight === 'teal' ? 'bg-teal-50/10' : row.highlight === 'blue' ? 'bg-sky-50/20' : ''}`}>
                        <td className="border border-gray-300 bg-gray-100 text-center font-bold text-gray-400 text-xs w-6 sticky left-0 z-20">{row.i}</td>
                        <td className={`border border-gray-200 px-2 py-1.5 sticky left-6 z-20 ${row.bold ? 'font-bold text-gray-800' : 'text-gray-500 pl-8'} bg-white group-hover:bg-blue-50/0`}>{row.label}</td>
                        <td className={`border border-gray-200 px-3 py-1.5 text-right font-mono ${row.highlight === 'navy' ? 'font-extrabold text-[#0b5c96] text-[13px]' : row.mo < 0 ? 'text-red-600' : 'text-gray-700'} ${row.bold ? 'font-bold' : ''}`}>
                          {row.mo < 0 ? `(₹${Math.round(Math.abs(row.mo)).toLocaleString()})` : `₹${Math.round(row.mo).toLocaleString()}`}
                        </td>
                        <td className={`border border-gray-200 px-3 py-1.5 text-right font-mono ${Math.round(row.por) < 0 ? 'text-red-600' : 'text-gray-700'} ${row.bold ? 'font-bold' : ''}`}>
                          {Math.round(row.por) < 0 ? `(₹${Math.abs(Math.round(row.por))})` : `₹${Math.round(row.por)}`}
                        </td>
                        <td className={`border border-gray-200 px-3 py-1.5 text-right font-mono ${row.pct < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                          {row.pct.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-brand-navy p-6 rounded-2xl shadow-lg relative overflow-hidden border-t-4 border-t-orange-500">
              <h3 className="font-bold text-white mb-2 text-sm flex items-center gap-2 uppercase tracking-widest border-b border-white/10 pb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse"></span>
                Q-Commerce Analyst Engine
              </h3>
              <p className="text-orange-50 text-sm leading-relaxed pt-2 font-light">{calculations.insightText}</p>
            </div>
          </div>

          {isLocked && (
            <div className="absolute inset-0 z-50 flex items-center justify-center pt-20">
              <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg text-center border border-gray-100 flex flex-col items-center">
                <div className="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-3">Model Locked</h3>
                <p className="text-brand-slate mb-8">Unlock the Q-Commerce Unit Economics Model and all 10 premium calculators.</p>
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
        </div>

        <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-brand-navy mb-6">Q-Commerce Economics Glossary</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: '🏪', title: 'Dark Store', body: 'A micro-warehouse (1,500–4,000 sq ft) located within a 2–3 km radius of residential demand clusters. Unlike a supermarket, it is closed to the public and optimized purely for picking speed. Rent, cooling, and staff cost are fixed overheads that must be covered by order volume.' },
              { icon: '🏎️', title: 'Contribution Margin 2 (CM2)', body: 'The standard financial KPI for Q-Commerce profitability. It subtracts the two variable delivery costs — Picking (warehouse labor per order) and Last-Mile Delivery (rider + fuel) — from the Gross Profit. Achieving a positive CM2 is the absolute minimum required for business viability.' },
              { icon: '⚡', title: 'Breakeven Daily Orders', body: 'The minimum number of daily orders required for the dark store to cover its fixed costs (rent + staff + marketing). Below this threshold, every order delivered actually loses money. This is the single most important operational KPI for a Q-Commerce founder.' },
              { icon: '📦', title: 'Last-Mile Delivery Cost', body: 'The single largest variable cost in Q-Commerce. Rider wages, fuel, battery, and app infrastructure typically cost ₹25–₹60 per order in India. Since delivery fees charged to customers rarely cover this cost, the product margin must cross-subsidize every delivery.' },
            ].map(({ icon, title, body }) => (
              <div key={title} className="space-y-2">
                <h4 className="font-bold text-brand-navy text-lg flex items-center gap-2"><span className="text-2xl">{icon}</span> {title}</h4>
                <p className="text-sm text-brand-slate leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
