# Statistics and Probability

---

## Core Concepts

**p-value**
Probability of observing a result at least as extreme as the one seen, *assuming the null hypothesis is true* (e.g., the dice is fair). Typically, **p < 0.05** is considered statistically significant (suggests the null is false).

**Expected Value (E)**

When p is known: `E = 1/p` where p is the probability of success per attempt.

When p is unknown (unbounded chain of events until success):
```
E₀ = 1 + P(E₀→E₁)·E₁ + ... + P(Eₙ₋₁→Eₙ)·Eₙ + P(E₀→E₀)·E₀
E₁ = 1 + P(E₁→E₂)·E₂ + ... + P(Eₙ₋₁→Eₙ)·Eₙ + P(E₁→E₀)·E₀
...
Eₙ = 1 + P(Eₙ→success)·0 + P(Eₙ→E₀)·E₀
```
Generalization (min of n): `E[min(X, Y, ...n)] = 1/(n+1)` — like the average segment length after placing n random dots on a line of length 1.

**Central Limit Theorem (CLT)**
For large enough n, the distribution of sample means will approach normal, regardless of the underlying population distribution.

---

## Distributions

**Uniform** — constant probability across a specific region. Also known as a rectangle distribution.

**CDF and PDF**

| Function | Definition | Use |
|----------|-----------|-----|
| CDF — `F_Z(z) = P(Z < z)` | Cumulative probability up to z | Binomial analysis, percentiles |
| PDF — `f_Z(z) = d/dz F_Z(z)` | Probability density at z | Finding E via `E = ∫ z·f_Z(z) dz` |

---

**Gaussian (Normal)** — fully defined by mean and variance.

| Parameter | Definition |
|---|---|
| Mean | μ |
| Variance | σ² |
| PDF | `f(x) = 1/(σ·√(2π)) · exp[−½·((x−μ)/σ)²]` |

Combining multiple distributions: mean = μ₁ + μ₂, variance = σ²₁ + σ²₂.

---

**Binomial** — models number of successes in n independent trials, each with success probability p.

| Parameter | Definition |
|---|---|
| Mean | `μ = n·p` |
| Variance by sample size | `σ² = n·p·(1−p)` |
| Variance by mean | `σ² = μ·(1−p)` — always less than μ |
| PMF | `P(X=k) = C(n,k) · pᵏ · (1−p)^(n−k)` |

- PMF is probability of getting k successes in n trials for success probability p per trial
- Variance always less than mean
- PDF is always symmetric about the mean
- As n→∞ and p→0 with np=λ fixed, converges to Poisson

---

**Poisson** — models count frequency for pure independent event statistics.

| Parameter | Definition |
|---|---|
| Mean | `μ = λ` — expected frequency |
| Variance | `σ² = λ = μ` — variance equals mean exactly |
| PMF | `P(X=k) = λᵏ · e^(−λ) / k!` |

- Is a transformation of the binomial by taking limits of large trials, small p, and np = λ (constant success rate)
- **Overdispersion**: variance too large for Poisson; caused by hidden variables, excess zeros, clustering, human factors. Poisson is usually not practical in the real world.

*Quasi-Poisson* — adds a dispersion factor φ for slight overdispersion: `σ² = φ·λ`

---

**Negative Binomial** — allows variance to increase faster than the mean: `Variance = mean + α · mean²`

| Parameter | Definition |
|---|---|
| Mean | `μ = r·(1−p)/p` |
| Variance by parameter | `σ² = r·(1−p)/p²` |
| Variance by mean | `σ² = μ + α·μ²` where `α = 1/r` |
| PMF | `P(X=k) = C(k+r−1, k) · pʳ · (1−p)ᵏ` |

- PMF is the probability of getting r successes before failing r times. r is constrained instead of n
- Better choice than Quasi-Poisson for heavier overdispersion

---

## Variance and Standard Deviation

```
Variance of single trial         = p(1-p)
  e.g. uncertainty of one coin flip heads = 0.25

Variance of mean counts of n trials = n·p·(1-p)
  e.g. 100 coin flips, heads count varies from 50 by ±5 (std dev = 5)

Variance in mean proportion of n trials = p·(1−p)/n
  e.g. 100 coin flips repeated, proportion of heads varies by ±5% (std dev = 5%)

Variance of mean height of n people — no closed form; must use σ from population or large sample.
  std dev of sum of heights of n people = √(n) σ
  std dev of mean of heights of n people = σ / √(n)
```

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

**Explicit definitions**
```
Variance = SUM((value − mean)²) / n
Std dev  = √(SUM((value − mean)²) / n)
Var(X)   = E[(X − E[X])²] = E[X²] − (E[X])²
```

**z-score vs t-score**

Both test how unlikely an observation is under the null hypothesis.
- *z-score*: use for large n or when population stats are known
- *t-score*: use when n < ~30; adjusted table values account for small sample uncertainty

---

## Regression, Classification, and Inference

**Linear Regression (OLS)** — minimize the sum of squared residuals.

Assumptions: linear X-Y relationship, normally distributed Y, constant residual variance (homoscedasticity), independent data points.

**Lasso (L1)** — adds penalty `α·|slope|`. Can drive irrelevant slopes to zero, removing variables entirely. Use when many variables are likely extraneous. *"The lasso catches weak animals and removes them."*

**Ridge (L2)** — adds penalty `α·slope²`. Shrinks correlated variables but never fully removes them. Use when multiple X's are correlated. *"Sitting on a ridge — the penalty prevents any one variable from dominating."*

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

How many ways to choose k items from n? `C(n,k) = n! / k!(n-k)!`

e.g. 3 heads out of 5 flips: `C(5,3) = 5! / 3!2! = 10 ways`

---

## Probability and Expectation

**Sampling with replacement** — how many dice rolls to roll a 6? `E = 1/P(6) = 6`

**Sampling without replacement** — how many card draws to draw a spade? `E = (n+1)/(k+1) = 53/14 ≈ 3.8`, slightly faster than with replacement because cards run out.

**Markov chain example** — expected rolls until 666:

Define 3 states:
```
State 0: no progress (need 666)
  E0 = 1/6·(1 + E1) + 5/6·(1 + E0)

State 1: one 6 seen (need 66)
  E1 = 1/6·(1 + E2) + 5/6·(1 + E0)

State 2: two 6s seen (need final 6)
  E2 = 1/6·(1) + 5/6·(1 + E0)
```

---

## Covariance

```
Cov(X) = | σ²(1)            c·σ(1)·σ(2) |
         | c·σ(1)·σ(2)      σ²(2)       |
```

For independent variables the off-diagonal terms are zero and variance of a linear combination simplifies to:
```
σ²(z) = A²σ²(x) + B²σ²(y)    where z = Ax + By
```

---

## Conditional Expectation

**Setup:** what is E(x₂ | x₁ + x₂ = n)?

**MMSE approach** — minimize squared error between x₂ and a linear estimate f(S) = aS + b:

```
min E( (x2 - aS - b)² )
```

**Solve for b** (derivative WRT b):
```
2E(x2 - aS - b) = 0
b = E(x2) - aE(S) = m2 - aE(S)
```

**Solve for a** (derivative WRT a):
```
2E(S(x2 - aS - b)) = 0
E(Sx2) = aE(S²) + bE(S)
       = aE(S²) + (m2 - aE(S))·E(S)      ; substitute b
       = aE(S²) + m2·E(S) - a·E(S)²
E(Sx2) - m2·E(S) = a(E(S²) - E(S)²)
Cov(x2, S) = a·Var(S)
a = Cov(x2, S) / Var(S)
```

**Plug into x̂₂ = aS + b:**
```
x̂₂ = aS + m2 - aE(S)
x̂₂ = m2 + a(S - E(S))
```

**General equation:**
```
E(x | S) = m + (Cov(x, S) / Var(S)) · (S - E(S))
```

**Example — S = x₁ + x₂ = n:**
```
Cov(x2, x1+x2) = Cov(x2,x1) + Cov(x2,x2) = 0 + σ²(2)
Var(S)         = σ²(1) + σ²(2)
E(x2 | S=n)    = m2 + σ²(2)/(σ²(1)+σ²(2)) · (n - m1 - m2)
```

---

## Business Metrics

**Growth** — gain of customers or revenue over a time period.

**Churn** — opposite of growth; loss of customers or revenue over a time period.
