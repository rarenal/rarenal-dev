import { useState, useEffect, useRef } from 'react'
import { WelcomeBanner } from './components/WelcomeBanner/WelcomeBanner'
import { Presentation } from './components/Presentation/Presentation'
import { TechPool } from './components/TechPool/TechPool'
import { Contact } from './components/Contact/Contact'
import { ScrollIndicator } from './components/ScrollIndicator/ScrollIndicator'
import styles from './App.module.css'

export const App = () => {
  const [currentSection, setCurrentSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollPosition = containerRef.current.scrollTop
      const windowHeight = window.innerHeight

      // Determine which section is currently in view
      const newSection = Math.round(scrollPosition / windowHeight)
      setCurrentSection(newSection)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div ref={containerRef} className={styles.container}>
        <section ref={(el) => (sectionRefs.current[0] = el)} className={styles.section}>
          <WelcomeBanner />
        </section>
        <section ref={(el) => (sectionRefs.current[1] = el)} className={styles.section}>
          <Presentation />
        </section>
        <section ref={(el) => (sectionRefs.current[2] = el)} className={styles.section}>
          <TechPool />
        </section>
        <section ref={(el) => (sectionRefs.current[3] = el)} className={styles.section}>
          <Contact />
        </section>
      </div>
      <ScrollIndicator totalSections={4} currentSection={currentSection} />
    </>
  )
}
