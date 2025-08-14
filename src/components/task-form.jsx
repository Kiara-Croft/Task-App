import { useState } from "react";

function TaskForm({ onAdd }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim()) {
      onAdd(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a new task"
      />
      <button type="submit">Add</button>
    </form>
  );
}
export default TaskForm;
