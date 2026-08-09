/* Header quick-review action: opens due spaced-review work. */
(function(){
const button=document.getElementById('quickReview');
if(!button)return;
function due(){try{let d=new Date().toISOString().slice(0,10);return JSON.parse(localStorage.getItem('reviewQueue')||'[]').filter(x=>x.due<=d)}catch{return []}}
function update(){let n=due().length;button.textContent=n?'↻ '+n:'↻';button.title=n?'Open '+n+' due review task'+(n===1?'':'s'):'Open Mastery & Review';button.setAttribute('aria-label',button.title)}
button.onclick=()=>{go('mastery');setTimeout(()=>{let d=due();if(d.length)toast(d.length+' review task'+(d.length===1?' is':'s are')+' due. Start with: '+d[0].skill);else toast('No review tasks are due. Continue your next practical mission.')},80)};
update();
})();
