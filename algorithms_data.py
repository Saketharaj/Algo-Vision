"""
AlgoVision - Algorithm Metadata & Academic Reference Specifications
Contains comprehensive descriptions, time/space complexities, pseudocode with indexed step lines,
practical engineering trade-offs, and multi-language reference implementations.
"""

ALGORITHMS = {
    # ==========================================
    # 1. SORTING ALGORITHMS
    # ==========================================
    "bubble-sort": {
        "id": "bubble-sort",
        "name": "Bubble Sort",
        "category": "sorting",
        "difficulty": "Easy",
        "timeComplexity": {
            "best": "O(N)",
            "average": "O(N²)",
            "worst": "O(N²)"
        },
        "spaceComplexity": "O(1)",
        "stable": True,
        "inPlace": True,
        "description": "A foundational comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order until no swaps are required.",
        "theory": (
            "Bubble Sort works by repeatedly bubbling the largest unsorted element to its correct position at the end "
            "of the array. In each pass through the array, adjacent pairs are inspected. If an element is greater than its "
            "immediate neighbor, a swap occurs. With an early termination flag checking if any swap occurred during a pass, "
            "it achieves an optimal O(N) best-case running time on already-sorted arrays."
        ),
        "practicalUse": "Primarily educational. Rarely used in production due to O(N²) worst-case time, but useful in hardware with severe memory constraints or nearly-sorted short sequences where an early-break pass finishes in O(N).",
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
            "javascript": """function bubbleSort(arr) {
    const n = arr.length;
    let swapped;
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}""",
            "python": """def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr""",
            "cpp": """void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    bool swapped;
    for (int i = 0; i < n - 1; ++i) {
        swapped = false;
        for (int j = 0; j < n - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}"""
        }
    },

    "selection-sort": {
        "id": "selection-sort",
        "name": "Selection Sort",
        "category": "sorting",
        "difficulty": "Easy",
        "timeComplexity": {
            "best": "O(N²)",
            "average": "O(N²)",
            "worst": "O(N²)"
        },
        "spaceComplexity": "O(1)",
        "stable": False,
        "inPlace": True,
        "description": "Divides the input array into a sorted and an unsorted region. It repeatedly finds the minimum element from the unsorted region and appends it to the sorted region.",
        "theory": (
            "Selection sort maintains an invariant: at iteration i, the first i elements are sorted and contain the i smallest "
            "elements of the entire array. The algorithm scans the remaining unsorted subarray of size (N - i) to locate the minimum, "
            "then performs at most one swap per pass. Total swaps are bounded strictly by O(N), which can be advantageous when write operations are significantly more costly than reads (e.g., flash memory)."
        ),
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
            "javascript": """function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    return arr;
}""",
            "python": """def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr""",
            "cpp": """void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; ++i) {
        int minIdx = i;
        for (int j = i + 1; j < n; ++j) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx != i) swap(arr[i], arr[minIdx]);
    }
}"""
        }
    },

    "insertion-sort": {
        "id": "insertion-sort",
        "name": "Insertion Sort",
        "category": "sorting",
        "difficulty": "Easy",
        "timeComplexity": {
            "best": "O(N)",
            "average": "O(N²)",
            "worst": "O(N²)"
        },
        "spaceComplexity": "O(1)",
        "stable": True,
        "inPlace": True,
        "description": "Builds the final sorted array one element at a time by repeatedly taking the next element and inserting it into its correct position within the already-sorted prefix.",
        "theory": (
            "Insertion Sort processes elements from index 1 to N-1. For each item (key), it compares backward against the "
            "sorted subarray, shifting elements that are greater than key to the right, and then places the key in the vacant position. "
            "Because shifting terminates immediately once a smaller element is reached, it runs in O(N + d) where d is the number of inversions. "
            "It is highly adaptive and serves as the small-array base case in production hybrid algorithms like Timsort and Introsort."
        ),
        "practicalUse": "Standard base-case sorter for small arrays (typically N ≤ 16 to 32) in standard libraries like C++ std::sort (Introsort) and Java/Python Timsort.",
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
            "javascript": """function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}""",
            "python": """def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr""",
            "cpp": """void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            --j;
        }
        arr[j + 1] = key;
    }
}"""
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
        "stable": True,
        "inPlace": False,
        "description": "A divide-and-conquer algorithm that recursively splits the array into two halves, sorts them independently, and merges the sorted halves into a unified sequence.",
        "theory": (
            "Merge Sort models the recurrence T(N) = 2T(N/2) + O(N), which by the Master Theorem yields a deterministic O(N log N) "
            "running time regardless of input distribution. During the merge step, two pointers advance through left and right subarrays, "
            "copying the lesser element into an auxiliary buffer. Its stability and sequential access pattern make it ideal for linked lists "
            "and external sorting on secondary storage (hard drives or streaming pipelines)."
        ),
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
            "javascript": """function mergeSort(arr, l = 0, r = arr.length - 1) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
    return arr;
}

function merge(arr, l, m, r) {
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
}""",
            "python": """def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result""",
            "cpp": """void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}"""
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
            "worst": "O(N²)"
        },
        "spaceComplexity": "O(log N)",
        "stable": False,
        "inPlace": True,
        "description": "An efficient divide-and-conquer algorithm that selects a 'pivot' element, partitions the array such that smaller elements precede the pivot and greater elements follow it, and recursively sorts the sub-partitions.",
        "theory": (
            "Quick Sort relies on partitioning (Lomuto or Hoare). When a balanced pivot is chosen, each recursion level partitions "
            "an array of size N in O(N) time with tree depth log₂N, achieving O(N log N). In the worst case (e.g. naive pivot selection "
            "on already sorted input with Lomuto partition), depth degrades to N, causing O(N²). Modern implementations use randomized "
            "or median-of-three pivot selection, or dual-pivot techniques (as in Java 7+ Arrays.sort) to guard against worst-case patterns."
        ),
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
            "javascript": """function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const p = partition(arr, low, high);
        quickSort(arr, low, p - 1);
        quickSort(arr, p + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}""",
            "python": """def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        p = partition(arr, low, high)
        quick_sort(arr, low, p - 1)
        quick_sort(arr, p + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1""",
            "cpp": """int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; ++j) {
        if (arr[j] <= pivot) {
            ++i;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int p = partition(arr, low, high);
        quickSort(arr, low, p - 1);
        quickSort(arr, p + 1, high);
    }
}"""
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
        "stable": False,
        "inPlace": True,
        "description": "Transforms the input array into a binary max-heap, then repeatedly extracts the root (maximum element) and swaps it to the end while restoring the heap property.",
        "theory": (
            "Heap Sort operates in two distinct phases: (1) Heap Construction: converts the unsorted array into a Max-Heap in O(N) time "
            "using bottom-up sift-downs. (2) Extraction Phase: for i from N-1 down to 1, swaps root A[0] with A[i] and calls heapify(0, i) "
            "to sift down the new root in O(log N). Because it is strictly O(N log N) in all cases and requires O(1) extra space, "
            "it is used by Introsort whenever Quick Sort recursion depth exceeds 2 * log₂N."
        ),
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
            "javascript": """function heapSort(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}""",
            "python": """def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr

def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[l] > arr[largest]:
        largest = l
    if r < n and arr[r] > arr[largest]:
        largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)""",
            "cpp": """void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; --i) heapify(arr, n, i);
    for (int i = n - 1; i > 0; --i) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}"""
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
        "stable": True,
        "inPlace": False,
        "description": "A non-comparison sorting algorithm that tallies the frequency of each distinct value in an auxiliary frequency table, computes prefix sums, and maps each element directly to its sorted position.",
        "theory": (
            "Unlike comparison sorts that are fundamentally bounded by the Ω(N log N) information-theoretic decision-tree lower bound, "
            "Counting Sort achieves linear O(N + K) time where K is the range of key values (max - min + 1). By calculating prefix sums "
            "on the count array, each element's exact final rank is known directly. Traversing input backwards preserves stable ordering. "
            "It serves as the vital sub-routine in Radix Sort."
        ),
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
            "javascript": """function countingSort(arr) {
    if (arr.length <= 1) return arr;
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const count = new Array(max - min + 1).fill(0);
    const output = new Array(arr.length);
    for (let x of arr) count[x - min]++;
    for (let i = 1; i < count.length; i++) count[i] += count[i - 1];
    for (let i = arr.length - 1; i >= 0; i--) {
        output[--count[arr[i] - min]] = arr[i];
    }
    for (let i = 0; i < arr.length; i++) arr[i] = output[i];
    return arr;
}""",
            "python": """def counting_sort(arr):
    if not arr:
        return arr
    min_val, max_val = min(arr), max(arr)
    k = max_val - min_val + 1
    count = [0] * k
    output = [0] * len(arr)
    for x in arr:
        count[x - min_val] += 1
    for i in range(1, k):
        count[i] += count[i - 1]
    for x in reversed(arr):
        count[x - min_val] -= 1
        output[count[x - min_val]] = x
    return output""",
            "cpp": """void countingSort(vector<int>& arr) {
    if (arr.empty()) return;
    int minVal = *min_element(arr.begin(), arr.end());
    int maxVal = *max_element(arr.begin(), arr.end());
    int k = maxVal - minVal + 1;
    vector<int> count(k, 0), output(arr.size());
    for (int x : arr) count[x - minVal]++;
    for (int i = 1; i < k; ++i) count[i] += count[i - 1];
    for (int i = arr.size() - 1; i >= 0; --i) {
        output[--count[arr[i] - minVal]] = arr[i];
    }
    arr = output;
}"""
        }
    },

    # ==========================================
    # 2. SEARCHING ALGORITHMS
    # ==========================================
    "linear-search": {
        "id": "linear-search",
        "name": "Linear Search",
        "category": "searching",
        "difficulty": "Easy",
        "requiresSorted": False,
        "timeComplexity": {
            "best": "O(1)",
            "average": "O(N)",
            "worst": "O(N)"
        },
        "spaceComplexity": "O(1)",
        "description": "Sequentially inspects each item of a collection starting from the first index until a match is discovered or the entire list has been exhausted.",
        "theory": (
            "Linear Search requires zero preconditions on the input data: the collection does not need to be sorted, indexed, "
            "or partitioned. It evaluates each element sequentially against the target value. On random unsorted arrays, locating an existing element "
            "requires (N + 1) / 2 comparisons on average, and exactly N comparisons in the worst case (item at end or absent)."
        ),
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
            "javascript": """function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}""",
            "python": """def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1""",
            "cpp": """int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); ++i) {
        if (arr[i] == target) return i;
    }
    return -1;
}"""
        }
    },

    "binary-search": {
        "id": "binary-search",
        "name": "Binary Search",
        "category": "searching",
        "difficulty": "Easy",
        "requiresSorted": True,
        "timeComplexity": {
            "best": "O(1)",
            "average": "O(log N)",
            "worst": "O(log N)"
        },
        "spaceComplexity": "O(1)",
        "description": "Repeatedly halves the active search interval in a sorted array by comparing the target with the median element.",
        "theory": (
            "Binary Search requires a monotonically sorted array. At each iteration, the search window [low, high] is bisected: "
            "mid = low + ⌊(high - low) / 2⌋. If arr[mid] matches target, the search succeeds. If arr[mid] < target, the entire left half "
            "is eliminated (low = mid + 1); otherwise the right half is discarded (high = mid - 1). This logarithmic divide-and-conquer "
            "can search 4 billion elements in at most 32 comparisons."
        ),
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
            "javascript": """function binarySearch(arr, target) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}""",
            "python": """def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1""",
            "cpp": """int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = (int)arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}"""
        }
    },

    "jump-search": {
        "id": "jump-search",
        "name": "Jump Search",
        "category": "searching",
        "difficulty": "Medium",
        "requiresSorted": True,
        "timeComplexity": {
            "best": "O(1)",
            "average": "O(√N)",
            "worst": "O(√N)"
        },
        "spaceComplexity": "O(1)",
        "description": "Searches a sorted array by jumping ahead in fixed block sizes of √N until an element greater than or equal to the target is found, then executes a backward linear search within that block.",
        "theory": (
            "Jump Search balances block jumping with linear scanning. The optimal step size m that minimizes total steps "
            "f(m) = (N / m) + m is determined by calculus df/dm = -N/m² + 1 = 0 => m = √N. Once the jump overshoot occurs, "
            "it performs at most √N linear steps backward. Compared to Binary Search, Jump Search only jumps backward once, "
            "making it significantly faster on devices where jumping backward is expensive (such as tape drives or unbuffered file streams)."
        ),
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
            "javascript": """function jumpSearch(arr, target) {
    const n = arr.length;
    let step = Math.floor(Math.sqrt(n));
    let prev = 0;
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }
    while (arr[prev] < target) {
        prev++;
        if (prev === Math.min(step, n)) return -1;
    }
    return arr[prev] === target ? prev : -1;
}""",
            "python": """import math

def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0
    while arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1
    while arr[prev] < target:
        prev += 1
        if prev == min(step, n):
            return -1
    return prev if arr[prev] == target else -1""",
            "cpp": """int jumpSearch(const vector<int>& arr, int target) {
    int n = arr.size();
    int step = sqrt(n);
    int prev = 0;
    while (arr[min(step, n) - 1] < target) {
        prev = step;
        step += sqrt(n);
        if (prev >= n) return -1;
    }
    while (arr[prev] < target) {
        prev++;
        if (prev == min(step, n)) return -1;
    }
    return arr[prev] == target ? prev : -1;
}"""
        }
    },

    "interpolation-search": {
        "id": "interpolation-search",
        "name": "Interpolation Search",
        "category": "searching",
        "difficulty": "Medium",
        "requiresSorted": True,
        "timeComplexity": {
            "best": "O(1)",
            "average": "O(log(log N))",
            "worst": "O(N)"
        },
        "spaceComplexity": "O(1)",
        "description": "An improvement over Binary Search for uniformly distributed sorted arrays. It estimates the target's probable position using linear interpolation, mimicking how humans search a phone directory.",
        "theory": (
            "Interpolation search calculates the probe index using the slope formula: "
            "pos = low + ⌊((target - arr[low]) * (high - low)) / (arr[high] - arr[low])⌋. "
            "If the values are uniformly distributed, each probe narrows the candidate space exponentially, yielding an extraordinary "
            "average-case complexity of O(log log N). However, if values are exponentially distributed (e.g. 1, 2, 4, 8, 1000000), "
            "probes degrade into single-step shifts, causing worst-case O(N)."
        ),
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
            "javascript": """function interpolationSearch(arr, target) {
    let low = 0, high = arr.length - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low === high) return arr[low] === target ? low : -1;
        const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
        if (arr[pos] === target) return pos;
        if (arr[pos] < target) low = pos + 1;
        else high = pos - 1;
    }
    return -1;
}""",
            "python": """def interpolation_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high and arr[low] <= target <= arr[high]:
        if low == high:
            return low if arr[low] == target else -1
        pos = low + int(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]))
        if arr[pos] == target:
            return pos
        if arr[pos] < target:
            low = pos + 1
        else:
            high = pos - 1
    return -1""",
            "cpp": """int interpolationSearch(const vector<int>& arr, int target) {
    int low = 0, high = (int)arr.size() - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low == high) return arr[low] == target ? low : -1;
        int pos = low + (((double)(high - low) / (arr[high] - arr[low])) * (target - arr[low]));
        if (arr[pos] == target) return pos;
        if (arr[pos] < target) low = pos + 1;
        else high = pos - 1;
    }
    return -1;
}"""
        }
    },

    # ==========================================
    # 3. GRAPH ALGORITHMS
    # ==========================================
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
        "theory": (
            "BFS traverses graph G=(V, E) in concentric frontier layers. Starting at source s, it marks s visited and enqueues it. "
            "In each step, it dequeues node u and examines all incident edges (u, v). If v is unvisited, v is marked visited and enqueued. "
            "Because every node and edge is examined at most once, running time is strictly O(V + E). The path discovered in an unweighted "
            "graph is guaranteed to contain the minimum number of edges."
        ),
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
            "javascript": """function bfs(graph, start) {
    const visited = new Set([start]);
    const queue = [start];
    const order = [];
    while (queue.length > 0) {
        const u = queue.shift();
        order.push(u);
        for (const v of graph[u] || []) {
            if (!visited.has(v)) {
                visited.add(v);
                queue.push(v);
            }
        }
    }
    return order;
}""",
            "python": """from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    order = []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in graph.get(u, []):
            if v not in visited:
                visited.add(v)
                queue.append(v)
    return order""",
            "cpp": """vector<int> bfs(const vector<vector<int>>& adj, int start) {
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    vector<int> order;
    visited[start] = true;
    q.push(start);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
    return order;
}"""
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
        "theory": (
            "DFS explores graph G=(V, E) by plunging along an unvisited path until reaching a dead end, then backtracking to explore alternate branches. "
            "By recording entry and exit timestamps (discovery and finish times), DFS partitions edges into tree, back, forward, and cross edges. "
            "This structural decomposition enables linear-time topological sorting of DAGs, detection of cycles, and computation of strongly connected components (Tarjan's and Kosaraju's algorithms)."
        ),
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
            "javascript": """function dfs(graph, start) {
    const visited = new Set();
    const order = [];
    function traverse(u) {
        visited.add(u);
        order.push(u);
        for (const v of graph[u] || []) {
            if (!visited.has(v)) traverse(v);
        }
    }
    traverse(start);
    return order;
}""",
            "python": """def dfs(graph, start):
    visited = set()
    order = []
    def traverse(u):
        visited.add(u)
        order.append(u)
        for v in graph.get(u, []):
            if v not in visited:
                traverse(v)
    traverse(start)
    return order""",
            "cpp": """void dfsHelper(const vector<vector<int>>& adj, int u, vector<bool>& visited, vector<int>& order) {
    visited[u] = true;
    order.push_back(u);
    for (int v : adj[u]) {
        if (!visited[v]) dfsHelper(adj, v, visited, order);
    }
}

vector<int> dfs(const vector<vector<int>>& adj, int start) {
    vector<bool> visited(adj.size(), false);
    vector<int> order;
    dfsHelper(adj, start, visited, order);
    return order;
}"""
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
        "theory": (
            "Dijkstra's algorithm maintains a tentative distance table dist[v], initialized to ∞ for all v ≠ source (dist[source] = 0). "
            "A min-priority queue extracts the unvisited vertex u with minimum dist[u]. For each outgoing edge (u, v) with weight w, "
            "if dist[u] + w < dist[v], the distance is relaxed: dist[v] = dist[u] + w, and parent[v] = u. Because edges are non-negative, "
            "once a vertex is extracted from the priority queue, its computed distance is provably optimal."
        ),
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
            "javascript": """function dijkstra(graph, start) {
    const dist = {};
    const prev = {};
    const unvisited = new Set(Object.keys(graph));
    for (const node of unvisited) dist[node] = Infinity;
    dist[start] = 0;

    while (unvisited.size > 0) {
        let u = null;
        for (const node of unvisited) {
            if (u === null || dist[node] < dist[u]) u = node;
        }
        if (dist[u] === Infinity) break;
        unvisited.delete(u);

        for (const [v, weight] of Object.entries(graph[u] || {})) {
            if (unvisited.has(v)) {
                const alt = dist[u] + weight;
                if (alt < dist[v]) {
                    dist[v] = alt;
                    prev[v] = u;
                }
            }
        }
    }
    return { dist, prev };
}""",
            "python": """import heapq

def dijkstra(graph, start):
    dist = {node: float('inf') for node in graph}
    dist[start] = 0
    pq = [(0, start)]
    prev = {}
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, weight in graph.get(u, {}).items():
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                prev[v] = u
                heapq.heappush(pq, (dist[v], v))
    return dist, prev""",
            "cpp": """pair<vector<int>, vector<int>> dijkstra(int n, const vector<vector<pair<int, int>>>& adj, int start) {
    vector<int> dist(n, 1e9), prev(n, -1);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    dist[start] = 0;
    pq.push({0, start});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                prev[v] = u;
                pq.push({dist[v], v});
            }
        }
    }
    return {dist, prev};
}"""
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
            "worst": "O(bᵈ) [Exponential without good heuristic]"
        },
        "spaceComplexity": "O(V)",
        "description": "An informed best-first search algorithm that finds the shortest path to a goal by evaluating f(n) = g(n) + h(n), combining actual distance traveled with an admissible heuristic estimate to the destination.",
        "theory": (
            "A* optimizes Dijkstra's algorithm by introducing a heuristic function h(n) estimating the cost from current node n to goal t. "
            "Priority is determined by f(n) = g(n) + h(n), where g(n) is the exact cumulative cost from start to n. If h(n) is admissible "
            "(never overestimates the true remaining distance, e.g. Euclidean or Manhattan distance in geometric spaces), A* is guaranteed "
            "to return an optimal shortest path while expanding substantially fewer nodes than uninformed Dijkstra."
        ),
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
            "javascript": """function aStar(graph, coords, start, goal) {
    const heuristic = (a, b) => {
        const dx = coords[a].x - coords[b].x;
        const dy = coords[a].y - coords[b].y;
        return Math.hypot(dx, dy);
    };
    const gScore = { [start]: 0 };
    const fScore = { [start]: heuristic(start, goal) };
    const cameFrom = {};
    const openSet = new Set([start]);

    while (openSet.size > 0) {
        let current = null;
        for (const node of openSet) {
            if (current === null || fScore[node] < fScore[current]) current = node;
        }
        if (current === goal) return reconstructPath(cameFrom, current);
        openSet.delete(current);

        for (const [neighbor, weight] of Object.entries(graph[current] || {})) {
            const tentativeG = gScore[current] + weight;
            if (tentativeG < (gScore[neighbor] ?? Infinity)) {
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentativeG;
                fScore[neighbor] = tentativeG + heuristic(neighbor, goal);
                openSet.add(neighbor);
            }
        }
    }
    return null;
}""",
            "python": """import heapq, math

def a_star(graph, coords, start, goal):
    def h(u, v):
        return math.hypot(coords[u][0] - coords[v][0], coords[u][1] - coords[v][1])
    
    pq = [(h(start, goal), 0, start)]
    g_score = {start: 0}
    came_from = {}
    
    while pq:
        f, g, current = heapq.heappop(pq)
        if current == goal:
            path = [goal]
            while current in came_from:
                current = came_from[current]
                path.append(current)
            return path[::-1]
            
        for neighbor, weight in graph.get(current, {}).items():
            tentative_g = g + weight
            if tentative_g < g_score.get(neighbor, float('inf')):
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f_score = tentative_g + h(neighbor, goal)
                heapq.heappush(pq, (f_score, tentative_g, neighbor))
    return None""",
            "cpp": """// A* Search on geometric coordinate graph
struct NodeCoord { double x, y; };

double heuristic(const NodeCoord& a, const NodeCoord& b) {
    return hypot(a.x - b.x, a.y - b.y);
}"""
        }
    }
}
