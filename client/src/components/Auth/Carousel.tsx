import React from "react";

import styles from "./styles";

const Carousel = () => {
  return (
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
  );
};

export default Carousel;

// Tried switching to pure react carousel because the other one had bad performance

// This one is causing a little fuzzy glitch though so I'm gonna leave the carousel alone

// import React from "react";
// import { CarouselProvider, Slider, Slide, Dot } from "pure-react-carousel";
// import "pure-react-carousel/dist/react-carousel.es.css";

// import styles from "./styles";

// const Carousel = () => {
//   return (
//     <div style={{ padding: "6rem 0 4rem 0" }}>
//       <CarouselProvider
//         naturalSlideWidth={100}
//         naturalSlideHeight={80}
//         interval={2000}
//         totalSlides={3}
//         isPlaying={true}
//         dragEnabled={false}
//         touchEnabled={false}
//       >
//         <Slider>
//           <Slide index={0}>
//             <img
//               className={styles.svg}
//               src="https://techcrunch.com/wp-content/uploads/2017/10/group-video-chat-family-of-devices.png"
//               alt="Live stream with tutor"
//             />
//             <h6 className={styles.title}>Live tutoring</h6>
//             <p className={styles.p}>
//               Master challenging concepts while video chatting with a tudor.
//             </p>
//           </Slide>
//           <Slide index={1}>
//             <img
//               className={styles.svg}
//               src="https://miro.medium.com/max/1200/1*y-uo4D3DJB1VbyXBepKMJA.png"
//               alt="Notetaking via onenote"
//             />
//             <h6 className={styles.title}>Realtime Notes</h6>
//             <p className={styles.p}>
//               Improve your notetaking by working with your personalized tutor.
//             </p>
//           </Slide>
//           <Slide index={2}>
//             <img
//               className={styles.svg}
//               src="https://i.imgur.com/4rmPeqJ.png"
//               alt="Chatroom"
//             />
//             <h6 className={styles.title}>Interactive Chatroom</h6>
//             <p className={styles.p}>
//               No mic? No problem. Ask questions or talk with other students via
//               chat.
//             </p>
//           </Slide>
//         </Slider>
//         <div className={styles.dotContainer}>
//           <Dot slide={0} className={styles.dot}>
//             <span></span>
//           </Dot>
//           <Dot slide={1} className={styles.dot}>
//             <span></span>
//           </Dot>
//           <Dot slide={2} className={styles.dot}>
//             <span></span>
//           </Dot>
//         </div>
//       </CarouselProvider>
//     </div>
//   );
// };

// export default Carousel;
