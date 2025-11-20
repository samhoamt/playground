# CSV to SQL Converter - Usage Example

## Converting the Sample Data

The repository includes sample data from a risks tracking system. Here's how to convert it:

```bash
# Convert CSV to SQL and save to file
node csv-to-sql.js sample-data.csv risks output.sql
```

This generates 14 INSERT statements for a table named `risks`.

## Sample Output

```sql
INSERT INTO risks (risk_id, title, description, asset_id, asset_type, location, status, severity, source, tags, metadata, recommendation, supporting_insights, report, created_at, updated_at, closed_at, device_id, data_tags, code, device_metadata, updated_by, closed_by, reported_at, reported_by, incident_id, impact, logging_date) VALUES (61835, 'Inv transformer tag error rate is higher than threshold of 50.00%', NULL, 'site_88', 'solar', NULL, 'open', 9, 'carwrapper', '{TAD}', '{"logging_date": "2025-11-17"}', NULL, '[{"name": "error rate threshold", "value": "50.0 %"}, {"name": "tag name", "value": "N_TMPWNDG_PHC"}, {"name": "error rate", "value": "62.765957446808514 %"}]', NULL, '2025-11-18 03:40:04.402+00', '2025-11-18 03:40:04.402+00', NULL, 'device_702025', NULL, 'tad', '{"dev_id": 5, "site_id": 90}', NULL, NULL, NULL, NULL, NULL, 'Inv transformer tag error rate is higher than threshold of 50.00%', '2025-11-17');
```

## Key Features Demonstrated

1. **NULL Handling**: Empty CSV fields → `NULL` in SQL
2. **JSON Objects**: `{"logging_date": "2025-11-17"}` properly quoted
3. **JSON Arrays**: `[{...}, {...}]` properly quoted
4. **Timestamps**: `2025-11-18 03:40:04.402+00` preserved with timezone
5. **Numeric Values**: `61835`, `9` not quoted
6. **String Values**: Properly quoted with escaped single quotes

## Validation

Run the validation test to ensure SQL syntax is correct:

```bash
node test-sql-syntax.js
```

Output:
```
=== SQL Syntax Validation ===

Total statements: 14
✓ All SQL statements have valid syntax
```

## Using with Your Own Data

1. Create a CSV file with headers in the first row
2. Run the converter:
   ```bash
   node csv-to-sql.js your-data.csv table_name output.sql
   ```
3. Import into PostgreSQL:
   ```bash
   psql -d your_database -f output.sql
   ```
