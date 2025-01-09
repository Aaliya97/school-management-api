const config = require('./config/index.config.js');
const Cortex = require('ion-cortex');
const ManagersLoader = require('./loaders/ManagersLoader.js');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

// Initialize Express App
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// MongoDB Connection
const mongoDB = config.dotEnv.MONGO_URI ? require('./connect/mongo')({
    uri: config.dotEnv.MONGO_URI
}) : null;

// Redis Cache
const cache = require('./cache/cache.dbh')({ 
    prefix: config.dotEnv.CACHE_PREFIX,
    url: config.dotEnv.CACHE_REDIS
});

// Cortex Initialization
const cortex = new Cortex({
    prefix: config.dotEnv.CORTEX_PREFIX,
    url: config.dotEnv.CORTEX_REDIS,
    type: config.dotEnv.CORTEX_TYPE,
    state: () => {
        return {};
    },
    activeDelay: "50ms",
    idlDelay: "200ms",
});

// Load Managers
const managersLoader = new ManagersLoader({ config, cache, cortex });
const managers = managersLoader.load();

// ✅ New Route Integrations
app.use('/api/auth', require('./routes/authRoutes'));          // User Authentication
app.use('/api/schools', require('./routes/schoolRoutes'));    // School Management
app.use('/api/classrooms', require('./routes/classroomRoutes')); // Classroom Management
app.use('/api/students', require('./routes/studentRoutes'));  // Student Management
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Start Existing User Server
managers.userServer.run();

// ✅ Start Express Server
const PORT = config.dotEnv.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

