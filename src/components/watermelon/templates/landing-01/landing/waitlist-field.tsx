import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const WaitlistInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    prefix?: string;
    invalid?: boolean;
  }
>(function WaitlistInput(
  { prefix = "TO", invalid, className, ...props },
  ref,
) {
  return (
    <div
      className={cn(
        "flex min-h-12 w-full items-stretch border bg-black/40",
        invalid ? "border-white/35" : "border-white/10",
        "focus-within:border-primary focus-within:ring-1 focus-within:ring-primary",
        className,
      )}
    >
      <span
        aria-hidden
        className="flex shrink-0 items-center border-r border-white/10 px-3 font-mono text-[10px] font-bold tracking-[0.22em] text-primary/80"
      >
        {prefix}
      </span>
      <input
        ref={ref}
        className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-white/35 disabled:opacity-50"
        {...props}
      />
    </div>
  );
});

export function WaitlistSelect({
  invalid,
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative mt-2 block",
        className,
      )}
    >
      <select
        className={cn(
          "w-full appearance-none border bg-black/40 px-4 py-3 pr-10 text-sm text-white outline-none disabled:opacity-50",
          invalid ? "border-white/35" : "border-white/10",
          "focus:border-primary focus-visible:ring-1 focus-visible:ring-primary",
        )}
        {...props}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/40">
        ▾
      </span>
    </div>
  );
}

export function WaitlistReceipt({
  email,
  label,
}: {
  email: string;
  label: string;
}) {
  return (
    <div className="flex min-h-12 w-full items-center border border-white/10 bg-black/40 px-3">
      <span
        aria-hidden
        className="mr-3 shrink-0 border-r border-white/10 pr-3 font-mono text-[10px] font-bold tracking-[0.22em] text-primary/80"
      >
        OK
      </span>
      <p className="truncate font-mono text-xs text-white/70" role="status">
        {label} {email}
      </p>
    </div>
  );
}

export function WaitlistStatus({
  error,
  success,
}: {
  error?: string;
  success?: string;
}) {
  if (error) {
    return (
      <p className="font-mono text-xs text-white/70" role="alert">
        {error}
      </p>
    );
  }
  if (success) {
    return (
      <p className="font-mono text-xs text-white/70" role="status">
        {success}
      </p>
    );
  }
  return null;
}
