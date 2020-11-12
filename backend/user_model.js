const Pool = require('pg').Pool
/*
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});
*/
const pool = new Pool({
  user: 'thminsight',
  host: 'localhost',
  database: 'thm_database',
  password: 'coding_test_password',
  port: process.env.POSTGRES_PORT,
});
/*
  Add new user in BD
*/
const createUser = (body) => {
  return new Promise(function(resolve, reject) {
    console.log(process.env.POSTGRES_DB)
    const {first_name, last_name, phone_number, city, email, country} = body
    pool.query(`INSERT INTO users(first_name, last_name, phone_number, city,
                email, country)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [first_name, last_name, phone_number, city, email,country],
                (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new user has been added !`)
    })
  })
}

module.exports = {
  createUser,
}
