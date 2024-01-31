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
  schemes,
  value,
}: {
  name?: string;
  schemes: SCHEME[];
  order?: number;
  value?: SetValue;
}) {
  return (
    <TableRow>
      <TableCell className="text-center">{order}</TableCell>
      {schemes.includes(SCHEME.WEIGHT) ? (
        <TableCell>
          <Input
            className="w-20 mx-auto"
            type="number"
            defaultValue={value?.weight}
            name={`${name}[weight]`}
            min="0"
          />
        </TableCell>
      ) : null}
      {schemes.includes(SCHEME.TIME) ? (
        <TableCell>
          <Input
            className="w-20 mx-auto"
            type="number"
            min="0"
            name={`${name}[time]`}
            defaultValue={value?.time}
          />
        </TableCell>
      ) : null}
      {schemes.includes(SCHEME.REPS) ? (
        <TableCell>
          <Input
            className="w-20 mx-auto"
            type="number"
            min="0"
            defaultValue={value?.reps}
            name={`${name}[reps]`}
          />
        </TableCell>
      ) : null}
    </TableRow>
  );
}
