import React, { useState } from "react";
import { MdLocalHospital } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToHero = () => {
    document.getElementById("hero")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="glass-surface mx-auto max-w-7xl rounded-2xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={scrollToHero}
            className="flex items-center text-xl font-bold text-[var(--text)]"
          >
            <MdLocalHospital
              className="mr-2 text-[var(--brand)]"
              size={28}
            />
            MediCare Pro
          </button>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="font-semibold text-[var(--muted)] transition hover:text-[var(--brand)]"
            >
              Features
            </a>

            <a
              href="#community"
              className="font-semibold text-[var(--muted)] transition hover:text-[var(--brand)]"
            >
              Community
            </a>

            <a
              href="#insights"
              className="font-semibold text-[var(--muted)] transition hover:text-[var(--brand)]"
            >
              Insights
            </a>

            <a
              href="#contact"
              className="font-semibold text-[var(--muted)] transition hover:text-[var(--brand)]"
            >
              Contact
            </a>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={() => navigate("/login")}
              className="rounded-xl px-4 py-2 font-semibold text-[var(--muted)] transition hover:bg-[var(--surface-soft)] hover:text-[var(--brand)]"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="rounded-xl bg-[var(--brand)] px-5 py-2 font-semibold text-white transition hover:bg-[var(--brand-dark)]"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <HiX size={28} />
            ) : (
              <HiMenu size={28} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 border-t border-[var(--line)] pt-4 md:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                className="font-semibold text-[var(--muted)]"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>

              <a
                href="#community"
                className="font-semibold text-[var(--muted)]"
                onClick={() => setIsOpen(false)}
              >
                Community
              </a>

              <a
                href="#insights"
                className="font-semibold text-[var(--muted)]"
                onClick={() => setIsOpen(false)}
              >
                Insights
              </a>

              <a
                href="#contact"
                className="font-semibold text-[var(--muted)]"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>

              <button
                onClick={() => navigate("/login")}
                className="rounded-xl border border-[var(--line)] py-3 font-semibold"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="rounded-xl bg-[var(--brand)] py-3 font-semibold text-white"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;