const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "K4rlM4rkus", //password
    database: "testWad",
    host: "localhost",
    port: "5432"
});

const execute = async(query) => {
    try {
        await pool.connect(); 
        await pool.query(query);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createUsersTblQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL
  );
`;

const createPostsTblQuery = `
  CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE
  );
`;

const createPostsQuery = `
  INSERT INTO posts (content, date) VALUES
  ('Homework 4 is too much work', '2022-12-02'),
  ('Do we need to use Vue.js again?', '2022-11-22'),
  ('Anyone knows which room the lab is today?', '2022-10-02');
`;

const init = async () => {
  //await execute("DROP TABLE posts;")
  await execute(createUsersTblQuery);
  await execute(createPostsTblQuery);
  //await execute(createPostsQuery);
};

init();

module.exports = pool;