import { redirect } from "next/navigation";

/** Keep old URL working; canonical policy page is /cancellation-and-refunds */
export default function ReplacementRedirect() {
  redirect("/cancellation-and-refunds");
}
