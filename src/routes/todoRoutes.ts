import express from 'express';
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

import todoController from '../controllers/todoController';
const {validationsMiddleware} = require('../middlewares/validationMiddleware');
import todoValidationSchema from '../middlewares/validationJoiSchemas/todoValidationSchema';
const router = express.Router();

router.post('/addTodo', jsonParser,validationsMiddleware(todoValidationSchema.addTodoDetails),todoController.addTodo);
router.post('/deleteTodo',jsonParser,validationsMiddleware(todoValidationSchema.deleteDetails), todoController.deleteTodo);
router.post('/markTodoAsCompleted',jsonParser,validationsMiddleware(todoValidationSchema.completeDetails), todoController.markTodoAsCompleted);
router.get('/getAllTodos', todoController.getAllTodos);
router.post('/updateTodo',jsonParser,validationsMiddleware(todoValidationSchema.updateDetails), todoController.updateTodoDescription);


export default router;