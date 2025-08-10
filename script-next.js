// ---------- ปรับได้ ----------
const CONFIG2 = {
  messages: [
    "พี่จะบอกว่าขอบคุณมากๆที่หนูเข้ามาในชีวิตพี่",
    "ดีใจมากๆเลยย ที่มีน้องเป็นแฟน น้องเป็นแฟนที่น่ารักมากก",
    "พี่ไม่รู้ว่าทำอันนี้ตั้งแต่เดือนแรกอาจจะเว่อไปรึป่าว แต่ว่า!!",
    "พี่อยากจะบอกว่าพี่จะไม่เบื่อหนูแน่นอนพี่รักหนูมากนะคะเด็กดื้อ",
    "รักที่สุดเลยยยยย 🥰"
  ],
  nextUrl: "wish.html" // เปลี่ยนปลายทางได้ตามต้องการ
};
// -----------------------------

const typeBox = document.getElementById("type");
const cursor = document.getElementById("cursor");

// typewriter
async function startTypewriter(){
  for(const line of CONFIG2.messages){
    await typeLine(line + "\n\n");
    await wait(250);
  }
  cursor.style.display = "none";
}
function typeLine(text){
  return new Promise(resolve=>{
    let i = 0, sp = 18 + Math.random()*18;
    const t = setInterval(()=>{
      typeBox.textContent += text[i++] || "";
      if(i > text.length){ clearInterval(t); resolve(); }
    }, sp);
  });
}
const wait = ms => new Promise(r=>setTimeout(r,ms));

// confetti (เหมือนหน้าแรก)
const canvas = document.getElementById("confetti");
const ctx2 = canvas.getContext("2d");
let pieces2 = [];
function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
addEventListener("resize", resize); resize();
function burst(n=200){
  for(let i=0;i<n;i++){
    pieces2.push({
      x: innerWidth/2, y: innerHeight*.25,
      vx:(Math.random()-0.5)*8, vy:(Math.random()-1)*8,
      s:6+Math.random()*6, r:Math.random()*6.28, vr:(Math.random()-0.5)*.2,
      c:`hsl(${Math.random()*360},90%,65%)`
    });
  }
}
(function loop(){
  requestAnimationFrame(loop);
  ctx2.clearRect(0,0,canvas.width,canvas.height);
  pieces2.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy; p.vy+=.08; p.r+=p.vr;
    ctx2.save(); ctx2.translate(p.x,p.y); ctx2.rotate(p.r);
    ctx2.fillStyle=p.c; ctx2.fillRect(-p.s/2,-p.s/2,p.s,p.s); ctx2.restore();
  });
  pieces2 = pieces2.filter(p=>p.y < innerHeight + 30);
})();

// เริ่ม!
startTypewriter();
burst(180);

// ปุ่มถัดไป
document.getElementById("nextNextBtn").addEventListener("click", ()=>{
  burst(260);
  if (CONFIG2.nextUrl) {
    setTimeout(()=>location.href = CONFIG2.nextUrl, 380);
  }
});