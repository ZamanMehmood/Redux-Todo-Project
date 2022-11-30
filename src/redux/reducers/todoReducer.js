import {
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    UPDATE_TODO,
  } from "../actions/actionTypes";
  
  const initialState = {
    todos: [
      {
        id: 1,
        title: "TodoList 1",
        description: "First todo",
      },
      {
        id: 2,
        title: "TodoList 2",
        description: "Second todo",
      },
      {
        id: 3,
        title: "TodoList 3",
        description: "Third todo",
      },
      {
        id: 4,
        title: "TodoList 3",
        description: "Third todo",
      }
    ],
    isEdit: false,
    editTodoId: "",
  };
  
   const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      // add new todo 
      case ADD_TODO:
        const { id, title, description } = action.payload;
        return {
          ...state,
          todos: [
            ...state.todos,
            {
              id: id,
              title: title,
              description: description,
            },
          ],
          isEdit: action.isEdit,
        };
        // delete todo from array 
      case DELETE_TODO:
        const newTodoList = state.todos.filter((item) => item.id !== action.id);
            console.log("Delete todo list ==>", newTodoList)
        return {
          ...state,
          todos: newTodoList,
        };
  
        //  edit todo from array 
      case EDIT_TODO:
        const editTodo = action.payload;
        let newEditTodo = state?.todos?.find((item) => item?.id === editTodo?.id);
        console.log("new Edit Todo ==>", newEditTodo)
        return {
          ...state,
          isEdit: action.isEdit,
          editTodo: newEditTodo,
        };
              // update the todo 
      case UPDATE_TODO:
        const { todoId, todoTitle, todoDescription } = action.payload;
        const todos = state.todos.filter((todo) => {
          return todo.id !== todoId;
        });
  
        const todo = state.todos.find((todo) => todo?.id === todoId);
                                   console.log("update todo ===>",todo)
        todo.title = todoTitle;
        todo.description = todoDescription;
       
        todos.push(todo);
  
        return {
          ...state,
          todos: [...todos],
          isEdit: false,
        };
  
      default:
        return state;
    }
  };
  export default todoReducer;