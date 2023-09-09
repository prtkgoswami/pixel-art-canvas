import { ColorStrings } from "@/app/page";
import iro from "@jaames/iro";

type ColorCellProps = {
  color: ColorStrings;
  index: number;
  isSelected: boolean;
  onCellSelect: (index: number) => void;
};

const ColorCell = ({
  color,
  index,
  isSelected,
  onCellSelect,
}: ColorCellProps): React.ReactElement => {
  return (
    <div
      className={`w-12 h-10 p-1 ${
        isSelected ? `border-2 border-teal-500` : `border border-transparent`
      } border-solid rounded`}
      onClick={() => onCellSelect(index)}
    >
      <div
        className="w-full h-full rounded-sm"
        style={{ backgroundColor: color.rgb }}
        title={`RGB: ${color.rgb} ${!!color.hex ? `\nHex: ${color.hex}` : ``} ${
          !!color.hsl ? `\nHSL: ${color.hsl}` : ``
        }`}
      ></div>
    </div>
  );
};

export default ColorCell;
