'use client'

export default function PatientStories() {
  return (
    <section id="patient-stories" className="bg-cream py-[90px] px-[5%]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block text-green-mid bg-green-mid/10 px-4 py-1.5 rounded-[20px] text-[0.75rem] font-dm-sans font-semibold tracking-[0.14em] uppercase mb-4">
            Patient Stories
          </div>
          <h2 className="font-dm-sans font-bold text-green-deep text-[clamp(2rem,4vw,3rem)] leading-[1.15] mb-4">
            Real people, real results
          </h2>
          <p className="font-dm-sans text-text-mid text-[1.05rem] leading-[1.7] max-w-[600px] mx-auto">
            Authentic experiences from patients who've transformed their health with FXMed's personalized care.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Norma R. Story */}
          <div className="bg-white rounded-[20px] p-8 border border-green-deep/10 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div 
                className="flex items-center justify-center text-green-deep font-bold flex-shrink-0 mb-4"
                style={{
                  width: '56px',
                  height: '56px',
                  aspectRatio: '1/1',
                  borderRadius: '50%',
                  backgroundColor: 'rgb(251 191 36 / 0.2)',
                  minWidth: '56px',
                  maxWidth: '56px',
                  minHeight: '56px',
                  maxHeight: '56px',
                  display: 'flex'
                }}
              >
                N
              </div>
              <div>
                <h3 className="font-dm-sans font-bold text-green-deep text-[1.3rem] mb-3">
                  Norma R.
                </h3>
                <div className="flex items-center justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-gold text-xl">★</span>
                  ))}
                </div>
                <p className="font-dm-sans text-text-mid text-[0.95rem] leading-[1.6] italic">
                  "Dr. Kike was very thorough in analyzing my health profile and educating me on how certain factors contribute to my symptoms. She really took the time to sit and discuss with me in a personalized way that was easy to understand. You can tell she is passionate about what she does."
                </p>
              </div>
            </div>
          </div>

          {/* Ife Folawiyo Story */}
          <div className="bg-white rounded-[20px] p-8 border border-green-deep/10 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div 
                className="flex items-center justify-center text-green-deep font-bold flex-shrink-0 mb-4"
                style={{
                  width: '56px',
                  height: '56px',
                  aspectRatio: '1/1',
                  borderRadius: '50%',
                  backgroundColor: 'rgb(251 191 36 / 0.2)',
                  minWidth: '56px',
                  maxWidth: '56px',
                  minHeight: '56px',
                  maxHeight: '56px',
                  display: 'flex'
                }}
              >
                I
              </div>
              <div>
                <h3 className="font-dm-sans font-bold text-green-deep text-[1.3rem] mb-3">
                  Ife Folawiyo
                </h3>
                <div className="flex items-center justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-gold text-xl">★</span>
                  ))}
                </div>
                <p className="font-dm-sans text-text-mid text-[0.95rem] leading-[1.6] italic">
                  "As a mother of two, I find myself neglecting my body. With FXMed I am given the education I needed plans and the coaching. I always feel more motivated each time I talk with any of the staff."
                </p>
              </div>
            </div>
          </div>

          {/* Adaeze M. Story */}
          <div className="bg-white rounded-[20px] p-8 border border-green-deep/10 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div 
                className="flex items-center justify-center text-green-deep font-bold flex-shrink-0 mb-4"
                style={{
                  width: '56px',
                  height: '56px',
                  aspectRatio: '1/1',
                  borderRadius: '50%',
                  backgroundColor: 'rgb(251 191 36 / 0.2)',
                  minWidth: '56px',
                  maxWidth: '56px',
                  minHeight: '56px',
                  maxHeight: '56px',
                  display: 'flex'
                }}
              >
                A
              </div>
              <div>
                <h3 className="font-dm-sans font-bold text-green-deep text-[1.3rem] mb-3">
                  Adaeze M.
                </h3>
                <div className="flex items-center justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-gold text-xl">★</span>
                  ))}
                </div>
                <p className="font-dm-sans text-text-mid text-[0.95rem] leading-[1.6] italic">
                  "I had been going from doctor to doctor for years with no real answers. FXMed's functional approach finally identified the root cause of my fatigue. Within 3 months on the Adrenal Reset program, I felt like a completely different person. Life-changing doesn't begin to cover it."
                </p>
              </div>
            </div>
          </div>
        </div>

              </div>
    </section>
  )
}
