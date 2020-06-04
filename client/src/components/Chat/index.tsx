import React from "react";

import Message from "./Message";

import styles from "./styles";

const Chat = () => {
  return (
    <div className={styles.chat}>
      <div>
        <Message
          text="How do we calculate the second derivative of a parametric function?"
          author="Peyton Foucht"
          timestamp="11:58 AM"
        />
        <Message
          text="More specifically, I am a very smart. How can I lorem ipsum this sentence so that I can understand lorem ipsum?"
          author="Camden Foucht"
          timestamp="11:59 AM"
        />
        <Message
          text="🔥🔥🔥🔥🔥 check out these emojis"
          author="Peyton Foucht"
          timestamp="12:05 PM"
        />
        <Message
          text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. "
          author="Tiffany Foucht"
          timestamp="12:10 PM"
        />
      </div>
      <div className={styles.temp}>Text Input Stuff</div>
    </div>
  );
};

export default Chat;
