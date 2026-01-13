// Generate time options (15 min intervals for more precision)
export const generateTimeOptions = () => {
  const times = [];
  for (let h = 6; h <= 22; h++) {
    for (let m of [0, 15, 30, 45]) {
      const hour = h.toString().padStart(2, "0");
      const minute = m.toString().padStart(2, "0");
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
};