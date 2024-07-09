import React, { useEffect, useState } from "react";
import "./task.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

const Task = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/delete/task/${taskId}`
      );
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTaskStatus = async (taskId, currentStatus) => {
    try {
      const newStatus =
        currentStatus === "Completed" ? "Not Completed" : "Completed";
      const response = await axios.put(
        `${API_BASE_URL}/update/task/${taskId}`,
        { status: newStatus }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, status: newStatus };
          }
          return task;
        })
      );
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="taskTable">
      <Link to="/add" type="button" className="btn btn-primary">
        Add Task <i className="fa fa-tasks"></i>
      </Link>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th scope="col">Task.No.</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Due Date</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>
                {task.status}
                <button
                  className={`btn btn-sm ml-2 ${
                    task.status === "Completed" ? "btn-success" : "btn-warning"
                  }`}
                  onClick={() => toggleTaskStatus(task._id, task.status)}
                >
                  {task.status === "Completed"
                    ? "Mark as Not Completed"
                    : "Mark as Completed"}
                </button>
              </td>
              <td className="actionButtons">
                <Link to={`/update/${task._id}`} className="btn btn-info">
                  <i className="fa fa-pen-to-square"></i>
                </Link>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="btn btn-danger ml-2"
                >
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Task;
