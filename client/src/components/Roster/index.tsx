import React from "react";

import styles from "./styles";

import { useRoster } from "../../providers/RosterProvider";
import { AttendeeType } from "../../types/rosterType";
import RosterItem from "./RosterItem";

const Roster = () => {
  const roster = useRoster();
  const attendees = Object.values(roster);

  return (
    <section className={styles.roster}>
      <h2 className={styles.header}>Viewers</h2>
      <ul>
        {attendees.map((attendee: AttendeeType) => (
          <RosterItem name={attendee.name} id={attendee.id} />
        ))}
      </ul>
    </section>
  );
};

export default Roster;
