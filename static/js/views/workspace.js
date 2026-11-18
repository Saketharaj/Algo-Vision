/**
 * AlgoVision - Interactive Algorithm Visualization Workspace View
 * The primary IDE environment for exploring, stepping, and analyzing algorithms.
 */

import { State } from '../state.js';
import { PlaybackController } from '../engine/playback.js';
import { SortVisualizer } from '../engine/sort-engine.js';
import { SearchVisualizer } from '../engine/search-engine.js';
import { GraphVisualizer } from '../engine/graph-engine.js';
import { SortingGenerators } from '../algorithms/sorting.js';
import { SearchingGenerators } from '../algorithms/searching.js';
import { GraphGenerators } from '../algorithms/graphs.js';
import { ALGORITHM_QUIZ_BANK } from '../algorithms/quiz-bank.js';

export class WorkspaceView {
    constructor() {
        this.playback = new PlaybackController();
        this.sortVisualizer = null;
        this.searchVisualizer = null;
        this.graphVisualizer = null;

        this.currentAlgoId = 'quick-sort';
        this.currentLanguage = 'pseudocode';
        this.arraySize = 10;
        this.currentArray = [];
        this.searchTarget = 42;
        this.currentSpeedMs = 850;
        this.activeVisualizerType = 'sorting'; // 'sorting', 'searching', 'graph'

        // 10-Question Quiz State
        this.currentQuizAlgoId = null;
        this.quizQuestions = [];
        this.currentQuestionIndex = 0;
        this.quizScore = 0;
        this.isAnswerSubmitted = false;

        this.initialized = false;
        this.executionStartTime = 0;
    }

    render(params = {}) {
        if (!this.initialized) {
            this.setupDOM();
            this.setupEventHandlers();
            this.initialized = true;
        }

        const requestedAlgo = params.algo || this.currentAlgoId;
        if (State.algorithms[requestedAlgo]) {
            this.selectAlgorithm(requestedAlgo);
        } else {
            this.selectAlgorithm('quick-sort');
        }
    }

    setupDOM() {
        // Initialize Visualizers
        const sortCanvas = document.getElementById('workspace-sort-canvas');
        if (sortCanvas) this.sortVisualizer = new SortVisualizer(sortCanvas);

        const searchCanvas = document.getElementById('workspace-search-canvas');
        if (searchCanvas) this.searchVisualizer = new SearchVisualizer(searchCanvas);

        const graphCanvas = document.getElementById('workspace-graph-canvas');
        if (graphCanvas) {
            this.graphVisualizer = new GraphVisualizer(graphCanvas);
            this.graphVisualizer.onGraphModified = () => {
                if (this.activeVisualizerType === 'graph') {
                    this.prepareAndLoadSteps();
                }
            };
        }

        // Setup Playback Callbacks
        this.playback.onStepChange = (step, index, total) => this.onStepUpdate(step, index, total);
        this.playback.onStateChange = (state) => this.onPlaybackStateUpdate(state);
        this.playback.onComplete = (finalStep) => this.onExecutionComplete(finalStep);

        // Populate Algorithm Select Dropdown
        this.populateAlgoSelect();
    }

    populateAlgoSelect() {
        const select = document.getElementById('workspace-algo-select');
        if (!select) return;

        select.innerHTML = '';
        const groups = {
            sorting: document.createElement('optgroup'),
            searching: document.createElement('optgroup'),
            graph: document.createElement('optgroup')
        };
        groups.sorting.label = 'Sorting Algorithms';
        groups.searching.label = 'Searching Algorithms';
        groups.graph.label = 'Graph Algorithms';

        for (const [id, algo] of Object.entries(State.algorithms)) {
            const opt = document.createElement('option');
            opt.value = id;
            opt.textContent = `${algo.name} [${algo.difficulty}]`;
            if (groups[algo.category]) {
                groups[algo.category].appendChild(opt);
            }
        }

        select.appendChild(groups.sorting);
        select.appendChild(groups.searching);
        select.appendChild(groups.graph);
    }

    selectAlgorithm(algoId) {
        this.currentAlgoId = algoId;
        State.currentAlgoId = algoId;

        const algo = State.algorithms[algoId];
        if (!algo) return;

        // Update select value
        const select = document.getElementById('workspace-algo-select');
        if (select) select.value = algoId;

        // Update Header Titles and Badges
        document.getElementById('workspace-algo-title').textContent = algo.name;
        document.getElementById('workspace-algo-desc').textContent = algo.description;
        document.getElementById('workspace-badge-category').textContent = algo.category.toUpperCase();
        document.getElementById('workspace-badge-difficulty').textContent = algo.difficulty;
        
        // Update bookmark button
        const bmBtn = document.getElementById('workspace-bookmark-btn');
        if (bmBtn) {
            if (State.isBookmarked(algoId)) bmBtn.classList.add('bookmarked');
            else bmBtn.classList.remove('bookmarked');
        }

        // Complexity badges
        document.getElementById('comp-time-best').textContent = algo.timeComplexity?.best || 'N/A';
        document.getElementById('comp-time-avg').textContent = algo.timeComplexity?.average || 'N/A';
        document.getElementById('comp-time-worst').textContent = algo.timeComplexity?.worst || 'N/A';
        document.getElementById('comp-space').textContent = algo.spaceComplexity || 'N/A';
        document.getElementById('comp-stability').textContent = algo.stable ? 'Stable' : (algo.stable === false ? 'Unstable' : 'N/A');
        document.getElementById('comp-in-place').textContent = algo.inPlace ? 'Yes' : (algo.inPlace === false ? 'No' : 'N/A');

        // Engineering notes
        document.getElementById('workspace-theory-text').textContent = algo.theory || '';
        document.getElementById('workspace-practical-use').textContent = algo.practicalUse || '';

        // Switch Visualizer Canvases & Controls
        this.activeVisualizerType = algo.category;
        this.switchVisualizerType(algo.category);

        // Render Code panel
        this.renderCodePanel(algo);

        // Generate Input Data and load steps
        this.resetDataset();
    }

    switchVisualizerType(category) {
        const sortCanvas = document.getElementById('workspace-sort-canvas');
        const searchCanvas = document.getElementById('workspace-search-canvas');
        const graphCanvas = document.getElementById('workspace-graph-canvas');

        const arrayControls = document.getElementById('controls-array-group');
        const graphControls = document.getElementById('controls-graph-group');
        const userInputSection = document.getElementById('workspace-user-input-section');
        const searchTargetBox = document.getElementById('inline-search-target-box');

        sortCanvas.classList.toggle('hidden', category !== 'sorting');
        searchCanvas.classList.toggle('hidden', category !== 'searching');
        graphCanvas.classList.toggle('hidden', category !== 'graph');

        arrayControls.classList.toggle('hidden', category === 'graph');
        graphControls.classList.toggle('hidden', category !== 'graph');
        userInputSection.classList.toggle('hidden', category === 'graph');
        searchTargetBox.classList.toggle('hidden', category !== 'searching');

        // Resize the active visualizer
        setTimeout(() => {
            if (category === 'sorting') this.sortVisualizer?.resize();
            else if (category === 'searching') this.searchVisualizer?.resize();
            else if (category === 'graph') this.graphVisualizer?.resize();
        }, 50);
    }

    resetDataset() {
        const algo = State.algorithms[this.currentAlgoId];
        if (!algo) return;

        if (algo.category === 'sorting') {
            if (algo.id === 'counting-sort') {
                // Non-negative bounded values for counting sort
                this.currentArray = Array.from({ length: this.arraySize }, () => Math.floor(Math.random() * 30) + 1);
            } else {
                this.currentArray = Array.from({ length: this.arraySize }, () => Math.floor(Math.random() * 80) + 10);
            }
        } else if (algo.category === 'searching') {
            if (algo.requiresSorted) {
                this.currentArray = Array.from({ length: this.arraySize }, () => Math.floor(Math.random() * 90) + 10).sort((a, b) => a - b);
            } else {
                this.currentArray = Array.from({ length: this.arraySize }, () => Math.floor(Math.random() * 90) + 10);
            }
            if (Math.random() > 0.3) {
                this.searchTarget = this.currentArray[Math.floor(Math.random() * this.currentArray.length)];
            } else {
                this.searchTarget = Math.floor(Math.random() * 90) + 10;
            }
            const targetInput = document.getElementById('workspace-inline-target-input');
            if (targetInput) targetInput.value = this.searchTarget;
        }

        // Update inline custom input field
        this.updateInputField();
        this.prepareAndLoadSteps();
    }

    updateInputField() {
        const inputField = document.getElementById('workspace-inline-array-input');
        if (inputField) inputField.value = this.currentArray.join(', ');

        const countBadge = document.getElementById('user-input-count-badge');
        if (countBadge) countBadge.textContent = `${this.currentArray.length} elements`;
    }

    prepareAndLoadSteps(autoPlay = false) {
        const algo = State.algorithms[this.currentAlgoId];
        if (!algo) return;

        let steps = [];
        this.executionStartTime = performance.now();

        if (algo.category === 'sorting') {
            if (algo.id === 'bubble-sort') steps = SortingGenerators.bubbleSort(this.currentArray);
            else if (algo.id === 'selection-sort') steps = SortingGenerators.selectionSort(this.currentArray);
            else if (algo.id === 'insertion-sort') steps = SortingGenerators.insertionSort(this.currentArray);
            else if (algo.id === 'merge-sort') steps = SortingGenerators.mergeSort(this.currentArray);
            else if (algo.id === 'quick-sort') steps = SortingGenerators.quickSort(this.currentArray);
            else if (algo.id === 'heap-sort') steps = SortingGenerators.heapSort(this.currentArray);
            else if (algo.id === 'counting-sort') steps = SortingGenerators.countingSort(this.currentArray);
        } else if (algo.category === 'searching') {
            if (algo.id === 'linear-search') steps = SearchingGenerators.linearSearch(this.currentArray, this.searchTarget);
            else if (algo.id === 'binary-search') steps = SearchingGenerators.binarySearch(this.currentArray, this.searchTarget);
            else if (algo.id === 'jump-search') steps = SearchingGenerators.jumpSearch(this.currentArray, this.searchTarget);
            else if (algo.id === 'interpolation-search') steps = SearchingGenerators.interpolationSearch(this.currentArray, this.searchTarget);
        } else if (algo.category === 'graph') {
            const nodes = this.graphVisualizer.nodes;
            const edges = this.graphVisualizer.edges;
            const start = this.graphVisualizer.startNodeId || nodes[0]?.id;
            const target = this.graphVisualizer.targetNodeId || nodes[nodes.length - 1]?.id;

            if (algo.id === 'bfs') steps = GraphGenerators.bfs(nodes, edges, start, target);
            else if (algo.id === 'dfs') steps = GraphGenerators.dfs(nodes, edges, start, target);
            else if (algo.id === 'dijkstra') steps = GraphGenerators.dijkstra(nodes, edges, start, target);
            else if (algo.id === 'a-star') steps = GraphGenerators.aStar(nodes, edges, start, target);
        }

        // Set slow, clear, educational speed (default 850ms)
        this.playback.setSpeed(this.currentSpeedMs || 850);
        this.playback.setSteps(steps);

        if (autoPlay) {
            setTimeout(() => {
                if (this.playback && !this.playback.isPlaying && this.playback.steps.length > 0) {
                    this.playback.play();
                }
            }, 300);
        }
    }

    onStepUpdate(step, index, total) {
        // 1. Render onto active visualizer
        if (this.activeVisualizerType === 'sorting') {
            this.sortVisualizer?.render(step);
        } else if (this.activeVisualizerType === 'searching') {
            this.searchVisualizer?.render(step);
        } else if (this.activeVisualizerType === 'graph') {
            this.graphVisualizer?.render(step);
        }

        // 2. Update Description Callout
        const descEl = document.getElementById('workspace-step-description');
        if (descEl) descEl.textContent = step.description || '';

        // 3. Update Scrubber
        const scrubber = document.getElementById('workspace-scrubber');
        if (scrubber) {
            scrubber.max = Math.max(0, total - 1);
            scrubber.value = index;
        }

        // 4. Update Step Counter
        const counterEl = document.getElementById('workspace-step-counter');
        if (counterEl) counterEl.textContent = `Step ${index + 1} / ${total}`;

        // 5. Update Metrics Counters
        const metrics = step.metrics || {};
        document.getElementById('metric-comparisons').textContent = metrics.comparisons ?? 0;
        document.getElementById('metric-swaps').textContent = metrics.swaps ?? 0;
        document.getElementById('metric-operations').textContent = metrics.operations ?? (index + 1);

        // 6. Highlight active line in pseudocode/code
        this.highlightCodeLine(step.codeLine);
    }

    onPlaybackStateUpdate(state) {
        const playBtn = document.getElementById('btn-play-pause');
        if (playBtn) {
            const icon = playBtn.querySelector('i') || playBtn;
            if (state.isPlaying) {
                playBtn.innerHTML = '<span class="icon-pause">⏸</span> Pause';
                playBtn.classList.add('btn-warning');
            } else {
                playBtn.innerHTML = '<span class="icon-play">▶</span> Play';
                playBtn.classList.remove('btn-warning');
            }
        }

        document.getElementById('btn-prev-step').disabled = state.isAtStart;
        document.getElementById('btn-next-step').disabled = state.isAtEnd;
    }

    onExecutionComplete(finalStep) {
        const elapsed = performance.now() - this.executionStartTime;
        const metrics = finalStep?.metrics || {};
        State.recordExecution(
            this.currentAlgoId,
            this.activeVisualizerType,
            this.currentArray.length,
            metrics.operations || this.playback.steps.length,
            metrics.comparisons || 0,
            metrics.swaps || 0,
            Math.round(elapsed)
        );
        this.showCompletionPrompt();
    }

    showCompletionPrompt() {
        const algo = State.algorithms[this.currentAlgoId];
        const name = algo?.name || 'Algorithm';
        let banner = document.getElementById('workspace-completion-banner');
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'workspace-completion-banner';
            banner.className = 'workspace-completion-banner';
            const stageCard = document.querySelector('.visualizer-stage-card');
            if (stageCard && stageCard.parentNode) {
                stageCard.parentNode.insertBefore(banner, stageCard.nextSibling);
            }
        }
        banner.classList.remove('hidden');
        banner.innerHTML = `
            <div class="completion-banner-left">
                <span class="completion-banner-icon">🎉</span>
                <div class="completion-banner-text">
                    <h4>Algorithm Execution Finished!</h4>
                    <p>You visualized <strong>${name}</strong>. Test your conceptual mastery with 10 questions!</p>
                </div>
            </div>
            <button class="btn btn-primary" id="btn-banner-start-quiz" style="background: linear-gradient(135deg, #0ea5e9, #8b5cf6); border: none; font-weight: 600;">
                🎓 Take 10-Question Quiz
            </button>
        `;

        document.getElementById('btn-banner-start-quiz')?.addEventListener('click', () => {
            this.startAlgorithmQuiz(this.currentAlgoId);
        });
    }

    startAlgorithmQuiz(algoId) {
        this.currentQuizAlgoId = algoId;
        const questions = ALGORITHM_QUIZ_BANK[algoId] || [];
        if (!questions || questions.length === 0) {
            alert('Quiz questions for this algorithm are being prepared!');
            return;
        }
        this.quizQuestions = questions;
        this.currentQuestionIndex = 0;
        this.quizScore = 0;
        this.isAnswerSubmitted = false;

        const algo = State.algorithms[algoId];
        const modal = document.getElementById('modal-algorithm-quiz');
        const titleEl = document.getElementById('quiz-modal-algo-title');
        if (titleEl && algo) {
            titleEl.textContent = `${algo.name} Concept Mastery Quiz`;
        }

        // Reset views
        document.getElementById('quiz-question-view')?.classList.remove('hidden');
        document.getElementById('quiz-summary-view')?.classList.add('hidden');
        document.getElementById('btn-quiz-next')?.classList.remove('hidden');
        document.getElementById('btn-quiz-retake')?.classList.add('hidden');

        this.renderQuizQuestion();
        modal?.classList.remove('hidden');
    }

    renderQuizQuestion() {
        const q = this.quizQuestions[this.currentQuestionIndex];
        if (!q) return;

        this.isAnswerSubmitted = false;

        // Update Progress bar & text
        const progressPercent = ((this.currentQuestionIndex + 1) / this.quizQuestions.length) * 100;
        const progressBar = document.getElementById('quiz-progress-bar');
        if (progressBar) progressBar.style.width = `${progressPercent}%`;

        const numPill = document.getElementById('quiz-question-number-pill');
        if (numPill) numPill.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.quizQuestions.length}`;

        const scorePill = document.getElementById('quiz-current-score-pill');
        if (scorePill) scorePill.textContent = `Score: ${this.quizScore} / ${this.quizQuestions.length}`;

        // Render Question Text
        const qText = document.getElementById('quiz-question-text');
        if (qText) qText.textContent = q.q;

        // Render Options
        const optionsList = document.getElementById('quiz-options-list');
        if (optionsList) {
            optionsList.innerHTML = '';
            const letters = ['A', 'B', 'C', 'D'];
            q.options.forEach((optText, optIdx) => {
                const btn = document.createElement('button');
                btn.className = 'quiz-option-btn';
                btn.innerHTML = `
                    <span class="quiz-option-letter">${letters[optIdx]}</span>
                    <span class="quiz-option-text">${optText}</span>
                `;
                btn.addEventListener('click', () => this.handleQuizAnswer(optIdx));
                optionsList.appendChild(btn);
            });
        }

        // Hide explanation box
        const explBox = document.getElementById('quiz-explanation-box');
        if (explBox) explBox.classList.add('hidden');

        // Disable Next button until an answer is clicked
        const nextBtn = document.getElementById('btn-quiz-next');
        if (nextBtn) {
            nextBtn.disabled = true;
            nextBtn.textContent = this.currentQuestionIndex === this.quizQuestions.length - 1 ? 'Finish & View Score 🏆' : 'Next Question →';
        }
    }

    handleQuizAnswer(selectedIndex) {
        if (this.isAnswerSubmitted) return;
        this.isAnswerSubmitted = true;

        const q = this.quizQuestions[this.currentQuestionIndex];
        const isCorrect = selectedIndex === q.correct;
        if (isCorrect) this.quizScore++;

        // Update score
        const scorePill = document.getElementById('quiz-current-score-pill');
        if (scorePill) scorePill.textContent = `Score: ${this.quizScore} / ${this.quizQuestions.length}`;

        // Highlight options
        const buttons = document.querySelectorAll('.quiz-option-btn');
        buttons.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === q.correct) {
                btn.classList.add('correct');
            } else if (idx === selectedIndex) {
                btn.classList.add('wrong');
            }
        });

        // Show Explanation
        const explBox = document.getElementById('quiz-explanation-box');
        const explHeader = document.getElementById('quiz-explanation-header');
        const explText = document.getElementById('quiz-explanation-text');
        if (explBox && explHeader && explText) {
            explBox.className = `quiz-explanation-box ${isCorrect ? 'correct-box' : 'wrong-box'}`;
            explHeader.innerHTML = isCorrect ? '✅ Correct! Concept Breakdown:' : '❌ Incorrect. Correct Understanding:';
            explHeader.style.color = isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)';
            explText.textContent = q.explanation;
            explBox.classList.remove('hidden');
        }

        // Enable Next button
        const nextBtn = document.getElementById('btn-quiz-next');
        if (nextBtn) nextBtn.disabled = false;
    }

    nextQuizQuestion() {
        if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuizQuestion();
        } else {
            this.showQuizSummary();
        }
    }

    showQuizSummary() {
        document.getElementById('quiz-question-view')?.classList.add('hidden');
        const summaryView = document.getElementById('quiz-summary-view');
        if (summaryView) summaryView.classList.remove('hidden');

        const total = this.quizQuestions.length;
        const score = this.quizScore;
        const percent = Math.round((score / total) * 100);

        const scoreEl = document.getElementById('quiz-summary-score');
        if (scoreEl) scoreEl.textContent = `${score} / ${total} (${percent}%)`;

        const badgeEl = document.getElementById('quiz-summary-badge');
        const titleEl = document.getElementById('quiz-summary-title');
        const descEl = document.getElementById('quiz-summary-desc');

        if (score >= 9) {
            if (badgeEl) badgeEl.textContent = '🏆';
            if (titleEl) titleEl.textContent = 'Grandmaster Mastery Achieved!';
            if (descEl) descEl.textContent = 'Flawless score! You have completely mastered the invariants, time/space trade-offs, and mechanics of this algorithm.';
        } else if (score >= 7) {
            if (badgeEl) badgeEl.textContent = '🌟';
            if (titleEl) titleEl.textContent = 'Proficient Concept Mastery!';
            if (descEl) descEl.textContent = 'Solid understanding! You have a great grasp of the core theory and practical engineering cases.';
        } else {
            if (badgeEl) badgeEl.textContent = '📖';
            if (titleEl) titleEl.textContent = 'Keep Practicing!';
            if (descEl) descEl.textContent = 'Step through the animation again slowly to observe the state transitions, then retry the quiz to cement your knowledge.';
        }

        // Save progress to state and server
        State.recordProgress(this.currentQuizAlgoId, true, percent);

        // Toggle buttons
        document.getElementById('btn-quiz-next')?.classList.add('hidden');
        document.getElementById('btn-quiz-retake')?.classList.remove('hidden');
    }

    renderCodePanel(algo) {
        const container = document.getElementById('workspace-code-display');
        if (!container) return;

        let codeText = '';
        if (this.currentLanguage === 'pseudocode') {
            codeText = (algo.pseudocode || []).join('\n');
        } else {
            codeText = (algo.code && algo.code[this.currentLanguage]) || '// No code available';
        }

        const lines = codeText.split('\n');
        let html = '';
        lines.forEach((line, idx) => {
            const lineNum = idx + 1;
            html += `<div class="code-line" data-line="${lineNum}">` +
                    `<span class="line-number">${lineNum}</span>` +
                    `<span class="line-content">${this.escapeHtml(line)}</span>` +
                    `</div>`;
        });

        container.innerHTML = html;
    }

    highlightCodeLine(lineNum) {
        if (!lineNum) return;
        const container = document.getElementById('workspace-code-display');
        document.querySelectorAll('#workspace-code-display .code-line').forEach(el => {
            const line = parseInt(el.getAttribute('data-line'), 10);
            if (line === lineNum) {
                el.classList.add('active-code-line');
                // Scroll ONLY inside the code box, NEVER scroll the browser window!
                if (container) {
                    const elTop = el.offsetTop - container.offsetTop;
                    const elBottom = elTop + el.offsetHeight;
                    if (elTop < container.scrollTop) {
                        container.scrollTop = elTop;
                    } else if (elBottom > container.scrollTop + container.clientHeight) {
                        container.scrollTop = elBottom - container.clientHeight;
                    }
                }
            } else {
                el.classList.remove('active-code-line');
            }
        });
    }

    escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    setupEventHandlers() {
        // Algorithm Select
        document.getElementById('workspace-algo-select')?.addEventListener('change', (e) => {
            this.selectAlgorithm(e.target.value);
            window.location.hash = `#workspace?algo=${e.target.value}`;
        });

        // Bookmark Toggle
        document.getElementById('workspace-bookmark-btn')?.addEventListener('click', async () => {
            await State.toggleBookmark(this.currentAlgoId);
            const bmBtn = document.getElementById('workspace-bookmark-btn');
            if (State.isBookmarked(this.currentAlgoId)) bmBtn.classList.add('bookmarked');
            else bmBtn.classList.remove('bookmarked');
        });

        // Playback Buttons
        document.getElementById('btn-play-pause')?.addEventListener('click', () => this.playback.togglePlay());
        document.getElementById('btn-prev-step')?.addEventListener('click', () => this.playback.prev());
        document.getElementById('btn-next-step')?.addEventListener('click', () => this.playback.next());
        document.getElementById('btn-restart')?.addEventListener('click', () => this.playback.restart());

        // Scrubber
        document.getElementById('workspace-scrubber')?.addEventListener('input', (e) => {
            this.playback.jumpTo(parseInt(e.target.value, 10));
        });

        // Calibrated Speed Slider (1800ms down to 150ms)
        const speedSlider = document.getElementById('workspace-speed-slider');
        const speedLabel = document.getElementById('workspace-speed-label');
        if (speedSlider) {
            const applySpeed = (val) => {
                // val from 1 to 100: 1 -> 1800ms, 40 -> 850ms, 100 -> 150ms
                const ms = Math.round(1800 - ((val - 1) / 99) * 1650);
                this.currentSpeedMs = ms;
                this.playback.setSpeed(ms);
                const sec = (ms / 1000).toFixed(2);
                let desc = 'Slow & Clear';
                if (ms > 1200) desc = 'Very Slow';
                else if (ms > 700) desc = 'Slow & Clear';
                else if (ms > 350) desc = 'Medium';
                else desc = 'Fast';
                if (speedLabel) speedLabel.textContent = `${sec}s / step (${desc})`;
            };

            speedSlider.addEventListener('input', (e) => {
                applySpeed(parseInt(e.target.value, 10));
            });

            // Set initial default speed to 850ms (Slow & Clear)
            applySpeed(40);
        }

        // Prominent Inline User Input Array handler
        const applyInlineInput = () => {
            const inputField = document.getElementById('workspace-inline-array-input');
            if (!inputField) return;
            const raw = inputField.value.trim();
            const nums = raw.split(/[\s,]+/).map(x => parseInt(x, 10)).filter(x => !isNaN(x));
            if (nums.length < 2) {
                alert('Please enter at least 2 valid numbers (e.g. 45, 12, 89, 23, 7, 56).');
                return;
            }
            if (nums.length > 50) {
                alert('Maximum 50 numbers recommended for clear visual playback.');
                return;
            }
            const algo = State.algorithms[this.currentAlgoId];
            if (algo?.requiresSorted) {
                nums.sort((a, b) => a - b);
            }
            this.currentArray = nums;
            this.arraySize = nums.length;
            this.updateInputField();

            const sizeSlider = document.getElementById('workspace-size-slider');
            const sizeLabel = document.getElementById('workspace-size-label');
            if (sizeSlider) sizeSlider.value = Math.min(40, this.arraySize);
            if (sizeLabel) sizeLabel.textContent = this.arraySize;

            this.prepareAndLoadSteps(false);
        };

        document.getElementById('btn-apply-inline-input')?.addEventListener('click', applyInlineInput);
        document.getElementById('workspace-inline-array-input')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                applyInlineInput();
            }
        });

        // Inline Randomize
        document.getElementById('btn-inline-randomize')?.addEventListener('click', () => {
            this.resetDataset();
        });

        // Preset: Reversed Array
        document.getElementById('btn-inline-reversed')?.addEventListener('click', () => {
            const n = Math.max(5, Math.min(15, this.arraySize));
            this.currentArray = Array.from({ length: n }, (_, i) => (n - i) * 8 + 10);
            this.arraySize = this.currentArray.length;
            this.updateInputField();
            this.prepareAndLoadSteps(false);
        });

        // Preset: Nearly Sorted Array
        document.getElementById('btn-inline-nearly')?.addEventListener('click', () => {
            const n = Math.max(5, Math.min(15, this.arraySize));
            this.currentArray = Array.from({ length: n }, (_, i) => (i + 1) * 8 + 10);
            if (n >= 4) {
                const idx1 = 1;
                const idx2 = 3;
                [this.currentArray[idx1], this.currentArray[idx2]] = [this.currentArray[idx2], this.currentArray[idx1]];
            }
            this.arraySize = this.currentArray.length;
            this.updateInputField();
            this.prepareAndLoadSteps(false);
        });

        // Inline Search Target
        const applySearchTarget = () => {
            const targetInput = document.getElementById('workspace-inline-target-input');
            if (targetInput) {
                this.searchTarget = parseInt(targetInput.value, 10) || 0;
                this.prepareAndLoadSteps(false);
            }
        };
        document.getElementById('btn-inline-search')?.addEventListener('click', applySearchTarget);
        document.getElementById('workspace-inline-target-input')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                applySearchTarget();
            }
        });

        // Array Size Slider
        const sizeSlider = document.getElementById('workspace-size-slider');
        const sizeLabel = document.getElementById('workspace-size-label');
        if (sizeSlider) {
            sizeSlider.addEventListener('input', (e) => {
                this.arraySize = parseInt(e.target.value, 10);
                if (sizeLabel) sizeLabel.textContent = this.arraySize;
                this.resetDataset();
            });
        }

        // Randomize Dataset
        document.getElementById('btn-randomize-dataset')?.addEventListener('click', () => {
            this.resetDataset();
        });

        // Custom Input Modal triggers
        document.getElementById('btn-custom-dataset')?.addEventListener('click', () => {
            const modal = document.getElementById('modal-custom-input');
            const textarea = document.getElementById('custom-input-array');
            if (textarea) textarea.value = this.currentArray.join(', ');
            modal?.classList.remove('hidden');
        });

        document.getElementById('modal-custom-close')?.addEventListener('click', () => {
            document.getElementById('modal-custom-input')?.classList.add('hidden');
        });

        document.getElementById('btn-apply-custom-input')?.addEventListener('click', () => {
            const textarea = document.getElementById('custom-input-array');
            if (textarea) {
                const raw = textarea.value.trim();
                const nums = raw.split(/[\s,]+/).map(x => parseInt(x, 10)).filter(x => !isNaN(x));
                if (nums.length < 2) {
                    alert('Please enter at least 2 valid numbers separated by commas or spaces.');
                    return;
                }
                const algo = State.algorithms[this.currentAlgoId];
                if (algo?.requiresSorted) {
                    nums.sort((a, b) => a - b);
                }
                this.currentArray = nums;
                this.arraySize = nums.length;
                const sizeLabel = document.getElementById('workspace-size-label');
                if (sizeLabel) sizeLabel.textContent = this.arraySize;
                const sizeSlider = document.getElementById('workspace-size-slider');
                if (sizeSlider) sizeSlider.value = Math.min(60, this.arraySize);

                document.getElementById('modal-custom-input')?.classList.add('hidden');
                this.prepareAndLoadSteps();
            }
        });

        // Search Target Input
        document.getElementById('workspace-search-target-input')?.addEventListener('change', (e) => {
            this.searchTarget = parseInt(e.target.value, 10) || 0;
            this.prepareAndLoadSteps();
        });

        // Code Language Tabs
        document.querySelectorAll('.code-lang-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.code-lang-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentLanguage = tab.getAttribute('data-lang');
                const algo = State.algorithms[this.currentAlgoId];
                if (algo) this.renderCodePanel(algo);
                const step = this.playback.getCurrentStep();
                if (step) this.highlightCodeLine(step.codeLine);
            });
        });

        // Graph Toolbar Controls
        document.querySelectorAll('.graph-mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.graph-mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const mode = btn.getAttribute('data-mode');
                this.graphVisualizer?.setMode(mode);
            });
        });

        document.getElementById('graph-preset-select')?.addEventListener('change', (e) => {
            this.graphVisualizer?.loadPreset(e.target.value);
            this.prepareAndLoadSteps();
        });

        document.getElementById('btn-graph-clear')?.addEventListener('click', () => {
            if (confirm('Clear graph canvas?')) {
                this.graphVisualizer?.clearGraph();
                this.playback.setSteps([]);
            }
        });

        // 10-Question Quiz Modal Controls
        document.getElementById('btn-workspace-open-quiz')?.addEventListener('click', () => {
            this.startAlgorithmQuiz(this.currentAlgoId);
        });

        const closeQuizModal = () => {
            document.getElementById('modal-algorithm-quiz')?.classList.add('hidden');
        };

        document.getElementById('modal-quiz-close')?.addEventListener('click', closeQuizModal);
        document.getElementById('btn-quiz-exit')?.addEventListener('click', closeQuizModal);

        document.getElementById('btn-quiz-next')?.addEventListener('click', () => {
            this.nextQuizQuestion();
        });

        document.getElementById('btn-quiz-retake')?.addEventListener('click', () => {
            this.startAlgorithmQuiz(this.currentQuizAlgoId || this.currentAlgoId);
        });
    }
}
