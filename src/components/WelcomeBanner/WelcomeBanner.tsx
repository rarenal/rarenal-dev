import styles from './WelcomeBanner.module.css'

export const WelcomeBanner = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Welcome</h1>
      <p className={styles.subtitle}>Full Stack Developer & Creative Problem Solver</p>
    </section>
  )
}
