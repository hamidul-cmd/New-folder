const slide = document.querySelector(".slide");
const move = document.querySelector(".slide__wrapper");
const counter = document.querySelector(".counter");

let step = window.innerWidth < 768 ? 400 : 1200;
let maxOffset = step * 2;
let offset = 0;

window.addEventListener("resize", () => {
  step = window.innerWidth < 768 ? 400 : 1200;
  maxOffset = step * 2;
});

let autoSlide;

function startAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => {
    if (offset < maxOffset) {
      offset += step;
      if (offset > maxOffset) offset = maxOffset;

      move.style.transition = "transform 0.5s ease-in-out";
      move.style.transform = `translateX(-${offset}px)`;

      if (offset === maxOffset) {
        clearInterval(autoSlide);
      }
    }
  }, 3000);
}

startAutoSlide();

counter.addEventListener("mouseenter", () => clearInterval(autoSlide));
counter.addEventListener("mouseleave", () => {
  if (offset < maxOffset) startAutoSlide();
});

let dragging = false;
let startX = 0;
let startOffset = 0;

counter.addEventListener("mousedown", (e) => {
  dragging = true;
  startX = e.clientX;
  startOffset = offset;
  clearInterval(autoSlide);
  move.style.transition = "none";
});

document.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  const delta = e.clientX - startX;
  let newOffset = startOffset - delta;

  newOffset = Math.max(0, Math.min(maxOffset, newOffset));
  move.style.transform = `translateX(-${newOffset}px)`;
});

document.addEventListener("mouseup", (e) => {
  if (!dragging) return;

  const delta = e.clientX - startX;
  offset = startOffset - delta;
  offset = Math.max(0, Math.min(maxOffset, offset));
  dragging = false;

  move.style.transition = "transform 0.3s ease-out";
  move.style.transform = `translateX(-${offset}px)`;

  if (offset < maxOffset) startAutoSlide();
});
