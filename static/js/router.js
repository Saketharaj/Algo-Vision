/**
 * AlgoVision - Client-Side Hash Router
 * Manages view activation, URL synchronization, and parameter parsing.
 */

export class Router {
    constructor() {
        this.routes = {};
        this.currentView = null;
        window.addEventListener('hashchange', () => this.handleRoute());
    }

    addRoute(name, handler) {
        this.routes[name] = handler;
    }

    navigate(hash) {
        window.location.hash = hash.startsWith('#') ? hash : `#${hash}`;
    }

    parseHash() {
        const raw = window.location.hash.slice(1) || 'landing';
        const [path, queryString] = raw.split('?');
        const params = {};
        if (queryString) {
            const searchParams = new URLSearchParams(queryString);
            for (const [k, v] of searchParams.entries()) {
                params[k] = v;
            }
        }
        return { path: path.toLowerCase(), params };
    }

    handleRoute() {
        const { path, params } = this.parseHash();
        const routeName = this.routes[path] ? path : 'landing';

        // Update active class on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            const target = link.getAttribute('data-view');
            if (target === routeName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Hide all views, display target view container
        document.querySelectorAll('.app-view').forEach(viewEl => {
            if (viewEl.id === `view-${routeName}`) {
                viewEl.classList.remove('hidden');
                viewEl.classList.add('active');
            } else {
                viewEl.classList.add('hidden');
                viewEl.classList.remove('active');
            }
        });

        // Call handler
        if (this.routes[routeName]) {
            this.routes[routeName](params);
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    init() {
        this.handleRoute();
    }
}
