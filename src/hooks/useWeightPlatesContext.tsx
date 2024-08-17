import { useContext } from "react";
import { WeightPlateContext } from "../context/WeightPlateContext";

export default function useWeightPlatesContext() {
  const context = useContext(WeightPlateContext);

  if (!context) {
    throw new Error(
      "useWeightPlateContext must be used within a WeightPlateContext.Provider",
    );
  }

  return context;
}
