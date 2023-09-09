import { Orbitron } from "next/font/google";
import { FormEvent, useState } from "react";

const OrbitronFont = Orbitron({ subsets: ["latin"] });

type SizeSelectorProps = {
  canvasSize: Record<number, number>;
  onSizeSelect: (size: Record<number, number>) => void;
};

const SizeSelector = ({
  canvasSize,
  onSizeSelect,
}: SizeSelectorProps): React.ReactElement => {
  const [errorString, setErrorString] = useState(" ");

  const handleSizeSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const rowField = form.elements.namedItem("row_count") as HTMLInputElement;
    const colField = form.elements.namedItem("col_count") as HTMLInputElement;

    const row = !!rowField.value ? Number(rowField.value) : canvasSize[0];
    const col = !!colField.value ? Number(colField.value) : canvasSize[1];

    if (row > 64 && col > 64) {
      setErrorString("Row & Column should not exceed 64");
      return;
    } else if (row > 64) {
      setErrorString("Row should not exceed 64");
      return;
    } else if (col > 64) {
      setErrorString("Column should not exceed 64");
      return;
    }

    if (row !== canvasSize[0] || col !== canvasSize[1]) {
      onSizeSelect([row, col]);
    }
    rowField.value = "";
    colField.value = "";
    setErrorString(" ");
  };

  return (
    <div>
      <form onSubmit={handleSizeSubmit} className="flex flex-col gap-y-5">
        <div className="flex justify-center items-center">
          <p className={`mr-2 text-white text-2xl ${OrbitronFont.className}`}>
            R :
          </p>
          <input
            name="row_count"
            placeholder={`${canvasSize[0]}`}
            className="w-10 mr-8 py-2 text-center bg-transparent placeholder:text-teal-700 text-teal-500 border-b border-solid border-teal-500 focus:outline-none text-2xl"
            maxLength={2}
          />
          <p className={`mr-2 text-white text-2xl ${OrbitronFont.className}`}>
            C :
          </p>
          <input
            name="col_count"
            placeholder={`${canvasSize[1]}`}
            className="w-10 mr-8 py-2 text-center bg-transparent placeholder:text-teal-700 text-teal-500 border-b border-solid border-teal-500 focus:outline-none text-2xl"
            maxLength={2}
          />
          <input
            type="submit"
            value="Resize"
            className="flex justify-center items-center py-2 px-5 cursor-pointer rounded-md border border-solid border-teal-500 text-slate-200 hover:bg-teal-500 hover:text-zinc-800 hover:border-transparent transition duration-300 ease-in"
          />
        </div>
        <div className="flex justify-center items-center text-red-500">
          {errorString}
        </div>
      </form>
    </div>
  );
};

export default SizeSelector;
