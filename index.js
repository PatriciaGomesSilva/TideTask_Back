const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const activityRoutes = require('./src/routes/activityRoutes');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
//const errorHandler = require('./src/utils/errorHandler');
const swagger = require('./src/swagger/swagger');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
swagger(app);

app.use('/activities', activityRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

//app.use(errorHandler);

//app.use(routes);

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
    console.log("Server started!");
});
