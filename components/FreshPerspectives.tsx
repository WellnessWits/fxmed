'use client'

export default function FreshPerspectives() {
  return (
    <section id="fresh-perspectives" className="bg-[#FCFFF0] py-[90px] px-[5%]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block text-green-mid bg-green-mid/10 px-4 py-1.5 rounded-[20px] text-[0.75rem] font-dm-sans font-semibold tracking-[0.14em] uppercase mb-4">
              Fresh Perspectives
            </div>
            <h2 className="font-dm-sans font-bold text-green-deep text-[clamp(2rem,4vw,3rem)] leading-[1.15] mb-4">
              Health insights you<br/>can act on today
            </h2>
            <p className="font-dm-sans text-text-mid text-[1.05rem] leading-[1.7] mb-8">
              Evidence-based articles from the FXMed team — because informed patients heal faster.
            </p>

            {/* Blog Posts */}
            <div className="space-y-6 mb-8">
              <div className="bg-white rounded-[16px] p-6 border border-green-deep/8 shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="text-2xl mr-4">🩺</div>
                  <div>
                    <h3 className="font-dm-sans font-semibold text-green-deep text-[1.1rem] mb-2">
                      Understanding Your Lab Results
                    </h3>
                    <p className="font-dm-sans text-text-mid text-[0.9rem] leading-[1.6] mb-2">
                      Learn how to interpret your blood work and make informed health decisions based on evidence-based medicine.
                    </p>
                    <div className="text-green-mid text-[0.85rem] font-medium">
                      5 min read
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[16px] p-6 border border-green-deep/8 shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="text-2xl mr-4">💊</div>
                  <div>
                    <h3 className="font-dm-sans font-semibold text-green-deep text-[1.1rem] mb-2">
                      Preventive Care Strategies
                    </h3>
                    <p className="font-dm-sans text-text-mid text-[0.9rem] leading-[1.6] mb-2">
                      Discover proactive approaches to maintain optimal health and prevent chronic conditions before they develop.
                    </p>
                    <div className="text-green-mid text-[0.85rem] font-medium">
                      8 min read
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[16px] p-6 border border-green-deep/8 shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="text-2xl mr-4">🧠</div>
                  <div>
                    <h3 className="font-dm-sans font-semibold text-green-deep text-[1.1rem] mb-2">
                      Nutrition for Mental Wellness
                    </h3>
                    <p className="font-dm-sans text-text-mid text-[0.9rem] leading-[1.6] mb-2">
                      Explore the connection between diet and mental health, with practical tips for improving both through functional nutrition.
                    </p>
                    <div className="text-green-mid text-[0.85rem] font-medium">
                      6 min read
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <a href="/blog" className="font-dm-sans bg-gold text-green-deep px-8 py-4 rounded-[50px] font-semibold text-[1rem] no-underline transition-all hover:bg-gold-light hover:transform hover:translate-y-[-2px] hover:shadow-lg inline-block">
              Read All Articles →
            </a>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="order-first lg:order-last">
            <div className="relative rounded-[20px] overflow-hidden shadow-2xl bg-white min-h-[500px] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🌿</div>
                <h3 className="font-dm-sans font-bold text-green-deep text-[1.5rem] mb-2">
                  Health Articles
                </h3>
                <p className="font-dm-sans text-text-mid text-[1rem]">
                  Expert insights and evidence-based content
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-green-deep/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
