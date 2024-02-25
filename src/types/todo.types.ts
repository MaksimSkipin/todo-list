interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface IDeletedTodo extends ITodo {
  isDeleted: boolean;
  deletedOn: string;
}

export interface ITodosResponse {
  limit: number;
  skip: number;
  total: number;
  todos: ITodo[];
}

export default ITodo;
