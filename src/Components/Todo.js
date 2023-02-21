import React, { useState } from "react";
import "./Todo.css";

function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: title,
      description: description,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle("");
    setDescription("");
  };

  const handleCompleteTodo = (todoId) => {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    const completedTodo = todos[todoIndex];
    completedTodo.completed = true;

    setCompletedTodos([...completedTodos, completedTodo]);
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const handleDeleteTodo = (todoId) => {
    setCompletedTodos(completedTodos.filter((todo) => todo.id !== todoId));
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
          />
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <button className="add-coontainer" type="submit">Add Todo</button>
        </form>
      </div>
      <div>
        <h2>Pending Tasks</h2>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div className="todo-card">
                <div>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                </div>
                <button
                  className="complete-button"
                  onClick={() => handleCompleteTodo(todo.id)}
                >
                  Complete
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {completedTodos.length > 0 && (
        <div>
          <h2>Completed Tasks</h2>
          <ul className="todo-list">
            {completedTodos.map((todo) => (
              <li key={todo.id} className="todo-item completed">
                <div className="todo-card">
                  <div>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Todo;
