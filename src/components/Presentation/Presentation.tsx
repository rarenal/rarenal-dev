import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import styles from './Presentation.module.css'

gsap.registerPlugin(SplitText)

export const Presentation = () => {
  const textRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    // Only animate once
    if (hasAnimated || !textRef.current) return

    const split = new SplitText(textRef.current, { type: 'lines', linesClass: 'line' })
    const lines = split.lines

    // Wrap lines in a container to handle overflow
    gsap.set(lines, { 
      yPercent: 100, 
      opacity: 0,
      filter: 'blur(4px)',
      rotation: 2
    })

    // Animate lines in
    gsap.to(lines, {
      duration: 1,
      yPercent: 0,
      opacity: 1,
      filter: 'blur(0px)',
      rotation: 0,
      stagger: 0.8,
      ease: 'back.out(1.2)',
      delay: 0.8,
      onComplete: () => {
        setHasAnimated(true)
        // Don't revert - keep the split structure to prevent repositioning
      }
    })

    return () => {
      split.revert()
    }
  }, [hasAnimated])

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>About Me</h2>
      
      <div className={styles.contentWrapper}>
        <div className={styles.textContainer}>
          <div ref={textRef} className={styles.animatedText}>
            <p>
              I'm <span className={styles.highlight1}>Ramón Arenal</span>, and I've spent the last <span className={styles.highlight2}>decade</span> turning complex problems into elegant solutions. 
              I love building things that people actually want to use. 
              <span className={styles.highlight3}>Data visualizations</span>? That's where I really geek out—making numbers dance and tell stories. 
              I'm all about <span className={styles.highlight4}>clean, readable code</span> (because future-me and my teammates deserve better than spaghetti). 
              I design <span className={styles.highlight5}>components</span> like they're LEGO blocks—reusable, scalable, ready for whatever comes next. 
              <span className={styles.highlight6}>UI/UX</span> isn't just about making things pretty; it's about making them feel right. 
              I believe great software is a mix of <span className={styles.highlight1}>technical chops</span> and <span className={styles.highlight3}>creative thinking</span>.
            </p>
            <p className={styles.finalLine}>This is what I do.</p>
            <p className={styles.finalLine}>This is who I am.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
