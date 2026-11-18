/**
 * AlgoVision - Sorting Visualizer Renderer
 * High-performance array visualizer using HTML5 Canvas with HiDPI support.
 * Displays dynamic animated bars, comparison pointers, value labels, and sorted states.
 */

export class SortVisualizer {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        this.lastStep = null;
        this.width = 800;
        this.height = 400;

        this.theme = {
            bg: '#070a12',
            barDefault: '#1e2d4a',
            barBorder: '#38bdf8',
            barGlow: 'rgba(56, 189, 248, 0.25)',
            compare: '#f59e0b',        // Amber
            swap: '#ef4444',           // Red / Rose
            pivot: '#a855f7',          // Purple
            minIdx: '#ec4899',         // Pink
            sorted: '#10b981',         // Emerald Green
            text: '#94a3b8',
            valueText: '#ffffff'
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

        // Clear canvas
        ctx.fillStyle = this.theme.bg;
        ctx.fillRect(0, 0, w, h);

        if (!step || !step.array || step.array.length === 0) {
            ctx.fillStyle = this.theme.text;
            ctx.font = '14px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Preparing algorithm visualization...', w / 2, h / 2);
            return;
        }

        const arr = step.array;
        const n = arr.length;
        const maxVal = Math.max(...arr, 1);
        const minVal = Math.min(...arr, 0);
        const valRange = maxVal - minVal || 1;

        const padX = 30;
        const padBottom = 40;
        const padTop = 50;
        const availableWidth = w - padX * 2;
        const availableHeight = h - padBottom - padTop;

        const barGap = n > 50 ? 2 : (n > 30 ? 4 : 6);
        const barWidth = Math.max(3, (availableWidth - (n - 1) * barGap) / n);

        const sortedSet = new Set(step.sortedIndices || []);
        const activeIndices = new Set(step.indices || []);

        // Draw grid guideline lines in background
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        for (let g = 1; g <= 4; g++) {
            const lineY = h - padBottom - (availableHeight * g / 4);
            ctx.beginPath();
            ctx.moveTo(padX, lineY);
            ctx.lineTo(w - padX, lineY);
            ctx.stroke();
        }

        for (let i = 0; i < n; i++) {
            const val = arr[i];
            const barHeight = Math.max(12, ((val - minVal) / valRange) * availableHeight);
            const x = padX + i * (barWidth + barGap);
            const y = h - padBottom - barHeight;

            let fillColor = this.theme.barDefault;
            let strokeColor = '#2563eb';
            let glow = null;

            if (sortedSet.has(i)) {
                fillColor = '#065f46';
                strokeColor = this.theme.sorted;
                glow = 'rgba(16, 185, 129, 0.3)';
            } else if (activeIndices.has(i)) {
                if (step.type === 'swap' || step.type === 'shift' || step.type === 'overwrite' || step.type === 'heapify-swap' || step.type === 'swap-pivot') {
                    fillColor = '#991b1b';
                    strokeColor = this.theme.swap;
                    glow = 'rgba(239, 68, 68, 0.4)';
                } else if (step.type === 'compare') {
                    fillColor = '#92400e';
                    strokeColor = this.theme.compare;
                    glow = 'rgba(245, 158, 11, 0.4)';
                } else if (step.type === 'pivot') {
                    fillColor = '#581c87';
                    strokeColor = this.theme.pivot;
                    glow = 'rgba(168, 85, 247, 0.4)';
                } else if (step.type === 'mark-min') {
                    fillColor = '#831843';
                    strokeColor = this.theme.minIdx;
                    glow = 'rgba(236, 72, 153, 0.4)';
                }
            }

            // Glow effect for active or sorted elements
            if (glow) {
                ctx.save();
                ctx.shadowColor = strokeColor;
                ctx.shadowBlur = 12;
            }

            // Draw Bar
            ctx.fillStyle = fillColor;
            const radius = Math.min(4, barWidth / 2);
            this._drawRoundedRect(ctx, x, y, barWidth, barHeight, radius);
            ctx.fill();

            if (glow) {
                ctx.restore();
            }

            // Bar Border
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = activeIndices.has(i) ? 2 : 1;
            ctx.stroke();

            // Value Label (Numbers)
            if (barWidth >= 14) {
                ctx.fillStyle = this.theme.valueText;
                const fontSize = Math.min(13, Math.max(9, Math.floor(barWidth * 0.55)));
                ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
                ctx.textAlign = 'center';

                if (barHeight > 24) {
                    ctx.fillText(val, x + barWidth / 2, y + 16);
                } else {
                    ctx.fillText(val, x + barWidth / 2, y - 6);
                }

                // Index below bar
                if (barWidth >= 18) {
                    ctx.fillStyle = this.theme.text;
                    ctx.font = '10px "JetBrains Mono", monospace';
                    ctx.fillText(i, x + barWidth / 2, h - padBottom + 16);
                }
            }

            // Draw visual pointer arrow above active compared elements
            if (activeIndices.has(i)) {
                ctx.fillStyle = strokeColor;
                const arrowY = y - 10;
                ctx.beginPath();
                ctx.moveTo(x + barWidth / 2, arrowY);
                ctx.lineTo(x + barWidth / 2 - 5, arrowY - 8);
                ctx.lineTo(x + barWidth / 2 + 5, arrowY - 8);
                ctx.closePath();
                ctx.fill();
            }
        }

        // Draw Comparison Arc connecting two compared elements
        if (step.indices && step.indices.length === 2 && (step.type === 'compare' || step.type === 'swap')) {
            const [i1, i2] = step.indices;
            if (i1 >= 0 && i1 < n && i2 >= 0 && i2 < n) {
                const x1 = padX + i1 * (barWidth + barGap) + barWidth / 2;
                const x2 = padX + i2 * (barWidth + barGap) + barWidth / 2;
                const topY = Math.min(
                    h - padBottom - ((arr[i1] - minVal) / valRange) * availableHeight,
                    h - padBottom - ((arr[i2] - minVal) / valRange) * availableHeight
                ) - 22;

                ctx.strokeStyle = step.type === 'swap' ? this.theme.swap : this.theme.compare;
                ctx.lineWidth = 2;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(x1, topY + 8);
                ctx.quadraticCurveTo((x1 + x2) / 2, Math.max(10, topY - 20), x2, topY + 8);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }
    }

    _drawRoundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }
}
