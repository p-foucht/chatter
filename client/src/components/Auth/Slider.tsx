import React from "react";
import Carousel from "@brainhubeu/react-carousel";

import "@brainhubeu/react-carousel/lib/style.css";
import styles from "./styles";

const Slider = () => {
  return (
    <>
      <Carousel autoPlay={3000} animationSpeed={1000} infinite dots>
        <div>
          <img
            className={styles.svg}
            src="https://techcrunch.com/wp-content/uploads/2017/10/group-video-chat-family-of-devices.png"
            alt="Live stream with tutor"
          />
          <h6 className={styles.title}>Live tutoring</h6>
          <p className={styles.p}>
            Master challenging concepts while video chatting with a tudor.
          </p>
        </div>
        <div>
          <img
            className={styles.svg}
            src="https://miro.medium.com/max/1200/1*y-uo4D3DJB1VbyXBepKMJA.png"
            alt="Notetaking via onenote"
          />
          <h6 className={styles.title}>Realtime Notes</h6>
          <p className={styles.p}>
            Improve your notetaking by working with your personalized tutor.
          </p>
        </div>
        <div>
          <img
            className={styles.svg}
            src="https://i.imgur.com/4rmPeqJ.png"
            alt="Chatroom"
          />
          <h6 className={styles.title}>Interactive Chatroom</h6>
          <p className={styles.p}>
            No mic? No problem. Ask questions or talk with other students via
            chat.
          </p>
        </div>
      </Carousel>
    </>
  );
};

export default Slider;
