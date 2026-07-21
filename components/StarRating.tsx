type Props = {
  rating: number;
  max?: number;
  className?: string;
  label?: string;
};

export function StarRating({
  rating,
  max = 5,
  className = "",
  label,
}: Props) {
  const full = Math.round(rating);
  const stars = Array.from({ length: max }, (_, i) => i < full);

  return (
    <div
      className={`inline-flex items-center gap-0.5 ${className}`}
      aria-label={label ?? `${rating} out of ${max} stars`}
    >
      {stars.map((on, i) => (
        <span
          key={i}
          className={on ? "text-leaf" : "text-stone"}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}
