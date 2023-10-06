import { useEffect, useState } from "react";
import { ColorStrings } from "../page";

type ColorHolderProps = {
  activeColor: ColorStrings;
};

const ColorSample = ({ activeColor }: ColorHolderProps): React.ReactElement => {
  const [position, setPosition] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ left: e.clientX, top: e.clientY });
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      className="absolute h-8 w-8 border-2 border-solid border-zinc-900 rounded-full pointer-events-none"
      style={{
        backgroundColor: activeColor.rgb,
        top: position.top + 15,
        left: position.left + 13,
      }}
    ></div>
  );
};

export default ColorSample;
