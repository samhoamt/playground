# CSV to SQL Insert Converter

A Node.js utility script for converting CSV content into PostgreSQL INSERT statements.

## Features

- Parses CSV files with proper handling of quoted values containing commas
- Automatically detects and handles NULL values
- Properly escapes single quotes in string values
- Supports JSON objects and arrays in CSV fields
- Handles timestamps and date fields
- Automatically detects numeric values
- Generates properly formatted PostgreSQL INSERT statements

## Usage

### Basic Usage

```bash
node csv-to-sql.js <input-csv-file> [table-name] [output-sql-file]
```

### Examples

1. **Convert CSV to SQL and print to console:**
   ```bash
   node csv-to-sql.js data.csv
   ```
   Uses the input filename (without extension) as the table name.

2. **Convert CSV to SQL with custom table name:**
   ```bash
   node csv-to-sql.js data.csv my_table
   ```
   Prints SQL INSERT statements to console with `my_table` as the table name.

3. **Convert CSV to SQL and save to file:**
   ```bash
   node csv-to-sql.js data.csv my_table output.sql
   ```
   Generates SQL INSERT statements and saves them to `output.sql`.

### Example with Sample Data

The repository includes sample data from a risks tracking system:

```bash
node csv-to-sql.js sample-data.csv risks output.sql
```

This will:
- Read the CSV data from `sample-data.csv`
- Generate INSERT statements for a table named `risks`
- Save the SQL output to `output.sql`

## CSV Format Requirements

- First row must contain column headers
- Values can be quoted with double quotes (`"`)
- NULL values can be represented as empty fields or the string "NULL"
- JSON objects and arrays are properly handled
- Timestamps with timezone information are preserved

## Example CSV Input

```csv
"risk_id","title","status","severity","created_at"
61835,"Sample Risk","open",9,"2025-11-18 03:40:04.402+00"
61836,"Another Risk","closed",5,"2025-11-18 03:40:04.427+00"
```

## Example SQL Output

```sql
INSERT INTO risks (risk_id, title, status, severity, created_at) VALUES (61835, 'Sample Risk', 'open', 9, '2025-11-18 03:40:04.402+00');
INSERT INTO risks (risk_id, title, status, severity, created_at) VALUES (61836, 'Another Risk', 'closed', 5, '2025-11-18 03:40:04.427+00');
```

## Using as a Module

The converter can also be imported and used as a Node.js module:

```javascript
const { csvToSqlInserts } = require('./csv-to-sql.js');

const csvContent = `"id","name","value"
1,"Test",100
2,"Example",200`;

const sqlStatements = csvToSqlInserts(csvContent, 'my_table');
console.log(sqlStatements);
```

## Data Type Handling

The converter automatically detects and handles:

- **NULL values**: Empty fields or "NULL" text → `NULL`
- **Numbers**: Numeric values → unquoted numbers
- **JSON**: Objects `{...}` and arrays `[...]` → quoted with escaped single quotes
- **Timestamps**: Date/time with timezone → quoted strings
- **Strings**: All other values → quoted with escaped single quotes

## Notes

- Empty lines in the CSV file are automatically skipped
- Rows with mismatched column counts will generate a warning and be skipped
- Single quotes in values are automatically escaped by doubling them (`'` → `''`)
- The script uses Node.js built-in modules only (no external dependencies required)
