/**
 * AlgoVision - Algorithmic Concept Mastery Question Bank
 * Provides exactly 10 high-yield, conceptual, and verified multiple-choice questions
 * for each of the 15 algorithms in the curriculum.
 */

export const ALGORITHM_QUIZ_BANK = {
    // -------------------------------------------------------------------------
    // 1. BUBBLE SORT
    // -------------------------------------------------------------------------
    "bubble-sort": [
        {
            q: "How does Bubble Sort move elements into their sorted positions?",
            options: [
                "By finding the absolute minimum and jumping it to index 0",
                "By repeatedly comparing adjacent pairs and swapping them if out of order",
                "By dividing the array into two halves recursively",
                "By inserting elements into a binary heap"
            ],
            correct: 1,
            explanation: "Bubble Sort steps through the array comparing adjacent pairs (A[j] and A[j+1]) and swapping them if A[j] > A[j+1], causing the largest unsorted element to 'bubble up' to the end."
        },
        {
            q: "What is the worst-case time complexity of Bubble Sort, and when does it occur?",
            options: [
                "O(N) when the array is already sorted",
                "O(N log N) when array elements are randomly scattered",
                "O(N²) when the array is sorted in reverse order",
                "O(1) when the array has fewer than 10 elements"
            ],
            correct: 2,
            explanation: "When the array is in reverse order, every single pair comparison results in a swap, requiring N*(N-1)/2 comparisons and swaps, which is O(N²)."
        },
        {
            q: "How can Bubble Sort achieve an optimal O(N) best-case time complexity?",
            options: [
                "By using binary search to find insertion points",
                "By maintaining a boolean 'swapped' flag and breaking early if no swaps occurred in a pass",
                "By converting the array into a hash table first",
                "By sorting from both ends simultaneously"
            ],
            correct: 1,
            explanation: "If no swaps occur during an entire pass through the array, the array is already sorted. The algorithm breaks immediately after 1 pass (N-1 comparisons), running in O(N)."
        },
        {
            q: "What is the auxiliary space complexity of Bubble Sort?",
            options: [
                "O(N) because it needs a duplicate array",
                "O(log N) for the recursion call stack",
                "O(1) because it sorts in-place using a single swap temporary variable",
                "O(N²) for storing comparison states"
            ],
            correct: 2,
            explanation: "Bubble Sort is an in-place algorithm. It rearranges elements directly within the original array without allocating extra arrays, using O(1) auxiliary space."
        },
        {
            q: "Is standard Bubble Sort a STABLE sorting algorithm?",
            options: [
                "Yes, because equal elements are never swapped when using A[j] > A[j+1]",
                "No, equal elements always swap positions",
                "Only if the array size is a power of 2",
                "No, stability only applies to tree-based algorithms"
            ],
            correct: 0,
            explanation: "Stability means duplicate values maintain their relative order. Because Bubble Sort only swaps strictly when A[j] > A[j+1], equal elements are never swapped, preserving stability."
        },
        {
            q: "After 'k' completed outer passes of Bubble Sort, what guarantee can be made?",
            options: [
                "The first k elements are in their final sorted positions",
                "The last k elements are in their final sorted positions",
                "The entire array is k-percent sorted",
                "The median element is located at index k"
            ],
            correct: 1,
            explanation: "Each pass bubbles the largest remaining unsorted value to the right boundary. Therefore, after k passes, the last k elements are guaranteed to be in their final sorted positions."
        },
        {
            q: "What is the maximum number of swaps Bubble Sort makes on an array of size N?",
            options: [
                "N",
                "N * log₂(N)",
                "N * (N - 1) / 2",
                "2^N"
            ],
            correct: 2,
            explanation: "In the worst case (reverse sorted array), the number of inversions is N*(N-1)/2. Since each swap fixes exactly one inversion, exactly N*(N-1)/2 swaps are made."
        },
        {
            q: "Why is Bubble Sort rarely used in production software?",
            options: [
                "It requires extra memory proportional to the input size",
                "Its O(N²) average and worst-case time makes it extremely slow on large datasets compared to O(N log N) alternatives",
                "It cannot sort negative numbers or strings",
                "It crashes if there are duplicate values"
            ],
            correct: 1,
            explanation: "For an array of 100,000 items, an O(N log N) algorithm takes ~1.7 million operations, while Bubble Sort takes ~5 billion operations—making it impractical for production data."
        },
        {
            q: "If an array is already sorted: [1, 2, 3, 4, 5], how many passes does optimized Bubble Sort execute?",
            options: [
                "5 passes",
                "Exactly 1 pass with 4 comparisons and 0 swaps",
                "0 passes",
                "Log₂(5) passes"
            ],
            correct: 1,
            explanation: "Optimized Bubble Sort checks (1,2), (2,3), (3,4), (4,5)—detects 0 swaps—and immediately terminates after that single pass."
        },
        {
            q: "What is a major educational benefit of learning Bubble Sort first?",
            options: [
                "It teaches the fundamental concepts of adjacent comparisons, in-place swapping, and loop invariants",
                "It is the fastest algorithm for graphics rendering",
                "It demonstrates divide-and-conquer recursion",
                "It eliminates the need for pointer arithmetic"
            ],
            correct: 0,
            explanation: "Bubble Sort is the clearest visual demonstration of how local pairwise decisions (comparing two adjacent neighbors) lead to global order (a fully sorted array)."
        }
    ],

    // -------------------------------------------------------------------------
    // 2. SELECTION SORT
    // -------------------------------------------------------------------------
    "selection-sort": [
        {
            q: "What is the core working principle of Selection Sort?",
            options: [
                "Repeatedly find the minimum element in the unsorted region and swap it to the beginning",
                "Divide the array into halves and merge them back together",
                "Compare adjacent items and swap if left is greater than right",
                "Place elements into buckets based on their most significant digit"
            ],
            correct: 0,
            explanation: "Selection Sort divides the array into sorted (left) and unsorted (right) regions. In each pass, it finds the smallest element in the unsorted part and swaps it with the first unsorted position."
        },
        {
            q: "What is the time complexity of Selection Sort in the BEST case (already sorted array)?",
            options: [
                "O(N)",
                "O(N log N)",
                "O(N²)",
                "O(1)"
            ],
            correct: 2,
            explanation: "Even if the array is already sorted, Selection Sort must still scan every remaining element to confirm it is indeed the minimum. It always makes N*(N-1)/2 comparisons, so best-case is O(N²)."
        },
        {
            q: "What is the maximum number of swaps Selection Sort executes for an array of size N?",
            options: [
                "N * (N - 1) / 2",
                "At most N - 1 swaps (O(N) writes)",
                "2^N swaps",
                "N * log N swaps"
            ],
            correct: 1,
            explanation: "Selection Sort performs at most one swap per outer loop iteration. For size N, it performs at most N-1 swaps, which is strictly O(N) memory writes."
        },
        {
            q: "In what hardware environment is Selection Sort's O(N) swap property particularly useful?",
            options: [
                "High-performance cloud servers with petabytes of RAM",
                "Flash memory (EEPROM) or solid-state devices where write cycles degrade the hardware and are very costly",
                "Graphics Processing Units (GPUs) with thousands of cores",
                "Quantum computing circuits"
            ],
            correct: 1,
            explanation: "Flash memory has limited write endurance before cells degrade. Because Selection Sort minimizes writes to at most N swaps, it is attractive when writes cost much more than reads."
        },
        {
            q: "Is standard array-based Selection Sort stable?",
            options: [
                "Yes, always stable",
                "No, swapping the minimum element over intermediate elements can reverse the relative order of duplicate values",
                "Only stable for negative numbers",
                "Stability depends on whether N is even or odd"
            ],
            correct: 1,
            explanation: "Selection Sort is unstable. For example, in [4a, 4b, 1], swapping '1' with '4a' places '4a' after '4b', reversing their original order: [1, 4b, 4a]."
        },
        {
            q: "What is the auxiliary space complexity of Selection Sort?",
            options: [
                "O(1) in-place",
                "O(N)",
                "O(log N)",
                "O(N²)"
            ],
            correct: 0,
            explanation: "Selection Sort only needs a couple of integer index variables (`minIdx`, `i`, `j`), requiring O(1) constant auxiliary space."
        },
        {
            q: "How many comparisons does Selection Sort perform on an array of 5 elements?",
            options: [
                "4 comparisons",
                "10 comparisons",
                "25 comparisons",
                "5 comparisons"
            ],
            correct: 1,
            explanation: "The formula is N*(N-1)/2. For N=5: 4 + 3 + 2 + 1 = 10 comparisons, regardless of input arrangement."
        },
        {
            q: "What invariant holds at the start of iteration 'i' in Selection Sort?",
            options: [
                "The first 'i' elements are sorted and are the 'i' smallest elements in the entire array",
                "The entire array is half sorted",
                "The maximum element is at index 0",
                "All even elements precede odd elements"
            ],
            correct: 0,
            explanation: "At iteration i, elements A[0...i-1] are completely sorted and consist of the smallest i elements of the entire dataset. None of them will ever be modified again."
        },
        {
            q: "How does Selection Sort compare to Bubble Sort in terms of average swaps?",
            options: [
                "Selection Sort performs far fewer swaps (O(N) vs O(N²))",
                "Bubble Sort performs fewer swaps",
                "They perform identical numbers of swaps",
                "Selection Sort never performs swaps"
            ],
            correct: 0,
            explanation: "While both do O(N²) comparisons, Selection Sort does at most N swaps, whereas Bubble Sort can do up to N*(N-1)/2 swaps in the average and worst cases."
        },
        {
            q: "Can Selection Sort be adapted to sort in descending order?",
            options: [
                "No, it only works for ascending order",
                "Yes, simply find the MAXIMUM element in the unsorted region instead of the minimum",
                "Only by reversing the array first using another algorithm",
                "Yes, but it increases the time complexity to O(N³)"
            ],
            correct: 1,
            explanation: "By simply looking for the maximum unsorted element in each pass and placing it at index i, Selection Sort sorts in descending order with identical time and space complexity."
        }
    ],

    // -------------------------------------------------------------------------
    // 3. INSERTION SORT
    // -------------------------------------------------------------------------
    "insertion-sort": [
        {
            q: "How does Insertion Sort build the sorted sequence?",
            options: [
                "By picking one element at a time and shifting larger elements right to insert it into its correct position in the sorted prefix",
                "By partitioning around a pivot element",
                "By merging two sorted sublists",
                "By searching for the absolute maximum element"
            ],
            correct: 0,
            explanation: "Insertion Sort works like sorting playing cards in your hand: take the next unsorted card and slide it left into its proper position among the already-sorted cards."
        },
        {
            q: "What is the best-case time complexity of Insertion Sort, and on what input does it occur?",
            options: [
                "O(1) on an empty array",
                "O(N) on an already-sorted (or nearly-sorted) array",
                "O(N log N) on random arrays",
                "O(N²) on reverse arrays"
            ],
            correct: 1,
            explanation: "On an already-sorted array, each element is compared just once with its left neighbor and doesn't need to shift. Total comparisons = N-1, giving O(N) running time."
        },
        {
            q: "What is the worst-case time complexity of Insertion Sort?",
            options: [
                "O(N)",
                "O(N log N)",
                "O(N²) when the input is reverse sorted",
                "O(N!)"
            ],
            correct: 2,
            explanation: "If the array is in reverse order, each element at index i must be compared and shifted past all i preceding elements, totaling N*(N-1)/2 operations: O(N²)."
        },
        {
            q: "Why is Insertion Sort widely used as the base-case in hybrid sorting algorithms like Timsort and Introsort?",
            options: [
                "Because for small arrays (typically N <= 16 to 32), Insertion Sort has minimal overhead, high cache locality, and runs faster than Quick/Merge Sort",
                "Because it is an O(1) algorithm",
                "Because it can run concurrently across distributed servers",
                "Because it does not require memory pointers"
            ],
            correct: 0,
            explanation: "Advanced production sorts (like Python's Timsort or Java's Dual-Pivot QuickSort) switch to Insertion Sort for small partitions because its simplicity and CPU cache locality outperform recursive algorithms on small N."
        },
        {
            q: "Is Insertion Sort an ONLINE algorithm?",
            options: [
                "No, it requires an internet connection",
                "Yes, it can sort a list as it receives items continuously (one by one) in real time",
                "Only if the data comes from a REST API",
                "No, it must know the total array length in advance"
            ],
            correct: 1,
            explanation: "An online algorithm can process inputs piece-by-piece as they arrive. As new elements arrive in a stream, Insertion Sort can insert each new item into the existing sorted list in O(N) time."
        },
        {
            q: "Is Insertion Sort a STABLE sorting algorithm?",
            options: [
                "Yes, because equal elements are never shifted past each other when using strict inequality (>)",
                "No, duplicates are randomly rearranged",
                "Only stable if all elements are positive",
                "It is unstable by default"
            ],
            correct: 0,
            explanation: "Because an incoming element stops shifting as soon as it encounters an element with an equal value, relative order is preserved, making Insertion Sort stable."
        },
        {
            q: "What is the auxiliary space complexity of Insertion Sort?",
            options: [
                "O(1) in-place",
                "O(N)",
                "O(log N)",
                "O(N²)"
            ],
            correct: 0,
            explanation: "Insertion Sort only stores the single 'current' key being inserted and loop counter variables, requiring O(1) constant auxiliary memory."
        },
        {
            q: "How is the number of operations in Insertion Sort related to the number of 'inversions' in the array?",
            options: [
                "The number of shifts is exactly equal to the number of inversions in the array",
                "There is no relationship",
                "Operations equal inversions squared",
                "Operations equal inversions divided by N"
            ],
            correct: 0,
            explanation: "An inversion is a pair of indices (i, j) where i < j and A[i] > A[j]. Each shift in Insertion Sort eliminates exactly one inversion. Thus, runtime is O(N + K) where K is the number of inversions."
        },
        {
            q: "What is 'Binary Insertion Sort'?",
            options: [
                "A variant that uses Binary Search to find the correct insertion position in O(log N) comparisons",
                "An algorithm that only sorts binary (0 and 1) numbers",
                "A sort that converts decimal numbers to binary strings first",
                "A sort that splits the array into two binary trees"
            ],
            correct: 0,
            explanation: "Binary Insertion Sort reduces the number of comparisons to O(N log N) using binary search, though the number of element shifts still remains O(N²)."
        },
        {
            q: "If an array has 10 elements and only 1 element is out of place by 2 positions, how fast does Insertion Sort finish?",
            options: [
                "In O(N²) time",
                "In nearly linear O(N) time, making just a few shifts",
                "In O(N!) time",
                "It fails to sort"
            ],
            correct: 1,
            explanation: "Because Insertion Sort runtime is proportional to the number of inversions, nearly-sorted arrays are sorted almost instantaneously in O(N) time."
        }
    ],

    // -------------------------------------------------------------------------
    // 4. MERGE SORT
    // -------------------------------------------------------------------------
    "merge-sort": [
        {
            q: "Which fundamental algorithm design paradigm does Merge Sort utilize?",
            options: [
                "Greedy Choice",
                "Dynamic Programming",
                "Divide and Conquer",
                "Backtracking with Pruning"
            ],
            correct: 2,
            explanation: "Merge Sort divides the array into two halves, recursively sorts both halves (conquer), and then merges the two sorted halves into a single sorted array (combine)."
        },
        {
            q: "What is the time complexity of Merge Sort in the Best, Average, and Worst cases?",
            options: [
                "Best: O(N), Average: O(N²), Worst: O(N²)",
                "Best, Average, and Worst are all guaranteed O(N log N)",
                "Best: O(1), Average: O(N), Worst: O(N log N)",
                "Best: O(N log N), Average: O(N²), Worst: O(2^N)"
            ],
            correct: 1,
            explanation: "Merge Sort always divides the problem in half (recursion tree depth log₂ N) and performs O(N) work at every level to merge. Its performance is guaranteed Θ(N log N) in all cases."
        },
        {
            q: "What is the primary drawback of standard Merge Sort on arrays?",
            options: [
                "It is unstable",
                "It requires O(N) auxiliary memory to hold the merged elements",
                "Its worst-case time is O(N²)",
                "It cannot sort negative numbers"
            ],
            correct: 1,
            explanation: "Unlike in-place algorithms like QuickSort or HeapSort, standard Merge Sort requires an extra temporary buffer of size O(N) to merge the two sorted halves safely."
        },
        {
            q: "Is standard Merge Sort stable?",
            options: [
                "Yes, if the merge step chooses from the left sub-array when elements are equal (left[i] <= right[j])",
                "No, merging always reverses duplicate values",
                "Only stable when sorting strings",
                "Unstable on arrays with odd lengths"
            ],
            correct: 0,
            explanation: "By using '<=' in the merge comparison, whenever elements from the left and right sub-arrays are equal, the left element is taken first, preserving their original relative order."
        },
        {
            q: "Why is Merge Sort the preferred choice for sorting Linked Lists?",
            options: [
                "Linked lists cannot be sorted by any other algorithm",
                "Merging linked lists requires O(1) auxiliary space (just rearranging pointers) and does not need random access",
                "It runs in O(N) time on linked lists",
                "It eliminates all cycle errors in linked lists"
            ],
            correct: 1,
            explanation: "Linked lists can be split and merged by rewiring next pointers with zero extra memory allocation (O(1) space), overcoming Merge Sort's main array disadvantage."
        },
        {
            q: "What recurrence relation describes the running time of Merge Sort?",
            options: [
                "T(N) = T(N - 1) + O(1)",
                "T(N) = 2 * T(N / 2) + O(N)",
                "T(N) = T(N / 2) + O(1)",
                "T(N) = 2 * T(N - 1) + O(N)"
            ],
            correct: 1,
            explanation: "The recurrence is T(N) = 2T(N/2) + O(N): 2 subproblems of size N/2, plus O(N) work to merge the two halves. By Master Theorem (Case 2), this evaluates to Θ(N log N)."
        },
        {
            q: "What is the recursion tree depth for an array of size N in Merge Sort?",
            options: [
                "N levels",
                "log₂(N) levels",
                "N² levels",
                "2 levels"
            ],
            correct: 1,
            explanation: "Repeatedly dividing N by 2 until reaching base cases of size 1 produces a binary tree of height ⌈log₂ N⌉."
        },
        {
            q: "How many total elements are merged across all subproblems at each level of the recursion tree?",
            options: [
                "Exactly N elements (costing O(N) work per level)",
                "N / 2 elements",
                "N² elements",
                "1 element"
            ],
            correct: 0,
            explanation: "At level k, there are 2^k subproblems, each of size N / 2^k. The total merge work at that level is 2^k * (N / 2^k) = N elements, giving O(N) work per level."
        },
        {
            q: "What is 'Bottom-Up' (Iterative) Merge Sort?",
            options: [
                "A non-recursive implementation that iteratively merges subarrays of size 1, then size 2, 4, 8, etc.",
                "A sort that starts from the highest memory address and works down",
                "An algorithm that sorts numbers from least significant digit to most",
                "A version of Merge Sort that only sorts the bottom half of an array"
            ],
            correct: 0,
            explanation: "Bottom-up Merge Sort avoids recursion overhead and stack memory by using nested loops to merge sublists of doubling sizes (1, 2, 4, 8... up to N)."
        },
        {
            q: "When is Merge Sort strongly preferred over Quick Sort in large data processing?",
            options: [
                "When guaranteed worst-case O(N log N) performance is required, or when performing external sorting on datasets that do not fit into RAM",
                "When CPU cache is extremely limited",
                "When you cannot allocate any extra memory",
                "When the data is already sorted in reverse order"
            ],
            correct: 0,
            explanation: "External sorting (sorting terabytes on disk/tape) relies on Merge Sort because sequential file access patterns during merging make it ideal for disk I/O, and its O(N log N) worst-case is strictly guaranteed."
        }
    ],

    // -------------------------------------------------------------------------
    // 5. QUICK SORT
    // -------------------------------------------------------------------------
    "quick-sort": [
        {
            q: "What is the core mechanism of Quick Sort?",
            options: [
                "Partitioning the array around a chosen 'pivot' so elements smaller than the pivot are on the left and larger on the right",
                "Inserting elements into a binary search tree",
                "Merging two independently sorted arrays",
                "Swapping adjacent elements repeatedly until no swaps occur"
            ],
            correct: 0,
            explanation: "Quick Sort picks a pivot element and partitions the array such that all elements <= pivot go to the left, and elements > pivot go to the right, then recurses on both partitions."
        },
        {
            q: "What is the WORST-CASE time complexity of Quick Sort, and when does it occur with last-element pivot selection?",
            options: [
                "O(N) on random arrays",
                "O(N log N) on reverse arrays",
                "O(N²) when the array is already sorted or reverse sorted (causing highly unbalanced partitions)",
                "O(N³) on arrays with all equal elements"
            ],
            correct: 2,
            explanation: "If the pivot chosen is always the smallest or largest element (e.g. choosing the last element of an already-sorted array), partitions are split into sizes 0 and N-1, leading to N recursive levels and O(N²) time."
        },
        {
            q: "What is the average-case time complexity of Quick Sort?",
            options: [
                "O(N)",
                "O(N log N)",
                "O(N²)",
                "O(log N)"
            ],
            correct: 1,
            explanation: "On average, the pivot splits the array into reasonably balanced partitions, leading to recursion depth of O(log N) and O(N log N) total running time."
        },
        {
            q: "Why is Quick Sort often faster in practice than Merge Sort and Heap Sort, despite its O(N²) worst-case?",
            options: [
                "Its inner partitioning loop is exceptionally cache-friendly and has very low constant factors with in-place swaps",
                "It makes zero comparisons",
                "It uses quantum parallel processing",
                "It never recurses deeper than 2 levels"
            ],
            correct: 0,
            explanation: "Quick Sort accesses memory sequentially in cache lines during partitioning, has low constant factors, and does not require copying to auxiliary arrays like Merge Sort."
        },
        {
            q: "How can the worst-case O(N²) behavior of Quick Sort be practically avoided?",
            options: [
                "By using randomized pivot selection or the 'Median-of-Three' strategy (median of first, middle, last)",
                "By increasing the recursion stack limit",
                "By converting all numbers to positive integers",
                "By running the algorithm in reverse"
            ],
            correct: 0,
            explanation: "Median-of-three or random pivot selection makes encountering the worst-case unbalanced partition virtually impossible on real-world sorted or structured data."
        },
        {
            q: "What is the auxiliary space complexity of Quick Sort?",
            options: [
                "O(N) to store duplicate elements",
                "O(log N) average auxiliary space for the call stack",
                "O(N²) for the recursion matrix",
                "Zero memory overhead"
            ],
            correct: 1,
            explanation: "While the data is partitioned in-place, the recursive function call stack requires O(log N) space on average (and O(N) in the worst case without tail-call optimization)."
        },
        {
            q: "Is standard Quick Sort stable?",
            options: [
                "Yes, always stable",
                "No, partitioning can swap distant elements over identical keys, altering their relative order",
                "Only stable with Hoare partition",
                "Stable only when all numbers are unique"
            ],
            correct: 1,
            explanation: "Quick Sort is fundamentally unstable because partitioning involves long-range swaps across the pivot that jump over identical values."
        },
        {
            q: "What is the difference between Lomuto and Hoare partitioning schemes?",
            options: [
                "Lomuto uses a single index moving forward; Hoare uses two pointers moving from opposite ends toward each other and does ~3x fewer swaps on average",
                "Lomuto only works on strings; Hoare works on integers",
                "Lomuto is O(N log N) while Hoare is O(N²)",
                "There is no difference"
            ],
            correct: 0,
            explanation: "Hoare's original partition scheme uses two pointers converging from opposite ends and is more efficient in practice because it performs about three times fewer swaps than Lomuto's scheme."
        },
        {
            q: "Once partitioning is complete, what is true about the pivot element?",
            options: [
                "It is in its final sorted position and will never need to be moved again",
                "It must be sorted again in the next pass",
                "It is always located at index 0",
                "It is guaranteed to be the maximum value in the array"
            ],
            correct: 0,
            explanation: "Partitioning guarantees that all elements to the left are <= pivot and all elements to the right are >= pivot. Therefore, the pivot is at its exact final sorted index."
        },
        {
            q: "What is 'Dual-Pivot Quick Sort' (used in Java's Arrays.sort)?",
            options: [
                "A variation that chooses two pivots, partitioning the array into three segments (< P1, between P1 and P2, > P2)",
                "A sort that runs two threads on different CPUs",
                "A sort that sorts backwards and forwards simultaneously",
                "A sort that requires two identical arrays"
            ],
            correct: 0,
            explanation: "Dual-Pivot QuickSort (developed by Vladimir Yaroslavskiy) uses two pivots to divide the array into three parts, reducing memory writes and running faster on modern multi-level cache CPU architectures."
        }
    ],

    // -------------------------------------------------------------------------
    // 6. HEAP SORT
    // -------------------------------------------------------------------------
    "heap-sort": [
        {
            q: "What underlying data structure does Heap Sort utilize?",
            options: [
                "Binary Search Tree",
                "Complete Binary Max-Heap (represented in-place as a flat array)",
                "Hash Map with separate chaining",
                "Doubly-linked ring buffer"
            ],
            correct: 1,
            explanation: "Heap Sort uses a complete binary tree satisfying the max-heap property (every parent >= its children), neatly mapped into the array itself without pointer nodes."
        },
        {
            q: "In a zero-indexed array representation of a binary heap, what are the child indices of a node at index 'i'?",
            options: [
                "Left: 2*i + 1, Right: 2*i + 2",
                "Left: i - 1, Right: i + 1",
                "Left: 2*i, Right: 2*i + 1",
                "Left: i / 2, Right: i / 2 + 1"
            ],
            correct: 0,
            explanation: "For any node at index i in a 0-indexed array: its left child is at (2*i + 1), its right child is at (2*i + 2), and its parent is at ⌊(i - 1) / 2⌋."
        },
        {
            q: "What is the time complexity to build a Max-Heap from an unsorted array of N elements (Heapify)?",
            options: [
                "O(N log N)",
                "O(N) linear time",
                "O(N²)",
                "O(1)"
            ],
            correct: 1,
            explanation: "Although each sift-down can take O(log N), most nodes are near the leaves with small heights. The summation of heights over all nodes converges to O(N)."
        },
        {
            q: "What is the time complexity of Heap Sort across Best, Average, and Worst cases?",
            options: [
                "O(N) best, O(N log N) average, O(N²) worst",
                "Strictly O(N log N) in all cases (Best, Average, and Worst)",
                "O(N log N) average, O(N!) worst",
                "O(1) best, O(N) worst"
            ],
            correct: 1,
            explanation: "Building the heap takes O(N). Then extracting the root N-1 times and sifting down takes (N-1) * O(log N). Thus, total time is strictly Θ(N log N) in all cases."
        },
        {
            q: "What is the auxiliary space complexity of Heap Sort?",
            options: [
                "O(1) strictly in-place",
                "O(N)",
                "O(log N)",
                "O(N²)"
            ],
            correct: 0,
            explanation: "Heap Sort constructs and manipulates the binary heap directly inside the input array, requiring O(1) constant auxiliary space."
        },
        {
            q: "Is standard Heap Sort stable?",
            options: [
                "Yes, always stable",
                "No, extracting the root and swapping with the last leaf disrupts the relative order of duplicate elements",
                "Only stable for positive integers",
                "Stable if implemented with min-heap"
            ],
            correct: 1,
            explanation: "Heap Sort is not stable. Swapping elements during sift-down and root extraction can move identical elements past each other unpredictably."
        },
        {
            q: "In Heap Sort, how are elements sorted after the max-heap is initially built?",
            options: [
                "Swap the root (maximum) with the last unsorted element, decrement the heap size, and sift-down the new root",
                "Delete all nodes and reinsert into a queue",
                "Sort all leaf nodes first",
                "Reverse the array"
            ],
            correct: 0,
            explanation: "The root holds the current maximum. By swapping it with the element at the current end of the heap and shrinking heap size by 1, the largest values accumulate at the end in sorted order."
        },
        {
            q: "Why is Quick Sort often faster in practice than Heap Sort despite both having O(N log N) behavior?",
            options: [
                "Heap Sort does not sort in-place",
                "Heap Sort's sift-down operations jump across large array strides (parent to 2*i+1), resulting in poor CPU cache locality and frequent cache misses",
                "Heap Sort requires floating point operations",
                "Heap Sort cannot handle duplicate numbers"
            ],
            correct: 1,
            explanation: "In a heap, moving from a parent to a child doubles the index (from index 50 to 101 to 203), jumping across cache lines and causing cache misses on modern processors."
        },
        {
            q: "What is the primary advantage of Heap Sort over standard Quick Sort?",
            options: [
                "It is faster on small arrays",
                "It guarantees O(N log N) worst-case time with O(1) extra space (no worst-case quadratic degradation or stack overflow)",
                "It is stable",
                "It can sort linked lists easily"
            ],
            correct: 1,
            explanation: "QuickSort can degrade to O(N²) without proper precautions, while HeapSort guarantees O(N log N) worst-case time without any additional memory."
        },
        {
            q: "At which index does the last non-leaf node reside in an array of size N?",
            options: [
                "N - 1",
                "⌊N / 2⌋ - 1",
                "0",
                "⌊N / 4⌋"
            ],
            correct: 1,
            explanation: "In a complete binary tree of size N, the leaf nodes start at index ⌊N / 2⌋. Therefore, bottom-up heapification begins at the last internal node: index ⌊N / 2⌋ - 1."
        }
    ],

    // -------------------------------------------------------------------------
    // 7. COUNTING SORT
    // -------------------------------------------------------------------------
    "counting-sort": [
        {
            q: "Why is Counting Sort classified as a NON-COMPARISON sort?",
            options: [
                "It never compares elements with '<' or '>' operators; instead, it tallies the frequencies of each distinct value using integer keys as array indices",
                "It only works on arrays that have already been compared",
                "It relies on comparison neural networks",
                "It guesses the order randomly"
            ],
            correct: 0,
            explanation: "Counting Sort doesn't compare elements against each other. It counts how many times each integer value appears and uses prefix sums to compute exact destination positions."
        },
        {
            q: "What is the time complexity of Counting Sort where N is the number of elements and K is the range of key values (max - min + 1)?",
            options: [
                "O(N²)",
                "O(N log N)",
                "O(N + K) linear time",
                "O(K²)"
            ],
            correct: 2,
            explanation: "Counting frequencies takes O(N), prefix sums take O(K), and placing elements into the output array takes O(N). Total time is O(N + K)."
        },
        {
            q: "What is the space complexity of Counting Sort?",
            options: [
                "O(1)",
                "O(N + K) to store the count array of size K and output array of size N",
                "O(N log K)",
                "O(K²)"
            ],
            correct: 1,
            explanation: "Counting Sort requires an auxiliary count array of size K (the range of values) plus an output array of size N to place the sorted values."
        },
        {
            q: "When is Counting Sort an inefficient choice?",
            options: [
                "When the range of values K is significantly larger than N (e.g., sorting 10 numbers whose values are between 1 and 1,000,000,000)",
                "When all numbers are positive",
                "When sorting fewer than 50 elements",
                "When the data contains duplicates"
            ],
            correct: 0,
            explanation: "If K >> N (for example, sorting 5 integers where one value is 1 billion), allocating and iterating over an array of 1 billion elements wastes massive amounts of memory and time."
        },
        {
            q: "How does Counting Sort achieve STABILITY when building the final sorted array?",
            options: [
                "By iterating backwards through the input array (from N-1 down to 0) while decrementing counts",
                "By sorting the count array using bubble sort",
                "By ignoring duplicate keys",
                "Counting sort can never be stable"
            ],
            correct: 0,
            explanation: "By iterating through the input array from right to left, the last occurrence of an equal element is placed into the highest remaining slot for that value, preserving original order."
        },
        {
            q: "Can Counting Sort handle negative numbers?",
            options: [
                "No, negative numbers always crash the algorithm",
                "Yes, by finding the minimum value and offsetting all numbers by subtracting 'min_val' so indices start at 0",
                "Only if the numbers are converted to imaginary values",
                "Only on 64-bit systems"
            ],
            correct: 1,
            explanation: "By computing min_val and mapping each value x to (x - min_val), negative numbers shift into positive index ranges (0 to max - min) seamlessly."
        },
        {
            q: "Why can Counting Sort beat the theoretical Ω(N log N) lower bound for sorting?",
            options: [
                "Because the Ω(N log N) lower bound only applies to comparison-based sorting models (decision trees)",
                "Because it uses more CPU threads",
                "Because of rounding errors in complexity theory",
                "Because it only sorts numbers up to 100"
            ],
            correct: 0,
            explanation: "The Ω(N log N) lower bound is derived from decision trees where branching is based on binary comparisons (A[i] < A[j]). Non-comparison sorts bypass this limitation by using direct array indexing."
        },
        {
            q: "What role does Counting Sort play in Radix Sort?",
            options: [
                "Radix Sort uses stable Counting Sort as a subroutine to sort the digits at each position (ones, tens, hundreds)",
                "It provides the initial random numbers for Radix Sort",
                "It compresses the output of Radix Sort",
                "None; they are competing algorithms"
            ],
            correct: 0,
            explanation: "Radix Sort sorts multi-digit numbers digit by digit. Because the range of digits is small (K=10 for base 10), stable Counting Sort is the ideal linear-time subroutine."
        },
        {
            q: "What do the values in the count array represent after calculating prefix sums?",
            options: [
                "The number of elements less than or equal to that key value (indicating their 1-based ending index in the sorted array)",
                "The original array values",
                "The number of swaps made",
                "Random hash buckets"
            ],
            correct: 0,
            explanation: "Prefix sums accumulate counts so that count[v] tells us exactly how many elements have values <= v, directly indicating where value v belongs in the output array."
        },
        {
            q: "Which of the following data types CANNOT be directly sorted with basic Counting Sort?",
            options: [
                "Arbitrary floating-point numbers with arbitrary precision",
                "Small positive integers",
                "ASCII characters (0 to 127)",
                "Exam scores between 0 and 100"
            ],
            correct: 0,
            explanation: "Counting sort requires discrete integer keys to serve as array indices. Arbitrary real numbers (floats) cannot be mapped directly to finite array indices."
        }
    ],

    // -------------------------------------------------------------------------
    // 8. LINEAR SEARCH
    // -------------------------------------------------------------------------
    "linear-search": [
        {
            q: "How does Linear Search find a target value in a collection?",
            options: [
                "By sequentially inspecting every element from index 0 to N-1 until a match is found or the end is reached",
                "By jumping in blocks of √N",
                "By inspecting the middle element and halving the array",
                "By using a hash lookup table"
            ],
            correct: 0,
            explanation: "Linear Search iterates element-by-element sequentially from the start to the finish of the list until it finds the target or exhausts all items."
        },
        {
            q: "What is the worst-case and average-case time complexity of Linear Search?",
            options: [
                "O(1)",
                "O(log N)",
                "O(N)",
                "O(N²)"
            ],
            correct: 2,
            explanation: "If the target is at the very last index or not present at all, Linear Search checks all N elements, requiring O(N) comparisons."
        },
        {
            q: "What is the BEST-CASE time complexity of Linear Search, and when does it occur?",
            options: [
                "O(1) when the target is located at the very first element (index 0)",
                "O(N) when the array is sorted",
                "O(log N) when the target is in the middle",
                "O(0) when the target is negative"
            ],
            correct: 0,
            explanation: "If the target happens to be the very first item inspected (A[0]), the search succeeds immediately in 1 comparison: O(1)."
        },
        {
            q: "Does Linear Search require the input data to be sorted?",
            options: [
                "Yes, it only works on sorted arrays",
                "No, it works equally well on both unsorted and sorted collections",
                "Only if the collection contains more than 100 items",
                "Yes, otherwise it triggers an infinite loop"
            ],
            correct: 1,
            explanation: "Because Linear Search checks every single item one-by-one, it has zero prerequisites: it works on completely unsorted, random, or custom data."
        },
        {
            q: "What is the auxiliary space complexity of Linear Search?",
            options: [
                "O(1) constant space",
                "O(N) auxiliary space",
                "O(log N) call stack",
                "O(N²)"
            ],
            correct: 0,
            explanation: "Linear search only needs a loop counter index variable (`i`), using O(1) auxiliary memory."
        },
        {
            q: "What is 'Sentinel Linear Search'?",
            options: [
                "Placing the target at the end of the array as a sentinel to eliminate the loop boundary check (i < N) in the inner loop",
                "A search guarded by cybersecurity firewalls",
                "Searching using two threads simultaneously",
                "Searching only even indices"
            ],
            correct: 0,
            explanation: "In Sentinel Linear Search, the target is placed at A[N-1] (or appended). This guarantees the target will always be found, removing the need to check 'i < N' on every iteration and speeding up execution."
        },
        {
            q: "When is Linear Search preferred over Binary Search?",
            options: [
                "When the dataset is unsorted and you only need to perform a single search (sorting takes O(N log N), making linear search faster at O(N))",
                "When the array contains 10 million sorted items",
                "When memory access is extremely slow",
                "Never, Binary Search is always faster regardless of preconditions"
            ],
            correct: 0,
            explanation: "If data is unsorted and you only search once, sorting first takes O(N log N) plus O(log N) search = O(N log N), whereas a direct Linear Search takes only O(N)."
        },
        {
            q: "Can Linear Search be performed on a singly-linked list?",
            options: [
                "Yes, by following next pointers sequentially from head to tail",
                "No, linked lists do not support search operations",
                "Only if the list is circular",
                "Only with an index array"
            ],
            correct: 0,
            explanation: "Singly-linked lists naturally support sequential access via pointers, making Linear Search the standard search mechanism for linked lists."
        },
        {
            q: "On an array of N=1,000,000 elements, approximately how many comparisons does Linear Search make on average if the item is present?",
            options: [
                "~20 comparisons",
                "~500,000 comparisons (N / 2)",
                "~1,000,000 comparisons",
                "~1,000 comparisons"
            ],
            correct: 1,
            explanation: "On average, assuming uniform probability across all positions, the target is found at index N/2, requiring approximately 500,000 comparisons."
        },
        {
            q: "What does Linear Search return if the target element is NOT present in the array?",
            options: [
                "An exception is thrown",
                "Conventionally returns -1 or a null indicator",
                "Returns the length of the array N",
                "Returns the closest number"
            ],
            correct: 1,
            explanation: "In standard computer science conventions, search functions return -1 (or sentinel/null) to denote that the element does not exist in the collection."
        }
    ],

    // -------------------------------------------------------------------------
    // 9. BINARY SEARCH
    // -------------------------------------------------------------------------
    "binary-search": [
        {
            q: "What is the mandatory prerequisite before applying Binary Search on an array?",
            options: [
                "The array must be sorted in monotonic order (ascending or descending)",
                "The array size must be an exact power of 2",
                "The array must not contain duplicate values",
                "The array must only contain positive integers"
            ],
            correct: 0,
            explanation: "Binary Search relies on sorted order to determine whether the target lies in the left half or right half of the current search interval."
        },
        {
            q: "What is the worst-case time complexity of Binary Search on an array of size N?",
            options: [
                "O(1)",
                "O(log₂ N)",
                "O(N)",
                "O(N log N)"
            ],
            correct: 1,
            explanation: "At every step, Binary Search cuts the search space exactly in half. For an array of size N, it can divide by 2 at most ⌈log₂ N⌉ times."
        },
        {
            q: "How many comparisons does Binary Search take in the WORST case on an array of 1,000,000 elements?",
            options: [
                "At most ~20 comparisons (since 2²⁰ ≈ 1,048,576)",
                "500,000 comparisons",
                "1,000,000 comparisons",
                "10,000 comparisons"
            ],
            correct: 0,
            explanation: "Because log₂(1,000,000) ≈ 19.93, Binary Search is guaranteed to find any item (or confirm absence) in at most 20 comparisons!"
        },
        {
            q: "Why is calculating the midpoint as `mid = low + (high - low) / 2` preferred over `mid = (low + high) / 2`?",
            options: [
                "It executes faster on the CPU",
                "It avoids integer overflow when `low + high` exceeds the maximum allowable integer limit (e.g. 2³¹ - 1)",
                "It works for floating-point arrays",
                "It handles negative targets better"
            ],
            correct: 1,
            explanation: "In languages with fixed integer sizes (C, C++, Java), if `low + high` exceeds 2,147,483,647, it overflows into negative numbers. `low + (high - low) / 2` mathematically prevents overflow."
        },
        {
            q: "What is the auxiliary space complexity of iterative Binary Search?",
            options: [
                "O(1) constant auxiliary space",
                "O(log N)",
                "O(N)",
                "O(N²)"
            ],
            correct: 0,
            explanation: "Iterative Binary Search only requires three pointer/index variables (`low`, `high`, `mid`), consuming O(1) constant memory."
        },
        {
            q: "What happens if target < array[mid] in an ascending sorted array?",
            options: [
                "The target must be in the right half, so set low = mid + 1",
                "The target must be in the left half, so eliminate the right half by setting high = mid - 1",
                "The search terminates as not found",
                "The array is reversed"
            ],
            correct: 1,
            explanation: "Since the array is sorted, every element to the right of `mid` is >= array[mid]. If the target is smaller than array[mid], it cannot exist in the right half, so we set `high = mid - 1`."
        },
        {
            q: "What is the BEST-CASE time complexity of Binary Search?",
            options: [
                "O(1) when the target is located exactly at the initial midpoint",
                "O(log N)",
                "O(N)",
                "O(0)"
            ],
            correct: 0,
            explanation: "If the target is located directly at the first calculated midpoint index, the search succeeds in exactly 1 comparison: O(1)."
        },
        {
            q: "Can Binary Search be applied efficiently to a standard singly-linked list?",
            options: [
                "Yes, with identical O(log N) performance",
                "No, because finding the midpoint of a linked list requires traversing nodes sequentially in O(N) time, destroying the O(log N) benefit",
                "Only if the linked list is doubly-linked",
                "Only if the list is circular"
            ],
            correct: 1,
            explanation: "Binary search requires O(1) random access by index (`array[mid]`). Traversing to the middle node of a linked list takes O(N) steps, making total search time O(N)."
        },
        {
            q: "What is 'Lower Bound' in Binary Search?",
            options: [
                "The lowest index in the array",
                "The index of the first element that is greater than or equal to the target",
                "The smallest number in the array",
                "The minimum number of comparisons"
            ],
            correct: 1,
            explanation: "In C++ STL (`std::lower_bound`) and algorithmic problem solving, lower bound returns the iterator/index of the first element not less than target (>= target)."
        },
        {
            q: "What is 'Binary Search on Answer' (Search space reduction)?",
            options: [
                "Searching for code answers on the web",
                "Applying binary search over a range of possible numerical answers when a monotonic feasibility condition can be tested",
                "Searching for binary 0s and 1s",
                "A hardware debugging protocol"
            ],
            correct: 1,
            explanation: "Binary Search on Answer is a powerful competitive programming technique where, if a condition function f(x) is monotonic (true for all x >= K, false for x < K), the optimal x can be found in O(log(range) * cost(f))."
        }
    ],

    // -------------------------------------------------------------------------
    // 10. JUMP SEARCH
    // -------------------------------------------------------------------------
    "jump-search": [
        {
            q: "How does Jump Search locate a target in a sorted array?",
            options: [
                "By jumping ahead in fixed-size blocks (step m), and once a block exceeds the target, performing a linear search backwards within that block",
                "By jumping randomly across memory addresses",
                "By halving the array like binary search",
                "By computing hashes of memory blocks"
            ],
            correct: 0,
            explanation: "Jump Search checks indices 0, m, 2m, 3m... until finding an element greater than target, then does a linear scan backwards within that block to find the exact match."
        },
        {
            q: "What is the mathematically optimal block jump step size 'm' for an array of size N?",
            options: [
                "m = N / 2",
                "m = √N",
                "m = log₂(N)",
                "m = 10"
            ],
            correct: 1,
            explanation: "The total number of comparisons in the worst case is (N/m) + (m - 1). Taking the derivative with respect to m and setting to 0 yields m = √N."
        },
        {
            q: "What is the time complexity of Jump Search with optimal step size m = √N?",
            options: [
                "O(1)",
                "O(log N)",
                "O(√N)",
                "O(N)"
            ],
            correct: 2,
            explanation: "With step size m = √N, you make at most √N block jumps and at most √N linear steps inside the target block. Total time is O(√N + √N) = O(√N)."
        },
        {
            q: "How does Jump Search compare to Linear Search and Binary Search in asymptotic speed?",
            options: [
                "It is faster than both",
                "Linear Search O(N) < Jump Search O(√N) < Binary Search O(log N)",
                "It is strictly slower than Linear Search",
                "It has the same complexity as Binary Search"
            ],
            correct: 1,
            explanation: "In terms of growth rates: O(log N) [fastest] < O(√N) [intermediate] < O(N) [slowest]."
        },
        {
            q: "In what real-world system is Jump Search advantageous over Binary Search?",
            options: [
                "When jumping backwards is expensive, or on systems where backward stepping has high penalty (like single-direction streams or optical disc seek times)",
                "When searching in RAM memory",
                "When sorting 3D models",
                "When running on multi-core supercomputers"
            ],
            correct: 0,
            explanation: "Binary Search jumps back and forth across large strides. Jump Search only traverses forward in steps of √N and requires at most one backward linear pass, which is helpful when backward seeks are costly."
        },
        {
            q: "Does Jump Search require the array to be sorted?",
            options: [
                "Yes, like Binary Search, it strictly requires sorted data",
                "No, it works on any random array",
                "Only if N > 1,000",
                "It only works on reversed arrays"
            ],
            correct: 0,
            explanation: "Because Jump Search determines that a block contains the target based on `A[block_start] <= target <= A[block_end]`, the array must be sorted."
        },
        {
            q: "What is the auxiliary space complexity of Jump Search?",
            options: [
                "O(1) constant space",
                "O(√N)",
                "O(log N)",
                "O(N)"
            ],
            correct: 0,
            explanation: "Jump Search only tracks pointer indices (`step`, `prev`), requiring O(1) constant auxiliary space."
        },
        {
            q: "For an array of N = 10,000 elements, what is the optimal jump step size 'm'?",
            options: [
                "m = 10",
                "m = 100",
                "m = 1,000",
                "m = 5,000"
            ],
            correct: 1,
            explanation: "The optimal step is √N. For N = 10,000, m = √10,000 = 100."
        },
        {
            q: "What happens in Jump Search if the jump index exceeds the array length (m >= N)?",
            options: [
                "An array index out of bounds error occurs unless capped at min(m, N)",
                "The algorithm crashes",
                "The array automatically doubles in size",
                "The search wraps around to index 0"
            ],
            correct: 0,
            explanation: "Robust implementations always cap the jump index at `min(step, N)` so they never read beyond the array bounds."
        },
        {
            q: "What is the relationship between Jump Search and Block Search?",
            options: [
                "Jump Search is the formal algorithmic implementation of single-level block searching",
                "They are completely unrelated algorithms",
                "Block search only works on hard drives",
                "Jump search requires an operating system kernel"
            ],
            correct: 0,
            explanation: "Jump search is often referred to as block search because it partitions the continuous search domain into uniform blocks."
        }
    ],

    // -------------------------------------------------------------------------
    // 11. INTERPOLATION SEARCH
    // -------------------------------------------------------------------------
    "interpolation-search": [
        {
            q: "How does Interpolation Search determine where to probe the sorted array?",
            options: [
                "Always at the exact midpoint (low + high) / 2",
                "By estimating position using linear interpolation based on the numerical value of the target relative to endpoints",
                "By picking a random index between low and high",
                "By querying an external database index"
            ],
            correct: 1,
            explanation: "Like searching for 'Zebra' near the very end of a phone book, Interpolation Search calculates a probe index proportional to how close the target's value is to the endpoint values."
        },
        {
            q: "What is the probe position formula used in Interpolation Search?",
            options: [
                "pos = low + ⌊((target - A[low]) * (high - low)) / (A[high] - A[low])⌋",
                "pos = (low + high) / 2",
                "pos = low + √N",
                "pos = high - low"
            ],
            correct: 0,
            explanation: "The formula uses slope: fraction = (target - A[low]) / (A[high] - A[low]), multiplied by the index range (high - low) and added to low."
        },
        {
            q: "What is the average-case time complexity of Interpolation Search on uniformly distributed data?",
            options: [
                "O(1)",
                "O(log log N)",
                "O(log N)",
                "O(N)"
            ],
            correct: 1,
            explanation: "On uniformly distributed data, each probe reduces the remaining search range from N to √N, producing a double-logarithmic running time: O(log log N)."
        },
        {
            q: "What is the WORST-CASE time complexity of Interpolation Search, and when does it occur?",
            options: [
                "O(log N)",
                "O(N) when data is exponentially distributed (e.g. [1, 2, 4, 8, 16, 32, ..., 1000000])",
                "O(N log N)",
                "O(1)"
            ],
            correct: 1,
            explanation: "When data is skewed or exponential, the linear interpolation formula consistently underestimates or overshoots by just 1 index per step, degrading to O(N)."
        },
        {
            q: "For an array of 4 billion uniformly distributed numbers, approximately how many probes does Interpolation Search need on average?",
            options: [
                "~5 to 6 probes (since log₂(log₂(4×10⁹)) ≈ log₂(32) = 5)",
                "32 probes",
                "1,000 probes",
                "2 billion probes"
            ],
            correct: 0,
            explanation: "Because log₂(4×10⁹) ≈ 32 and log₂(32) = 5, Interpolation Search finds keys in uniform data in roughly 5 to 6 probes, outperforming Binary Search's 32 comparisons!"
        },
        {
            q: "What happens if all elements in the current search window are identical (A[high] == A[low])?",
            options: [
                "A division by zero occurs if not guarded with a check before computing (A[high] - A[low])",
                "The search proceeds normally",
                "The algorithm finishes in O(1)",
                "The array is automatically sorted"
            ],
            correct: 0,
            explanation: "If A[high] == A[low], the denominator `A[high] - A[low]` is 0. An implementation must check `if (A[high] == A[low])` to avoid a division-by-zero exception."
        },
        {
            q: "What is the auxiliary space complexity of iterative Interpolation Search?",
            options: [
                "O(1) constant auxiliary space",
                "O(log log N)",
                "O(N)",
                "O(log N)"
            ],
            correct: 0,
            explanation: "Interpolation search only maintains index variables (`low`, `high`, `pos`), using O(1) constant auxiliary memory."
        },
        {
            q: "Does Interpolation Search work effectively on strings or non-numeric types?",
            options: [
                "No, unless strings can be mapped to continuous numerical key values with meaningful arithmetic differences",
                "Yes, it works identically on all types",
                "Only on Unicode emojis",
                "Only on palindromes"
            ],
            correct: 0,
            explanation: "Because the formula requires numerical subtraction `(target - A[low])` and division, elements must be arithmetic numbers or have well-defined numeric distance metrics."
        },
        {
            q: "Why is Binary Search generally preferred over Interpolation Search in standard software libraries?",
            options: [
                "Binary Search guarantees O(log N) regardless of data distribution, whereas Interpolation Search can degrade to O(N) on non-uniform data and involves expensive multiplication/division",
                "Binary Search uses less code",
                "Binary Search can search unsorted data",
                "Interpolation Search is copyrighted"
            ],
            correct: 0,
            explanation: "Binary Search is foolproof: its O(log N) bound holds regardless of how skewed or clustered the numbers are, and midpoint calculation uses simple fast integer addition and bit-shifts."
        },
        {
            q: "If an array has values [10, 20, 30, 40, 50] with low=0, high=4, and target=30, what probe position does Interpolation Search compute?",
            options: [
                "pos = 0 + (30 - 10)*(4 - 0) / (50 - 10) = 20 * 4 / 40 = 2",
                "pos = 0",
                "pos = 4",
                "pos = 1"
            ],
            correct: 0,
            explanation: "Formula: pos = 0 + ((30 - 10) * (4 - 0)) / (50 - 10) = (20 * 4) / 40 = 80 / 40 = 2. It finds index 2 (value 30) in exactly 1 probe!"
        }
    ],

    // -------------------------------------------------------------------------
    // 12. BREADTH-FIRST SEARCH (BFS)
    // -------------------------------------------------------------------------
    "bfs": [
        {
            q: "Which fundamental data structure does Breadth-First Search (BFS) use to explore vertices?",
            options: [
                "First-In, First-Out (FIFO) Queue",
                "Last-In, First-Out (LIFO) Stack",
                "Priority Queue / Min-Heap",
                "Disjoint Set Union (DSU)"
            ],
            correct: 0,
            explanation: "BFS explores level by level. A FIFO Queue ensures vertices discovered earlier are dequeued and explored before vertices discovered later."
        },
        {
            q: "What is the time complexity of BFS on a graph represented with an adjacency list, where V is vertices and E is edges?",
            options: [
                "O(V + E)",
                "O(V * E)",
                "O(V²)",
                "O(E log V)"
            ],
            correct: 0,
            explanation: "Every vertex is enqueued and dequeued at most once (O(V)), and every incident edge is inspected once in a directed graph or twice in an undirected graph (O(E)). Total time: O(V + E)."
        },
        {
            q: "What key optimality guarantee does BFS provide on UNWEIGHTED graphs?",
            options: [
                "It finds the shortest path (minimum number of edges) from the source to any reachable vertex",
                "It finds the minimum spanning tree",
                "It detects negative weight cycles",
                "It finds maximum flow"
            ],
            correct: 0,
            explanation: "Because BFS visits nodes in increasing order of their distance from the start node (distance 0, then distance 1, then 2...), the first time it reaches a node is guaranteed to be via the fewest edges."
        },
        {
            q: "What is the auxiliary space complexity of BFS?",
            options: [
                "O(V) to store the visited array and the FIFO queue",
                "O(E²)",
                "O(1)",
                "O(log V)"
            ],
            correct: 0,
            explanation: "In the worst case (e.g. a star graph where the root connects to all other vertices), the queue holds up to V-1 vertices, requiring O(V) memory."
        },
        {
            q: "Why is a 'visited' set or array essential when performing BFS on a general graph?",
            options: [
                "To prevent infinite loops caused by cycles and avoid processing the same vertex multiple times",
                "To speed up queue enqueues",
                "To format the output as JSON",
                "To calculate graph weights"
            ],
            correct: 0,
            explanation: "Without marking nodes as visited, any cycle in the graph (or any undirected edge) would cause nodes to be re-added to the queue indefinitely, causing an infinite loop."
        },
        {
            q: "How does BFS determine the connected components of an undirected graph?",
            options: [
                "By starting a new BFS traversal from each unvisited vertex; all vertices reached in that traversal belong to the same component",
                "By sorting all edge weights",
                "By calculating the determinant of the adjacency matrix",
                "By finding the minimum vertex degree"
            ],
            correct: 0,
            explanation: "Looping through all vertices from 1 to V and triggering a BFS for each unvisited vertex will visit all vertices in that component. The number of BFS launches equals the number of connected components."
        },
        {
            q: "Can BFS be used to test whether a graph is BIPARTITE (2-colorable)?",
            options: [
                "Yes, by alternating colors between levels (0 and 1) and checking if any adjacent neighbor shares the same color",
                "No, BFS cannot detect bipartiteness",
                "Only on directed acyclic graphs",
                "Only if the graph has an even number of edges"
            ],
            correct: 0,
            explanation: "Assigning alternate colors (e.g. Red and Blue) to consecutive BFS levels correctly 2-colors the graph. If an edge connects two vertices of the same color, the graph is not bipartite."
        },
        {
            q: "What type of tree is formed by the edges used to discover new vertices during a BFS traversal?",
            options: [
                "BFS Shortest-Path Spanning Tree",
                "Binary Search Tree",
                "Red-Black Tree",
                "Huffman Coding Tree"
            ],
            correct: 0,
            explanation: "Recording the edge `(parent, v)` whenever an unvisited vertex `v` is discovered from `parent` builds the BFS Spanning Tree, representing the shortest unweighted paths from the root."
        },
        {
            q: "What is '0-1 BFS'?",
            options: [
                "A BFS variant using a double-ended queue (deque) that finds shortest paths in O(V + E) on graphs where edge weights are strictly 0 or 1",
                "A BFS that only searches binary numbers",
                "A BFS running on a single bit CPU",
                "A BFS that terminates after 1 step"
            ],
            correct: 0,
            explanation: "0-1 BFS pushes 0-weight edges to the FRONT of a deque and 1-weight edges to the BACK. This preserves non-decreasing distance order in O(V + E), faster than Dijkstra's O(E log V)."
        },
        {
            q: "Which real-world application relies heavily on BFS?",
            options: [
                "Social network 'Degrees of Separation' / Friend Recommendation (finding shortest connection hops between users)",
                "Compiling C++ source code",
                "Rendering 3D textures in video games",
                "Training deep neural network weights"
            ],
            correct: 0,
            explanation: "Finding whether two users are connected within 1, 2, or 3 degrees of separation (friends of friends) is a direct application of level-by-level BFS traversal."
        }
    ],

    // -------------------------------------------------------------------------
    // 13. DEPTH-FIRST SEARCH (DFS)
    // -------------------------------------------------------------------------
    "dfs": [
        {
            q: "Which data structure naturally governs Depth-First Search (DFS) traversal?",
            options: [
                "A Call Stack (via recursion) or explicit LIFO Stack",
                "A FIFO Queue",
                "A Priority Queue",
                "A B-Tree"
            ],
            correct: 0,
            explanation: "DFS explores as deep as possible along each branch before backtracking. This recursive exploration is governed by the LIFO (Last-In, First-Out) Call Stack."
        },
        {
            q: "What is the time complexity of DFS on a graph with V vertices and E edges represented by an adjacency list?",
            options: [
                "O(V + E)",
                "O(V * E)",
                "O(V²)",
                "O(E log V)"
            ],
            correct: 0,
            explanation: "Every vertex is visited once (O(V)), and each edge in the adjacency list is traversed once (or twice for undirected graphs), resulting in O(V + E) time."
        },
        {
            q: "What is the worst-case auxiliary space complexity of recursive DFS?",
            options: [
                "O(V) for the call stack and visited array (e.g. in a long degenerate linear path graph)",
                "O(1)",
                "O(V * E)",
                "O(E²)"
            ],
            correct: 0,
            explanation: "If the graph is a linear chain of vertices (1 -> 2 -> 3 -> ... -> V), the recursion stack reaches depth V, requiring O(V) stack memory."
        },
        {
            q: "What graph property can DFS detect using 'Back Edges' during traversal?",
            options: [
                "Cycles in the graph",
                "The maximum flow rate",
                "The minimum cut capacity",
                "The diameter of the graph"
            ],
            correct: 0,
            explanation: "In directed graph DFS, encountering an edge leading to an ancestor vertex currently active in the recursion stack (a Back Edge) proves the existence of a directed cycle."
        },
        {
            q: "How can DFS be used to compute a Topological Sort of a Directed Acyclic Graph (DAG)?",
            options: [
                "By adding vertices to the front of a list in order of their post-visit finishing times (when backtracking)",
                "By recording vertices as soon as they are first discovered",
                "By sorting vertices by their in-degree values",
                "By reversing all edge weights"
            ],
            correct: 0,
            explanation: "In a DAG, when a DFS call for vertex u finishes (all descendants are explored), u can be prepended to the topological order. Reversing the finish times yields a valid topological sort."
        },
        {
            q: "What is an 'Articulation Point' (Cut Vertex) identified via DFS (Tarjan / Hopcroft algorithm)?",
            options: [
                "A vertex whose removal increases the number of connected components in the graph",
                "A vertex with the highest degree",
                "The root of the DFS tree",
                "A vertex with zero edges"
            ],
            correct: 0,
            explanation: "An articulation point is a critical single point of failure in a network; removing it disconnects the graph. Tarjan's DFS algorithm detects them in O(V + E) using discovery and low-link values."
        },
        {
            q: "Does DFS guarantee finding the SHORTEST path between two vertices in an unweighted graph?",
            options: [
                "No, DFS can wander deep down a long convoluted path first, missing a direct 1-hop path",
                "Yes, it always finds the shortest path",
                "Only if the graph is a tree",
                "Yes, if implemented without recursion"
            ],
            correct: 0,
            explanation: "Unlike BFS, DFS does not explore by shortest edge hops. It dives deeply down whatever neighbor it picks first, so its path to a target may be much longer than the optimal shortest path."
        },
        {
            q: "What are the four edge classifications in a directed DFS forest?",
            options: [
                "Tree edges, Back edges, Forward edges, and Cross edges",
                "Straight edges, Curved edges, Loop edges, Diagonal edges",
                "Input edges, Output edges, Internal edges, External edges",
                "Parent edges, Child edges, Sibling edges, Cousin edges"
            ],
            correct: 0,
            explanation: "In directed DFS: Tree edges discover new nodes; Back edges lead to ancestors (cycles); Forward edges lead to non-child descendants; Cross edges lead to already-finished sibling subtrees."
        },
        {
            q: "What is 'Iterative Deepening DFS' (IDDFS)?",
            options: [
                "A search strategy that repeatedly runs depth-limited DFS with increasing depth limits (1, 2, 3...), combining the O(d) space of DFS with the completeness and shortest-path guarantees of BFS",
                "A recursive algorithm that never stops",
                "A database indexing technique",
                "A machine learning optimizer"
            ],
            correct: 0,
            explanation: "IDDFS combines the best of both worlds: it uses minimal O(d) memory like DFS, yet explores level-by-level to guarantee finding the shortest path like BFS."
        },
        {
            q: "Which classic problem is naturally solved using DFS backtracking?",
            options: [
                "The N-Queens puzzle, Sudoku solvers, and maze pathfinding",
                "Sorting an array of numbers",
                "Finding the median of a stream",
                "Allocating contiguous disk blocks"
            ],
            correct: 0,
            explanation: "Backtracking puzzles (like Sudoku or N-Queens) are state-space trees where DFS explores candidate choices, backtracks as soon as a constraint is violated, and tries the next branch."
        }
    ],

    // -------------------------------------------------------------------------
    // 14. DIJKSTRA'S ALGORITHM
    // -------------------------------------------------------------------------
    "dijkstra": [
        {
            q: "What problem does Dijkstra's Algorithm solve?",
            options: [
                "Single-Source Shortest Path (SSSP) on weighted graphs with non-negative edge weights",
                "All-Pairs Shortest Path on graphs with negative cycles",
                "Minimum Spanning Tree on unweighted graphs",
                "Maximum bipartite matching"
            ],
            correct: 0,
            explanation: "Dijkstra finds the minimum total weight path from a single start node to all other reachable nodes in a graph, provided all edge weights are non-negative (>= 0)."
        },
        {
            q: "Why does Dijkstra's algorithm FAIL or produce incorrect results on graphs with NEGATIVE edge weights?",
            options: [
                "Once a node is extracted from the priority queue, Dijkstra marks it permanently settled; a later negative edge could offer a cheaper path to that settled node, violating the greedy invariant",
                "It causes a division by zero",
                "Priority queues cannot store negative numbers",
                "Negative numbers create compiler errors"
            ],
            correct: 0,
            explanation: "Dijkstra is greedy: it assumes that once a node with the smallest tentative distance is popped, its distance is final. A subsequent negative edge could reduce that distance, which Dijkstra will never revisit."
        },
        {
            q: "What is the optimal time complexity of Dijkstra's algorithm using a Min-Heap (Binary Priority Queue)?",
            options: [
                "O((V + E) log V)",
                "O(V²)",
                "O(V * E)",
                "O(V³)"
            ],
            correct: 0,
            explanation: "Each vertex is extracted from the min-heap at most once (V * log V), and each edge relaxation can update a priority in the heap (E * log V), totaling O((V + E) log V)."
        },
        {
            q: "What is the condition for 'relaxing' an edge (u, v) with weight w in Dijkstra's algorithm?",
            options: [
                "if dist[u] + w < dist[v] then dist[v] = dist[u] + w",
                "if dist[u] + dist[v] < w then dist[v] = w",
                "if dist[v] - w > dist[u] then dist[u] = dist[v]",
                "if w == 0 then dist[v] = dist[u]"
            ],
            correct: 0,
            explanation: "Edge relaxation checks if traveling from the source to u and then across edge (u, v) is strictly shorter than the current best known distance to v (`dist[u] + w < dist[v]`)."
        },
        {
            q: "What initial distance values are assigned before Dijkstra's algorithm begins?",
            options: [
                "dist[source] = 0, and dist[v] = ∞ (infinity) for all other vertices v",
                "dist[v] = 0 for all vertices",
                "dist[v] = -1 for all vertices",
                "dist[v] = 1 for all vertices"
            ],
            correct: 0,
            explanation: "The source has distance 0 from itself. All other vertices start at positive infinity (representing 'unreachable' until discovered)."
        },
        {
            q: "Which algorithm should be used instead of Dijkstra if a graph contains negative edge weights?",
            options: [
                "Bellman-Ford Algorithm (or SPFA)",
                "Breadth-First Search",
                "Kruskal's Algorithm",
                "Selection Sort"
            ],
            correct: 0,
            explanation: "The Bellman-Ford algorithm handles arbitrary negative edge weights in O(V * E) time and can detect whether the graph contains reachable negative cycles."
        },
        {
            q: "What theoretical priority queue yields the fastest theoretical time complexity for Dijkstra of O(E + V log V)?",
            options: [
                "Fibonacci Heap",
                "Binary Heap",
                "Linked List",
                "Hash Map"
            ],
            correct: 0,
            explanation: "A Fibonacci Heap supports the `decrease-key` operation in amortized O(1) time and `extract-min` in O(log V), achieving theoretical O(E + V log V) complexity."
        },
        {
            q: "How can the actual shortest path (sequence of vertices) be reconstructed after Dijkstra terminates?",
            options: [
                "By maintaining a `parent[v]` pointer updated whenever an edge to v is relaxed, then backtracking from target to source",
                "By sorting the distance array",
                "By running BFS on the visited nodes",
                "By summing all edge weights"
            ],
            correct: 0,
            explanation: "Whenever `dist[v]` is improved via neighbor `u`, set `parent[v] = u`. Backtracking from target through parent pointers reconstructs the exact optimal path."
        },
        {
            q: "If all edge weights in a graph are identical positive constants (e.g. all weights equal 1), what does Dijkstra simplify to?",
            options: [
                "Standard Breadth-First Search (BFS) in O(V + E) time",
                "Depth-First Search",
                "A* Search",
                "Floyd-Warshall"
            ],
            correct: 0,
            explanation: "When all weights are equal, the priority queue is unnecessary because distances increase monotonically in discrete steps of 1, perfectly matching a simple FIFO queue (BFS)."
        },
        {
            q: "What is a major real-world application of Dijkstra's algorithm?",
            options: [
                "Network routing protocols (like OSPF and IS-IS) and GPS navigation systems",
                "Facial recognition algorithms",
                "HTML browser DOM parsing",
                "Hard drive defragmentation"
            ],
            correct: 0,
            explanation: "Internet routers use Link-State routing protocols (OSPF) running Dijkstra to compute the fastest packet delivery paths across global telecom networks."
        }
    ],

    // -------------------------------------------------------------------------
    // 15. A* SEARCH (A-STAR)
    // -------------------------------------------------------------------------
    "a-star": [
        {
            q: "What is the evaluation function f(n) used by A* Search to prioritize which node to explore next?",
            options: [
                "f(n) = g(n) + h(n), where g(n) is the exact cost from start to n, and h(n) is the heuristic estimated cost from n to goal",
                "f(n) = g(n) * h(n)",
                "f(n) = g(n) - h(n)",
                "f(n) = max(g(n), h(n))"
            ],
            correct: 0,
            explanation: "A* scores nodes by f(n) = g(n) + h(n): known past path cost plus estimated future remaining cost to reach the goal."
        },
        {
            q: "What does it mean for a heuristic h(n) to be 'ADMISSIBLE'?",
            options: [
                "It NEVER overestimates the true remaining cost to reach the goal (h(n) <= h*(n) for all n)",
                "It always returns an integer",
                "It is approved by a system administrator",
                "It never returns zero"
            ],
            correct: 0,
            explanation: "An admissible heuristic is optimistic: it never estimates a cost higher than the actual lowest possible cost to reach the goal, guaranteeing A* finds the optimal shortest path."
        },
        {
            q: "What happens if the heuristic h(n) is set to 0 for all nodes (h(n) = 0)?",
            options: [
                "A* becomes mathematically equivalent to standard Dijkstra's algorithm",
                "A* runs in O(1) time",
                "A* degrades to Depth-First Search",
                "A* enters an infinite loop"
            ],
            correct: 0,
            explanation: "When h(n) = 0, f(n) = g(n) + 0 = g(n). The priority is determined solely by the cost from the start node, which is exactly Dijkstra's algorithm."
        },
        {
            q: "What does it mean for a heuristic to be 'CONSISTENT' (or Monotonic)?",
            options: [
                "For every node n and neighbor n' connected by edge cost c(n, n'), h(n) <= c(n, n') + h(n')",
                "The heuristic never changes across different runs",
                "The heuristic is always greater than 100",
                "The heuristic is symmetric"
            ],
            correct: 0,
            explanation: "Consistency is the triangle inequality for heuristics: the estimated cost from n cannot exceed the actual step cost to n' plus the estimated cost from n'. Consistency guarantees that when a node is expanded, its path is already optimal."
        },
        {
            q: "Which common distance heuristic is used for A* on a 4-directional grid (up, down, left, right)?",
            options: [
                "Manhattan Distance: |x1 - x2| + |y1 - y2|",
                "Euclidean Distance: √((x1-x2)² + (y1-y2)²)",
                "Chebyshev Distance: max(|x1-x2|, |y1-y2|)",
                "Cosine Similarity"
            ],
            correct: 0,
            explanation: "When movement is restricted to 4 cardinal directions without diagonals, Manhattan Distance (L1 norm) exactly mirrors the minimum grid steps required, making it admissible and consistent."
        },
        {
            q: "Which distance heuristic is appropriate for continuous 2D Euclidean planes or arbitrary angle movement?",
            options: [
                "Euclidean Distance (straight-line 'as the crow flies')",
                "Manhattan Distance",
                "Hamming Distance",
                "Levenshtein Distance"
            ],
            correct: 0,
            explanation: "Straight-line Euclidean distance is the shortest possible physical distance between two points in 2D space, ensuring it never overestimates."
        },
        {
            q: "What is the primary advantage of A* Search over Dijkstra's Algorithm in map navigation?",
            options: [
                "A* directs its search frontier toward the target goal rather than expanding uniformly in all directions like a circular wave, exploring far fewer vertices",
                "A* uses zero memory",
                "A* can handle negative cycles",
                "A* works on disconnected graphs"
            ],
            correct: 0,
            explanation: "Because the heuristic pulls the search in the direction of the destination, A* avoids exploring nodes behind or away from the goal, drastically reducing computation time."
        },
        {
            q: "What are the 'Open Set' and 'Closed Set' in A* Search?",
            options: [
                "Open Set holds discovered nodes pending evaluation; Closed Set holds nodes already expanded and finalized",
                "Open Set is public; Closed Set is private",
                "Open Set holds negative weights; Closed Set holds positive weights",
                "Open Set is in RAM; Closed Set is on disk"
            ],
            correct: 0,
            explanation: "The Open Set (min-heap) contains candidate frontier vertices waiting to be evaluated. The Closed Set (hash set) tracks vertices whose shortest paths have already been expanded."
        },
        {
            q: "What happens if an INADMISSIBLE heuristic is used in A* (one that overestimates the true cost)?",
            options: [
                "A* is no longer guaranteed to find the true shortest path (it may settle for a suboptimal path)",
                "A* will always crash",
                "The graph gets corrupted",
                "The runtime becomes exponential in all cases"
            ],
            correct: 0,
            explanation: "An overestimate can cause A* to overlook the truly optimal path because its score was artificially inflated, leading A* to accept a suboptimal path."
        },
        {
            q: "In video games (e.g. RTS or RPG unit pathfinding), why is A* the industry-standard algorithm?",
            options: [
                "It efficiently navigates complex obstacle mazes and dynamic terrain grids with rapid real-time performance and optimal paths",
                "It renders 3D graphics polygons",
                "It manages multiplayer network sockets",
                "It compresses audio files"
            ],
            correct: 0,
            explanation: "Game engines (like Unity and Unreal) rely on A* on navigation meshes (NavMesh) and tilemaps to allow units to intelligently navigate around walls and obstacles without lag."
        }
    ]
};
