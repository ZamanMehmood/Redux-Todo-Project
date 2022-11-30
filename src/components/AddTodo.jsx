import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, updateTodo } from "../redux/actions";

export const AddTodo = () => {
  const [value, setValue] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const isEdit = useSelector((state) => state.todoReducer.isEdit);
  const editTodo = useSelector((state) => state.todoReducer.editTodo);

  useEffect(() => {
    editTodo && setValue(() => editTodo);
  }, [editTodo]);
  

    //  submit form  / form validation
  const onSubmit = (e) => {
    e.preventDefault();
 
    if (!value.title) {
      setError((error) => ({
        ...error,
        title: 'Please Enter  Title',
      }));
      return;
    }
    if (!value.description) {
      setError((error) => ({
        ...error,
        description: 'Please Enter  Description'
      })       
      );
      return;
    }

    if (isEdit) {
      dispatch(updateTodo(editTodo.id, value));
    }
    else {
      dispatch(addNewTodo(value));
    }
    setValue({title:'',description:''})
  };

  const handleChange = (e) => {
    setValue(
      {
        ...value,
        [e.target.name]: e.target.value,
      },
    );
    if (e.target.name === "title") {
      setError({
        title: "",
      });
    }
    
    if (e.target.name === "description") {
      setError({
        description: ""
      });
    }
  };
 
  return (
    <div className="container mb-4 py-1 ">
      <form className="mt-3 mb-2" id="todoForm" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-xl-3">
            <label className="sr-only">Name</label>
            <input
              type="text"
              name="title"
              className=" p-2"
              placeholder="Todo Title"
              value={value?.title}
              onChange={(e)=>(e.target.value)}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setError({
                  ...error,
                  title: "please type something",
                });
                }
              }}
            />
            <span className="text-light">{error?.title}</span>
          </div>

          <div className="col-xl-3">
            <label className="sr-only">Description</label>
            <input
              type="text"
              name="description"
              className="p-2"
              placeholder="Description"
              value={value?.description}
              onChange={(e) => handleChange(e)}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setError({
                  ...error,
                  description: "please type something",
                });
                }
              }}
            />
             <span className="text-light">{error?.description}</span>
          </div>

          <div className="col-xl-2">
            <button className="btn btn-primary mb-2" type="submit"> {isEdit ? 'Update Todo' : 'Create Todo'} </button>
          </div>
        </div>
      </form>
    </div>
  );
};