import { COURSES } from "../mock-data";

export const courseController = {
  getCourses: async () => {
    // Simulate DB delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return COURSES;
  },
  getCourseBySlug: async (slug: string) => {
    return COURSES.find((c) => c.slug === slug);
  }
};
