import React, { useState } from 'react';

import Nav from './Nav';
import Roster from '../Roster';
import Chat from '../Chat';

import styles from './styles';

export type View = 'roster' | 'chat' | 'reaction';

const Sidebar = () => {
  const [view, setView] = useState<View>('chat');

  let component: any = null;

  if (view === 'chat') {
    component = <Chat />;
  } else if (view === 'roster') {
    component = <Roster />;
  }

  return (
    <section className={styles.container}>
      <Nav view={view} setView={setView} />
      {component}
    </section>
  );
};

export default Sidebar;
