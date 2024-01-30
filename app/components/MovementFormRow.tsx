import { SCHEME } from "@prisma/client";

import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";

export interface SetValue {
  reps: number;
  weight: number;
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
      <TableCell>{order}</TableCell>
      {scheme === SCHEME.REPS || scheme === SCHEME.TIME ? null : (
        <TableCell>
          <Input
            className="w-20"
            type="number"
            value={value?.weight}
            name={`${name}[weight]`}
            min="0"
          />
        </TableCell>
      )}
      {scheme === SCHEME.TIME ? (
        <TableCell>
          <Input type="number" min="0" name={`${name}[time]`} />
        </TableCell>
      ) : (
        <TableCell>
          <Input type="number" min="0" name={`${name}[reps]`} />
        </TableCell>
      )}
    </TableRow>
  );
}
