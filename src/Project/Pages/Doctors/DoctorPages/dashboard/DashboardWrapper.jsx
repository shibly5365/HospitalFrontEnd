const DashboardWrapper = ({ children }) => {
  return (
    <div
      className="
      flex min-h-screen

      bg-[var(--bg)]
      text-[var(--text)]

      transition-all duration-300
    "
    >
      <div
        className="
        flex-1 overflow-auto

        bg-[var(--bg)]

        transition-all duration-300
      "
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardWrapper;
