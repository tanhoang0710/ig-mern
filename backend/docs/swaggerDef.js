const { version, description, license } = require('../package.json');

const swaggerDef = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ig-mern API documentation',
            version,
            license,
            description,
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
            },
        ],
    },
    apis: ['../routes/*.js'],
};

module.exports = swaggerDef;
