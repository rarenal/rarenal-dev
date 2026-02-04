import styles from './WelcomeBanner.module.css'
import { FujiBackground } from './FujiBackground'

export const WelcomeBanner = () => {
  return (
    <section className={styles.container}>
      <FujiBackground className={styles.background} />
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>Welcome</h1>
          <h2 className={styles.subtitle}>
            <span className={styles.subtitleWhite}>rarenal</span>
            <span className={styles.subtitleGradient}>.dev</span>
          </h2>
        </div>
      </div>
    </section>
  )
}
