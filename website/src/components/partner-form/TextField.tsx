import { cn } from "@/lib/utils";

export default function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  inputMode,
  type = "text",
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  placeholder?: string;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  error?: string;
}) {
  return (
    <div className="grid min-w-0 gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-zinc-700">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        inputMode={inputMode}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-11 w-full min-w-0 rounded-md border bg-white px-3 text-sm font-medium text-zinc-900 outline-none transition-colors placeholder:text-zinc-500 focus-visible:border-[#2457d6] focus-visible:ring-2 focus-visible:ring-[#2457d6]/15",
          error ? "border-red-600" : "border-zinc-300 hover:border-zinc-500",
        )}
      />
      {error ? (
        <div
          id={`${id}-error`}
          className="text-sm font-medium text-red-700"
          role="alert"
        >
          {error}
        </div>
      ) : null}
    </div>
  );
}
