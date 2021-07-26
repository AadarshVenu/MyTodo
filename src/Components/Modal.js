import React, { useState } from "react";
import "./Modal.css";

function Modal(props) {
    const [newItem, setNewItem] = useState(props.editTodo);

    const changeHandler = (event) => {
        setNewItem({ ...newItem, title: event.target.value });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.AddTodo(newItem);
    };
    console.log("newItem", newItem);
    return (
        <div className="modal">
            <form className="modal-form" onSubmit={submitHandler}>
                <h4>Edit Todo</h4>
                <input
                    className="modal-input"
                    type="text"
                    value={newItem.title}
                    onChange={changeHandler}
                />
                <button className="modal-button" type="submit">
                    Done
                </button>
            </form>
        </div>
    );
}

export default Modal;
