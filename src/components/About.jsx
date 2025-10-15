function About() {
  const services = [
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Deliveries made Monday, Wednesday, and Friday for your convenience.'
    },
    {
      icon: '🌾',
      title: 'X-CEL Feeds',
      description: 'Quality grains and feed available from X-CEL Feeds Inc.'
    },
    {
      icon: '💰',
      title: 'Competitive Pricing',
      description: 'Best prices in the region with flexible payment options through Pay Anywhere.'
    },
  ]

  return (
    <section className="py-20 bg-body-bg" id="about">
      <div className="max-w-[1200px] mx-auto px-5">
        <h2 className="text-center text-4xl mb-5 text-primary font-bold">Why Choose Redneck Feeds?</h2>
        <p className="text-center text-xl text-gray-600 mb-16 max-w-[600px] mx-auto">
          We're committed to providing exceptional service and quality products to support your agricultural needs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="p-10 rounded-xl text-center transition-all shadow-md hover:-translate-y-2 hover:shadow-xl border border-accent/20 bg-white">
              <div className="text-6xl mb-6">{service.icon}</div>
              <h3 className="text-2xl mb-4 text-primary font-bold">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
