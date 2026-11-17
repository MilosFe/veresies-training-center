"use client";

// A simple body outline. Each region is a button: selected areas are filled
// in, and clicking a region selects or clears it.

type Region = { name: string; shapes: React.ReactNode };

const regions: Region[] = [
  { name: "Head", shapes: <ellipse cx="100" cy="34" rx="25" ry="27" /> },
  { name: "Jaw", shapes: <rect x="82" y="52" width="36" height="18" rx="9" /> },
  {
    name: "Throat",
    shapes: <rect x="90" y="72" width="20" height="16" rx="4" />,
  },
  {
    name: "Shoulders",
    shapes: <rect x="42" y="90" width="116" height="26" rx="13" />,
  },
  {
    name: "Arms",
    shapes: (
      <>
        <rect x="26" y="118" width="22" height="128" rx="11" />
        <rect x="152" y="118" width="22" height="128" rx="11" />
      </>
    ),
  },
  {
    name: "Chest",
    shapes: <rect x="52" y="118" width="96" height="54" rx="10" />,
  },
  {
    name: "Stomach",
    shapes: <rect x="56" y="174" width="88" height="50" rx="10" />,
  },
  {
    name: "Pelvis",
    shapes: <rect x="52" y="226" width="96" height="40" rx="14" />,
  },
  {
    name: "Legs",
    shapes: (
      <>
        <rect x="56" y="268" width="40" height="160" rx="16" />
        <rect x="104" y="268" width="40" height="160" rx="16" />
      </>
    ),
  },
];

export function BodyFigure({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (name: string) =>
    onChange(
      value.includes(name) ? value.filter((v) => v !== name) : [...value, name],
    );

  return (
    <svg
      viewBox="0 0 200 440"
      role="group"
      aria-label="Body figure: choose where you notice something"
      className="mx-auto h-auto w-full max-w-44"
    >
      {regions.map(({ name, shapes }) => {
        const on = value.includes(name);
        return (
          <g
            key={name}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={name}
            onClick={() => toggle(name)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(name);
              }
            }}
            className={`cursor-pointer stroke-cream stroke-2 outline-none transition focus-visible:stroke-teal-deep ${
              on ? "fill-teal" : "fill-level-2/50 hover:fill-level-2"
            }`}
          >
            <title>{name}</title>
            {shapes}
          </g>
        );
      })}
    </svg>
  );
}
