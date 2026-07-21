export function Faq({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="divide-y divide-stone border-y border-stone">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="cursor-pointer list-none font-display text-xl text-ink marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-4">
              {item.question}
              <span className="mt-1 text-leaf transition group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-ink-muted leading-relaxed">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
