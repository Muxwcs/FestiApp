interface SectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

const Section = ({ title, description, children }: SectionProps) => {
  return (
    <section className="py-4 max-w-6xl animate-in slide-in-from-bottom duration-300">
      <div className="bg-linear-to-b from-flDarkBlue to-flDarkBlue/20 backdrop-blur-3xl rounded-xl p-2 sm:p-6">
        <h2 className="text-lg font-bold mb-6 text-flYellow">{title}</h2>
        {description && <p className="text-white/80 mb-6">{description}</p>}
        {children}
      </div>
    </section>
  )
}

export default Section