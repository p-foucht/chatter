import React, { useState } from "react";

import Nav from "./Nav";
import Roster from "../Roster";
import Chat from "../Chat";

import styles from "./styles";

export type View = "roster" | "chat";

const Sidebar = () => {
  const [view, setView] = useState<View>("chat");

  return (
    <section className={styles.container}>
      <Nav view={view} setView={setView} />
      {view === "chat" ? <Chat /> : <Roster />}
    </section>
  );
};

export default Sidebar;
