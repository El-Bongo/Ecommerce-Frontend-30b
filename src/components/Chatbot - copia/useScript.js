import { useEffect } from 'react';
import test from './script'
const useScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    console.log(script)
    console.log(document)
    script.src = test;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  });
};

export default useScript;