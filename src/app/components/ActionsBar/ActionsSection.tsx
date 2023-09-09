import { IS_EXPORT_ENABLED } from "../const";

type ActionsSectionProps = {
  onResetClick: () => void;
  onExportClick: () => void;
};

const ActionsSection = ({
  onResetClick,
  onExportClick,
}: ActionsSectionProps): React.ReactElement => {
  return (
    <div className="flex justify-center items-center gap-5">
      <div
        className="flex justify-center items-center py-2 px-5 border border-solid border-teal-500 text-slate-200 cursor-pointer rounded-md hover:bg-teal-500 hover:text-zinc-800 hover:border-transparent transition duration-300 ease-in relative"
        onClick={onResetClick}
      >
        Clear Canvas
      </div>

      {IS_EXPORT_ENABLED && (
        <div
          className="flex justify-center items-center py-2 px-5 border border-solid border-teal-500 text-slate-200 cursor-pointer rounded-md hover:bg-teal-500 hover:text-zinc-800 hover:border-transparent transition duration-300 ease-in"
          onClick={onExportClick}
        >
          Export
        </div>
      )}
    </div>
  );
};

export default ActionsSection;
