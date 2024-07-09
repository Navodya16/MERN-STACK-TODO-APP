import React, { useState } from "react";
import "./addtask.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://mern-stack-todo-app-delta.vercel.app/api";

const AddTask = () => {
  const initialTask = {
    title: "",
    description: "",
    dueDate: "",
    status: "Not Completed", // Set initial status here
  };

  const [task, setTask] = useState(initialTask);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;

    if (name === "dueDate") {
      // Format the date to 'YYYY-MM-DD'
      const formattedDate = new Date(value).toISOString().split("T")[0];
      setTask({ ...task, [name]: formattedDate });
    } else {
      setTask({ ...task, [name]: value });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post(`${API_BASE_URL}/task`, task)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="addTask">
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Add New Task</h3>
      <form className="addTaskForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            onChange={inputHandler}
            name="title"
            autoComplete="off"
            placeholder="Enter task title"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            onChange={inputHandler}
            name="description"
            autoComplete="off"
            placeholder="Enter task description"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            onChange={inputHandler}
            name="dueDate"
            autoComplete="off"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
