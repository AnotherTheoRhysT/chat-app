import { useEffect, useState } from "react";

const useMediaQuery = (mediaQuery) => {
	const [matches, setMatches] = useState(
    window.matchMedia(`(${mediaQuery})`).matches
  )
  useEffect(() => {
		const mediaWatcher = window.matchMedia(`(${mediaQuery})`)
		const updateMatch = e => setMatches(e.matches)
		mediaWatcher.addEventListener('change', updateMatch)
    // clean up after ourselves
    return () => {
			mediaWatcher.removeEventListener('change', updateMatch)
		}
  }, [mediaQuery]);

	return matches
}

export default useMediaQuery