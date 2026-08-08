import React from "react";
import ReactDOM from "react-dom/client";
import { Disc3, Lock, Sparkles, Unlock } from "lucide-react";
import "./styles.css";

const SONG_URL = "/oxana-vydykhai.mp3";

const tracks = [
  "QA IS A DIAGNOSIS",
  "TRAVELING THERAPY",
  "DRUM AND TEST",
  "BOY MOM",
  "MALDIVES SUNSETS",
  "LIFE IS SO BEAUTIFUL",
];

type EasterEgg = {
  track: number;
  nonce: number;
};

function App() {
  const [answer, setAnswer] = React.useState("");
  const [error, setError] = React.useState("");
  const [wrongAttempts, setWrongAttempts] = React.useState(0);
  const [unlocked, setUnlocked] = React.useState(false);
  const [easterEgg, setEasterEgg] = React.useState<EasterEgg | null>(null);
  const [coverFlipped, setCoverFlipped] = React.useState(false);
  const easterTimer = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (easterTimer.current) {
        window.clearTimeout(easterTimer.current);
      }
    };
  }, []);

  function unlockTrack(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedAnswer = answer.trim().toLowerCase();
    if (normalizedAnswer === "croatia") {
      setError("");
      setWrongAttempts(0);
      setUnlocked(true);
      window.setTimeout(() => {
        document.getElementById("gift")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 700);
      return;
    }

    if (/[а-яё]/i.test(normalizedAnswer)) {
      setError("Write the destination in English, please. Almost there 👀");
      return;
    }

    setWrongAttempts((attempts) => {
      const nextAttempts = attempts + 1;
      setError(
        nextAttempts >= 3
          ? "Almost there: it starts with C and ends with A. Adriatic sea, first adventure. 🇭🇷"
          : "Not quite. Try another destination 👀",
      );
      return nextAttempts;
    });
  }

  function triggerTrack(track: number) {
    if (easterTimer.current) {
      window.clearTimeout(easterTimer.current);
    }
    setEasterEgg({ track, nonce: Date.now() });
    if (track === tracks.length) {
      window.setTimeout(() => {
        document.getElementById("unlock")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 180);
    }
    easterTimer.current = window.setTimeout(() => setEasterEgg(null), 1050);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ocean text-pearl">
      <div className="ocean-motion" aria-hidden="true" />
      <div className="spark-field" aria-hidden="true" />

      <section className="hero-stage relative mx-auto flex min-h-[82vh] w-full max-w-xl items-center justify-center px-5 py-8 sm:px-8 lg:py-12">
        <AlbumFlip
          flipped={coverFlipped}
          unlocked={unlocked}
          easterEgg={easterEgg}
          onFlip={() => setCoverFlipped((value) => !value)}
          onTrackPress={triggerTrack}
        />
      </section>

      <section id="unlock" className="relative mx-auto max-w-xl px-5 pb-20 sm:px-8">
        <div className={`unlock-panel ${unlocked ? "solved" : ""}`}>
          <div className="mb-7 flex items-center justify-between gap-4">
            <div>
              <p className="release-label mb-2">BONUS TRACK #7</p>
              <h2 className="font-display text-5xl tracking-[0.06em] text-white">UNLOCK BONUS TRACK</h2>
            </div>
            <div className="lock-disc" aria-hidden="true">
              {unlocked ? <Unlock size={32} /> : <Lock size={32} />}
            </div>
          </div>

          <p className="mb-5 text-lg text-white/78">Where did our first adventure begin? ✈️</p>
          <form onSubmit={unlockTrack} className="space-y-4">
            <input
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              className="code-input"
              placeholder="ENTER DESTINATION"
              aria-label="Enter destination"
              disabled={unlocked}
            />
            <button className="primary-button w-full justify-center" type="submit" disabled={unlocked}>
              {unlocked ? <Sparkles size={19} /> : <Unlock size={19} />}
              {unlocked ? "TRACK UNLOCKED" : "UNLOCK TRACK"}
            </button>
          </form>
          {error && <p className="mt-4 text-sm font-semibold text-hotpink">{error}</p>}
          {unlocked && <SuccessBurst />}
        </div>
      </section>

      {unlocked && (
        <section id="gift" className="relative mx-auto max-w-3xl px-5 pb-20 text-center sm:px-8">
          <div className="gift-panel animate-rise">
            <p className="release-label">BONUS TRACK UNLOCKED 🎵</p>
            <h2 className="mt-3 font-display text-5xl tracking-[0.06em] text-white sm:text-6xl">
              07. ОКСАНА, ВЫДЫХАЙ
            </h2>

            <div className="record-stage" aria-hidden="true">
              <div className="record-sleeve">
                <img src="/oxana-cover.jpg" alt="" />
              </div>
              <div className="vinyl-record">
                <div className="vinyl-label">
                  <Disc3 size={34} />
                </div>
              </div>
            </div>

            <p className="mx-auto mt-7 max-w-md text-xl leading-relaxed text-white/82">
              No bugs. No drums. No deadlines.
              <br />
              Just breathe out and press play.
            </p>

            <div className="song-card">
              <audio controls preload="metadata" src={SONG_URL}>
                Your browser does not support the audio element.
              </audio>
            </div>

            <p className="mx-auto max-w-md text-lg leading-8 text-white/76">
              QA is a diagnosis. Traveling is therapy. And this track is your little escape from production. 😁
            </p>
          </div>
        </section>
      )}

      <section className="relative mx-auto max-w-2xl px-5 pb-14 text-center sm:px-8">
        <p className="text-2xl font-semibold text-white">С днём рождения, Оксана.</p>
        <p className="mx-auto mt-5 max-w-lg whitespace-pre-line text-lg leading-8 text-white/78">
          {`Пусть в этом году будет больше путешествий,
музыки, красивых моментов,
новых впечатлений
и времени на себя.`}
        </p>
        <p className="mt-7 text-3xl font-script text-white">С любовью ❤️</p>
        <p className="mt-4 text-lg text-hotpink">P.S. Лучшее впереди.</p>
      </section>

      <footer className="relative border-t border-white/10 px-5 py-7 text-center text-xs font-bold tracking-[0.25em] text-white/52">
        LIMITED BIRTHDAY RELEASE • MADE WITH LOVE
      </footer>
    </main>
  );
}

function AlbumFlip({
  flipped,
  unlocked,
  easterEgg,
  onFlip,
  onTrackPress,
}: {
  flipped: boolean;
  unlocked: boolean;
  easterEgg: EasterEgg | null;
  onFlip: () => void;
  onTrackPress: (track: number) => void;
}) {
  return (
    <div className={`album-flip mx-auto w-full max-w-[440px] animate-floaty ${flipped ? "is-flipped" : ""}`}>
      <div className="album-inner">
        <button className="album-face album-front" onClick={onFlip} type="button" aria-label="Show tracklist">
          <img
            src="/oxana-cover.jpg"
            alt="Oxana Fearless Soul deluxe album cover"
            className="album-cover"
          />
        </button>
        <div className="album-face album-back">
          <button className="side-b-button" onClick={onFlip} type="button" aria-label="Show cover">
            SIDE B
          </button>
          <TrackList unlocked={unlocked} easterEgg={easterEgg} onTrackPress={onTrackPress} />
        </div>
      </div>
    </div>
  );
}

function TrackList({
  unlocked,
  easterEgg,
  onTrackPress,
}: {
  unlocked: boolean;
  easterEgg: EasterEgg | null;
  onTrackPress: (track: number) => void;
}) {
  return (
    <aside className="tracklist">
      <h2 className="tracklist-title font-script text-4xl text-hotpink">Tracklist</h2>
      <ol className="mt-4 grid gap-2 text-sm font-bold tracking-[0.12em] text-white/78">
        {tracks.map((track, index) => (
          <li key={track} className="track-shell">
            <button
              className={`track-row ${easterEgg?.track === index ? `egg-active egg-${index + 1}` : ""}`}
              onClick={() => onTrackPress(index)}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="track-title">{track}</span>
              {easterEgg?.track === index && <TrackEffect track={index} nonce={easterEgg.nonce} />}
            </button>
          </li>
        ))}
        <li className="track-shell">
          <button
            className={`track-row text-white ${easterEgg?.track === tracks.length ? "egg-active egg-11" : ""}`}
            onClick={() => onTrackPress(tracks.length)}
            type="button"
          >
            <span>07</span>
            <span className="track-title">ОКСАНА, ВЫДЫХАЙ - {unlocked ? "UNLOCKED" : "LOCKED"}</span>
            {easterEgg?.track === tracks.length && <TrackEffect track={tracks.length} nonce={easterEgg.nonce} />}
          </button>
        </li>
      </ol>
    </aside>
  );
}

function TrackEffect({ track, nonce }: { track: number; nonce: number }) {
  if (track === 0) {
    return (
      <span className="star-spill" aria-hidden="true" key={nonce}>
        {Array.from({ length: 9 }).map((_, index) => (
          <i key={index} style={{ "--i": index } as React.CSSProperties}>✦</i>
        ))}
      </span>
    );
  }

  if (track === 1) {
    return <span className="paper-plane" aria-hidden="true" key={nonce}>✈</span>;
  }

  if (track === 2) {
    return <span className="drum-stick" aria-hidden="true" key={nonce} />;
  }

  if (track === 3) {
    return <span className="tiny-car" aria-hidden="true" key={nonce}>▰</span>;
  }

  if (track === 4) {
    return <span className="sunset-glow" aria-hidden="true" key={nonce} />;
  }

  if (track === 5) {
    return (
      <span className="heart-flight" aria-hidden="true" key={nonce}>
        {Array.from({ length: 7 }).map((_, index) => (
          <i key={index} style={{ "--i": index } as React.CSSProperties}>♥</i>
        ))}
      </span>
    );
  }

  return <span className="track-ping" aria-hidden="true" key={nonce} />;
}

function SuccessBurst() {
  return (
    <div className="success-burst" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, index) => (
        <span key={index} style={{ "--i": index } as React.CSSProperties} />
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
