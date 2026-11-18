/**
 * AlgoVision - Searching Visualizer Renderer
 * Renders sequential and binary search windows, probe markers, pointers, and eliminated partitions.
 */

export class SearchVisualizer {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        this.theme = {
            bg: '#0d1117',
            cellDefault: '#161e2e',
            cellBorder: '#27354f',
            cellEliminated: '#0f141f',
            cellEliminatedBorder: '#1c2433',
            cellActive: '#f59e0b',
            cellFound: '#10b981',
            text: '#94a3b8',
            dimText: '#475569',
            valueText: '#f8fafc',
            pointer: '#38bdf8'
        };
        this.resize();
        window.addEventListener('resize', () => this.resize());

        if (typeof ResizeObserver !== 'undefined' && this.canvas.parentElement) {
            this.resizeObserver = new ResizeObserver(() => this.resize());
            this.resizeObserver.observe(this.canvas.parentElement);
        }
    }

    resize() {
        if (!this.canvas) return;
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const w = rect.width > 0 ? rect.width : (this.canvas.parentElement?.clientWidth || 800);
        const h = rect.height > 0 ? rect.height : 420;

        this.width = Math.max(300, w);
        this.height = Math.max(200, h);
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.resetTransform?.();
        this.ctx.scale(dpr, dpr);
        if (this.lastStep) this.render(this.lastStep);
    }

    render(step) {
        this.lastStep = step;
        const ctx = this.ctx;
        const w = this.width;
        const h = this.height;

        ctx.fillStyle = this.theme.bg;
        ctx.fillRect(0, 0, w, h);

        if (!step || !step.array || step.array.length === 0) {
            ctx.fillStyle = this.theme.text;
            ctx.font = '14px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('No array loaded', w / 2, h / 2);
            return;
        }

        const arr = step.array;
        const n = arr.length;
        const target = step.target;

        // Render target indicator pill at top
        ctx.fillStyle = '#1e293b';
        this._roundRect(ctx, 24, 16, 160, 32, 6);
        ctx.fill();
        ctx.strokeStyle = '#334155';
        ctx.stroke();

        ctx.fillStyle = this.theme.pointer;
        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Target: `, 36, 36);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px "JetBrains Mono", monospace';
        ctx.fillText(`${target}`, 88, 36);

        // Calculate cell sizes
        const padX = 24;
        const availW = w - padX * 2;
        const gap = n > 30 ? 3 : 6;
        const cellW = Math.max(18, Math.min(64, (availW - (n - 1) * gap) / n));
        const cellH = Math.min(70, Math.max(38, cellW * 1.2));
        const startY = h / 2 - cellH / 2;

        const range = step.range || [0, n - 1];
        const low = range[0];
        const high = range[1];
        const activeIdx = (step.indices && step.indices.length > 0) ? step.indices[0] : (step.currentIndex ?? step.midIndex ?? step.probeIndex);
        const isFound = step.type === 'found';

        for (let i = 0; i < n; i++) {
            const x = padX + i * (cellW + gap);
            const isEliminated = (i < low || i > high);
            const isActive = (i === activeIdx);
            const isMatch = isFound && (i === step.foundIndex);

            // Background & Border
            let fill = this.theme.cellDefault;
            let stroke = this.theme.cellBorder;
            let textColor = this.theme.valueText;

            if (isMatch) {
                fill = '#065f46';
                stroke = this.theme.cellFound;
                textColor = '#34d399';
            } else if (isActive) {
                fill = '#78350f';
                stroke = this.theme.cellActive;
                textColor = '#fef3c7';
            } else if (isEliminated) {
                fill = this.theme.cellEliminated;
                stroke = this.theme.cellEliminatedBorder;
                textColor = this.theme.dimText;
            }

            ctx.fillStyle = fill;
            ctx.strokeStyle = stroke;
            ctx.lineWidth = isActive || isMatch ? 2 : 1;
            this._roundRect(ctx, x, startY, cellW, cellH, 6);
            ctx.fill();
            ctx.stroke();

            // Value text
            ctx.fillStyle = textColor;
            ctx.font = `bold ${Math.min(18, Math.max(10, Math.floor(cellW * 0.4)))}px "JetBrains Mono", monospace`;
            ctx.textAlign = 'center';
            ctx.fillText(arr[i], x + cellW / 2, startY + cellH / 2 + 5);

            // Index label below
            ctx.fillStyle = isEliminated ? this.theme.dimText : this.theme.text;
            ctx.font = '11px "JetBrains Mono", monospace';
            ctx.fillText(i, x + cellW / 2, startY + cellH + 20);

            // Pointer arrow & label for active index
            if (isActive) {
                ctx.fillStyle = isMatch ? this.theme.cellFound : this.theme.pointer;
                const arrowY = startY - 10;
                ctx.beginPath();
                ctx.moveTo(x + cellW / 2, arrowY);
                ctx.lineTo(x + cellW / 2 - 6, arrowY - 10);
                ctx.lineTo(x + cellW / 2 + 6, arrowY - 10);
                ctx.closePath();
                ctx.fill();

                ctx.font = '10px "JetBrains Mono", monospace';
                const label = isMatch ? 'FOUND' : (step.midIndex === i ? 'MID' : (step.probeIndex === i ? 'PROBE' : 'INSPECT'));
                ctx.fillText(label, x + cellW / 2, arrowY - 16);
            }
        }
    }

    _roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }
}
