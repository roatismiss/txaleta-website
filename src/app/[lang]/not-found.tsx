import { NotFoundView } from "@/components/not-found-view";

// Rendered inside the [lang] layout for an explicit notFound() in a page
// below it. Most 404s never reach this file: unmatched URLs and unknown guide
// slugs are rejected at routing level and get app/global-not-found.tsx, which
// shows the same view.
export default function NotFound() {
  return <NotFoundView />;
}
