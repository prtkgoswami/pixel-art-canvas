import { ColorStrings } from "@/app/page";
import { useEffect } from "react";
import { INITIAL_COLOR } from "../const";

type CanvasProps = {
  canvasSize: Record<number, number>;
  selectedColor: ColorStrings;
  shouldReset: boolean;
  setShouldReset: (flag: boolean) => void;
  canvasMatrix: string[][];
  setCanvasMatrix: (cmatrix: string[][]) => void;
};

const Canvas = ({
  canvasSize,
  selectedColor = INITIAL_COLOR,
  shouldReset,
  setShouldReset,
  canvasMatrix,
  setCanvasMatrix,
}: CanvasProps): React.ReactElement => {
  const isSmallIcon = canvasSize[0] > 32 || canvasSize[1] > 32;

  const resetCanvas = () => {
    const matrix: string[][] = [];
    [...Array.from({ length: canvasSize[0] })].forEach((_, rowIndex) => {
      const row: string[] = [];
      [...Array.from({ length: canvasSize[1] })].forEach((_, colIndex) => {
        row.push(INITIAL_COLOR.rgb);
      });
      matrix.push([...row]);
    });

    setCanvasMatrix(matrix);
  };

  useEffect(() => {
    resetCanvas();
  }, [canvasSize]);

  useEffect(() => {
    if (shouldReset) {
      resetCanvas();
      setShouldReset(false);
    }
  }, [shouldReset]);

  const onCellClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    row: number,
    col: number
  ) => {
    const target = event.target as HTMLElement;
    if (target) {
      const currentMatrix = [...canvasMatrix];
      currentMatrix[row][col] = selectedColor.rgb;
      setCanvasMatrix(currentMatrix);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center grow overflow-auto bg-zinc-700">
      {canvasMatrix.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex flex-row">
          {row.map((colorStr, colIndex) => (
            <div
              key={`cell-${rowIndex}-${colIndex}`}
              className={`flex ${
                isSmallIcon ? "w-4 h-4" : "w-8 h-8"
              } border border-solid border-slate-400`}
              onClick={(e) => onCellClick(e, rowIndex, colIndex)}
              style={{ backgroundColor: colorStr }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Canvas;
