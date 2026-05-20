import { NextResponse } from "next/server";
import { simulationController } from "@/backend/controllers/simulationController";

export async function GET() {
  const simulations = await simulationController.getSimulations();
  return NextResponse.json(simulations);
}
