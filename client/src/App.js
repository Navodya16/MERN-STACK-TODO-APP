import "./App.css";
import AddTask from "./addTask/AddTask";
import Task from "./getTask/Task";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Update from "./updateTask/Update";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Task />,
    },
    {
      path: "/add",
      element: <AddTask />,
    },
    {
      path: "/update/:id",
      element: <Update />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
