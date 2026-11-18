/**
 * AlgoVision - Interactive Learning Section & Knowledge Quizzes
 * Engineering-grade curriculum covering Big-O notation, Sorting, Searching, and Graph Theory.
 */

import { State } from '../state.js';
import { ApiClient } from '../api.js';

export class LearnView {
    constructor() {
        this.currentTab = 'big-o';
        this.bigOChart = null;
        this.initialized = false;
        this.quizzes = {
            'big-o': [
                {
                    q: 'What is the theoretical lower bound on comparisons for any comparison-based sorting algorithm on N elements?',
                    options: ['O(N)', 'Ω(N log N)', 'O(N²)', 'O(log N)'],
                    correct: 1,
                    explanation: 'By the decision tree model of comparison sorting, any comparison tree sorting N elements must have at least N! leaves, leading to minimum tree height log₂(N!) = Ω(N log N).'
                },
                {
                    q: 'If an algorithm running time is modeled by T(N) = 2T(N/2) + O(N), what is its asymptotic complexity by the Master Theorem?',
                    options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(log N)'],
                    correct: 1,
                    explanation: 'Here a=2, b=2, and f(N)=O(N). Since log_b(a) = log₂(2) = 1, we are in Case 2 of the Master Theorem: T(N) = Θ(N log N), which describes Merge Sort.'
                }
            ],
            'sorting': [
                {
                    q: 'Under what input condition does Quick Sort with Lomuto partitioning exhibit its worst-case O(N²) behavior?',
                    options: ['Random uniform array', 'Already sorted or reverse sorted array', 'Array with all distinct elements', 'Short arrays with N < 10'],
                    correct: 1,
                    explanation: 'When the array is already sorted and the last element is chosen as pivot, the partition splits into sizes 0 and N-1, causing recursion depth N and O(N²) comparisons.'
                },
                {
                    q: 'Which of the following sorting algorithms is fundamentally STABLE by default?',
                    options: ['Heap Sort', 'Selection Sort', 'Merge Sort', 'Quick Sort'],
                    correct: 2,
                    explanation: 'Merge Sort preserves the relative order of duplicate elements during the merge phase whenever <= is used to break ties from the left buffer.'
                }
            ],
            'searching': [
                {
                    q: 'Why can Interpolation Search achieve O(log log N) average running time?',
                    options: ['It uses hashing', 'It estimates target position assuming uniform numerical distribution', 'It compares multiple elements in parallel', 'It uses binary search trees'],
                    correct: 1,
                    explanation: 'Interpolation Search uses linear interpolation to estimate probe index. On uniformly distributed values, the remaining search window shrinks exponentially at each step.'
                }
            ],
            'graphs': [
                {
                    q: 'Why does Dijkstra’s algorithm fail or produce incorrect results on graphs with negative edge weights?',
                    options: ['It runs out of memory', 'Once a node is extracted from the priority queue, Dijkstra assumes its distance is finalized and will never revisit or reduce it', 'It causes an infinite loop in undirected graphs', 'Negative numbers cannot be stored in priority queues'],
                    correct: 1,
                    explanation: 'Dijkstra is a greedy algorithm that settles the closest unvisited node permanently. A subsequent negative edge could offer a cheaper route to an already-settled node, violating the greedy invariant.'
                }
            ]
        };
    }

    render() {
        if (!this.initialized) {
            this.setupEventHandlers();
            this.initialized = true;
        }
        this.switchTab(this.currentTab);
    }

    switchTab(tabId) {
        this.currentTab = tabId;
        document.querySelectorAll('.learn-nav-item').forEach(el => {
            el.classList.toggle('active', el.getAttribute('data-tab') === tabId);
        });

        document.querySelectorAll('.learn-chapter').forEach(el => {
            el.classList.toggle('active', el.id === `chapter-${tabId}`);
        });

        if (tabId === 'big-o') {
            this.renderBigOChart();
        }

        this.renderQuiz(tabId);
    }

    renderBigOChart() {
        const canvas = document.getElementById('big-o-growth-canvas');
        if (!canvas || typeof Chart === 'undefined') return;

        const nValues = [1, 2, 4, 8, 16, 24, 32, 40, 50];

        const datasets = [
            {
                label: 'O(1) - Constant',
                data: nValues.map(() => 1),
                borderColor: '#10b981',
                tension: 0.1,
                borderWidth: 2
            },
            {
                label: 'O(log N) - Logarithmic',
                data: nValues.map(n => Math.round(Math.log2(n) * 10) / 10),
                borderColor: '#06b6d4',
                tension: 0.1,
                borderWidth: 2
            },
            {
                label: 'O(N) - Linear',
                data: nValues.map(n => n),
                borderColor: '#3b82f6',
                tension: 0.1,
                borderWidth: 2
            },
            {
                label: 'O(N log N) - Linearithmic',
                data: nValues.map(n => Math.round(n * Math.log2(n))),
                borderColor: '#f59e0b',
                tension: 0.1,
                borderWidth: 2
            },
            {
                label: 'O(N²) - Quadratic',
                data: nValues.map(n => n * n),
                borderColor: '#ef4444',
                tension: 0.1,
                borderWidth: 2
            }
        ];

        if (this.bigOChart) this.bigOChart.destroy();
        this.bigOChart = new Chart(canvas, {
            type: 'line',
            data: { labels: nValues.map(n => `N=${n}`), datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } } },
                    tooltip: { backgroundColor: '#1e293b', borderColor: '#334155', borderWidth: 1 }
                },
                scales: {
                    x: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
                    y: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: '#1e293b' },
                        max: 500 // cap so quadratic doesn't flatten linear
                    }
                }
            }
        });
    }

    renderQuiz(tabId) {
        const container = document.getElementById(`quiz-container-${tabId}`);
        if (!container) return;

        const questions = this.quizzes[tabId] || [];
        let html = '';

        questions.forEach((qObj, qIdx) => {
            html += `
                <div class="quiz-question-box" data-qid="${qIdx}">
                    <p class="quiz-q-title">Q${qIdx + 1}: ${qObj.q}</p>
                    <div class="quiz-options-group">
                        ${qObj.options.map((opt, oIdx) => `
                            <label class="quiz-option-label">
                                <input type="radio" name="quiz-${tabId}-${qIdx}" value="${oIdx}">
                                <span>${opt}</span>
                            </label>
                        `).join('')}
                    </div>
                    <div class="quiz-feedback-box hidden" id="feedback-${tabId}-${qIdx}"></div>
                </div>
            `;
        });

        html += `
            <div class="quiz-submit-bar">
                <button class="btn btn-primary btn-sm btn-submit-quiz" data-tab="${tabId}">Verify Answers</button>
                <span class="quiz-score-badge hidden" id="quiz-score-${tabId}"></span>
            </div>
        `;

        container.innerHTML = html;

        container.querySelector('.btn-submit-quiz')?.addEventListener('click', () => {
            this.evaluateQuiz(tabId);
        });
    }

    async evaluateQuiz(tabId) {
        const questions = this.quizzes[tabId] || [];
        let correctCount = 0;

        questions.forEach((qObj, qIdx) => {
            const selected = document.querySelector(`input[name="quiz-${tabId}-${qIdx}"]:checked`);
            const feedbackEl = document.getElementById(`feedback-${tabId}-${qIdx}`);
            if (!feedbackEl) return;

            feedbackEl.classList.remove('hidden', 'feedback-correct', 'feedback-wrong');

            if (!selected) {
                feedbackEl.textContent = 'Please select an answer.';
                feedbackEl.classList.add('feedback-wrong');
                return;
            }

            const val = parseInt(selected.value, 10);
            if (val === qObj.correct) {
                correctCount++;
                feedbackEl.innerHTML = `<strong>✓ Correct!</strong> ${qObj.explanation}`;
                feedbackEl.classList.add('feedback-correct');
            } else {
                feedbackEl.innerHTML = `<strong>✗ Incorrect.</strong> Correct answer was "${qObj.options[qObj.correct]}". ${qObj.explanation}`;
                feedbackEl.classList.add('feedback-wrong');
            }
        });

        const scorePercent = Math.round((correctCount / questions.length) * 100);
        const scoreBadge = document.getElementById(`quiz-score-${tabId}`);
        if (scoreBadge) {
            scoreBadge.classList.remove('hidden');
            scoreBadge.textContent = `Score: ${correctCount}/${questions.length} (${scorePercent}%)`;
        }

        // Save progress to database
        await ApiClient.saveProgress(`module-${tabId}`, 1, scorePercent);
        await State.init();
    }

    setupEventHandlers() {
        document.querySelectorAll('.learn-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                this.switchTab(item.getAttribute('data-tab'));
            });
        });
    }
}
