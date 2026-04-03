import React from "react";

const CommunitySection = () => {
  return (
    <section id="community" className="px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
        <div className="soft-card fade-in-up rounded-3xl p-8 lg:col-span-2">
          <p className="mb-4 text-sm font-bold uppercase tracking-wide text-[var(--brand)]">Patient stories</p>
          <h2 className="mb-4 text-3xl font-bold text-[var(--text)] md:text-4xl">
            "Appointments are faster, and every doctor visit feels organized."
          </h2>
          <p className="mb-8 text-lg text-[var(--muted)]">
            Patients now manage prescriptions, reports, and follow-ups without confusion. The result is fewer missed appointments and better treatment continuity.
          </p>
          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Patient profile"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="font-bold text-[var(--text)]">Jane Doe</p>
              <p className="text-sm text-[var(--muted)]">Patient, 2 years with MediCare Pro</p>
            </div>
          </div>
        </div>

        <div className="soft-card fade-in-up stagger-1 rounded-3xl p-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[var(--brand)]">Community impact</p>
          <p className="mb-4 text-5xl font-extrabold text-[var(--text)]">2,300+</p>
          <p className="mb-5 text-[var(--muted)]">Active users rely on the platform every week.</p>
          <div className="mb-6 flex -space-x-2">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Community member" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Community member" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
            <img src="https://randomuser.me/api/portraits/men/23.jpg" alt="Community member" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
            <img src="https://randomuser.me/api/portraits/women/72.jpg" alt="Community member" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
          </div>
          <button className="w-full rounded-xl bg-[var(--brand)] px-4 py-3 font-semibold text-white transition hover:bg-[var(--brand-dark)]">
            Join Community
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
