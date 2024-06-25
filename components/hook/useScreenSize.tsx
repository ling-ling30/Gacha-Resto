import { useState, useEffect } from "react";

function useScreenSize() {
  const [screenWidth, setScreenWidth] = useState(window.screen.width);

  useEffect(() => {
    // Update screenWidth on window resize
    const handleResize = () => setScreenWidth(window.screen.width);

    // Add event listener on component mount
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount (cleanup)
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array: runs only once on mount

  return screenWidth;
}

export default useScreenSize;
