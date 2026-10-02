import JsonLd, { faqSchema } from '@/components/seo/JsonLd';
import { getPublicFaqs } from '@/lib/faqs';

export default async function ContentFaq({
  relatedType,
  relatedSlug,
  title = 'Frequently asked questions',
}: {
  relatedType: string;
  relatedSlug: string;
  title?: string;
}) {
  let faqs;
  try {
    faqs = await getPublicFaqs(relatedType, relatedSlug);
  } catch {
    return null;
  }
  if (faqs.length === 0) return null;

  const schemaFaqs = faqs
    .filter((faq) => faq.seoVisible)
    .map((faq) => ({ question: faq.question, answer: faq.answer }));

  return (
    <section
      className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8"
      aria-labelledby={`faq-heading-${relatedType.toLowerCase()}-${relatedSlug}`}
    >
      {schemaFaqs.length > 0 && <JsonLd data={faqSchema(schemaFaqs)} />}
      <h2
        id={`faq-heading-${relatedType.toLowerCase()}-${relatedSlug}`}
        className="mb-6 text-2xl font-bold text-foreground sm:text-3xl"
      >
        {title}
      </h2>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.id}
            className="group rounded-xl border border-border bg-card text-card-foreground shadow-sm open:shadow-md"
          >
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <span aria-hidden="true" className="shrink-0 text-primary transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="border-t border-border px-5 py-4 text-sm leading-7 text-muted-foreground">
              <p className="whitespace-pre-line">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
