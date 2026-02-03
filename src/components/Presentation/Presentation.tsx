import styles from './Presentation.module.css'

export const Presentation = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>About Me</h2>
      <div className={styles.content}>
        <p className={styles.text}>
          Passionate developer focused on building exceptional digital experiences.
        </p>
      </div>
    </section>
  )
}
