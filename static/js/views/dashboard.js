/**
 * AlgoVision - User & Guest Learning Dashboard View
 * Displays verified learning metrics, real visualization history, bookmarks,
 * and curriculum completion percentages.
 */

import { State } from '../state.js';

export class DashboardView {
    constructor() {
        this.initialized = false;
    }

    async render() {
        if (!this.initialized) {
            this.setupEventHandlers();
            this.initialized = true;
        }

        await State.refreshHistory();
        this.renderWelcomeAndStats();
        this.renderHistoryTable();
        this.renderBookmarks();
        this.renderProgress();
        this.renderRecommended();
    }

    renderWelcomeAndStats() {
        const titleEl = document.getElementById('dash-welcome-title');
        const badgeEl = document.getElementById('dash-user-badge');

        if (State.isAuthenticated && State.user) {
            if (titleEl) titleEl.textContent = `Welcome back, ${State.user.username}`;
            if (badgeEl) {
                badgeEl.textContent = 'Registered Developer';
                badgeEl.className = 'status-pill badge-user';
            }
        } else {
            if (titleEl) titleEl.textContent = 'Welcome, Guest Explorer';
            if (badgeEl) {
                badgeEl.textContent = 'Guest Session (Local Storage & Session DB)';
                badgeEl.className = 'status-pill badge-guest';
            }
        }

        // Aggregate verified statistics
        const s = State.stats || {};
        document.getElementById('dash-stat-runs').textContent = (s.total_visualizations || 0).toLocaleString();
        document.getElementById('dash-stat-algos').textContent = `${s.unique_algorithms || 0} / 15`;
        document.getElementById('dash-stat-ops').textContent = (s.total_operations || 0).toLocaleString();
        document.getElementById('dash-stat-comps').textContent = (s.total_comparisons || 0).toLocaleString();
    }

    renderHistoryTable() {
        const tbody = document.getElementById('dash-history-tbody');
        if (!tbody) return;

        const hist = State.history || [];
        if (hist.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-muted" style="padding: 2rem;">
                        No algorithm executions recorded yet. Run an algorithm in the Workspace or Comparator to see metrics logged here!
                    </td>
                </tr>
            `;
            return;
        }

        let html = '';
        hist.forEach(row => {
            const algo = State.algorithms[row.algorithm_id] || { name: row.algorithm_id };
            const timeFormatted = new Date(row.completed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            html += `
                <tr>
                    <td class="font-bold text-white">${algo.name}</td>
                    <td><span class="lib-tag tag-${row.category}">${row.category.toUpperCase()}</span></td>
                    <td class="font-mono">${row.array_size || 'N/A'}</td>
                    <td class="font-mono text-amber">${(row.operations_count || 0).toLocaleString()}</td>
                    <td class="font-mono text-cyan">${(row.comparisons_count || 0).toLocaleString()}</td>
                    <td class="text-right">
                        <button class="btn btn-secondary btn-xs btn-replay-hist" data-id="${row.algorithm_id}">Replay →</button>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = html;

        tbody.querySelectorAll('.btn-replay-hist').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                window.location.hash = `#workspace?algo=${id}`;
            });
        });
    }

    renderBookmarks() {
        const container = document.getElementById('dash-bookmarks-shelf');
        if (!container) return;

        const bmIds = Array.from(State.bookmarks);
        if (bmIds.length === 0) {
            container.innerHTML = `
                <div class="empty-mini-card">
                    <p class="text-muted">No algorithms bookmarked yet. Click the ★ star on any algorithm in the Library or Workspace to save quick shortcuts here.</p>
                </div>
            `;
            return;
        }

        let html = '';
        bmIds.forEach(id => {
            const algo = State.algorithms[id];
            if (!algo) return;
            html += `
                <div class="dash-bookmark-card" onclick="window.location.hash='#workspace?algo=${algo.id}'">
                    <div class="dash-bm-top">
                        <span class="lib-tag tag-${algo.category}">${algo.category}</span>
                        <span class="text-amber">★</span>
                    </div>
                    <h4 class="dash-bm-title">${algo.name}</h4>
                    <span class="dash-bm-comp font-mono">${algo.timeComplexity.average} Avg</span>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    renderProgress() {
        const prog = State.progress || {};
        const modules = [
            { id: 'module-big-o', name: 'Big-O Foundations & Complexity' },
            { id: 'module-sorting', name: 'Sorting Paradigms & Lower Bounds' },
            { id: 'module-searching', name: 'Sequential vs Interval Search' },
            { id: 'module-graphs', name: 'Graph Traversal & Shortest Paths' }
        ];

        const container = document.getElementById('dash-progress-list');
        if (!container) return;

        let html = '';
        modules.forEach(m => {
            const record = prog[m.id];
            const isDone = record && record.completed;
            const score = record ? record.quiz_score : 0;
            html += `
                <div class="dash-progress-item">
                    <div class="dash-prog-info">
                        <span class="dash-prog-name">${m.name}</span>
                        <span class="dash-prog-status ${isDone ? 'text-emerald' : 'text-muted'}">
                            ${isDone ? `Completed (${score}% score)` : 'Not Started'}
                        </span>
                    </div>
                    <div class="dash-prog-bar">
                        <div class="dash-prog-fill" style="width: ${isDone ? '100%' : '0%'}; background: ${isDone ? '#10b981' : '#334155'};"></div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    renderRecommended() {
        const container = document.getElementById('dash-recommended-grid');
        if (!container) return;

        // Recommend algorithms not recently run
        const runAlgoIds = new Set((State.history || []).map(h => h.algorithm_id));
        const unrun = Object.values(State.algorithms).filter(a => !runAlgoIds.has(a.id));
        const pool = unrun.length >= 3 ? unrun : Object.values(State.algorithms);
        const picks = pool.slice(0, 3);

        let html = '';
        picks.forEach(algo => {
            html += `
                <div class="dash-rec-card">
                    <div class="dash-rec-header">
                        <span class="lib-tag tag-${algo.category}">${algo.category}</span>
                        <span class="lib-tag tag-${algo.difficulty.toLowerCase()}">${algo.difficulty}</span>
                    </div>
                    <h4 class="dash-rec-title">${algo.name}</h4>
                    <p class="dash-rec-desc">${algo.description}</p>
                    <button class="btn btn-primary btn-xs" onclick="window.location.hash='#workspace?algo=${algo.id}'">
                        Launch Visualizer →
                    </button>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    setupEventHandlers() {
        document.getElementById('dash-btn-auth-action')?.addEventListener('click', () => {
            if (State.isAuthenticated) {
                // Logout
                State.user = null;
                State.isAuthenticated = false;
                ApiClient.logout().then(() => State.init());
            } else {
                // Open auth modal
                document.getElementById('modal-auth')?.classList.remove('hidden');
            }
        });
    }
}
