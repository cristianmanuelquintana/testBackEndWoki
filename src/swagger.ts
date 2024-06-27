import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Project Management API',
            version: '1.0.0',
            description: 'API documentation for the Project Management application'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The auto-generated id of the user'
                        },
                        name: {
                            type: 'string',
                            description: 'Name of the user'
                        },
                        email: {
                            type: 'string',
                            description: 'Email of the user'
                        },
                        password: {
                            type: 'string',
                            description: 'Password of the user'
                        },
                        projects: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        }
                    }
                },
                Project: {
                    type: 'object',
                    required: ['title'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The auto-generated id of the project'
                        },
                        title: {
                            type: 'string',
                            description: 'Title of the project'
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the project'
                        },
                        dueDate: {
                            type: 'string',
                            format: 'date',
                            description: 'Due date of the project'
                        },
                        status: {
                            type: 'string',
                            enum: ['not started', 'in progress', 'completed'],
                            description: 'Status of the project'
                        }
                    }
                },
                Task: {
                    type: 'object',
                    required: ['title'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The auto-generated id of the task'
                        },
                        title: {
                            type: 'string',
                            description: 'Title of the task'
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the task'
                        },
                        dueDate: {
                            type: 'string',
                            format: 'date',
                            description: 'Due date of the task'
                        },
                        status: {
                            type: 'string',
                            enum: ['not started', 'in progress', 'completed'],
                            description: 'Status of the task'
                        },
                        assignedTo: {
                            type: 'string',
                            description: 'User ID assigned to the task'
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.ts', './src/models/*.ts'] // paths to files with documentation
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
