import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [itemsCount, setItemsCount] = useState();
    const [modal, setModal] = useState(false);
    const [editTodo, setEditTodo] = useState("");

    const fetchTodos = () => {
        axios
            .get("https://jsonplaceholder.typicode.com/todos")
            .then(function (response) {
                // console.log(response.data);
                setTodos(response.data);
                setItemsCount(response.data.length);
            });
    };
    useEffect(() => {
        fetchTodos();
    }, []);

    // console.log(itemsCount);

    const AddTodohandler = (todo) => {
        setItemsCount((itemsCount) => itemsCount + 1);
        setTodos((prevTodo) => [
            ...prevTodo,
            {
                id: itemsCount + 1,
                title: todo.title,
                completed: false,
            },
        ]);
        console.log(todo);
    };

    const AddEditedTodohandler = (todo) => {
        let newTodo = todos.map((item) => {
            if (item.id === todo.id) {
                item = todo;
            }
            return item;
        });
        console.log(newTodo);
        setTodos(newTodo);
        setModal(!modal);
    };

    const checkBoxHandler = (todoId) => {
        let newTodo = todos.map((item) => {
            if (item.id === todoId) {
                item.completed = !item.completed;
            }
            return item;
        });
        // console.log(newTodo);
        setTodos(newTodo);
    };

    const removeTodoHandler = (todoId) => {
        setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== todoId));
    };

    const removeTodo = () => {
        setTodos([]);
    };

    const toggleModalHandler = (item) => {
        setEditTodo(item);
        // console.log(newTodo);
        setModal(!modal);
    };
    const doneAllHandler = () => {
        const newTodo = [...todos].map((item) => {
            item.completed = true;
            return item;
        });
        setTodos(newTodo);
    };

    return (
        <>
            <TodoForm AddTodo={AddTodohandler} />
            {modal && (
                <Modal AddTodo={AddEditedTodohandler} editTodo={editTodo} />
            )}
            <TodoItem
                todos={todos}
                onRemove={removeTodoHandler}
                onDelete={removeTodo}
                onCheck={checkBoxHandler}
                onToggle={toggleModalHandler}
                onDone={doneAllHandler}
            />
        </>
    );
};

export default TodoList;
