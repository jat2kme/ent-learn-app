import { Metadata } from "next";
import { COURSES } from "@/backend/mock-data";
import CoursePlayer from "./CoursePlayer";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: `${course.title} — ENT Flow Learn`,
    description: course.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  return <CoursePlayer />;
}
