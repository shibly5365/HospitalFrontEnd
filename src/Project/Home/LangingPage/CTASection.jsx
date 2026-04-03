import React from "react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-[var(--brand)] to-[#0f6d8f] px-6 py-14 text-center text-white sm:px-10">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Ready to improve your healthcare experience?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
          Create your account and start booking smarter appointments in minutes.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => navigate("/signup")}
            className="rounded-xl bg-white px-8 py-4 font-semibold text-[var(--brand)] transition hover:bg-slate-100"
          >
            Join Now
          </button>
          <button
            onClick={() => navigate("/login")}
            className="rounded-xl border border-white/50 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            Already Have an Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
