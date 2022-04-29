import { React, useState } from "react";
import "../styles/index.css";
import Navbar from "./Navbar.jsx";
import CalendarComponent from "./Calendar.jsx";
import Document from "./Document";
import Event from "./Event.jsx";
import ToDo from "./ToDo";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDocument, setShowDocument] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showToDo, setShowToDo] = useState(false);
  const [showEvent, setShowEvent] = useState(false);

  const displayCalender = () => {
    setShowCalendar(true);
  };
  const displayDocument = () => {
    setShowDocument(true);
  };
  const displayToDo = () => {
      setShowToDo(true);
    };
  const displayEvent = () => {
    setShowEvent(true);
  };

  return (
    <div className="app">
      <Navbar 
      displayCalender={displayCalender}
      displayDocument={displayDocument}
      displayToDo={displayToDo}
      displayEvent={displayEvent} 
      />
      
      <div className="mainfield">
      <div >
        <CalendarComponent
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          showTask={showTask}
          setShowTask={setShowTask}
        />
      </div>

      <div className="content-wrapper">
        {showCalendar && (
          <CalendarComponent
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            showTask={showTask}
            setShowTask={setShowTask}
          />
        )}
        <div className="second-wrapper">
        {showDocument && <Document />}
        {showToDo && <ToDo />}
        {showEvent && <Event />}
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
