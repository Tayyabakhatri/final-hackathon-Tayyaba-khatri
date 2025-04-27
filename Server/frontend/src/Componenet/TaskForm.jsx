import React from "react";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_BASE_URL;

const CreateTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      assignedTo,
      status,
      dueDate,
    };

    try {
      const response = await fetch(`${apiUrl}/tasks/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      console.log("Response:", response);

      if (response.ok) {
        const createdTask = await response.json();
        console.log("Task created:", createdTask);
      } else {
        console.error("Failed to create task:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 w-full max-w-md mx-auto mt-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Create a Task
      </h2>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        rows="4"
      />

      <input
        type="text"
        placeholder="Assigned To"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        required
        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      /> */}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
      >
        Create Task
      </button>
    </form>
  );
};

export default CreateTaskForm;
