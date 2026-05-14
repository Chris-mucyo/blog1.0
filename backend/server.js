import express from 'express';
import dotenv from 'dotenv';
import swaggerJsdoc  from 'swagger-jsdoc';
import connectDB from './config/db.config.js';
import swaggerUi from 'swagger-ui-express';
import routes from './Routes/index.routes.js';
dotenv.config();

connectDB()

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
    definition: {
        openapi: '3.0.0',

        info: {
            title: 'My Backend API',
            version: '1.0.0',
            description: 'Express API with Swagger documentation',
        },

        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },

        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', routes);

app.use('/healthy', (req,res) => {
    res.status(200).send('server is healthy and has started');
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
    console.log(`http://localhost:${port}/api-docs`);
})