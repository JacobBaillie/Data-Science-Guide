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
ROW_NUMBER() OVER(...)
RANK()        OVER(...)
-- etc.
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

## CTEs and Scalar Variables

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

## Misc

```sql
-- Filter for odd numbers
WHERE MOD(num, 2) = 1
```
