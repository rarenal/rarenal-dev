import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './ScrollIndicator.module.css'

interface ScrollIndicatorProps {
  totalSections: number
  currentSection: number
}

export const ScrollIndicator = ({ totalSections, currentSection }: ScrollIndicatorProps) => {
  const indicatorRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<(HTMLDivElement | null)[]>([])

  // Gradient colors matching the title gradient
  const dotColors = ['#667eea', '#6f6fd0', '#785fb9', '#764ba2']

  useEffect(() => {
    if (indicatorRef.current) {
      gsap.fromTo(
        indicatorRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.8, delay: 1 }
      )
    }
  }, [])

  useEffect(() => {
    dotsRef.current.forEach((dot, index) => {
      if (dot) {
        const color = dotColors[index] || dotColors[0]
        if (index === currentSection) {
          gsap.to(dot, {
            scale: 1.5,
            backgroundColor: color,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
          })
        } else {
          gsap.to(dot, {
            scale: 1,
            backgroundColor: color,
            opacity: 0.4,
            duration: 0.3,
            ease: 'power2.out'
          })
        }
      }
    })
  }, [currentSection])

  return (
    <div ref={indicatorRef} className={styles.indicator}>
      <div className={styles.dotsContainer}>
        {Array.from({ length: totalSections }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              dotsRef.current[index] = el
            }}
            className={`${styles.dot} ${index === currentSection ? styles.active : ''}`}
          />
        ))}
      </div>
      <div className={styles.line} />
    </div>
  )
}
