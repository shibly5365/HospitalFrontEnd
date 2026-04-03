import React from "react";
import { MdLocalHospital } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="glass-surface mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-xl font-bold text-[var(--text)]"
        >
          <MdLocalHospital className="mr-2 text-[var(--brand)]" size={28} />
          MediCare Pro
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="font-semibold text-[var(--muted)] hover:text-[var(--brand)]">
            Features
          </a>
          <a href="#community" className="font-semibold text-[var(--muted)] hover:text-[var(--brand)]">
            Community
          </a>
          <a href="#insights" className="font-semibold text-[var(--muted)] hover:text-[var(--brand)]">
            Insights
          </a>
          <a href="#contact" className="font-semibold text-[var(--muted)] hover:text-[var(--brand)]">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => navigate("/login")}
            className="rounded-xl px-3 py-2 font-semibold text-[var(--muted)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--brand)]"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="rounded-xl bg-[var(--brand)] px-4 py-2 font-semibold text-white transition hover:bg-[var(--brand-dark)] sm:px-5"
          >
            Book Appointment
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
