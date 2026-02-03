import styles from './Contact.module.css'

export const Contact = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Get In Touch</h2>
      <p className={styles.description}>
        Feel free to reach out for collaborations or just a friendly chat.
      </p>
      <div className={styles.links}>
        <a href="mailto:contact@example.com" className={styles.link}>
          Email
        </a>
        <a href="https://github.com" className={styles.link} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://linkedin.com" className={styles.link} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  )
}
