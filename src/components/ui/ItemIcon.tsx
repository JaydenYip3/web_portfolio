import type { ReactNode } from "react";
import type { ItemIcon as ItemIconName } from "@/types/portfolio";

const fill = { fill: "currentColor", fillOpacity: 0.28 } as const;

const GLYPHS: Record<ItemIconName, ReactNode> = {
  sword: (
    <>
      <path d="M56 8 53 19 27 45 19 37 45 11Z" />
      <path d="M24 41 50 15" opacity=".45" />
      <path d="M14 36 28 50" />
      <path d="M21 43 12 52" strokeWidth="3" />
      <circle cx="10" cy="54" r="2.6" {...fill} />
    </>
  ),
  staff: (
    <>
      <path d="M32 60V19" strokeWidth="2.2" />
      <path d="M21 9c0 13 22 13 22 0" />
      <circle cx="32" cy="12" r="5.5" {...fill} />
      <path d="M32 1.5v2.5M23.5 4.5 25 6M40.5 4.5 39 6" opacity=".6" />
      <path d="M28 33h8M29 44h6" opacity=".6" />
    </>
  ),
  shield: (
    <>
      <path d="M32 6 52 12v18c0 14-9 23-20 28-11-5-20-14-20-28V12Z" />
      <path d="M32 12 46 16v14c0 10-6 17-14 21-8-4-14-11-14-21V16Z" opacity=".5" />
      <path d="M32 22 37 30 32 38 27 30Z" {...fill} />
    </>
  ),
  tome: (
    <>
      <path d="M32 18c-6-5-15-6-24-4v36c9-2 18-1 24 4Z" />
      <path d="M32 18c6-5 15-6 24-4v36c-9-2-18-1-24 4Z" />
      <path
        d="M13 22c5-1 10 0 14 2M13 29c5-1 10 0 14 2M13 36c5-1 10 0 14 2M37 24c4-2 9-3 14-2M37 31c4-2 9-3 14-2M37 38c4-2 9-3 14-2"
        opacity=".45"
      />
      <path d="M32 3 34.5 8 32 11.5 29.5 8Z" {...fill} />
    </>
  ),
  talisman: (
    <>
      <path d="M20 6c2 10 6 14 12 16 6-2 10-6 12-16" opacity=".7" />
      <circle cx="32" cy="24.5" r="2.5" />
      <circle cx="32" cy="41" r="14" />
      <circle cx="32" cy="41" r="9" opacity=".5" />
      <path d="M32 33 35 41 32 49 29 41Z" {...fill} />
    </>
  ),
  flask: (
    <>
      <path d="M26 5h12" />
      <path d="M28 5v12C18 21 12 29 12 39c0 11 9 19 20 19s20-8 20-19c0-10-6-18-16-22V5" />
      <path
        d="M14.5 40c7.5-4 27.5 4 35-2 0 11-7.5 17.5-17.5 17.5S14.5 49 14.5 40Z"
        stroke="none"
        {...fill}
      />
      <path d="M21 33c2-5 5-8 8.5-9.5" opacity=".5" />
    </>
  ),
  lantern: (
    <>
      <path d="M28 8c0-4 8-4 8 0" />
      <path d="M22 16 26 9h12l4 7Z" />
      <path d="M22 16v30h20V16" />
      <path d="M27 16v30M37 16v30" opacity=".3" />
      <path d="M18 46h28l-4 8H22Z" />
      <path d="M32 22c4.5 6 4.5 13 0 18-4.5-5-4.5-12 0-18Z" {...fill} />
    </>
  ),
  crown: (
    <>
      <path d="M10 46 13 20 23 32 32 13 41 32 51 20 54 46Z" />
      <path d="M10 46h44v7H10Z" />
      <circle cx="13" cy="17.5" r="2.2" />
      <circle cx="32" cy="10.5" r="2.4" />
      <circle cx="51" cy="17.5" r="2.2" />
      <path d="M32 35 35 39.5 32 44 29 39.5Z" {...fill} />
    </>
  ),
};

/** Line-art glyph for a project's inventory slot. */
export function ItemIcon({ name, className }: { name: ItemIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {GLYPHS[name]}
    </svg>
  );
}
