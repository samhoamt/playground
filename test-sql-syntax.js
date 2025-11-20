#!/usr/bin/env node

/**
 * Simple test to verify SQL syntax is valid
 */

const fs = require('fs');

function validateSqlSyntax(sqlContent) {
  const lines = sqlContent.trim().split('\n');
  let errors = [];
  
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    
    // Check basic INSERT statement structure
    if (!line.match(/^INSERT INTO \w+/)) {
      errors.push(`Line ${lineNum}: Missing or invalid INSERT INTO statement`);
    }
    
    // Check for VALUES clause
    if (!line.includes('VALUES')) {
      errors.push(`Line ${lineNum}: Missing VALUES clause`);
    }
    
    // Check for proper closing
    if (!line.endsWith(');')) {
      errors.push(`Line ${lineNum}: Statement doesn't end with );`);
    }
    
    // Check for balanced parentheses
    const openParens = (line.match(/\(/g) || []).length;
    const closeParens = (line.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
      errors.push(`Line ${lineNum}: Unbalanced parentheses (${openParens} open, ${closeParens} close)`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors: errors,
    totalStatements: lines.length
  };
}

// Test the generated SQL file
try {
  const sqlContent = fs.readFileSync('output.sql', 'utf8');
  const result = validateSqlSyntax(sqlContent);
  
  console.log('\n=== SQL Syntax Validation ===\n');
  console.log(`Total statements: ${result.totalStatements}`);
  
  if (result.valid) {
    console.log('✓ All SQL statements have valid syntax');
    console.log('\nSample statement:');
    console.log(sqlContent.split('\n')[0].substring(0, 200) + '...\n');
  } else {
    console.log('✗ Found syntax errors:');
    result.errors.forEach(err => console.log(`  - ${err}`));
  }
  
  process.exit(result.valid ? 0 : 1);
} catch (error) {
  console.error('Error reading output.sql:', error.message);
  process.exit(1);
}
