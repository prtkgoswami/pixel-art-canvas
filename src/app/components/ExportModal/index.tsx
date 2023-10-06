import { ExportItems } from "@/app/page";
import { XMarkIcon } from "@heroicons/react/20/solid";
import {
  ArrowDownTrayIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";
import { Orbitron } from "next/font/google";
import { useEffect, useState } from "react";
const OrbitronFont = Orbitron({ subsets: ["latin"] });

type ExportModalProps = {
  exportItems: ExportItems;
  onFormSubmit: (event: React.FormEvent) => void;
  onCloseClick: () => void;
  isDownloadMode?: boolean;
};

const ExportModal = ({
  exportItems,
  onFormSubmit,
  onCloseClick,
  isDownloadMode = true,
}: ExportModalProps): React.ReactElement => {
  const [isCopyNotifShown, setCopyNotifShown] = useState<boolean>(false);

  const onCopyClick = () => {
    navigator.clipboard.writeText(exportItems.stringContent ?? "");
    setCopyNotifShown(true);
  };

  useEffect(() => {
    if (isCopyNotifShown) {
      setTimeout(() => {
        setCopyNotifShown(false);
      }, 1000);
    }
  }, [isCopyNotifShown]);

  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-20 flex justify-center items-center bg-zinc-900/75">
      <div className="lg:w-1/2 p-5 bg-zinc-800 flex flex-col rounded-lg gap-5 items-center border-4 border-solid border-teal-500">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="text-teal-500 text-xl">Download Link</div>
          <div
            className="text-teal-500 text-md p-1 border border-solid border-teal-500 rounded-md cursor-pointer hover:border-transparent hover:bg-teal-100 hover:text-zinc-800 transition-all duration-300 ease-in"
            onClick={onCloseClick}
          >
            <XMarkIcon className="h-6 w-6" />
          </div>
        </div>
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col items-start gap-y-5 w-4/5"
        >
          <div className="flex gap-x-5">
            <div className="text-xl text-zinc-200">File Name: </div>
            <input
              name="export_file_name"
              placeholder="pixel_art"
              className="py-2 px-5 bg-transparent placeholder:text-teal-700 text-teal-500 border border-solid border-teal-500 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex gap-x-5">
            <div className="text-xl text-zinc-200">Pixel Size: </div>
            <input
              name="export_pixel_size"
              placeholder="2"
              className="py-2 px-5 bg-transparent placeholder:text-teal-700 text-teal-500 border border-solid border-teal-500 rounded-md focus:outline-none"
              maxLength={2}
            />
          </div>
          {isDownloadMode ? (
            <div className="flex w-full justify-end gap-x-3">
              <button
                type="submit"
                className="flex items-center py-2 px-5 cursor-pointer rounded-md border border-solid border-teal-500 text-slate-200 hover:bg-teal-500 hover:text-zinc-800 hover:border-transparent transition duration-300 ease-in"
              >
                Create SVG
              </button>
              <a
                href={exportItems.url}
                download={exportItems.fileName}
                className={`flex py-2 px-5 cursor-pointer rounded-md border border-solid ${
                  exportItems.url
                    ? "text-teal-500 border-teal-500 hover:bg-teal-500 hover:text-zinc-800 hover:border-transparent"
                    : "text-zinc-500 border-zinc-500"
                }   transition duration-300 ease-in`}
              >
                <ArrowDownTrayIcon className="h-7 w-7 text-inherit" />
              </a>
            </div>
          ) : (
            <>
              <div className="flex w-full justify-end gap-x-3">
                <button
                  type="submit"
                  className="flex items-center py-2 px-5 cursor-pointer rounded-md border border-solid border-teal-500 text-slate-200 hover:bg-teal-500 hover:text-zinc-800 hover:border-transparent transition duration-300 ease-in"
                >
                  Create SVG
                </button>
              </div>
              <div className="flex w-full">
                <div className="flex flex-col p-5 pt-0 flex-grow overflow-auto gap-y-3">
                  <div className="flex justify-between items-center">
                    <p
                      className={`text-xl text-teal-500 border-b-0 border-solid border-teal-500 pb-2 ${OrbitronFont.className}`}
                    >
                      Generated SVG
                    </p>
                    <DocumentDuplicateIcon
                      className="h-6 w-6 text-teal-500 hover:text-teal-100 transition-colors duration-300 cursor-pointer"
                      onClick={onCopyClick}
                    />
                  </div>
                  <div className="relative bg-slate-100 rounded-md p-5 flex-grow overflow-auto border-4 border-solid border-teal-500 h-96">
                    <p className="w-full h-full break-words">
                      {exportItems.stringContent}
                    </p>
                    {isCopyNotifShown && (
                      <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
                        <p className="px-5 py-3 bg-zinc-800 text-teal-500 rounded-full">
                          Copied to Clipboard!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ExportModal;
