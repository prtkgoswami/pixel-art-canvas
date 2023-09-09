import { ColorStrings } from "@/app/page";
import iro from "@jaames/iro";
import { useEffect, useRef, useState } from "react";
import { INITIAL_COLOR } from "../const";
import ColorCell from "./ColorCell";

type ColorPaletteProps = {
  onSelectColor: (color: ColorStrings) => void;
};

const ColorPalette = ({
  onSelectColor,
}: ColorPaletteProps): React.ReactElement => {
  const colorPickerRef = useRef(null);
  const [colorList, setColorList] = useState<ColorStrings[]>(
    Array(10).fill(INITIAL_COLOR)
  );
  const [selectedCellIndex, setSelectedCellIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] =
    useState<ColorStrings>(INITIAL_COLOR);

  const onCellSelect = (index: number) => {
    setSelectedCellIndex(index);
    onSelectColor(colorList[index]);
  };

  useEffect(() => {
    if (colorPickerRef.current) {
      const colorPicker = iro.ColorPicker(colorPickerRef.current, {
        // Options here (see https://iro.js.org/guide.html#options)
        margin: 30,
      });

      // Example: Listen to color changes
      colorPicker.on("color:change", (color: iro.Color) => {
        setSelectedColor({
          rgb: color.rgbString,
          hex: color.hexString,
          hsl: color.hslString,
        });
      });
    }
  }, []);

  useEffect(() => {
    const currArr = [
      ...colorList.slice(0, selectedCellIndex),
      selectedColor,
      ...colorList.slice(selectedCellIndex + 1),
    ];
    setColorList(currArr);
    onSelectColor(colorList[selectedCellIndex]);
  }, [selectedColor]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div ref={colorPickerRef}></div>
      <div className="grid grid-cols-5 gap-5">
        {colorList.map((color, index) => (
          <ColorCell
            key={`color-${index}`}
            color={color}
            index={index}
            isSelected={index === selectedCellIndex}
            onCellSelect={onCellSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
