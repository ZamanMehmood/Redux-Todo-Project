import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../redux/actions";

export const TodoLists = () => {
  const todos = useSelector((state) => state.todoReducer.todos);
  const dispatch = useDispatch();

  

     const handleEdit = (data) => {
      // console.log("Handle Edit");

      if (data && data.type === "edit"){
        dispatch(editTodo(data.todo.id));
      }
     };

  
     const handleDelete = (data) => {
      // console.log("Handle Delete");

       if (data && data.type === "delete") {
            dispatch(deleteTodo(data?.todo?.id));
          }
     };

  return (
    <div className="container my-2">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="bg-dark text-light">ID</th>
            <th className="bg-dark text-light">Name</th>
            <th className="bg-dark text-light">Description</th>
            <th className="bg-dark text-light">Actions</th>
          </tr>
        </thead>

        <tbody>
          {todos && todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo?.id}</td>
              {/* <td></td> */}
              <td>{todo?.title}</td>
              <td>{todo?.description}</td>
              
              <td >
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEdit({ todo: todo, type: "edit" })}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ml-1"
                  onClick={() => handleDelete({ todo: todo, type: "delete" })}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};