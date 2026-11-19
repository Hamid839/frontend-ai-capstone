export type PortfolioProjectCardData = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  contribution: string;
  features: string[];
  href: string;
  relevance: number;
};

type PortfolioProjectCardProps = {
  project: PortfolioProjectCardData;
};

export function PortfolioProjectCard({
  project,
}: PortfolioProjectCardProps) {
  return (
    <article className="rounded-xl border border-slate-700 bg-slate-950/80 p-4">
      <h3 className="text-base font-semibold text-white">{project.name}</h3>
      <p className="mt-2 break-words text-sm leading-relaxed text-slate-300">
        {project.description}
      </p>

      <ul
        aria-label="Technologies"
        className="mt-3 flex flex-wrap gap-2"
      >
        {project.technologies.map((technology) => (
          <li key={technology}>
            <span className="rounded-full border border-indigo-800/80 bg-indigo-950/60 px-2.5 py-1 text-xs font-medium text-indigo-200">
              {technology}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 border-l-2 border-indigo-500 pl-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Contribution
        </h4>
        <p className="mt-1 break-words text-sm text-slate-200">
          {project.contribution}
        </p>
      </div>

      <div className="mt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Relevant features
        </h4>
        <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-slate-300">
          {project.features.map((feature) => (
            <li key={feature} className="break-words">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex text-sm font-medium text-indigo-300 underline decoration-indigo-500/60 underline-offset-4 hover:text-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-400"
      >
        View project details
        <span className="sr-only"> for {project.name}</span>
      </a>
    </article>
  );
}
