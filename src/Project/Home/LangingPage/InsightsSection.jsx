import React from "react";

const insights = [
  {
    title: "Video-first consultations",
    desc: "Reduce travel and waiting time with secure virtual visits.",
    tag: "Telemedicine",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
  },
  {
    title: "Specialists on demand",
    desc: "Access verified doctors quickly for common and urgent concerns.",
    tag: "24/7 access",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=500&fit=crop",
  },
  {
    title: "Continuous health tracking",
    desc: "Use data-driven follow-ups to improve treatment outcomes.",
    tag: "Smart monitoring",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=500&fit=crop",
  },
];

const InsightsSection = () => {
  return (
    <section id="insights" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center fade-in-up">
          <h2 className="mb-3 text-3xl font-bold text-[var(--text)] md:text-4xl">Insights for better care decisions</h2>
          <p className="mx-auto max-w-2xl text-lg text-[var(--muted)]">
            Learn how teams and patients are using the platform to improve outcomes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {insights.map((item, index) => (
            <article
              key={item.title}
              className={`soft-card overflow-hidden rounded-3xl fade-in-up stagger-${index + 1}`}
            >
              <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-6">
                <span className="mb-3 inline-flex rounded-full bg-[var(--surface-soft)] px-3 py-1 text-xs font-bold text-[var(--brand)]">
                  {item.tag}
                </span>
                <h3 className="mb-2 text-xl font-bold text-[var(--text)]">{item.title}</h3>
                <p className="text-[var(--muted)]">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
