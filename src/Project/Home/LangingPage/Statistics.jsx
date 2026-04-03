import React from "react";

const stats = [
  {
    value: "10k+",
    title: "Appointments",
    desc: "Successful consultations completed every month",
  },
  {
    value: "12k+",
    title: "Happy Patients",
    desc: "Patients trust us for fast and reliable care",
  },
  {
    value: "15+",
    title: "Years Experience",
    desc: "Healthcare excellence backed by expert teams",
  },
];

const Statistics = () => {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center fade-in-up">
          <h2 className="mb-3 text-3xl font-bold text-[var(--text)] md:text-4xl">Trusted by patients across the region</h2>
          <p className="mx-auto max-w-2xl text-lg text-[var(--muted)]">
            Real usage numbers that reflect strong care quality and smooth digital experience.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {stats.map((item, index) => (
            <article
              key={item.title}
              className={`soft-card rounded-3xl p-7 transition hover:-translate-y-1 hover:shadow-2xl fade-in-up stagger-${index + 1}`}
            >
              <p className="mb-3 text-4xl font-extrabold text-[var(--text)]">{item.value}</p>
              <h3 className="mb-2 text-xl font-bold text-[var(--text)]">{item.title}</h3>
              <p className="text-[var(--muted)]">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
