import { ChangeEvent, useEffect, useState } from "react";
import useWeightPlatesContext from "../hooks/useWeightPlatesContext";
import { cn } from "../lib/utils";

export default function WeightPlateInventory() {
  const { platesAvailable, setPlatesAvailable } = useWeightPlatesContext();
  const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(() => {
    try {
      const isOpen = localStorage.getItem("isInventoryOpen");
      return isOpen ? JSON.parse(isOpen) : false;
    } catch (error) {
      return false;
    }
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    weight: number,
  ) => {
    const value = e.target.value;
    setPlatesAvailable({
      ...platesAvailable,
      [weight]: value === "" ? ("" as unknown as number) : Number(value),
    });
  };

  useEffect(() => {
    localStorage.setItem("isInventoryOpen", JSON.stringify(isInventoryOpen));
  }, [isInventoryOpen]);

  return (
    <>
      <div className="flex flex-col items-center px-4 font-semibold bg-blue-300">
        <span className="pt-4 text-lg">Inventory</span>
        <div className="flex justify-between w-full py-2">
          <span>Weight (lb)</span>
          <span>Available</span>
        </div>
      </div>
      <div
        aria-expanded={isInventoryOpen ? "true" : "false"}
        className={cn(
          isInventoryOpen
            ? "visible h-auto space-y-4 pt-4"
            : "hidden h-0 overflow-clip",
          "px-4 transition-all duration-300",
        )}
      >
        {Object.entries(platesAvailable)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([weight, amount]) => (
            <div
              key={weight}
              className="flex items-center justify-between h-10"
            >
              <label htmlFor={weight} className="w-8">
                {weight}
              </label>
              <input
                type="number"
                inputMode="numeric"
                autoComplete="off"
                name="plate_avail"
                id={weight}
                min={0}
                value={amount}
                onChange={(e) => handleInputChange(e, Number(weight))}
                className="w-16 h-full p-2 rounded"
              />
            </div>
          ))}
      </div>
      <button
        aria-label="Toggle Inventory"
        title={!isInventoryOpen ? "Open Inventory" : "Close Inventory"}
        className="mx-auto my-4 block w-[95%] rounded-md bg-slate-200 py-1.5"
        onClick={() => setIsInventoryOpen(!isInventoryOpen)}
      >
        <svg
          aria-hidden="true"
          className={cn(
            isInventoryOpen ? "rotate-0" : "rotate-180",
            "transition-rotate mx-auto h-7 stroke-2 duration-300",
          )}
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 15l6-6 6 6" stroke="#000" />
        </svg>
      </button>
    </>
  );
}
