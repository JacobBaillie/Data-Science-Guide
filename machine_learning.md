# Machine Learning and Modeling

---

## Evaluation Metrics

### Precision vs Recall

| Metric | Formula | Intuition |
|--------|---------|-----------|
| **Precision** | `TP / (TP + FP)` | How stingy the model is — of everything it called positive, how many were actually positive? High precision = fewer false alarms |
| **Recall** | `TP / (TP + FN)` | How comprehensive the model is — of all actual positives, how many did it catch? High recall = fewer misses |

> Precision and recall trade off: increasing one typically decreases the other.

### F1 Score

```
F1 = 2 · (precision · recall) / (precision + recall)
```

Harmonic mean of precision and recall — penalizes extreme imbalance between the two.

---

## Regression Types

### Linear Regression (OLS — Ordinary Least Squares)
Minimizes the sum of squared residuals.

**Assumptions:**
- X and Y have a linear relationship
- Y is normally distributed
- Residuals have constant variance (homoscedasticity)
- All data points are independent

**Variants:**

| Variant | Penalty | Effect |
|---------|---------|--------|
| **Lasso (L1)** | `α · |slope|` | Can drive irrelevant variable slopes all the way to zero — effectively removes them. *"The lasso catches weak animals and removes them."* |
| **Ridge (L2)** | `α · slope²` | Shrinks correlated variables but never fully removes them. Good when multiple X's are correlated. *"Sitting on a ridge — the penalty prevents any one variable from dominating the valley."* |

### Logistic Regression
Predicts binary outcomes (0 or 1). Checks whether a single variable threshold is meaningful. Validate by checking for stable error and realistic results.

### Poisson Regression
Predicts **count frequency** for independent events.
- `Variance = Mean`
- **Overdispersion**: variance is too large for a Poisson; caused by hidden variables, excess zeros, clustering, human factors, etc.

### Quasi-Poisson
Adds a dispersion factor to the Poisson to accommodate slight overdispersion.

### Negative Binomial
Allows variance to increase faster than the mean: `Variance = mean + α · mean^k`
- PDF looks like Poisson but shifted right
- Better than Quasi-Poisson for heavy overdispersion

### Binomial
Pure success/fail statistics.
- `Variance = n · p · (1 − p)` — always less than mean
- PDF is always symmetric about the mean

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

**Strengths:** Discovers nontrivial variables and interactions (e.g., `var1 matters only if var2 > x`)

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
2. **Outlier handling** — use local density, transforms, or isolation forests. Options: manually remove (few outliers), split data by outlier type (many similar outliers), or add hard rules (`age > 115`)
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
| **OOB** | Out-of-bag (data not used in a given bootstrap sample) |

---

## My Project Examples

### Time-Resolved Data

**Situation:** Extract signal despite poor SNR, large data volume, drift, artifacts, and hidden signals (IRF); computationally expensive.

*(expand with approach and outcomes)*
