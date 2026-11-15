import Link from "next/link";
import PageHeader from "../../components/PageHeader";

const sections = [
  {
    title: "Reviews",
    text: "What I actually thought of a movie or series, the good, the bad and the 'why did I finish that?'. Old or new.",
  },
  {
    title: "Recaps",
    text: "Episode and season breakdowns for the shows that are worth talking through in detail.",
  },
  {
    title: "Spotlight",
    text: "For the times an actor, a director or one small detail deserves its own conversation.",
  },
  {
    title: "Hall of Fame",
    text: "The movies and shows that stayed with me long after the credits rolled.",
  },
  {
    title: "Lists",
    text: "My personal top 10s, the best and the worst. They're my picks and nobody else's, so expect strong opinions.",
  },
  {
    title: "Extras",
    text: "Everything else: recommendations and random thoughts that don't fit anywhere.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        label="The blog"
        title="About"
        description="No fancy film degrees here. Just someone who watches far too many movies, series, anime and K-dramas, and has opinions about all of them."
      />

      <section className="bg-page py-6 md:py-10">
        <div className="max-w-225 mx-auto px-5">
          <div className="prose">
            <p>
              This blog exists because I kept finishing a great episode (or a
              terrible one) with a lot to say and nobody to say it to. So I
              started writing it down. Some posts are full reviews. Some are a
              quick take on what worked and what didn&apos;t. All of them are
              just my voice.
            </p>

            <p>
              I&apos;ll cover anything: Korean dramas, anime, big Hollywood
              blockbusters, prestige TV, and the occasional thing I probably
              should have skipped. If I watched it, it&apos;s fair game.
            </p>
          </div>

          {/* How ratings work: pulled out of the text so it stands out */}
          <aside className="my-8 border-l-4 border-accent bg-card p-5 md:p-6">
            <p className="mb-2 font-mono text-xs font-medium uppercase tracking-wide text-accent">
              How I rate
            </p>
            <p className="mb-2 font-serif text-lg leading-snug text-main md:text-xl">
              I am not a critic.
            </p>
            <p className="text-[0.9375rem] leading-relaxed text-main/70 md:text-base">
              My only rating system is how much I enjoyed it. A score here
              isn&apos;t a verdict on craft or cinematography. It&apos;s how the
              watch felt. If you want to know what&apos;s worth your time, or
              what to avoid, you&apos;re in the right place.
            </p>
          </aside>

          <h2 className="mb-5 font-serif text-xl text-main md:text-2xl">
            What You Will Find Here
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sections.map((section) => (
              <div
                key={section.title}
                className="border border-line border-l-4 border-l-accent bg-card p-5"
              >
                <h3 className="mb-1.5 font-serif text-base text-main">
                  {section.title}
                </h3>
                <p className="text-sm leading-relaxed text-main/70">
                  {section.text}
                </p>
              </div>
            ))}
          </div>

          {/* Where to go next */}
          <div className="mt-10 border-t border-line pt-8">
            <h2 className="mb-2 font-serif text-xl text-main md:text-2xl">
              Got something I should watch?
            </h2>
            <p className="mb-5 text-[0.9375rem] text-main/70 md:text-base">
              Recommendations are always welcome, and so are disagreements.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/archive"
                className="rounded bg-teal text-teal-light px-6 py-3 text-sm font-medium"
              >
                Read the latest posts
              </Link>
              <Link
                href="/contact"
                className="rounded border border-main/20 text-main px-6 py-3 text-sm font-medium"
              >
                Tell me what to watch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}