import { cn } from "@/lib/utils";

export default function BrandSelector({
  options,
  selected,
  onToggle,
  error,
  label = "แบรนด์ที่สนใจ",
}: {
  options: string[];
  selected: string[];
  onToggle: (brand: string, checked: boolean) => void;
  error?: string;
  label?: string;
}) {
  return (
    <fieldset
      id="interested-brands"
      className="grid gap-3"
      aria-invalid={Boolean(error)}
      aria-describedby={error ? "brand-selector-error" : undefined}
    >
      <div className="flex items-center justify-between gap-3">
        <legend className="text-sm font-semibold text-zinc-700">{label}</legend>
        {error ? (
          <div
            id="brand-selector-error"
            className="text-sm font-medium text-red-700"
            role="alert"
          >
            {error}
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((b) => {
          const checked = selected.includes(b);
          return (
            <button
              key={b}
              type="button"
              aria-pressed={checked}
              onClick={() => onToggle(b, !checked)}
              className={cn(
                "min-h-11 rounded-md border px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2457d6]/20 disabled:cursor-wait disabled:opacity-60",
                checked
                  ? "border-[#2457d6] bg-[#edf2ff] text-[#1946b8]"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-500 hover:text-zinc-950",
              )}
            >
              {b}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
