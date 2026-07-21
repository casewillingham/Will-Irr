import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { getPosts } from "@/lib/content/posts";

export const metadata: Metadata = {
  title: "Irrigation Tips & Guides",
  description:
    "Practical irrigation advice for North Texas homeowners — seasonal care, smart controllers, nozzles, and system documentation.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getPosts();

  return (
    <>
      <PageHero
        label="Blog"
        title="Irrigation tips & guides"
        subline="Seasonal care, smarter watering, and practical how-tos for North Texas landscapes."
        imageSrc="/images/photos/sprinkler-mist.jpg"
        imageAlt="Sprinkler mist over a green lawn"
      />

      <section className="bg-[#e8edf2] px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Articles
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Latest from the field
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delayMs={i * 50}>
                <article className="group flex h-full flex-col overflow-hidden bg-ink">
                  {post.image ? (
                    <Link
                      href={`/post/${post.slug}`}
                      className="relative aspect-[16/10] overflow-hidden"
                    >
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </Link>
                  ) : null}
                  <div className="flex flex-1 flex-col px-5 py-6 md:px-6">
                    <p className="text-[12px] text-white/45">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
                      <Link
                        href={`/post/${post.slug}`}
                        className="transition hover:text-leaf"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-3 flex-1 text-[14px] leading-relaxed text-white/65">
                      {post.description}
                    </p>
                    <Link
                      href={`/post/${post.slug}`}
                      className="mt-5 inline-block text-[13px] font-semibold tracking-wide text-leaf hover:underline"
                    >
                      Read article →
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand headline="Need help with your irrigation system?" />
    </>
  );
}
