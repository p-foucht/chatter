import React from "react";

import styles from "./styles";

import { useRoster } from "../../providers/RosterProvider";
import { AttendeeType } from "../../types/rosterType";

const Roster = () => {
  const roster = useRoster();
  const attendees = Object.values(roster);

  return (
    <section className={styles.roster}>
      <h2 className={styles.header}>Viewers</h2>
      <ul>
        {attendees.map((attendee: AttendeeType) => (
          <li key={attendee.id}>{attendee.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default Roster;
