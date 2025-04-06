const slide = document.querySelector(".slide");
const move = document.querySelector(".slide__wrapper");
const counter = document.querySelector(".counter");

counter.addEventListener("mouseenter", () => {
  slide.style.animationPlayState = "paused";
});
counter.addEventListener("mouseleave", () => {
  slide.style.animationPlayState = "running";
});


let dragging = false;
let startX = 0;

counter.addEventListener("mousedown", (e) => {
    dragging = true;
  startX = e.clientX;
});

document.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  const value = e.clientX - startX;
  move.style.transform = `translateX(${value}px)`;
});

document.addEventListener("mouseup", () => {
  if (dragging) {
    dragging = false;
  }
});