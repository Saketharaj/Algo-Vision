/**
 * AlgoVision - Landing Page View
 * Features hero interactive preview, core value propositions, category navigation, and quick links.
 */

import { SortingGenerators } from '../algorithms/sorting.js';
import { SortVisualizer } from '../engine/sort-engine.js';
import { PlaybackController } from '../engine/playback.js';

export class LandingView {
    constructor() {
        this.previewController = new PlaybackController();
        this.previewVisualizer = null;
        this.initialized = false;
    }

    render() {
        if (!this.initialized) {
            this.setupHeroPreview();
            this.setupEventHandlers();
            this.initialized = true;
        } else {
            if (this.previewVisualizer) this.previewVisualizer.resize();
        }
    }

    setupHeroPreview() {
        const canvas = document.getElementById('hero-preview-canvas');
        if (!canvas) return;

        this.previewVisualizer = new SortVisualizer(canvas);

        const runPreview = () => {
            const sample = [35, 12, 68, 24, 85, 42, 19, 53, 91, 15, 77, 30, 62, 48];
            const steps = SortingGenerators.quickSort(sample);
            this.previewController.setSpeed(140);
            this.previewController.setSteps(
                steps,
                (step) => this.previewVisualizer.render(step),
                () => {
                    // Auto-restart after 2 seconds
                    setTimeout(() => {
                        if (document.getElementById('view-landing')?.classList.contains('active')) {
                            runPreview();
                        }
                    }, 2500);
                }
            );
            this.previewController.play();
        };

        // Start preview after slight delay to allow layout calculation
        setTimeout(() => {
            this.previewVisualizer.resize();
            runPreview();
        }, 150);

        const shuffleBtn = document.getElementById('hero-preview-shuffle');
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', () => {
                this.previewController.pause();
                this.previewVisualizer.resize();
                runPreview();
            });
        }
    }

    setupEventHandlers() {
        // Hero CTA buttons
        document.getElementById('hero-btn-explore')?.addEventListener('click', () => {
            window.location.hash = '#library';
        });

        document.getElementById('hero-btn-workspace')?.addEventListener('click', () => {
            window.location.hash = '#workspace';
        });

        // Category Cards
        document.querySelectorAll('.landing-cat-card').forEach(card => {
            card.addEventListener('click', () => {
                const cat = card.getAttribute('data-cat');
                window.location.hash = `#library?category=${cat}`;
            });
        });
    }
}
