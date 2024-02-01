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
import { Link } from "@remix-run/react";
import { Cross2Icon } from "@radix-ui/react-icons";

export type ExerciseSelectData = Pick<Exercise, "name" | "slug" | "schemes">;

export default function ExerciseModal({
  onAdd,
}: {
  onAdd: (exercises: ExerciseSelectData[]) => void;
}) {
  const [selected, setSelected] = useState<ExerciseSelectData[]>([]);

  const clearSelections = () => {
    setSelected([]);
  };

  const handleAdd = () => {
    // Add selected exercises to the parent component
    onAdd?.(selected);

    // Clear the current selection
    clearSelections();
  };

  const handleSelect = (exercise: ExerciseSelectData) => {
    setSelected((prev) => [...prev, exercise]);
  };

  const handleRemove = (i: number) => {
    setSelected(selected.filter((_, j) => j !== i));
  };

  return (
    <Dialog onOpenChange={clearSelections}>
      <DialogTrigger asChild>
        <Button>Add Exercises</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80%]">
        <DialogHeader row className="justify-between">
          <Button variant="link">
            <Link to="/exercises/new" target="_blank">
              New
            </Link>
          </Button>
          {selected.length > 0 ? (
            <DialogClose>
              <Button onClick={handleAdd}>
                Add {selected.length > 1 ? `(${selected.length})` : null}
              </Button>{" "}
            </DialogClose>
          ) : null}
          {/* Hacky way to align second div at center without gnarly CSS */}
          <div className="w-14"></div>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Search exercises..." />
          <CommandEmpty>No exercises found.</CommandEmpty>
          <ExerciseList onSelect={handleSelect}>
            {selected.length > 0 ? (
              <CommandGroup heading="Selected">
                {selected.map((exercise: ExerciseSelectData, i) => {
                  return (
                    <CommandItem
                      className="bg-primary/10 aria-selected:bg-primary/10"
                      key={exercise.slug}
                      value={exercise.slug}
                      onSelect={() => handleRemove(i)}
                    >
                      {i + 1}. {exercise.name}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
          </ExerciseList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
