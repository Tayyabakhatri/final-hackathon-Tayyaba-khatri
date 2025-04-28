import React from "react";

const InProgressColumn = ({ tasks }) => {
  if(!tasks.status==="in-progress"){
    return null; // Don't render if status is not "in-progress"
  }
  return (
    // <>inprogress</>
    <>
      <div className="bg-yellow-100 rounded-2xl p-4 w-full shadow-md">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold mb-4 text-yellow-700">
            🚧 In Progress
          </h2>
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-3 rounded-xl shadow hover:shadow-lg transition-all"
            >
              <h3 className="font-semibold text-gray-800">{task.title}</h3>
              <p className="text-sm text-gray-500">
                Assigned: {task.assignedTo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InProgressColumn;
