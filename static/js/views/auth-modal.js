/**
 * AlgoVision - Authentication Modal Controller
 * Provides seamless registration, login, logout, and guest mode indicators.
 */

import { ApiClient } from '../api.js';
import { State } from '../state.js';

export class AuthModal {
    constructor() {
        this.mode = 'login'; // 'login' or 'register'
        this.modal = document.getElementById('modal-auth');
        this.setupEventHandlers();
        this.updateNavState();

        State.on('authChange', () => this.updateNavState());
    }

    updateNavState() {
        const authBtn = document.getElementById('nav-auth-btn');
        const userBadge = document.getElementById('nav-user-label');

        if (State.isAuthenticated && State.user) {
            if (authBtn) {
                authBtn.textContent = 'Sign Out';
                authBtn.classList.remove('btn-primary');
                authBtn.classList.add('btn-secondary');
            }
            if (userBadge) {
                userBadge.textContent = State.user.username;
                userBadge.classList.remove('hidden');
            }
        } else {
            if (authBtn) {
                authBtn.textContent = 'Sign In / Register';
                authBtn.classList.add('btn-primary');
                authBtn.classList.remove('btn-secondary');
            }
            if (userBadge) {
                userBadge.textContent = 'Guest Mode';
                userBadge.classList.remove('hidden');
            }
        }
    }

    show(mode = 'login') {
        this.mode = mode;
        this.updateModalDisplay();
        this.modal?.classList.remove('hidden');
        document.getElementById('auth-error-msg')?.classList.add('hidden');
    }

    hide() {
        this.modal?.classList.add('hidden');
    }

    updateModalDisplay() {
        const title = document.getElementById('auth-modal-title');
        const submitBtn = document.getElementById('auth-submit-btn');
        const togglePrompt = document.getElementById('auth-toggle-prompt');
        const emailField = document.getElementById('auth-email-group');

        if (this.mode === 'login') {
            if (title) title.textContent = 'Sign In to AlgoVision';
            if (submitBtn) submitBtn.textContent = 'Sign In';
            if (emailField) emailField.classList.add('hidden');
            if (togglePrompt) {
                togglePrompt.innerHTML = `Don't have an account? <a href="#" id="auth-switch-mode" class="text-cyan">Create Account</a>`;
            }
        } else {
            if (title) title.textContent = 'Create AlgoVision Account';
            if (submitBtn) submitBtn.textContent = 'Register Account';
            if (emailField) emailField.classList.remove('hidden');
            if (togglePrompt) {
                togglePrompt.innerHTML = `Already registered? <a href="#" id="auth-switch-mode" class="text-cyan">Sign In</a>`;
            }
        }

        document.getElementById('auth-switch-mode')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.mode = this.mode === 'login' ? 'register' : 'login';
            this.updateModalDisplay();
        });
    }

    setupEventHandlers() {
        // Nav Auth Button click
        document.getElementById('nav-auth-btn')?.addEventListener('click', async () => {
            if (State.isAuthenticated) {
                await ApiClient.logout();
                State.user = null;
                State.isAuthenticated = false;
                State.emit('authChange');
            } else {
                this.show('login');
            }
        });

        // Close modal
        document.getElementById('modal-auth-close')?.addEventListener('click', () => {
            this.hide();
        });

        // Form submit
        document.getElementById('auth-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const errEl = document.getElementById('auth-error-msg');
            errEl?.classList.add('hidden');

            const username = document.getElementById('auth-username-input').value.trim();
            const email = document.getElementById('auth-email-input').value.trim();
            const password = document.getElementById('auth-password-input').value;

            if (this.mode === 'register') {
                const res = await ApiClient.register(username, email, password);
                if (res.status === 'success') {
                    this.hide();
                    await State.init();
                } else {
                    if (errEl) {
                        errEl.textContent = res.message || 'Registration failed.';
                        errEl.classList.remove('hidden');
                    }
                }
            } else {
                const res = await ApiClient.login(username, password);
                if (res.status === 'success') {
                    this.hide();
                    await State.init();
                } else {
                    if (errEl) {
                        errEl.textContent = res.message || 'Invalid credentials.';
                        errEl.classList.remove('hidden');
                    }
                }
            }
        });
    }
}
