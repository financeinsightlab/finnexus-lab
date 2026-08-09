/* Full 15-level roadmap and progression view, derived from local evidence. */
(function(){
const roadmap=[
 ['0','Analytics Orientation','Learn analyst thinking, business questions, metrics, and decision framing.','Business fundamentals','renderCourse'],
 ['1','Spreadsheet Analyst','Clean data, calculate KPIs, analyze with formulas and pivots, build dashboards.','Sales dashboard project','renderSpreadsheet'],
 ['2','Statistics for Decisions','Understand variation, confidence, testing, experiments, correlation, and causality.','Campaign experiment memo','renderStatistics'],
 ['3','SQL Analyst','Query, join, model, cohort, retain, and validate relational business data.','SaaS retention SQL project','renderSQLCourse'],
 ['4','Python Analyst','Use Pandas, notebooks, visualizations, features, and analyst models.','Customer segmentation notebook','renderPythonCourse'],
 ['5','Data Quality Professional','Profile, clean, validate, reconcile, document, and govern data.','Enterprise cleanup project','renderQualityCourse'],
 ['6','Business Intelligence Builder','Model data, write measures, and deliver decision-ready dashboards.','Executive sales dashboard','renderBICourse'],
 ['7','Business Analytics Strategist','Use economics, KPIs, funnels, scenarios, root cause, and recommendations.','SaaS growth analysis','renderBusinessCourse'],
 ['8','Financial Analytics Specialist','Analyze statements, budgets, models, investment and financial scenarios.','SaaS model / variance dashboard','renderFinanceCourse'],
 ['9','Product Analytics Specialist','Analyze product value, events, activation, cohorts, funnels, and experiments.','Mobile activation / retention project','renderProductCourse'],
 ['10','Advanced Analytics Practitioner','Build and evaluate forecasts, classifiers, clusters, and decision models.','Churn or demand model','renderAdvancedCourse'],
 ['11','Analytics Engineer','Create tested, documented, monitored analytical data products.','Tested revenue mart','renderEngineeringCourse'],
 ['12','AI Analytics Practitioner','Use AI with grounding, evaluation, privacy, review, and safe workflows.','AI feedback/report/NL SQL project','renderAICourse'],
 ['13','Case and Consulting Analyst','Solve ambiguous strategy, operations, product, and profitability cases.','Five-case consulting portfolio','renderCaseCourse'],
 ['14','Production & Career Ready','Package capstones, portfolio proof, interviews, and job-search evidence.','End-to-end capstones','renderProductionCourse']
 ];
 const pct=(k,total)=>{try{return Math.min(1,JSON.parse(localStorage.getItem(k)||'[]').length/total)}catch{return 0}};
 function scores(){let p=[.2,pct('sheetLabDone',7),.2,pct('sqlLabDone',6),pct('pyLabDone',7),.1,pct('pyLabDone',7),pct('biLabDone',6),pct('caseLabDone',5),.1,.05,pct('caseLabDone',5),.05,.1,.05,pct('caseLabDone',5),Math.min(1,(+localStorage.getItem('spProjects')||0)/5)];return p.map(x=>Math.round(x*100))}
 function target(i){return roadmap[i][4]+'(0)'}
 window.renderRoadmap=function(){let progress=scores(),first=progress.findIndex((x,i)=>x<70&&i>0);if(first<0)first=14;let pg=document.getElementById('pathGrid');if(!pg)return;document.querySelector('#path').innerHTML=`<div class="hero"><div><h1>Your Analytics Professional Roadmap</h1><p>15 evidence-based levels. Unlock confidence through labs, projects, cases, and portfolio proof—not passive completion.</p></div><button class="secondary" onclick="go('mastery')">View mastery evidence</button></div><div class="card pad" style="margin-bottom:18px"><div class="title-row"><div><h2>Next recommended milestone</h2><p style="color:var(--muted);margin:5px 0">Level ${roadmap[first][0]} · ${roadmap[first][1]} — ${roadmap[first][3]}</p></div><button class="primary" onclick="go('lesson');${target(first)}">Start recommended level →</button></div><div class="bar"><i style="width:${Math.round(progress.reduce((a,b)=>a+b,0)/(15*100)*100)}%;background:var(--green)"></i></div></div><div class="grid path-grid" id="pathGrid">${roadmap.map((r,i)=>{let state=progress[i]>=70?'completed':i===first?'current':i>first?'locked':'available';return `<div class="card level ${state==='locked'?'locked':''}" style="min-height:215px"><div class="num">LEVEL ${String(r[0]).padStart(2,'0')} · ${state.toUpperCase()}</div><h3>${r[1]}</h3><p>${r[2]}</p><div class="bar" style="margin-top:13px"><i style="width:${Math.max(2,progress[i])}%;background:${state==='completed'?'var(--green)':state==='current'?'var(--blue)':'#cbd3df'}"></i></div><div class="level-foot"><span>${progress[i]}% · ${r[3]}</span>${state==='locked'?'<span>🔒</span>':`<button class="secondary" onclick="go('lesson');${target(i)}">${state==='completed'?'Review →':'Continue →'}</button>`}</div></div>`}).join('')}</div>`};
 // Update dashboard journey visual to reflect all pathway stages and make it clickable.
 function updateDashboard(){let j=document.querySelector('#dashboard .journey');if(!j)return;let p=scores(),current=p.findIndex((x,i)=>x<70&&i>0);if(current<0)current=14;j.style.overflowX='auto';j.style.paddingBottom='8px';j.innerHTML=roadmap.map((r,i)=>`<div class="step ${p[i]>=70?'done':i===current?'current':''}" onclick="go('path')" style="min-width:64px;cursor:pointer"><span>L${r[0]}</span></div>`).join('');let title=document.querySelector('#dashboard .title-row h2');if(title&&title.textContent.includes('journey'))title.textContent='Your 15-level journey to Analytics Professional'}
 const oldGo=window.go;window.go=function(id){oldGo(id);if(id==='path')renderRoadmap();if(id==='dashboard')updateDashboard()};
 renderRoadmap();updateDashboard();
})();
