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

## Distributions

### Uniform
Constant probability accross a specific region
Also known as a rectangle distribution.

### CDF and PDF

| Function | Definition | Use |
|----------|-----------|-----|
| **CDF** — `F_Z(z) = P(Z < z)` | Cumulative probability up to z | Binomial analysis, percentiles |
| **PDF** — `f_Z(z) = d/dz F_Z(z)` | Probability density at z | Finding E via `E = ∫ z·f_Z(z) dz` |

> If you know the PDF, you can solve for E directly: `E = ∫ z·f(z) dz`

### Gaussian (Normal)
Normal distribution full defined by the mean and variance

|Parameter|Definition|
|---|---|
| **Mean** | μ |
| **Variance** | σ² |
| **PDF** | `f(x) = 1/(σ·√(2π)) · exp[−½·((x−μ)/σ)²]` |

### Binomial
Models the number of successes in n independent trials, each with success probability p.

|Parameter|Definition|
|---|---|
| **Mean** | `μ = n·p` |
| **Variance by params** | `σ² = n·p·(1−p)` |
| **Variance by mean** | `σ² = μ·(1−p)` — always **less than** μ |
| **PMF** | `P(X=k) = C(n,k) · pᵏ · (1−p)^(n−k)` | 
- PMF is probability of getting k successes in n trials for success probability p for each trial
- `Variance = n · p · (1 − p)` — always **less than** mean
- PDF is always symmetric about the mean
- As n→∞ and p→0 with np=λ fixed, converges to Poisson

### Poisson
Models **count frequency** for pure independent event statistics.

|Parameter|Definition|
|---|---|
| **Mean** | `μ = λ` — expected freq |
| **Variance by params** | `σ² = λ` |
| **Variance by mean** | `σ² = μ` — variance equals mean exactly |
| **PMF** | `P(X=k) = λᵏ · e^(−λ) / k!` |
- PMF is probability of getting k counts based on the expected counts (λ) which scales exponentially with desired number. e term normalizes, k! term removes favor for combinatorials
- Is just na transformation of the binomial form by taking the limits of large number of trials (eg infinite time steps), small p (most time steps have no event), and np = λ (contant success rate)
- `Variance = Mean`
- **Overdispersion**: variance is too large for a Poisson; caused by hidden variables, excess zeros, clustering, human factors, etc. Poisson is usually not practical.

#### Quasi-Poisson
Adds a dispersion factor to adjust for slight overdispersion when the data is  **close to Poisson** but not quite due to other variables.
|Parameter|Definition|
|---|---|
| **Variance by params** | `σ² = φ·λ` |
| **Variance by mean** | `σ² = φ·μ` — variance is greater than the mean |

### Negative Binomial
Allows variance to increase faster than the mean: `Variance = mean + α · mean^k`

|Parameter|Definition|
|---|---|
| **Mean** | `μ = r·(1−p)/p` — required successes r for probability p of each event. If working with actual data, just calculate μ directly instead. |
| **Variance by params** | `σ² = r·(1−p)/p²` |
| **Variance by mean** | `σ² = μ + α·μ²` where `α = 1/r` |
| **PMF** | `P(X=k) = C(k+r−1, k) · pʳ · (1−p)ᵏ` |
- PMF is the probability of getting r successes before failing r times. Very similar to the binomial form, except now r is defined separately and **r is constrained instead of n**
- `Variance = n · p · (1 − p)` — always **less than** mean
- PDF looks like Poisson but shifted right
- Better choice than Quasi-Poisson for heavier overdispersion

---

## Variance and Standard Deviation

```
- Variance of single trial = p(1-p)
       What is the uncertainty of a single coin falling heads? = 0.25
- Variance of the mean counts of n trials once = n·p·(1-p)
       If we flip 100 coins, how much on average will the number of heads vary from 50? = 25 (std dev = 5)
- Variance in the mean proportion of n trials many times (σ²)  = p·(1−p)/n
       If we flip 100 coins repeatedly, by how much will the proportion of heads vary from 50%? = 0.25% (std dev = 5%)

- Literally, when we use count variance, we are summing [variance from each trial] = 100 * 0.25 in this case
- Similarly, when we use proportion variance, we are defining the percent contribution one trial to the full percent variance: (variance / n) / n
       Because variance is total variance in counts, var / n is total percent variance and var/n/n is single trial percent variacnce contribution
- Std dev  (σ)   = √(variance)
- Margin of error is just std dev (or std error) for a sample being used to estimate the true population mean.

# From a sample:
Variance = SUM((value − mean)²) / n
Std dev  = √(SUM((value − mean)²) / n)
```

### Explicit Definition

```
Var(X) = E[(X − E[X])²]
       = E[X²] − (E[X])²
```

### z-score and t-score
Often used to test fairness or see how unlikely something is
- z-score:
for large n or when population stats are known (sample std dev represents population)
       If we flip a coin 500 times, how likely is a result 5% away from the mean?
       var = np(1-p) = 250; var proportion = 0.001; std error = 0.032 (50 +/- 3.2%). So we need ~1.7 std devs to gewt 5%. Then use z-table
       Or if we flip a coin 500 times and and get 300 heads, with what confidence can we say it is biased?
       var = 250; std dev = 15.8 (250 +/- 16); 300 heads is ~4 std dev away, use z-table to get percent
  
- t-score:
       same appl.ciations and math as z-score, but use when n <~30 because it has adjusted values for the percents in the table for each n

---

## Regression, Classification, Modeling, and Inference

### Linear Regression (OLS — Ordinary Least Squares)
Minimize the sum of squared residuals. Choose a specific distribution then minimize this residual.

**Assumptions:**
- X and Y have a linear relationship
- Y is normally distributed
- Residuals have constant variance (homoscedasticity)
- All data points are independent

### Lasso (L1 Regularization)
Adds penalty `α · |slope|` to OLS. Can drive irrelevant variable slopes all the way to **zero**, effectively removing them from the model. Use when many variables are likely extraneous.

*"The lasso catches weak animals and removes them."*

### Ridge (L2 Regularization)
Adds penalty `α · slope²` to OLS. Shrinks correlated variables but **never fully removes** them. Use when multiple X's are correlated and credit needs to be shared.

*"Sitting on a ridge — the penalty prevents any one variable from dominating the valley."*

### Logistic Regression
Type of classification algorithm. Predicts binary outcomes (0 or 1) based on a single variable threshold. Validate by checking for stable error and realistic results.

### Difference-in-Differences
Quantify the actual effect of a change by comparing at least two samples before and after the change (e.g. beta testers vs regular users before and after the change).
Use when A/B is not possible.
**Validate causal effect:** correlate possible mediators with the overall effect then quantify the extent to which reasonable mediators explain the causal effect. Majoiry of the effect should be explainmable by reasonable mediators (eg web design change boosting sales is strongly mediated by faster time to check out would be a validation; mediation by instead increased initial site visits from instagram indicates a confounder perhaps due to other ad changes at the same time)  
**Verify robustness:** Alter model parameters or method of how a variable is measured (eg number of chars vs number of words or metnion of specific words).

**Assumptions:**
- The two subpopulations have parallel trends after accounting for confounders; verify via visualization EDA
- All confounders are observed (else a confounder may explain the result instead)
- Covariates span both subpopulations (else they cannot be modeled)

### Propensity Score Matching
If we suspect that the treatment group is **systematically more likely to be affected** by the treatment than the control group, must find this effect.
e.g. we added luxury brand ads, but rich people will see these ads more often and we know rich people spend more money, so the ad will seemingly be successful, but only because ads are always more succesfull when a rich person sees it.
We should quantify the propensity (likelyhood of recieving treatment based on all the other variables).
Then we match up the data to avoid difference in propensity eg for every rich person who saw the luxury ad, we need a rich person who saw the regular ad. Clip the extra data points.

### Synthetic Control
If we can choose groups to recieve treatment like an entire country, we can avoid propensity bias.
Assume eg people in WA and OR behaive similar enough that we can deploy the add by region to test the effect.


### Instrumental Variables
Use a variable that is immune to a problematic confounder
e.g. education seems to increase salary, but it is confounded by individual ability, IQ, etc
Instead, find a variable that affects education but it random for each person: birth month
Summer birthdays stay in school longer, but do not earn more

### Meta-leaners
If you want to determine which subgroups respond better to a treatment


### Decision Tree
Type of classification algorithm. Split the data using decision rules to classify samples. See ML file for more on trees and random forests.

---

## Outliers
- Use Inner quartile range(IQR) for skewed data. Values beyond 1.5 IQR of Q1 Q3 are outliers. IQR is the center 50% range of the data (Q3 - Q1)
- Use the z-score for syummetric data. Typically use 3 std devs so outliers are the ~0.25% most extreme  (z = 3)

---

## Combinations
How many ways to arrange k items in n bins?
       -e.g. get 3 heads how of 5 flips
= C(3 / 5) 
= n! / k!(n-k)! = 5! / 3!2! = 10 ways

---

## Probabilty and Expectation

- sampling with replacement
how many dice rolls to roll a 6? E = 1/P(6) = 6

- sampling without replacement
how many card draws to draw spades?
E = (n + 1) / (k + 1) = 53/14 = 3.8, slightly faster than with replacement because cards run out!

### Markov chain

eg what is the expected number of rolls until getting 666 for the first time?
- consider 3 states:
  ##### state 0 is ??? (need 666)
  ###### E0 = 1/6(1 + E1) which is probability of enter state 1 times E1 plus 1 (takes one roll (6) to enter state 1)
  ###### + 5/6(1 + E0) which is similarly the probability of enter state 0 time E0 plus 1 (takes one roll (1-5) to enter state 0)
  ##### state 1 is ???6 (need 66)
  ###### E1 = 1/6(1 + E2) + 5/6(1 + E0)
  ##### state 2 is ???66 (need 6)
  ###### E1 = 1/6(1) + 5/6(1 + E0)
    
---

## Business Metrics

### Growth
Gain of customers or revenue over a time period.

### Churn
Opposite of growth — loss of customers or revenue over a time period.
