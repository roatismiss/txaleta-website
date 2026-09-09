// Renders a schema.org graph as a <script type="application/ld+json"> tag.
//
// `<` is escaped to its unicode form: JSON.stringify does NOT sanitize a "</script>"
// sequence, so any content string (a room description, a menu item, an FAQ answer)
// that happened to contain one would break out of the tag. Per the Next.js JSON-LD
// guide (node_modules/next/dist/docs/01-app/02-guides/json-ld.md).
//
// A plain <script> is correct here, not next/script — JSON-LD is data, not code.
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
