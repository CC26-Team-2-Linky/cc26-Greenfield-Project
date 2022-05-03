import React, { useState } from "react";
import axios from "axios";

function AddEvent({ setPopup }) {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [time, setTime] = useState("");

  const addnewEvent = async (event) => {
    event.preventDefault();
    const input = {
      title: title,
      task: task,
      date: newDate,
      time: time,
    };
    const postData = {
      eventName: input.title,
      description: input.task,
      dateTime: `${input.date} ${input.time}`,
    };
    await axios.post(`http://localhost:8080/events/save`, postData);
  };

  return (
    <div className="addevent">
      <div className="event-form">
        <form className="event-form-inner" onSubmit={addnewEvent}>
          <h2>Add your new event!</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          ></input>
          <input
            type="date"
            value={newDate}
            required
            onChange={(e) => setNewDate(e.target.value)}
          />
          <input
            type="time"
            value={time}
            required
            onChange={(e) => setTime(e.target.value)}
          />
          <textarea
            value={task}
            placeholder="Add New Task"
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
          <button type="submit">Add</button>
          <button
            onClick={() => {
              setPopup(false);
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
