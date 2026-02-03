import { WelcomeBanner } from './components/WelcomeBanner/WelcomeBanner'
import { Presentation } from './components/Presentation/Presentation'
import { TechPool } from './components/TechPool/TechPool'
import { Contact } from './components/Contact/Contact'
import styles from './App.module.css'

export const App = () => {
  return (
    <main className={styles.container}>
      <WelcomeBanner />
      <Presentation />
      <TechPool />
      <Contact />
    </main>
  )
}
