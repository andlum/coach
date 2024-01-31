import { SCHEME, ExerciseSet } from "@prisma/client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import MovementFormRow from "./MovementFormRow";

export default function MovementForm({
  name,
  schemes,
  initialSets,
}: {
  name?: string;
  schemes?: SCHEME[];
  initialSets?: ExerciseSet[];
}) {
  const [sets, setSets] = useState<any[]>(initialSets || [{}]);

  return (
    <Table>
      <TableHeader>
        <TableHead>Set</TableHead>
        {/* <TableHead>Variation</TableHead> */}
        {schemes?.map((scheme) => <TableHead key={scheme}>{scheme}</TableHead>)}
        {/* // {scheme === SCHEME.REPS || scheme === SCHEME.TIME ? null : (
        //   <TableHead>+lbs</TableHead>
        // )}
        // {scheme === SCHEME.TIME ? (
        //   <TableHead>Time</TableHead>
        // ) : (
        //   <TableHead>Reps</TableHead>
        // )} */}
      </TableHeader>
      <TableBody>
        {sets.map((set, i) => {
          return (
            <MovementFormRow
              key={i}
              name={`${name}[sets][${i}]`}
              order={i + 1}
              schemes={schemes}
              value={set.value}
            />
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow className="p-2">
          <TableCell colSpan={3} className="text-right ">
            <Button
              className="w-full"
              type="button"
              onClick={() => setSets((prev) => [...prev, {}])}
            >
              + Add Set
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
