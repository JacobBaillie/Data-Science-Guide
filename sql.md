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
SUBSTRING('string, 2, 2)              -- gives 'tr' start from letter 2, and show 2 letters
SUBSTRING('string, 3)                 -- gives 'ring' start from letter 3 and go till the end
LEFT('string', 3)                     -- extract first 3 characters
LENGTH(string)                        -- character count
CONCAT('string', ' ', col)            -- combine strings and column values
'string' || 's'                       -- same as concat but easier to read
STRING_AGG(col, ', ')                 -- concat many items typically as part of a group by query
WHERE email ~ '^[A-Za-z][A-Za-z0-9._-]*@leetcode\.com$'       -- checks that the email is valid. Brackets indicate to choose one of the chars inside. * indicates to repeat as needed.
alternatively:
WHERE email LIKE '%@leetcode.com'
AND LEFT(email, 1) ~ '[A-Za-z]'
AND LEFT(mail, LENGTH(mail) - 13) !~ '[^a-zA-Z0-9.-_]'    -- make sure to put - at the end or else it reads as a range!!!
WHERE email ~ '^[a-zA-Z0-9_]*@[a-zA-Z]*\.com$'

    col ~ '[ABC]'                 -- Are any of the chars good?
    col !~ '[ABC]'                -- Are none of the chars good?
    col ~ '[^ABC]'                -- Is at least one char bad?
    col !~ '[^ABC]'               -- Are all of the chars good?

INITCAP('this is a-string! ok?')     -- produces 'This Is A-String! Ok?'
```

---

## Window Functions

### Ranking

```sql
ROW_NUMBER() OVER(...)         -- rank moves on even for ties 1,2,3,4,...
RANK()        OVER(...)        -- rank skips for ties 1,1,3,4,...
DENSE_RANK()                   -- guanranteets assignemnt of all ranks 1,1,2,3,...

OFFSET 1                       -- skip the first 1 rows
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

SELECT 1 AS num
WHERE num != 1                  -- gives an empty table

SELECT (
SELECT 1 AS num
WHERE num != 1
)                               -- gives null (if the source table is already empty:prints null. If we filter a non emtpy table to become empty, prints empty table)

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
JOIN aka INNER JOIN: select a row each time a match is found (exclude null matches)
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

---

## Misc

```sql
-- Filter for odd numbers
WHERE MOD(num, 2) = 1

-- remove seleted row
DELETE FROM table WHERE ...

-- can use more complex internal comaprison for special filters
DELETE FROM events as e1
USING events as e2
WHERE e1.event = e2.event
AND e1.date < e2.date
-- This removes events of the same name, keeping only the most recent one

UPDATE table
SET col = ....
-- can directly change the table without a select statement
```
