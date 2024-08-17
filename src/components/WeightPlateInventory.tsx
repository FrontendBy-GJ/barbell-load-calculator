import { ChangeEvent } from "react";
import useWeightPlatesContext from "../hooks/useWeightPlatesContext";

export default function WeightPlateInventory() {
  const { platesAvailable, setPlatesAvailable } = useWeightPlatesContext();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    weight: number,
  ) => {
    setPlatesAvailable({
      ...platesAvailable,
      [weight]: Number(e.target.value),
    });
  };

  return (
    <>
      <div className="flex flex-col items-center bg-blue-300 px-4 font-semibold">
        <span className="pt-4 text-lg">Inventory</span>
        <div className="flex w-full justify-between py-2">
          <span>Weight (lb)</span>
          <span>Available</span>
        </div>
      </div>
      <div className="space-y-4 px-4 py-4">
        {Object.entries(platesAvailable)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([weight, amount]) => (
            <div
              key={weight}
              className="flex h-10 items-center justify-between"
            >
              <label htmlFor={weight} className="w-8">
                {weight}
              </label>
              <input
                type="number"
                name="plate_avail"
                id={weight}
                min={0}
                value={amount}
                onChange={(e) => handleInputChange(e, Number(weight))}
                className="h-full w-16 rounded p-2"
              />
            </div>
          ))}
      </div>
    </>
  );
}
