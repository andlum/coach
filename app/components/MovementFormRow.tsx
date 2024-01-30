import { SCHEME } from "@prisma/client";

import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";

export interface SetValue {
  reps: number;
  weight: number;
  time: number;
  unit: "kg" | "lbs" | "seconds";
  variation: string;
}

export default function MovementFormRow({
  name,
  order,
  scheme,
  value,
}: {
  name?: string;
  scheme: SCHEME;
  order?: number;
  value?: SetValue;
}) {
  return (
    <TableRow>
      <TableCell className="text-center">{order}</TableCell>
      {scheme === SCHEME.REPS || scheme === SCHEME.TIME ? null : (
        <TableCell>
          <Input
            className="w-20 mx-auto"
            type="number"
            defaultValue={value?.weight}
            name={`${name}[weight]`}
            min="0"
          />
        </TableCell>
      )}
      {scheme === SCHEME.TIME ? (
        <TableCell>
          <Input
            className="w-20 mx-auto"
            type="number"
            min="0"
            name={`${name}[time]`}
            defaultValue={value?.time}
          />
        </TableCell>
      ) : (
        <TableCell>
          <Input
            className="w-20 mx-auto"
            type="number"
            min="0"
            defaultValue={value?.reps}
            name={`${name}[reps]`}
          />
        </TableCell>
      )}
    </TableRow>
  );
}
