import Image from "next/image";
import Link from "next/link";

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
    <main className="bg-page py-8 md:py-16">
      <div className="max-w-225 mx-auto px-5">
        {/* Logo beside the page title */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full md:h-20 md:w-20">
            {/* Same crop as the header logo: scale-125 trims the edges */}
            <Image
              src="/logo.png"
              alt="The CineInks logo"
              fill
              sizes="80px"
              className="object-cover scale-125"
            />
          </div>
          <h1 className="font-serif text-4xl font-extrabold leading-tight text-main">
            About
          </h1>
        </div>

        <div className="prose">
          <p className="lead text-xl! leading-relaxed!">
            No fancy film degrees here. Just someone who watches far too many
            movies, series, anime and K-dramas, and has opinions about all of
            them.
          </p>

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
        <aside className="my-10 border-l-4 border-accent bg-card p-5 md:p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-accent mb-2">
            How I rate
          </p>
          <p className="font-serif text-xl md:text-2xl text-main leading-snug mb-2">
            I am not a critic.
          </p>
          <p className="text-main/70 leading-relaxed">
            My only rating system is how much I enjoyed it. A score here
            isn&apos;t a verdict on craft or cinematography. It&apos;s how the
            watch felt. If you want to know what&apos;s worth your time, or
            what to avoid, you&apos;re in the right place.
          </p>
        </aside>

        <h2 className="font-serif text-2xl text-main mb-5">
          What You Will Find Here
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {sections.map((section) => (
            <div
              key={section.title}
              className="border border-line border-l-4 border-l-accent bg-card p-5"
            >
              <h3 className="font-serif text-lg text-main mb-1.5">
                {section.title}
              </h3>
              <p className="text-sm text-main/70 leading-relaxed">
                {section.text}
              </p>
            </div>
          ))}
        </div>

        {/* Where to go next */}
        <div className="mt-12 border-t border-line pt-8">
          <p className="font-serif text-xl text-main mb-2">
            Got something I should watch?
          </p>
          <p className="text-main/70 mb-5">
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
    </main>
  );
}