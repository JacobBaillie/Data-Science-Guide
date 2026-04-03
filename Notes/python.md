# Python

---

## Primitives

```python
round(3.1415, 2)        # → 3.14
float('inf')            # positive infinity
float('-inf')           # negative infinity

n % 2 == 0              # even
n % 2 == 1              # odd
```

---

## Lists

```python
lst.append('item')              # add to end
lst.insert(1, 'item')           # insert at index (existing items shift right)
lst.pop(1)                      # remove at index AND return it
lst.remove('item')              # remove first occurrence (no return)
lst.reverse()                   # reverse the order
reversed(lst)                   # returns the reversed list
del lst[3:5]                    # delete slice in place
lst.clear()                     # empty the list (object still exists)
lst.extend([1, 2, 3])           # multi-append (each item individually)
lst.sort()                      # sort in place
sorted(lst)                     # returns the sorted list
lst.index('item')               # index of first appearance

lst.isalnum()                   # alphanumeric check (also works on chars)
lst.lower()                     # lowercase
```

### Matrix / List of Lists

```python
new_mat = [[None] * list_length for i in range(num_lists)]
```

---

## Strings

```python
char.isalnum()                          # alphanumeric check
string[start:end]                       # slicing
string[::-1]                            # reverse

new = old[:pos] + "abc" + old[pos:]     # insert substring at position
sorted_list = sorted(string)            # returns sorted list of chars
alpha_string = "".join(sorted_list)     # reassemble as string

new = string.lower()
new = string.replace(char, " ")         # replace all occurrences
words = string.split()                  # split on whitespace → list of words

test.find(" ") returns the index of the first instance of the specified char or string
```

---

## Sets

```python
empty_set = set()
my_set = set([1, 2, 3])
len(my_set)

my_set.add(1)
my_set.add(tuple([a, 2, 3]))   # sets can only hold hashable types; use tuples for sequences
my_set.discard(1)              # remove if present (no error if missing)
for num in my_set:
    print num

combinedSet = set1 - set2       # remove one from another
combinedSet = set1 | set2       # combine sets
```

---

## Dictionaries

```python
d.get(key)                     # safe get (returns None if missing)
d.keys()                       # returns view of keys
d.items()                      # returns view of (key, value) pairs
del d[key]                     # remove entry
d.pop(key)                     # remove entry and return it

# Sort items by key (descending)
sorted(d.items(), key=lambda item: item[0], reverse=True)

# Sort keys by value (descending)
sorted(d, key=d.get, reverse=True)

# Increment or initialize a count
d[key] = d.get(key, 0) + 1
```

---

## Heaps

Python's `heapq` is a **min-heap** by default. Negate values to simulate a max-heap.

```python
import heapq

heap = []
heapq.heappush(heap, num)
heapq.heappop(heap)            # removes and returns smallest

can even add lists to a heap and it'll always hold the smallest based on index 0:
heapq.heappush(heap, (val, obj))
val, smallestObj = heapq.heappop(heap)
```

### Two-Heap Pattern (track median)

```python
self.big_heap = []    # max-heap of lower half (store negated)
self.small_heap = []  # min-heap of upper half

heapq.heappush(self.big_heap, num)
s = heapq.heappop(self.big_heap)
heapq.heappush(self.small_heap, -s)

# Rebalance
if len(self.small_heap) > len(self.big_heap):
    extra = heapq.heappop(self.small_heap)
    heapq.heappush(self.big_heap, -extra)
```

> Generalizes to tracking arbitrary percentiles with more heaps.

---

## Deques

```python
from collections import deque

dq = deque(iterable)
dq.append(item)         # add right
dq.appendleft(item)     # add left
dq.pop()                # remove right
dq.popleft()            # remove left
```

---

## Functional: `map` / `filter` / Lambda

```python
# map: apply function to each element
result = map(lambda x: x * 2, nums)

# filter: keep elements where function is True
result = filter(lambda x: x > 0, nums)

# Chaining: for each row in arr, keep positives and square them
ans = map(
    lambda row: map(lambda x: x * x, filter(lambda x: x > 0, row)),
    arr
)
```

> Note: `map` and `filter` return lazy iterators — wrap in `list()` to evaluate.

---

## Sorting

```python
lst.sort(reverse=True)           # in-place
sorted(iterable, reverse=False)  # returns new list

# Quicksort via frequency count: build freq dict, reconstruct sorted list
```

---

## Graph Traversal: BFS / DFS

Use for complex search over grids, graphs, or interconnected arrays.

### Template

```python
# 1. Initialize structures OUTSIDE the traversal function
queue = [starting_positions]    # cells confirmed True (borders, seeds, etc.)
                                 # If these are conceptually "endpoints", this is *reverse* BFS/DFS
visited = set()
# OR: visited = [[False] * n for _ in range(m)]

# 2. Define traversal function
def bfs(queue, visited):
    while queue:
        current = queue.pop(0)   # FIFO → BFS
        # current = queue.pop()  # LIFO → DFS

        if current in visited:
            continue
        visited.add(current)

        # Custom logic: check neighbors, add valid ones to queue

# 3. Call it
bfs(queue, visited)
```

### Variations

- **Reverse BFS/DFS**: seed the queue with known endpoints and work backward
- **Multiple queues/maps**: pass different `queue`/`visited` pairs to the same function
- **Bidirectional BFS**: run forward + backward inside the same loop for faster search when start and end are both known
