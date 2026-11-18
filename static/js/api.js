/**
 * AlgoVision - API Client Layer
 * Handles async REST communications with Flask backend.
 */

export const ApiClient = {
    async get(endpoint) {
        try {
            const res = await fetch(endpoint, {
                headers: { 'Accept': 'application/json' }
            });
            return await res.json();
        } catch (err) {
            console.error(`API GET error on ${endpoint}:`, err);
            return { status: 'error', message: err.message };
        }
    },

    async post(endpoint, data) {
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await res.json();
        } catch (err) {
            console.error(`API POST error on ${endpoint}:`, err);
            return { status: 'error', message: err.message };
        }
    },

    async delete(endpoint) {
        try {
            const res = await fetch(endpoint, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json' }
            });
            return await res.json();
        } catch (err) {
            console.error(`API DELETE error on ${endpoint}:`, err);
            return { status: 'error', message: err.message };
        }
    },

    // Algorithms
    async getAlgorithms() {
        return this.get('/api/algorithms');
    },

    async getAlgorithm(id) {
        return this.get(`/api/algorithms/${id}`);
    },

    // Auth
    async getMe() {
        return this.get('/api/auth/me');
    },

    async register(username, email, password) {
        return this.post('/api/auth/register', { username, email, password });
    },

    async login(identifier, password) {
        return this.post('/api/auth/login', { identifier, password });
    },

    async logout() {
        return this.post('/api/auth/logout', {});
    },

    // History & Metrics
    async getHistory(limit = 15) {
        return this.get(`/api/history?limit=${limit}`);
    },

    async recordRun(runData) {
        return this.post('/api/history', runData);
    },

    // Bookmarks
    async getBookmarks() {
        return this.get('/api/bookmarks');
    },

    async toggleBookmark(algorithmId) {
        return this.post('/api/bookmarks', { algorithm_id: algorithmId });
    },

    // Learning Progress
    async getProgress() {
        return this.get('/api/progress');
    },

    async saveProgress(moduleId, completed = 1, quizScore = null) {
        return this.post('/api/progress', { module_id: moduleId, completed, quiz_score: quizScore });
    },

    // Graphs
    async getGraphs() {
        return this.get('/api/graphs');
    },

    async saveGraph(name, graphData) {
        return this.post('/api/graphs', { name, graph_data: graphData });
    },

    async deleteGraph(id) {
        return this.delete(`/api/graphs?id=${id}`);
    },

    // Benchmarking
    async runBenchmark(payload) {
        return this.post('/api/benchmark/run', payload);
    }
};
