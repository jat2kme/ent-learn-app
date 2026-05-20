import { Metadata } from "next";
import { SIMULATIONS } from "@/backend/mock-data";
import SimLab from "./SimLab";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const sim = SIMULATIONS.find((s) => s.id === id);

  if (!sim) {
    return {
      title: "Simulation Not Found",
    };
  }

  return {
    title: `${sim.title} — ENT Flow Learn`,
    description: sim.description,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const sim = SIMULATIONS.find((s) => s.id === id);

  if (!sim) {
    notFound();
  }

  return <SimLab />;
}
