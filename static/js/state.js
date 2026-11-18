/**
 * AlgoVision - Global State & Event Store
 * Manages reactive application state across all views.
 */

import { ApiClient } from './api.js';
import { ALGORITHMS_DATA } from './algorithms/data.js';

class StateStore {
    constructor() {
        this.user = null;
        this.isAuthenticated = false;
        this.guestId = null;

        this.algorithms = ALGORITHMS_DATA;
        this.bookmarks = new Set();
        this.progress = {};
        this.history = [];
        this.stats = {
            total_visualizations: 0,
            unique_algorithms: 0,
            total_operations: 0,
            total_comparisons: 0
        };

        this.currentAlgoId = 'quick-sort';
        this.listeners = {};
    }

    async init() {
        // 1. Fetch Auth Status
        try {
            const meRes = await ApiClient.getMe();
            if (meRes && meRes.status === 'success') {
                this.isAuthenticated = meRes.authenticated;
                this.user = meRes.user || null;
                this.guestId = meRes.guest_id;
            }
        } catch (e) {
            console.warn('Backend auth unreachable, using local session');
        }

        // 2. Fetch Algorithms Catalog
        try {
            const algoRes = await ApiClient.getAlgorithms();
            if (algoRes && algoRes.status === 'success') {
                this.algorithms = algoRes.algorithms;
            } else {
                this.algorithms = ALGORITHMS_DATA;
            }
        } catch (e) {
            this.algorithms = ALGORITHMS_DATA;
        }

        // 3. Fetch Bookmarks
        try {
            const bmRes = await ApiClient.getBookmarks();
            if (bmRes && bmRes.status === 'success') {
                this.bookmarks = new Set(bmRes.bookmarks.map(b => b.algorithm_id));
            } else {
                const localBm = JSON.parse(localStorage.getItem('algovision_bookmarks') || '[]');
                this.bookmarks = new Set(localBm);
            }
        } catch (e) {
            const localBm = JSON.parse(localStorage.getItem('algovision_bookmarks') || '[]');
            this.bookmarks = new Set(localBm);
        }

        // 4. Fetch Progress
        try {
            const progRes = await ApiClient.getProgress();
            if (progRes && progRes.status === 'success') {
                this.progress = progRes.progress || {};
            } else {
                this.progress = JSON.parse(localStorage.getItem('algovision_progress') || '{}');
            }
        } catch (e) {
            this.progress = JSON.parse(localStorage.getItem('algovision_progress') || '{}');
        }

        // 5. Fetch History & Stats
        try {
            const histRes = await ApiClient.getHistory();
            if (histRes && histRes.status === 'success') {
                this.history = histRes.history || [];
                this.stats = histRes.stats || this.stats;
            } else {
                this.history = JSON.parse(localStorage.getItem('algovision_history') || '[]');
                this.calculateLocalStats();
            }
        } catch (e) {
            this.history = JSON.parse(localStorage.getItem('algovision_history') || '[]');
            this.calculateLocalStats();
        }

        this.emit('init');
        this.emit('authChange');
    }

    calculateLocalStats() {
        const unique = new Set(this.history.map(h => h.algorithm_id)).size;
        const totalOps = this.history.reduce((acc, h) => acc + (h.operations_count || 0), 0);
        const totalComps = this.history.reduce((acc, h) => acc + (h.comparisons_count || 0), 0);
        this.stats = {
            total_visualizations: this.history.length,
            unique_algorithms: unique,
            total_operations: totalOps,
            total_comparisons: totalComps
        };
    }

    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    emit(event, payload) {
        if (this.listeners[event]) {
            for (const cb of this.listeners[event]) {
                cb(payload);
            }
        }
    }

    async toggleBookmark(algoId) {
        try {
            const res = await ApiClient.toggleBookmark(algoId);
            if (res && res.status === 'success') {
                if (res.bookmarked) this.bookmarks.add(algoId);
                else this.bookmarks.delete(algoId);
                this.emit('bookmarksChanged', { algoId, bookmarked: res.bookmarked });
                return res;
            }
        } catch (e) {}

        // Fallback to localStorage
        const isBookmarked = this.bookmarks.has(algoId);
        if (isBookmarked) {
            this.bookmarks.delete(algoId);
        } else {
            this.bookmarks.add(algoId);
        }
        localStorage.setItem('algovision_bookmarks', JSON.stringify(Array.from(this.bookmarks)));
        this.emit('bookmarksChanged', { algoId, bookmarked: !isBookmarked });
        return { status: 'success', bookmarked: !isBookmarked };
    }

    isBookmarked(algoId) {
        return this.bookmarks.has(algoId);
    }

    async refreshHistory() {
        try {
            const histRes = await ApiClient.getHistory();
            if (histRes && histRes.status === 'success') {
                this.history = histRes.history || [];
                this.stats = histRes.stats || this.stats;
                this.emit('historyUpdated');
                return;
            }
        } catch (e) {}
        this.history = JSON.parse(localStorage.getItem('algovision_history') || '[]');
        this.calculateLocalStats();
        this.emit('historyUpdated');
    }

    async recordExecution(algoId, category, arraySize, ops, comps, swaps, timeMs) {
        try {
            await ApiClient.recordRun({
                algorithm_id: algoId,
                category,
                array_size: arraySize,
                operations_count: ops,
                comparisons_count: comps,
                swaps_count: swaps,
                execution_time_ms: timeMs
            });
        } catch (e) {}

        const entry = {
            algorithm_id: algoId,
            category,
            array_size: arraySize,
            operations_count: ops,
            comparisons_count: comps,
            swaps_count: swaps,
            execution_time_ms: timeMs,
            completed_at: new Date().toISOString()
        };
        const localHist = JSON.parse(localStorage.getItem('algovision_history') || '[]');
        localHist.unshift(entry);
        localStorage.setItem('algovision_history', JSON.stringify(localHist.slice(0, 50)));

        await this.refreshHistory();
    }
}

export const State = new StateStore();
