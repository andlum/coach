import { SCHEME, Set } from "@prisma/client";

import { Input } from "@/components/ui/input";

// TODO: Just take in a set as a prop
export default function SetRow({
  order,
  scheme,
  value,
  weight,
}: {
  scheme: SCHEME;
  order?: number;
  value?: number;
  weight?: number;
  set?: Partial<Set>;
}) {
  return (
    <div className="SetRow w-full flex items-center justify-between relative">
      <span>{order}</span>
      <Input className="w-16" type="number" step={1} value={value} />
      <span>{scheme === SCHEME.TIME ? "seconds" : "reps"}</span>
      {scheme === SCHEME.REPS || scheme === SCHEME.TIME ? null : (
        <>
          <span>x</span>
          <Input className="w-20" type="number" value={weight} />
          <span>lbs</span>{" "}
        </>
      )}
    </div>
  );
}
