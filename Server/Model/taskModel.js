import mongoose from "mongoose";
const databaseTaskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedTo: { type: String, required: true }, // <-- ADD THIS
    status: { type: String, default: "pending", enum: ["pending", "in-progress", "completed"] },
    duedate: { type: Date }
  });
  
export default mongoose.model("Tasks", databaseTaskSchema);
