import { Metadata } from "next";
import SimulationsList from "./SimulationsList";

export const metadata: Metadata = {
  title: "Simulation Lab — ENT Flow Learn",
};

export default function Page() {
  return <SimulationsList />;
}
