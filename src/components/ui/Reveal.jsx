import { useInView } from '../../hooks/useInView.js'

function Reveal({ as: Tag = 'div', className = '', delay, children, ...props }) {
  const { ref, visible } = useInView()

  return (
    <Tag
      ref={ref}
      className={`home-reveal${visible ? ' is-in' : ''} ${className}`.trim()}
      data-delay={delay || undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Reveal
