import { useEffect, useRef } from "react";

type WeightPlateAlertDialogProps = {
  open: boolean;
  closeDialog: () => void;
};

export default function WeightPlateAlertDialog({
  open,
  closeDialog,
}: WeightPlateAlertDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={closeDialog}
      className="w-full max-w-xs rounded-lg outline outline-[3px] outline-blue-600 md:max-w-xl"
    >
      <header className="font-Bebas bg-blue-600 px-4 py-3 text-3xl tracking-wider text-slate-50">
        Sorry!
      </header>
      <form method="dialog" className="divide-y divide-black/50 px-4 py-5">
        <p>Insufficient weight plates available.</p>
        <footer className="mt-6 flex items-center md:justify-end">
          <button
            type="button"
            onClick={closeDialog}
            className="mt-4 flex-1 rounded bg-blue-600 px-6 py-2 text-slate-50 md:flex-none"
          >
            Close
          </button>
        </footer>
      </form>
    </dialog>
  );
}
