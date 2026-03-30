'use client'

import HealthQuiz from './HealthQuiz'

export default function QuizSection() {
  return (
    <section id="quiz" className="bg-white py-[90px] px-[5%]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block text-green-mid bg-green-mid/10 px-4 py-1.5 rounded-[20px] text-[0.75rem] font-semibold tracking-[0.14em] uppercase mb-4">
            Health Assessment
          </div>
          <h2 className="font-dm-sans font-bold text-green-deep text-[clamp(2rem,4vw,3rem)] leading-[1.15] mb-4">
            Discover your<br/>health priority
          </h2>
          <p className="font-dm-sans text-black text-[1.05rem] leading-[1.7] max-w-[560px] mx-auto">
            Answer 5 quick questions to find out which FXMed program is right for you — and book a free discovery call.
          </p>
        </div>

        {/* Quiz Component */}
        <HealthQuiz />
      </div>
    </section>
  )
}
