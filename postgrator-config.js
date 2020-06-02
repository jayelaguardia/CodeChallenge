const {
  TEST_DATABASE_URL,
  DATABASE_URL,
  NODE_ENV,
  SSL
} = require("./src/config");

module.exports = {
  migrationDirectory: "migrations",
  driver: "pg",
  connectionString: NODE_ENV === "test" ? TEST_DATABASE_URL : DATABASE_URL
};