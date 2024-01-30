import { useState } from "react";

export default function ActivitySelect({
  onChange,
  initialValue = "lifting",
}: {
  initialValue?: string;
  onChange: (activity: string) => void;
}) {
  const [activity, setActivity] = useState<string>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActivity(e.target.value);
    onChange(e.target.value);
  };

  return (
    <label>
      <span>Activity: </span>
      <select name="activity" onChange={handleChange} defaultValue={activity}>
        <option value="climbing">Climbing</option>
        <option value="lifting">Weightlifting</option>
        <option value="running">Running</option>
        <option value="yoga">Yoga</option>
      </select>
    </label>
  );
}
