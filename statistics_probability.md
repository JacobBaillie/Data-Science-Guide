# Statistics and Probability

---

## Core Concepts

### p-value
Probability of observing a result at least as extreme as the one seen, *assuming the null hypothesis is true* (e.g., the dice is fair). Typically, **p < 0.05** is considered statistically significant (suggests the null is false).

### Expected Value (E)
- **When p is known:** `E = 1/p` where p is the probability of success per attempt
- **When p is unknown** (unbounded chain of events until success):

```
E₀ = 1 + P(E₀→E₁)·E₁ + ... + P(Eₙ₋₁→Eₙ)·Eₙ + P(E₀→E₀)·E₀
E₁ = 1 + P(E₁→E₂)·E₂ + ... + P(Eₙ₋₁→Eₙ)·Eₙ + P(E₁→E₀)·E₀
...
Eₙ = 1 + P(Eₙ→success)·0 + P(Eₙ→E₀)·E₀
```

**Generalization (min of n):** `E[min(X, Y, ...n)] = 1/(n+1)`
— like the average segment length after placing n random dots on a line of length 1.

### Central Limit Theorem (CLT)
For large enough n, the **distribution of sample means** will approach normal, regardless of the underlying population distribution.

---

## Variance and Standard Deviation

```
Variance (σ²)  = n·p·(1−p)         # binomial
Std dev  (σ)   = √(variance)

# From a sample:
Variance = SUM((value − mean)²) / n
Std dev  = √(SUM((value − mean)²) / n)
```

### Deeper Definition

```
Var(X) = E[(X − E[X])²]
       = E[X²] − (E[X])²
```

> The average of squared values is larger than the square of the average — squaring first amplifies large values more than averaging first does.

### z-score
Number of standard deviations a value falls from the expected value / mean.

---

## Distributions

### Gaussian (Normal)

```
f(x) = 1/(σ·√(2π)) · exp[−½·((x−μ)²/σ²)]
```

Defined by mean (μ) and variance (σ²).

### CDF and PDF

| Function | Definition | Use |
|----------|-----------|-----|
| **CDF** — `F_Z(z) = P(Z < z)` | Cumulative probability up to z | Binomial analysis, percentiles |
| **PDF** — `f_Z(z) = d/dz F_Z(z)` | Probability density at z | Finding E via `E = ∫ z·f_Z(z) dz` |

> If you know the PDF, you can solve for E directly: `E = ∫ z·f(z) dz`

### Compounding Interest

*(section to be expanded)*

---

## Business Metrics

### Growth
Gain of customers or revenue over a time period.

### Churn
Opposite of growth — loss of customers or revenue over a time period.
