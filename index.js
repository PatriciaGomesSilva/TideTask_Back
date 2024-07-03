const express = require('express');
const routes = require('./src/routes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger');
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors());

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(routes);

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
    console.log("Server started!");
});
