export const canTransition = (role, from, to) => {
  const transitions = {
    ADMIN: {
      PENDING: ["PRICED", "CANCELLED"],
      PRICED: ["CANCELLED"],
      ACCEPTED: ["ASSIGNED", "CANCELLED"],
      ASSIGNED: ["CANCELLED"],
      IN_PROGRESS: ["CANCELLED"],
    },

    USER: {
      PENDING: ["CANCELLED"],
      PRICED: ["ACCEPTED", "CANCELLED"],
    },

    RUNNER: {
      ASSIGNED: ["IN_PROGRESS"],
      IN_PROGRESS: ["COMPLETED"],
    },
  };

  return transitions[role]?.[from]?.includes(to);
};
