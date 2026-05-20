import { NextResponse } from "next/server";
import { courseController } from "@/backend/controllers/courseController";

export async function GET() {
  const courses = await courseController.getCourses();
  return NextResponse.json(courses);
}
