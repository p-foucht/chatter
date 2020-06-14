import React from 'react';
import { ToggleLayer } from 'react-laag';
import { AnimatePresence, motion } from 'framer-motion';
import ResizeObserver from 'resize-observer-polyfill';

import styles from './styles';

const PopoverMenu = React.forwardRef(function PopoverMenu(props: any, ref) {
  return (
    <ToggleLayer
      fixed
      placement={{ anchor: 'TOP_CENTER', triggerOffset: 12 }}
      ResizeObserver={ResizeObserver}
      renderLayer={({ isOpen, layerProps }) => {
        return (
          <AnimatePresence>
            {isOpen ? (
              <motion.div
                ref={layerProps.ref}
                style={{
                  ...layerProps.style,
                  zIndex: 1000,
                }}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: -8,
                }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  y: 8,
                }}
                transition={{
                  type: 'spring',
                  damping: 35,
                  stiffness: 700,
                }}
              >
                {props.menu}
              </motion.div>
            ) : null}
          </AnimatePresence>
        );
      }}
    >
      {({ triggerRef, toggle }) => (
        <button ref={triggerRef} onClick={toggle} className={styles.button}>
          {props.trigger}
        </button>
      )}
    </ToggleLayer>
  );
});

export default PopoverMenu;
