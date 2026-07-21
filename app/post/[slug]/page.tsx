import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/CtaBand";
import { getPostBySlug, getPostSlugs } from "@/lib/content/posts";
import { getBlogPostingJsonLd } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/post/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      url: `/post/${post.slug}`,
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={getBlogPostingJsonLd(post)} />
      <article className="bg-mist pt-16 md:pt-[4.25rem]">
        <header className="border-b border-stone bg-[#e8edf2]">
          {post.image ? (
            <div className="relative mx-auto aspect-[21/9] max-w-6xl overflow-hidden md:aspect-[2.4/1]">
              <Image
                src={post.image}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1152px) 100vw, 1152px"
              />
            </div>
          ) : null}
          <div className="px-5 py-12 md:px-8 md:py-16">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/blog"
                className="text-[13px] font-semibold tracking-wide text-moss hover:underline"
              >
                ← Blog
              </Link>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-muted">
                {post.description}
              </p>
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-16">
          <Markdown content={post.content} />
        </div>
      </article>
      <CtaBand headline="Need help with your irrigation system?" />
    </>
  );
}
