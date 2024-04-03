import Todo from '../models/todo';
import { ITodo } from "../types/todo";
import BadRequestException from './../util/exceptions/badRequestException';

const todoService = {

  // Method to adding todo
  addTodo: async (todoData: Pick<ITodo, 'name' | 'description' | 'status'>): Promise<ITodo> => {
    try {
      const todo = new Todo(todoData);
      const savedTodo = await todo.save();
      return savedTodo;
    } catch (error) {
      throw error;
    }
  },

  // Method to Delete todo
  deleteTodo: async (deleteData: Pick<ITodo, 'id'>): Promise<void> => {
    try {
      
      if (!deleteData.id) {
        throw new BadRequestException('Invalid id of todo');
      }

      await Todo.findByIdAndDelete(deleteData.id);

    } catch (error) {
      throw error;
    }
  },

  // Method to mark a todo as completed
  markTodoAsCompleted: async (markToCompleteData: Pick<ITodo, 'id'>): Promise<void> => {
    try {
      const todo = await Todo.findByIdAndUpdate(markToCompleteData.id, { status: true }, { new: true });
      if (!todo) {
        throw new BadRequestException('Invalid id of todo');
      }
    } catch (error) {
      throw error;
    }
  },

  // Method to fetch all todos
  getAllTodos: async (): Promise<ITodo[] | null> => {
    try {
      const todos = await Todo.find();
      return todos;
    } catch (error) {
      throw error;
    }
  },

  // Method to update a todo
  updateTodoDescription: async (updatingData: Pick<ITodo, 'id' | 'description'>): Promise<ITodo> => {
    try {
      const todo = await Todo.findByIdAndUpdate(updatingData.id, { description: updatingData.description }, { new: true });

      if (!todo) {
        throw new BadRequestException('Invalid id of todo');
      }

      return todo;

    } catch (error) {
      throw error;
    }
  },
};

export default todoService;

