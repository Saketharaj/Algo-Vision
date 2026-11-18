/**
 * AlgoVision - Searching Algorithm Step Generator Suite
 * Implements deterministic execution traces for:
 * 1. Linear Search
 * 2. Binary Search
 * 3. Jump Search
 * 4. Interpolation Search
 */

export const SearchingGenerators = {
    // -------------------------------------------------------------------------
    // 1. Linear Search
    // -------------------------------------------------------------------------
    linearSearch(inputArray, target) {
        const arr = [...inputArray];
        const n = arr.length;
        const steps = [];
        let comparisons = 0;

        steps.push({
            type: 'init',
            indices: [],
            array: [...arr],
            target,
            codeLine: 1,
            description: `Starting Linear Search for target value ${target} in array of size ${n}.`,
            metrics: { comparisons: 0, operations: 0 }
        });

        for (let i = 0; i < n; i++) {
            comparisons++;
            const isMatch = arr[i] === target;

            steps.push({
                type: 'inspect',
                indices: [i],
                currentIndex: i,
                array: [...arr],
                target,
                codeLine: 3,
                description: `Inspecting index ${i}: arr[${i}] = ${arr[i]}. Comparing with target ${target}.`,
                metrics: { comparisons, operations: comparisons }
            });

            if (isMatch) {
                steps.push({
                    type: 'found',
                    indices: [i],
                    foundIndex: i,
                    array: [...arr],
                    target,
                    codeLine: 4,
                    description: `Target ${target} successfully located at index ${i} after ${comparisons} comparison(s)!`,
                    metrics: { comparisons, operations: comparisons }
                });
                return steps;
            }
        }

        steps.push({
            type: 'not-found',
            indices: [],
            foundIndex: -1,
            array: [...arr],
            target,
            codeLine: 7,
            description: `Target ${target} was not found in the array after checking all ${n} elements.`,
            metrics: { comparisons, operations: comparisons }
        });

        return steps;
    },

    // -------------------------------------------------------------------------
    // 2. Binary Search
    // -------------------------------------------------------------------------
    binarySearch(inputArray, target) {
        // Assumes array is sorted (ui will ensure sorted state or prompt user)
        const arr = [...inputArray];
        const n = arr.length;
        const steps = [];
        let comparisons = 0;
        let low = 0;
        let high = n - 1;

        steps.push({
            type: 'init',
            indices: [],
            range: [low, high],
            array: [...arr],
            target,
            codeLine: 1,
            description: `Starting Binary Search for target ${target} over interval [0..${high}].`,
            metrics: { comparisons: 0, operations: 0 }
        });

        while (low <= high) {
            const mid = low + Math.floor((high - low) / 2);
            comparisons++;

            steps.push({
                type: 'inspect',
                indices: [mid],
                range: [low, high],
                midIndex: mid,
                array: [...arr],
                target,
                codeLine: 5,
                description: `Calculated mid = ${mid} (arr[${mid}] = ${arr[mid]}). Search window: [${low}..${high}].`,
                metrics: { comparisons, operations: comparisons }
            });

            if (arr[mid] === target) {
                steps.push({
                    type: 'found',
                    indices: [mid],
                    range: [mid, mid],
                    foundIndex: mid,
                    array: [...arr],
                    target,
                    codeLine: 6,
                    description: `Target ${target} located at mid index ${mid}! Comparisons: ${comparisons}.`,
                    metrics: { comparisons, operations: comparisons }
                });
                return steps;
            } else if (arr[mid] < target) {
                steps.push({
                    type: 'eliminate-left',
                    indices: [mid],
                    range: [low, high],
                    array: [...arr],
                    target,
                    codeLine: 8,
                    description: `arr[${mid}] (${arr[mid]}) < ${target}. Discarding left half [${low}..${mid}]. Shifting low to ${mid + 1}.`,
                    metrics: { comparisons, operations: comparisons }
                });
                low = mid + 1;
            } else {
                steps.push({
                    type: 'eliminate-right',
                    indices: [mid],
                    range: [low, high],
                    array: [...arr],
                    target,
                    codeLine: 10,
                    description: `arr[${mid}] (${arr[mid]}) > ${target}. Discarding right half [${mid}..${high}]. Shifting high to ${mid - 1}.`,
                    metrics: { comparisons, operations: comparisons }
                });
                high = mid - 1;
            }
        }

        steps.push({
            type: 'not-found',
            indices: [],
            range: [low, high],
            foundIndex: -1,
            array: [...arr],
            target,
            codeLine: 13,
            description: `Target ${target} not found. Search interval exhausted (low ${low} > high ${high}).`,
            metrics: { comparisons, operations: comparisons }
        });

        return steps;
    },

    // -------------------------------------------------------------------------
    // 3. Jump Search
    // -------------------------------------------------------------------------
    jumpSearch(inputArray, target) {
        const arr = [...inputArray];
        const n = arr.length;
        const steps = [];
        let comparisons = 0;
        const stepSize = Math.floor(Math.sqrt(n)) || 1;
        let prev = 0;
        let step = stepSize;

        steps.push({
            type: 'init',
            indices: [],
            stepSize,
            array: [...arr],
            target,
            codeLine: 1,
            description: `Starting Jump Search for target ${target} with optimal block step size m = √${n} ≈ ${stepSize}.`,
            metrics: { comparisons: 0, operations: 0 }
        });

        // Block Jumping Phase
        while (arr[Math.min(step, n) - 1] < target) {
            comparisons++;
            const checkIdx = Math.min(step, n) - 1;

            steps.push({
                type: 'jump',
                indices: [checkIdx],
                range: [prev, checkIdx],
                array: [...arr],
                target,
                codeLine: 6,
                description: `Block boundary check at arr[${checkIdx}] = ${arr[checkIdx]} < ${target}. Jumping forward by ${stepSize}.`,
                metrics: { comparisons, operations: comparisons }
            });

            prev = step;
            step += stepSize;
            if (prev >= n) {
                steps.push({
                    type: 'not-found',
                    indices: [],
                    foundIndex: -1,
                    array: [...arr],
                    target,
                    codeLine: 9,
                    description: `Overshot array boundary (index ${prev} >= ${n}). Target ${target} does not exist.`,
                    metrics: { comparisons, operations: comparisons }
                });
                return steps;
            }
        }

        // Linear Backward Scan Phase
        const blockEnd = Math.min(step, n) - 1;
        steps.push({
            type: 'block-found',
            indices: [blockEnd],
            range: [prev, blockEnd],
            array: [...arr],
            target,
            codeLine: 11,
            description: `Target boundary established: ${target} <= arr[${blockEnd}] (${arr[blockEnd]}). Linear scan within block [${prev}..${blockEnd}].`,
            metrics: { comparisons, operations: comparisons }
        });

        while (arr[prev] < target) {
            comparisons++;
            steps.push({
                type: 'linear-scan',
                indices: [prev],
                range: [prev, blockEnd],
                array: [...arr],
                target,
                codeLine: 12,
                description: `Linear scan index ${prev}: arr[${prev}] = ${arr[prev]} < ${target}.`,
                metrics: { comparisons, operations: comparisons }
            });
            prev++;
            if (prev === Math.min(step, n)) {
                steps.push({
                    type: 'not-found',
                    indices: [],
                    foundIndex: -1,
                    array: [...arr],
                    target,
                    codeLine: 13,
                    description: `Reached end of candidate block without finding target ${target}.`,
                    metrics: { comparisons, operations: comparisons }
                });
                return steps;
            }
        }

        comparisons++;
        if (arr[prev] === target) {
            steps.push({
                type: 'found',
                indices: [prev],
                range: [prev, prev],
                foundIndex: prev,
                array: [...arr],
                target,
                codeLine: 15,
                description: `Target ${target} located at index ${prev} after ${comparisons} comparisons!`,
                metrics: { comparisons, operations: comparisons }
            });
        } else {
            steps.push({
                type: 'not-found',
                indices: [prev],
                foundIndex: -1,
                array: [...arr],
                target,
                codeLine: 16,
                description: `Element at index ${prev} (${arr[prev]}) exceeds target ${target}. Value absent.`,
                metrics: { comparisons, operations: comparisons }
            });
        }

        return steps;
    },

    // -------------------------------------------------------------------------
    // 4. Interpolation Search
    // -------------------------------------------------------------------------
    interpolationSearch(inputArray, target) {
        const arr = [...inputArray];
        const n = arr.length;
        const steps = [];
        let comparisons = 0;
        let low = 0;
        let high = n - 1;

        steps.push({
            type: 'init',
            indices: [],
            range: [low, high],
            array: [...arr],
            target,
            codeLine: 1,
            description: `Starting Interpolation Search for target ${target}. Uses slope formula to estimate probe index.`,
            metrics: { comparisons: 0, operations: 0 }
        });

        while (low <= high && target >= arr[low] && target <= arr[high]) {
            if (low === high) {
                comparisons++;
                if (arr[low] === target) {
                    steps.push({
                        type: 'found',
                        indices: [low],
                        range: [low, low],
                        foundIndex: low,
                        array: [...arr],
                        target,
                        codeLine: 5,
                        description: `Single-element window match: arr[${low}] = ${target}.`,
                        metrics: { comparisons, operations: comparisons }
                    });
                    return steps;
                }
                break;
            }

            // Estimate position: pos = low + [ (target - arr[low]) * (high - low) / (arr[high] - arr[low]) ]
            const fraction = (target - arr[low]) / (arr[high] - arr[low]);
            const pos = low + Math.floor(fraction * (high - low));
            comparisons++;

            steps.push({
                type: 'probe',
                indices: [pos],
                range: [low, high],
                probeIndex: pos,
                array: [...arr],
                target,
                codeLine: 7,
                description: `Interpolated probe index ${pos} (arr[${pos}] = ${arr[pos]}). Fraction offset: ${(fraction * 100).toFixed(1)}% between [${low}..${high}].`,
                metrics: { comparisons, operations: comparisons }
            });

            if (arr[pos] === target) {
                steps.push({
                    type: 'found',
                    indices: [pos],
                    range: [pos, pos],
                    foundIndex: pos,
                    array: [...arr],
                    target,
                    codeLine: 8,
                    description: `Target ${target} found at probe position ${pos}! Comparisons: ${comparisons}.`,
                    metrics: { comparisons, operations: comparisons }
                });
                return steps;
            }

            if (arr[pos] < target) {
                steps.push({
                    type: 'eliminate-left',
                    indices: [pos],
                    range: [low, high],
                    array: [...arr],
                    target,
                    codeLine: 9,
                    description: `arr[${pos}] (${arr[pos]}) < ${target}. Restricting search window to [${pos + 1}..${high}].`,
                    metrics: { comparisons, operations: comparisons }
                });
                low = pos + 1;
            } else {
                steps.push({
                    type: 'eliminate-right',
                    indices: [pos],
                    range: [low, high],
                    array: [...arr],
                    target,
                    codeLine: 10,
                    description: `arr[${pos}] (${arr[pos]}) > ${target}. Restricting search window to [${low}..${pos - 1}].`,
                    metrics: { comparisons, operations: comparisons }
                });
                high = pos - 1;
            }
        }

        steps.push({
            type: 'not-found',
            indices: [],
            range: [low, high],
            foundIndex: -1,
            array: [...arr],
            target,
            codeLine: 12,
            description: `Target ${target} is outside of valid range or bounds exhausted. Element absent.`,
            metrics: { comparisons, operations: comparisons }
        });

        return steps;
    }
};
