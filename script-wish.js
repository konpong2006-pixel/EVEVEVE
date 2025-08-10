"use strict";

/* ===== ตั้งค่าของ Google Forms (ของคุณจริง) ===== */
const FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSd4CWHW_8f4JrpUN1Qi_HL9UleipG9dZJHWGjXVLTc13cTzQg/formResponse";
const ENTRY_ID    = "entry.1723846225";
/* ================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ใส่ action และ name ของช่องให้ฟอร์ม
  const form     = document.getElementById("gform");
  const wishText = document.getElementById("wishText");
  const okBox    = document.getElementById("ok");
  const sendBtn  = document.getElementById("sendBtn");

  form.action = FORM_ACTION;
  wishText.setAttribute("name", ENTRY_ID);

  // คอนเฟตตี้เล็ก ๆ
  const canvas = document.getElementById("confetti");
  const ctx    = canvas.getContext("2d");
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  addEventListener("resize", resize); resize();

  function burst(n=200){
    const pcs=[];
    for(let i=0;i<n;i++){
      pcs.push({
        x:innerWidth/2, y:innerHeight*.25,
        vx:(Math.random()-.5)*8, vy:(Math.random()-1)*8,
        s:6+Math.random()*6, r:Math.random()*6.28, vr:(Math.random()-.5)*.2,
        c:`hsl(${Math.random()*360},90%,65%)`
      });
    }
    let t=0;
    (function loop(){
      t++; if(t>100) return requestAnimationFrame(()=>ctx.clearRect(0,0,canvas.width,canvas.height));
      requestAnimationFrame(loop);
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pcs.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy; p.vy+=.08; p.r+=p.vr;
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r);
        ctx.fillStyle=p.c; ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s); ctx.restore();
      });
    })();
  }

  // ส่งฟอร์มแบบไม่รีเฟรชหน้า (ผ่าน iframe ซ่อนใน wish.html)
  form.addEventListener("submit", () => {
    sendBtn.disabled = true;
    sendBtn.textContent = "กำลังส่ง…";
    setTimeout(() => {
      burst(240);
      okBox.style.display = "block";
      sendBtn.textContent = "ส่งคำขอ ▶";
      sendBtn.disabled = false;
      wishText.value = "";
    }, 600);
  });
});