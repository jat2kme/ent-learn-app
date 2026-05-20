export type Role = "student" | "instructor" | "admin";

export type Course = {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  durationHours: number;
  lessons: number;
  rating: number;
  students: number;
  instructor: string;
  price: number;
  thumbnail: string;
  modules: {
    title: string;
    lessons: { title: string; duration: string; type: "video" | "quiz" | "lab" }[];
  }[];
  progress?: number;
};

export type Simulation = {
  id: string;
  title: string;
  type: "Airflow 2D" | "Heat Transfer" | "Pipe Flow" | "Airfoil";
  status: "ready" | "running" | "completed" | "diverged";
  solver: "OpenFOAM" | "Fluent" | "SimScale";
  meshCells: number;
  iterations: number;
  residual: number;
  thumbnail: string;
  description: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  team: string[];
  updated: string;
  status: "active" | "shared" | "archived";
  files: number;
};

export type Certificate = {
  id: string;
  courseTitle: string;
  issued: string;
  credentialId: string;
  level: string;
};

export type ForumThread = {
  id: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  tag: string;
  lastActivity: string;
};

export type AIMessage = { role: "user" | "assistant"; content: string };
