# SQL

---

## Dates

### Date Types

| Type | Notes |
|------|-------|
| `DATE` | Calendar date only |
| `TIMESTAMP` | Date + time |
| `STRING` | Non-date; must be cast before date operations |

### Casting

```sql
entry::DATE
entry::TIMESTAMP
```

### Extracting Parts

```sql
EXTRACT(??? FROM date_column)          -- generic extraction

TO_CHAR(date, 'Month')                 -- → 'January'
TO_CHAR(date, 'Mon')                   -- → 'Jan'

-- Combine parts into a label
CONCAT(TO_CHAR(date, 'Mon'), '-', EXTRACT(YEAR FROM date))  -- → 'Jan-2025'
```

### Building Dates from Parts

```sql
-- From year + day-of-year using format strings
TO_DATE(input_year::text || '-' || input_days_of_year::text, 'IYYY-ID')
-- Supports custom formats: 'YYYY-DDD', 'YYYY-WWW-DDD-HHH', etc.

-- From explicit year/month/day
MAKE_DATE(year, month, day)

-- From year + day-of-year via arithmetic
SELECT MAKE_DATE(input_year, 1, 1) + INTERVAL '1 day' * (input_days_of_year - 1)
```

### Date Filtering

```sql
-- BETWEEN uses 00:00:00 if no time specified
TIMESTAMP (or date) BETWEEN '' AND ''
```

---

## Strings

```sql
LEFT('string', 3)                     -- extract first 3 characters
LENGTH(string)                        -- character count
CONCAT('string', ' ', col)            -- combine strings and column values
```

---

## Window Functions

### Ranking

```sql
ROW_NUMBER() OVER(...) rank moves on even for ties 1,2,3,4,...
RANK()        OVER(...) rank skips for ties 1,1,3,4,...
DENSE_RANK() guanranteets assignemnt of all ranks 1,1,2,3,...
```

### Moving Averages / Running Totals

```sql
AVG(col)  OVER(PARTITION BY user ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)  AS  moving_avg
SUM(col)  OVER(PARTITION BY user ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)  AS  moving_sum
SUM(col)  OVER(ORDER BY date)  AS  running_total
```

### Lag / Lead

```sql
-- Select the value from 1 row prior (within partition)
LAG(id, 1) OVER(PARTITION BY col ORDER BY col)
LEAD(id, 1) OVER(ORDER BY col)
```

---

## Numeric / Type Handling

```sql
-- Types matter for math: use float, numeric, or integer as needed
ROUND(123::NUMERIC, 2)          -- → 123.00  (NUMERIC required for ROUND)

COUNT(DISTINCT col)
```

---

## Handling NULLs / Empty Cells

```sql
COALESCE(col_name, 0)           -- replace NULL with 0
```

---

## Set Operations

```sql
UNION ALL                       -- combine result sets (keeps duplicates)
    might need to add ( ... ) around each sub query if including posrt query limits like order by, limits, etc inside each individually
```

---

## Joins

```sql
JOIN aks INNER JOIN: select a row each time a match is found (exclude null matches)
LEFT JOIN : select a row each time a match is found and use null for right side if no match for a row
FULL JOIN : select a row each time a match is found and use null for EITHER side if no match for a row
OUTER JOIN : select only the rows without a match
NATURAL JOIN : automatically selects the matching column names then does regular JOIN or specified eg NATURAL LEFT JOIN
CROSS JOIN : force pair all rows with all rows of the other side (no ON line)
```

Can combine the above to be more specific eg NATURAL LEFT OUTER JOIN

---

## CTEs (common table expression) and Scalar Variables

Use a CTE to define a scalar variable and cross join it into the main query:

```sql
WITH order_counts AS (
    SELECT COUNT(order_id) AS total_orders
    FROM orders
)

SELECT ...
FROM ...
CROSS JOIN order_counts   -- injects total_orders into every row for use in expressions
```

---

## Groups and partitions and subqueries
How to select events when they are the only event all day
Use subquery
```sql
SELECT e.event
FROM events AS e
LEFT JOIN (
    SELECT date, COUNT(*) as cnt
    FROM events
    GROUP BY 1
    ) AS d
ON e.date = d.date
WHERE d.cnt = 1
```

Or do the first pass first to avoid writing the subquery inside the other
```sql
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
```

Or as a partition, but keep it inside as a subquery to reduce line count and no join
```sql
SELECT event
FROM(
    SELECT event,
           COUNT(*) OVER(PARTITION BY date) AS cnt
    FROM events
    ) AS sub
WHERE cnt = 1
```


Or use partition (better when we need every row but want to **filter** by the frequency or some group-based feature)
```sql
WITH d AS (SELECT date,
                COUNT(*) OVER(PARTITION BY date) AS cnt
           FROM events
           )
SELECT e.event
FROM events AS e
LEFT JOIN d
ON e.date = d.date
WHERE d.cnt = 1
```


## Misc

```sql
-- Filter for odd numbers
WHERE MOD(num, 2) = 1
```
