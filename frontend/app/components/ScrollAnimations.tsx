'use client'

import {useEffect} from 'react'
import {usePathname} from 'next/navigation'
import AOS from 'aos'

export default function ScrollAnimations() {
  const pathname = usePathname()

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    })

    // Route changes in Next.js don't trigger a full reload; refresh AOS so new
    // elements get animated.
    AOS.refreshHard()
  }, [pathname])

  return null
}
