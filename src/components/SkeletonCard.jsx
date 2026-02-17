export default function SkeletonCard() {
  return (
    <article className="card card--skeleton" aria-hidden="true">
      <div className="skeleton skeleton-image" />
      <div className="card__content">
        <div className="skeleton skeleton-text skeleton-text--title" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text skeleton-text--short" />
      </div>
    </article>
  )
}
