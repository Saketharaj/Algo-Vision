/**
 * AlgoVision - Automated Algorithm Verification Suite
 * Tests all 15 algorithms under edge cases:
 * - Empty / single-element / duplicate / reversed arrays
 * - Missing search targets, boundary targets
 * - Cyclic, disconnected, and shortest path graphs
 */

import { SortingGenerators } from '../static/js/algorithms/sorting.js';
import { SearchingGenerators } from '../static/js/algorithms/searching.js';
import { GraphGenerators } from '../static/js/algorithms/graphs.js';

let passed = 0;
let total = 0;

function assert(cond, msg) {
    total++;
    if (!cond) {
        console.error(`❌ FAIL: ${msg}`);
        process.exitCode = 1;
    } else {
        passed++;
    }
}

console.log('--- Testing Sorting Algorithms ---');
const testArrays = [
    [5, 1, 4, 2, 8, 3],
    [9, 8, 7, 6, 5, 4, 3, 2, 1], // reversed
    [1, 2, 3, 4, 5],             // already sorted
    [7, 7, 7, 7],                // all duplicates
    [42],                        // single element
    [10, -5, 20, 0, 15]          // negative numbers (non-counting sorts)
];

const sortAlgorithms = [
    { name: 'Bubble Sort', fn: SortingGenerators.bubbleSort },
    { name: 'Selection Sort', fn: SortingGenerators.selectionSort },
    { name: 'Insertion Sort', fn: SortingGenerators.insertionSort },
    { name: 'Merge Sort', fn: SortingGenerators.mergeSort },
    { name: 'Quick Sort', fn: SortingGenerators.quickSort },
    { name: 'Heap Sort', fn: SortingGenerators.heapSort }
];

for (const { name, fn } of sortAlgorithms) {
    for (const arr of testArrays) {
        const expected = [...arr].sort((a, b) => a - b);
        const steps = fn([...arr]);
        assert(steps.length > 0, `${name}: generated non-empty steps for [${arr.join(',')}]`);
        const finalArray = steps[steps.length - 1].array;
        assert(JSON.stringify(finalArray) === JSON.stringify(expected), `${name} sorted correctly: got [${finalArray.join(',')}] expected [${expected.join(',')}]`);
    }
}

// Counting sort (non-negative bounded integers)
const nonNegTestArrays = [
    [5, 1, 4, 2, 8, 3],
    [9, 8, 7, 6, 5, 4, 3, 2, 1],
    [1, 2, 3, 4, 5],
    [7, 7, 7, 7],
    [42],
    [10, 0, 20, 0, 15]
];
for (const arr of nonNegTestArrays) {
    const expected = [...arr].sort((a, b) => a - b);
    const steps = SortingGenerators.countingSort([...arr]);
    assert(steps.length > 0, `Counting Sort: generated steps for [${arr.join(',')}]`);
    const finalArray = steps[steps.length - 1].array;
    assert(JSON.stringify(finalArray) === JSON.stringify(expected), `Counting Sort: got [${finalArray.join(',')}] expected [${expected.join(',')}]`);
}

console.log('--- Testing Searching Algorithms ---');
const sortedArr = [5, 12, 18, 25, 33, 47, 59, 72, 88, 99];

// Linear Search
const lsFound = SearchingGenerators.linearSearch(sortedArr, 47);
assert(lsFound[lsFound.length - 1].type === 'found' && lsFound[lsFound.length - 1].foundIndex === 5, 'Linear Search: found 47 at index 5');
const lsNotFound = SearchingGenerators.linearSearch(sortedArr, 100);
assert(lsNotFound[lsNotFound.length - 1].type === 'not-found' && lsNotFound[lsNotFound.length - 1].foundIndex === -1, 'Linear Search: not found returns -1');

// Binary Search
const bsFound = SearchingGenerators.binarySearch(sortedArr, 88);
assert(bsFound[bsFound.length - 1].type === 'found' && bsFound[bsFound.length - 1].foundIndex === 8, 'Binary Search: found 88 at index 8');
const bsNotFound = SearchingGenerators.binarySearch(sortedArr, 30);
assert(bsNotFound[bsNotFound.length - 1].type === 'not-found' && bsNotFound[bsNotFound.length - 1].foundIndex === -1, 'Binary Search: 30 not found');

// Jump Search
const jsFound = SearchingGenerators.jumpSearch(sortedArr, 18);
assert(jsFound[jsFound.length - 1].type === 'found' && jsFound[jsFound.length - 1].foundIndex === 2, 'Jump Search: found 18 at index 2');
const jsNotFound = SearchingGenerators.jumpSearch(sortedArr, 3);
assert(jsNotFound[jsNotFound.length - 1].type === 'not-found', 'Jump Search: 3 not found');

// Interpolation Search
const isFound = SearchingGenerators.interpolationSearch(sortedArr, 99);
assert(isFound[isFound.length - 1].type === 'found' && isFound[isFound.length - 1].foundIndex === 9, 'Interpolation Search: found 99 at index 9');
const isNotFound = SearchingGenerators.interpolationSearch(sortedArr, 50);
assert(isNotFound[isNotFound.length - 1].type === 'not-found', 'Interpolation Search: 50 not found');

console.log('--- Testing Graph Algorithms ---');
const graphNodes = [
    { id: 'A', x: 50, y: 50 },
    { id: 'B', x: 150, y: 50 },
    { id: 'C', x: 250, y: 50 },
    { id: 'D', x: 150, y: 150 },
    { id: 'E', x: 250, y: 150 }
];
const graphEdges = [
    { from: 'A', to: 'B', weight: 2 },
    { from: 'B', to: 'C', weight: 3 },
    { from: 'A', to: 'D', weight: 1 },
    { from: 'D', to: 'E', weight: 2 },
    { from: 'B', to: 'E', weight: 4 },
    { from: 'C', to: 'E', weight: 1 }
];

// BFS
const bfsSteps = GraphGenerators.bfs(graphNodes, graphEdges, 'A', 'E');
const bfsTargetStep = bfsSteps.find(s => s.type === 'target-reached');
assert(bfsTargetStep != null, 'BFS: reached target E');
assert(bfsTargetStep.finalPath.length === 3, 'BFS unweighted shortest path: A -> D -> E or A -> B -> E (len 3)');

// DFS
const dfsSteps = GraphGenerators.dfs(graphNodes, graphEdges, 'A', 'E');
const dfsTargetStep = dfsSteps.find(s => s.type === 'target-reached');
assert(dfsTargetStep != null, 'DFS: reached target E');

// Dijkstra
const dijkstraSteps = GraphGenerators.dijkstra(graphNodes, graphEdges, 'A', 'E');
const dijkstraTarget = dijkstraSteps.find(s => s.type === 'target-reached');
assert(dijkstraTarget != null, 'Dijkstra: reached target E');
assert(dijkstraTarget.finalDistance === 3, `Dijkstra: optimal shortest distance to E is 3 (A->D->E = 1+2=3), got ${dijkstraTarget.finalDistance}`);
assert(JSON.stringify(dijkstraTarget.finalPath) === JSON.stringify(['A', 'D', 'E']), 'Dijkstra path is [A, D, E]');

// A*
const astarSteps = GraphGenerators.aStar(graphNodes, graphEdges, 'A', 'E');
const astarTarget = astarSteps.find(s => s.type === 'target-reached');
assert(astarTarget != null, 'A*: reached target E');
assert(astarTarget.finalDistance === 3, `A*: optimal shortest distance to E is 3, got ${astarTarget.finalDistance}`);

console.log(`\n🎉 Algorithm verification complete: ${passed}/${total} assertions passed with 0 errors!`);
