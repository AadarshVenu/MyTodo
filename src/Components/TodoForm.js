import { useState } from "react";
import "./TodoForm.css";

const TodoForm = (props) => {
    const [enteredTodo, setEnteredTodo] = useState("");

    const changeHandler = (event) => {
        // console.log(event.target.value);
        setEnteredTodo(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (enteredTodo.toString().trim().length === 0) {
            return;
        }

        props.AddTodo({ title: enteredTodo });
        setEnteredTodo("");
    };

    return (
        <form onSubmit={submitHandler} className="todo-form">
            <input
                value={enteredTodo}
                onChange={changeHandler}
                placeholder="Enter your todo"
                className="todo-input"
            />
            <div className="todo-button-div">
                <button className="todo-button" type="submit">
                    Add New Task
                </button>
            </div>
        </form>
    );
};

export default TodoForm;
