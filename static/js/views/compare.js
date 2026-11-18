/**
 * AlgoVision - Multi-Algorithm Comparison Suite
 * Executes multiple sorting algorithms concurrently on identical input arrays,
 * tracking real-time operations, comparisons, swaps, and comparative Chart.js analytics.
 */

import { State } from '../state.js';
import { SortingGenerators } from '../algorithms/sorting.js';
import { SortVisualizer } from '../engine/sort-engine.js';
import { PlaybackController } from '../engine/playback.js';

export class CompareView {
    constructor() {
        this.selectedAlgorithms = ['quick-sort', 'merge-sort'];
        this.arraySize = 25;
        this.speedMs = 650; // calibrated slow, human-followable default pace (0.65s per step)
        this.baseArray = [];
        this.instances = []; // Array of { id, visualizer, playback, canvas, steps, currentStep }
        this.chartInstance = null;
        this.initialized = false;
        this.isPlaying = false;
    }

    render() {
        if (!this.initialized) {
            this.setupDOM();
            this.setupEventHandlers();
            this.initialized = true;
        }
        this.resetComparison();
    }

    setupDOM() {
        // Generate Checkboxes for Sorting Algorithms
        const container = document.getElementById('compare-algo-selector');
        if (!container) return;

        container.innerHTML = '';
        const sortAlgos = Object.values(State.algorithms).filter(a => a.category === 'sorting');

        sortAlgos.forEach(algo => {
            const isChecked = this.selectedAlgorithms.includes(algo.id);
            const label = document.createElement('label');
            label.className = `compare-select-chip ${isChecked ? 'active' : ''}`;
            label.innerHTML = `
                <input type="checkbox" value="${algo.id}" ${isChecked ? 'checked' : ''}>
                <span>${algo.name}</span>
            `;
            container.appendChild(label);
        });
    }

    resetComparison() {
        // Generate new random base array
        this.baseArray = Array.from({ length: this.arraySize }, () => Math.floor(Math.random() * 85) + 5);
        this.rebuildInstances();
    }

    rebuildInstances() {
        const grid = document.getElementById('compare-canvases-grid');
        if (!grid) return;

        // Cleanup old instances
        this.instances.forEach(inst => inst.playback.pause());
        this.instances = [];
        grid.innerHTML = '';

        // Dynamically style grid (1, 2, 3 or 4 columns)
        const count = this.selectedAlgorithms.length;
        grid.style.gridTemplateColumns = count === 1 ? '1fr' : (count === 2 ? '1fr 1fr' : 'repeat(auto-fit, minmax(320px, 1fr))');

        this.selectedAlgorithms.forEach(algoId => {
            const algo = State.algorithms[algoId];
            if (!algo) return;

            // Create Card Container
            const card = document.createElement('div');
            card.className = 'compare-item-card';
            card.innerHTML = `
                <div class="compare-item-header">
                    <div>
                        <h4 class="compare-item-title">${algo.name}</h4>
                        <span class="compare-item-comp">${algo.timeComplexity.average} Avg | ${algo.spaceComplexity} Space</span>
                    </div>
                    <span class="compare-status-badge badge-running" id="status-${algoId}">Ready</span>
                </div>
                <div class="compare-canvas-wrap">
                    <canvas id="canvas-comp-${algoId}"></canvas>
                </div>
                <div class="compare-item-metrics">
                    <div class="metric-mini">
                        <span class="metric-mini-label">Comparisons</span>
                        <span class="metric-mini-value" id="val-comp-${algoId}">0</span>
                    </div>
                    <div class="metric-mini">
                        <span class="metric-mini-label">Swaps / Writes</span>
                        <span class="metric-mini-value" id="val-swap-${algoId}">0</span>
                    </div>
                    <div class="metric-mini">
                        <span class="metric-mini-label">Operations</span>
                        <span class="metric-mini-value" id="val-ops-${algoId}">0</span>
                    </div>
                </div>
            `;
            grid.appendChild(card);

            const canvas = document.getElementById(`canvas-comp-${algoId}`);
            const visualizer = new SortVisualizer(canvas);
            const playback = new PlaybackController();
            playback.setSpeed(this.speedMs);

            setTimeout(() => {
                visualizer.resize();
            }, 50);

            // Generate steps for this specific algorithm with copy of base array
            const steps = this.generateSteps(algoId, [...this.baseArray]);

            playback.setSteps(
                steps,
                (step, idx, total) => {
                    visualizer.render(step);
                    const m = step.metrics || {};
                    const compEl = document.getElementById(`val-comp-${algoId}`);
                    const swapEl = document.getElementById(`val-swap-${algoId}`);
                    const opsEl = document.getElementById(`val-ops-${algoId}`);
                    if (compEl) compEl.textContent = (m.comparisons ?? 0).toLocaleString();
                    if (swapEl) swapEl.textContent = (m.swaps ?? 0).toLocaleString();
                    if (opsEl) opsEl.textContent = (m.operations ?? (idx + 1)).toLocaleString();
                    this.updateChart();
                    this.checkAllCompleted();
                },
                () => {
                    const statusBadge = document.getElementById(`status-${algoId}`);
                    if (statusBadge) {
                        statusBadge.textContent = 'Completed';
                        statusBadge.className = 'compare-status-badge badge-success';
                    }
                    this.checkAllCompleted();
                }
            );

            this.instances.push({
                id: algoId,
                name: algo.name,
                visualizer,
                playback,
                steps
            });
        });

        this.initOrUpdateChart();
    }

    generateSteps(algoId, arr) {
        if (algoId === 'bubble-sort') return SortingGenerators.bubbleSort(arr);
        if (algoId === 'selection-sort') return SortingGenerators.selectionSort(arr);
        if (algoId === 'insertion-sort') return SortingGenerators.insertionSort(arr);
        if (algoId === 'merge-sort') return SortingGenerators.mergeSort(arr);
        if (algoId === 'quick-sort') return SortingGenerators.quickSort(arr);
        if (algoId === 'heap-sort') return SortingGenerators.heapSort(arr);
        if (algoId === 'counting-sort') return SortingGenerators.countingSort(arr);
        return [];
    }

    playAll() {
        this.isPlaying = true;
        this.instances.forEach(inst => {
            const badge = document.getElementById(`status-${inst.id}`);
            if (badge) {
                badge.textContent = 'Running';
                badge.className = 'compare-status-badge badge-running';
            }
            inst.playback.play();
        });
        this.updatePlayBtnText();
    }

    pauseAll() {
        this.isPlaying = false;
        this.instances.forEach(inst => inst.playback.pause());
        this.updatePlayBtnText();
    }

    stepAll() {
        this.pauseAll();
        this.instances.forEach(inst => inst.playback.next());
    }

    restartAll() {
        this.pauseAll();
        this.instances.forEach(inst => {
            inst.playback.restart();
            const badge = document.getElementById(`status-${inst.id}`);
            if (badge) {
                badge.textContent = 'Ready';
                badge.className = 'compare-status-badge badge-running';
            }
        });
        this.updateChart();
    }

    updatePlayBtnText() {
        const btn = document.getElementById('btn-compare-play-pause');
        if (btn) {
            btn.innerHTML = this.isPlaying ? '⏸ Pause All' : '▶ Play All';
            btn.classList.toggle('btn-warning', this.isPlaying);
        }
    }

    initOrUpdateChart() {
        const chartCanvas = document.getElementById('compare-summary-chart');
        if (!chartCanvas || typeof Chart === 'undefined') return;

        const labels = this.instances.map(i => i.name);
        const compData = this.instances.map(i => i.playback.getCurrentStep()?.metrics?.comparisons || 0);
        const swapData = this.instances.map(i => i.playback.getCurrentStep()?.metrics?.swaps || 0);

        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        this.chartInstance = new Chart(chartCanvas, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Comparisons',
                        data: compData,
                        backgroundColor: '#f59e0b',
                        borderRadius: 4
                    },
                    {
                        label: 'Swaps / Writes',
                        data: swapData,
                        backgroundColor: '#ef4444',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#94a3b8', font: { family: 'Inter', size: 12 } }
                    },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        borderColor: '#334155',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 11 } },
                        grid: { color: '#1e293b' }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 11 } },
                        grid: { color: '#1e293b' }
                    }
                }
            }
        });
    }

    updateChart() {
        if (!this.chartInstance) return;
        const compData = this.instances.map(i => i.playback.getCurrentStep()?.metrics?.comparisons || 0);
        const swapData = this.instances.map(i => i.playback.getCurrentStep()?.metrics?.swaps || 0);
        this.chartInstance.data.datasets[0].data = compData;
        this.chartInstance.data.datasets[1].data = swapData;
        this.chartInstance.update('none'); // silent update without animation lag
    }

    setupEventHandlers() {
        // Algorithm checkbox clicks
        document.getElementById('compare-algo-selector')?.addEventListener('change', (e) => {
            const checkbox = e.target;
            const chip = checkbox.closest('.compare-select-chip');
            if (checkbox.checked) {
                if (!this.selectedAlgorithms.includes(checkbox.value)) {
                    this.selectedAlgorithms.push(checkbox.value);
                }
                chip.classList.add('active');
            } else {
                if (this.selectedAlgorithms.length <= 1) {
                    alert('At least one algorithm must remain selected for comparison.');
                    checkbox.checked = true;
                    return;
                }
                this.selectedAlgorithms = this.selectedAlgorithms.filter(id => id !== checkbox.value);
                chip.classList.remove('active');
            }
            this.rebuildInstances();
        });

        // Controls
        document.getElementById('btn-compare-play-pause')?.addEventListener('click', () => {
            if (this.isPlaying) this.pauseAll();
            else this.playAll();
        });

        document.getElementById('btn-compare-step')?.addEventListener('click', () => this.stepAll());
        document.getElementById('btn-compare-restart')?.addEventListener('click', () => this.restartAll());
        document.getElementById('btn-compare-randomize')?.addEventListener('click', () => this.resetComparison());

        // Preset Distributions
        document.getElementById('btn-compare-preset-reversed')?.addEventListener('click', () => {
            this.baseArray = Array.from({ length: this.arraySize }, (_, i) => (this.arraySize - i) * 3);
            this.rebuildInstances();
        });

        document.getElementById('btn-compare-preset-nearly')?.addEventListener('click', () => {
            this.baseArray = Array.from({ length: this.arraySize }, (_, i) => (i + 1) * 3);
            // swap 2 items
            const i1 = Math.floor(this.arraySize / 3);
            const i2 = Math.floor((this.arraySize * 2) / 3);
            [this.baseArray[i1], this.baseArray[i2]] = [this.baseArray[i2], this.baseArray[i1]];
            this.rebuildInstances();
        });

        // Size slider
        const sizeSlider = document.getElementById('compare-size-slider');
        const sizeLabel = document.getElementById('compare-size-label');
        if (sizeSlider) {
            sizeSlider.addEventListener('input', (e) => {
                this.arraySize = parseInt(e.target.value, 10);
                if (sizeLabel) sizeLabel.textContent = this.arraySize;
                this.resetComparison();
            });
        }

        // Speed slider
        const speedSlider = document.getElementById('compare-speed-slider');
        const speedLabel = document.getElementById('compare-speed-label');
        if (speedSlider) {
            speedSlider.addEventListener('input', (e) => {
                this.speedMs = parseInt(e.target.value, 10);
                if (speedLabel) speedLabel.textContent = `${(this.speedMs / 1000).toFixed(2)}s`;
                this.instances.forEach(inst => inst.playback.setSpeed(this.speedMs));
            });
        }
    }

    checkAllCompleted() {
        const allDone = this.instances.length > 0 && this.instances.every(inst => {
            return inst.playback.currentIndex >= inst.playback.steps.length - 1;
        });
        const banner = document.getElementById('compare-verdict-banner');
        if (allDone && banner) {
            let winner = this.instances[0];
            let minOps = Infinity;
            this.instances.forEach(inst => {
                const step = inst.playback.getCurrentStep();
                const ops = (step?.metrics?.comparisons || 0) + (step?.metrics?.swaps || 0);
                if (ops < minOps) {
                    minOps = ops;
                    winner = inst;
                }
            });
            banner.classList.remove('hidden');
            banner.innerHTML = `
                <div class="verdict-banner-inner">
                    <span class="verdict-badge">🏆 Winner</span>
                    <span class="verdict-text">
                        <strong>${winner.name}</strong> completed first with the fewest operations: 
                        <strong class="text-cyan font-mono">${minOps.toLocaleString()} ops</strong>!
                    </span>
                </div>
            `;
        } else if (banner) {
            banner.classList.add('hidden');
        }
    }
}
