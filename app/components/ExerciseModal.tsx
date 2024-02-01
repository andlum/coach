// import { Button } from "@/components/ui/button";
import { Exercise } from "@prisma/client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExerciseList } from "~/routes/api.exercises";

export type ExerciseSelectData = Pick<Exercise, "name" | "slug" | "schemes">;

export default function ExerciseModal({
  onAdd,
}: {
  onAdd: (exercises: ExerciseSelectData[]) => void;
}) {
  const [selected, setSelected] = useState<ExerciseSelectData[]>([]);

  const handleAdd = () => {
    // Add selected exercises to the parent component
    onAdd?.(selected);
    // Clear the current selection
    setSelected([]);
  };

  const handleSelect = (exercise: ExerciseSelectData) => {
    setSelected((prev) => [...prev, exercise]);
  };

  const handleRemove = (i: number) => {
    setSelected(selected.filter((_, j) => j !== i));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Exercises</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80%]">
        <DialogHeader>
          {/* Create new exercise */}
          {selected.length > 0 ? (
            <DialogClose>
              <Button onClick={handleAdd}>
                Add {selected.length > 1 ? `(${selected.length})` : null}
              </Button>{" "}
            </DialogClose>
          ) : null}
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Search exercises..." />
          <CommandEmpty>No exercises found.</CommandEmpty>
          {selected.length > 0 ? (
            <CommandGroup heading="Selected">
              {selected.map((exercise: ExerciseSelectData, i) => {
                return (
                  <CommandItem
                    key={exercise.slug}
                    value={exercise.slug}
                    onSelect={() => handleRemove(i)}
                  >
                    {exercise.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ) : null}
          <ExerciseList onSelect={handleSelect} />
        </Command>
      </DialogContent>
    </Dialog>
  );
}
