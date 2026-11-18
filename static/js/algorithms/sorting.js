/**
 * AlgoVision - Sorting Algorithm Step Generator Suite
 * Generates deterministic, immutable step-by-step traces for all 7 sorting algorithms:
 * Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, Counting Sort.
 * 
 * Each step contains:
 * - type: operation classification ('compare', 'swap', 'overwrite', 'pivot', 'sorted', 'heapify', 'count')
 * - indices: array indices affected
 * - values: values at operation
 * - array: deep copy of array state at this exact step
 * - codeLine: 1-indexed line of pseudocode to highlight
 * - description: human-readable explanation
 * - metrics: { comparisons, swaps, writes, operations }
 */

export const SortingGenerators = {
    // -------------------------------------------------------------------------
    // 1. Bubble Sort
    // -------------------------------------------------------------------------
    bubbleSort(inputArray) {
        const arr = [...inputArray];
        const n = arr.length;
        const steps = [];
        let comparisons = 0;
        let swaps = 0;
        let sortedIndices = [];

        steps.push({
            type: 'init',
            indices: [],
            array: [...arr],
            sortedIndices: [...sortedIndices],
            codeLine: 1,
            description: `Starting Bubble Sort with array of size ${n}.`,
            metrics: { comparisons, swaps, operations: 0 }
        });

        for (let i = 0; i < n - 1; i++) {
            let swapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                comparisons++;
                const compLine = 6;
                const shouldSwap = arr[j] > arr[j + 1];

                steps.push({
                    type: 'compare',
                    indices: [j, j + 1],
                    array: [...arr],
                    sortedIndices: [...sortedIndices],
                    codeLine: compLine,
                    description: `Comparing arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}). ${shouldSwap ? `${arr[j]} > ${arr[j + 1]}, swap required.` : 'Already in correct order.'}`,
                    metrics: { comparisons, swaps, operations: comparisons + swaps }
                });

                if (shouldSwap) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    swaps++;
                    swapped = true;

                    steps.push({
                        type: 'swap',
                        indices: [j, j + 1],
                        array: [...arr],
                        sortedIndices: [...sortedIndices],
                        codeLine: 7,
                        description: `Swapped arr[${j}] and arr[${j + 1}]. Array state: [${arr.join(', ')}]`,
                        metrics: { comparisons, swaps, operations: comparisons + swaps }
                    });
                }
            }

            // The element at n - i - 1 is now in its final sorted position
            sortedIndices.push(n - i - 1);
            steps.push({
                type: 'sorted',
                indices: [n - i - 1],
                array: [...arr],
                sortedIndices: [...sortedIndices],
                codeLine: 11,
                description: `Element ${arr[n - i - 1]} at index ${n - i - 1} is now placed in its final sorted position.`,
                metrics: { comparisons, swaps, operations: comparisons + swaps }
            });

            if (!swapped) {
                steps.push({
                    type: 'early-break',
                    indices: [],
                    array: [...arr],
                    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
                    codeLine: 12,
                    description: 'No swaps occurred during the last pass. Array is fully sorted! Early termination triggered.',
                    metrics: { comparisons, swaps, operations: comparisons + swaps }
                });
                break;
            }
        }

        // Mark remaining items as sorted
        sortedIndices = Array.from({ length: n }, (_, idx) => idx);
        steps.push({
            type: 'complete',
            indices: [],
            array: [...arr],
            sortedIndices: [...sortedIndices],
            codeLine: 13,
            description: `Bubble Sort finished. Total comparisons: ${comparisons}, swaps: ${swaps}.`,
            metrics: { comparisons, swaps, operations: comparisons + swaps }
        });

        return steps;
    },

    // -------------------------------------------------------------------------
    // 2. Selection Sort
    // -------------------------------------------------------------------------
    selectionSort(inputArray) {
        const arr = [...inputArray];
        const n = arr.length;
        const steps = [];
        let comparisons = 0;
        let swaps = 0;
        const sortedIndices = [];

        steps.push({
            type: 'init',
            indices: [],
            array: [...arr],
            sortedIndices: [...sortedIndices],
            codeLine: 1,
            description: `Starting Selection Sort on array of ${n} elements.`,
            metrics: { comparisons, swaps, operations: 0 }
        });

        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;

            steps.push({
                type: 'mark-min',
                indices: [i],
                array: [...arr],
                sortedIndices: [...sortedIndices],
                codeLine: 4,
                description: `Assume current index ${i} (${arr[i]}) is the minimum in unsorted subarray [${i}..${n - 1}].`,
                metrics: { comparisons, swaps, operations: comparisons + swaps }
            });

            for (let j = i + 1; j < n; j++) {
                comparisons++;
                const isSmaller = arr[j] < arr[minIdx];

                steps.push({
                    type: 'compare',
                    indices: [minIdx, j],
                    array: [...arr],
                    sortedIndices: [...sortedIndices],
                    codeLine: 6,
                    description: `Comparing candidate arr[${j}] (${arr[j]}) with current minimum arr[${minIdx}] (${arr[minIdx]}).`,
                    metrics: { comparisons, swaps, operations: comparisons + swaps }
                });

                if (isSmaller) {
                    minIdx = j;
                    steps.push({
                        type: 'mark-min',
                        indices: [minIdx],
                        array: [...arr],
                        sortedIndices: [...sortedIndices],
                        codeLine: 7,
                        description: `New minimum discovered: arr[${minIdx}] = ${arr[minIdx]}.`,
                        metrics: { comparisons, swaps, operations: comparisons + swaps }
                    });
                }
            }

            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                swaps++;
                steps.push({
                    type: 'swap',
                    indices: [i, minIdx],
                    array: [...arr],
                    sortedIndices: [...sortedIndices],
                    codeLine: 11,
                    description: `Swapped found minimum arr[${minIdx}] (${arr[i]}) into position arr[${i}].`,
                    metrics: { comparisons, swaps, operations: comparisons + swaps }
                });
            } else {
                steps.push({
                    type: 'info',
                    indices: [i],
                    array: [...arr],
                    sortedIndices: [...sortedIndices],
                    codeLine: 10,
                    description: `Element at index ${i} (${arr[i]}) is already the minimum; no swap necessary.`,
                    metrics: { comparisons, swaps, operations: comparisons + swaps }
                });
            }

            sortedIndices.push(i);
        }

        sortedIndices.push(n - 1);
        steps.push({
            type: 'complete',
            indices: [],
            array: [...arr],
            sortedIndices: Array.from({ length: n }, (_, idx) => idx),
            codeLine: 14,
            description: `Selection Sort completed. Total comparisons: ${comparisons}, swaps: ${swaps}.`,
            metrics: { comparisons, swaps, operations: comparisons + swaps }
        });

        return steps;
    },

    // -------------------------------------------------------------------------
    // 3. Insertion Sort
    // -------------------------------------------------------------------------
    insertionSort(inputArray) {
        const arr = [...inputArray];
        const n = arr.length;
        const steps = [];
        let comparisons = 0;
        let swaps = 0;
        let sortedIndices = [0];

        steps.push({
            type: 'init',
            indices: [0],
            array: [...arr],
            sortedIndices: [...sortedIndices],
            codeLine: 1,
            description: `Single-element prefix [arr[0]=${arr[0]}] is trivially sorted.`,
            metrics: { comparisons, swaps, operations: 0 }
        });

        for (let i = 1; i < n; i++) {
            const key = arr[i];
            let j = i - 1;

            steps.push({
                type: 'pick-key',
                indices: [i],
                array: [...arr],
                sortedIndices: [...sortedIndices],
                codeLine: 3,
                description: `Extracted key arr[${i}] = ${key}. Searching correct insertion slot in sorted prefix [0..${i - 1}].`,
                metrics: { comparisons, swaps, operations: comparisons + swaps }
            });

            while (j >= 0) {
                comparisons++;
                steps.push({
                    type: 'compare',
                    indices: [j, j + 1],
                    array: [...arr],
                    sortedIndices: [...sortedIndices],
                    codeLine: 5,
                    description: `Comparing arr[${j}] (${arr[j]}) with key (${key}).`,
                    metrics: { comparisons, swaps, operations: comparisons + swaps }
                });

                if (arr[j] > key) {
                    arr[j + 1] = arr[j];
                    swaps++; // array write / shift
                    steps.push({
                        type: 'shift',
                        indices: [j, j + 1],
                        array: [...arr],
                        sortedIndices: [...sortedIndices],
                        codeLine: 6,
                        description: `Shifted arr[${j}] (${arr[j + 1]}) right to index ${j + 1}.`,
                        metrics: { comparisons, swaps, operations: comparisons + swaps }
                    });
                    j--;
                } else {
                    break;
                }
            }

            arr[j + 1] = key;
            sortedIndices = Array.from({ length: i + 1 }, (_, idx) => idx);

            steps.push({
                type: 'insert',
                indices: [j + 1],
                array: [...arr],
                sortedIndices: [...sortedIndices],
                codeLine: 9,
                description: `Inserted key ${key} into position ${j + 1}. Sorted prefix now spans [0..${i}].`,
                metrics: { comparisons, swaps, operations: comparisons + swaps }
            });
        }

        steps.push({
            type: 'complete',
            indices: [],
            array: [...arr],
            sortedIndices: Array.from({ length: n }, (_, idx) => idx),
            codeLine: 11,
            description: `Insertion Sort completed. Total comparisons: ${comparisons}, shifts/writes: ${swaps}.`,
            metrics: { comparisons, swaps, operations: comparisons + swaps }
        });

        return steps;
    },

    // -------------------------------------------------------------------------
    // 4. Merge Sort
    // -------------------------------------------------------------------------
    mergeSort(inputArray) {
        const arr = [...inputArray];
        const n = arr.length;
        const steps = [];
        let comparisons = 0;
        let swaps = 0; // count of buffer writes

        steps.push({
            type: 'init',
            indices: [],
            array: [...arr],
            sortedIndices: [],
            codeLine: 1,
            description: `Starting recursive Divide & Conquer Merge Sort on ${n} items.`,
            metrics: { comparisons, swaps, operations: 0 }
        });

        function divideAndConquer(left, right) {
            if (left >= right) return;
            const mid = Math.floor((left + right) / 2);

            steps.push({
                type: 'split',
                indices: [left, mid, right],
                array: [...arr],
                sortedIndices: [],
                codeLine: 3,
                description: `Subdividing range [${left}..${right}] into [${left}..${mid}] and [${mid + 1}..${right}].`,
                metrics: { comparisons, swaps, operations: comparisons + swaps }
            });

            divideAndConquer(left, mid);
            divideAndConquer(mid + 1, right);
            merge(left, mid, right);
        }

        function merge(left, mid, right) {
            const leftArr = arr.slice(left, mid + 1);
            const rightArr = arr.slice(mid + 1, right + 1);
            let i = 0, j = 0, k = left;

            steps.push({
                type: 'merge-start',
                indices: [left, right],
                array: [...arr],
                sortedIndices: [],
                codeLine: 8,
                description: `Merging sorted segments [${left}..${mid}] and [${mid + 1}..${right}].`,
                metrics: { comparisons, swaps, operations: comparisons + swaps }
            });

            while (i < leftArr.length && j < rightArr.length) {
                comparisons++;
                const leftVal = leftArr[i];
                const rightVal = rightArr[j];

                steps.push({
                    type: 'compare',
                    indices: [left + i, mid + 1 + j],
                    array: [...arr],
                    sortedIndices: [],
                    codeLine: 11,
                    description: `Comparing left buffer (${leftVal}) and right buffer (${rightVal}).`,
                    metrics: { comparisons, swaps, operations: comparisons + swaps }
                });

                if (leftVal <= rightVal) {
                    arr[k] = leftVal;
                    swaps++;
                    steps.push({
                        type: 'overwrite',
                        indices: [k],
                        array: [...arr],
                        sortedIndices: [],
                        codeLine: 12,
                        description: `Wrote smaller value ${leftVal} from left buffer into index ${k}.`,
                        metrics: { comparisons, swaps, operations: comparisons + swaps }
                    });
                    i++;
                } else {
                    arr[k] = rightVal;
                    swaps++;
                    steps.push({
                        type: 'overwrite',
                        indices: [k],
                        array: [...arr],
                        sortedIndices: [],
                        codeLine: 12,
                        description: `Wrote smaller value ${rightVal} from right buffer into index ${k}.`,
                        metrics: { comparisons, swaps, operations: comparisons + swaps }
                    });
                    j++;
                }
                k++;
            }

            while (i < leftArr.length) {
                arr[k] = leftArr[i];
                swaps++;
                steps.push({
                    type: 'overwrite',
                    indices: [k],
                    array: [...arr],
                    sortedIndices: [],
                    codeLine: 13,
                    description: `Flushed remaining left buffer element ${leftArr[i]} into index ${k}.`,
                    metrics: { comparisons, swaps, operations: comparisons + swaps }
                });
                i++;
                k++;
            }

            while (j < rightArr.length) {
                arr[k] = rightArr[j];
                swaps++;
                steps.push({
                    type: 'overwrite',
                    indices: [k],
                    array: [...arr],
                    sortedIndices: [],
                    codeLine: 13,
                    description: `Flushed remaining right buffer element ${rightArr[j]} into index ${k}.`,
                    metrics: { comparisons, swaps, operations: comparisons + swaps }
                });
                j++;
                k++;
            }
        }

        divideAndConquer(0, n - 1);

        steps.push({
            type: 'complete',
            indices: [],
            array: [...arr],
            sortedIndices: Array.from({ length: n }, (_, idx) => idx),
            codeLine: 14,
            description: `Merge Sort finished. Total comparisons: ${comparisons}, writes: ${swaps}.`,
            metrics: { comparisons, swaps, operations: comparisons + swaps }
        });

        return steps;
    },

    // -------------------------------------------------------------------------
    // 5. Quick Sort (Lomuto Partition)
    // -------------------------------------------------------------------------
    quickSort(inputArray) {
        const arr = [...inputArray];
        const n = arr.length;
        const steps = [];
        let comparisons = 0;
        let swaps = 0;
        const sortedIndices = [];

        steps.push({
            type: 'init',
            indices: [],
            array: [...arr],
            sortedIndices: [...sortedIndices],
            codeLine: 1,
            description: `Starting Quick Sort on array of size ${n}.`,
            metrics: { comparisons, swaps, operations: 0 }
        });

        function qs(low, high) {
            if (low < high) {
                const p = partition(low, high);
                sortedIndices.push(p);
                qs(low, p - 1);
                qs(p + 1, high);
            } else if (low === high) {
                sortedIndices.push(low);
            }
        }

        function partition(low, high) {
            const pivot = arr[high];
            steps.push({
                type: 'pivot',
                indices: [high],
                array: [...arr],
                sortedIndices: [...sortedIndices],
                codeLine: 10,
                description: `Selected pivot arr[${high}] = ${pivot}. Partitioning range [${low}..${high - 1}].`,
                metrics: { comparisons, swaps, operations: comparisons + swaps }
            });

            let i = low - 1;
            for (let j = low; j < high; j++) {
                comparisons++;
                const isLessOrEqual = arr[j] <= pivot;

                steps.push({
                    type: 'compare',
                    indices: [j, high],
                    array: [...arr],
                    sortedIndices: [...sortedIndices],
                    codeLine: 13,
                    description: `Evaluating arr[${j}] (${arr[j]}) against pivot (${pivot}).`,
                    metrics: { comparisons, swaps, operations: comparisons + swaps }
                });

                if (isLessOrEqual) {
                    i++;
                    if (i !== j) {
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                        swaps++;
                        steps.push({
                            type: 'swap',
                            indices: [i, j],
                            array: [...arr],
                            sortedIndices: [...sortedIndices],
                            codeLine: 15,
                            description: `Element ${arr[i]} <= pivot: swapped arr[${i}] and arr[${j}].`,
                            metrics: { comparisons, swaps, operations: comparisons + swaps }
                        });
                    }
                }
            }

            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            swaps++;
            const pivotFinalPos = i + 1;

            steps.push({
                type: 'swap-pivot',
                indices: [pivotFinalPos, high],
                array: [...arr],
                sortedIndices: [...sortedIndices, pivotFinalPos],
                codeLine: 18,
                description: `Placed pivot ${pivot} into its exact boundary partition position at index ${pivotFinalPos}.`,
                metrics: { comparisons, swaps, operations: comparisons + swaps }
            });

            return pivotFinalPos;
        }

        qs(0, n - 1);

        steps.push({
            type: 'complete',
            indices: [],
            array: [...arr],
            sortedIndices: Array.from({ length: n }, (_, idx) => idx),
            codeLine: 6,
            description: `Quick Sort completed. Total comparisons: ${comparisons}, swaps: ${swaps}.`,
            metrics: { comparisons, swaps, operations: comparisons + swaps }
        });

        return steps;
    },

    // -------------------------------------------------------------------------
    // 6. Heap Sort
    // -------------------------------------------------------------------------
    heapSort(inputArray) {
        const arr = [...inputArray];
        const n = arr.length;
        const steps = [];
        let comparisons = 0;
        let swaps = 0;
        const sortedIndices = [];

        steps.push({
            type: 'init',
            indices: [],
            array: [...arr],
            sortedIndices: [...sortedIndices],
            codeLine: 1,
            description: `Starting Heap Sort. Phase 1: Building initial Max-Heap.`,
            metrics: { comparisons, swaps, operations: 0 }
        });

        function heapify(heapSize, i) {
            let largest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;

            if (left < heapSize) {
                comparisons++;
                if (arr[left] > arr[largest]) largest = left;
            }
            if (right < heapSize) {
                comparisons++;
                if (arr[right] > arr[largest]) largest = right;
            }

            if (largest !== i) {
                [arr[i], arr[largest]] = [arr[largest], arr[i]];
                swaps++;
                steps.push({
                    type: 'heapify-swap',
                    indices: [i, largest],
                    array: [...arr],
                    sortedIndices: [...sortedIndices],
                    codeLine: 16,
                    description: `Heap violation at root ${i}: swapped arr[${i}] and child arr[${largest}].`,
                    metrics: { comparisons, swaps, operations: comparisons + swaps }
                });
                heapify(heapSize, largest);
            }
        }

        // Build max heap bottom-up
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            steps.push({
                type: 'heapify-check',
                indices: [i],
                array: [...arr],
                sortedIndices: [...sortedIndices],
                codeLine: 4,
                description: `Sifting down subtree rooted at node ${i} (${arr[i]}).`,
                metrics: { comparisons, swaps, operations: comparisons + swaps }
            });
            heapify(n, i);
        }

        steps.push({
            type: 'heap-built',
            indices: [0],
            array: [...arr],
            sortedIndices: [...sortedIndices],
            codeLine: 5,
            description: `Max-Heap constructed! Root A[0] (${arr[0]}) holds the global maximum element.`,
            metrics: { comparisons, swaps, operations: comparisons + swaps }
        });

        // Extract maximums
        for (let i = n - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];
            swaps++;
            sortedIndices.push(i);

            steps.push({
                type: 'extract-max',
                indices: [0, i],
                array: [...arr],
                sortedIndices: [...sortedIndices],
                codeLine: 7,
                description: `Extracted root maximum ${arr[i]} and swapped to position ${i}.`,
                metrics: { comparisons, swaps, operations: comparisons + swaps }
            });

            heapify(i, 0);
        }

        sortedIndices.push(0);
        steps.push({
            type: 'complete',
            indices: [],
            array: [...arr],
            sortedIndices: Array.from({ length: n }, (_, idx) => idx),
            codeLine: 9,
            description: `Heap Sort completed. Total comparisons: ${comparisons}, swaps: ${swaps}.`,
            metrics: { comparisons, swaps, operations: comparisons + swaps }
        });

        return steps;
    },

    // -------------------------------------------------------------------------
    // 7. Counting Sort
    // -------------------------------------------------------------------------
    countingSort(inputArray) {
        const arr = [...inputArray];
        const n = arr.length;
        const steps = [];
        let comparisons = 0;
        let writes = 0;

        if (n <= 1) {
            return [{
                type: 'complete',
                indices: [0],
                array: [...arr],
                sortedIndices: [0],
                codeLine: 1,
                description: 'Array has size <= 1, already sorted.',
                metrics: { comparisons: 0, swaps: 0, operations: 0 }
            }];
        }

        const min = Math.min(...arr);
        const max = Math.max(...arr);
        const range = max - min + 1;
        const count = new Array(range).fill(0);
        const output = new Array(n).fill(0);

        steps.push({
            type: 'init',
            indices: [],
            array: [...arr],
            sortedIndices: [],
            codeLine: 1,
            description: `Starting Counting Sort. Minimum value: ${min}, Maximum value: ${max}, Range: ${range}.`,
            metrics: { comparisons: 0, swaps: 0, operations: 0 }
        });

        // 1. Tally frequencies
        for (let i = 0; i < n; i++) {
            const val = arr[i];
            const offset = val - min;
            count[offset]++;
            writes++;

            steps.push({
                type: 'count-tally',
                indices: [i],
                array: [...arr],
                sortedIndices: [],
                countTable: [...count],
                codeLine: 6,
                description: `Tallying arr[${i}] (${val}): incremented count[${val}] to ${count[offset]}.`,
                metrics: { comparisons, swaps: writes, operations: comparisons + writes }
            });
        }

        // 2. Prefix sums
        for (let i = 1; i < range; i++) {
            count[i] += count[i - 1];
            writes++;
            steps.push({
                type: 'prefix-sum',
                indices: [],
                array: [...arr],
                sortedIndices: [],
                countTable: [...count],
                codeLine: 8,
                description: `Calculated prefix sum at offset ${i} (value ${i + min}): cumulative rank = ${count[i]}.`,
                metrics: { comparisons, swaps: writes, operations: comparisons + writes }
            });
        }

        // 3. Populate output array stably in reverse
        for (let i = n - 1; i >= 0; i--) {
            const val = arr[i];
            const offset = val - min;
            const targetPos = count[offset] - 1;
            output[targetPos] = val;
            count[offset]--;
            writes++;

            steps.push({
                type: 'output-write',
                indices: [i],
                array: [...output],
                sortedIndices: [],
                codeLine: 11,
                description: `Placed element ${val} into output position ${targetPos}. Decremented count rank to ${count[offset]}.`,
                metrics: { comparisons, swaps: writes, operations: comparisons + writes }
            });
        }

        // 4. Copy back
        for (let i = 0; i < n; i++) {
            arr[i] = output[i];
            writes++;
        }

        steps.push({
            type: 'complete',
            indices: [],
            array: [...arr],
            sortedIndices: Array.from({ length: n }, (_, idx) => idx),
            codeLine: 14,
            description: `Counting Sort completed in linear time O(N + K). Total array writes: ${writes}.`,
            metrics: { comparisons, swaps: writes, operations: comparisons + writes }
        });

        return steps;
    }
};
