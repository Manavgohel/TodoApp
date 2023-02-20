import React, { useState } from "react";
import "./Todo.css";

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");

  function handleTitleChange(event) {
    setNewTodoTitle(event.target.value);
  }

  function handleDescriptionChange(event) {
    setNewTodoDescription(event.target.value);
  }

  function handleAddTodo() {
    if (newTodoTitle.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        title: newTodoTitle,
        description: newTodoDescription,
        isCompleted: false // Add isCompleted state to todo item
      };
      setTodoList([...todoList, newTodo]);
      setNewTodoTitle("");
      setNewTodoDescription("");
    }
  }

  function handleCompleteClick(id) {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: true // Update isCompleted state of the specific todo item
        };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  }

  function handleDeleteClick(id) {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  }

  return (
    <div className="todo-container">
      <h1>My Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newTodoTitle}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Description"
          value={newTodoDescription}
          onChange={handleDescriptionChange}
        ></textarea></div>
        <div>
        <button className='add-coontainer' onClick={handleAddTodo}>Add Task</button>
      </div>
      <ul className="todo-list">
        {todoList.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.isCompleted ? "completed" : ""}`}>
            <div className="todo-card">
              <div>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
              </div>
              <div>
                {todo.isCompleted ? (
                  <button className="delete-button" onClick={() => handleDeleteClick(todo.id)}>
                    Remove
                  </button>
                ) : (
                  <button className="complete-button" onClick={() => handleCompleteClick(todo.id)}>
                    Complete
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
