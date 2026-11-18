/**
 * AlgoVision - Master Application Bootstrap
 * Orchestrates router, state store, views, and global UI components.
 */

import { State } from './state.js';
import { Router } from './router.js';
import { LandingView } from './views/landing.js';
import { WorkspaceView } from './views/workspace.js';
import { CompareView } from './views/compare.js';
import { PerformanceView } from './views/performance.js';
import { LibraryView } from './views/library.js';
import { LearnView } from './views/learn.js';
import { DashboardView } from './views/dashboard.js';
import { AuthModal } from './views/auth-modal.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initialize State
    await State.init();

    // 2. Initialize Views
    const landingView = new LandingView();
    const workspaceView = new WorkspaceView();
    const compareView = new CompareView();
    const performanceView = new PerformanceView();
    const libraryView = new LibraryView();
    const learnView = new LearnView();
    const dashboardView = new DashboardView();

    // 3. Initialize Auth Modal
    new AuthModal();

    // 4. Configure Client Router
    const router = new Router();
    router.addRoute('landing', () => landingView.render());
    router.addRoute('workspace', (params) => workspaceView.render(params));
    router.addRoute('compare', () => compareView.render());
    router.addRoute('performance', () => performanceView.render());
    router.addRoute('library', (params) => libraryView.render(params));
    router.addRoute('learn', () => learnView.render());
    router.addRoute('dashboard', () => dashboardView.render());

    // 5. Mobile Nav Toggle
    const mobileToggle = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('navbar-nav-links');
    mobileToggle?.addEventListener('click', () => {
        navMenu?.classList.toggle('nav-open');
    });

    // Close mobile nav on click
    navMenu?.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('nav-open');
        });
    });

    // 6. Start routing
    router.init();

    // 7. Render Lucide icons if loaded
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
});
