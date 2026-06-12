import { redirect } from "next/navigation";

// Redirect straight to dashboard while Clerk keys aren't configured
export default function SignInPage() {
  redirect("/dashboard");
}
