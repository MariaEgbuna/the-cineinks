type PageHeaderProps = {
  label: string;
  title: string;
  description?: string;
  meta?: string;
};

export default function PageHeader({ label, title, description, meta }: PageHeaderProps) {
  return (
    <section className="bg-linear-to-b from-accent/10 to-transparent py-6 md:py-8">
      <div className="max-w-225 mx-auto px-5">
        <p className="mb-1 font-mono text-xs font-medium uppercase tracking-wide text-accent">
          {label}
        </p>
        <h1 className="font-serif text-2xl font-semibold leading-tight text-main md:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-xl text-base leading-relaxed text-main/70">
            {description}
          </p>
        )}
        {meta && <p className="mt-2 font-mono text-xs text-muted">{meta}</p>}
      </div>
    </section>
  );
}