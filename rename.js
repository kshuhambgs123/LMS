const { Client } = require('pg');

const client = new Client({
    dialect: 'postgres',
    host: 'localhost',
    username: 'shubhamkumar',
    password: 'shubham123',
    database: 'shubhamkumar',
    port: 5432,

    // host: '127.0.0.1',
    // user: 'my_username',
    // database: 'my_database',
    // password: 'my_password',
    // port: 5432,
});

const renameColumn = async () => {
	const query = `
            ALTER TABLE "records"
            RENAME COLUMN "recordId" TO "recordid";
    `;
    await client.connect();        // creates connection
    try {
        await client.query(query); // sends query
    } finally {
        await client.end();        // closes connection
    }
};

renameColumn()
    .then(() => console.log('Column renamed!'))
    .catch(error => console.error(error.stack));