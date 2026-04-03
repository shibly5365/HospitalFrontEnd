import React from "react";

const features = [
  {
    title: "Online Consultation",
    desc: "Secure video calls with specialists from anywhere, without waiting rooms.",
    tone: "from-emerald-500 to-teal-600",
  },
  {
    title: "AI Wellness Reports",
    desc: "Personalized insights from your vitals and visit history for better follow-up.",
    tone: "from-cyan-500 to-blue-600",
  },
  {
    title: "Smart Scheduling",
    desc: "Find available slots faster and receive clear reminders before appointments.",
    tone: "from-amber-500 to-orange-600",
  },
  {
    title: "Medication Tracking",
    desc: "Track prescriptions, refill timelines, and dose reminders in one place.",
    tone: "from-rose-500 to-red-600",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center fade-in-up">
          <h2 className="mb-3 text-3xl font-bold text-[var(--text)] md:text-4xl">
            Powerful features with simple workflows
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[var(--muted)]">
            Everything is designed to reduce user friction and improve healthcare delivery speed.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={`soft-card group rounded-3xl p-6 transition duration-300 hover:-translate-y-1 fade-in-up stagger-${index + 1}`}
            >
              <div
                className={`mb-5 h-2 w-20 rounded-full bg-gradient-to-r ${feature.tone}`}
                aria-hidden
              />
              <h3 className="mb-3 text-xl font-bold text-[var(--text)]">{feature.title}</h3>
              <p className="text-[var(--muted)]">{feature.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
