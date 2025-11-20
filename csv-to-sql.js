#!/usr/bin/env node

/**
 * CSV to SQL Insert Converter
 * A utility to convert CSV content into PostgreSQL INSERT statements
 */

const fs = require('fs');
const path = require('path');

/**
 * Escapes single quotes in a string value for SQL
 * @param {string} value - The value to escape
 * @returns {string} - The escaped value
 */
function escapeSqlString(value) {
  if (value === null || value === undefined || value === '') {
    return 'NULL';
  }
  // Escape single quotes by doubling them
  return `'${String(value).replace(/'/g, "''")}'`;
}

/**
 * Parses a CSV line, handling quoted values that may contain commas
 * @param {string} line - The CSV line to parse
 * @returns {string[]} - Array of parsed values
 */
function parseCSVLine(line) {
  const values = [];
  let currentValue = '';
  let insideQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Escaped quote inside quoted value
        currentValue += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      // End of value
      values.push(currentValue);
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  
  // Add the last value
  values.push(currentValue);
  
  return values;
}

/**
 * Converts CSV content to SQL INSERT statements
 * @param {string} csvContent - The CSV content to convert
 * @param {string} tableName - The name of the target table
 * @returns {string} - SQL INSERT statements
 */
function csvToSqlInserts(csvContent, tableName) {
  const lines = csvContent.trim().split('\n');
  
  if (lines.length < 2) {
    throw new Error('CSV must contain at least a header row and one data row');
  }
  
  // Parse header
  const headers = parseCSVLine(lines[0]);
  const columnNames = headers.map(h => h.replace(/^"(.*)"$/, '$1').trim());
  
  // Generate INSERT statements
  const insertStatements = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip empty lines
    
    const values = parseCSVLine(line);
    
    if (values.length !== columnNames.length) {
      console.warn(`Warning: Line ${i + 1} has ${values.length} values but expected ${columnNames.length}. Skipping.`);
      continue;
    }
    
    // Format values for SQL
    const sqlValues = values.map(value => {
      // Remove surrounding quotes if present
      const cleanValue = value.replace(/^"(.*)"$/, '$1').trim();
      
      // Handle NULL values
      if (cleanValue === '' || cleanValue.toUpperCase() === 'NULL') {
        return 'NULL';
      }
      
      // Check if it's a number
      if (!isNaN(cleanValue) && cleanValue !== '') {
        return cleanValue;
      }
      
      // Check if it's a JSON object or array
      if ((cleanValue.startsWith('{') && cleanValue.endsWith('}')) || 
          (cleanValue.startsWith('[') && cleanValue.endsWith(']'))) {
        // Escape single quotes in JSON
        return `'${cleanValue.replace(/'/g, "''")}'`;
      }
      
      // Check if it's a timestamp
      if (cleanValue.match(/^\d{4}-\d{2}-\d{2}/) || cleanValue.includes('+')) {
        return `'${cleanValue}'`;
      }
      
      // Default: treat as string
      return escapeSqlString(cleanValue);
    });
    
    const insertStatement = `INSERT INTO ${tableName} (${columnNames.join(', ')}) VALUES (${sqlValues.join(', ')});`;
    insertStatements.push(insertStatement);
  }
  
  return insertStatements.join('\n');
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Usage: node csv-to-sql.js <input-csv-file> [table-name] [output-sql-file]');
    console.log('');
    console.log('Examples:');
    console.log('  node csv-to-sql.js data.csv');
    console.log('  node csv-to-sql.js data.csv my_table');
    console.log('  node csv-to-sql.js data.csv my_table output.sql');
    console.log('');
    console.log('If no table name is provided, the script will use the input filename as the table name.');
    console.log('If no output file is provided, the script will write to stdout.');
    process.exit(1);
  }
  
  const inputFile = args[0];
  const tableName = args[1] || path.basename(inputFile, path.extname(inputFile));
  const outputFile = args[2];
  
  try {
    // Read CSV file
    const csvContent = fs.readFileSync(inputFile, 'utf8');
    
    // Convert to SQL
    const sqlStatements = csvToSqlInserts(csvContent, tableName);
    
    // Output results
    if (outputFile) {
      fs.writeFileSync(outputFile, sqlStatements, 'utf8');
      console.log(`SQL INSERT statements written to ${outputFile}`);
      console.log(`Total statements: ${sqlStatements.split('\n').length}`);
    } else {
      console.log(sqlStatements);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

// Export for use as module
module.exports = { csvToSqlInserts, parseCSVLine, escapeSqlString };
