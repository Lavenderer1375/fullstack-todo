import { useState } from "react";
import { useRouter } from "next/router";

const EditTodosPage = ({ id, title, details, status }) => {
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDetails, setTaskDetails] = useState(details);
  const [taskStatus, setTaskStatus] = useState(status);
  const router = useRouter();

  const handleSave = async () => {
    try {
      const res = await fetch("/api/editTodo", {
        method: "PATCH",
        body: JSON.stringify({ id, title: taskTitle, details: taskDetails, status: taskStatus }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.status === "Success") {
        router.push("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Edit Task</h1>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <textarea
        value={taskDetails}
        onChange={(e) => setTaskDetails(e.target.value)}
      />
      <select
        value={taskStatus}
        onChange={(e) => setTaskStatus(e.target.value)}
      >
        <option value="todo">Todo</option>
        <option value="inProgress">In Progress</option>
        <option value="review">Review</option>
        <option value="done">Done</option>
      </select>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditTodosPage;