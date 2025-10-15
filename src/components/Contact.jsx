function Contact() {
  return (
    <section className="py-20 bg-body-bg" id="contact">
      <div className="max-w-[1200px] mx-auto px-5">
        <h2 className="text-center text-4xl mb-5 text-primary font-bold">Get In Touch</h2>
        <p className="text-center text-xl text-gray-600 mb-16 max-w-[600px] mx-auto">
          Ready to place an order or have questions? Give us a call or send a text today!
        </p>

        <div className="mt-12">
          {/* Phone Number Card - Full Width on Top */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gradient-to-br from-primary to-[#3d7a3e] text-white p-12 rounded-xl text-center shadow-md transition-all hover:-translate-y-1 hover:shadow-2xl">
              <div className="text-6xl mb-4">📞</div>
              <h3 className="text-white text-3xl mb-4 font-bold">Call or Text Us</h3>
              <p className="text-white text-4xl font-bold my-6 tracking-wide">(253) 313-8107</p>
              <p className="text-white text-xl mb-4 font-medium">Monday - Friday: 7am - 6pm</p>
              <p className="text-white/90 text-base italic">We respond to texts within the hour during business hours</p>
            </div>
          </div>

          {/* Other Info Cards - Grid Below */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl text-center shadow-md transition-all hover:-translate-y-1 hover:shadow-2xl border border-accent/20">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-primary text-xl mb-4 font-bold">Service Area</h3>
              <p className="text-gray-600 leading-relaxed">Serving farms and ranches<br />across Kitsap and Mason Counties</p>
            </div>

            <div className="bg-white p-8 rounded-xl text-center shadow-md transition-all hover:-translate-y-1 hover:shadow-2xl border border-accent/20">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-primary text-xl mb-4 font-bold">Payment</h3>
              <p className="text-gray-600 leading-relaxed">We accept all major payment methods through Pay Anywhere</p>
            </div>

            <div className="bg-white p-8 rounded-xl text-center shadow-md transition-all hover:-translate-y-1 hover:shadow-2xl border border-accent/20">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-primary text-xl mb-4 font-bold">Delivery</h3>
              <p className="text-gray-600 leading-relaxed">Monday, Wednesday, and Friday<br />delivery options available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
