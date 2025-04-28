import React from 'react';
import { useSelector } from 'react-redux';

const TodoColumn = ({ tasks }) => {
  if(!tasks.status==="pending"){
    return null; // Don't render if status is not "pending"
  }
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className="bg-blue-100 rounded-2xl p-4 w-full shadow-md">
      <h2 className="text-xl font-bold mb-4 text-blue-700">📝 To Do</h2>
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <div key={task._id} className="bg-white p-3 rounded-xl shadow hover:shadow-lg transition-all">
           
            <h3 className="font-semibold text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-500">Assigned: {task.assignedTo}</p>
            <button>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoColumn;
