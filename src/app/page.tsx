"use client";
import { SVG } from "@svgdotjs/svg.js";
import { Orbitron } from "next/font/google";
import { useEffect, useState } from "react";
import ActionsBar from "./components/ActionsBar";
import Canvas from "./components/Canvas";
import ExportModal from "./components/ExportModal";
import {
  DEFAULT_FILE_NAME,
  DEFAULT_PIXEL_SIZE,
  INITIAL_COLOR,
} from "./components/const";

const OrbitronFont = Orbitron({ subsets: ["latin"] });

export type ColorStrings = {
  rgb: string;
  hex?: string;
  shortHex?: string;
  hsl?: string;
  hsv?: string;
};

export type ExportItems = {
  stringContent?: string;
  url?: string;
  fileName?: string;
};

export default function Home() {
  const [canvasSize, setCanvasSize] = useState<Record<number, number>>([
    32, 32,
  ]);
  const [canvasMatrix, setCanvasMatrix] = useState<string[][]>([]);
  const [activeColor, setActiveColor] = useState<ColorStrings>(INITIAL_COLOR);
  const [shouldReset, setShouldReset] = useState<boolean>(false);
  const [exportItems, setExportItems] = useState<ExportItems>({});
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  const createSVG = (
    fileName: string = DEFAULT_FILE_NAME,
    pixelSize: number = DEFAULT_PIXEL_SIZE
  ) => {
    const canvasWidth = canvasMatrix[0].length * pixelSize;
    const canvasHeight = canvasMatrix.length * pixelSize;

    // Create an SVG canvas
    const canvas = SVG();
    canvas.size(canvasWidth, canvasHeight);

    // Loop through the pixel art data and create SVG rectangles
    for (let row = 0; row < canvasMatrix.length; row++) {
      for (let col = 0; col < canvasMatrix[row].length; col++) {
        const x = col * pixelSize;
        const y = row * pixelSize;
        const color = canvasMatrix[row][col];

        canvas.rect(pixelSize, pixelSize).move(x, y).fill(color);
      }
    }

    // Convert the SVG to a string
    const svgContent = canvas.svg();

    const blob = new Blob([svgContent], { type: "image/svg+xml" });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);
    setExportItems({ stringContent: svgContent, url, fileName });
  };

  const handleExportFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const fileName = form.elements.namedItem(
      "export_file_name"
    ) as HTMLInputElement;
    const pixelSize = form.elements.namedItem(
      "export_pixel_size"
    ) as HTMLInputElement;

    createSVG(fileName.value, Number(pixelSize.value));
  };

  useEffect(() => {
    setExportItems({});
  }, [shouldReset]);

  return (
    <>
      <main className="h-screen w-screen flex z-0">
        <div className=" flex flex-col py-2 bg-zinc-950 w-3/4">
          <header className="w-full p-5 flex flex-col">
            <h1
              className={`text-5xl text-teal-500 ${OrbitronFont.className} uppercase tracking-[0.28em]`}
            >
              pixel
            </h1>
            <p className={`text-zinc-200 text-sm`}>
              A canvas for your pixel creations
            </p>
          </header>

          <div className="flex flex-row w-full grow">
            <Canvas
              canvasSize={canvasSize}
              selectedColor={activeColor}
              shouldReset={shouldReset}
              setShouldReset={setShouldReset}
              canvasMatrix={canvasMatrix}
              setCanvasMatrix={setCanvasMatrix}
            />
          </div>

          <footer className="flex items-center text-xs text-zinc-400 p-2 justify-center w-full">
            Made by &nbsp;
            <a
              href="http://prtkgoswami.github.io/"
              target="_blank"
              className="text-teal-500"
            >
              Pratik Goswami
            </a>
          </footer>
        </div>
        <ActionsBar
          canvasSize={canvasSize}
          onSizeSelect={setCanvasSize}
          onSelectColor={setActiveColor}
          setShouldReset={setShouldReset}
          onExportClick={() => setShowExportModal(true)}
          svgContent={exportItems.stringContent ?? ""}
        />
      </main>
      {showExportModal && (
        <ExportModal
          onCloseClick={() => setShowExportModal(false)}
          exportItems={exportItems}
          onFormSubmit={handleExportFormSubmit}
        />
      )}
    </>
  );
}
