import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  root?: string;
}

const Portal: React.FC<Props> = ({ children, root = 'portal-root' }) => {
  const [mount, setMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let el = document.getElementById(root);

    if (!el) {
      el = document.createElement('div');
      document.body.append(el);
    }

    setMount(el);

    return () => {
      if (el) {
        document.body.removeChild(el);
      }
    };
  }, [root]);

  return mount ? createPortal(children, mount) : null;
};

export default Portal;
