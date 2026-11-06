export const categories = [
 ['creative','Creative & Design','Image, video, music and 3D.','palette'],
 ['tools','Productivity & Tools','Utilities that simplify life.','bolt'],
 ['development','Development','Coding, automation and AI.','code'],
 ['education','Education & Research','Learning and exploration.','book'],
 ['games','Games','Games, mods and creative worlds.','game'],
 ['more','More Categories','Explore all available categories.','grid']
].map(([id,name,sub,icon])=>({id,name,sub,icon}));
export const creators = [
 {id:'studio',name:'AppShare Studio',bio:'Small, working examples for exploring the AppShare community preview.'},
 {id:'pablo',name:'Pablo',bio:'Creator of Clementine. This preview includes a sample listing for Clementine.'}
];
export const seeds = [
 ['spectrum','Spectrum','creative','Explore a curated color palette and copy its hex values.'],
 ['clementine','Clementine','tools','A desktop workspace for converting and editing files.'],
 ['indent','Indent','development','Format a JSON document and inspect its structure.'],
 ['fieldnotes','Field Notes','education','A concept for organizing observations into a research notebook.'],
 ['pairs','Color Pairs','games','Find matching colors in a small memory game.']
].map(([id,name,category,description])=>({id,name,category,description,author:id==='clementine'?'pablo':'studio',demo:true,...(id==='spectrum'?{tryUrl:'#/try/spectrum',source:'examples/spectrum.html',remix:true,license:'MIT'}:{}),...(id==='indent'||id==='pairs'?{tryUrl:'#/try/'+id}:{})}));
export function webUrl(value,repo=false){
 try {const u=new URL(value); if(u.protocol!=='https:'||u.username||u.password)return '';
 if(repo && (u.hostname!=='github.com'||u.port||u.search||u.hash||!/^\/[\w.-]+\/[\w.-]+\/?$/.test(u.pathname)))return '';
 return u.href;}catch{return '';}
}
export function matches(app,query){return [app.name,app.description,categories.find(c=>c.id===app.category)?.name].join(' ').toLowerCase().includes(query.trim().toLowerCase());}
