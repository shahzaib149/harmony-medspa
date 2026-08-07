"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  "I’ve been to a few Med Spas in Sarasota, and Jessica is absolutely the best. She truly cares about providing exceptional service and I am thrilled to have finally found a practitioner I can trust. Her staff is fantastic and I couldn’t be happier with my decision.",
  "I was so pleased with my visit to Harmony Med Spa. Jessica and Haydon could not be more welcoming and professional. I felt an immediate rapport with Jessica. She is very knowledgeable and able to ask probing questions that helped me focus on the results I want to achieve. I highly recommend Harmony Med Spa.",
  "I absolutely love Harmony Med Spa! The staff is friendly, kind, professional and attentive. The ambiance is welcoming and beautiful. Jessica is very knowledgeable and explains everything in detail and honestly. I highly recommend them.",
  "I love detailed attention I get from Jessica on my weight loss journey. I am a 30 year nurse practitioner myself and feels she addresses all of my questions and concerns thoughtfully. I’m down almost 15 pounds. I highly recommend her and her delightful staff.",
  "Absolutely amazing services! The staff is always wonderful and so kind. I was very impressed with Jessica and her team's ability to get to the root cause of issues, which you'll find is a very rare thing these days! They are masters of their craft and show great integrity. For this reason, I would never go anywhere else!",
  "Jessica and her staff are all very professional with a deep knowledge of their respective jobs and many that can fill in other places when needed. I have always been treated like family and their hormone therapy has helped me immensely."
];

export default function LandingTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  return (
    <section className="landing-testimonials" aria-labelledby="landing-testimonial-title">
      <div className="landing-testimonial-heading">
        <h2 id="landing-testimonial-title">what our<br />patients say</h2>
        <p className="landing-kicker">Subheading Here</p>
        <div className="landing-testimonial-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous testimonial"><ChevronLeft /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next testimonial"><ChevronRight /></button>
        </div>
      </div>
      <div className="landing-testimonial-quote" aria-live="polite">
        <span className="landing-open-quote" aria-hidden="true">“</span>
        <blockquote>{testimonials[activeIndex]}</blockquote>
        <span className="landing-close-quote" aria-hidden="true">”</span>
        <div className="landing-stars" aria-label="Five star review">★★★★★</div>
        <p className="landing-reviewer">Ariel F.</p>
      </div>
    </section>
  );
}
