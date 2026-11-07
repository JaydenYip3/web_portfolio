import { cacheLife } from "next/cache";
import { Ornament } from "@/components/ui/Ornament";

// Captured into the static page at build time; it refreshes whenever you redeploy.
async function CopyrightYear() {
  "use cache";
  cacheLife("max");
  return <>{new Date().getFullYear()}</>;
}

export function Footer({ name }: { name: string }) {
  return (
    <footer className="relative pt-10 pb-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center sm:px-8">
        <Ornament />
        <a href="#top" className="menu-link px-4 py-2">
          Return to grace
        </a>
        <div className="space-y-2">
          <p className="font-display text-[11px] tracking-[0.3em] text-smoke uppercase">
            © <CopyrightYear /> {name}
          </p>
          <p className="max-w-md text-sm text-smoke italic">
            A fan-made tribute to the Lands Between. Not affiliated with FromSoftware or Bandai Namco.
          </p>
        </div>
      </div>
    </footer>
  );
}
