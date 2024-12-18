const generateRoster = (role) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const assignedDays = role === 'full-staff'
    ? pickRandomDays(days, 2)
    : pickRandomDays(days, 3);

  return assignedDays;
};

const pickRandomDays = (days, count) => {
  
  const shuffled = [...days].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

module.exports = generateRoster;



