export const ALGORITHMS_DATA = {
  "bubble-sort": {
    "id": "bubble-sort",
    "name": "Bubble Sort",
    "category": "sorting",
    "difficulty": "Easy",
    "timeComplexity": {
      "best": "O(N)",
      "average": "O(N\u00b2)",
      "worst": "O(N\u00b2)"
    },
    "spaceComplexity": "O(1)",
    "stable": true,
    "inPlace": true,
    "description": "A foundational comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order until no swaps are required.",
    "theory": "Bubble Sort works by repeatedly bubbling the largest unsorted element to its correct position at the end of the array. In each pass through the array, adjacent pairs are inspected. If an element is greater than its immediate neighbor, a swap occurs. With an early termination flag checking if any swap occurred during a pass, it achieves an optimal O(N) best-case running time on already-sorted arrays.",
    "practicalUse": "Primarily educational. Rarely used in production due to O(N\u00b2) worst-case time, but useful in hardware with severe memory constraints or nearly-sorted short sequences where an early-break pass finishes in O(N).",
    "pseudocode": [
      "procedure bubbleSort(A : list of sortable items)",
      "  n := length(A)",
      "  repeat",
      "    swapped := false",
      "    for i := 0 to n - 2 do",
      "      if A[i] > A[i + 1] then",
      "        swap(A[i], A[i + 1])",
      "        swapped := true",
      "      end if",
      "    end for",
      "    n := n - 1",
      "  until not swapped",
      "end procedure"
    ],
    "code": {
      "javascript": "function bubbleSort(arr) {\n    const n = arr.length;\n    let swapped;\n    for (let i = 0; i < n - 1; i++) {\n        swapped = false;\n        for (let j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n                swapped = true;\n            }\n        }\n        if (!swapped) break;\n    }\n    return arr;\n}",
      "python": "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        swapped = False\n        for j in range(n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n        if not swapped:\n            break\n    return arr",
      "cpp": "void bubbleSort(vector<int>& arr) {\n    int n = arr.size();\n    bool swapped;\n    for (int i = 0; i < n - 1; ++i) {\n        swapped = false;\n        for (int j = 0; j < n - i - 1; ++j) {\n            if (arr[j] > arr[j + 1]) {\n                swap(arr[j], arr[j + 1]);\n                swapped = true;\n            }\n        }\n        if (!swapped) break;\n    }\n}"
    }
  },
  "selection-sort": {
    "id": "selection-sort",
    "name": "Selection Sort",
    "category": "sorting",
    "difficulty": "Easy",
    "timeComplexity": {
      "best": "O(N\u00b2)",
      "average": "O(N\u00b2)",
      "worst": "O(N\u00b2)"
    },
    "spaceComplexity": "O(1)",
    "stable": false,
    "inPlace": true,
    "description": "Divides the input array into a sorted and an unsorted region. It repeatedly finds the minimum element from the unsorted region and appends it to the sorted region.",
    "theory": "Selection sort maintains an invariant: at iteration i, the first i elements are sorted and contain the i smallest elements of the entire array. The algorithm scans the remaining unsorted subarray of size (N - i) to locate the minimum, then performs at most one swap per pass. Total swaps are bounded strictly by O(N), which can be advantageous when write operations are significantly more costly than reads (e.g., flash memory).",
    "practicalUse": "Useful on embedded systems or EEPROM flash memory where memory write cycles are limited or expensive, because it performs at most N swaps.",
    "pseudocode": [
      "procedure selectionSort(A : list of sortable items)",
      "  n := length(A)",
      "  for i := 0 to n - 2 do",
      "    minIdx := i",
      "    for j := i + 1 to n - 1 do",
      "      if A[j] < A[minIdx] then",
      "        minIdx := j",
      "      end if",
      "    end for",
      "    if minIdx != i then",
      "      swap(A[i], A[minIdx])",
      "    end if",
      "  end for",
      "end procedure"
    ],
    "code": {
      "javascript": "function selectionSort(arr) {\n    const n = arr.length;\n    for (let i = 0; i < n - 1; i++) {\n        let minIdx = i;\n        for (let j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIdx]) minIdx = j;\n        }\n        if (minIdx !== i) {\n            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];\n        }\n    }\n    return arr;\n}",
      "python": "def selection_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        if min_idx != i:\n            arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr",
      "cpp": "void selectionSort(vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n - 1; ++i) {\n        int minIdx = i;\n        for (int j = i + 1; j < n; ++j) {\n            if (arr[j] < arr[minIdx]) minIdx = j;\n        }\n        if (minIdx != i) swap(arr[i], arr[minIdx]);\n    }\n}"
    }
  },
  "insertion-sort": {
    "id": "insertion-sort",
    "name": "Insertion Sort",
    "category": "sorting",
    "difficulty": "Easy",
    "timeComplexity": {
      "best": "O(N)",
      "average": "O(N\u00b2)",
      "worst": "O(N\u00b2)"
    },
    "spaceComplexity": "O(1)",
    "stable": true,
    "inPlace": true,
    "description": "Builds the final sorted array one element at a time by repeatedly taking the next element and inserting it into its correct position within the already-sorted prefix.",
    "theory": "Insertion Sort processes elements from index 1 to N-1. For each item (key), it compares backward against the sorted subarray, shifting elements that are greater than key to the right, and then places the key in the vacant position. Because shifting terminates immediately once a smaller element is reached, it runs in O(N + d) where d is the number of inversions. It is highly adaptive and serves as the small-array base case in production hybrid algorithms like Timsort and Introsort.",
    "practicalUse": "Standard base-case sorter for small arrays (typically N \u2264 16 to 32) in standard libraries like C++ std::sort (Introsort) and Java/Python Timsort.",
    "pseudocode": [
      "procedure insertionSort(A : list of sortable items)",
      "  for i := 1 to length(A) - 1 do",
      "    key := A[i]",
      "    j := i - 1",
      "    while j >= 0 and A[j] > key do",
      "      A[j + 1] := A[j]",
      "      j := j - 1",
      "    end while",
      "    A[j + 1] := key",
      "  end for",
      "end procedure"
    ],
    "code": {
      "javascript": "function insertionSort(arr) {\n    for (let i = 1; i < arr.length; i++) {\n        let key = arr[i];\n        let j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n    return arr;\n}",
      "python": "def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr",
      "cpp": "void insertionSort(vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 1; i < n; ++i) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            --j;\n        }\n        arr[j + 1] = key;\n    }\n}"
    }
  },
  "merge-sort": {
    "id": "merge-sort",
    "name": "Merge Sort",
    "category": "sorting",
    "difficulty": "Medium",
    "timeComplexity": {
      "best": "O(N log N)",
      "average": "O(N log N)",
      "worst": "O(N log N)"
    },
    "spaceComplexity": "O(N)",
    "stable": true,
    "inPlace": false,
    "description": "A divide-and-conquer algorithm that recursively splits the array into two halves, sorts them independently, and merges the sorted halves into a unified sequence.",
    "theory": "Merge Sort models the recurrence T(N) = 2T(N/2) + O(N), which by the Master Theorem yields a deterministic O(N log N) running time regardless of input distribution. During the merge step, two pointers advance through left and right subarrays, copying the lesser element into an auxiliary buffer. Its stability and sequential access pattern make it ideal for linked lists and external sorting on secondary storage (hard drives or streaming pipelines).",
    "practicalUse": "Dominates external sorting (sorting terabytes of data stored on disk), databases (PostgreSQL/MySQL merge join sorting), and linked list sorting where random access is unavailable.",
    "pseudocode": [
      "procedure mergeSort(A, left, right)",
      "  if left < right then",
      "    mid := floor((left + right) / 2)",
      "    mergeSort(A, left, mid)",
      "    mergeSort(A, mid + 1, right)",
      "    merge(A, left, mid, right)",
      "  end if",
      "end procedure",
      "",
      "procedure merge(A, left, mid, right)",
      "  copy left & right sub-arrays into temporary buffers",
      "  while elements remain in both buffers:",
      "    choose the smaller element and write into A[k]",
      "  copy remaining elements from non-empty buffer",
      "end procedure"
    ],
    "code": {
      "javascript": "function mergeSort(arr, l = 0, r = arr.length - 1) {\n    if (l >= r) return;\n    const m = Math.floor((l + r) / 2);\n    mergeSort(arr, l, m);\n    mergeSort(arr, m + 1, r);\n    merge(arr, l, m, r);\n    return arr;\n}\n\nfunction merge(arr, l, m, r) {\n    const left = arr.slice(l, m + 1);\n    const right = arr.slice(m + 1, r + 1);\n    let i = 0, j = 0, k = l;\n    while (i < left.length && j < right.length) {\n        if (left[i] <= right[j]) arr[k++] = left[i++];\n        else arr[k++] = right[j++];\n    }\n    while (i < left.length) arr[k++] = left[i++];\n    while (j < right.length) arr[k++] = right[j++];\n}",
      "python": "def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result",
      "cpp": "void merge(vector<int>& arr, int l, int m, int r) {\n    vector<int> left(arr.begin() + l, arr.begin() + m + 1);\n    vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);\n    int i = 0, j = 0, k = l;\n    while (i < left.size() && j < right.size()) {\n        if (left[i] <= right[j]) arr[k++] = left[i++];\n        else arr[k++] = right[j++];\n    }\n    while (i < left.size()) arr[k++] = left[i++];\n    while (j < right.size()) arr[k++] = right[j++];\n}\n\nvoid mergeSort(vector<int>& arr, int l, int r) {\n    if (l >= r) return;\n    int m = l + (r - l) / 2;\n    mergeSort(arr, l, m);\n    mergeSort(arr, m + 1, r);\n    merge(arr, l, m, r);\n}"
    }
  },
  "quick-sort": {
    "id": "quick-sort",
    "name": "Quick Sort",
    "category": "sorting",
    "difficulty": "Medium",
    "timeComplexity": {
      "best": "O(N log N)",
      "average": "O(N log N)",
      "worst": "O(N\u00b2)"
    },
    "spaceComplexity": "O(log N)",
    "stable": false,
    "inPlace": true,
    "description": "An efficient divide-and-conquer algorithm that selects a 'pivot' element, partitions the array such that smaller elements precede the pivot and greater elements follow it, and recursively sorts the sub-partitions.",
    "theory": "Quick Sort relies on partitioning (Lomuto or Hoare). When a balanced pivot is chosen, each recursion level partitions an array of size N in O(N) time with tree depth log\u2082N, achieving O(N log N). In the worst case (e.g. naive pivot selection on already sorted input with Lomuto partition), depth degrades to N, causing O(N\u00b2). Modern implementations use randomized or median-of-three pivot selection, or dual-pivot techniques (as in Java 7+ Arrays.sort) to guard against worst-case patterns.",
    "practicalUse": "General-purpose default sorting algorithm in standard runtime systems (C qsort, JavaScript V8 engine historically, Go sort.Slice) due to unmatched CPU cache locality and in-place minimal overhead.",
    "pseudocode": [
      "procedure quickSort(A, low, high)",
      "  if low < high then",
      "    p := partition(A, low, high)",
      "    quickSort(A, low, p - 1)",
      "    quickSort(A, p + 1, high)",
      "  end if",
      "end procedure",
      "",
      "procedure partition(A, low, high)",
      "  pivot := A[high]",
      "  i := low - 1",
      "  for j := low to high - 1 do",
      "    if A[j] <= pivot then",
      "      i := i + 1",
      "      swap(A[i], A[j])",
      "    end if",
      "  end for",
      "  swap(A[i + 1], A[high])",
      "  return i + 1",
      "end procedure"
    ],
    "code": {
      "javascript": "function quickSort(arr, low = 0, high = arr.length - 1) {\n    if (low < high) {\n        const p = partition(arr, low, high);\n        quickSort(arr, low, p - 1);\n        quickSort(arr, p + 1, high);\n    }\n    return arr;\n}\n\nfunction partition(arr, low, high) {\n    const pivot = arr[high];\n    let i = low - 1;\n    for (let j = low; j < high; j++) {\n        if (arr[j] <= pivot) {\n            i++;\n            [arr[i], arr[j]] = [arr[j], arr[i]];\n        }\n    }\n    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];\n    return i + 1;\n}",
      "python": "def quick_sort(arr, low=0, high=None):\n    if high is None:\n        high = len(arr) - 1\n    if low < high:\n        p = partition(arr, low, high)\n        quick_sort(arr, low, p - 1)\n        quick_sort(arr, p + 1, high)\n    return arr\n\ndef partition(arr, low, high):\n    pivot = arr[high]\n    i = low - 1\n    for j in range(low, high):\n        if arr[j] <= pivot:\n            i += 1\n            arr[i], arr[j] = arr[j], arr[i]\n    arr[i + 1], arr[high] = arr[high], arr[i + 1]\n    return i + 1",
      "cpp": "int partition(vector<int>& arr, int low, int high) {\n    int pivot = arr[high];\n    int i = low - 1;\n    for (int j = low; j < high; ++j) {\n        if (arr[j] <= pivot) {\n            ++i;\n            swap(arr[i], arr[j]);\n        }\n    }\n    swap(arr[i + 1], arr[high]);\n    return i + 1;\n}\n\nvoid quickSort(vector<int>& arr, int low, int high) {\n    if (low < high) {\n        int p = partition(arr, low, high);\n        quickSort(arr, low, p - 1);\n        quickSort(arr, p + 1, high);\n    }\n}"
    }
  },
  "heap-sort": {
    "id": "heap-sort",
    "name": "Heap Sort",
    "category": "sorting",
    "difficulty": "Medium",
    "timeComplexity": {
      "best": "O(N log N)",
      "average": "O(N log N)",
      "worst": "O(N log N)"
    },
    "spaceComplexity": "O(1)",
    "stable": false,
    "inPlace": true,
    "description": "Transforms the input array into a binary max-heap, then repeatedly extracts the root (maximum element) and swaps it to the end while restoring the heap property.",
    "theory": "Heap Sort operates in two distinct phases: (1) Heap Construction: converts the unsorted array into a Max-Heap in O(N) time using bottom-up sift-downs. (2) Extraction Phase: for i from N-1 down to 1, swaps root A[0] with A[i] and calls heapify(0, i) to sift down the new root in O(log N). Because it is strictly O(N log N) in all cases and requires O(1) extra space, it is used by Introsort whenever Quick Sort recursion depth exceeds 2 * log\u2082N.",
    "practicalUse": "Embedded real-time mission-critical systems requiring strict worst-case guarantees without auxiliary memory, and the fallback phase in standard Introsort.",
    "pseudocode": [
      "procedure heapSort(A)",
      "  n := length(A)",
      "  for i := floor(n / 2) - 1 down to 0 do",
      "    maxHeapify(A, n, i)",
      "  end for",
      "  for i := n - 1 down to 1 do",
      "    swap(A[0], A[i])",
      "    maxHeapify(A, i, 0)",
      "  end for",
      "end procedure",
      "",
      "procedure maxHeapify(A, n, i)",
      "  largest := i",
      "  left := 2*i + 1; right := 2*i + 2",
      "  if left < n and A[left] > A[largest] then largest := left",
      "  if right < n and A[right] > A[largest] then largest := right",
      "  if largest != i then",
      "    swap(A[i], A[largest])",
      "    maxHeapify(A, n, largest)",
      "  end if",
      "end procedure"
    ],
    "code": {
      "javascript": "function heapSort(arr) {\n    const n = arr.length;\n    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {\n        heapify(arr, n, i);\n    }\n    for (let i = n - 1; i > 0; i--) {\n        [arr[0], arr[i]] = [arr[i], arr[0]];\n        heapify(arr, i, 0);\n    }\n    return arr;\n}\n\nfunction heapify(arr, n, i) {\n    let largest = i;\n    const l = 2 * i + 1;\n    const r = 2 * i + 2;\n    if (l < n && arr[l] > arr[largest]) largest = l;\n    if (r < n && arr[r] > arr[largest]) largest = r;\n    if (largest !== i) {\n        [arr[i], arr[largest]] = [arr[largest], arr[i]];\n        heapify(arr, n, largest);\n    }\n}",
      "python": "def heap_sort(arr):\n    n = len(arr)\n    for i in range(n // 2 - 1, -1, -1):\n        heapify(arr, n, i)\n    for i in range(n - 1, 0, -1):\n        arr[0], arr[i] = arr[i], arr[0]\n        heapify(arr, i, 0)\n    return arr\n\ndef heapify(arr, n, i):\n    largest = i\n    l = 2 * i + 1\n    r = 2 * i + 2\n    if l < n and arr[l] > arr[largest]:\n        largest = l\n    if r < n and arr[r] > arr[largest]:\n        largest = r\n    if largest != i:\n        arr[i], arr[largest] = arr[largest], arr[i]\n        heapify(arr, n, largest)",
      "cpp": "void heapify(vector<int>& arr, int n, int i) {\n    int largest = i;\n    int l = 2 * i + 1, r = 2 * i + 2;\n    if (l < n && arr[l] > arr[largest]) largest = l;\n    if (r < n && arr[r] > arr[largest]) largest = r;\n    if (largest != i) {\n        swap(arr[i], arr[largest]);\n        heapify(arr, n, largest);\n    }\n}\n\nvoid heapSort(vector<int>& arr) {\n    int n = arr.size();\n    for (int i = n / 2 - 1; i >= 0; --i) heapify(arr, n, i);\n    for (int i = n - 1; i > 0; --i) {\n        swap(arr[0], arr[i]);\n        heapify(arr, i, 0);\n    }\n}"
    }
  },
  "counting-sort": {
    "id": "counting-sort",
    "name": "Counting Sort",
    "category": "sorting",
    "difficulty": "Medium",
    "timeComplexity": {
      "best": "O(N + K)",
      "average": "O(N + K)",
      "worst": "O(N + K)"
    },
    "spaceComplexity": "O(K)",
    "stable": true,
    "inPlace": false,
    "description": "A non-comparison sorting algorithm that tallies the frequency of each distinct value in an auxiliary frequency table, computes prefix sums, and maps each element directly to its sorted position.",
    "theory": "Unlike comparison sorts that are fundamentally bounded by the \u03a9(N log N) information-theoretic decision-tree lower bound, Counting Sort achieves linear O(N + K) time where K is the range of key values (max - min + 1). By calculating prefix sums on the count array, each element's exact final rank is known directly. Traversing input backwards preserves stable ordering. It serves as the vital sub-routine in Radix Sort.",
    "practicalUse": "Sorting bounded integer keys, alphabet characters, customer age distributions, and acting as the stable sub-pass subroutine for Radix Sort.",
    "pseudocode": [
      "procedure countingSort(A)",
      "  minVal := min(A); maxVal := max(A)",
      "  range := maxVal - minVal + 1",
      "  count := array of zeros of size range",
      "  output := array of size length(A)",
      "  for x in A do count[x - minVal] += 1",
      "  for i := 1 to range - 1 do",
      "    count[i] += count[i - 1]",
      "  end for",
      "  for i := length(A) - 1 down to 0 do",
      "    output[count[A[i] - minVal] - 1] := A[i]",
      "    count[A[i] - minVal] -= 1",
      "  end for",
      "  copy output back to A",
      "end procedure"
    ],
    "code": {
      "javascript": "function countingSort(arr) {\n    if (arr.length <= 1) return arr;\n    const min = Math.min(...arr);\n    const max = Math.max(...arr);\n    const count = new Array(max - min + 1).fill(0);\n    const output = new Array(arr.length);\n    for (let x of arr) count[x - min]++;\n    for (let i = 1; i < count.length; i++) count[i] += count[i - 1];\n    for (let i = arr.length - 1; i >= 0; i--) {\n        output[--count[arr[i] - min]] = arr[i];\n    }\n    for (let i = 0; i < arr.length; i++) arr[i] = output[i];\n    return arr;\n}",
      "python": "def counting_sort(arr):\n    if not arr:\n        return arr\n    min_val, max_val = min(arr), max(arr)\n    k = max_val - min_val + 1\n    count = [0] * k\n    output = [0] * len(arr)\n    for x in arr:\n        count[x - min_val] += 1\n    for i in range(1, k):\n        count[i] += count[i - 1]\n    for x in reversed(arr):\n        count[x - min_val] -= 1\n        output[count[x - min_val]] = x\n    return output",
      "cpp": "void countingSort(vector<int>& arr) {\n    if (arr.empty()) return;\n    int minVal = *min_element(arr.begin(), arr.end());\n    int maxVal = *max_element(arr.begin(), arr.end());\n    int k = maxVal - minVal + 1;\n    vector<int> count(k, 0), output(arr.size());\n    for (int x : arr) count[x - minVal]++;\n    for (int i = 1; i < k; ++i) count[i] += count[i - 1];\n    for (int i = arr.size() - 1; i >= 0; --i) {\n        output[--count[arr[i] - minVal]] = arr[i];\n    }\n    arr = output;\n}"
    }
  },
  "linear-search": {
    "id": "linear-search",
    "name": "Linear Search",
    "category": "searching",
    "difficulty": "Easy",
    "requiresSorted": false,
    "timeComplexity": {
      "best": "O(1)",
      "average": "O(N)",
      "worst": "O(N)"
    },
    "spaceComplexity": "O(1)",
    "description": "Sequentially inspects each item of a collection starting from the first index until a match is discovered or the entire list has been exhausted.",
    "theory": "Linear Search requires zero preconditions on the input data: the collection does not need to be sorted, indexed, or partitioned. It evaluates each element sequentially against the target value. On random unsorted arrays, locating an existing element requires (N + 1) / 2 comparisons on average, and exactly N comparisons in the worst case (item at end or absent).",
    "practicalUse": "Small or unsorted collections, single lookup scenarios where sorting beforehand would cost O(N log N), or streaming data where elements arrive sequentially.",
    "pseudocode": [
      "procedure linearSearch(A, target)",
      "  for i := 0 to length(A) - 1 do",
      "    if A[i] == target then",
      "      return i",
      "    end if",
      "  end for",
      "  return -1",
      "end procedure"
    ],
    "code": {
      "javascript": "function linearSearch(arr, target) {\n    for (let i = 0; i < arr.length; i++) {\n        if (arr[i] === target) return i;\n    }\n    return -1;\n}",
      "python": "def linear_search(arr, target):\n    for i, val in enumerate(arr):\n        if val == target:\n            return i\n    return -1",
      "cpp": "int linearSearch(const vector<int>& arr, int target) {\n    for (int i = 0; i < arr.size(); ++i) {\n        if (arr[i] == target) return i;\n    }\n    return -1;\n}"
    }
  },
  "binary-search": {
    "id": "binary-search",
    "name": "Binary Search",
    "category": "searching",
    "difficulty": "Easy",
    "requiresSorted": true,
    "timeComplexity": {
      "best": "O(1)",
      "average": "O(log N)",
      "worst": "O(log N)"
    },
    "spaceComplexity": "O(1)",
    "description": "Repeatedly halves the active search interval in a sorted array by comparing the target with the median element.",
    "theory": "Binary Search requires a monotonically sorted array. At each iteration, the search window [low, high] is bisected: mid = low + \u230a(high - low) / 2\u230b. If arr[mid] matches target, the search succeeds. If arr[mid] < target, the entire left half is eliminated (low = mid + 1); otherwise the right half is discarded (high = mid - 1). This logarithmic divide-and-conquer can search 4 billion elements in at most 32 comparisons.",
    "practicalUse": "Database B-tree index lookups, compiler symbol tables, git bisect (locating bug commits), standard library std::lower_bound / bisect.",
    "pseudocode": [
      "procedure binarySearch(A, target)",
      "  low := 0",
      "  high := length(A) - 1",
      "  while low <= high do",
      "    mid := low + floor((high - low) / 2)",
      "    if A[mid] == target then",
      "      return mid",
      "    else if A[mid] < target then",
      "      low := mid + 1",
      "    else",
      "      high := mid - 1",
      "    end if",
      "  end while",
      "  return -1",
      "end procedure"
    ],
    "code": {
      "javascript": "function binarySearch(arr, target) {\n    let low = 0, high = arr.length - 1;\n    while (low <= high) {\n        const mid = low + Math.floor((high - low) / 2);\n        if (arr[mid] === target) return mid;\n        if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}",
      "python": "def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1",
      "cpp": "int binarySearch(const vector<int>& arr, int target) {\n    int low = 0, high = (int)arr.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}"
    }
  },
  "jump-search": {
    "id": "jump-search",
    "name": "Jump Search",
    "category": "searching",
    "difficulty": "Medium",
    "requiresSorted": true,
    "timeComplexity": {
      "best": "O(1)",
      "average": "O(\u221aN)",
      "worst": "O(\u221aN)"
    },
    "spaceComplexity": "O(1)",
    "description": "Searches a sorted array by jumping ahead in fixed block sizes of \u221aN until an element greater than or equal to the target is found, then executes a backward linear search within that block.",
    "theory": "Jump Search balances block jumping with linear scanning. The optimal step size m that minimizes total steps f(m) = (N / m) + m is determined by calculus df/dm = -N/m\u00b2 + 1 = 0 => m = \u221aN. Once the jump overshoot occurs, it performs at most \u221aN linear steps backward. Compared to Binary Search, Jump Search only jumps backward once, making it significantly faster on devices where jumping backward is expensive (such as tape drives or unbuffered file streams).",
    "practicalUse": "Systems where jumping backward is costly or slow, such as sequential magnetic storage, unbuffered network streams, or forward-only disk readers.",
    "pseudocode": [
      "procedure jumpSearch(A, target)",
      "  n := length(A)",
      "  step := floor(sqrt(n))",
      "  prev := 0",
      "  while A[min(step, n) - 1] < target do",
      "    prev := step",
      "    step := step + floor(sqrt(n))",
      "    if prev >= n then return -1",
      "  end while",
      "  while A[prev] < target do",
      "    prev := prev + 1",
      "    if prev == min(step, n) then return -1",
      "  end while",
      "  if A[prev] == target then return prev",
      "  return -1",
      "end procedure"
    ],
    "code": {
      "javascript": "function jumpSearch(arr, target) {\n    const n = arr.length;\n    let step = Math.floor(Math.sqrt(n));\n    let prev = 0;\n    while (arr[Math.min(step, n) - 1] < target) {\n        prev = step;\n        step += Math.floor(Math.sqrt(n));\n        if (prev >= n) return -1;\n    }\n    while (arr[prev] < target) {\n        prev++;\n        if (prev === Math.min(step, n)) return -1;\n    }\n    return arr[prev] === target ? prev : -1;\n}",
      "python": "import math\n\ndef jump_search(arr, target):\n    n = len(arr)\n    step = int(math.sqrt(n))\n    prev = 0\n    while arr[min(step, n) - 1] < target:\n        prev = step\n        step += int(math.sqrt(n))\n        if prev >= n:\n            return -1\n    while arr[prev] < target:\n        prev += 1\n        if prev == min(step, n):\n            return -1\n    return prev if arr[prev] == target else -1",
      "cpp": "int jumpSearch(const vector<int>& arr, int target) {\n    int n = arr.size();\n    int step = sqrt(n);\n    int prev = 0;\n    while (arr[min(step, n) - 1] < target) {\n        prev = step;\n        step += sqrt(n);\n        if (prev >= n) return -1;\n    }\n    while (arr[prev] < target) {\n        prev++;\n        if (prev == min(step, n)) return -1;\n    }\n    return arr[prev] == target ? prev : -1;\n}"
    }
  },
  "interpolation-search": {
    "id": "interpolation-search",
    "name": "Interpolation Search",
    "category": "searching",
    "difficulty": "Medium",
    "requiresSorted": true,
    "timeComplexity": {
      "best": "O(1)",
      "average": "O(log(log N))",
      "worst": "O(N)"
    },
    "spaceComplexity": "O(1)",
    "description": "An improvement over Binary Search for uniformly distributed sorted arrays. It estimates the target's probable position using linear interpolation, mimicking how humans search a phone directory.",
    "theory": "Interpolation search calculates the probe index using the slope formula: pos = low + \u230a((target - arr[low]) * (high - low)) / (arr[high] - arr[low])\u230b. If the values are uniformly distributed, each probe narrows the candidate space exponentially, yielding an extraordinary average-case complexity of O(log log N). However, if values are exponentially distributed (e.g. 1, 2, 4, 8, 1000000), probes degrade into single-step shifts, causing worst-case O(N).",
    "practicalUse": "Large sorted in-memory datasets with approximately uniform key distribution, such as timestamp-keyed telemetry records or indexed telephone directories.",
    "pseudocode": [
      "procedure interpolationSearch(A, target)",
      "  low := 0",
      "  high := length(A) - 1",
      "  while low <= high and target >= A[low] and target <= A[high] do",
      "    if low == high then",
      "      if A[low] == target then return low else return -1",
      "    end if",
      "    pos := low + floor(((target - A[low]) * (high - low)) / (A[high] - A[low]))",
      "    if A[pos] == target then return pos",
      "    if A[pos] < target then low := pos + 1",
      "    else high := pos - 1",
      "  end while",
      "  return -1",
      "end procedure"
    ],
    "code": {
      "javascript": "function interpolationSearch(arr, target) {\n    let low = 0, high = arr.length - 1;\n    while (low <= high && target >= arr[low] && target <= arr[high]) {\n        if (low === high) return arr[low] === target ? low : -1;\n        const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));\n        if (arr[pos] === target) return pos;\n        if (arr[pos] < target) low = pos + 1;\n        else high = pos - 1;\n    }\n    return -1;\n}",
      "python": "def interpolation_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high and arr[low] <= target <= arr[high]:\n        if low == high:\n            return low if arr[low] == target else -1\n        pos = low + int(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]))\n        if arr[pos] == target:\n            return pos\n        if arr[pos] < target:\n            low = pos + 1\n        else:\n            high = pos - 1\n    return -1",
      "cpp": "int interpolationSearch(const vector<int>& arr, int target) {\n    int low = 0, high = (int)arr.size() - 1;\n    while (low <= high && target >= arr[low] && target <= arr[high]) {\n        if (low == high) return arr[low] == target ? low : -1;\n        int pos = low + (((double)(high - low) / (arr[high] - arr[low])) * (target - arr[low]));\n        if (arr[pos] == target) return pos;\n        if (arr[pos] < target) low = pos + 1;\n        else high = pos - 1;\n    }\n    return -1;\n}"
    }
  },
  "bfs": {
    "id": "bfs",
    "name": "Breadth-First Search (BFS)",
    "category": "graph",
    "difficulty": "Medium",
    "timeComplexity": {
      "best": "O(V + E)",
      "average": "O(V + E)",
      "worst": "O(V + E)"
    },
    "spaceComplexity": "O(V)",
    "description": "Explores a graph level by level radiating outward from a source node, utilizing a First-In-First-Out (FIFO) queue. It guarantees finding the shortest path on unweighted graphs.",
    "theory": "BFS traverses graph G=(V, E) in concentric frontier layers. Starting at source s, it marks s visited and enqueues it. In each step, it dequeues node u and examines all incident edges (u, v). If v is unvisited, v is marked visited and enqueued. Because every node and edge is examined at most once, running time is strictly O(V + E). The path discovered in an unweighted graph is guaranteed to contain the minimum number of edges.",
    "practicalUse": "Finding shortest paths in unweighted networks, peer-to-peer torrent chunk discovery, web crawlers, garbage collection mark-and-sweep, social media friend degrees (6 degrees of separation).",
    "pseudocode": [
      "procedure BFS(G, start_node)",
      "  create queue Q",
      "  mark start_node as visited",
      "  Q.enqueue(start_node)",
      "  while Q is not empty do",
      "    u := Q.dequeue()",
      "    for each neighbor v of u do",
      "      if v is not visited then",
      "        mark v as visited",
      "        parent[v] := u",
      "        Q.enqueue(v)",
      "      end if",
      "    end for",
      "  end while",
      "end procedure"
    ],
    "code": {
      "javascript": "function bfs(graph, start) {\n    const visited = new Set([start]);\n    const queue = [start];\n    const order = [];\n    while (queue.length > 0) {\n        const u = queue.shift();\n        order.push(u);\n        for (const v of graph[u] || []) {\n            if (!visited.has(v)) {\n                visited.add(v);\n                queue.push(v);\n            }\n        }\n    }\n    return order;\n}",
      "python": "from collections import deque\n\ndef bfs(graph, start):\n    visited = {start}\n    queue = deque([start])\n    order = []\n    while queue:\n        u = queue.popleft()\n        order.append(u)\n        for v in graph.get(u, []):\n            if v not in visited:\n                visited.add(v)\n                queue.append(v)\n    return order",
      "cpp": "vector<int> bfs(const vector<vector<int>>& adj, int start) {\n    vector<bool> visited(adj.size(), false);\n    queue<int> q;\n    vector<int> order;\n    visited[start] = true;\n    q.push(start);\n    while (!q.empty()) {\n        int u = q.front(); q.pop();\n        order.push_back(u);\n        for (int v : adj[u]) {\n            if (!visited[v]) {\n                visited[v] = true;\n                q.push(v);\n            }\n        }\n    }\n    return order;\n}"
    }
  },
  "dfs": {
    "id": "dfs",
    "name": "Depth-First Search (DFS)",
    "category": "graph",
    "difficulty": "Medium",
    "timeComplexity": {
      "best": "O(V + E)",
      "average": "O(V + E)",
      "worst": "O(V + E)"
    },
    "spaceComplexity": "O(V)",
    "description": "Explores as deep as possible along each branch before backtracking, using a LIFO stack or call recursion stack.",
    "theory": "DFS explores graph G=(V, E) by plunging along an unvisited path until reaching a dead end, then backtracking to explore alternate branches. By recording entry and exit timestamps (discovery and finish times), DFS partitions edges into tree, back, forward, and cross edges. This structural decomposition enables linear-time topological sorting of DAGs, detection of cycles, and computation of strongly connected components (Tarjan's and Kosaraju's algorithms).",
    "practicalUse": "Topological sorting in build systems (Makefile, CMake), cycle detection in dependency graphs, maze generation, solving Sudoku / constraint satisfaction problems via backtracking.",
    "pseudocode": [
      "procedure DFS(G, u)",
      "  mark u as visited",
      "  process(u)",
      "  for each neighbor v of u do",
      "    if v is not visited then",
      "      parent[v] := u",
      "      DFS(G, v)",
      "    end if",
      "  end for",
      "end procedure"
    ],
    "code": {
      "javascript": "function dfs(graph, start) {\n    const visited = new Set();\n    const order = [];\n    function traverse(u) {\n        visited.add(u);\n        order.push(u);\n        for (const v of graph[u] || []) {\n            if (!visited.has(v)) traverse(v);\n        }\n    }\n    traverse(start);\n    return order;\n}",
      "python": "def dfs(graph, start):\n    visited = set()\n    order = []\n    def traverse(u):\n        visited.add(u)\n        order.append(u)\n        for v in graph.get(u, []):\n            if v not in visited:\n                traverse(v)\n    traverse(start)\n    return order",
      "cpp": "void dfsHelper(const vector<vector<int>>& adj, int u, vector<bool>& visited, vector<int>& order) {\n    visited[u] = true;\n    order.push_back(u);\n    for (int v : adj[u]) {\n        if (!visited[v]) dfsHelper(adj, v, visited, order);\n    }\n}\n\nvector<int> dfs(const vector<vector<int>>& adj, int start) {\n    vector<bool> visited(adj.size(), false);\n    vector<int> order;\n    dfsHelper(adj, start, visited, order);\n    return order;\n}"
    }
  },
  "dijkstra": {
    "id": "dijkstra",
    "name": "Dijkstra's Algorithm",
    "category": "graph",
    "difficulty": "Hard",
    "timeComplexity": {
      "best": "O((V + E) log V)",
      "average": "O((V + E) log V)",
      "worst": "O((V + E) log V)"
    },
    "spaceComplexity": "O(V)",
    "description": "Finds the shortest path between nodes in a graph with non-negative edge weights using a greedy priority queue approach to iteratively relax distances.",
    "theory": "Dijkstra's algorithm maintains a tentative distance table dist[v], initialized to \u221e for all v \u2260 source (dist[source] = 0). A min-priority queue extracts the unvisited vertex u with minimum dist[u]. For each outgoing edge (u, v) with weight w, if dist[u] + w < dist[v], the distance is relaxed: dist[v] = dist[u] + w, and parent[v] = u. Because edges are non-negative, once a vertex is extracted from the priority queue, its computed distance is provably optimal.",
    "practicalUse": "OSPF and IS-IS network routing protocols in Internet routers, vehicle GPS navigation systems (Google Maps, Waze), flight itinerary route planners.",
    "pseudocode": [
      "procedure Dijkstra(Graph, source)",
      "  dist[source] := 0",
      "  for each vertex v != source do dist[v] := infinity",
      "  create min-priority queue PQ containing (0, source)",
      "  while PQ is not empty do",
      "    (d, u) := PQ.extractMin()",
      "    if d > dist[u] then continue",
      "    for each neighbor v of u with weight w do",
      "      if dist[u] + w < dist[v] then",
      "        dist[v] := dist[u] + w",
      "        parent[v] := u",
      "        PQ.insert((dist[v], v))",
      "      end if",
      "    end for",
      "  end while",
      "end procedure"
    ],
    "code": {
      "javascript": "function dijkstra(graph, start) {\n    const dist = {};\n    const prev = {};\n    const unvisited = new Set(Object.keys(graph));\n    for (const node of unvisited) dist[node] = Infinity;\n    dist[start] = 0;\n\n    while (unvisited.size > 0) {\n        let u = null;\n        for (const node of unvisited) {\n            if (u === null || dist[node] < dist[u]) u = node;\n        }\n        if (dist[u] === Infinity) break;\n        unvisited.delete(u);\n\n        for (const [v, weight] of Object.entries(graph[u] || {})) {\n            if (unvisited.has(v)) {\n                const alt = dist[u] + weight;\n                if (alt < dist[v]) {\n                    dist[v] = alt;\n                    prev[v] = u;\n                }\n            }\n        }\n    }\n    return { dist, prev };\n}",
      "python": "import heapq\n\ndef dijkstra(graph, start):\n    dist = {node: float('inf') for node in graph}\n    dist[start] = 0\n    pq = [(0, start)]\n    prev = {}\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]:\n            continue\n        for v, weight in graph.get(u, {}).items():\n            if dist[u] + weight < dist[v]:\n                dist[v] = dist[u] + weight\n                prev[v] = u\n                heapq.heappush(pq, (dist[v], v))\n    return dist, prev",
      "cpp": "pair<vector<int>, vector<int>> dijkstra(int n, const vector<vector<pair<int, int>>>& adj, int start) {\n    vector<int> dist(n, 1e9), prev(n, -1);\n    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;\n    dist[start] = 0;\n    pq.push({0, start});\n    while (!pq.empty()) {\n        auto [d, u] = pq.top(); pq.pop();\n        if (d > dist[u]) continue;\n        for (auto [v, w] : adj[u]) {\n            if (dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n                prev[v] = u;\n                pq.push({dist[v], v});\n            }\n        }\n    }\n    return {dist, prev};\n}"
    }
  },
  "a-star": {
    "id": "a-star",
    "name": "A* Search Algorithm",
    "category": "graph",
    "difficulty": "Hard",
    "timeComplexity": {
      "best": "O(E)",
      "average": "O(E log V)",
      "worst": "O(b\u1d48) [Exponential without good heuristic]"
    },
    "spaceComplexity": "O(V)",
    "description": "An informed best-first search algorithm that finds the shortest path to a goal by evaluating f(n) = g(n) + h(n), combining actual distance traveled with an admissible heuristic estimate to the destination.",
    "theory": "A* optimizes Dijkstra's algorithm by introducing a heuristic function h(n) estimating the cost from current node n to goal t. Priority is determined by f(n) = g(n) + h(n), where g(n) is the exact cumulative cost from start to n. If h(n) is admissible (never overestimates the true remaining distance, e.g. Euclidean or Manhattan distance in geometric spaces), A* is guaranteed to return an optimal shortest path while expanding substantially fewer nodes than uninformed Dijkstra.",
    "practicalUse": "Video game AI pathfinding (Unity, Unreal Engine), robotics automated navigation, autonomous vehicles, parcel routing in warehouse fulfillment systems.",
    "pseudocode": [
      "procedure AStar(start, goal, h)",
      "  openSet := priority queue with start ordered by fScore",
      "  gScore[start] := 0",
      "  fScore[start] := h(start, goal)",
      "  while openSet is not empty do",
      "    current := node in openSet with lowest fScore",
      "    if current == goal then return reconstructPath(cameFrom, current)",
      "    openSet.remove(current)",
      "    for each neighbor of current do",
      "      tentative_g := gScore[current] + weight(current, neighbor)",
      "      if tentative_g < gScore[neighbor] then",
      "        cameFrom[neighbor] := current",
      "        gScore[neighbor] := tentative_g",
      "        fScore[neighbor] := tentative_g + h(neighbor, goal)",
      "        if neighbor not in openSet then openSet.add(neighbor)",
      "      end if",
      "    end for",
      "  end while",
      "  return failure",
      "end procedure"
    ],
    "code": {
      "javascript": "function aStar(graph, coords, start, goal) {\n    const heuristic = (a, b) => {\n        const dx = coords[a].x - coords[b].x;\n        const dy = coords[a].y - coords[b].y;\n        return Math.hypot(dx, dy);\n    };\n    const gScore = { [start]: 0 };\n    const fScore = { [start]: heuristic(start, goal) };\n    const cameFrom = {};\n    const openSet = new Set([start]);\n\n    while (openSet.size > 0) {\n        let current = null;\n        for (const node of openSet) {\n            if (current === null || fScore[node] < fScore[current]) current = node;\n        }\n        if (current === goal) return reconstructPath(cameFrom, current);\n        openSet.delete(current);\n\n        for (const [neighbor, weight] of Object.entries(graph[current] || {})) {\n            const tentativeG = gScore[current] + weight;\n            if (tentativeG < (gScore[neighbor] ?? Infinity)) {\n                cameFrom[neighbor] = current;\n                gScore[neighbor] = tentativeG;\n                fScore[neighbor] = tentativeG + heuristic(neighbor, goal);\n                openSet.add(neighbor);\n            }\n        }\n    }\n    return null;\n}",
      "python": "import heapq, math\n\ndef a_star(graph, coords, start, goal):\n    def h(u, v):\n        return math.hypot(coords[u][0] - coords[v][0], coords[u][1] - coords[v][1])\n    \n    pq = [(h(start, goal), 0, start)]\n    g_score = {start: 0}\n    came_from = {}\n    \n    while pq:\n        f, g, current = heapq.heappop(pq)\n        if current == goal:\n            path = [goal]\n            while current in came_from:\n                current = came_from[current]\n                path.append(current)\n            return path[::-1]\n            \n        for neighbor, weight in graph.get(current, {}).items():\n            tentative_g = g + weight\n            if tentative_g < g_score.get(neighbor, float('inf')):\n                came_from[neighbor] = current\n                g_score[neighbor] = tentative_g\n                f_score = tentative_g + h(neighbor, goal)\n                heapq.heappush(pq, (f_score, tentative_g, neighbor))\n    return None",
      "cpp": "// A* Search on geometric coordinate graph\nstruct NodeCoord { double x, y; };\n\ndouble heuristic(const NodeCoord& a, const NodeCoord& b) {\n    return hypot(a.x - b.x, a.y - b.y);\n}"
    }
  }
};
