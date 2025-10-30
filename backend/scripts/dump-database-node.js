import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const dumpFile = path.join(__dirname, '../database/dump.sql');

async function dumpDatabase() {
  console.log('🔄 Starting database dump...');
  console.log(`📦 Database: ${process.env.DB_NAME}`);
  console.log(`📁 Output: ${dumpFile}`);
  console.log('');

  try {
    let sqlDump = '';

    // Add header
    sqlDump += `-- PostgreSQL Database Dump\n`;
    sqlDump += `-- Database: ${process.env.DB_NAME}\n`;
    sqlDump += `-- Dumped at: ${new Date().toISOString()}\n\n`;

    // Get all tables
    const tablesResult = await pool.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public' 
      ORDER BY tablename
    `);

    console.log(`📊 Found ${tablesResult.rows.length} tables`);
    console.log('');

    for (const { tablename } of tablesResult.rows) {
      console.log(`⏳ Dumping table: ${tablename}`);

      // Get table structure - simplified approach
      const columnsResult = await pool.query(`
        SELECT 
          column_name,
          data_type,
          character_maximum_length,
          column_default,
          is_nullable
        FROM information_schema.columns
        WHERE table_name = $1
        ORDER BY ordinal_position
      `, [tablename]);

      if (columnsResult.rows.length > 0) {
        sqlDump += `\n-- Table: ${tablename}\n`;
        sqlDump += `DROP TABLE IF EXISTS ${tablename} CASCADE;\n`;
        sqlDump += `CREATE TABLE IF NOT EXISTS ${tablename} (\n`;
        
        const columnDefs = columnsResult.rows.map(col => {
          let def = `  ${col.column_name} ${col.data_type.toUpperCase()}`;
          if (col.character_maximum_length) {
            def += `(${col.character_maximum_length})`;
          }
          if (col.column_default) {
            def += ` DEFAULT ${col.column_default}`;
          }
          if (col.is_nullable === 'NO') {
            def += ' NOT NULL';
          }
          return def;
        });
        
        sqlDump += columnDefs.join(',\n') + '\n);\n';
      }

      // Get table data
      const dataResult = await pool.query(`SELECT * FROM ${tablename}`);
      
      if (dataResult.rows.length > 0) {
        sqlDump += `\n-- Data for table: ${tablename}\n`;
        
        for (const row of dataResult.rows) {
          const columns = Object.keys(row);
          const values = columns.map(col => {
            const val = row[col];
            if (val === null) return 'NULL';
            if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
            if (val instanceof Date) return `'${val.toISOString()}'`;
            if (typeof val === 'boolean') return val ? 'true' : 'false';
            return val;
          });

          sqlDump += `INSERT INTO ${tablename} (${columns.join(', ')}) VALUES (${values.join(', ')});\n`;
        }
      }
    }

    // Get sequences
    const sequencesResult = await pool.query(`
      SELECT sequence_name 
      FROM information_schema.sequences 
      WHERE sequence_schema = 'public'
    `);

    if (sequencesResult.rows.length > 0) {
      sqlDump += `\n-- Sequences\n`;
      for (const { sequence_name } of sequencesResult.rows) {
        const seqResult = await pool.query(`SELECT last_value FROM ${sequence_name}`);
        if (seqResult.rows[0]) {
          sqlDump += `SELECT setval('${sequence_name}', ${seqResult.rows[0].last_value}, true);\n`;
        }
      }
    }

    // Write to file
    fs.writeFileSync(dumpFile, sqlDump, 'utf8');

    const stats = fs.statSync(dumpFile);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);

    console.log('');
    console.log('✅ Database dump completed successfully!');
    console.log(`📊 File size: ${fileSizeInKB} KB`);
    console.log(`📍 Location: ${dumpFile}`);

  } catch (error) {
    console.error('');
    console.error('❌ Database dump failed!');
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

dumpDatabase();
