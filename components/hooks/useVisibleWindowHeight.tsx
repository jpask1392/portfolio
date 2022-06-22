import { useEffect, useState } from "react"

const useVisibleWindowHeight = () => {
  const [currentHeight, setCurrentHeight] = useState(0);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const bottomOfNavigation = document.getElementById('primary-header')?.getBoundingClientRect().bottom;
    setCurrentHeight(windowHeight - (bottomOfNavigation || 0));
  }

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return currentHeight;
}

export default useVisibleWindowHeight;