import { useEffect } from 'react';

const UseScript = url => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.type = "module";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default UseScript;