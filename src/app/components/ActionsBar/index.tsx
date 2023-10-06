import { ColorStrings, ExportModalState } from "@/app/page";
import { Orbitron } from "next/font/google";
import ActionsSection from "./ActionsSection";
import ColorPalette from "./ColorPalette";
import SizeSelector from "./SizeSelector";

type ActionsBarProps = {
  canvasSize: Record<number, number>;
  onSizeSelect: (size: Record<number, number>) => void;
  onSelectColor: (color: ColorStrings) => void;
  setShouldReset: (flag: boolean) => void;
  onExportClick: (exportState: ExportModalState) => void;
  // svgContent: string;
};

const ActionsBar = ({
  canvasSize,
  onSizeSelect,
  onSelectColor,
  setShouldReset,
  onExportClick,
}: // svgContent,
ActionsBarProps): React.ReactElement => {
  const handleResetClick = () => {
    setShouldReset(true);
  };

  return (
    <div className="flex flex-col lg:w-1/4 md:min-w-1/4 px-8 py-4 gap-y-6 bg-zinc-800 min-h-screen h-full">
      <SizeSelector canvasSize={canvasSize} onSizeSelect={onSizeSelect} />
      <ColorPalette onSelectColor={onSelectColor} />
      <ActionsSection
        onResetClick={handleResetClick}
        onExportClick={onExportClick}
      />
      {/* <div className="flex flex-col p-5 flex-grow overflow-auto gap-y-3">
        <p
          className={`text-xl text-teal-500 border-b-0 border-solid border-teal-500 pb-2 ${OrbitronFont.className}`}
        >
          Generated SVG
        </p>
        <div className=" bg-slate-100 rounded-md p-5 flex-grow overflow-auto border-4 border-solid border-teal-500">
          <p className="w-full h-full break-words">{svgContent}</p>
        </div>
      </div> */}
    </div>
  );
};

export default ActionsBar;
