import type { Route } from "./+types/home";
import { LandingPage } from "../../components/landing/LandingPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Archify — 2D floor plans to photorealistic 3D | AI visualization" },
    {
      name: "description",
      content:
        "Transform 2D floor plans into photorealistic 3D architectural renders with AI. Permanent hosting, KV metadata, community feed. Powered by Puter.js.",
    },
  ];
}

export default function Home() {
  return <LandingPage />;
}
