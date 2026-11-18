/**
 * AlgoVision - Universal Playback Controller
 * Handles time-travel debugging, step scrubbing, variable speed playback,
 * pause, play, restart, and state synchronization.
 */

export class PlaybackController {
    constructor() {
        this.steps = [];
        this.currentIndex = 0;
        this.isPlaying = false;
        this.timer = null;
        this.speedMs = 850; // milliseconds per step (slow, clear, educational default)
        this.onStepChange = null;
        this.onStateChange = null;
        this.onComplete = null;
    }

    setSteps(steps, onStepChange, onComplete) {
        this.pause();
        this.steps = steps || [];
        this.currentIndex = 0;
        if (typeof onStepChange === 'function') {
            this.onStepChange = onStepChange;
        }
        if (typeof onComplete === 'function') {
            this.onComplete = onComplete;
        }
        this._notifyStep();
        this._notifyState();
    }

    getCurrentStep() {
        if (!this.steps || this.steps.length === 0) return null;
        return this.steps[this.currentIndex];
    }

    play() {
        if (this.isPlaying) return;
        if (this.currentIndex >= this.steps.length - 1) {
            this.currentIndex = 0;
        }
        this.isPlaying = true;
        this._notifyState();
        this._scheduleNext();
    }

    pause() {
        this.isPlaying = false;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this._notifyState();
    }

    togglePlay() {
        if (this.isPlaying) this.pause();
        else this.play();
    }

    next() {
        this.pause();
        if (this.currentIndex < this.steps.length - 1) {
            this.currentIndex++;
            this._notifyStep();
            if (this.currentIndex === this.steps.length - 1 && this.onComplete) {
                this.onComplete(this.getCurrentStep());
            }
        }
    }

    prev() {
        this.pause();
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this._notifyStep();
        }
    }

    restart() {
        this.pause();
        this.currentIndex = 0;
        this._notifyStep();
    }

    jumpTo(index) {
        this.pause();
        const target = Math.max(0, Math.min(index, this.steps.length - 1));
        this.currentIndex = target;
        this._notifyStep();
        if (this.currentIndex === this.steps.length - 1 && this.onComplete) {
            this.onComplete(this.getCurrentStep());
        }
    }

    setSpeed(speedMs) {
        this.speedMs = Math.max(10, Math.min(2000, speedMs));
        if (this.isPlaying) {
            if (this.timer) clearTimeout(this.timer);
            this._scheduleNext();
        }
    }

    _scheduleNext() {
        if (!this.isPlaying) return;
        this.timer = setTimeout(() => {
            if (this.currentIndex < this.steps.length - 1) {
                this.currentIndex++;
                this._notifyStep();
                this._scheduleNext();
            } else {
                this.pause();
                if (this.onComplete) {
                    this.onComplete(this.getCurrentStep());
                }
            }
        }, this.speedMs);
    }

    _notifyStep() {
        if (this.onStepChange && this.steps[this.currentIndex]) {
            this.onStepChange(this.steps[this.currentIndex], this.currentIndex, this.steps.length);
        }
    }

    _notifyState() {
        if (this.onStateChange) {
            this.onStateChange({
                isPlaying: this.isPlaying,
                currentIndex: this.currentIndex,
                totalSteps: this.steps.length,
                isAtStart: this.currentIndex === 0,
                isAtEnd: this.currentIndex >= this.steps.length - 1
            });
        }
    }
}
