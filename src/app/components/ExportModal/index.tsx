import { ExportItems } from "@/app/page";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

type ExportModalProps = {
  exportItems: ExportItems;
  onFormSubmit: (event: React.FormEvent) => void;
  onCloseClick: () => void;
};

const ExportModal = ({
  exportItems,
  onFormSubmit,
  onCloseClick,
}: ExportModalProps): React.ReactElement => {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-20 flex justify-center items-center bg-zinc-900/75">
      <div className="w-1/4 p-5 bg-zinc-800 flex flex-col rounded-lg gap-5 items-center border-4 border-solid border-teal-500">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="text-teal-500 text-xl">Download Link</div>
          <div
            className="text-teal-500 text-md p-1 border border-solid border-teal-500 rounded-md cursor-pointer hover:border-transparent hover:bg-red-600 hover:text-zinc-800 transition-all duration-300 ease-in"
            onClick={onCloseClick}
          >
            <XMarkIcon className="h-6 w-6" />
          </div>
        </div>
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col items-center gap-y-5 w-3/4"
        >
          <div className="flex gap-x-5">
            <div className="text-xl text-zinc-200">File Name: </div>
            <input
              name="export_file_name"
              placeholder="pixel_art"
              className="text-center bg-transparent placeholder:text-teal-700 text-teal-500 border border-solid border-teal-500 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex gap-x-5">
            <div className="text-xl text-zinc-200">Pixel Size: </div>
            <input
              name="export_pixel_size"
              placeholder="2"
              className="text-center bg-transparent placeholder:text-teal-700 text-teal-500 border border-solid border-teal-500 rounded-md focus:outline-none"
              maxLength={2}
            />
          </div>
          <div className="flex w-full justify-end">
            <button
              type="submit"
              className="flex py-2 px-5 cursor-pointer rounded-md border border-solid border-teal-500 text-slate-200 hover:bg-teal-500 hover:text-zinc-800 hover:border-transparent transition duration-300 ease-in"
            >
              Export
            </button>
          </div>
        </form>
        {exportItems.url && (
          <div className="flex flex-grow justify-center items-center">
            <a
              href={exportItems.url}
              download={exportItems.fileName}
              className="text-2xl text-teal-500 flex item-center gap-x-3"
            >
              Click to Download
              <ArrowDownTrayIcon className="h-7 w-7 text-inherit" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportModal;
