"use strict";

// ค่าแก้ได้
const CONFIG = {
  title: "พี่มีอะไรจะบอกก!!",
  subtitle: "วันนี้มีของขวัญเล็ก ๆ มาฝากนะ",
  gifUrl: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG8xOWt0cW9yNjdicXY4aGQ2MmMzN3J4ZDRram1obTBxbDdiajBrayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8fLFhXd3xpNDDIa3eA/giphy.gif",
  goTo: "next.html"
};

// รอ DOM พร้อมก่อนค่อยผูกอีเวนต์
document.addEventListener("DOMContentLoaded", () => {
  const titleEl = document.getElementById("title");
  const subEl   = document.getElementById("subtitle");
  const imgEl   = document.getElementById("sticker");
  const btnEl   = document.getElementById("nextBtn");

  if (titleEl) titleEl.textContent = CONFIG.title;
  if (subEl)   subEl.textContent   = CONFIG.subtitle;
  if (imgEl)   imgEl.src           = CONFIG.gifUrl;

  // คอนเฟตตี้
  const confettiCanvas = document.getElementById("confetti");
  const ctx = confettiCanvas.getContext("2d");
  let pieces = [];

  function resize() {
    confettiCanvas.width  = innerWidth;
    confettiCanvas.height = innerHeight;
  }
  addEventListener("resize", resize);
  resize();

  function burst(n = 180) {
    for (let i = 0; i < n; i++) {
      pieces.push({
        x: innerWidth / 2,
        y: innerHeight * 0.3,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 1) * 8,
        s: 6 + Math.random() * 6,
        r: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.2,
        // สำคัญ: ต้องเป็น template literal มี backticks `...`
        c: hsl(${Math.random() * 360}, 90%, 65%)
      });
    }
  }

  (function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    for (const p of pieces) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s);
      ctx.restore();
    }
  })();

  // ปุ่มไปต่อ — กันพลาดด้วย preventDefault แล้วค่อยเด้ง
  if (btnEl) {
    btnEl.addEventListener("click", (e) => {
      // ถ้าเป็น <a> ให้กันเด้งทันที เพื่อโชว์คอนเฟตตี้ก่อน
      if (btnEl.tagName === "A") e.preventDefault();
      burst(240);
      setTimeout(() => {
        // ใช้ goTo ถ้ามี ไม่งั้นถ้าเป็น <a> ให้ใช้ href ของปุ่ม
        const target = CONFIG.goTo || btnEl.getAttribute("href") || "next.html";
        location.assign(target);
      }, 350);
    });
  } else {
    console.error("ไม่พบปุ่ม #nextBtn ใน DOM");
  }
});