import React from "react";

import { useRoster } from "../../providers/RosterProvider";
import { AttendeeType } from "../../types/rosterType";

import "./index.css";

const Roster = () => {
  const roster = useRoster();
  const attendees = Object.values(roster);

  return (
    <section className="roster">
      <h2 className="roster-header">Viewers</h2>
      <ul>
        {attendees.map((attendee: AttendeeType) => (
          <li key={attendee.id}>{attendee.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default Roster;
