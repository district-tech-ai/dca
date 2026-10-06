import { useEffect, useRef, useState } from "react";
import { LoaderCircle, Pause, Play, Volume2, VolumeX } from "lucide-react";

type VenueVideoProps = {
  src: string;
  poster: string;
  label: string;
  width: number;
  height: number;
  muted: boolean;
  onToggleMute: () => void;
  className?: string;
};

/**
 * Muted, looping video that only downloads once it nears the viewport,
 * plays while visible and pauses when scrolled away to keep the page smooth.
 */
export function VenueVideo({
  src,
  poster,
  label,
  width,
  height,
  muted,
  onToggleMute,
  className = "",
}: VenueVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  // Start loading ~300px before the video scrolls into view.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Track whether enough of the video is on screen to be playing.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!!entry?.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // React does not reliably set the `muted` attribute, so set the property directly.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !near) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (visible && !userPaused && !reduceMotion) {
      el.muted = muted;
      el.play().catch(() => setPlaying(false));
    } else {
      el.pause();
    }
    // `muted` is intentionally excluded: toggling sound must not restart playback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near, visible, userPaused]);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      setUserPaused(false);
      el.play().catch(() => setPlaying(false));
    } else {
      setUserPaused(true);
      el.pause();
    }
  };

  return (
    <figure
      className={`relative overflow-hidden rounded-3xl border border-primary-foreground/15 bg-event-navy ${className}`}
    >
      <video
        ref={videoRef}
        src={near ? src : undefined}
        poster={poster}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload={near ? "auto" : "none"}
        aria-label={label}
        className="absolute inset-0 size-full object-cover"
        onPlaying={() => {
          setPlaying(true);
          setBuffering(false);
        }}
        onPause={() => setPlaying(false)}
        onWaiting={() => setBuffering(true)}
        onCanPlay={() => setBuffering(false)}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-event-dark/70 to-transparent" />
      <figcaption className="absolute left-4 top-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground md:left-5 md:top-5">
        {label}
      </figcaption>
      {buffering && (
        <LoaderCircle
          className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 animate-spin text-primary-foreground/80"
          aria-hidden="true"
        />
      )}
      <div className="absolute bottom-3 right-3 flex gap-2 md:bottom-4 md:right-4">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? `Pause ${label}` : `Play ${label}`}
          className="grid size-10 place-items-center rounded-full border border-primary-foreground/30 bg-event-dark/70 text-primary-foreground backdrop-blur transition-colors hover:bg-primary"
        >
          {playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}
        </button>
        <button
          type="button"
          onClick={onToggleMute}
          aria-label={muted ? `Unmute ${label}` : `Mute ${label}`}
          aria-pressed={!muted}
          className="grid size-10 place-items-center rounded-full border border-primary-foreground/30 bg-event-dark/70 text-primary-foreground backdrop-blur transition-colors hover:bg-primary"
        >
          {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </button>
      </div>
    </figure>
  );
}
