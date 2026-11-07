import Link from "next/link";

/** 404, in the only way that makes sense here. */
export default function NotFound() {
  return (
    <main className="you-died-page relative grid min-h-svh place-items-center overflow-hidden px-6">
      <div className="you-died-band absolute inset-x-0 top-1/2 h-36 -translate-y-1/2 sm:h-48" aria-hidden />
      <h1 className="you-died relative font-display text-6xl font-normal tracking-[0.06em] sm:text-8xl md:text-9xl">
        YOU DIED
      </h1>
      <div className="you-died-footer absolute inset-x-0 bottom-[16%] flex flex-col items-center gap-6 px-6 text-center">
        <p className="text-lg text-ash italic">This path leads nowhere. The page you seek does not exist.</p>
        <Link href="/" className="btn btn-ghost">
          Return to grace
        </Link>
      </div>
    </main>
  );
}
