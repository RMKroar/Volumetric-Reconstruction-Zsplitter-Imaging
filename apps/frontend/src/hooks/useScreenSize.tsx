import { useState, useEffect } from "react";

const useScreenSize = (): [number, number] => {
  const [windowSize, setWindowSize] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize([window.innerWidth, window.innerHeight]);
      };

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return windowSize;
};

export default useScreenSize;
