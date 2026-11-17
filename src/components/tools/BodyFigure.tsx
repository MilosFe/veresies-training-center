"use client";

import Image from "next/image";

// The body outline from the Stress Reset document, with a clickable dot on
// each point. Dots belonging to the same body area switch on and off together.
// Positions are percentages of the image's width and height.
// `added` marks a point the original image does not show, so it is drawn here.
const dots: { area: string; x: number; y: number; added?: boolean }[] = [
  { area: "Head", x: 49.5, y: 6.8 },
  { area: "Jaw", x: 49.5, y: 11.6, added: true },
  { area: "Throat", x: 49.5, y: 16.5 },
  { area: "Shoulders", x: 31, y: 22 },
  { area: "Shoulders", x: 68, y: 22 },
  { area: "Chest", x: 49.5, y: 25.5 },
  { area: "Arms", x: 25.5, y: 37 },
  { area: "Arms", x: 73.5, y: 37 },
  { area: "Arms", x: 21.5, y: 47.3 },
  { area: "Arms", x: 77.5, y: 47.3 },
  { area: "Stomach", x: 49.5, y: 36.5 },
  { area: "Pelvis", x: 49.5, y: 47 },
  { area: "Legs", x: 39, y: 60.5 },
  { area: "Legs", x: 59.5, y: 60.5 },
  { area: "Legs", x: 37, y: 72 },
  { area: "Legs", x: 61.5, y: 72 },
  { area: "Legs", x: 35, y: 89 },
  { area: "Legs", x: 63.5, y: 89 },
];

export function BodyFigure({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (area: string) =>
    onChange(
      value.includes(area) ? value.filter((v) => v !== area) : [...value, area],
    );

  return (
    <div
      role="group"
      aria-label="Body figure: choose where you notice something"
      className="relative mx-auto w-full max-w-48"
    >
      <Image
        src="/images/stress-reset/body-figure.png"
        alt=""
        width={175}
        height={351}
        className="h-auto w-full select-none"
        draggable={false}
      />
      {dots.map(({ area, x, y, added }, i) => {
        const on = value.includes(area);
        return (
          <button
            key={i}
            type="button"
            aria-label={area}
            aria-pressed={on}
            title={area}
            onClick={() => toggle(area)}
            style={{ left: `${x}%`, top: `${y}%` }}
            className={`absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition ${
              on
                ? "border-white bg-level-5 shadow-[0_0_0_4px_rgb(184_122_106/0.35)]"
                : `hover:border-teal hover:bg-white/60 ${
                    added
                      ? "scale-50 border-white/80 bg-white/70 hover:scale-100"
                      : "border-transparent"
                  }`
            }`}
          />
        );
      })}
    </div>
  );
}
