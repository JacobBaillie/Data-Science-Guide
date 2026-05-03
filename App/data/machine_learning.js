const ML_DATA = [
  {id:"ml_1",topic:"evaluation_metrics",difficulty:"medium",
   q:"You build a spam filter. Of 200 emails flagged as spam, 180 were actually spam. Of 50 actual spam emails in the full inbox, 180/200 isn't right — let's say of 300 actual spam emails total, your model caught 180. What are the precision and recall, and which would you prioritize for a spam filter?",
   a:"Precision = TP/(TP+FP) = 180/200 = 0.90. Recall = TP/(TP+FN) = 180/300 = 0.60. For a spam filter, you'd typically prioritize precision — a false positive (legitimate email sent to spam) is worse than a false negative (spam in inbox). Users can tolerate some spam but not missing important emails.",
   eq:"Precision = TP/(TP+FP) = 180/200 = 0.90\nRecall = TP/(TP+FN) = 180/300 = 0.60"},

  {id:"ml_2",topic:"evaluation_metrics",difficulty:"easy",
   q:"What is the F1 score, when would you use it over accuracy, and what happens to F1 if precision is high but recall is very low?",
   a:"F1 = 2·(precision·recall)/(precision+recall). It's the harmonic mean of precision and recall. Use it over accuracy when classes are imbalanced — accuracy can be misleadingly high by always predicting the majority class. If precision=0.95 but recall=0.10, F1 = 2·(0.095)/(1.05) ≈ 0.18. The harmonic mean heavily penalizes extreme imbalance between the two metrics.",
   eq:"F1 = 2·(P·R)/(P+R)\nExample: F1 = 2·(0.95·0.10)/(0.95+0.10) ≈ 0.18"},

  {id:"ml_3",topic:"dimensionality_reduction",difficulty:"medium",
   q:"What is PCA, what problem does it solve, and what are three practical uses in a data science workflow?",
   a:"PCA (Principal Component Analysis) reduces dimensionality by projecting data onto orthogonal axes (principal components) that maximize variance. It solves the curse of dimensionality and multicollinearity. Three uses: (1) Visualize variable clustering to understand the variable space, (2) Reduce dimensions for 2D/3D plotting of high-dimensional data, (3) Pre-regression step to reveal which variables are irrelevant or correlated before modeling.",
   eq:"PC₁ maximizes Var(Xw)\nsubject to ||w|| = 1"},

  {id:"ml_4",topic:"ensemble_methods",difficulty:"medium",
   q:"Explain what a bootstrapped dataset is and how Random Forests use bootstrapping. What is the out-of-bag error and why is it useful?",
   a:"A bootstrapped dataset is created by randomly sampling with replacement from the original data until reaching the desired size — some rows appear multiple times, others not at all. Random Forests train many decision trees on different bootstrapped datasets, then aggregate predictions by majority vote (bagging). The out-of-bag (OOB) dataset for each tree is the ~37% of rows not selected in that tree's bootstrap. OOB error is the proportion of samples incorrectly predicted across their respective OOB trees — it provides a built-in validation estimate without needing a separate holdout set.",
   eq:"P(row not in bootstrap) = (1 - 1/n)ⁿ → 1/e ≈ 0.368\nOOB error ≈ cross-validation estimate"},

  {id:"ml_5",topic:"ensemble_methods",difficulty:"hard",
   q:"How do you tune a Random Forest model? What parameter controls the randomness at each split, and what's the tradeoff?",
   a:"The key tuning parameter is the number of variables considered at each split (mtry). At each node, only a random subset of features is evaluated. You vary mtry and select the value that minimizes OOB error. Tradeoff: lower mtry increases diversity between trees (reduces correlation, lowers variance) but each individual tree is weaker; higher mtry makes trees stronger individually but more correlated with each other, reducing the ensemble benefit. Common defaults: √p for classification, p/3 for regression (where p = total features).",
   eq:"Classification default: mtry = √p\nRegression default: mtry = p/3\nTune by minimizing OOB error"},

  {id:"ml_6",topic:"decision_trees",difficulty:"medium",
   q:"What are the strengths and weaknesses of decision trees compared to linear regression? When would you use a shallow tree specifically?",
   a:"Strengths: handles nonlinear relationships and interactions naturally (e.g., 'var1 matters only if var2 > x'), no assumptions about data distribution, handles mixed variable types. Weaknesses: biased by outliers, arbitrarily swaps correlated variables between runs, unstable (small data changes → very different trees), prone to overfitting. Use a shallow tree (2-3 levels) for human-readable diagnostics — checking for data leakage, understanding key splits, or as a sanity check (e.g., detecting if row index predicts the target).",
   eq:"No equation — interpretability tool\nCheck for leakage: 'is row_id > n predictive?'"},

  {id:"ml_7",topic:"regularization",difficulty:"hard",
   q:"You have a dataset with 500 features, most of which you suspect are irrelevant. Should you use Lasso or Ridge regression, and why? What if instead the features are highly correlated?",
   a:"If most features are irrelevant: use Lasso (L1). Its absolute-value penalty drives coefficients to exactly zero, performing automatic feature selection. The resulting sparse model is interpretable and ignores noise variables. If features are highly correlated: use Ridge (L2). Lasso arbitrarily picks one correlated feature and drops the rest, which is unstable. Ridge distributes weight across correlated features, shrinking them together. It keeps all predictors but with reduced magnitudes, which is better when groups of correlated features each carry signal.",
   eq:"Lasso: min RSS + λΣ|βⱼ| → sparse (zeros)\nRidge: min RSS + λΣβⱼ² → small but nonzero"},

  {id:"ml_8",topic:"eda",difficulty:"medium",
   q:"You receive a 'wide' dataset (many more features than observations). Outline your EDA approach in order.",
   a:"1. PCA — visualize how variables cluster and identify redundant groups. 2. Lasso — if many variables are likely extraneous, use L1 to perform feature selection. 3. Ridge — if many variables are likely correlated, shrink coefficients together. 4. Regression or decision tree — only after pruning the variable space to avoid overfitting. 5. Stability check — repeat analysis with data subsets (remove first/last n rows, a random row, or slightly perturb values) to confirm results aren't fragile.",
   eq:"Wide data: p >> n\nRisk: overfitting, multicollinearity\nApproach: reduce → model → validate stability"},

  {id:"ml_9",topic:"eda",difficulty:"hard",
   q:"You have a 'tall' dataset (millions of rows, few columns). Walk through your EDA strategy, including how you'd handle outliers.",
   a:"1. Univariate/bivariate analysis — check each variable's distribution against expectations; look for outliers, heavy tails, time patterns, Simpson's paradox. 2. Outlier handling — use local density methods, transforms, or isolation forests. Few outliers: manually remove. Many similar outliers: split data by outlier type. Otherwise add hard rules (age > 115). 3. Split data to effectively 'widen' it (by year, region, product). 4. Check stability of data generation — look for drift over time. 5. Sample for visualization. 6. Visualize residuals to find model weak points. 7. Consider logistic regression if effects are small but real. 8. Confirm conclusions are robust.",
   eq:"Tall data: n >> p\nKey risks: drift, outliers, Simpson's paradox\nResidual plots reveal systematic model failures"},

  {id:"ml_10",topic:"outlier_detection",difficulty:"easy",
   q:"Name two common outlier detection methods and explain when you'd use each. What are your options once outliers are identified?",
   a:"Z-score: flags points based on distance from the mean in standard deviations (typically |z| > 3). Best for roughly normal data. Transform (log, power, Box-Cox): reels in non-linear, skewed data before modeling — outliers in the original space may be well-behaved after transformation. Once identified, options are: (1) manually remove if few and clearly erroneous, (2) split data by outlier type if many similar ones exist, or (3) add hard business rules (e.g., age must be < 115, price > 0).",
   eq:"Z-score: z = (x − μ) / σ,  flag if |z| > 3\nLog transform: x' = log(x + 1)"},

  {id:"ml_11",topic:"model_selection",difficulty:"medium",
   q:"Given these three situations, which model family would you recommend: (1) extreme variable space, (2) simple/linear relationships, (3) complex nonlinear relationships with interactions?",
   a:"(1) Extreme variable space → PCA first to reduce dimensions and understand variable structure, then model on components. (2) Simple linear relationships → Regression (OLS, possibly with regularization) — interpretable, fast, well-understood diagnostics. (3) Complex nonlinear relationships → Decision tree or Random Forest — captures interactions automatically without manual feature engineering, handles nonlinearities, and the ensemble (RF) controls overfitting via bagging.",
   eq:"Extreme vars → PCA\nLinear → Regression\nNonlinear + interactions → RF"},

  {id:"ml_12",topic:"bias_variance",difficulty:"hard",
   q:"Explain the bias-variance tradeoff. A model has low training error but high test error — diagnose the problem and propose two solutions.",
   a:"Bias = error from oversimplifying (underfitting). Variance = error from oversensitivity to training data (overfitting). Total error = Bias² + Variance + irreducible noise. Low train error + high test error = high variance (overfitting). The model memorized training patterns that don't generalize. Solutions: (1) Regularization (L1/L2) to constrain model complexity. (2) More training data to reduce variance. (3) Ensemble methods like bagging (Random Forest) to average out individual model instability. (4) Feature selection to reduce dimensionality.",
   eq:"Total Error = Bias² + Variance + ε\nOverfit: Train error << Test error\nFix: regularize, more data, ensemble"},

  {id:"ml_13",topic:"evaluation_metrics",difficulty:"hard",
   q:"You're building a model to detect fraudulent transactions. Only 0.1% of transactions are fraudulent. A model that predicts 'not fraud' for everything achieves 99.9% accuracy. Why is accuracy misleading here, and what metrics should you use instead?",
   a:"With 99.9% class imbalance, always predicting the majority class achieves near-perfect accuracy while catching zero fraud — useless. Better metrics: Precision (of flagged transactions, how many are actually fraud), Recall (of all actual fraud, what fraction did we catch — critical here since missed fraud is costly), F1 score (balances both), and AUC-ROC (measures discrimination ability across all thresholds). For fraud, recall is typically prioritized — it's better to investigate some false positives than miss real fraud.",
   eq:"Accuracy = 99.9% but Recall = 0%\nPrefer: Recall, Precision, F1, AUC-ROC\nCost-sensitive: weight FN >> FP"},

  {id:"ml_14",topic:"ensemble_methods",difficulty:"medium",
   q:"What is bagging and how does it reduce variance? Compare it to a single decision tree.",
   a:"Bagging (Bootstrap Aggregating) trains multiple models on different bootstrapped samples of the data, then combines predictions by majority vote (classification) or averaging (regression). A single decision tree is high-variance — small data changes can completely alter the tree structure. By averaging many trees trained on different samples, bagging cancels out individual tree instabilities. The ensemble's variance is reduced by a factor related to the correlation between trees. Random Forests extend bagging by also randomizing feature subsets at each split, further decorrelating trees.",
   eq:"Var(ensemble) = ρ·σ² + (1-ρ)·σ²/B\nρ = correlation between trees\nB = number of trees"},

  {id:"ml_15",topic:"regularization",difficulty:"medium",
   q:"What is the difference between L1 and L2 regularization geometrically? Why does L1 produce sparse solutions while L2 does not?",
   a:"Geometrically, L1's constraint region is a diamond (corners on axes) while L2's is a circle. The OLS solution typically intersects L1's diamond at a corner, where one or more coefficients are exactly zero — producing sparsity. L2's circular boundary has no corners, so intersections occur at points where all coefficients are nonzero (just shrunk). Intuitively, L1's penalty is linear in |β|, so the marginal cost of reducing a coefficient from 0.01 to 0 is the same as reducing from 1.0 to 0.99 — there's no diminishing incentive to shrink to zero. L2's quadratic penalty makes the last bit of shrinkage very cheap, never reaching zero.",
   eq:"L1 constraint: Σ|βⱼ| ≤ t  (diamond)\nL2 constraint: Σβⱼ² ≤ t  (circle)\nL1 solutions lie at corners → zeros"},

  {id:"ml_16",topic:"key_concepts",difficulty:"easy",
   q:"Define the following acronyms and give a one-sentence description of each: EDA, ETL, GLM, OLS.",
   a:"EDA = Exploratory Data Analysis — initial investigation of data to discover patterns, spot anomalies, and check assumptions before formal modeling. ETL = Extract, Transform, Load — the pipeline for moving raw data from sources, cleaning/reshaping it, and storing it in a data warehouse. GLM = Generalized Linear Model — extends OLS to non-normal response variables (Poisson, binomial, etc.) via a link function. OLS = Ordinary Least Squares — standard linear regression minimizing the sum of squared residuals.",
   eq:"OLS: min Σ(yᵢ − ŷᵢ)²\nGLM: g(E[Y]) = Xβ  where g is link function"},

  {id:"ml_17",topic:"overfitting",difficulty:"medium",
   q:"You train a decision tree that achieves 100% accuracy on training data but 60% on test data. List three techniques to address this overfitting, explaining the mechanism of each.",
   a:"1. Pruning — limit tree depth or require minimum samples per leaf, preventing the tree from memorizing noise in small subgroups. 2. Random Forest — train many trees on bootstrapped samples with random feature subsets; averaging reduces variance without increasing bias. 3. Cross-validation — use k-fold CV to select hyperparameters (max depth, min samples) that minimize validation error rather than training error. Each targets the variance component: pruning constrains complexity directly, RF averages out instability, CV optimizes the complexity-performance tradeoff.",
   eq:"Train acc = 100%, Test acc = 60% → high variance\nGap = overfitting signal"},

  {id:"ml_18",topic:"dimensionality_reduction",difficulty:"hard",
   q:"You run PCA on a dataset with 50 features. The first 3 principal components explain 85% of variance. What does this tell you about the data, and what's the tradeoff in using only these 3 components for downstream modeling?",
   a:"85% variance in 3 PCs (out of 50) means the data has high intrinsic dimensionality compression — most variation lies in a low-dimensional subspace. The 50 original features are largely redundant or correlated. Tradeoff: using 3 PCs reduces noise and computation, prevents overfitting, and enables visualization. But you lose 15% of variance which may contain signal for your target variable (PCA maximizes variance, not predictive power). Also, PCs are linear combinations of all features, losing interpretability — you can't say 'feature X matters' directly.",
   eq:"PC₁₋₃ explain 85% of Var(X)\nLost: 15% variance, interpretability\nGained: noise reduction, visualization, no multicollinearity"},

  {id:"ml_19",topic:"model_selection",difficulty:"hard",
   q:"Explain cross-validation. Why is a simple train/test split sometimes insufficient, and how does k-fold CV address this? What's the bias-variance tradeoff in choosing k?",
   a:"Cross-validation partitions data into k folds, trains on k-1 folds and validates on the held-out fold, rotating k times. A single train/test split gives one noisy estimate of performance that depends on which data ended up in which set — with small data this estimate has high variance. K-fold averages k estimates, reducing variance. Choosing k: larger k (e.g., 10 or LOOCV) uses more training data per fold (less bias) but estimates are more correlated (higher variance) and computation increases. Smaller k (e.g., 5) has slightly more bias but lower variance and is faster. k=5 or k=10 are standard compromises.",
   eq:"CV error = (1/k)·Σᵢ Error(fold_i)\nk↑: less bias, more variance, slower\nk↓: more bias, less variance, faster"},

  {id:"ml_20",topic:"eda",difficulty:"medium",
   q:"What is Simpson's Paradox and why must you check for it during EDA? Give an example.",
   a:"Simpson's Paradox occurs when a trend present in subgroups reverses when the groups are combined. You must check for it because aggregate statistics can be deeply misleading. Example: a treatment appears to hurt patients overall, but when you split by severity (mild vs. severe), the treatment helps both groups. The reversal happens because severe patients (who have worse outcomes regardless) disproportionately received the treatment, confounding the aggregate. During EDA, always examine relationships within meaningful subgroups, not just overall.",
   eq:"Overall: Treatment appears worse\nMild cases: Treatment better\nSevere cases: Treatment better\nCause: confounding by severity allocation"},

  {id:"ml_21",topic:"ensemble_methods",difficulty:"hard",
   q:"Compare boosting to bagging. How does Gradient Boosting build trees differently than a Random Forest, and what are the consequences for bias vs. variance?",
   a:"Bagging (Random Forest) builds trees independently in parallel on bootstrapped data, then averages — this reduces variance while keeping bias roughly the same as a single tree. Boosting builds trees sequentially, where each new tree fits the residuals (errors) of the previous ensemble. This directly reduces bias by correcting mistakes iteratively. Consequences: RF is robust to overfitting (more trees rarely hurt), while boosting can overfit if you add too many trees or use too high a learning rate. Boosting typically achieves lower bias but needs careful tuning (learning rate, n_estimators, max_depth).",
   eq:"RF: trees in parallel → reduces variance\nBoosting: trees sequential on residuals → reduces bias\nGBM loss: L(y, F_{m-1} + η·hₘ(x))"},

  {id:"ml_22",topic:"ensemble_methods",difficulty:"medium",
   q:"What is the learning rate (shrinkage) in gradient boosting, and why is a smaller learning rate generally preferred even though it requires more trees?",
   a:"The learning rate η (typically 0.01–0.3) scales each tree's contribution to the ensemble. A smaller η means each tree makes a smaller correction, requiring more trees to reach the same performance. This is preferred because: (1) it regularizes — small steps are less likely to overshoot and overfit, (2) it creates a smoother optimization path through the loss surface, and (3) early stopping becomes more effective since performance improves gradually. The tradeoff is purely computational — more trees = more training time, but usually better generalization.",
   eq:"F_m(x) = F_{m-1}(x) + η · hₘ(x)\nSmaller η → more trees needed, better generalization\nTypical: η = 0.01–0.1, n_trees = 500–5000"},

  {id:"ml_23",topic:"feature_engineering",difficulty:"medium",
   q:"What is feature interaction and why can't linear models capture it natively? How do tree-based models handle interactions differently?",
   a:"A feature interaction exists when the effect of one variable depends on the value of another (e.g., 'discount matters more for price-sensitive customers'). Linear models assume additive effects — each feature contributes independently to the prediction. To capture interactions in linear models, you must manually create interaction terms (x₁·x₂). Tree-based models capture interactions naturally through sequential splits: a split on x₁ followed by a split on x₂ in a subtree means x₂'s effect is conditional on x₁'s value. No manual engineering needed.",
   eq:"Linear: ŷ = β₀ + β₁x₁ + β₂x₂ (no interaction)\nWith interaction: ŷ = β₀ + β₁x₁ + β₂x₂ + β₃x₁x₂\nTrees: automatic via nested splits"},

  {id:"ml_24",topic:"evaluation_metrics",difficulty:"medium",
   q:"What is AUC-ROC? What does an AUC of 0.5 vs 0.85 mean? When would you prefer AUC-PR (precision-recall curve) over AUC-ROC?",
   a:"AUC-ROC measures the area under the curve plotting True Positive Rate vs False Positive Rate across all classification thresholds. AUC=0.5 means the model is no better than random guessing; AUC=0.85 means there's an 85% probability that the model ranks a random positive higher than a random negative. Prefer AUC-PR when classes are heavily imbalanced — ROC can look optimistic because the large number of true negatives makes FPR stay low even with many false positives. PR curve focuses only on the positive class and is more sensitive to performance on the minority class.",
   eq:"AUC-ROC: P(score(pos) > score(neg))\nAUC = 0.5 → random, AUC = 1.0 → perfect\nImbalanced data → prefer AUC-PR"},

  {id:"ml_25",topic:"regularization",difficulty:"hard",
   q:"What is Elastic Net and when would you use it over pure Lasso or pure Ridge?",
   a:"Elastic Net combines L1 and L2 penalties: Loss = RSS + λ₁Σ|βⱼ| + λ₂Σβⱼ². Use it when you have groups of correlated features AND suspect many features are irrelevant. Pure Lasso with correlated features arbitrarily selects one and zeros out the rest (unstable). Pure Ridge keeps everything but can't do feature selection. Elastic Net's L1 component performs selection while L2 encourages correlated features to be selected together (grouping effect). It's especially useful in genomics or text data where features come in correlated clusters but most are noise.",
   eq:"Elastic Net: min RSS + λ₁Σ|βⱼ| + λ₂Σβⱼ²\nα = λ₁/(λ₁+λ₂) mixes L1/L2\nα=1 → Lasso, α=0 → Ridge"},

  {id:"ml_26",topic:"model_selection",difficulty:"hard",
   q:"You're choosing between a highly interpretable model (logistic regression) and a black-box model (XGBoost) that performs 2% better on AUC. What factors should guide your decision?",
   a:"Consider: (1) Stakeholder needs — if decisions must be explained (healthcare, lending, legal), interpretability may be legally required or practically essential. (2) Magnitude of 2% — in high-stakes domains (fraud at scale), 2% AUC can mean millions in savings; in low-impact settings it's negligible. (3) Deployment complexity — simpler models are easier to maintain, debug, and monitor in production. (4) Regulatory requirements — some industries require explainable models (GDPR right to explanation). (5) Failure modes — can you afford opaque failures? (6) Compromise options — use XGBoost with SHAP values for post-hoc interpretability.",
   eq:"Decision factors:\n1. Explainability requirements\n2. Business value of 2% lift\n3. Deployment/maintenance cost\n4. Regulatory constraints"},

  {id:"ml_27",topic:"data_leakage",difficulty:"hard",
   q:"What is data leakage? Give two examples and explain how to detect and prevent it.",
   a:"Data leakage occurs when information from outside the training data (or from the future) bleeds into the model, making it appear accurate during development but fail in production. Examples: (1) Including a 'days_since_cancellation' feature to predict churn — this is determined AFTER the event you're predicting. (2) Fitting a scaler on the full dataset before train/test split — test statistics leak into training. Detection: check if model accuracy is suspiciously high, use a shallow tree to see if any single feature is too predictive, verify temporal ordering. Prevention: split data BEFORE any preprocessing, use pipelines that fit only on training data, think carefully about what's known at prediction time.",
   eq:"Leakage signs: unrealistically high accuracy\nPrevention: split → then preprocess\nPipeline: fit_transform(train), transform(test)"},

  {id:"ml_28",topic:"bias_variance",difficulty:"medium",
   q:"A model has high training error AND high test error. Diagnose the problem and propose solutions. How does this differ from overfitting?",
   a:"High train + high test error = high bias (underfitting). The model is too simple to capture the underlying pattern — it can't even fit the training data well. This differs from overfitting (low train, high test) where the model is too complex. Solutions: (1) Increase model complexity — more features, polynomial terms, deeper trees, more layers. (2) Reduce regularization — lower λ to give the model more freedom. (3) Engineer better features that capture nonlinear relationships. (4) Switch to a more flexible model family (e.g., linear → tree-based). Adding more data won't help underfitting — the model structurally can't learn the pattern.",
   eq:"Underfit: Train error ≈ Test error (both high)\nOverfit: Train error << Test error\nFix underfit: more complexity, less regularization"},

  {id:"ml_29",topic:"feature_engineering",difficulty:"medium",
   q:"Why should you scale/normalize features before applying regularized regression or distance-based algorithms? What happens if you don't?",
   a:"Regularization penalizes coefficient magnitude, and distance-based methods (KNN, SVM, K-means) compute distances between features. If features have different scales (e.g., age 0-100 vs. income 0-1,000,000), unscaled features with larger magnitudes will dominate. In Ridge/Lasso, a feature measured in cents vs. dollars will have a 100x smaller coefficient, receiving 100x less penalty — regularization becomes inconsistent across features. For distance methods, the high-magnitude feature will dominate distance calculations. StandardScaler (z-score) or MinMaxScaler ensures all features contribute proportionally.",
   eq:"StandardScaler: x' = (x − μ) / σ\nMinMaxScaler: x' = (x − min) / (max − min)\nRequired for: regularization, KNN, SVM, K-means"},

  {id:"ml_30",topic:"decision_trees",difficulty:"hard",
   q:"Explain how a decision tree chooses which feature and threshold to split on. What splitting criteria are used for classification vs. regression?",
   a:"At each node, the tree evaluates all features and all possible thresholds, choosing the split that maximizes information gain (reduces impurity the most). Classification criteria: Gini impurity = Σpᵢ(1-pᵢ), measures probability of misclassifying a randomly chosen sample. Entropy = -Σpᵢ·log₂(pᵢ), measures disorder. Both reach minimum (0) when a node is pure (one class). Regression criteria: variance reduction — choose the split that minimizes the weighted sum of variance in child nodes (equivalent to minimizing MSE). The greedy, top-down approach means trees find locally optimal splits, not globally optimal trees.",
   eq:"Gini = Σpᵢ(1−pᵢ), pure node → 0\nEntropy = −Σpᵢ·log₂(pᵢ), pure → 0\nRegression: min Σ(yᵢ − ȳ_node)²"},

  {id:"ml_31",topic:"gradient_descent",difficulty:"medium",
   q:"Explain gradient descent. What role does the learning rate play, and what goes wrong if it's too large or too small?",
   a:"Gradient descent iteratively updates parameters in the direction that reduces the loss function: θ_new = θ_old − α·∇L(θ). The gradient ∇L points toward steepest increase, so we subtract it to decrease loss. Learning rate α controls step size. Too large: overshoots the minimum, oscillates, or diverges entirely. Too small: converges extremely slowly, may get stuck in local minima or plateaus for non-convex problems. In practice, use adaptive methods (Adam, RMSProp) that adjust the effective learning rate per parameter based on gradient history.",
   eq:"θ_{t+1} = θ_t − α·∇L(θ_t)\nα too large → diverge\nα too small → slow convergence"},

  {id:"ml_32",topic:"gradient_descent",difficulty:"hard",
   q:"Compare batch gradient descent, stochastic gradient descent (SGD), and mini-batch SGD. What are the tradeoffs?",
   a:"Batch GD: computes gradient on the entire dataset per update. Stable, converges smoothly, but expensive per step for large data and can get stuck in local minima. SGD: computes gradient on a single random sample per update. Very fast per step, noisy gradients help escape local minima, but updates are highly variable and may not converge without learning rate scheduling. Mini-batch SGD: computes gradient on a small batch (32-512 samples). Best compromise — vectorized computation is efficient on GPUs, noise is reduced but still helps escape local minima. Most deep learning uses mini-batch with batch size 32-256.",
   eq:"Batch: ∇L = (1/n)·Σᵢ∇Lᵢ (stable, slow)\nSGD: ∇L = ∇Lᵢ for random i (noisy, fast)\nMini-batch: ∇L = (1/B)·Σ_{batch}∇Lᵢ (compromise)"},

  {id:"ml_33",topic:"evaluation_metrics",difficulty:"medium",
   q:"You build a model and get a confusion matrix: TP=80, FP=20, FN=40, TN=860. Calculate precision, recall, F1, and accuracy. Which metric is most informative here?",
   a:"Precision = 80/(80+20) = 0.80. Recall = 80/(80+40) = 0.67. F1 = 2·(0.80·0.67)/(0.80+0.67) = 1.07/1.47 ≈ 0.73. Accuracy = (80+860)/(80+20+40+860) = 940/1000 = 0.94. Accuracy is misleading because the class distribution is skewed (120 positives vs 880 negatives). F1 is most informative as it balances the model's ability to avoid false alarms (precision) with its ability to find positives (recall). The relatively low recall (0.67) means we're missing 1/3 of positives.",
   eq:"Precision = 80/100 = 0.80\nRecall = 80/120 = 0.67\nF1 = 2·(0.80·0.67)/(1.47) ≈ 0.73\nAccuracy = 940/1000 = 0.94 (misleading)"},

  {id:"ml_34",topic:"clustering",difficulty:"medium",
   q:"Explain K-Means clustering. What are its assumptions, how do you choose K, and what are its main limitations?",
   a:"K-Means partitions data into K clusters by iteratively: (1) assigning each point to its nearest centroid, (2) recomputing centroids as cluster means. Assumes: spherical clusters of similar size, equal variance, features on similar scales. Choosing K: elbow method (plot inertia vs K, look for diminishing returns) or silhouette score (measures cluster cohesion vs separation). Limitations: must specify K upfront, sensitive to initialization (use K-means++), assumes convex clusters (fails on rings/crescents), sensitive to outliers which pull centroids, doesn't handle varying cluster sizes/densities well.",
   eq:"Objective: min Σₖ Σᵢ∈Cₖ ||xᵢ − μₖ||²\nElbow method: plot inertia vs K\nSilhouette: (b−a) / max(a,b)"},

  {id:"ml_35",topic:"clustering",difficulty:"hard",
   q:"When would you use DBSCAN over K-Means? What are its two key parameters and how do they affect the result?",
   a:"Use DBSCAN when: clusters are non-spherical or irregularly shaped, you don't know K in advance, or you have noise/outliers to identify. DBSCAN groups points that are densely packed and marks sparse-region points as outliers. Two parameters: eps (ε) — maximum distance between two points to be considered neighbors; min_samples — minimum points within eps to form a dense region (core point). Larger eps merges nearby clusters; smaller eps fragments them. Higher min_samples requires denser regions, marking more points as noise. Unlike K-Means, DBSCAN finds arbitrary-shaped clusters and automatically determines the number of clusters.",
   eq:"Core point: |N_ε(p)| ≥ min_samples\nBorder point: within ε of a core point\nNoise: neither core nor border\nNo need to specify K"},

  {id:"ml_36",topic:"neural_networks",difficulty:"medium",
   q:"What is a neural network activation function and why is it necessary? Compare ReLU, sigmoid, and tanh.",
   a:"Activation functions introduce nonlinearity. Without them, stacking linear layers just produces another linear function — no matter how deep, the network couldn't learn nonlinear patterns. ReLU: f(x) = max(0,x). Fast to compute, avoids vanishing gradient for positive values, but 'dead neurons' if inputs go permanently negative. Sigmoid: f(x) = 1/(1+e^-x), outputs (0,1). Good for final layer in binary classification, but suffers vanishing gradients (derivatives near 0 for large |x|). Tanh: f(x) = (e^x-e^-x)/(e^x+e^-x), outputs (-1,1). Zero-centered (better than sigmoid) but still has vanishing gradient.",
   eq:"ReLU: f(x) = max(0, x)\nSigmoid: f(x) = 1/(1+e⁻ˣ) ∈ (0,1)\nTanh: f(x) = (eˣ−e⁻ˣ)/(eˣ+e⁻ˣ) ∈ (-1,1)"},

  {id:"ml_37",topic:"neural_networks",difficulty:"hard",
   q:"What is the vanishing gradient problem? Which architectures suffer from it, and what solutions exist?",
   a:"In deep networks, gradients are multiplied through layers via chain rule during backpropagation. If activation derivatives are <1 (sigmoid, tanh for large inputs), gradients shrink exponentially with depth — early layers learn extremely slowly or not at all. Deep vanilla networks and early RNNs suffer most. Solutions: (1) ReLU activation — derivative is 1 for positive inputs, no shrinkage. (2) Residual connections (ResNets) — skip connections let gradients flow directly through addition. (3) Batch normalization — keeps activations in a range where gradients are healthy. (4) LSTM/GRU for sequences — gating mechanisms maintain gradient flow over long sequences. (5) Careful initialization (Xavier/He).",
   eq:"Chain rule: ∂L/∂w₁ = ∂L/∂aₙ · ∂aₙ/∂aₙ₋₁ · ... · ∂a₂/∂a₁ · ∂a₁/∂w₁\nIf each |∂aᵢ/∂aᵢ₋₁| < 1 → product → 0\nResNet: output = F(x) + x (skip connection)"},

  {id:"ml_38",topic:"model_selection",difficulty:"medium",
   q:"What is the No Free Lunch theorem and what does it imply for model selection in practice?",
   a:"The No Free Lunch theorem states that no single algorithm is universally best across all possible problems. Averaged over all possible data distributions, every algorithm performs equally. Implication: model selection must be empirical and problem-specific. You can't know a priori that Random Forest beats logistic regression for your data — you must try multiple approaches and validate. It justifies why data scientists test several models and use cross-validation rather than defaulting to one 'best' algorithm. Domain knowledge helps narrow candidates, but final selection requires experimentation.",
   eq:"No universal best algorithm\n∀ algorithm A, ∃ problems where A fails\nImplication: always validate empirically"},

  {id:"ml_39",topic:"overfitting",difficulty:"medium",
   q:"What is early stopping and how does it prevent overfitting in iterative models like gradient boosting or neural networks?",
   a:"Early stopping monitors validation loss during training and halts when it starts increasing (even as training loss continues to decrease). The divergence point between training and validation loss marks where the model transitions from learning generalizable patterns to memorizing noise. Implementation: train with a validation holdout, track validation metric each epoch/iteration, stop after N consecutive rounds without improvement (patience). It's a form of implicit regularization — limiting training iterations limits model complexity. In gradient boosting, this means using fewer trees; in neural networks, fewer weight updates.",
   eq:"Stop when: val_loss(t) > val_loss(t-patience)\nEquivalent to regularizing model complexity\nGBM: fewer trees = simpler model"},

  {id:"ml_40",topic:"feature_engineering",difficulty:"hard",
   q:"What is target encoding (mean encoding) for categorical variables? What's the danger, and how do you mitigate it?",
   a:"Target encoding replaces each category with the mean of the target variable for that category. For a 'city' feature predicting house price, each city gets replaced by the average house price in that city. Danger: for rare categories (e.g., a city with 2 houses), the mean is essentially the target itself — massive data leakage and overfitting. Mitigation: (1) Smoothing — blend category mean with global mean, weighted by category count: encoded = (n·cat_mean + m·global_mean)/(n+m). (2) K-fold target encoding — compute means using out-of-fold data only. (3) Add random noise proportional to category rarity.",
   eq:"Smoothed encoding = (n·x̄_cat + m·x̄_global) / (n + m)\nm = smoothing factor (higher = more regularization)\nK-fold: compute mean on other folds only"},

  {id:"ml_41",topic:"dimensionality_reduction",difficulty:"medium",
   q:"What is the curse of dimensionality? How does it affect distance-based algorithms and model performance?",
   a:"As dimensions increase, data becomes increasingly sparse — points spread out and distances become less meaningful. Effects: (1) In high dimensions, the ratio of farthest to nearest neighbor approaches 1, making KNN useless since all points are roughly equidistant. (2) More features without proportionally more data leads to overfitting — the model finds spurious patterns in sparse regions. (3) Computational cost grows exponentially. (4) Visualization becomes impossible. Solutions: dimensionality reduction (PCA, feature selection), regularization, or algorithms robust to high dimensions (tree-based methods, which only consider one feature at a time).",
   eq:"As d → ∞: dist_max/dist_min → 1\nData needed grows exponentially with d\nFix: PCA, feature selection, regularization"},

  {id:"ml_42",topic:"evaluation_metrics",difficulty:"hard",
   q:"Explain the ROC curve. What do the axes represent, what does each point on the curve correspond to, and how do you interpret the area under it?",
   a:"The ROC curve plots True Positive Rate (recall) on the y-axis vs False Positive Rate (FPR = FP/(FP+TN)) on the x-axis. Each point corresponds to a different classification threshold — as you lower the threshold, you classify more instances as positive, increasing both TPR and FPR. The diagonal (y=x) represents random guessing. A perfect model hugs the top-left corner (TPR=1, FPR=0). AUC = probability that the model ranks a random positive instance higher than a random negative one. AUC=0.5 is random, AUC=1.0 is perfect. The curve shows performance across ALL thresholds simultaneously, unlike a single precision/recall pair.",
   eq:"TPR (y-axis) = TP/(TP+FN) = Recall\nFPR (x-axis) = FP/(FP+TN)\nAUC = P(score(+) > score(−))\nDiagonal = random baseline"},

  {id:"ml_43",topic:"ensemble_methods",difficulty:"hard",
   q:"What is stacking (stacked generalization) and how does it differ from bagging and boosting?",
   a:"Stacking trains multiple diverse base models (e.g., RF, SVM, logistic regression), then feeds their predictions as features into a meta-model (often logistic regression or linear model) that learns the optimal combination. Differences: Bagging uses the same algorithm on different data samples (reduces variance). Boosting uses the same algorithm sequentially on reweighted data (reduces bias). Stacking uses different algorithms on the same data and learns how to combine them (exploits complementary strengths). Key implementation detail: base model predictions must be generated via cross-validation to avoid leakage — you can't let the meta-model train on predictions made on the same data used to train base models.",
   eq:"Level 0: diverse base models M₁, M₂, ..., Mₖ\nLevel 1: meta-model trained on [M₁(x), M₂(x), ..., Mₖ(x)]\nBase predictions via CV to prevent leakage"},

  {id:"ml_44",topic:"regularization",difficulty:"medium",
   q:"What is dropout in neural networks and how does it act as regularization? What's the typical dropout rate?",
   a:"Dropout randomly sets a fraction of neurons to zero during each training forward pass. Each training step effectively trains a different 'thinned' sub-network. This prevents co-adaptation — neurons can't rely on specific other neurons being present, forcing each to learn more robust features independently. At test time, all neurons are active but weights are scaled by (1-dropout_rate) to compensate for the larger network. It's equivalent to training an ensemble of 2^n sub-networks and averaging them. Typical rates: 0.2-0.5 for hidden layers, 0.1-0.2 for input layers. Higher dropout = more regularization.",
   eq:"Training: randomly zero neurons with probability p\nTest: multiply weights by (1−p)\nTypical p = 0.2–0.5\nEquivalent to ensemble of 2ⁿ sub-networks"},

  {id:"ml_45",topic:"data_leakage",difficulty:"medium",
   q:"You build a model to predict patient readmission. It has 99% accuracy in development but fails in production. You discover 'discharge_summary_length' is the top feature. What happened?",
   a:"Data leakage. Discharge summary length is determined AFTER the patient's stay — longer summaries are written for complex cases that are more likely to be readmitted. This feature encodes future information not available at prediction time (you'd need to predict readmission at admission, before discharge). In development, this feature was available for all rows, giving artificially high accuracy. In production, when predicting at admission time, this feature doesn't exist yet. Fix: rigorously define the prediction point in time, then exclude all features that wouldn't be available at that moment.",
   eq:"Prediction time: at admission\nLeaked feature: created at discharge (future)\nFix: only use features available at prediction time"},

  {id:"ml_46",topic:"model_selection",difficulty:"easy",
   q:"What is Occam's Razor in the context of machine learning, and how does it relate to model selection?",
   a:"Occam's Razor states that among models with similar predictive performance, prefer the simpler one. In ML: if a linear model and a deep neural network both achieve 85% accuracy, choose the linear model — it's more interpretable, less prone to overfitting, cheaper to deploy, and easier to debug. Formal connections: regularization implements Occam's Razor by penalizing complexity; AIC/BIC model selection criteria add complexity penalties to likelihood; minimum description length (MDL) formalizes choosing models that compress data most efficiently. Simplicity isn't just aesthetic — simpler models generalize better because they're less likely to fit noise.",
   eq:"Principle: similar performance → choose simpler model\nAIC = 2k − 2ln(L)\nBIC = k·ln(n) − 2ln(L)\nk = parameters, L = likelihood"},

  {id:"ml_47",topic:"gradient_descent",difficulty:"medium",
   q:"What is the Adam optimizer and why is it preferred over vanilla SGD in many deep learning applications?",
   a:"Adam (Adaptive Moment Estimation) combines two ideas: (1) momentum — maintains an exponential moving average of past gradients (first moment), which smooths noisy updates and accelerates through flat regions; (2) RMSProp — maintains a moving average of squared gradients (second moment), which adapts the learning rate per-parameter. Parameters with historically large gradients get smaller updates, and vice versa. Advantages over vanilla SGD: requires less learning rate tuning, converges faster in practice, handles sparse gradients well, and works across diverse architectures. Default hyperparameters (lr=0.001, β₁=0.9, β₂=0.999) work well in most cases.",
   eq:"m_t = β₁·m_{t-1} + (1−β₁)·g_t  (momentum)\nv_t = β₂·v_{t-1} + (1−β₂)·g_t²  (adaptive LR)\nθ_t = θ_{t-1} − α·m̂_t / (√v̂_t + ε)"},

  {id:"ml_48",topic:"eda",difficulty:"hard",
   q:"You're analyzing a time-series dataset and notice model performance degrades over time in production. What is this phenomenon called and how do you address it?",
   a:"This is concept drift (or data drift) — the statistical properties of the data change over time, causing a model trained on historical data to become stale. Types: (1) Gradual drift — slow changes in user behavior or market conditions. (2) Sudden drift — a policy change or external event. (3) Recurring drift — seasonal patterns. Solutions: monitor model performance continuously with alerts on degradation; retrain periodically on recent data (sliding window); use online learning that updates incrementally; track feature distributions (PSI — Population Stability Index) to detect input drift before performance drops; maintain challenger models trained on recent data.",
   eq:"Concept drift: P(Y|X) changes over time\nData drift: P(X) changes over time\nPSI = Σ(Actual% − Expected%) · ln(Actual%/Expected%)\nFix: monitor, retrain, online learning"},

  {id:"ml_49",topic:"key_concepts",difficulty:"medium",
   q:"What is the difference between parametric and non-parametric models? Give examples of each and explain the tradeoff.",
   a:"Parametric models assume a fixed functional form with a finite number of parameters (determined before seeing data). Examples: linear regression, logistic regression, naive Bayes. Complexity doesn't grow with data size. Non-parametric models make fewer assumptions about the form and let complexity grow with data. Examples: KNN, decision trees, kernel SVM, Random Forest. Tradeoff: parametric models are faster, need less data, and are more interpretable, but can underfit if assumptions are wrong. Non-parametric models are more flexible and can fit any pattern given enough data, but need more data, are slower, and risk overfitting with insufficient data.",
   eq:"Parametric: fixed # params (e.g., p+1 for linear reg)\nNon-parametric: complexity grows with n\nMore data → non-parametric wins\nLess data → parametric safer"},

  {id:"ml_50",topic:"key_concepts",difficulty:"hard",
   q:"Explain the difference between generative and discriminative models. Give an example of each for classification and explain when you'd prefer one over the other.",
   a:"Discriminative models learn the decision boundary P(Y|X) directly — they model how to distinguish classes given features. Example: logistic regression, SVM, neural networks. Generative models learn the joint distribution P(X,Y) = P(X|Y)·P(Y) — they model how data is generated for each class, then use Bayes' rule to classify. Example: Naive Bayes, Gaussian Mixture Models, LDA. Prefer discriminative when: you have plenty of labeled data and only need classification (usually higher accuracy). Prefer generative when: labeled data is scarce (can leverage unlabeled data), you need to generate synthetic samples, detect anomalies (low P(X)), or handle missing features gracefully.",
   eq:"Discriminative: learn P(Y|X) directly\nGenerative: learn P(X|Y)·P(Y), classify via Bayes\nMore labeled data → discriminative wins\nLess data / need generation → generative"},

  {id:"ml_51",topic:"case_study",difficulty:"hard",
   q:"A ride-sharing company wants to predict surge pricing. What features would you engineer, what model would you choose, and what metric would you optimize?",
   a:"Features: time of day, day of week, weather conditions, local events (concerts, sports), historical demand patterns, current driver supply, nearby ride requests (spatial density), holidays. Model: gradient boosting (XGBoost/LightGBM) — handles nonlinear relationships, feature interactions, and mixed feature types well. For real-time serving, consider a simpler model trained on GBM-selected features. Metric: optimize MAE or MAPE (mean absolute percentage error) rather than RMSE if you want errors proportional to price level. Also track business metrics: rider conversion rate at predicted prices, driver utilization, revenue. Validate with time-based splits (not random) since this is temporal data.",
   eq:"MAPE = (1/n)·Σ|actual − predicted|/actual × 100\nTime-based CV: train on past, validate on future\nBusiness metrics alongside model metrics"},

  {id:"ml_52",topic:"case_study",difficulty:"hard",
   q:"You're building a model to predict customer churn for a subscription service. Walk through your approach from data to deployment, including metric selection.",
   a:"1. Define churn precisely (no activity for 30 days? explicit cancellation?). 2. Features: usage frequency trends, time since last activity, support tickets, payment failures, tenure, plan type, engagement metrics. 3. Handle class imbalance (churn is rare): use SMOTE or class weights, NOT accuracy. 4. Model: start with logistic regression (interpretable baseline), compare with gradient boosting. 5. Metrics: use AUC-PR (not AUC-ROC) because classes are imbalanced. Optimize recall if intervention cost is low (email campaign) or precision if intervention is expensive (discount offers). 6. Calibrate probabilities for business rules ('contact all customers with P(churn) > 0.7'). 7. Deploy with monitoring for concept drift — churn patterns change with product updates.",
   eq:"Define churn window carefully\nImbalanced → AUC-PR, not accuracy\nCalibrate P(churn) for business thresholds\nMonitor for drift post-deployment"},

  {id:"ml_53",topic:"case_study",difficulty:"medium",
   q:"An e-commerce company runs an A/B test on a new checkout flow. Test group shows 3% higher conversion but the p-value is 0.08. What do you recommend?",
   a:"At α=0.05, p=0.08 is not statistically significant — but this doesn't mean there's no effect. Recommendations: (1) Check sample size and power — were you powered to detect a 3% lift? If underpowered, the test was inconclusive, not negative. (2) Look at confidence interval — if the CI is [−0.5%, +6.5%], the effect could plausibly be meaningful. (3) Consider practical significance — 3% conversion lift could be worth millions at scale; the business cost of a false negative may exceed the cost of a false positive. (4) Run longer to accumulate more data. (5) Segment analysis — the effect might be strong in a subgroup. Do NOT p-hack by repeatedly checking or selecting favorable subgroups post-hoc.",
   eq:"p = 0.08 > α = 0.05 → not significant at 5%\nBut: check power, CI, practical significance\nPower = P(reject H₀ | H₁ true)\nDon't p-hack: pre-register hypotheses"},

  {id:"ml_54",topic:"case_study",difficulty:"hard",
   q:"A hospital wants to predict patient readmission within 30 days. What unique challenges does healthcare ML present, and how do you choose metrics?",
   a:"Challenges: (1) Class imbalance — readmissions are rare (~10-15%). (2) Data quality — missing values, inconsistent coding, free-text notes. (3) Temporal leakage — features must be available at discharge time, not after. (4) Fairness — model must not discriminate by race, gender, or socioeconomic status. (5) Interpretability — clinicians need to understand predictions to act on them. Metrics: recall is critical (missing a high-risk patient is costly), but flag rate must be manageable for staff. Use precision@k (precision in the top-k riskiest patients) to match intervention capacity. AUC-PR over AUC-ROC for imbalanced classes. Also measure calibration — P(readmit)=0.3 should mean 30% of those patients actually readmit.",
   eq:"Precision@k: precision for top-k predictions\nCalibration: predicted P matches observed rate\nFairness: equal performance across protected groups\nTemporal: only use features available at discharge"},

  {id:"ml_55",topic:"case_study",difficulty:"medium",
   q:"A marketing team wants to know which customer segments respond best to email campaigns. What ML approach would you use, and how do you measure success?",
   a:"This is an uplift modeling (heterogeneous treatment effect) problem — you want to find customers where the email CAUSES a purchase, not just customers who would have purchased anyway. Approach: (1) Run a randomized experiment with control (no email) and treatment (email) groups. (2) Use a meta-learner (T-learner, S-learner, or X-learner) to estimate conditional average treatment effect (CATE) per customer. (3) Rank customers by predicted uplift. Metrics: the key metric is incremental lift — additional conversions caused by the email, not total conversions in the treated group. Measure using uplift curves and AUUC (area under the uplift curve). Segment by predicted uplift: 'persuadables' (high uplift), 'sure things' (buy regardless), 'lost causes' (won't buy regardless), 'sleeping dogs' (email causes them NOT to buy).",
   eq:"CATE(x) = E[Y(1) − Y(0) | X=x]\nSegments: persuadable, sure thing, lost cause, sleeping dog\nMetric: AUUC (area under uplift curve)\nNeed randomized experiment for valid estimates"},

  {id:"ml_56",topic:"metrics",difficulty:"hard",
   q:"When should you use log-loss (cross-entropy) vs. AUC-ROC vs. Brier score for evaluating a binary classifier? What does each measure?",
   a:"Log-loss: measures the quality of predicted probabilities — heavily penalizes confident wrong predictions. Use when you need well-calibrated probabilities (e.g., 'this patient has a 73% risk'). AUC-ROC: measures ranking ability — how well the model separates positives from negatives across all thresholds. Use when you care about relative ordering, not specific probabilities (e.g., 'rank fraud risk'). Brier score: mean squared difference between predicted probability and actual outcome — combines calibration and discrimination. Use as a general-purpose proper scoring rule. Key difference: AUC is threshold-independent and scale-invariant; log-loss and Brier score are threshold-independent but scale-dependent. A well-calibrated model with good discrimination will score well on all three.",
   eq:"Log-loss = −(1/n)·Σ[yᵢ·log(p̂ᵢ) + (1−yᵢ)·log(1−p̂ᵢ)]\nBrier = (1/n)·Σ(p̂ᵢ − yᵢ)²\nAUC = P(score(+) > score(−))\nCalibrated + discriminative → good on all"},

  {id:"ml_57",topic:"metrics",difficulty:"medium",
   q:"You're comparing two regression models. Model A has RMSE=10, Model B has MAE=7. Can you directly compare these? What does each penalize differently?",
   a:"No, you cannot directly compare RMSE and MAE — they're different metrics on different scales. RMSE = √(mean of squared errors) penalizes large errors disproportionately due to squaring. MAE = mean of absolute errors treats all errors equally. If RMSE >> MAE for the same model, it indicates the presence of large outlier errors (squaring amplifies them). To compare models, use the same metric on the same test set. Choose RMSE when large errors are especially costly (e.g., predicting structural loads). Choose MAE when errors are equally important regardless of magnitude (e.g., predicting delivery time). Also consider MAPE for interpretable percentage errors, but it's undefined when actuals are zero.",
   eq:"RMSE = √((1/n)·Σ(yᵢ − ŷᵢ)²)\nMAE = (1/n)·Σ|yᵢ − ŷᵢ|\nRMSE ≥ MAE always (equality only if all errors identical)\nRMSE >> MAE → large outlier errors present"},

  {id:"ml_58",topic:"case_study",difficulty:"hard",
   q:"A content platform wants to build a recommendation system. Compare collaborative filtering vs. content-based filtering. What metrics measure recommendation quality?",
   a:"Collaborative filtering: recommends based on similar users' behavior ('users who liked X also liked Y'). Strengths: discovers unexpected interests, no content analysis needed. Weaknesses: cold-start problem (new users/items have no history), popularity bias. Content-based: recommends based on item features similar to what the user already liked. Strengths: handles cold-start for items, transparent reasoning. Weaknesses: limited novelty, requires feature engineering. Hybrid approaches combine both. Metrics: offline — precision@k, recall@k, NDCG (normalized discounted cumulative gain, rewards relevant items ranked higher), MAP (mean average precision). Online — click-through rate, engagement time, conversion rate. Also measure diversity (are recommendations varied?) and coverage (what fraction of items are ever recommended?).",
   eq:"NDCG@k = DCG@k / IDCG@k\nDCG@k = Σᵢ relᵢ / log₂(i+1)\nOffline: precision@k, recall@k, NDCG, MAP\nOnline: CTR, engagement, coverage, diversity"},

  {id:"ml_59",topic:"metrics",difficulty:"medium",
   q:"What is a calibration curve and why does it matter even when AUC is high? How do you fix a poorly calibrated model?",
   a:"A calibration curve plots predicted probabilities against observed frequencies. A perfectly calibrated model's curve follows the diagonal — when it predicts 30% probability, ~30% of those cases are actually positive. A model can have high AUC (good ranking) but poor calibration (probabilities are off). This matters when decisions depend on absolute probabilities, not just rankings: insurance pricing, medical risk scores, bid optimization. Fix poor calibration with: (1) Platt scaling — fit a logistic regression on model outputs using a validation set. (2) Isotonic regression — non-parametric calibration, more flexible but needs more data. (3) Temperature scaling — for neural networks, divide logits by a learned temperature parameter. Always calibrate on a held-out set, never on training data.",
   eq:"Perfect calibration: P(Y=1 | p̂=p) = p\nPlatt scaling: P_calibrated = σ(a·f(x) + b)\nIsotonic: non-parametric monotonic mapping\nCalibrate on validation set, not training"},

  {id:"ml_60",topic:"case_study",difficulty:"hard",
   q:"A bank wants to build a credit scoring model. What are the unique constraints, and how do you balance predictive power with regulatory requirements?",
   a:"Constraints: (1) Regulatory: models must be explainable (ECOA, FCRA require adverse action reasons — 'you were denied because of X'). (2) Fairness: cannot discriminate on protected attributes (race, gender, age) — even proxy variables are scrutinized. (3) Stability: models must be robust over time; regulators require periodic validation. (4) Interpretability: logistic regression or scorecards are industry standard because each feature's contribution is transparent. Approach: use logistic regression with weight-of-evidence (WOE) encoding for interpretability. If using ML (GBM), pair with SHAP values for explanations. Metrics: KS statistic (max separation between cumulative distributions of goods and bads), Gini coefficient (= 2·AUC − 1), and PSI for monitoring stability. Test for disparate impact across protected groups.",
   eq:"Gini = 2·AUC − 1 (industry standard)\nKS = max|F_good(s) − F_bad(s)|\nPSI for stability monitoring\nSHAP for post-hoc explanations on black-box models"}
];
