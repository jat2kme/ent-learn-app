import { Metadata } from "next";
import Dashboard from "./Dashboard";

export const metadata: Metadata = {
  title: "Dashboard — ENT Flow Learn",
};

export default function Page() {
  return <Dashboard />;
}
