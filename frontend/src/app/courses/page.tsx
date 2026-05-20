import { Metadata } from "next";
import CoursesList from "./CoursesList";

export const metadata: Metadata = {
  title: "Courses — ENT Flow Learn",
};

export default function Page() {
  return <CoursesList />;
}
