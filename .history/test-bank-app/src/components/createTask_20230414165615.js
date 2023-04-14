import React, { useState } from "react";
import axios from "axios";

const createTask = async (task) => {
  try {
    const response = await axios.post("http://localhost:3000/tasks", task);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    await createTask(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <input type="file" onChange={(event) => setFile(event.target.files[0])} />
      <button type="submit">Create Task</button>
    </form>
  );
};
