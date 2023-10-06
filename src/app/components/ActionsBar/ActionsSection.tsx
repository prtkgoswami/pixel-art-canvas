import { ExportModalState, ExportMode } from "@/app/page";
import { IS_EXPORT_ENABLED } from "../const";

type ActionsSectionProps = {
  onResetClick: () => void;
  onExportClick: (exportMode: ExportModalState) => void;
};

const ActionsSection = ({
  onResetClick,
  onExportClick,
}: ActionsSectionProps): React.ReactElement => {
  const onDownloadClick = () => {
    onExportClick({
      shouldShow: true,
      exportMode: ExportMode.DownloadSVG,
    });
  };

  const onGenerateClick = () => {
    onExportClick({
      shouldShow: true,
      exportMode: ExportMode.GenerateSVG,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center flex-wrap gap-y-5">
      <div
        className="w-full text-center py-2 border border-solid border-teal-500 text-slate-200 cursor-pointer rounded-md hover:bg-teal-500 hover:text-zinc-800 hover:border-transparent transition duration-300 ease-in relative"
        onClick={onResetClick}
      >
        Clear Canvas
      </div>
      <div className="w-full flex justify-between gap-3">
        {IS_EXPORT_ENABLED && (
          <div
            className="basis-0 grow text-center py-2 px-5 border border-solid border-teal-500 text-slate-200 cursor-pointer rounded-md hover:bg-teal-500 hover:text-zinc-800 hover:border-transparent transition duration-300 ease-in"
            onClick={onGenerateClick}
          >
            Generate SVG
          </div>
        )}
        {IS_EXPORT_ENABLED && (
          <div
            className="basis-0 grow text-center py-2 border border-solid border-teal-500 text-slate-200 cursor-pointer rounded-md hover:bg-teal-500 hover:text-zinc-800 hover:border-transparent transition duration-300 ease-in"
            onClick={onDownloadClick}
          >
            Download SVG
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionsSection;
