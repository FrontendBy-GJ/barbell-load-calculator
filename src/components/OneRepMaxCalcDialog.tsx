import { useRef, useState } from "react";

export default function OneRepMaxCalcDialog() {
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [oneRepMax, setOneRepMax] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close1RMdialog = () => {
    dialogRef.current?.close();
    setWeight(0);
    setReps(0);
    setOneRepMax(null);
  };

  const handleCalculate = () => {
    if (weight > 0 && reps > 0) {
      setOneRepMax(weight * (1 + reps / 30));
    } else {
      setOneRepMax(null);
    }
  };

  const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];

  return (
    <>
      <button
        aria-label="One Rep Max"
        onClick={() => dialogRef.current?.showModal()}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-blue-600 px-4 py-2 text-slate-50 shadow-lg hover:bg-blue-700 md:bottom-8 md:right-8"
      >
        1RM
      </button>

      <dialog ref={dialogRef}>
        <header className="text-center">
          <h2>1 Rep Max Calculator</h2>
        </header>
        <form method="dialog">
          <div>
            <label htmlFor="weight">Weight Lifted (lbs):</label>
            <input
              type="number"
              inputMode="numeric"
              autoComplete="off"
              min={0}
              id="weight"
              value={weight || ""}
              onChange={(e) => {
                const value = e.target.value;
                setWeight(value === "" ? ("" as unknown as number) : +value);
              }}
            />
          </div>
          <div>
            <label htmlFor="reps">Number of Repetitions:</label>
            <input
              type="number"
              id="reps"
              inputMode="numeric"
              autoComplete="off"
              min={0}
              value={reps || ""}
              onChange={(e) => {
                const value = e.target.value;
                setReps(value === "" ? ("" as unknown as number) : +value);
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleCalculate}
            disabled={weight <= 0 || reps <= 0}
          >
            Calculate
          </button>

          <div>
            <h3>Your Estimated 1RM: {oneRepMax?.toFixed(2)} lbs</h3>
            {oneRepMax && (
              <table>
                <thead>
                  <tr>
                    <th>Percentage</th>
                    <th>Weight (lbs)</th>
                  </tr>
                </thead>
                <tbody>
                  {percentages.map((pct) => (
                    <tr key={pct}>
                      <td>{pct}%</td>
                      <td>{(oneRepMax * (pct / 100)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <footer>
            <button type="button" onClick={close1RMdialog}>
              Close
            </button>
          </footer>
        </form>
      </dialog>
    </>
  );
}
