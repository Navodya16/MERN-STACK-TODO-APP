import express from "express";

import {
  create,
  getAllTasks,
  getTaskById,
  update,
  deleteTask,
} from "../controller/taskController.js";

const taskroute = express.Router();

taskroute.post("/task", create);
taskroute.get("/tasks", getAllTasks);
taskroute.get("/task/:id", getTaskById);
taskroute.put("/update/task/:id", update);
taskroute.delete("/delete/task/:id", deleteTask);

export default taskroute;
