import { SCHEME, Set } from "@prisma/client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

export type SetValue = {
  reps: number;
  weight: number;
  unit: "kg" | "lbs" | "seconds";
  variation: string;
};

// TODO: Just take in a set as a prop
export default function SetRow({
  name,
  order,
  scheme,
  value,
}: {
  name: string;
  scheme: SCHEME;
  order?: number;
  value?: SetValue;
  set?: Partial<Set>;
}) {
  // const [value, setValue] = useState<any>({});

  return (
    <div className="SetRow w-full flex items-center justify-between relative">
      <span>{order}</span>
      <Input
        className="w-16"
        type="number"
        step={1}
        value={value?.reps}
        name={`${name}[reps]`}
      />
      <span>{scheme === SCHEME.TIME ? "seconds" : "reps"}</span>
      {scheme === SCHEME.REPS || scheme === SCHEME.TIME ? null : (
        <>
          <span>x</span>
          <Input
            className="w-20"
            type="number"
            value={value?.weight}
            name={`${name}[weight]`}
          />
          <span>{value?.unit}</span>{" "}
        </>
      )}
    </div>
  );
}
