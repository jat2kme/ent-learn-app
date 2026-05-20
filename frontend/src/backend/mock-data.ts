// Centralized mock data for ENT Flow Learn (no real DB)

import { Role, Course, Simulation, Project, Certificate, ForumThread, AIMessage } from "./types";

export const COURSES: Course[] = [
  {
    id: "c1", slug: "intro-to-cfd", title: "Introduction to CFD",
    description: "Foundations of computational fluid dynamics — governing equations, discretisation, and your first solver run.",
    level: "Beginner", category: "Fundamentals", durationHours: 8, lessons: 24, rating: 4.8, students: 12420,
    instructor: "Dr. Anika Rao", price: 0, thumbnail: "🌊", progress: 62,
    modules: [
      { title: "What is CFD?", lessons: [
        { title: "History & applications", duration: "12:30", type: "video" },
        { title: "Continuum hypothesis", duration: "08:45", type: "video" },
        { title: "Module 1 quiz", duration: "10 q", type: "quiz" },
      ]},
      { title: "Governing Equations", lessons: [
        { title: "Conservation of mass", duration: "15:20", type: "video" },
        { title: "Navier–Stokes derivation", duration: "22:10", type: "video" },
        { title: "Lab: 2D channel flow", duration: "30 min", type: "lab" },
      ]},
      { title: "Discretisation", lessons: [
        { title: "Finite volume method", duration: "18:00", type: "video" },
        { title: "Boundary conditions", duration: "14:25", type: "video" },
      ]},
    ],
  },
  {
    id: "c2", slug: "fluid-mechanics-basics", title: "Fluid Mechanics Basics",
    description: "Continuum, viscosity, Reynolds number, and the dimensionless groups every CFD engineer must know.",
    level: "Beginner", category: "Fundamentals", durationHours: 6, lessons: 18, rating: 4.7, students: 8930,
    instructor: "Prof. Marc Lefevre", price: 0, thumbnail: "💧", progress: 100,
    modules: [{ title: "Properties of fluids", lessons: [{ title: "Viscosity", duration: "10:00", type: "video" }] }],
  },
  {
    id: "c3", slug: "meshing-fundamentals", title: "Meshing Fundamentals",
    description: "Structured vs unstructured grids, quality metrics, boundary layer resolution and y+.",
    level: "Beginner", category: "Pre-processing", durationHours: 7, lessons: 20, rating: 4.9, students: 6710,
    instructor: "Dr. Yara Haddad", price: 29, thumbnail: "🔷", progress: 24,
    modules: [{ title: "Grid types", lessons: [{ title: "Hexahedral vs tetrahedral", duration: "16:20", type: "video" }] }],
  },
  {
    id: "c4", slug: "turbulence-modeling", title: "Turbulence Modeling",
    description: "RANS, LES and DNS — when to use each, plus k-ε, k-ω SST and Reynolds-stress models.",
    level: "Intermediate", category: "Physics", durationHours: 12, lessons: 32, rating: 4.9, students: 4520,
    instructor: "Dr. Hiroshi Tanaka", price: 49, thumbnail: "🌀",
    modules: [{ title: "RANS family", lessons: [{ title: "k-omega SST", duration: "24:00", type: "video" }] }],
  },
  {
    id: "c5", slug: "heat-transfer-simulations", title: "Heat Transfer Simulations",
    description: "Conduction, convection and radiation in CFD with conjugate heat-transfer workflows.",
    level: "Intermediate", category: "Physics", durationHours: 10, lessons: 28, rating: 4.7, students: 3980,
    instructor: "Dr. Anika Rao", price: 49, thumbnail: "🔥",
    modules: [{ title: "Conjugate HT", lessons: [{ title: "Heat sink workflow", duration: "28:15", type: "lab" }] }],
  },
  {
    id: "c6", slug: "aerodynamics-analysis", title: "Aerodynamics Analysis",
    description: "External aero of airfoils, wings and vehicles, including drag decomposition.",
    level: "Intermediate", category: "Applications", durationHours: 11, lessons: 26, rating: 4.8, students: 5210,
    instructor: "Prof. Marc Lefevre", price: 49, thumbnail: "✈️",
    modules: [{ title: "Airfoils", lessons: [{ title: "NACA 0012 study", duration: "32:00", type: "lab" }] }],
  },
  {
    id: "c7", slug: "multiphase-flow", title: "Multiphase Flow",
    description: "VOF, Eulerian and Lagrangian approaches for free-surface, sprays and slurries.",
    level: "Advanced", category: "Physics", durationHours: 14, lessons: 36, rating: 4.6, students: 1820,
    instructor: "Dr. Yara Haddad", price: 79, thumbnail: "🫧",
    modules: [{ title: "VOF", lessons: [{ title: "Dam break", duration: "40:00", type: "lab" }] }],
  },
  {
    id: "c8", slug: "compressible-flow", title: "Compressible Flow",
    description: "Shocks, expansion fans and density-based solvers for transonic and supersonic regimes.",
    level: "Advanced", category: "Physics", durationHours: 12, lessons: 30, rating: 4.8, students: 1450,
    instructor: "Dr. Hiroshi Tanaka", price: 79, thumbnail: "💥",
    modules: [{ title: "Shocks", lessons: [{ title: "Bow shock simulation", duration: "35:00", type: "lab" }] }],
  },
];


export const SIMULATIONS: Simulation[] = [
  { id: "s1", title: "2D Channel Flow — Re 1000", type: "Airflow 2D", status: "ready", solver: "OpenFOAM",
    meshCells: 12000, iterations: 0, residual: 1, thumbnail: "📈",
    description: "Laminar incompressible flow between parallel plates. Validate against analytical Poiseuille profile." },
  { id: "s2", title: "Heated Cylinder in Cross-flow", type: "Heat Transfer", status: "completed", solver: "OpenFOAM",
    meshCells: 84500, iterations: 2400, residual: 1.2e-5, thumbnail: "🔥",
    description: "Conjugate heat transfer around a heated cylinder. Examine Nusselt distribution." },
  { id: "s3", title: "Pipe Flow — Turbulent Re 50k", type: "Pipe Flow", status: "running", solver: "Fluent",
    meshCells: 320000, iterations: 1380, residual: 8.4e-4, thumbnail: "🟦",
    description: "Fully developed turbulent flow in a circular pipe with k-ω SST." },
  { id: "s4", title: "NACA 0012 — α 5°", type: "Airfoil", status: "ready", solver: "SimScale",
    meshCells: 210000, iterations: 0, residual: 1, thumbnail: "✈️",
    description: "External aero around a classic airfoil. Compute Cl, Cd and Cp distribution." },
];


export const PROJECTS: Project[] = [
  { id: "p1", name: "EV Battery Cooling Pack", description: "Conjugate heat-transfer of a 21700 module under 2C discharge.", team: ["You", "Hannah K.", "Diego M."], updated: "2 hours ago", status: "active", files: 14 },
  { id: "p2", name: "Drone Propeller Optimisation", description: "Parametric sweep across pitch and chord for max thrust/W.", team: ["You"], updated: "yesterday", status: "active", files: 9 },
  { id: "p3", name: "HVAC Diffuser Study", description: "Comfort and draft risk in a 40 m² office bay.", team: ["You", "Lab 4"], updated: "3 days ago", status: "shared", files: 22 },
];


export const CERTIFICATES: Certificate[] = [
  { id: "cert1", courseTitle: "Fluid Mechanics Basics", issued: "Mar 12, 2026", credentialId: "EFL-FMB-204781", level: "Beginner" },
  { id: "cert2", courseTitle: "Introduction to CFD", issued: "Apr 02, 2026", credentialId: "EFL-ICF-209114", level: "Beginner" },
];


export const FORUM_THREADS: ForumThread[] = [
  { id: "t1", title: "Why does my k-ω SST simulation diverge at high Re?", author: "shreya_n", replies: 14, views: 312, tag: "turbulence", lastActivity: "12 min ago" },
  { id: "t2", title: "Best mesh resolution for boundary layer y+ < 1?", author: "alex.cfd", replies: 28, views: 1041, tag: "meshing", lastActivity: "1 hour ago" },
  { id: "t3", title: "Compressible flow: density vs pressure based solver?", author: "marco.r", replies: 9, views: 280, tag: "solvers", lastActivity: "3 hours ago" },
  { id: "t4", title: "Show & tell: 3D vortex shedding around a cylinder", author: "yuki.t", replies: 41, views: 2103, tag: "showcase", lastActivity: "Yesterday" },
];


export const AI_CANNED_REPLIES: Record<string, string> = {
  diverge: "**Most common causes of divergence:**\n\n1. **Courant number too high** — try reducing your timestep so CFL < 1 for transient runs.\n2. **Poor mesh quality** — check skewness < 0.85 and aspect ratio < 100 near walls.\n3. **Wrong relaxation factors** — drop momentum to 0.3 and pressure to 0.7 for steady SIMPLE.\n4. **Unrealistic boundary conditions** — verify inlet velocity and outlet pressure are physical.\n\nWant me to walk through a specific residual log?",
  turbulence: "**Pick a turbulence model based on your physics:**\n\n• **k-ε (standard)** — robust, cheap, fine for free-shear flows away from walls.\n• **k-ω SST** — best general-purpose RANS model; great near walls if y+ ≈ 1.\n• **Spalart–Allmaras** — one-equation, ideal for external aero with attached boundary layers.\n• **LES** — when you need resolved unsteady structures (vortex shedding, combustion).\n\nFor your typical airfoil or pipe flow, start with **k-ω SST**.",
  navier: "**Navier–Stokes (incompressible, Newtonian):**\n\n∂u/∂t + (u·∇)u = −(1/ρ)∇p + ν∇²u + f\n\nLeft side = inertia. Right side = pressure gradient + viscous diffusion + body forces. Combined with the continuity equation ∇·u = 0, these form the closed system every CFD solver discretises.",
  default: "Great question. In CFD, the answer usually depends on three things: the **physics** you're capturing, the **mesh** resolution, and the **solver** settings. Could you share a bit more context — solver, Reynolds number, and what you're trying to predict?",
};

export const ANALYTICS_DATA = {
  enrollmentTrend: [
    { month: "Nov", users: 1200 }, { month: "Dec", users: 1850 }, { month: "Jan", users: 2400 },
    { month: "Feb", users: 3100 }, { month: "Mar", users: 4200 }, { month: "Apr", users: 5400 },
    { month: "May", users: 6800 },
  ],
  revenueTrend: [
    { month: "Nov", mrr: 18 }, { month: "Dec", mrr: 26 }, { month: "Jan", mrr: 38 },
    { month: "Feb", mrr: 52 }, { month: "Mar", mrr: 71 }, { month: "Apr", mrr: 94 },
    { month: "May", mrr: 122 },
  ],
  coursePopularity: [
    { name: "Intro to CFD", enrolled: 4200 },
    { name: "Turbulence", enrolled: 2800 },
    { name: "Heat Transfer", enrolled: 2400 },
    { name: "Aerodynamics", enrolled: 2100 },
    { name: "Multiphase", enrolled: 1100 },
  ],
};

export const PRICING_PLANS = [
  { name: "Free", price: 0, period: "forever", popular: false,
    features: ["3 beginner courses", "Limited simulation runs (5/mo)", "Community access", "Basic AI tutor"],
    cta: "Start free" },
  { name: "Pro", price: 29, period: "month", popular: true,
    features: ["All courses", "Unlimited cloud simulations", "Full AI tutor", "Verified certificates", "Project workspace", "Priority support"],
    cta: "Go Pro" },
  { name: "Enterprise", price: null, period: "custom", popular: false,
    features: ["Everything in Pro", "University licenses", "Team collaboration", "LMS integration", "Dedicated GPU compute", "SLA & onboarding"],
    cta: "Contact sales" },
];

export type { AIMessage };

