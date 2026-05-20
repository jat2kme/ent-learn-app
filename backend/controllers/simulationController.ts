import { SIMULATIONS } from "../mock-data";

export const simulationController = {
  getSimulations: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return SIMULATIONS;
  },
  getSimulationById: async (id: string) => {
    return SIMULATIONS.find((s) => s.id === id);
  }
};
