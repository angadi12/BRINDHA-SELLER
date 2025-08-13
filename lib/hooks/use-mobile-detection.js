"use client"

import { useEffect, useState } from "react"

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      // Check screen width
      const screenWidth = window.innerWidth
      const isMobileWidth = screenWidth < 768 // md breakpoint

      // Check user agent for mobile devices
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)

      // Consider it mobile if either condition is true
      setIsMobile(isMobileWidth || isMobileDevice)
      setIsLoading(false)
    }

    // Initial check
    checkMobile()

    // Listen for resize events
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return { isMobile, isLoading }
}
