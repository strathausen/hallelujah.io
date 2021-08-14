module.exports = {
    development: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
    },
    production: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10,
        },
    },
};
//# sourceMappingURL=knexfile.js.map