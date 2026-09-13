"use client";

import { Switch } from "@/components/ui/switch";

const Switch3 = ({
  checked,
  onCheckedChange,
  label = "Watermark",
}: {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
}) => {
  return (
    <label className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-white/60 uppercase">
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={label}
      />
      {label}
    </label>
  );
};

export default Switch3;
