import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/mydb'
});

export default {
    query: (text, params) => pool.query(text, params)
};