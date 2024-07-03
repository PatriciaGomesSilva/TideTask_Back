module.exports = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "TideTask API",
            version: '1.0.0',
            description: "API para gerir suas tarefas diarias",
        },
        servers: [
            {
                url: process.env.APP_URL,
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};
