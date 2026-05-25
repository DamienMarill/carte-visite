<script>
  import { onMount, onDestroy } from 'svelte';

  let videoEl = $state(null);
  let canvasEl = $state(null);
  let active = $state(false);
  let rafId = null;
  let stream = null;

  // Tiny canvas = natural pixelation → blur does the rest
  const W = 16;
  const H = 9;

  async function startCamera() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: 64, height: 36 },
        audio: false
      });
      if (videoEl) {
        videoEl.srcObject = stream;
        await videoEl.play();
        active = true;
        draw();
      }
    } catch {
      active = false;
    }
  }

  function draw() {
    if (!active || !canvasEl || !videoEl) return;
    const ctx = canvasEl.getContext('2d');
    ctx.drawImage(videoEl, 0, 0, W, H);
    rafId = requestAnimationFrame(draw);
  }

  function stop() {
    active = false;
    if (rafId) cancelAnimationFrame(rafId);
    if (stream) stream.getTracks().forEach(t => t.stop());
  }

  onMount(() => {
    startCamera();
  });

  onDestroy(() => {
    stop();
  });
</script>

<!-- Hidden video source -->
<video bind:this={videoEl} class="hidden" playsinline muted></video>

<!-- Ambient canvas -->
<canvas
  bind:this={canvasEl}
  width={W}
  height={H}
  class="ambient-canvas"
  class:ambient-active={active}
></canvas>

<!-- Always-present night overlay -->
<div class="ambient-overlay"></div>

<style>
  .ambient-canvas {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: -2;
    object-fit: cover;
    filter: blur(60px) saturate(1.8) brightness(0.35);
    transform: scale(1.3) translateZ(0);
    opacity: 0;
    transition: opacity 1.5s ease;
    image-rendering: pixelated;
  }

  .ambient-active {
    opacity: 1;
  }

  .ambient-overlay {
    position: fixed;
    inset: 0;
    z-index: -1;
    background: linear-gradient(
      180deg,
      rgba(4, 4, 4, 0.7) 0%,
      rgba(40, 42, 73, 0.5) 50%,
      rgba(4, 4, 4, 0.8) 100%
    );
    pointer-events: none;
  }
</style>
