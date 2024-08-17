import { createContext, ReactNode, useState } from "react";

type WeightPlateContextType = {
  platesAvailable: { [key: number]: number };
  setPlatesAvailable: React.Dispatch<
    React.SetStateAction<{ [key: number]: number }>
  >;
  totalWeight: number;
  setTotalWeight: React.Dispatch<React.SetStateAction<number>>;
  percentage: number;
  setPercentage: React.Dispatch<React.SetStateAction<number>>;
  barWeight: number;
  setBarWeight: React.Dispatch<React.SetStateAction<number>>;
  targetWeight: string;
  setTargetWeight: React.Dispatch<React.SetStateAction<string>>;
  percentageOfTotalWeight: (percentage: number, weight: number) => number;
  platesNeeded: Map<number, number>;
  setPlatesNeeded: React.Dispatch<React.SetStateAction<Map<number, number>>>;
  weightPlatesNeeded: (target: number, barbell: number) => Map<number, number>;
  finalWeight: (target: number) => number;
};

export const WeightPlateContext = createContext<
  WeightPlateContextType | undefined
>(undefined);

export const WeightPlateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [platesAvailable, setPlatesAvailable] = useState<{
    [key: number]: number;
  }>({
    55: 0,
    45: 2,
    35: 2,
    25: 2,
    15: 0,
    10: 2,
    5: 4,
    2.5: 2,
  });

  const [platesNeeded, setPlatesNeeded] = useState<Map<number, number>>(
    new Map(),
  );
  const [totalWeight, setTotalWeight] = useState<number>(225);
  const [targetWeight, setTargetWeight] = useState<string>("");
  const [percentage, setPercentage] = useState(100);
  const [barWeight, setBarWeight] = useState(45);

  const percentageOfTotalWeight = (percentage: number, weight: number) => {
    return Math.trunc((percentage / 100) * weight);
  };

  const finalWeight = (target: number) => {
    while (target % 5 !== 0) {
      target--;
    }

    return target;
  };

  const weightPlatesNeeded = (target: number, barbell: number) => {
    const plates = Object.keys(platesAvailable)
      .map((p) => Number(p))
      .sort((a, b) => b - a);
    let weight_needed = target - barbell;
    let plates_needed = new Map<number, number>();

    for (let plate of plates) {
      let available = platesAvailable[plate];
      available;
      while (weight_needed >= plate * 2 && available >= 2) {
        plates_needed.set(plate, (plates_needed.get(plate) || 0) + 2);
        available -= 2;
        weight_needed -= plate * 2;
      }
    }

    return plates_needed;
  };

  return (
    <WeightPlateContext.Provider
      value={{
        platesAvailable,
        setPlatesAvailable,
        totalWeight,
        setTotalWeight,
        percentage,
        setPercentage,
        barWeight,
        setBarWeight,
        targetWeight,
        setTargetWeight,
        percentageOfTotalWeight,
        platesNeeded,
        setPlatesNeeded,
        weightPlatesNeeded,
        finalWeight,
      }}
    >
      {children}
    </WeightPlateContext.Provider>
  );
};
