import React, { useState } from "react";
import axios from "axios";
import AddEvent from "./AddEvent";

function Event({ events }) {
  const [event, setEvent] = useState({});
  const [eventPreview, setEventPreview] = useState([]);
  let key = 0;

  const getAllEvents = async () => {
    const res = await axios.get("/events");
    const eventsAll = res.data;
    setEvents(eventsAll.reverse());
  };


  const getEventById = async (e) => {
    e.preventDefault();
    const id = e.target.value;
    const res = await axios.get(`http://localhost:8080/events/view/${id}`);
    const selectedEvent = res.data;
    setEvent(selectedEvent);
  };


  const searchEvents = (e) => {
    let matches = events.filter((el) => {
      const regExName = new RegExp(`^${e.target.value}`, "gi");
      const regExDescrip = new RegExp(`${e.target.value}`, "gi");
      return (
        el.eventName.match(regExName) || el.description.match(regExDescrip)
      );
    });

    if (e.target.value.length === 0) {
      matches = [];
    }
    console.log("Matches: ", matches);
    console.log("NEW EVENTS: ", events);
    outputHtml(matches);
  };

  const outputHtml = (matchesArr) => {
    console.log(matchesArr.length);
    if (matchesArr.length > 0) {
      const html = matchesArr.map((event, index) => {
        return (
          <div
            className="result"
            key={index}
            onClick={async (e) => {
              const res = await axios.get(`/events/view/${event.id}`);
              const selectedEvent = res.data;
              setEvent(selectedEvent);
            }}
          >
            {`${event.eventName}: ${event.description.slice(0, 8)}...`}
          </div>
        );
      });
      setEventPreview(html);
      // setShowPreview(true);
    } else {
      console.log("No results from search");
      setEventPreview([]);
      // setShowPreview(false);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    console.log(event);
  }, [events, event]);


  return (
    <div className="events">
      <h2 className="events-title">Events</h2>

      <div className="search-event">
        <form className="documentform">
          <select className="documentform-week">
            <option value="week1">week1</option>
            <option value="week2">week2</option>
            <option value="week3">week3</option>
            <option value="week4">week4</option>
            <option value="week5">week5</option>
          </select>
          <select className="documentform-name">
            <option value="instructor">instructors</option>
            <option value="student">students</option>
          </select>
          <input type="text" placeholder="Keyword" onChange={searchEvents} />
          {eventPreview.length > 0 ? (
            <div className="event-preview">{eventPreview}</div>
          ) : (
            <div className="hide"></div>
          )}
          <div className="event-btn">Search Event</div>
        </form>
      </div>

      <div className="add-event">
        <button onClick={enablePopup}>Add new event</button>
        {popup ? <AddEvent setPopup={setPopup} /> : undefined}
        {/* popup{ && <AddEvent setPopup={setPopup} />} */}
      </div>

      <div className="show-event">
        <select onChange={getEventById} required>
          <option hidden>-- Event --</option>
          {events.map((event, index) => {
            return (
              <option key={index} value={event.id}>
                {event.eventName}
              </option>
            );
          })}
        </select>
        <div className="event-btn-show">Show Event</div>
      </div>

      {event.id ? (
        <div className="event-content event-selected">
          <div className="item-title">{event.eventName}</div>
          <div>Event Time : {event.dateTime.slice(0, 10)}</div>
          <div>Description : {event.description}</div>
        </div>
      ) : (
        ""
      )}

      {events.map((event, index) => {
        return (
          <div key={index} className="event-content">
            <div className="item-title">{event.eventName}</div>
            <div>Event Time : {event.dateTime.slice(0, 10)}</div>
            <div>Description : {event.description}</div>
          </div>
        );
      })}
    </div>
  );
}
