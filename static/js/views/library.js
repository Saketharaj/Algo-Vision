/**
 * AlgoVision - Algorithm Library & Explorer View
 * Filterable catalog categorized by Sorting, Searching, and Graph Algorithms.
 */

import { State } from '../state.js';

export class LibraryView {
    constructor() {
        this.currentCategory = 'all';
        this.currentDifficulty = 'all';
        this.searchQuery = '';
        this.showBookmarkedOnly = false;
        this.initialized = false;
    }

    render(params = {}) {
        if (!this.initialized) {
            this.setupEventHandlers();
            this.initialized = true;
        }

        if (params.category) {
            this.currentCategory = params.category;
            this.updateActiveFilterButtons();
        }

        this.renderCards();
    }

    updateActiveFilterButtons() {
        document.querySelectorAll('.library-cat-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-cat') === this.currentCategory);
        });
    }

    renderCards() {
        const container = document.getElementById('library-cards-grid');
        if (!container) return;

        const algos = Object.values(State.algorithms);
        const filtered = algos.filter(algo => {
            if (this.currentCategory !== 'all' && algo.category !== this.currentCategory) return false;
            if (this.currentDifficulty !== 'all' && algo.difficulty.toLowerCase() !== this.currentDifficulty.toLowerCase()) return false;
            if (this.showBookmarkedOnly && !State.isBookmarked(algo.id)) return false;
            if (this.searchQuery) {
                const q = this.searchQuery.toLowerCase();
                const matchName = algo.name.toLowerCase().includes(q);
                const matchDesc = algo.description.toLowerCase().includes(q);
                if (!matchName && !matchDesc) return false;
            }
            return true;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="empty-state-card">
                    <p class="empty-state-title">No algorithms match your search criteria.</p>
                    <p class="empty-state-sub">Try adjusting category, difficulty, or clear your query.</p>
                </div>
            `;
            return;
        }

        let html = '';
        filtered.forEach(algo => {
            const isBookmarked = State.isBookmarked(algo.id);
            html += `
                <div class="lib-card">
                    <div class="lib-card-header">
                        <div class="lib-card-tags">
                            <span class="lib-tag tag-${algo.category}">${algo.category.toUpperCase()}</span>
                            <span class="lib-tag tag-${algo.difficulty.toLowerCase()}">${algo.difficulty}</span>
                        </div>
                        <button class="lib-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-id="${algo.id}" title="Toggle Bookmark">
                            ★
                        </button>
                    </div>

                    <h3 class="lib-card-title">${algo.name}</h3>
                    <p class="lib-card-desc">${algo.description}</p>

                    <div class="lib-card-complexities">
                        <div class="comp-chip">
                            <span class="comp-chip-label">Worst Time</span>
                            <span class="comp-chip-val text-amber">${algo.timeComplexity?.worst || 'N/A'}</span>
                        </div>
                        <div class="comp-chip">
                            <span class="comp-chip-label">Average Time</span>
                            <span class="comp-chip-val text-cyan">${algo.timeComplexity?.average || 'N/A'}</span>
                        </div>
                        <div class="comp-chip">
                            <span class="comp-chip-label">Space</span>
                            <span class="comp-chip-val text-purple">${algo.spaceComplexity || 'N/A'}</span>
                        </div>
                    </div>

                    <div class="lib-card-footer">
                        <button class="btn btn-secondary btn-sm" onclick="window.location.hash='#learn'">Learn Theory</button>
                        <button class="btn btn-primary btn-sm btn-launch-algo" data-id="${algo.id}">Launch Visualizer →</button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        // Card action event listeners
        container.querySelectorAll('.btn-launch-algo').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                window.location.hash = `#workspace?algo=${id}`;
            });
        });

        container.querySelectorAll('.lib-bookmark-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-id');
                const res = await State.toggleBookmark(id);
                btn.classList.toggle('bookmarked', res.bookmarked);
            });
        });
    }

    setupEventHandlers() {
        // Search Input
        document.getElementById('library-search-input')?.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.trim();
            this.renderCards();
        });

        // Category Filter Buttons
        document.querySelectorAll('.library-cat-filter').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.library-cat-filter').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentCategory = btn.getAttribute('data-cat');
                this.renderCards();
            });
        });

        // Difficulty Select
        document.getElementById('library-diff-select')?.addEventListener('change', (e) => {
            this.currentDifficulty = e.target.value;
            this.renderCards();
        });

        // Bookmark Only Checkbox
        document.getElementById('library-bookmarked-toggle')?.addEventListener('change', (e) => {
            this.showBookmarkedOnly = e.target.checked;
            this.renderCards();
        });
    }
}
