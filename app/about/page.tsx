export default function AboutPage() {
  return (
    <main className="bg-cream py-16">
      <div className="max-w-[900px] mx-auto px-5 prose prose-neutral">
        <h1 className="font-serif">About</h1>

        <p>
          No fancy film degrees here. Just someone who watches a lot of
          movies, series, anime, and K-dramas.
        </p>

        <p>
          This blog started because I kept finishing shows and movies with
          something to say, and nowhere to say it. So now I write it down.
          Sometimes it is a full review. Sometimes it is just a quick take
          highlighting the good and bad. Either way, it's just my voice.
        </p>

        <p>
          I'll try and cover everything: Korean dramas, anime, Hollywood blockbusters,
          prestige TV, even the occasional thing I probably should have
          skipped. If I watched it, it's fair game.
        </p>

        <p>
          <strong>I am not a critic.</strong> My only rating system is
          how much I actually enjoyed it. That is it.
        </p>

        <p>
          If you are looking for someone to tell you what is worth your
          time, or what to avoid, you are in the right place.
        </p>

        <h3>What You Will Find Here</h3>

        <div className="border-l-[3px] border-teal pl-4 mb-4">
          <p className="m-0">
            <strong>Reviews:</strong> My actual thoughts on movies and
            series I have watched, old or new.
          </p>
        </div>

        <div className="border-l-[3px] border-teal pl-4 mb-4">
          <p className="m-0">
            <strong>Recaps:</strong> Episode and season breakdowns for
            things worth talking through in detail.
          </p>
        </div>

        <div className="border-l-[3px] border-teal pl-4 mb-4">
          <p className="m-0">
            <strong>Spotlight:</strong> When a specific actor, director, or
            detail deserves its own conversation.
          </p>
        </div>

        <div className="border-l-[3px] border-teal pl-4 mb-4">
          <p className="m-0">
            <strong>Hall of Fame:</strong> Movies/Shows that have left a lasting impression.
          </p>
        </div>

        <div className="border-l-[3px] border-teal pl-4">
          <p className="m-0">
            <strong>Extras:</strong> Everything else. Recommendations,
            lists, random thoughts.
          </p>
        </div>
      </div>
    </main>
  );
}