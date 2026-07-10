export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: React.ReactNode;
}) {
  return (
    <section className="border-b border-brand-line bg-white px-6 pb-8 pt-14 sm:px-10 lg:pt-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-extrabold leading-tight text-brand-ink sm:text-4xl">{title}</h1>
        {subtitle ? <div className="mt-3 text-sm text-brand-muted">{subtitle}</div> : null}
      </div>
    </section>
  );
}
