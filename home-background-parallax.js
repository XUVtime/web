(() => {
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (!body.classList.contains('home-page') || reduceMotion.matches || !hoverCapable.matches) {
    return;
  }

  const maxOffset = 16;
  const rippleLifetime = 1050;
  const ripples = [];
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  let pointerX = 0;
  let pointerY = 0;
  let lastPointer = null;
  let lastRippleAt = 0;
  let rippleFrame = 0;

  canvas.className = 'home-background-ripples';
  canvas.setAttribute('aria-hidden', 'true');
  body.appendChild(canvas);

  const resizeCanvas = () => {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(window.innerWidth * pixelRatio);
    canvas.height = Math.round(window.innerHeight * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  };

  const paintRipples = (now) => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.globalCompositeOperation = 'screen';

    for (let rippleIndex = ripples.length - 1; rippleIndex >= 0; rippleIndex -= 1) {
      const ripple = ripples[rippleIndex];
      const progress = (now - ripple.startedAt) / rippleLifetime;

      if (progress >= 1) {
        ripples.splice(rippleIndex, 1);
        continue;
      }

      for (let wave = 0; wave < 3; wave += 1) {
        const waveProgress = progress - wave * 0.16;
        if (waveProgress <= 0) continue;

        const radius = 14 + waveProgress * 118;
        const alpha = (1 - progress) * 0.36;
        context.beginPath();
        context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(220, 240, 255, ${alpha})`;
        context.lineWidth = 2 - progress * 0.9;
        context.stroke();
      }
    }

    context.globalCompositeOperation = 'source-over';
  };

  const drawRipples = (now) => {
    paintRipples(now);
    if (ripples.length) {
      rippleFrame = window.requestAnimationFrame(drawRipples);
    } else {
      rippleFrame = 0;
    }
  };

  const startRippleAnimation = (now) => {
    paintRipples(now);
    if (!rippleFrame) rippleFrame = window.requestAnimationFrame(drawRipples);
  };

  const moveBackground = (event) => {
    pointerX = ((event.clientX / window.innerWidth) - 0.5) * maxOffset;
    pointerY = ((event.clientY / window.innerHeight) - 0.5) * maxOffset;
    body.style.setProperty('--home-pan-x', `${pointerX}px`);
    body.style.setProperty('--home-pan-y', `${pointerY}px`);

    const now = performance.now();
    if (lastPointer) {
      const distance = Math.hypot(event.clientX - lastPointer.x, event.clientY - lastPointer.y);
      if (distance > 18 && now - lastRippleAt > 55) {
        ripples.push({ x: event.clientX, y: event.clientY, startedAt: now });
        if (ripples.length > 18) ripples.shift();
        lastRippleAt = now;
        startRippleAnimation(now);
      }
    }
    lastPointer = { x: event.clientX, y: event.clientY };
  };

  const resetBackground = () => {
    pointerX = 0;
    pointerY = 0;
    lastPointer = null;
    body.style.setProperty('--home-pan-x', '0px');
    body.style.setProperty('--home-pan-y', '0px');
  };

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('pointermove', moveBackground, { passive: true });
  window.addEventListener('pointerleave', resetBackground, { passive: true });
})();