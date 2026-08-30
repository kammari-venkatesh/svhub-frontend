import { stats } from '../../data/home.js'
import Reveal from '../../components/ui/Reveal.jsx'
import './StatsStrip.css'

function StatsStrip() {
  return (
    <section className="home-section home-section--strip home-section--white stats-section" aria-label="SV Hub at a glance">
      <div className="home-container">
        <Reveal className="home-stagger stats" as="div">
          {stats.map((stat) => (
            <article key={stat.label} className="stats__item">
              <p className="stats__value">{stat.value}</p>
              <p className="stats__label">
                {stat.label}
                {stat.dummy ? <span className="sr-only"> Placeholder statistic for V1</span> : null}
              </p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export default StatsStrip
