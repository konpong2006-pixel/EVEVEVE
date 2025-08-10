"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // คอนเฟตตี้เบา ๆ ให้ฟีลปิดฉาก
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  addEventListener("resize", resize); resize();

  function burst(n=160){
    const pcs=[];
    for(let i=0;i<n;i++){
      pcs.push({
        x: innerWidth/2, y: innerHeight*.25,
        vx:(Math.random()-.5)*7, vy:(Math.random()-1)*7,
        s:5+Math.random()*5, r:Math.random()*6.28, vr:(Math.random()-.5)*.2,
        c:`hsl(${Math.random()*360},90%,65%)`, life:90+Math.random()*40
      });
    }
    (function loop(){
      const alive=[];
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(const p of pcs){
        p.x+=p.vx; p.y+=p.vy; p.vy+=.07; p.r+=p.vr; p.life--;
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r);
        ctx.fillStyle=p.c; ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s); ctx.restore();
        if(p.life>0) alive.push(p);
      }
      if(alive.length){ requestAnimationFrame(loop); }
    })();
  }

  // ยิงครั้งเดียวพอกรุบกริบ
  burst(220);
});