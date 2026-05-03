const NOTES = {
  statistics_probability: {
    title: "Statistics & Probability",
    content: `# Statistics and Probability

---

## Core Concepts

**p-value**
Probability of observing a result at least as extreme as the one seen, *assuming the null hypothesis is true* (e.g., the dice is fair). Typically, **p < 0.05** is considered statistically significant (suggests the null is false).

**Expected Value (E)**

When p is known: \`E = 1/p\` where p is the probability of success per attempt.

When p is unknown (unbounded chain of events until success):
\`\`\`
E₀ = 1 + P(E₀→E₁)·E₁ + ... + P(Eₙ₋₁→Eₙ)·Eₙ + P(E₀→E₀)·E₀
E₁ = 1 + P(E₁→E₂)·E₂ + ... + P(Eₙ₋₁→Eₙ)·Eₙ + P(E₁→E₀)·E₀
...
Eₙ = 1 + P(Eₙ→success)·0 + P(Eₙ→E₀)·E₀
\`\`\`
Generalization (min of n): \`E[min(X, Y, ...n)] = 1/(n+1)\` — like the average segment length after placing n random dots on a line of length 1.

**Central Limit Theorem (CLT)**
For large enough n, the distribution of sample means will approach normal, regardless of the underlying population distribution.

---

## Distributions

**Uniform** — constant probability across a specific region. Also known as a rectangle distribution.

**CDF and PDF**

| Function | Definition | Use |
|----------|-----------|-----|
| CDF — \`F_Z(z) = P(Z < z)\` | Cumulative probability up to z | Binomial analysis, percentiles |
| PDF — \`f_Z(z) = d/dz F_Z(z)\` | Probability density at z | Finding E via \`E = ∫ z·f_Z(z) dz\` |

---

**Gaussian (Normal)** — fully defined by mean and variance.

| Parameter | Definition |
|---|---|
| Mean | μ |
| Variance | σ² |
| PDF | \`f(x) = 1/(σ·√(2π)) · exp[−½·((x−μ)/σ)²]\` |

Combining multiple distributions: mean = μ₁ + μ₂, variance = σ²₁ + σ²₂.

---

**Binomial** — models number of successes in n independent trials, each with success probability p.

| Parameter | Definition |
|---|---|
| Mean | \`μ = n·p\` |
| Variance by sample size | \`σ² = n·p·(1−p)\` |
| Variance by mean | \`σ² = μ·(1−p)\` — always less than μ |
| PMF | \`P(X=k) = C(n,k) · pᵏ · (1−p)^(n−k)\` |

- PMF is probability of getting k successes in n trials for success probability p per trial
- Variance always less than mean
- PDF is always symmetric about the mean
- As n→∞ and p→0 with np=λ fixed, converges to Poisson

---

**Poisson** — models count frequency for pure independent event statistics.

| Parameter | Definition |
|---|---|
| Mean | \`μ = λ\` — expected frequency |
| Variance | \`σ² = λ = μ\` — variance equals mean exactly |
| PMF | \`P(X=k) = λᵏ · e^(−λ) / k!\` |

- Is a transformation of the binomial by taking limits of large trials, small p, and np = λ (constant success rate)
- **Overdispersion**: variance too large for Poisson; caused by hidden variables, excess zeros, clustering, human factors. Poisson is usually not practical in the real world.

*Quasi-Poisson* — adds a dispersion factor φ for slight overdispersion: \`σ² = φ·λ\`

---

**Negative Binomial** — allows variance to increase faster than the mean: \`Variance = mean + α · mean²\`

| Parameter | Definition |
|---|---|
| Mean | \`μ = r·(1−p)/p\` |
| Variance by parameter | \`σ² = r·(1−p)/p²\` |
| Variance by mean | \`σ² = μ + α·μ²\` where \`α = 1/r\` |
| PMF | \`P(X=k) = C(k+r−1, k) · pʳ · (1−p)ᵏ\` |

- PMF is the probability of getting r successes before failing r times. r is constrained instead of n
- Better choice than Quasi-Poisson for heavier overdispersion

---

## Variance and Standard Deviation

\`\`\`
Variance of single trial         = p(1-p)
  e.g. uncertainty of one coin flip heads = 0.25

Variance of mean counts of n trials = n·p·(1-p)
  e.g. 100 coin flips, heads count varies from 50 by ±5 (std dev = 5)

Variance in mean proportion of n trials = p·(1−p)/n
  e.g. 100 coin flips repeated, proportion of heads varies by ±5% (std dev = 5%)

Variance of mean height of n people — no closed form; must use σ from population or large sample.
  std dev of sum of heights of n people = √(n) σ
  std dev of mean of heights of n people = σ / √(n)
\`\`\`

**Heights example (population vs sample)**

| Stat | Value |
|---|---|
| Population mean μ | 160 |
| Population std dev σ | 20 |
| Sample size n | 100 |
| Std error SE = σ/√n | 2 → average height is 160 ± 2 |
| Mean sum of heights | 16,000 |
| Std error of sum = √n·σ | 200 → total height is 16,000 ± 200 |

**Coin flip example (population vs sample)**

| Stat | Value |
|---|---|
| Mean for 1 trial μ = p | 0.5 |
| Std dev σ = √(p(1-p)) | 0.5 |
| Sample size n | 100 |
| Std error SE = σ/√n | 0.05 → proportion of heads is 50 ± 5% |
| Mean heads = np | 50 |
| Std error of heads = √n·σ | 5 → head count is 50 ± 5 |

**A/B Test**
Given mean + sigma for a control and test population with n for each, is the result significant:
- Use a difference test
- is μ1 - μ2 bigger than the a = 0.05 level based on the combined variance of the two populations
- combined variance SE = σ(X1 - X2) = √( σ1²/n1 + σ2²/n2)

**Explicit definitions**
\`\`\`
Variance = SUM((value − mean)²) / n
Std dev  = √(SUM((value − mean)²) / n)
Var(X)   = E[(X − E[X])²] = E[X²] − (E[X])²
\`\`\`

**z-score vs t-score**

Both test how unlikely an observation is under the null hypothesis.
- *z-score*: use for large n or when population stats are known
- *t-score*: use when n < ~30; adjusted table values account for small sample uncertainty

---

## Regression, Classification, and Inference

**Linear Regression (OLS)** — minimize the sum of squared residuals.

Assumptions: linear X-Y relationship, normally distributed Y, constant residual variance (homoscedasticity), independent data points.

**Lasso (L1)** — adds penalty \`α·|slope|\`. Can drive irrelevant slopes to zero, removing variables entirely. Use when many variables are likely extraneous. *"The lasso catches weak animals and removes them."*

**Ridge (L2)** — adds penalty \`α·slope²\`. Shrinks correlated variables but never fully removes them. Use when multiple X's are correlated. *"Sitting on a ridge — the penalty prevents any one variable from dominating."*

**Logistic Regression** — predicts binary outcomes (0 or 1) based on a single variable threshold. Validate by checking for stable error and realistic results.

**Difference-in-Differences** — quantify the actual effect of a change by comparing at least two samples before and after the change (e.g. beta testers vs regular users).

Assumptions: parallel trends between subpopulations, all confounders observed, covariates span both subpopulations.

Validate causal effect: correlate possible mediators with the overall effect and verify the majority is explained by reasonable mediators. Verify robustness by altering model parameters or variable measurement methods.

**Propensity Score Matching** — use when the treatment group is systematically more likely to be affected. Quantify the propensity (likelihood of receiving treatment given all other variables) then match data points to equalize propensity across groups.

**Synthetic Control** — if treatment can be assigned to entire regions, deploy by region to test effect while avoiding propensity bias.

**Instrumental Variables** — use a variable immune to a problematic confounder. e.g. education → salary is confounded by ability; birth month affects education but is random per person.

**Meta-learners** — determine which subgroups respond better to a treatment.

**Decision Tree** — split data using decision rules to classify samples.

---

## Outliers

- *Skewed data*: use IQR. Values beyond 1.5×IQR outside Q1/Q3 are outliers.
- *Symmetric data*: use z-score. Typically flag values beyond 3 std devs (~0.25% most extreme).

---

## Combinations

How many ways to choose k items from n? \`C(n,k) = n! / k!(n-k)!\`

e.g. 3 heads out of 5 flips: \`C(5,3) = 5! / 3!2! = 10 ways\`

---

## Probability and Expectation

**Sampling with replacement** — how many dice rolls to roll a 6? \`E = 1/P(6) = 6\`

**Sampling without replacement** — how many card draws to draw a spade? \`E = (n+1)/(k+1) = 53/14 ≈ 3.8\`, slightly faster than with replacement because cards run out.

**Markov chain example** — expected rolls until 666:

Define 3 states:
\`\`\`
State 0: no progress (need 666)
  E0 = 1/6·(1 + E1) + 5/6·(1 + E0)

State 1: one 6 seen (need 66)
  E1 = 1/6·(1 + E2) + 5/6·(1 + E0)

State 2: two 6s seen (need final 6)
  E2 = 1/6·(1) + 5/6·(1 + E0)
\`\`\`

---

## Covariance

\`\`\`
Cov(X) = | σ²(1)            c·σ(1)·σ(2) |
         | c·σ(1)·σ(2)      σ²(2)       |
\`\`\`

For independent variables the off-diagonal terms are zero and variance of a linear combination simplifies to:
\`\`\`
σ²(z) = A²σ²(x) + B²σ²(y)    where z = Ax + By
\`\`\`

---

## Conditional Expectation

**Setup:** what is E(x₂ | x₁ + x₂ = n)?

**MMSE approach** — minimize squared error between x₂ and a linear estimate f(S) = aS + b:

\`\`\`
min E( (x2 - aS - b)² )
\`\`\`

**Solve for b** (derivative WRT b):
\`\`\`
2E(x2 - aS - b) = 0
b = E(x2) - aE(S) = m2 - aE(S)
\`\`\`

**Solve for a** (derivative WRT a):
\`\`\`
2E(S(x2 - aS - b)) = 0
E(Sx2) = aE(S²) + bE(S)
       = aE(S²) + (m2 - aE(S))·E(S)      ; substitute b
       = aE(S²) + m2·E(S) - a·E(S)²
E(Sx2) - m2·E(S) = a(E(S²) - E(S)²)
Cov(x2, S) = a·Var(S)
a = Cov(x2, S) / Var(S)
\`\`\`

**Plug into x̂₂ = aS + b:**
\`\`\`
x̂₂ = aS + m2 - aE(S)
x̂₂ = m2 + a(S - E(S))
\`\`\`

**General equation:**
\`\`\`
E(x | S) = m + (Cov(x, S) / Var(S)) · (S - E(S))
\`\`\`

**Example — S = x₁ + x₂ = n:**
\`\`\`
Cov(x2, x1+x2) = Cov(x2,x1) + Cov(x2,x2) = 0 + σ²(2)
Var(S)         = σ²(1) + σ²(2)
E(x2 | S=n)    = m2 + σ²(2)/(σ²(1)+σ²(2)) · (n - m1 - m2)
\`\`\`

---

## Business Metrics

**Growth** — gain of customers or revenue over a time period.

**Churn** — opposite of growth; loss of customers or revenue over a time period.`
  },

  machine_learning: {
    title: "Machine Learning",
    content: `# Machine Learning and Modeling

---

## Evaluation Metrics

### Precision vs Recall

| Metric | Formula | Intuition |
|--------|---------|-----------|
| **Precision** | \`TP / (TP + FP)\` | How stingy the model is — of everything it called positive, how many were actually positive? High precision = fewer false alarms |
| **Recall** | \`TP / (TP + FN)\` | How comprehensive the model is — of all actual positives, how many did it catch? High recall = fewer misses |

> Precision and recall trade off: increasing one typically decreases the other.

### F1 Score

\`\`\`
F1 = 2 · (precision · recall) / (precision + recall)
\`\`\`

Harmonic mean of precision and recall — penalizes extreme imbalance between the two.

---

## Models

### Principal Component Analysis (PCA)
Reduces dimensionality by combining variables into principal components (PCs).

**Uses:**
- Visualize variable clustering and understand the variable space
- Reduce dimensions for plotting
- Good first step before regression — reveals which variables are irrelevant or correlated

### Regression / Decision Tree
Determines which variables are strongly linearly correlated or irrelevant.

**Strengths:** Discovers nontrivial variables and interactions (e.g., \`var1 matters only if var2 > x\`)

**Weaknesses:** Biased by outliers, swaps correlated variables, unstable, prone to overfitting

### Shallow Tree
Human-readable decision tree — useful for diagnostics and checking for data leakage (e.g., "is this row near the end of the dataset?").

### Bootstrapped Dataset
Randomly sample with replacement from the dataset until desired size is reached.

### Random Forest
Trains many decision trees on bootstrapped datasets, then aggregates predictions by vote (**bagging**). Uses the **out-of-bag dataset** (rows absent from a given tree's bootstrap) to evaluate that tree.

**Out-of-bag error:** proportion of samples incorrectly predicted across all their respective out-of-bag trees.

Tune by varying the number of variables considered at each split until OOB error is minimized.

### Model Comparison Summary

| Situation | Recommended Model |
|-----------|------------------|
| Extreme variable space | PCA |
| Simple relationships | Regression |
| Complex / nonlinear relationships | Decision tree / Random forest |

---

## EDA Approaches

### Wide Data (challenging *variable space*)

1. **PCA** — see how variables group
2. **Lasso** — if many variables are likely extraneous
3. **Ridge** — if many variables are likely correlated
4. **Regression/decision tree** — only after pruning the variable space (risk of overfitting otherwise)
5. Check **stability** by repeating with data subsets (remove first/last n rows, random row, or slightly perturb a row)

### Tall Data (challenging *data generation*)

1. **Univariate and bivariate analysis** — does each variable behave as expected? Handle outliers, tails, time series patterns, Simpson's paradox, etc.
2. **Outlier handling** — use local density, transforms, or isolation forests. Options: manually remove (few outliers), split data by outlier type (many similar outliers), or add hard rules (\`age > 115\`)
3. Consider **splitting data** to effectively widen it (by year, season, product category, geography, etc.)
4. Analyze **stability of data generation** — check for drift
5. **Sample for visualization**
6. Visualize **residuals** to locate model weak points
7. Consider **logistic regression** if correlation is small but real
8. **Confirm conclusion** is robust — not driven by unrelated correlations or overfitting

---

## Outlier Detection

| Method | Notes |
|--------|-------|
| **Z-score** | Flag outliers based on distance from mean in std devs |
| **Transform** | Log, power, etc. — reel in non-linear data before modeling |

---

## Key Terms

| Term | Meaning |
|------|---------|
| **EDA** | Exploratory Data Analysis |
| **ETL** | Extract, Transform, Load |
| **GLM** | General Linearized Model |
| **OLS** | Ordinary Least Squares (linear regression) |
| **PCA** | Principal Component Analysis |
| **Bagging** | Bootstrap Aggregating (used in Random Forests) |
| **OOB** | Out-of-bag (data not used in a given bootstrap sample) |`
  },

  python: {
    title: "Python",
    content: `# Python

---

## Primitives

\`\`\`python
round(3.1415, 2)        # → 3.14
float('inf')            # positive infinity
float('-inf')           # negative infinity

n % 2 == 0              # even
n % 2 == 1              # odd
\`\`\`

---

## Lists

\`\`\`python
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
\`\`\`

### Matrix / List of Lists

\`\`\`python
new_mat = [[None] * list_length for i in range(num_lists)]
\`\`\`

---

## Strings

\`\`\`python
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
\`\`\`

---

## Sets

\`\`\`python
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
\`\`\`

---

## Dictionaries

\`\`\`python
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
\`\`\`

---

## Heaps

Python's \`heapq\` is a **min-heap** by default. Negate values to simulate a max-heap.

\`\`\`python
import heapq

heap = []
heapq.heappush(heap, num)
heapq.heappop(heap)            # removes and returns smallest

can even add lists to a heap and it'll always hold the smallest based on index 0:
heapq.heappush(heap, (val, obj))
val, smallestObj = heapq.heappop(heap)
\`\`\`

### Two-Heap Pattern (track median)

\`\`\`python
self.big_heap = []    # max-heap of lower half (store negated)
self.small_heap = []  # min-heap of upper half

heapq.heappush(self.big_heap, num)
s = heapq.heappop(self.big_heap)
heapq.heappush(self.small_heap, -s)

# Rebalance
if len(self.small_heap) > len(self.big_heap):
    extra = heapq.heappop(self.small_heap)
    heapq.heappush(self.big_heap, -extra)
\`\`\`

> Generalizes to tracking arbitrary percentiles with more heaps.

---

## Deques

\`\`\`python
from collections import deque

dq = deque(iterable)
dq.append(item)         # add right
dq.appendleft(item)     # add left
dq.pop()                # remove right
dq.popleft()            # remove left
\`\`\`

---

## Functional: \`map\` / \`filter\` / Lambda

\`\`\`python
# map: apply function to each element
result = map(lambda x: x * 2, nums)

# filter: keep elements where function is True
result = filter(lambda x: x > 0, nums)

# Chaining: for each row in arr, keep positives and square them
ans = map(
    lambda row: map(lambda x: x * x, filter(lambda x: x > 0, row)),
    arr
)
\`\`\`

> Note: \`map\` and \`filter\` return lazy iterators — wrap in \`list()\` to evaluate.

---

## Sorting

\`\`\`python
lst.sort(reverse=True)           # in-place
sorted(iterable, reverse=False)  # returns new list

# Quicksort via frequency count: build freq dict, reconstruct sorted list
\`\`\`

---

## Graph Traversal: BFS / DFS

Use for complex search over grids, graphs, or interconnected arrays.

### Template

\`\`\`python
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
\`\`\`

### Variations

- **Reverse BFS/DFS**: seed the queue with known endpoints and work backward
- **Multiple queues/maps**: pass different \`queue\`/\`visited\` pairs to the same function
- **Bidirectional BFS**: run forward + backward inside the same loop for faster search when start and end are both known`
  },

  sql: {
    title: "SQL",
    content: `# SQL

---
## Things I missed

\`\`\`sql
EXTRACT(??? FROM date_column)          -- generic extraction
EXTRACT(EPOCH FROM event_timestamp1 - event_timestamp2) -- gets total delta in seconds for timestamps
event_date1 - event_date2 -- gets total delta in days for dates
timestamp::time -- gets the time from a timestamp
TO_CHAR(date, 'Month')                 -- → 'January'
CONCAT('string', ' ', 'string')
STRING_AGG(col, ', ')                  -- for a group query
TO_DATE(input_year::text || '-' || input_days_of_year::text, 'IYYY-ID')
WHERE email ~ '^[a-zA-Z0-9_]*@[a-zA-Z]*\\.com$'
INITCAP('this is a-string! ok?')       -- produces 'This Is A-String! Ok?'
AVG(col)  OVER(ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)
LEAD(id, 1) OVER(ORDER BY col)
WHERE MOD(num, 2) = 1
DELETE FROM table WHERE ...
UPDATE table
SET col = ....
\`\`\`

## Dates

### Date Types

| Type | Notes |
|------|-------|
| \`DATE\` | Calendar date only |
| \`TIMESTAMP\` | Date + time |
| \`STRING\` | Non-date; must be cast before date operations |

### Casting

\`\`\`sql
entry::DATE
entry::TIMESTAMP
\`\`\`

### Extracting Parts

\`\`\`sql
EXTRACT(??? FROM date_column)          -- generic extraction

TO_CHAR(date, 'Month')                 -- → 'January'
TO_CHAR(date, 'Mon')                   -- → 'Jan'

-- Combine parts into a label
CONCAT(TO_CHAR(date, 'Mon'), '-', EXTRACT(YEAR FROM date))  -- → 'Jan-2025'
\`\`\`

### Building Dates from Parts

\`\`\`sql
-- From year + day-of-year using format strings
TO_DATE(input_year::text || '-' || input_days_of_year::text, 'IYYY-ID')
-- Supports custom formats: 'YYYY-DDD', 'YYYY-WWW-DDD-HHH', etc.

-- From explicit year/month/day
MAKE_DATE(year, month, day)

-- From year + day-of-year via arithmetic
SELECT MAKE_DATE(input_year, 1, 1) + INTERVAL '1 day' * (input_days_of_year - 1)
\`\`\`

### Date Filtering

\`\`\`sql
-- BETWEEN uses 00:00:00 if no time specified
TIMESTAMP (or date) BETWEEN '' AND ''
\`\`\`

---

## Strings

\`\`\`sql
SUBSTRING('string, 2, 2)              -- gives 'tr' start from letter 2, and show 2 letters
SUBSTRING('string, 3)                 -- gives 'ring' start from letter 3 and go till the end
LEFT('string', 3)                     -- extract first 3 characters
LENGTH(string)                        -- character count
CONCAT('string', ' ', col)            -- combine strings and column values
'string' || 's'                       -- same as concat but easier to read
STRING_AGG(col, ', ')                 -- concat many items typically as part of a group by query
WHERE email ~ '^[A-Za-z][A-Za-z0-9._-]*@leetcode\\.com$'
WHERE description ~ '\\ySN[0-9][0-9][0-9][0-9]\\-[0-9][0-9][0-9][0-9]\\y'

    col ~ '[ABC]'                 -- Are any of the chars good?
    col !~ '[ABC]'                -- Are none of the chars good?
    col ~ '[^ABC]'                -- Is at least one char bad?
    col !~ '[^ABC]'               -- Are all of the chars good?

INITCAP('this is a-string! ok?')     -- produces 'This Is A-String! Ok?'
\`\`\`

---

## Window Functions

### Ranking

\`\`\`sql
ROW_NUMBER() OVER(...)         -- rank moves on even for ties 1,2,3,4,...
RANK()        OVER(...)        -- rank skips for ties 1,1,3,4,...
DENSE_RANK()                   -- guarantees assignment of all ranks 1,1,2,3,...

OFFSET 1                       -- skip the first 1 rows
\`\`\`

### Moving Averages / Running Totals

\`\`\`sql
AVG(col)  OVER(PARTITION BY user ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)  AS  moving_avg
SUM(col)  OVER(PARTITION BY user ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)  AS  moving_sum
SUM(col)  OVER(ORDER BY date)  AS  running_total
\`\`\`

### Lag / Lead

\`\`\`sql
-- Select the value from 1 row prior (within partition)
LAG(id, 1) OVER(PARTITION BY col ORDER BY col)
LEAD(id, 1) OVER(ORDER BY col)
\`\`\`

---

## Numeric / Type Handling

\`\`\`sql
-- Types matter for math: use float, numeric, or integer as needed
ROUND(123::NUMERIC, 2)          -- → 123.00  (NUMERIC required for ROUND)

COUNT(DISTINCT col)
\`\`\`

---

## Handling NULLs / Empty Cells

\`\`\`sql
COALESCE(col_name, 0)           -- replace NULL with 0

SELECT 1 AS num
WHERE num != 1                  -- gives an empty table

SELECT (
SELECT 1 AS num
WHERE num != 1
)                               -- gives null
\`\`\`

---

## Set Operations

\`\`\`sql
UNION ALL                       -- combine result sets (keeps duplicates)
\`\`\`

---

## Joins

\`\`\`sql
JOIN aka INNER JOIN: select a row each time a match is found (exclude null matches)
LEFT JOIN : select a row each time a match is found and use null for right side if no match
FULL JOIN : select a row each time a match is found and use null for EITHER side if no match
OUTER JOIN : select only the rows without a match
NATURAL JOIN : automatically selects the matching column names then does regular JOIN
CROSS JOIN : force pair all rows with all rows of the other side (no ON line)
\`\`\`

---

## CTEs (common table expression) and Scalar Variables

\`\`\`sql
WITH order_counts AS (
    SELECT COUNT(order_id) AS total_orders
    FROM orders
)

SELECT ...
FROM ...
CROSS JOIN order_counts   -- injects total_orders into every row

WITH RECURSIVE cte_name AS (
    -- 1. Anchor Member (Initial non-recursive query)
    SELECT columns FROM table WHERE condition

    UNION ALL

    -- 2. Recursive Member (Refers back to cte_name)
    SELECT columns FROM table
    JOIN cte_name ON table.parent_id = cte_name.id
)
-- 3. Final Query
SELECT * FROM cte_name;
\`\`\`

---

## Groups and partitions and subqueries

\`\`\`sql
-- Using subquery
SELECT e.event
FROM events AS e
LEFT JOIN (
    SELECT date, COUNT(*) as cnt
    FROM events
    GROUP BY 1
    ) AS d
ON e.date = d.date
WHERE d.cnt = 1

-- Using CTE
WITH d AS (
        SELECT date, COUNT(*) AS cnt
        FROM events
        GROUP BY 1
        )
SELECT e.event
FROM events AS e
LEFT JOIN d
ON e.date = d.date
WHERE d.cnt = 1

-- Using partition inside subquery
SELECT event
FROM(
    SELECT event,
           COUNT(*) OVER(PARTITION BY date) AS cnt
    FROM events
    ) AS sub
WHERE cnt = 1
\`\`\`

---

## Misc

\`\`\`sql
WHERE MOD(num, 2) = 1           -- Filter for odd numbers

DELETE FROM table WHERE ...

DELETE FROM events as e1
USING events as e2
WHERE e1.event = e2.event
AND e1.date < e2.date           -- removes duplicates, keeps most recent

UPDATE table
SET col = ....                  -- directly change table
\`\`\``
  },

  behavioral: {
    title: "Behavioral",
    content: `# Behavioral

---

## Setbacks, failure, made a mistake, extra hard problem
ZnO synthesis and failed ML
ZnO synthesis and optimization
S. Too many synthetic options making it expensive to find a working prep. Multiple groups work different angles.
T. Find a new stradegy to avoid the expensive brute force stradegy. Provide progress updates to inform grant writers for upcoming renewal.
A. I took a step back and considered the historic progress and what we still needed to do. We need a totally different approach. I advocated for a two-pronged stradegy: 
-statisitcal: study of the best prep so far in which many single particles are measured repeatedly to obtain a quantitative summary of the material.
-ML: study all published materials to identify a new prep route. The data was small. (regeression algorithms that usual work for small datasets with interacting features: decision tree, random forest, k-NN, bagging.)
R. Two-fold:
-statistic: We obtained preliminary results, but it is very slow and still and we are "cherry-picking" particles. 
-ML: Modeling did not converge on a working solution. Validation repeatedly failed which we think was due to the small sample size. 
The statistical aproach was only partly successful and the ML approach failed, but we were at least able to provide enough information to the grant team for renewal. Indeed we were renewed for antoher 5 year cycle at 20 million. 

## Limited time, deadline
ZnO synthesis and optimization
S. Too many synthetic options making it expensive to find a working prep. Multiple groups work different angles. A grant renewal was coming up and we needed to show progress to keep the funding.
T. Find a new stradegy to avoid the expensive brute force stradegy. Provide a progress updates.
A. I took a step back and considered the historic progress and what we still needed to do. We need a totally different approach. I advocated for a two-pronged stradegy: 
-statisitcal: study of the best prep so far in which many single particles are measured repeatedly to obtain a quantitative summary of the material.
-ML: study all published materials to identify a new prep route. The data was small. (regeression algorithms that usual work for small datasets with interacting features: decision tree, random forest, k-NN, bagging.)
R. Two-fold:
-statistic: We obtained preliminary results, but it is very slow and still and we are "cherry-picking" particles. 
-ML: Modeling did not converge on a working solution. Validation repeatedly failed which we think was due to the small sample size. 
The statistical aproach was only partly successful and the ML approach failed, but we were at least able to provide enough information to the grant team for renewal. Indeed we were renewed for antoher 5 year cycle at 20 million.

## Difficult decision
Main project change
S. I had been working on a material for 2 years and haven't been able to publish due to material challenges. In my program, we usual study for about 5-6 years, so I was nearing the halfway mark without significant progress.
T. I had to decided whether to continue push on it and possible limit myself to weaker publications, or switch projects and start again.
A. After dicussions with mentors and collegyues, I decided to switch projects and risk spending a lot more time on a new project which will have its own challenges. I continued to work on the prior project a a collaboration but my focus shifted to the new one.
R. I found success with the new material and although it took another year before I could start writing my first manuscript, the the new direction was rewarding. I learned new skills that werent relevant to the prior project and multiple splitoff projects emerged. I graduated on time with two publications and the lab was transformed: now 5 memebers work with related materials.

## Multiple projects
Final projects + Thesis
S. I was leading multiple projects including fundemental research of a new material, continued applied research with a big team on a well-studied material, writing my thesis as my PhD defense was in 5 months, mentoring a undergraduate, and starting a new project. 
T. I need to balance these projects. Ensure I am prepared for my PhD Defense, get my main project to publication ready before graduating, and ensure the other projects are in good hands.
A. I always keep a live timeline.
1. For each project, consider what deadlines exits.
2. Consider my vision for the project I own and my Defense prep.
3. Make a written timeline with end goals and subgoals, while consider how long each portion will take.
4. After all of this, decide what is realistic. I decided I don't have time to complete the new project, so I prioritized handing it off to a trusted coworker. I selected them personally becasuse this project was challening and required someone skilled. Then, I perfomed experiments with them to mentor them, prepare them for the project, and build trust. Each week, I would update my timeline as needed and shift my priorities to stay on task. Nearing my Defense, the collaborative project did not seem likely to conlcude, so I prepared detailed documentation so others can replicate my work after I leave.
R. I finished my thesis 3 weeks in advance, allowing plenty of time for practice and clearing up other admin responsibilities. My main publication was submitted before my Defense. It since published in Spring. The new project was handed off successfully and he is now working on it independently.

## Use data to make project desisions
Data pipeline EDA
S. Our lab relies heavily on brute force data workup from multiple instruments for a variety of different experiments. We often spend hours in the middle of an experiment working up data to make decisions. Sometimes this takes too long, so we end up making a rash call without fully understanding the data.
T. I wanted to improve the data analytics pipeline by tranforming the current system to both improve experiment efficiency, reducing costs, and also imporve the decision making process using more data to improve results. This should also serve to simplify the current software stack by consolidating everything into a more unviersal Python-based system.
A. I worked with other users to make a list of all experiments, instruments, and data types relevant to the system in question. I also checked with everyone to make sure they would be happy with the switch to a new system. I outliined the framework in collaboration with a software tech first: python libraries for communication with the inputs (GPIB, USB), data storage using Postgres, and automatic analysis in Python. The simple UI enables selecting for the experiment type for data base information and automatic EDA. The EDA includes quick checks for parameters like SNR, baseline drift, anomaly detection, and outliers.
R. I discussed the new process with users and everyone agreed that the new system is faster and more intuitive. On average users reported that they finished routine experiments ~50% faster, making more time for their specialized experiments. Also, the data base serves as a baseline standard for "good" data, ensuring high standards in the future.

## Redesign a system, change
Data pipeline EDA
S. Our lab relies heavily on brute force data workup from multiple instruments for a variety of different experiments. We often spend hours in the middle of an experiment working up data to make decisions. Sometimes this takes too long, so we end up making a rash call without fully understanding the data.
T. I wanted to improve the data analytics pipeline by tranforming the current system to both improve experiment efficiency, reducing costs, and also imporve the decision making process using more data to improve results. This should also serve to simplify the current software stack by consolidating everything into a more unviersal Python-based system.
A. I worked with other users to make a list of all experiments, instruments, and data types relevant to the system in question. I also checked with everyone to make sure they would be happy with the switch to a new system. I outliined the framework in collaboration with a software tech first: python libraries for communication with the inputs (GPIB, USB), data storage using Postgres, and automatic analysis in Python. The simple UI enables selecting for the experiment type for data base information and automatic EDA. The EDA includes quick checks for parameters like SNR, baseline drift, anomaly detection, and outliers.
R. I discussed the new process with users and everyone agreed that the new system is faster and more intuitive. On average users reported that they finished routine experiments ~50% faster, making more time for their specialized experiments. Also, the data base serves as a baseline standard for "good" data, ensuring high standards in the future.

## Outside comfort zone, new skills
Lab reservations
Context for first time it comes up: The addition of a Ti:S laser which I installed and a PC setup someone else installed, key instruments on a shared area are booked over a month in advance, which makes quick turnaround on urgent projects impossible. Also, it leads to frustration among labmates and competition to collect more bookings. This snowballed, and at one point the most important instrument, the PL Table, was booked for 3 months straight. I decided that although the demand has increased a lot due to new capabilities, it should be possible to meet demand by increasing capacity. I intuitively thought we were not utilizing the table efficiently. By improving utilization, we can boost data output without increase the cost at all.
S. We already adopted new rules around bookings: only book when you have an experiment, plan ahead and include details in the reservation, only book 2 days per week on high-use instruments. This was working, but I knew it was fragile and could be better. I need to find a way to better monitor bookings even after I graduate.
T. I discussed with other users and found out most are very open to switching away from google calendar which is often hard to use and hard to monitor. I decided to create own instrument reservation system. Although I had no webdevelopment expererience, I knew this was the best solution in the long-run.
A. I created a working reservation system using Cursor and Claude Code. I frequenly discussed different features, the UI, and managemnt opotions with labmates along the way to ensure everyone was supportive and satisfied. It had several improvments over the google calwendar systmem like easy monitoring of bookings, better mobile support, email services for booking rules, user-specific data tracking, and easy control of booking rules and limits.
R. I finished the app in around 2 months and everyone started using it on the same day. I chatted with other users and they all agreed its much better. I also made detailed documentation in case someone wants to make changes in the future. The lab is still using this system and when I checked recently, they only have about 2 weeks of bookings.

## Disagreement with a coworker
Instrument layout
S. New research directions required changes to the instrument layout for part of our labspace to ensure efficiency. This included around 15 instruments and numerous supporting equipment for about 6 key measurement types.
T. Determine the best instrument layout for current and future needs.
A. I worked with labmates to brainstorm all the experiments we would likely perform in the future and their dependencies. There was no single best layout because each served some experiments better than others. So, users were in favor of the layout that tended to benefit their own lab work more. For example, I preferred layout A whereas a labmate preferred layout B. I can recognize both have benefits, but I knew layout A was actually superior because it better suited the much more frequent measurement types. Layout A could be tweaked slightly to accomodate, and it would take about an hour extra each time. This was a big ask for the other user because they would be subject to this hour each time they run an experiment. However, layout B was actually incompatible with a more popular measurement. I wanted to get the user on board with my layout, so I first sat down with them and discussed their futuure project directions. I helped them see than they would soon be needing these capabilities and although the layout will take more time now, it will improve their data overall in the long-run. Our lab has high standards for our publications so better data is always the priority. They agreed, but we wanted to make sure the also that the layout was objectively better using numbers. The two of us worked together to quantify the time impact of each layout on each measurement. In the end, layout A was about 25% more efficient than layout B.
R. The lab was able to unify in choosing layout A. By earning that other user's trust, they volunteered to help set up, so they were able to give helpful tips that benefitted everyone.

## Different workstyle
Planner vs Go with the flow
S. Everyone has a different work style. Some are detail oriented and have specific routines. Others are more flexible and take things hour by hour by feel. I tend to prefer to plan ahead with more detail and anticipate what I want to accomplish each day. I plan to start at a certain time and finish a certain set of tasks. So, when I was working on a collaboration with a labmate who prefers to make decisions at the last minute, we sometimes had disagreements. We had to perform some highlty complex measurements as a team because we were each experts with a potion of the measurement. However, he would often arrive late on the day of our experiment or suddenly decide to break for lunch in the middle of a measurement. On the other hand, I would sometimes have to leave early for other responsibilities. All this lead to slower progress becasue we had different work styles.
T. I wanted to find a way to work with him more efficiently to improve our project speed and save resouces on the high-demand instrument. This would help our project and also save days for others to use the instrument.
A. I sat down with him and explained my perspective on planning the workday and keeping to our scheduled commitments. I recognized that he is also highly efficient and successful in this projects, but when working as a team, we must accomodate each other to work efficiently togother. He understood pretty much right away and he actually was pleased that I came to him directly in this way. Upfront and direct. He said he feels like others in the lab treat him differently because they think he doesn't work that hard, but they never actually bring it up with him. I pointed out that he was actually doing the same thing as them: being avoidant. I suggested he confront those other labmates himself if he feels like things are awkward. I found out he ended up talking to them about, but I don't know the details. At least iuty seemed like they were more cordial.

## Team project 
Final project
S. I was leading multiple projects including fundemental research of a new material and continued applied research with a big team on a well-studied material. 
T. I need to balance my time, maintain effective leadership, and build successful teammates.
A. I always keep a live timeline.
1. For each project, consider the dealines.
2. Consider my vision for each projects.
3. And actually write down the goals and subgoals.
4. Then, decide what is realistic and what needs to be adjusted. For example, I realized I wouldn't be able to finish part of a project, so I selected my best labmate and perfomed experiments with them to mentor them, prepare them for the project, and build trust. Each week, I would update my timeline as needed and shift my priorities to stay on task.
R. This type of contstant self review and communication is crucial. OOthers are often surpirsed by how collaborative my teams are. In the end, I was able to finalized two of my projects, see two other labmates take owndership of two new projects, and ensure my third project was left in good hands.

## Motivate a team to follow
Lab reservations
Context for first time it comes up: The addition of a Ti:S laser which I installed and a PC setup someone else installed, key instruments on a shared area are booked over a month in advance, which makes quick turnaround on urgent projects impossible. Also, it leads to frustration among labmates and competition to collect more bookings. This snowballed, and at one point the most important instrument, the PL Table, was booked for 3 months straight. I decided that although the demand has increased a lot due to new capabilities, it should be possible to meet demand by increasing capacity. I intuitively thought we were not utilizing the table efficiently. By improving utilization, we can boost data output without increase the cost at all.
S. I was discussing ways to improve insturment utilization with the lab to improve turn-around times and reduce the backlog on the PL Table. I already had a good intuition for the cause and solution: require more booking details and don't overbook to make sure users are prepared and only use the time they need. Some gave pushback claiming they are using the instrument efficiently even without putting detail in the booking. Others worried that some would refuse to change because I have no proof. I tried to console them and ensure that I would work with users to ensure they follow the new rules, but in the end I had to accept the criticism even though I knew my perspective was likely valid.
T. To motivate the lab, I had to prove myself with data.
A. I analyze past bookings and usage data python-based  data exctraction (ETL working with the google API for bookings and a simply text extraction stradegy for the data file storage.) I  mapped the file count to data and reservation details. I model these data to analyze the impact of booking detail on file count and found a strong correlation. Around 2% more usage per word and nearly double usage when mentioning a key light source. I quickly brought it up in a meeting and required that anyone booking include detailed notes in their reservation and only book if you actual know what experiment you are doing. We also made a weekly maximum of 2 days booked.
R. Everyone came on board after seeing the data and after a few weeks, the backlog was down to just about a month. I worried that the improvement was a coincidence because this study was just correlative and the backlog simply resolved on its own rather than by boosting utilization. To prove to myself and the team that we made the right call and ensure this practice is beneficial, I performed causal inference. I found that indeed, the utilization increased by ~50% and nearly 100% of this increase is directly caused by increased reservation detail hinging around the policy date.

## Present a complex project
S. My work has always been highly complex and I usually present to crowds who know little of the field I work in, so I've learned techniques for presenting. For example, I presented my work at a university workshop in which there were students and professors from various STEM labs totally unfamiliar with my field.
T. I had to prepare a clear story to convey main ideas to inexperienced listeners while also hitting the key findings for relevant professors.
A. I always start on paper and draw pickture of the key results I want to convey. Then I try talking through the finds out loud until the order makes sense. Then I draft a presentation. I aim to make only one point on each slide to keep to simple. No matter the preparation, sometimes the message may still be unclear to some. In this case, I make sure to emphasize the most compelx or most important findings at the end just before opening up to questions so its fresh in their mind.
R. I presented my work and several people came up to me to compliment the clarity and helpful illustrations I used. We were also able to start a new collboration with a computational group.
`
  },

  web_development: {
    title: "Web Development",
    content: `# Web Development

---

## HTML

**Role:** Structure and content — defines *what* is on the page and *what each thing is* (text, link, image, etc.)

- Include content: what text to write and where
- Define the identity of each element (text, link, graphic, etc.)
- Link to other pages
- **Avoid** using tags to control appearance — delegate that to CSS

---

## CSS

**Role:** Style and presentation — defines *how* the page looks

### Types (prefer external)

| Type | Description | Use? |
|------|-------------|------|
| Inline | CSS directly in HTML tag | Only for one-off single occurrences |
| Internal | \`<style>\` block in HTML | Avoid |
| External | Linked \`.css\` file | Always prefer this |

- Use \`styles.css\` as the main stylesheet

---

## Bootstrap / Angular

**Role:** Premade CSS and UI components for frontend

- Insert components into HTML as needed
- Trusted, consistent, well-documented
- Access via a **CDN (Content Delivery Network)** — no local install needed

---

## JavaScript

**Role:** Complex computation, interactivity, and logic on the frontend

- Interpreted line by line (like Python)
- **Style guide:** Follow idiomatic.js for consistent code structure

### Tips

- Aim for **minimal styles and minimal JS first** — add complexity only as needed

---

## Backend

**Role:** The logic layer running 24/7; includes databases and server-side processing

- Can be written in Python, JavaScript, Java, etc.
- Each language has its own framework (e.g., Django for Python, Node.js for JS)
- **Java + Spring Boot** for better performance and reliability at scale

---

## Frameworks (e.g., Node.js for JS)

**Role:** Abstracts low-level backend plumbing so you can write application logic faster

- Provides a runtime environment for local development
- Enables faster development cycles
- Runs synchronously (always-on server process)

### Node.js Tips

- **Nodemon** — integrates live code changes with the running server (auto-restart on save)`
  }
};
