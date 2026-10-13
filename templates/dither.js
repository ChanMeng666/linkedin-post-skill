// The Caldera plate motif, drawn in code — the same vocabulary as the README artwork in
// ChanMeng666/scripts/readme-art/kit.mjs. No image model, nothing fetched.
//
// Include after the stage markup:  <script src="../../templates/dither.js"></script>
//
//   <canvas class="dither"></canvas>
//     A field of SQUARE pixels in ordered dither (8×8 Bayer): sparse at one edge, almost solid
//     at the other, one flat colour, hard cuts. Never round dots, never a colour gradient.
//     Size and place the canvas with CSS; the drawing follows the box.
//       data-angle   direction the field thickens, degrees (0 = toward the right, 90 = downward).
//                    Falls back to the CSS variable --dither-angle, then 0.
//       data-cell    pixel pitch in --u units. Default 1 (about 10px). The lit square is 70% of it.
//       data-color   fill. Default: the canvas's own CSS `color` (ash on an ink plate).
//       data-max     tone at the dense edge, 0…1. Default 0.94.
//
//   <canvas class="furniture"></canvas>
//     What every plate shares: a faint ruled grid and a crop mark in each corner, in the
//     canvas's CSS `color`. Put it first inside .stage.
//       data-grid    grid pitch in --u units. Default 2. 0 leaves the grid out.
//
// Ordered dither is a pure function of position, so the same HTML always renders the same pixels.
// window.drawPlate() redraws; the render scripts call it after resizing the stage.
(() => {
  // 8×8 Bayer matrix: the threshold map of an ordered dither.
  const BAYER = (() => {
    let m = [[0]];
    for (let s = 1; s < 8; s *= 2) {
      const next = Array.from({ length: s * 2 }, () => Array(s * 2).fill(0));
      for (let y = 0; y < s; y++) for (let x = 0; x < s; x++) {
        const v = m[y][x] * 4;
        next[y][x] = v; next[y][x + s] = v + 2; next[y + s][x] = v + 3; next[y + s][x + s] = v + 1;
      }
      m = next;
    }
    return m;
  })();

  function prep(canvas) {
    const r = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(r.width * dpr);
    canvas.height = Math.round(r.height * dpr);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, r.width, r.height);
    const css = getComputedStyle(canvas);
    return { ctx, w: r.width, h: r.height, css, u: parseFloat(css.getPropertyValue('--u')) || 12 };
  }

  function dither(canvas) {
    const { ctx, w, h, css, u } = prep(canvas);
    if (!w || !h) return;
    const cell = Math.max(4, Math.round(u * parseFloat(canvas.dataset.cell || '1')));
    const px = Math.round(cell * 0.7);
    const off = (cell - px) / 2;
    const deg = parseFloat(canvas.dataset.angle ?? (css.getPropertyValue('--dither-angle') || '0'));
    const down = Math.abs(deg % 180) === 90;
    const max = parseFloat(canvas.dataset.max || '0.94');
    const cols = Math.ceil(w / cell), rows = Math.ceil(h / cell);
    const along = down ? rows : cols, across = down ? cols : rows;
    ctx.fillStyle = canvas.dataset.color || css.color;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const a = down ? r : c, b = down ? c : r;
        // Same curve as the README nameplate: thickens along the axis, thins slightly off-centre.
        const tone = Math.min(max, Math.max(0, ((a + 1) / along) ** 1.25 * 1.05 - (Math.abs(b - across / 2) / across) * 0.18));
        if (tone > (BAYER[r % 8][c % 8] + 0.5) / 64) ctx.fillRect(c * cell + off, r * cell + off, px, px);
      }
    }
  }

  function furniture(canvas) {
    const { ctx, w, h, css, u } = prep(canvas);
    if (!w || !h) return;
    const grid = Math.round(u * parseFloat(canvas.dataset.grid ?? '2'));
    ctx.strokeStyle = css.color;
    if (grid) {
      ctx.globalAlpha = 0.055; ctx.lineWidth = 1; ctx.beginPath();
      for (let x = grid; x < w; x += grid) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); }
      for (let y = grid; y < h; y += grid) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); }
      ctx.stroke();
    }
    const i = u * 1.8, arm = u * 1.1, r = w - i, b = h - i;
    ctx.globalAlpha = 0.5; ctx.lineWidth = 1.5; ctx.beginPath();
    ctx.moveTo(i, i + arm); ctx.lineTo(i, i); ctx.lineTo(i + arm, i);
    ctx.moveTo(r - arm, i); ctx.lineTo(r, i); ctx.lineTo(r, i + arm);
    ctx.moveTo(r, b - arm); ctx.lineTo(r, b); ctx.lineTo(r - arm, b);
    ctx.moveTo(i + arm, b); ctx.lineTo(i, b); ctx.lineTo(i, b - arm);
    ctx.stroke();
  }

  window.drawPlate = () => {
    document.querySelectorAll('canvas.furniture').forEach(furniture);
    document.querySelectorAll('canvas.dither').forEach(dither);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', window.drawPlate);
  else window.drawPlate();
})();
