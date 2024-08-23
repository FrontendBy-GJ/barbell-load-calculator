import { createContext, ReactNode, useEffect, useState } from "react";

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

const initialPlatesAvailable: {
  [key: number]: number;
} = {
  55: 0,
  45: 2,
  35: 2,
  25: 2,
  15: 0,
  10: 2,
  5: 4,
  2.5: 2,
};

export const WeightPlateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [platesAvailable, setPlatesAvailable] = useState(() => {
    try {
      const savedPlates = localStorage.getItem("platesAvailable");
      return savedPlates ? JSON.parse(savedPlates) : initialPlatesAvailable;
    } catch (error) {
      console.error("Error parsing platesAvailable", error);
      return initialPlatesAvailable;
    }
  });

  const [platesNeeded, setPlatesNeeded] = useState<Map<number, number>>(
    new Map(),
  );
  const [totalWeight, setTotalWeight] = useState<number>(() => {
    try {
      const savedTotalWeight = localStorage.getItem("totalWeight");
      return savedTotalWeight ? JSON.parse(savedTotalWeight) : 225;
    } catch (error) {
      console.error("Error parsing totalWeight", error);
      return 225;
    }
  });
  const [targetWeight, setTargetWeight] = useState<string>("");
  const [percentage, setPercentage] = useState(() => {
    try {
      const savedPercentage = localStorage.getItem("percentage");
      return savedPercentage ? JSON.parse(savedPercentage) : 100;
    } catch (error) {
      console.error("Error parsing percentage", error);
      return 100;
    }
  });
  const [barWeight, setBarWeight] = useState(() => {
    try {
      const savedBarWeight = localStorage.getItem("barWeight");
      return savedBarWeight ? JSON.parse(savedBarWeight) : 45;
    } catch (error) {
      console.error("Error parsing barWeight");
      return 45;
    }
  });

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

  useEffect(() => {
    localStorage.setItem("platesAvailable", JSON.stringify(platesAvailable));
  }, [platesAvailable]);
  useEffect(() => {
    localStorage.setItem("totalWeight", JSON.stringify(totalWeight));
  }, [totalWeight]);
  useEffect(() => {
    localStorage.setItem("percentage", JSON.stringify(percentage));
  }, [percentage]);
  useEffect(() => {
    localStorage.setItem("barWeight", JSON.stringify(barWeight));
  }, [barWeight]);

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
