import { useEffect, useState } from "react";
import { bundlerModuleNameResolver } from "typescript";

type TabbedExportProps = {
  tabTitles: string[];
  tabContents: string[];
};

const TabbedExport = ({
  tabTitles,
  tabContents,
}: TabbedExportProps): React.ReactElement => {
  const [tabShowState, setTabShowState] = useState<boolean[]>();

  const setActiveTab = (activeIndex: number) => {
    const currState = Array.from({ length: tabTitles.length }, () => false);
    currState[activeIndex] = true;
    setTabShowState(currState);
  };

  useEffect(() => {
    setActiveTab(0);
  }, []);

  return (
    <div className="flex flex-col p-5 flex-grow overflow-auto">
      <div className="flex w-full gap-x-2">
        {tabTitles.map((title, index) => (
          <div
            key={`tab-${index}`}
            className={`flex justify-center items-center px-5 py-2 ${
              tabShowState?.[index] ? "bg-slate-200" : "bg-slate-500"
            } rounded-t-md text-ellipsis overflow-hidden cursor-pointer`}
            onClick={() => setActiveTab(index)}
          >
            {title}
          </div>
        ))}
      </div>
      {tabShowState?.map((showTab, index) => (
        <>
          {showTab && (
            <div
              key={`tab-content-${index}`}
              className=" bg-slate-100 rounded-b-md rounded-tr-md p-5 flex-grow overflow-auto"
            >
              <p className="w-full h-full break-words">{tabContents[index]}</p>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default TabbedExport;
