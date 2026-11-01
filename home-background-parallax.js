(() => {
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (!body.classList.contains('home-page') || reduceMotion.matches || !hoverCapable.matches) {
    return;
  }

  const maxOffset = 16;
  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;

  const updateBackground = () => {
    body.style.setProperty('--home-pan-x', `${pointerX}px`);
    body.style.setProperty('--home-pan-y', `${pointerY}px`);
    frame = 0;
  };

  const moveBackground = (event) => {
    pointerX = ((event.clientX / window.innerWidth) - 0.5) * maxOffset;
    pointerY = ((event.clientY / window.innerHeight) - 0.5) * maxOffset;

    if (!frame) {
      frame = window.requestAnimationFrame(updateBackground);
    }
  };

  const resetBackground = () => {
    pointerX = 0;
    pointerY = 0;

    if (!frame) {
      frame = window.requestAnimationFrame(updateBackground);
    }
  };

  window.addEventListener('pointermove', moveBackground, { passive: true });
  window.addEventListener('pointerleave', resetBackground, { passive: true });
})();