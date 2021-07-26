import "./App.css"
import TodoList from "./Components/TodoList";

function App() {
    return (
        <>
            <div className="wrapper">
                <div className="header">
                    <h2 className="heading">Todo List</h2>
                </div>
                <TodoList />
            </div>
        </>
    );
}

export default App;
