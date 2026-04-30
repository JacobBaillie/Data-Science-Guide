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
