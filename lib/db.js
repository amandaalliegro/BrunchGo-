let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'brunchgo',
  };
}

module.exports = dbParams;
