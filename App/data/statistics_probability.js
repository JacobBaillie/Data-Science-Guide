const STATS_PROB_DATA = [
  {id:"stats_1",topic:"ab_testing",difficulty:"medium",
   q:"You run an A/B test on a new playlist recommendation feature. The control group (n=5,000) had a mean 40-minute listening session with σ=10 min. The treatment group (n=5,000) had a mean 42-minute session with σ=10 min. Is the difference statistically significant at α=0.05? Walk through the full test.",
   a:"Set up H₀: no difference. Compute SE of the difference, then z. SE_diff = √(σ²/n₁ + σ²/n₂) = √(100/5000 + 100/5000) = √0.04 = 0.2. z = (42-40)/0.2 = 10. Since |z| = 10 >> 1.96, reject H₀ — the 2-minute lift is highly significant. The large n makes even small effects detectable.",
   eq:"SE_diff = √(σ²/n₁ + σ²/n₂) = 0.2\nz = (42 − 40) / 0.2 = 10  →  reject H₀"},

  {id:"stats_2",topic:"regression",difficulty:"hard",
   q:"You model nightly booking counts per listing using Poisson regression. Diagnostics show the sample variance of counts is 3× the sample mean. What does this tell you, and what model would you switch to? What parameter would you report?",
   a:"A variance:mean ratio of 3 signals overdispersion — the data violates Poisson's assumption that σ² = μ. You have two options: Quasi-Poisson adds a dispersion factor φ ≈ 3 (so σ² = 3μ), which adjusts standard errors but keeps the same coefficient estimates. For heavier clustering (e.g., highly popular vs. dormant listings), Negative Binomial is better as it models variance = μ + α·μ². Report the dispersion ratio = s²/x̄ ≈ 3 and justify the model choice.",
   eq:"Dispersion ratio = s² / x̄ = 3  →  overdispersed\nQuasi-Poisson: σ² = φ·λ  (φ ≈ 3)\nNeg. Binomial: σ² = μ + α·μ²"},

  {id:"stats_3",topic:"probability",difficulty:"medium",
   q:"You draw 2 cards from a standard 52-card deck without replacement. What is the probability both cards are the same suit? Show your reasoning step by step.",
   a:"First card: any card, so P = 1. Given the first card's suit, there are 12 remaining cards of that suit out of 51 remaining total. P(same suit | first drawn) = 12/51. So P(both same suit) = 1 × 12/51 = 12/51 ≈ 0.235. This is a dependent event — the second probability changes because the deck changes after the first draw.",
   eq:"P = 12/51 ≈ 0.235"},

  {id:"stats_4",topic:"regression",difficulty:"hard",
   q:"Netflix tests a new content ranking algorithm using Difference-in-Differences. Beta users gained +8 minutes/day watch time; regular users gained +3 minutes/day in the same period. What is the causal DiD estimate? What key assumption must hold for this to be valid?",
   a:"DiD = (Δtreated) − (Δcontrol) = 8 − 3 = +5 minutes/day attributable to the algorithm. The key assumption is parallel trends: without the new algorithm, beta and regular users would have trended identically. If beta users self-selected (e.g., more engaged users opt into beta), this assumption may be violated and you'd need Propensity Score Matching instead.",
   eq:"DiD = Δtreated − Δcontrol = 8 − 3 = +5 min/day"},

  {id:"stats_5",topic:"probability",difficulty:"hard",
   q:"In a room of 30 people, what is the probability that at least two share a birthday? Set up the calculation (do not simplify fully). What counterintuitive result does this illustrate?",
   a:"P(at least two share) = 1 − P(all distinct). P(all distinct) = (365/365)·(364/365)·(363/365)·...·(336/365) = 365!/(335!·365³⁰). For k=30 this is approximately 0.294, so P(at least two share) ≈ 1 − 0.294 = 0.706 or ~70.6%. Counterintuitively, you only need 23 people for a 50% chance — this is the Birthday Paradox, driven by the quadratic number of pairs C(n,2).",
   eq:"P(at least 2 share) = 1 − ∏ᵢ₌₀ⁿ⁻¹ (365−i)/365\n≈ 1 − 0.294 = 0.706  for n=30"},

  {id:"stats_6",topic:"ab_testing",difficulty:"medium",
   q:"A PM wants to A/B test a new checkout button color. They plan to run it for 1 week and check p-value daily, stopping as soon as p < 0.05. Why is this problematic, and what should they do instead?",
   a:"This is the 'peeking problem' or multiple comparisons issue. Checking significance daily inflates the Type I error rate far above 5% — each check is another chance to find a spurious significant result. By day 7 with daily checks, the effective α can exceed 30%. Fix: pre-specify sample size using a power calculation before starting, commit to a single test at that point, or use sequential testing methods (e.g., alpha spending functions) that properly account for multiple looks.",
   eq:"Effective α >> 0.05 with k looks\nFix: pre-register n via power = 1 − β = P(reject H₀ | H₁ true)"},

  {id:"stats_7",topic:"regression",difficulty:"hard",
   q:"You want to estimate the effect of surge pricing on driver supply. The problem is that drivers who work during surge are more experienced and likely to work regardless. Which causal method addresses this bias, and how does it work?",
   a:"Propensity Score Matching. The treatment group (drivers who worked during surge) is systematically different — they have a higher propensity to work. PSM estimates P(surge = 1 | all driver covariates) for each driver, then matches each treated driver to a control driver with a similar propensity score. This creates a pseudo-randomized comparison where both groups have the same likelihood of treatment, removing the selection bias.",
   eq:"Propensity = P(treatment=1 | X₁, X₂, ..., Xₙ)\nMatch treated & control on propensity score"},

  {id:"stats_8",topic:"distributions",difficulty:"easy",
   q:"Daily retweet counts for a viral post follow a Poisson distribution with λ=200. What are the mean and standard deviation of daily retweet counts? If tomorrow you observe 230 retweets, is this unusual?",
   a:"Mean = λ = 200. Variance = λ = 200, so std dev = √200 ≈ 14.1. A z-score for 230 retweets: z = (230 − 200)/14.1 ≈ 2.13. This is beyond 2 std devs but below 3, so it's notable but not a statistical outlier (by the z > 3 rule for symmetric data). About 3.3% of days would exceed this count by chance.",
   eq:"μ = σ² = λ = 200,  σ = √200 ≈ 14.1\nz = (230−200)/14.1 ≈ 2.13"},

  {id:"stats_9",topic:"regression",difficulty:"medium",
   q:"You build a logistic regression model to predict whether a user will click on a job ad. The model scores users 0–1. The calibration plot shows predicted probabilities of 0.8 but actual click rates of only 0.4 for that bucket. What does this mean and how do you fix it?",
   a:"The model is poorly calibrated — it's overconfident, assigning probabilities nearly 2× the true rate. Possible causes: class imbalance in training data, training data not matching production distribution, or overfitting. Fixes: Platt scaling (fit a logistic regression on top of raw scores), isotonic regression calibration, or recalibrate using a held-out validation set. After calibration, verify the calibration curve sits close to the diagonal.",
   eq:"Calibration: predicted P(click) should ≈ observed rate\nBrier Score = (1/n)·Σ(pᵢ − yᵢ)² measures calibration quality"},

  {id:"stats_10",topic:"distributions",difficulty:"hard",
   q:"Daily fraud counts at Stripe are modeled with Negative Binomial rather than Poisson. The estimated mean is μ=50 fraud cases/day with α=0.1. Compute the variance. Why is Negative Binomial more appropriate than Poisson here?",
   a:"Variance = μ + α·μ² = 50 + 0.1·2500 = 50 + 250 = 300. Under Poisson, variance would be only 50. The much higher variance (300 vs 50) reflects that fraud is bursty — a single compromised data breach drives many correlated fraud attempts in a short window. This clustering violates Poisson's independence assumption, making Negative Binomial the right choice.",
   eq:"σ² = μ + α·μ² = 50 + 0.1·(50²) = 300\nPoisson would predict σ² = 50"},

  {id:"stats_11",topic:"variance",difficulty:"medium",
   q:"You sample 100 delivery times from a city with population mean 30 min and std dev 8 min. What is the probability the sample mean exceeds 31.5 minutes? What theorem makes this calculation valid?",
   a:"By the Central Limit Theorem, the sample mean is approximately normally distributed with mean 30 and SE = σ/√n = 8/10 = 0.8. z = (31.5 − 30)/0.8 = 1.875. P(z > 1.875) ≈ 1 − 0.9696 = 0.030, or about 3%. The CLT makes this valid regardless of the true distribution of delivery times, as long as n is large enough (n=100 qualifies).",
   eq:"SE = 8/√100 = 0.8\nz = (31.5 − 30) / 0.8 = 1.875\nP(x̄ > 31.5) ≈ 3%"},

  {id:"stats_12",topic:"regression",difficulty:"hard",
   q:"You build a model to predict next-day stock returns using 50 features including many highly correlated technical indicators (RSI, MACD, momentum). The model has near-zero training error but poor test performance. Which regularization method is most appropriate, and why?",
   a:"Ridge (L2) regularization. Lasso would aggressively drop correlated features entirely, potentially discarding useful signal. Ridge shrinks all coefficients toward zero simultaneously while keeping correlated predictors in the model with reduced magnitudes — their shared information is distributed across them rather than arbitrarily assigned to one. The quadratic penalty also has a closed-form solution, which is numerically stable. The poor train/test gap indicates overfitting, and Ridge's bias-variance tradeoff (small bias increase for large variance reduction) directly addresses this.",
   eq:"Ridge loss = OLS + α·Σβⱼ²\nBias² ↑ slightly, Variance ↓ significantly → lower test MSE"},

  {id:"stats_13",topic:"distributions",difficulty:"medium",
   q:"Instacart models items per basket as Binomial(n=50, p=0.3). A data scientist argues Poisson with λ=15 is simpler. Under what condition is this approximation valid? What does Poisson assume that Binomial doesn't?",
   a:"The Binomial converges to Poisson when n is large and p is small with np = λ fixed. Here n=50 and p=0.3 — p is not small, so the approximation is poor. Poisson requires independent events with a constant small rate; Binomial allows larger p. Key difference: Binomial variance = np(1-p) = 10.5 < mean=15, while Poisson sets variance = mean = 15. You should use Binomial here since p=0.3 is not close to 0.",
   eq:"Binomial → Poisson when n→∞, p→0, np=λ\nBinomial variance = 15·(1−0.3) = 10.5 ≠ 15 (Poisson)"},

  {id:"stats_14",topic:"ab_testing",difficulty:"medium",
   q:"Slack runs a feature test and finds a statistically significant drop in message-sent per day (p=0.02) but the drop is only 0.1 messages/day. The PM says 'statistical significance means this matters.' How do you respond?",
   a:"Statistical significance and practical significance are different. With large enough n, even a 0.1 message/day decrease will produce p < 0.05 — but this is economically meaningless. Always report effect size alongside p-value. For business decisions, translate to real impact: 0.1 messages/day × 10M users = 1M fewer messages/day — then decide if that matters. Prefer confidence intervals over just p-values: report '−0.1 messages/day, 95% CI [−0.15, −0.05]' to communicate magnitude and uncertainty together.",
   eq:"Effect size ≠ p-value significance\nPractical threshold: is Δ × user_base economically meaningful?"},

  {id:"stats_15",topic:"regression",difficulty:"hard",
   q:"Lyft wants to estimate the causal effect of driver bonuses on acceptance rate. Problem: only drivers with low acceptance rates are offered bonuses. Describe why OLS is biased here, and what method you would use.",
   a:"This is selection bias — the treatment (bonus) is not randomly assigned. Drivers with low acceptance rates (who are systematically different) are selected into treatment. OLS would pick up both the bonus effect and the underlying low-acceptance characteristic, giving a downward-biased estimate. Use Regression Discontinuity Design: if bonuses are offered to drivers below a threshold (e.g., < 70% acceptance), compare drivers just below and just above the cutoff — they are nearly identical except for treatment assignment, providing a clean local causal estimate.",
   eq:"RDD: compare just-below vs just-above threshold\nLocal causal estimate near cutoff where assignment ≈ random"},

  {id:"stats_16",topic:"probability",difficulty:"hard",
   q:"A trading bot makes independent buy decisions each minute. Each minute it wins with probability 0.55 and loses with probability 0.45. You run the bot for 100 minutes. Using CLT, what are the mean and std dev of total wins? What is the approximate probability of winning fewer than 45 times?",
   a:"Each minute is a Bernoulli(p=0.55) trial. Over 100 minutes: mean wins = np = 55, variance = np(1-p) = 100·0.55·0.45 = 24.75, std dev = √24.75 ≈ 4.97. For < 45 wins: z = (45 − 55)/4.97 ≈ −2.01. P(wins < 45) ≈ P(z < −2.01) ≈ 2.2%. CLT is valid here since n=100 is large enough for the Binomial to approximate Normal.",
   eq:"μ = np = 55,  σ = √(np(1−p)) = 4.97\nz = (45−55)/4.97 ≈ −2.01  →  P ≈ 2.2%"},

  {id:"stats_17",topic:"variance",difficulty:"medium",
   q:"You want to estimate average workout duration across all Peloton users. A sample of 400 users gives x̄ = 38 min and s = 12 min. Construct a 95% confidence interval for the true mean. What does this interval mean in plain English?",
   a:"With n=400, use z (large sample). SE = s/√n = 12/20 = 0.6. 95% CI = x̄ ± 1.96·SE = 38 ± 1.18 = (36.82, 39.18) minutes. Plain English: if you repeated this sampling process many times and built a CI each time, 95% of those intervals would contain the true population mean. It does NOT mean there is a 95% probability the true mean is in this specific interval.",
   eq:"SE = 12/√400 = 0.6\n95% CI = 38 ± 1.96·0.6 = (36.82, 39.18)"},

  {id:"stats_18",topic:"distributions",difficulty:"medium",
   q:"Twitch models the number of chat messages per second during a stream as Poisson(λ=80). A spike to 120 messages/second is observed. Compute the z-score. Would you flag this as an anomaly?",
   a:"For Poisson, σ = √λ = √80 ≈ 8.94. z = (120 − 80)/8.94 ≈ 4.47. This exceeds 3 standard deviations — by the z > 3 rule for symmetric data, this is a statistical outlier. In practice, this likely indicates a notable in-stream event (streamer achievement, raid) and would be worth investigating as a signal, not noise.",
   eq:"σ = √λ = √80 ≈ 8.94\nz = (120 − 80) / 8.94 ≈ 4.47  →  flag as anomaly"},

  {id:"stats_19",topic:"regression",difficulty:"medium",
   q:"You train an L1 (Lasso) regression model using 100 audio features to predict song popularity. After training, 85 of 100 coefficients are exactly zero. A colleague says this is a bug. Is it? What is the model doing, and when is this desirable?",
   a:"This is not a bug — it is Lasso's intended behavior. The L1 penalty (α·Σ|βⱼ|) creates a kink at zero in the loss surface that drives irrelevant coefficients to exactly zero. The model effectively selected the 15 most predictive audio features and discarded the rest. This is desirable when many features are likely extraneous (sparse signal problem) — it produces a simpler, more interpretable model and reduces overfitting. Ridge (L2) would shrink all 100 coefficients but keep them all nonzero.",
   eq:"Lasso loss = OLS + α·Σ|βⱼ|\nL1 can set βⱼ = 0 exactly (feature selection)"},

  {id:"stats_20",topic:"ab_testing",difficulty:"hard",
   q:"Pinterest tests a new image ranking algorithm on users in the US and Canada. The US shows +5% saves (p=0.01); Canada shows +1% saves (p=0.4). A PM wants to ship to both countries. What concerns do you raise? What analysis would help?",
   a:"Heterogeneous treatment effects — the algorithm appears to only work in the US. Before concluding, check if the Canadian result is truly null or just underpowered (smaller n, less variance?). Run a meta-learner or subgroup analysis to estimate the Conditional Average Treatment Effect (CATE) by country. Also check whether US and Canada differ in usage patterns that could explain the gap. Shipping to Canada based on US significance alone risks a null or negative rollout. Consider a phased rollout with country-stratified monitoring.",
   eq:"CATE = E[Y(1)−Y(0) | subgroup]\nTest for heterogeneity: interaction term country × treatment"},

  {id:"stats_21",topic:"regression",difficulty:"hard",
   q:"You run a DiD analysis comparing Airbnb booking rates in cities before/after a new search algorithm. Before: treated cities +2%, control cities +2%. After: treated cities +8%, control cities +3%. Compute DiD. Does the parallel trends assumption hold here? How do you know?",
   a:"DiD = (8−2) − (3−2) = 6 − 1 = +5 percentage points from the algorithm. Parallel trends: the pre-period trends being equal (+2% for both) is evidence supporting the assumption — both groups were moving together before treatment. This is called a pre-trend check or falsification test. You should also plot treatment and control trends over multiple pre-treatment periods to confirm no divergence before intervention.",
   eq:"DiD = (Δtreated) − (Δcontrol) = (8−2) − (3−2) = +5pp\nParallel trends check: pre-period Δtreated = Δcontrol ✓"},

  {id:"stats_22",topic:"probability",difficulty:"medium",
   q:"A DoorDash driver gets a delivery assigned every 10 minutes on average (Poisson process). The system checks for new assignments every minute. What is the expected number of minutes until the driver gets their first assignment? What if you model it as geometric?",
   a:"Poisson with λ=0.1 per minute. Expected wait = 1/λ = 10 minutes (exponential inter-arrival). If modeled as geometric (discrete): each minute independently has p=0.1 of assignment. E[wait] = 1/p = 10 minutes. Both give the same answer — the geometric distribution is the discrete analog of the exponential, and for small p the approximation is essentially exact. This illustrates the Poisson-Geometric duality.",
   eq:"Poisson: E[wait] = 1/λ = 10 min\nGeometric: E[wait] = 1/p = 1/0.1 = 10 min"},

  {id:"stats_23",topic:"variance",difficulty:"hard",
   q:"Two independent data scientists each measure the same user engagement metric. Scientist A gets x₁ ~ N(μ₁=5, σ²₁=4), Scientist B gets x₂ ~ N(μ₂=3, σ²₂=9). Their manager says 'just take the weighted average based on variance.' Using MMSE, what is the best estimate of the true signal S = x₁ + x₂ = 8?",
   a:"This is the conditional expectation problem. Given S = x₁ + x₂ = 8, estimate x₂: E(x₂|S=8) = m₂ + σ²₂/(σ²₁+σ²₂)·(S − m₁ − m₂) = 3 + 9/(4+9)·(8 − 5 − 3) = 3 + 9/13·0 = 3. The MMSE estimate of x₂ is just its prior mean 3 because S equals m₁+m₂ exactly — no updating needed. If S ≠ m₁+m₂, the higher-variance estimate gets more 'blame' for the discrepancy.",
   eq:"E(x₂|S=8) = 3 + 9/13·(8−5−3) = 3 + 0 = 3\n(Higher σ² → more weight in discrepancy attribution)"},

  {id:"stats_24",topic:"distributions",difficulty:"medium",
   q:"Weekly sales for a product category follow N(μ=1000, σ=150). A store manager is worried if weekly sales drop below 700. What is the probability of this happening? Interpret your result.",
   a:"z = (700 − 1000)/150 = −300/150 = −2.0. P(sales < 700) = P(z < −2) ≈ 2.28%. This is a 2-sigma event. In a year (52 weeks), you'd expect this roughly 52 × 0.023 ≈ 1.2 times. The manager should treat this as a real but infrequent risk and consider a safety stock buffer sized to this probability.",
   eq:"z = (700 − 1000) / 150 = −2.0\nP(sales < 700) ≈ 2.28%"},

  {id:"stats_25",topic:"regression",difficulty:"hard",
   q:"You want to study whether adding photos to a restaurant listing causes more bookings. The problem is that higher-quality restaurants are both more likely to add photos and get more bookings anyway. Identify the confound and propose a causal strategy.",
   a:"Restaurant quality is the confounder — it affects both the treatment (adding photos) and the outcome (bookings). Simple OLS overestimates the photo effect. Strategy: Instrumental Variables. Find a variable that causes restaurants to add photos but is unrelated to inherent quality — e.g., a platform-sent push notification randomly sent to a subset of restaurants encouraging photo uploads. The notification affects photo likelihood but not the restaurant's actual quality, making it a valid instrument to isolate the causal photo effect.",
   eq:"Confounder: quality → {photos, bookings}\nIV: notification → photos (IV), notification ⊥ quality"},

  {id:"stats_26",topic:"ab_testing",difficulty:"medium",
   q:"Zoom runs a test and finds their new video compression reduces bandwidth by 15% (95% CI: [10%, 20%]). A PM asks 'what is the probability that the true reduction is exactly 15%?' How do you respond?",
   a:"The probability that the true reduction is exactly 15% is zero — under frequentist inference, the true effect is a fixed unknown constant, not a random variable. The CI means: if you repeated the experiment many times, 95% of such intervals would contain the true value. The PM is conflating frequentist CIs with Bayesian credible intervals. If you want a probability statement, you'd need a Bayesian approach with a prior. The correct statement: '95% CI [10%, 20%] — consistent with a true effect between 10% and 20%.'",
   eq:"Frequentist CI ≠ P(θ ∈ interval)\n95% CI → 95% of intervals from repeated experiments cover θ"},

  {id:"stats_27",topic:"distributions",difficulty:"hard",
   q:"Shopify models monthly store revenue as Normal. For a cohort of 10,000 stores, mean revenue is $5,000/month with σ=$2,000. You sample 25 stores. What is the std dev of the sample mean? What is the std dev of the total revenue of those 25 stores?",
   a:"SE of mean = σ/√n = 2000/5 = $400. So sample mean ≈ $5,000 ± $400. For the total revenue of 25 stores: std dev of sum = √n·σ = 5·2000 = $10,000. So total ≈ $125,000 ± $10,000. Key insight: summing compounds variance (grows as √n·σ) while averaging dilutes it (shrinks as σ/√n).",
   eq:"SE of mean = σ/√n = 2000/5 = 400\nSE of sum  = √n·σ = 5·2000 = 10,000"},

  {id:"stats_28",topic:"probability",difficulty:"hard",
   q:"Netflix uses a recommendation engine that cycles through 3 content categories: Action → Drama → Comedy → Action. Given that a user starts at Action, what is the expected number of recommendations until they receive a Comedy? Set up as a Markov chain.",
   a:"Define states E_A (at Action), E_D (at Drama), E_C (Comedy = success). E_A = 1 + E_D (must go through Drama). E_D = 1 + E_C, but E_C = 1 (one more step to reach Comedy and stop... actually E_C = 0 since Comedy is the target). E_D = 1 + 0 = 1. E_A = 1 + 1 = 2. Starting from Action, expected 2 more recommendations to reach Comedy. This is a simple deterministic Markov chain with E_i = 1 + E_next at each step.",
   eq:"E_A = 1 + E_D\nE_D = 1 + 0 = 1\nE_A = 2 recommendations"},

  {id:"stats_29",topic:"regression",difficulty:"medium",
   q:"Duolingo wants to identify which user segments benefit most from streak reminders. Average effect is +2 lessons/week, but the analyst suspects some users respond much more than others. What causal inference framework handles this, and what does it output?",
   a:"Meta-learners for Heterogeneous Treatment Effect estimation. Instead of an Average Treatment Effect (ATE), they output a Conditional Average Treatment Effect (CATE) per user or user segment: CATE(x) = E[Y(1) − Y(0) | X=x]. Common approaches: T-learner (separate models for treated and control), X-learner (better for imbalanced treatment), or causal forests. Output: each user gets a predicted treatment effect — e.g., lapsed users +5 lessons/week, active users +0.5 lessons/week. This enables targeted reminder campaigns.",
   eq:"ATE  = E[Y(1) − Y(0)]\nCATE = E[Y(1) − Y(0) | X=x]  (per segment)"},

  {id:"stats_30",topic:"variance",difficulty:"medium",
   q:"Square measures transaction amounts. For one merchant, you observe 5 transactions: [$10, $12, $11, $100, $13]. Should you use IQR or z-score to detect the outlier? Compute the relevant statistic.",
   a:"The data is skewed (one extreme outlier), so use IQR. Sort: [10, 11, 12, 13, 100]. Q1=10.5, Q3=13, IQR=2.5. Upper fence = Q3 + 1.5·IQR = 13 + 3.75 = 16.75. $100 >> 16.75 → confirmed outlier. Z-score would also flag it (z ≈ (100−29.2)/35.6 ≈ 2.0) but z-scores are distorted by the outlier itself inflating the std dev, making the method circular for heavily skewed data.",
   eq:"IQR = Q3 − Q1 = 13 − 10.5 = 2.5\nUpper fence = 13 + 1.5·2.5 = 16.75\n$100 is an outlier"},

  {id:"stats_31",topic:"distributions",difficulty:"easy",
   q:"A Coursera quiz has 20 multiple-choice questions, each with 4 options. A student guesses randomly. What is the expected score and variance? What is the probability of getting exactly 8 correct?",
   a:"p = 0.25, n = 20. Mean = np = 5. Variance = np(1-p) = 20·0.25·0.75 = 3.75. P(X=8) = C(20,8)·(0.25)⁸·(0.75)¹² = 125970·0.000015·0.0317 ≈ 0.061 or about 6.1% chance of getting exactly 8 right by guessing.",
   eq:"μ = np = 5,  σ² = np(1−p) = 3.75\nP(X=8) = C(20,8)·0.25⁸·0.75¹² ≈ 0.061"},

  {id:"stats_32",topic:"regression",difficulty:"hard",
   q:"You build a query performance model with 20 features. OLS gives R²=0.95 on training, 0.60 on test. You add Ridge regularization with α=10 and get train R²=0.82, test R²=0.79. Interpret what happened. Is the Ridge model better?",
   a:"The original model was severely overfit — high train R² (0.95) with poor test generalization (0.60) is the classic bias-variance tradeoff failure. Ridge added L2 penalty shrinking coefficients, accepting a small bias increase (train R² dropped from 0.95 to 0.82) in exchange for a large variance reduction (test R² jumped from 0.60 to 0.79). The Ridge model is unambiguously better for production: the train-test gap shrunk from 0.35 to 0.03, indicating the model generalizes. Always optimize for test/held-out performance, not training fit.",
   eq:"Overfit: R²_train=0.95, R²_test=0.60  →  gap=0.35\nRidge: R²_train=0.82, R²_test=0.79  →  gap=0.03"},

  {id:"stats_33",topic:"probability",difficulty:"medium",
   q:"You have 5 engineers and need to randomly select 3 to form a project team. How many distinct teams are possible? If you also care about which of the 3 is the team lead, how does the count change?",
   a:"Unordered teams (combinations): C(5,3) = 5!/(3!·2!) = 10 distinct teams. Ordered teams (permutations, for lead selection): P(5,3) = 5!/(5-3)! = 5·4·3 = 60 arrangements. The distinction is whether order matters — combinations when team members are interchangeable, permutations when roles differ.",
   eq:"Combinations (no roles): C(5,3) = 10\nPermutations (with lead): P(5,3) = 5!/(5−3)! = 60"},

  {id:"stats_34",topic:"distributions",difficulty:"hard",
   q:"Brex's fraud team models transaction fraud as Binomial(n=1000, p=0.002). They switch to Poisson. Is this approximation valid? What is the mean and variance under each model, and what is lost in the approximation?",
   a:"Yes, the approximation is valid: n=1000 is large, p=0.002 is small, and λ=np=2 is fixed — all Poisson conditions hold. Binomial: mean=2, variance=np(1-p)=2·0.998=1.996. Poisson: mean=2, variance=2. Difference: Binomial variance (1.996) < mean (2), Poisson variance = mean exactly. The slight difference is negligible (0.2%) at this p value. What's lost: the Binomial upper bound of n=1000 fraud cases; Poisson theoretically allows infinite counts though astronomically unlikely.",
   eq:"Binomial: μ=2, σ²=1.996\nPoisson:   μ=2, σ²=2.000\nDifference < 0.2% — valid approximation"},

  {id:"stats_35",topic:"ab_testing",difficulty:"hard",
   q:"OpenAI runs a test of a new GPT feature on 1% of users (treatment) vs 99% (control). The metric is daily API calls. Treatment mean = 105, control mean = 100, with σ=20 for both. n_treatment=5000, n_control=495000. Compute z. Is the unequal split a problem?",
   a:"SE_diff = √(σ²/n_t + σ²/n_c) = √(400/5000 + 400/495000) = √(0.08 + 0.00081) ≈ √0.0808 ≈ 0.284. z = (105−100)/0.284 ≈ 17.6 — highly significant. The unequal split is not inherently a problem statistically (the math works), but it means precision is driven almost entirely by the smaller treatment group (the control n barely moves the SE). A 50/50 split minimizes SE_diff for a fixed total n, but a 1% treatment split is common for risk management on large platforms.",
   eq:"SE_diff ≈ √(σ²/n_t) = √(400/5000) ≈ 0.283\nz = 5/0.283 ≈ 17.6  →  SE dominated by treatment arm"},

  {id:"stats_36",topic:"variance",difficulty:"medium",
   q:"Two independent design metrics X ~ N(4, 9) and Y ~ N(6, 16) are combined as Z = 2X + 3Y. What is E[Z] and Var[Z]?",
   a:"E[Z] = 2·E[X] + 3·E[Y] = 2·4 + 3·6 = 8 + 18 = 26. Var[Z] = 2²·Var[X] + 3²·Var[Y] = 4·9 + 9·16 = 36 + 144 = 180. The variances scale by the squared coefficient (A² and B²) because stretching a distribution by factor A stretches its standard deviation by A and variance by A².",
   eq:"E[Z] = 2(4) + 3(6) = 26\nVar[Z] = 4(9) + 9(16) = 36 + 144 = 180"},

  {id:"stats_37",topic:"regression",difficulty:"medium",
   q:"HubSpot wants to measure whether sending a 3rd follow-up email improves deal close rate. Close rates: treated (+3rd email) went from 15% to 20%; control (no 3rd email) went from 15% to 16%. What is the DiD estimate? What does it mean?",
   a:"DiD = (20−15) − (16−15) = 5 − 1 = +4 percentage points attributable to the 3rd email. Without the DiD design, you'd incorrectly estimate the email effect as 20−16 = 4pp — which coincidentally equals DiD here. In general, the raw difference overestimates the causal effect by ignoring the natural time trend (+1pp in control). DiD cleanly separates the treatment effect from background drift.",
   eq:"DiD = (Δtreated) − (Δcontrol) = (20−15) − (16−15) = +4pp"},

  {id:"stats_38",topic:"distributions",difficulty:"medium",
   q:"App Store download counts per hour follow Poisson(λ=500). Quality assurance flags any hour with fewer than 450 downloads. Using Normal approximation, how often would QA incorrectly flag a normal hour?",
   a:"For Poisson(500), σ = √500 ≈ 22.4. z = (450 − 500)/22.4 ≈ −2.23. P(downloads < 450) ≈ P(z < −2.23) ≈ 1.3%. So QA would incorrectly trigger about 1.3% of normal hours — roughly 114 false alarms per year (8760 hours × 0.013). The Normal approximation is valid since λ=500 >> 30.",
   eq:"σ = √500 ≈ 22.4\nz = (450−500)/22.4 ≈ −2.23\nFalse alarm rate ≈ 1.3%"},

  {id:"stats_39",topic:"regression",difficulty:"hard",
   q:"Datadog models server error rates with many correlated features (CPU%, memory%, latency, etc.). You notice that when you add a new feature, an existing feature's coefficient flips sign. What is this called, and what is the correct fix?",
   a:"This is multicollinearity — high correlation between predictors causes unstable, uninterpretable coefficients that can flip sign. The issue: the model cannot distinguish which correlated variable is 'responsible.' OLS standard errors inflate, making p-values unreliable. Fix: Ridge regression (L2) distributes the coefficients across correlated variables rather than arbitrarily assigning one direction. Alternatively, compute VIF (Variance Inflation Factor) — VIF > 10 indicates severe multicollinearity. Do not use Lasso here as it would arbitrarily zero out one of the correlated pair.",
   eq:"VIF_j = 1/(1 − R²_j)  where R²_j is R² of Xⱼ on other features\nVIF > 10 → severe multicollinearity → use Ridge"},

  {id:"stats_40",topic:"probability",difficulty:"hard",
   q:"A Plaid transaction classifier makes independent errors: P(false positive) = 0.01 per transaction. A bank processes 10,000 transactions/day. What is the expected number and std dev of false positives per day? What distribution models this, and what simplification is valid?",
   a:"Exact: Binomial(n=10000, p=0.01). Mean = np = 100. Variance = np(1-p) = 99. Std dev = √99 ≈ 9.95. Since n is large and p is small, Poisson(λ=100) is a valid approximation: mean=100, variance=100, std dev=10. Difference is negligible (variance 99 vs 100). Normal approximation also valid: for λ=100, N(100, 100) is reasonable for threshold calculations.",
   eq:"Binomial: μ=100, σ=√99≈9.95\nPoisson approx: μ=σ²=100, σ=10\nAll three give ~same result for practical use"},

  {id:"stats_41",topic:"ab_testing",difficulty:"medium",
   q:"Asana tests two task management interfaces: A (control) and B (new). Conversion rate A = 12% (n=2000), B = 14% (n=2000). Test significance at α=0.05 using the appropriate test for proportions.",
   a:"For proportions, use z-test. Pooled p = (0.12·2000 + 0.14·2000)/4000 = 0.13. SE = √(p̂(1-p̂)·(1/n₁+1/n₂)) = √(0.13·0.87·0.001) = √0.0001131 ≈ 0.01064. z = (0.14−0.12)/0.01064 ≈ 1.88. Since 1.88 < 1.96, we fail to reject H₀ at α=0.05. The 2pp lift is not quite statistically significant at this sample size. Running longer or increasing n is warranted.",
   eq:"p̂_pool = 0.13\nSE = √(p̂·(1−p̂)·(1/n₁+1/n₂)) ≈ 0.01064\nz = 0.02/0.01064 ≈ 1.88 < 1.96  →  not significant"},

  {id:"stats_42",topic:"regression",difficulty:"hard",
   q:"Ramp wants to predict monthly spend for corporate cards. Feature 'company size' correlates 0.9 with feature 'number of employees.' Including both features, your model's SE on 'company size' triples. Why? What should you do?",
   a:"This is multicollinearity. When two features are nearly collinear (r=0.9), the design matrix X'X is near-singular, making coefficient estimates extremely sensitive to small changes in data — SE balloons. The model cannot separate the individual effects. Options: 1) Drop one feature (loses information). 2) PCA: combine them into orthogonal components. 3) Ridge regression: L2 penalty stabilizes the inversion of X'X and distributes the estimate across both. Ridge is preferred as it retains both features but with smaller, more stable coefficients.",
   eq:"Var(β̂) = σ²·(X'X)⁻¹\nHigh correlation → X'X near-singular → Var(β̂) explodes\nRidge: (X'X + αI)⁻¹ stabilizes"},

  {id:"stats_43",topic:"probability",difficulty:"medium",
   q:"Notion rolls out a feature to 3 independent markets simultaneously. In each market, the probability of meeting engagement targets is 0.7. What is the probability that all 3 markets succeed? Exactly 2 succeed? At least 1 succeeds?",
   a:"P(all 3) = 0.7³ = 0.343. P(exactly 2) = C(3,2)·0.7²·0.3 = 3·0.49·0.3 = 0.441. P(at least 1) = 1 − P(none) = 1 − 0.3³ = 1 − 0.027 = 0.973. These are independent Bernoulli trials — each market's outcome doesn't affect others. P(at least 1) using the complement rule is far easier than summing P(1)+P(2)+P(3).",
   eq:"P(all 3) = 0.7³ = 0.343\nP(exactly 2) = C(3,2)·0.7²·0.3 = 0.441\nP(≥1) = 1 − 0.3³ = 0.973"},

  {id:"stats_44",topic:"distributions",difficulty:"hard",
   q:"You model token generation counts per API call as Negative Binomial with μ=500 tokens and α=0.005. Compute the variance and compare to what Poisson would predict. Why is Negative Binomial more appropriate for LLM outputs?",
   a:"Var = μ + α·μ² = 500 + 0.005·250000 = 500 + 1250 = 1750. Poisson would predict variance = 500. NegBin variance is 3.5× higher. This is appropriate for LLMs because token counts are not independent — a long reasoning chain produces many tokens together, a short factual answer produces few. This clustering creates overdispersion that Poisson cannot model. The parameter α captures the degree of 'burstiness' in output length.",
   eq:"Var = μ + α·μ² = 500 + 1250 = 1750\nPoisson: Var = 500\nNegBin captures burst/clustering in outputs"},

  {id:"stats_45",topic:"ab_testing",difficulty:"hard",
   q:"Stripe tests a checkout flow on users in 5 different countries simultaneously, treating each country as a separate A/B test with α=0.05. What is the probability of at least one false positive across all 5 tests, assuming the null is true everywhere?",
   a:"Each test has a 5% false positive rate independently. P(no false positives in any of 5 tests) = (1−0.05)⁵ = 0.95⁵ ≈ 0.774. P(at least one false positive) = 1 − 0.774 ≈ 22.6% — over 4× the intended 5% rate. This is the multiple comparisons (familywise error) problem. Fix: Bonferroni correction — use α/k = 0.05/5 = 0.01 per test to maintain overall 5% FWER. Or use FDR control (Benjamini-Hochberg) for less conservative adjustment.",
   eq:"P(≥1 FP) = 1 − (1−α)ᵏ = 1 − 0.95⁵ ≈ 0.226\nBonferroni: use α/k = 0.01 per test"},

  {id:"stats_46",topic:"variance",difficulty:"hard",
   q:"Two independent sensors measure obstacle distance. Sensor 1: X ~ N(μ=10m, σ²=0.25). Sensor 2: Y ~ N(μ=10m, σ²=1.0). Using MMSE, what is the optimal fused estimate when both report S = X + Y = 21m?",
   a:"Using E(X|S): Cov(X, X+Y) = Var(X) = 0.25. Var(S) = 0.25 + 1.0 = 1.25. E(X|S=21) = μ_X + 0.25/1.25 · (21 − 10 − 10) = 10 + 0.2·1 = 10.2m. The more precise sensor (Sensor 1, lower variance) contributes more to the fusion — weight = 0.25/1.25 = 0.2 for the adjustment. This is Kalman filter logic: sensor fusion weighted by inverse variance.",
   eq:"E(X|S=21) = 10 + [0.25/(0.25+1.0)]·(21−20)\n           = 10 + 0.2·1 = 10.2m\nSensor fusion: lower σ² → higher weight"},

  {id:"stats_47",topic:"distributions",difficulty:"medium",
   q:"Stock returns over 252 trading days are approximately normally distributed. You observe a daily return of −4.5σ (4.5 standard deviations below mean). A trader says 'this happens maybe once a century.' Are they right? Compute P(z < −4.5).",
   a:"P(z < −4.5) ≈ 3.4 × 10⁻⁶ per day. Over 252 trading days/year: expected occurrences per year ≈ 252 × 3.4×10⁻⁶ ≈ 0.00086. Expected years between events ≈ 1/0.00086 ≈ 1,163 years. The trader underestimates — it's roughly a 1,000-year event under the Normal assumption. In practice, fat tails (leptokurtosis) make such events far more common than Normal predicts, which is why risk models use Student-t or extreme value distributions.",
   eq:"P(z < −4.5) ≈ 3.4×10⁻⁶ per day\nExpected gap = 1/(252 × 3.4×10⁻⁶) ≈ 1,163 years"},

  {id:"stats_48",topic:"regression",difficulty:"medium",
   q:"Zoom uses logistic regression to predict churn (1=churned, 0=retained). For a user with features x, the model outputs p=0.72. The default threshold is 0.5. The cost of missing a churner (false negative) is 10× the cost of a false churn alert (false positive). Should you use 0.5 as the threshold?",
   a:"No. With asymmetric costs, the optimal threshold shifts toward lower values to catch more churners (accept more false positives). A rough rule: optimal threshold = cost(FP)/(cost(FP)+cost(FN)) = 1/(1+10) ≈ 0.09. At threshold 0.09, you classify a user as churn-risk if p > 0.09, maximizing expected utility. In practice, compute precision-recall curves and pick the threshold that minimizes total expected cost = FP_count × 1 + FN_count × 10.",
   eq:"Optimal threshold ≈ C(FP)/(C(FP)+C(FN)) = 1/11 ≈ 0.09\nCost-sensitive classification: lower threshold → fewer FN"},

  {id:"stats_49",topic:"regression",difficulty:"hard",
   q:"You're analyzing job runtimes with OLS. Residual plots show variance increases with fitted values — larger jobs have much more variable runtime. Identify the issue. What transformations or models address this?",
   a:"This is heteroscedasticity — residual variance is not constant (increases with fitted values). Violates OLS assumption 3 (homoscedasticity). OLS coefficient estimates are still unbiased but no longer minimum variance; standard errors are wrong so inference (p-values, CIs) is invalid. Fixes: 1) Log-transform the response (log runtime) — common for right-skewed, multiplicatively noisy data. 2) Weighted Least Squares — weight observations by 1/variance. 3) Robust standard errors (HC1/HC3) — keep OLS estimates but correct the SE calculation.",
   eq:"Heteroscedasticity: Var(ε|X) ≠ constant\nFix 1: log(y) ~ X  (stabilizes variance)\nFix 2: WLS with weights ∝ 1/Var(εᵢ)"},

  {id:"stats_50",topic:"probability",difficulty:"medium",
   q:"Canva's design recommendation system draws 5 templates from a library of 200 (60 premium, 140 free), without replacement. What is the expected number of premium templates shown? What type of distribution models this exactly?",
   a:"This is the Hypergeometric distribution (sampling without replacement from a finite population). E[premium shown] = n·K/N = 5·60/200 = 1.5 templates. Var = n·K/N·(N-K)/N·(N-n)/(N-1) = 5·(60/200)·(140/200)·(195/199) ≈ 1.035. Note: this is not Binomial because draws are without replacement — each draw changes the composition of the remaining pool.",
   eq:"E[X] = n·K/N = 5·60/200 = 1.5\nVar = n·(K/N)·((N-K)/N)·(N-n)/(N-1) ≈ 1.035"}
];
