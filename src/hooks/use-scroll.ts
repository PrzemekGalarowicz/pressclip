import * as React from 'react'

export function useScroll(offset = 56) {
  const [isScroll, setIsScroll] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > offset)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [offset])

  return isScroll
}
