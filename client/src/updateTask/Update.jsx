import React, { useEffect, useState } from "react";
import "./update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://mern-stack-todo-app-delta.vercel.app/api";

const UpdateTask = () => {
  const tasks = {
    title: "",
    description: "",
    dueDate: "",
    status: "",
  };
  const [task, setTask] = useState(tasks);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/task/${id}`)
      .then((response) => {
        setTask(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const { status } = task; // Preserve current status

    await axios
      .put(`${API_BASE_URL}/update/task/${id}`, { ...task, status }) // Include status in the update request
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

      <h3>Update Task</h3>
      <form className="addTaskForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={task.title}
            onChange={inputHandler}
            name="title"
            autoComplete="off"
            placeholder="Enter your Title"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={task.description}
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
            value={task.dueDate}
            onChange={inputHandler}
            name="dueDate"
            autoComplete="off"
            placeholder="Enter task Due Date"
          />
        </div>
        {/* Status field hidden from the user */}
        <input
          type="hidden"
          id="status"
          value={task.status}
          onChange={inputHandler}
          name="status"
        />
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
