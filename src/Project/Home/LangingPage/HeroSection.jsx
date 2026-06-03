import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="fade-in-up text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
          <p className="mb-6 inline-flex rounded-full bg-[var(--surface-soft)] px-5 py-2 text-sm font-semibold tracking-wide text-[var(--brand)]">
            Smart care. Faster recovery.
          </p>
          <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
            Modern Healthcare Solutions for Patients & Doctors
          </h1>
          <p className="mb-10 max-w-lg mx-auto lg:mx-0 text-base sm:text-lg leading-8 text-[var(--muted)]">
            Schedule appointments, attend secure video consultations, access digital prescriptions, and stay connected with your healthcare team—all from one seamless platform.
          </p>

          <div className="mb-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => navigate("/signup")}
              className="rounded-xl bg-[var(--brand)] px-8 py-4 text-base font-semibold text-white transition hover:bg-[var(--brand-dark)]"
            >
              Get Started
            </button>
            <a
              href="#features"
              className="rounded-xl border border-[var(--line)] bg-white px-8 py-4 text-center text-base font-semibold text-[var(--text)] transition hover:bg-[var(--surface-soft)]"
            >
              Explore Features
            </a>
          </div>

          <div className="grid max-w-xl gap-4 sm:grid-cols-3 text-center">
            <div className="soft-card rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300">
              <p className="text-2xl font-extrabold text-[var(--text)]">10k+</p>
              <p className="text-sm text-[var(--muted)]">Consultations</p>
            </div>
            <div className="soft-card rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300">
              <p className="text-2xl font-extrabold text-[var(--text)]">4.9/5</p>
              <p className="text-sm text-[var(--muted)]">Patient rating</p>
            </div>
            <div className="soft-card rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300">
              <p className="text-2xl font-extrabold text-[var(--text)]">24/7</p>
              <p className="text-sm text-[var(--muted)]">Care access</p>
            </div>
          </div>
        </div>

        <div className="relative fade-in-up stagger-1">
          <div className="soft-card relative overflow-hidden rounded-3xl p-3 sm:p-4">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&h=700&fit=crop&crop=faces"
              alt="Doctor using tablet in clinic"
              className="h-[380px] w-full rounded-2xl object-cover sm:h-[460px]"
            />
          </div>

          <div className="soft-card absolute -left-4 top-8 w-60 rounded-2xl p-4 sm:-left-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Live consultation
            </p>
            <div className="mb-2 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop&q=80"
                alt="Doctor profile"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">Dr. Sarah Johnson</p>
                <p className="text-xs text-[var(--muted)]">Cardiology</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--brand)]">
              <span className="h-2 w-2 rounded-full bg-[var(--brand)]"></span>
              <span>Video call active now</span>
            </div>
          </div>

          <div className="soft-card absolute -bottom-6 right-2 w-56 rounded-2xl p-4 sm:-right-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Weekly summary
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)]">Appointments</span>
                <span className="font-bold text-[var(--text)]">+128</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)]">Recovered cases</span>
                <span className="font-bold text-[var(--text)]">+94</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)]">Satisfaction</span>
                <span className="font-bold text-[var(--text)]">98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
