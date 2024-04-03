import { Request, Response } from 'express';
const { ResponseStatusCodes } = require('../util/constants/responseStatusCodes');
const { ResponseCommonMessages } = require('../util/constants/responseCommonMessages');
import todoService from '../services/todoService';
import { ITodo } from "../types/todo";
const Logger = require('../util/logging/logger');
import { io } from '../server';
// const io  = require('../server');
const addTodo = async (req: Request, res: Response) => {
  try {
    const todoData = req.body as Pick<ITodo, 'name' | 'description' | 'status'>;
    const todoTasks = await todoService.addTodo(todoData);
    io.emit('todoAdded', todoTasks);
    res.status(200).json(todoTasks);
  } catch (err: any) {
    Logger.log('addTask', `todo:${req.body.name}`,err);
    return res.status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR });
  }
};
const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = req.body as Pick<ITodo, 'id'>;
    const deleteTasks = await todoService.deleteTodo(id);
    return res.status(200).json({ success: true, showMessage: true });

  } catch (err: any) {
    Logger.log('deleteTask', `todo:${req.body.id}`,err);
    return res.status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR });
  }
};

const markTodoAsCompleted = async (req: Request, res: Response) => {
  try {
    const id = req.body as Pick<ITodo, 'id'>;
    const markedTask = await todoService.markTodoAsCompleted(id);
    return res.status(200).json({ success: true, showMessage: true });

  } catch (err: any) {
    Logger.log('markTodoAsCompleted', `todo:${req.body.id}`,err);
    return res.status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR });
  }
};

const getAllTodos = async (req: Request, res: Response) => {
  try {
    const allTasks = await todoService.getAllTodos();
    return res.status(200).json({ success: true, data:allTasks, showMessage: true });

  } catch (err: any) {
    Logger.log('getAllTodos', null, err);
    return res.status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR });
  }
};
const updateTodoDescription = async (req: Request, res: Response) => {
  try {
    const todoData = req.body as Pick<ITodo, 'id' | 'description'>;
    const updatedTasks = await todoService.updateTodoDescription(todoData);
    return res.status(200).json({ success: true, data:updatedTasks, showMessage: true });

  } catch (err: any) {
    Logger.log('updateTodoDescription', `todo:${req.body.id}`, err);
    return res.status(err.status || ResponseStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: err.msg || ResponseCommonMessages.INTERNAL_SERVER_ERROR });
  }
};

export default {
  addTodo,
  deleteTodo,
  markTodoAsCompleted,
  getAllTodos,
  updateTodoDescription
};
