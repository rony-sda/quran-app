import { redirect } from "next/navigation";

// Root page redirects to Surah Al-Fatihah (1)
export default function HomePage() {
  redirect("/1");
}
