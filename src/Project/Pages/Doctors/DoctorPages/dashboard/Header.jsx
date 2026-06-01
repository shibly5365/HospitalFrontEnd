import React, { useState, useEffect } from "react";

import {
  Sun,
  Moon,
  Bell,
  Menu,
  Search,
  FileText,
  User,
  Pill,
} from "lucide-react";

import { useTheme } from "../../../../../context/ThemeContext";

const Header = ({ setShowMobileMenu }) => {
  const [showNotification, setShowNotification] = useState(false);

  const [currentTime, setCurrentTime] = useState("");

  const { doctorTheme, setDoctorTheme } = useTheme();

  const darkMode = doctorTheme === "dark";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const notifications = [
    {
      id: 1,
      title: "Lab results ready",
      time: "5 min ago",
      patient: "Priya Menon",
      icon: FileText,
    },

    {
      id: 2,
      title: "Patient checked in",
      time: "12 min ago",
      patient: "Rajesh Kumar",
      icon: User,
    },

    {
      id: 3,
      title: "Prescription renewed",
      time: "1 hour ago",
      patient: "Anita Desai",
      icon: Pill,
    },
  ];

  return (
    <div
      className="
      sticky top-0 z-20
      glass-surface
      border-b border-[var(--line)]
    "
    >
      <div
        className="
        h-16 px-4 md:px-8
        flex items-center justify-between
      "
      >
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowMobileMenu(true)}
            className="
            lg:hidden
            p-2 rounded-xl
            hover:bg-[var(--surface-soft)]
            transition-colors
          "
          >
            <Menu size={22} className="text-[var(--text)]" />
          </button>

          <h1
            className="
            text-2xl font-semibold
            hidden lg:block
            text-[var(--text)]
          "
          >
            Dashboard
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* SEARCH */}
          <div
            className="
            hidden md:flex
            items-center gap-2
            px-4 py-2
            bg-[var(--surface-soft)]
            rounded-full
          "
          >
            <Search size={18} className="text-[var(--muted)]" />

            <input
              type="text"
              placeholder="Search patients..."
              className="
              bg-transparent
              text-sm
              text-[var(--text)]
              placeholder:text-[var(--muted)]
              outline-none
              w-48
            "
            />
          </div>

          {/* DATE */}
          <div
            className="
            text-sm font-medium
            hidden md:block
            text-[var(--muted)]
          "
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}{" "}
            • {currentTime}
          </div>

          {/* THEME BUTTON */}
          <button
            onClick={() => setDoctorTheme(darkMode ? "light" : "dark")}
            className="
            p-2 rounded-xl
            hover:bg-[var(--surface-soft)]
            transition-colors
          "
          >
            {darkMode ? (
              <Sun size={20} className="text-[var(--text)]" />
            ) : (
              <Moon size={20} className="text-[var(--text)]" />
            )}
          </button>

          {/* NOTIFICATION */}
          <div className="relative">
            <button
              onClick={() => setShowNotification(!showNotification)}
              className="
              p-2 rounded-xl
              hover:bg-[var(--surface-soft)]
              transition-colors
              relative
            "
            >
              <Bell size={20} className="text-[var(--text)]" />

              <span
                className="
                absolute top-1 right-1
                w-4 h-4
                bg-red-500
                rounded-full
                flex items-center justify-center
                text-[10px] text-white
              "
              >
                3
              </span>
            </button>

            {/* DROPDOWN */}
            {showNotification && (
              <div
                className="
                absolute right-0 mt-2
                w-80
                bg-[var(--surface)]
                border border-[var(--line)]
                rounded-2xl
                shadow-xl
                py-3
                z-50
              "
              >
                <div
                  className="
                  px-5 pb-3
                  border-b border-[var(--line)]
                  font-medium
                  text-[var(--text)]
                "
                >
                  Notifications
                </div>

                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="
                      px-5 py-3
                      hover:bg-[var(--surface-soft)]
                      flex gap-3
                      text-sm
                      border-b border-[var(--line)]
                      last:border-none
                    "
                  >
                    <div className="mt-0.5">
                      <notif.icon size={18} className="text-[var(--brand)]" />
                    </div>

                    <div>
                      <p className="text-[var(--text)]">{notif.title}</p>

                      <p
                        className="
                          text-xs
                          text-[var(--muted)]
                        "
                      >
                        {notif.patient} • {notif.time}
                      </p>
                    </div>
                  </div>
                ))}

                <div
                  className="
                  px-5 pt-3
                  text-center
                  text-sm font-medium
                  text-[var(--brand)]
                  cursor-pointer
                  hover:underline
                "
                >
                  View All
                </div>
              </div>
            )}
          </div>

          {/* PROFILE */}
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop"
            className="
            w-9 h-9
            rounded-full
            object-cover
            ring-2 ring-[var(--brand)]/20
          "
            alt="Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
