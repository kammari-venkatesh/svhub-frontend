import './SectionHeader.css'

function SectionHeader({ eyebrow, title, copy, align = 'left', light = false }) {
  return (
    <header className={`section-header section-header--${align}${light ? ' section-header--light' : ''}`}>
      {eyebrow && <p className="section-header__eyebrow">{eyebrow}</p>}
      {title && <h2 className="section-header__title">{title}</h2>}
      {copy && <p className="section-header__copy">{copy}</p>}
    </header>
  )
}

export default SectionHeader
