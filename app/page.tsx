import { redirect } from "next/navigation";

export default function Page() {
  redirect("/onboarding"); // or directly "/connect" if skipping landing later
}