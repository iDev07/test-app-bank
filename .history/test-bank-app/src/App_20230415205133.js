import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    file: "",
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (newTask) => {
    try {
      const response = await axios.post("http://localhost:3000/tasks", newTask);
      console.log(response.data);
      // add the new task to the state
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      // remove the task from the state
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTask(newTask);
    // reset the form
    setNewTask({ title: "", description: "", file: "" });
  };

  return (
    <div className="kanban-board">
      <form onSubmit={handleSubmit}>
        <div className="title">
          <label>
            Title:
            <input
              type="text"
              value={newTask.title}
              onChange={(event) =>
                setNewTask({ ...newTask, title: event.target.value })
              }
              required
            />
          </label>
        </div>
        <label>
          Description:
          <textarea
            value={newTask.description}
            onChange={(event) =>
              setNewTask({ ...newTask, description: event.target.value })
            }
            required
          />
        </label>
        <label>
          File:
          <input
            type="file"
            onChange={(event) =>
              setNewTask({
                ...newTask,
                file: URL.createObjectURL(event.target.files[0]),
              })
            }
          />
        </label>
        <button type="submit">Add Task</button>
      </form>
      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          {task.file && <img src={task.file} alt={task.title} />}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

const FullScreenCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
  });

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/events");
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const createEvent = async (newEvent) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/events",
        newEvent
      );
      console.log(response.data);
      // add the // new event to the state
      setEvents([...events, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      // eslint-disable-next-line no-template-curly-in-string
      await axios.delete(`http://localhost:3000/events/${eventId}`);

      // remove the event from the state
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createEvent(newEvent);
    // reset the form
    setNewEvent({ title: "", description: "", start: "", end: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={newEvent.title}
            onChange={(event) =>
              setNewEvent({ ...newEvent, title: event.target.value })
            }
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={newEvent.description}
            onChange={(event) =>
              setNewEvent({ ...newEvent, description: event.target.value })
            }
            required
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={newEvent.start}
            onChange={(event) =>
              setNewEvent({ ...newEvent, start: event.target.value })
            }
            required
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={newEvent.end}
            onChange={(event) =>
              setNewEvent({ ...newEvent, end: event.target.value })
            }
            required
          />
        </label>
        <button type="submit">Add Event</button>
      </form>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>
            Start: {event.start} - End: {event.end}
          </p>
          <button onClick={() => deleteEvent(event.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Kanban Board</h1>
      <KanbanBoard />
      <hr />
      <h1>Full Screen Calendar</h1>
      <FullScreenCalendar />
    </div>
  );
};

export default App;
