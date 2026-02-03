import styles from './TechPool.module.css'

export const TechPool = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Tech Stack</h2>
      <div className={styles.techGrid}>
        <div className={styles.techItem}>React</div>
        <div className={styles.techItem}>TypeScript</div>
        <div className={styles.techItem}>Node.js</div>
        <div className={styles.techItem}>Vite</div>
      </div>
    </section>
  )
}
