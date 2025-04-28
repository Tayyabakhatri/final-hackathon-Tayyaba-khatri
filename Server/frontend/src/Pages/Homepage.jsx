import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TodoColumn from "../Componenet/TodoColumn.jsx";
import InProgressColumn from "../Componenet/InProgressColumn.jsx";
import ProgressDoneColumn from "../Componenet/ProgressDoneColumn.jsx";
import TaskForm from "../Componenet/TaskForm.jsx";
const apiUrl = import.meta.env.VITE_BASE_URL;
console.log(apiUrl);

const Homepage = () => {
  const [tasks, setTasks] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // ✅ Go to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${apiUrl}/tasks/taskss`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched tasks:", data.tasks);
          setTasks(data.tasks);
        } else {
          console.error("Error fetching tasks", response.status);
        }
      } catch (error) {
        console.log("Fetch error:", error.message);
      }
    };

    fetchTasks();
  }, []);

  // ✅ Only show dashboard if authenticated
  if (!isAuthenticated) return null;
  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Task Manager Board
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <TaskForm />
          <TodoColumn tasks={tasks} />
          <InProgressColumn tasks={tasks} />
          <ProgressDoneColumn tasks={tasks} />
        </div>
      </div>
    </>
  );
};

export default Homepage;
