import Task from "../model/taskModel.js";

export const create = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    /*const { email } = newUser;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }*/
    const savedData = await newTask.save();
    res.status(200).json({ message: "Task created successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const taskData = await Task.find();
    if (!taskData || taskData.length === 0) {
      return res.status(404).json({ message: "Task data not found." });
    }
    res.status(200).json(taskData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const taskExist = await Task.findById(id);
    if (!taskExist) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(200).json(taskExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const taskExist = await Task.findById(id);
    if (!taskExist) {
      return res.status(404).json({ message: "Task not found." });
    }
    const updatedData = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Task Updated successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const taskExist = await Task.findById(id);
    if (!taskExist) {
      return res.status(404).json({ message: "Task not found." });
    }
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
