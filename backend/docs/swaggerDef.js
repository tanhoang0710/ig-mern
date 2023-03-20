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
                url: `http://localhost:${process.env.PORT}/api/v1`,
            },
            {
                url: `http://192.168.1.17:${process.env.PORT}/api/v1`,
            },
        ],
    },
    apis: ['docs/*.yml', 'routes/*.js'],
};

module.exports = swaggerDef;
