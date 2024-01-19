"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const exerciseFormSchema = z.object({
  name: z.string(),
  scheme: z.enum(["reps", "weight", "duration"]),
  force: z.enum(["push", "pull", "legs", "hinge", "core", "rotation"]),
  equipment: z.enum(["barbell", "dumbbell"]),
  mechanic: z.enum(["compound", "isolation"]),
});

type ExerciseFormValues = z.infer<typeof exerciseFormSchema>;

const defaultValues: Partial<ExerciseFormValues> = {
  name: "",
  scheme: "reps",
  force: "push",
  equipment: "barbell",
  mechanic: "compound",
};

export default function ExerciseForm() {
  const form = useForm<ExerciseFormValues>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ExerciseFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="scheme"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scheme</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Scheme" />
                </SelectTrigger>
                <SelectContent className="w-[180px] z-2">
                  <SelectGroup>
                    <SelectItem value="reps">Reps</SelectItem>
                    <SelectItem value="weight">Reps x Weight</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
