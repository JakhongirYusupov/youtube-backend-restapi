import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "youtube",
  password: process.env.PG_PASSWORD,
  port: 5432,
});

async function model(query, ...params) {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(query, params.length ? params : null);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export default model;
