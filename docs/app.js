const $ = id => document.getElementById(id);
let prompts = [], chosen = null, project = '全部', search = '', sort = 'updated';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render() {
  const projects = ['全部', ...new Set(prompts.map(p => p.project))];
  $('filters').innerHTML = projects.map(x => `<button class="chip ${project===x?'active':''}" data-project="${esc(x)}">${esc(x)}</button>`).join('');
  document.querySelectorAll('[data-project]').forEach(b => b.onclick = () => {project=b.dataset.project;render();});
  const matches = prompts.filter(p => (project==='全部'||p.project===project) && [p.title,p.project,p.description,...p.tags].join(' ').toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => sort==='updated' ? (b.updated_at||'').localeCompare(a.updated_at||'') || a.id.localeCompare(b.id) : sort==='title' ? a.title.localeCompare(b.title,'zh-Hant') : a.id.localeCompare(b.id));
  $('count').textContent = `共 ${prompts.length} 份 Prompt · 顯示 ${matches.length} 份`;
  $('items').innerHTML = matches.length ? matches.map(p => `<button class="item ${chosen===p.id?'active':''}" data-id="${esc(p.id)}"><strong><span class="item-id">${esc(p.id)}</span>｜${esc(p.title)}</strong><small>${esc(p.project)} · ${esc(p.status)} · 更新：${esc(p.updated_at||'未註記')}</small></button>`).join('') : '<div class="empty">找不到符合條件的 Prompt</div>';
  document.querySelectorAll('[data-id]').forEach(b => b.onclick = () => {chosen=b.dataset.id;render();});
  const p = prompts.find(p => p.id===chosen);
  if (!p) {$('detail').innerHTML='<p class="muted">請選擇一份 Prompt</p>';return;}
  $('detail').innerHTML = `<div class="eyebrow">PROMPT DETAIL · <span>${esc(p.id)}</span> <button class="copy-id" id="copy-id" type="button" title="複製 Prompt ID" aria-label="複製 Prompt ID ${esc(p.id)}">複製 ID</button></div><h1>${esc(p.title)}</h1><p class="desc">${esc(p.description)}</p><div class="meta"><span class="pill">專案：${esc(p.project)}</span><span class="pill">狀態：${esc(p.status)}</span><span class="pill">最後更新：${esc(p.updated_at||'未註記')}</span>${p.version?`<span class="pill">版本：${esc(p.version)}</span>`:''}${p.tags.map(t=>`<span class="pill">#${esc(t)}</span>`).join('')}</div><div class="actions"><button class="btn primary" id="copy">複製 Prompt</button><button class="btn" id="download">下載 Markdown</button></div><pre id="promptbody"></pre><p class="note">唯讀展示：此網頁不會直接修改 GitHub。修改請透過 GitHub 或已授權的 AI 工作流程。</p>`;
  $('promptbody').textContent=p.content;
  $('copy-id').onclick=async()=>{try{await navigator.clipboard.writeText(p.id);$('copy-id').textContent='已複製 ✓';}catch{alert('複製失敗，請手動選取 ID。');}};
  $('copy').onclick=async()=>{try{await navigator.clipboard.writeText(p.content);$('copy').textContent='已複製 ✓';}catch{alert('複製失敗，請手動選取文字。');}};
  $('download').onclick=()=>{const blob=new Blob(['# '+p.title+'\n\n'+p.content+'\n'],{type:'text/markdown;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=p.id+'.md';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};
}
$('search').addEventListener('input',e=>{search=e.target.value;render();});
$('sort').addEventListener('change',e=>{sort=e.target.value;render();});
async function init(){try{const r=await fetch('./prompts.json',{cache:'no-store'});if(!r.ok)throw Error(r.status);const x=await r.json();if(!Array.isArray(x))throw Error('Invalid data');prompts=x;chosen=x[0]?.id||null;$('source').textContent='資料來源：prompts.json';}catch(e){$('source').textContent='載入失敗：'+e.message;}render();}
init();
