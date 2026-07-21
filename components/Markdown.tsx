import Image from "next/image";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  a: ({ href, children }) => {
    const external = Boolean(href?.startsWith("http"));
    return (
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => {
    if (!src || typeof src !== "string") return null;
    return (
      <span className="relative my-8 block aspect-[16/10] overflow-hidden bg-stone">
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </span>
    );
  },
};

export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose prose-will max-w-none prose-headings:font-display prose-a:text-moss prose-img:my-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
