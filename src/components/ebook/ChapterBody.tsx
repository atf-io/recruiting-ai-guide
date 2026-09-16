import type { ChapterMeta } from "@/data/agencyGuideChapters";

interface ChapterBodyProps {
  chapter: ChapterMeta;
}

const ChapterBody = ({ chapter }: ChapterBodyProps) => (
  <article>
    <p className="mb-2 font-heading text-xs font-bold uppercase tracking-[0.2em] text-primary">
      {chapter.part}
    </p>
    <h1 className="font-heading text-2xl font-bold leading-tight text-foreground md:text-3xl">
      {chapter.title}
    </h1>
    {chapter.subtitle && (
      <p className="mt-2 text-base text-muted-foreground">{chapter.subtitle}</p>
    )}
    <hr className="mb-8 mt-6 border-border" />
    <div
      className="chapter-body"
      dangerouslySetInnerHTML={{ __html: chapter.bodyHtml }}
    />
  </article>
);

export default ChapterBody;
