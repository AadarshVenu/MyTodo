import React from "react";
import "./TodoItem.css";
import { useState, useEffect } from "react";

function TodoItem(props) {
    // console.log(props.todos);
    const [todos, setTodos] = useState(props.todos);

    const [searchTodo, setSearchTodo] = useState("");


    const sortHandler = () => {
     const newTodo = [...todos].sort(function (a, b) {
          if (a.title < b.title) {
              return -1;
          }
          if (a.title > b.title) {
              return 1;
          }
          return 0;
      });
      setTodos(newTodo);
    };

    useEffect(() => {
        setTodos(props.todos);
    }, [props.todos]);

    return (
        <div>
            <div className="todo-filter">
                <button
                    className="todo-filter-button"
                    onClick={() => setTodos(props.todos)}
                >
                    All
                </button>
                <button
                    className="todo-filter-button"
                    onClick={() =>
                        setTodos(props.todos.filter((item) => item.completed))
                    }
                >
                    Done
                </button>
                <button
                    className="todo-filter-button"
                    onClick={() =>
                        setTodos(props.todos.filter((item) => !item.completed))
                    }
                >
                    Todo
                </button>
                <input
                    type="text"
                    placeholder="Search"
                    className="todo-search"
                    onChange={(e) => setSearchTodo(e.target.value)}
                />
            </div>

            <div className="todo-list">
                <div className="todo-sort">
                    <button onClick={sortHandler} className="todo-sort-button">
                        Sort by Name
                    </button>
                </div>
                <ul>
                    {todos &&
                        todos
                            .filter((item) => {
                                if (searchTodo === "") {
                                    return item;
                                } else if (
                                    item.title
                                        .toLowerCase()
                                        .includes(searchTodo.toLowerCase())
                                ) {
                                    return item;
                                }
                            })
                            .map((item) => (
                                <div key={item.id}>
                                    <li className="todo-items" key={item.id}>
                                        <div className="todo-items-title">
                                            {item.title}
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                className="todo-items-checkbox"
                                                readOnly
                                                onClick={() =>
                                                    props.onCheck(item.id)
                                                }
                                                checked={item.completed}
                                            />

                                            <button
                                                onClick={() =>
                                                    props.onToggle(item)
                                                }
                                                className="todo-items-button"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="todo-items-button "
                                                onClick={() =>
                                                    props.onRemove(item.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                </div>
                            ))}
                </ul>
            </div>
            <div className="main-buttons">
                <button onClick={() => props.onDone()} className="done-button">
                    Done All Tasks
                </button>
                <button
                    className="delete-button"
                    onClick={() => props.onDelete()}
                >
                    Delete All Tasks
                </button>
            </div>
        </div>
    );
}

export default TodoItem;
