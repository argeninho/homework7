import React, { useState } from "react";
import "./App.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const editTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const filterTasks = (filter) => {
    setFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return !task.completed;
    } else {
      return task.completed;
    }
  });

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Новая задача"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="task-list">
        {filteredTasks.map((task, index) => (
          <div key={index} className="task">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />
            <input
              type="text"
              value={task.text}
              onChange={(e) => editTask(index, e.target.value)}
            />
            <button onClick={() => deleteTask(index)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="filter-buttons">
        <button onClick={() => filterTasks("all")}>All</button>
        <button onClick={() => filterTasks("active")}>Active</button>
        <button onClick={() => filterTasks("completed")}>Completed</button>
      </div>
    </div>
  );
};

export default TodoApp;
