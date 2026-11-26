import type { ComponentPropsWithoutRef } from "react";
import type { ExtraProps } from "react-markdown";
import PostButton from "./PostButton";
import PostNav from "./PostNav";
import { resolveNavLinks } from "../utils/postLinks";
import type { RawLink } from "../utils/postLinks";

type MarkdownNode = NonNullable<ExtraProps["node"]>["children"][number];

type MarkdownParagraphProps = ComponentPropsWithoutRef<"p"> & ExtraProps;

// Gets the plain words out of a piece of Markdown
function getText(node: MarkdownNode): string {
  if (node.type === "text") return node.value;
  if (node.type === "element") return node.children.map(getText).join("");
  return "";
}

function getNavLinks(node: ExtraProps["node"]) {
  if (!node) return null;

  // Ignore spaces, line breaks and a colon typed outside the bold text
  const parts = node.children.filter(
    (child) =>
      !(child.type === "text" && /^[\s:]*$/.test(child.value)) &&
      !(child.type === "element" && child.tagName === "br")
  );

  let label: string | undefined;
  const first = parts[0];
  if (first?.type === "element" && first.tagName === "strong") {
    label = getText(first).trim().replace(/:$/, "");
    parts.shift();
  }

  const links: RawLink[] = [];
  for (const part of parts) {
    if (part.type !== "element" || part.tagName !== "a") return null;
    links.push({ text: getText(part), href: String(part.properties.href ?? "") });
  }

  return resolveNavLinks(links, label);
}

export default function MarkdownParagraph({ node, children, ...props }: MarkdownParagraphProps) {
  const navLinks = getNavLinks(node);

  // Every other paragraph stays as it was
  if (!navLinks) return <p {...props}>{children}</p>;

  const [first] = navLinks;
  if (navLinks.length === 1 && first.direction === "other") {
    return <PostButton post={first.post} text={first.text} />;
  }

  return <PostNav links={navLinks} />;
}