
"use client";

import { useState, useEffect } from "react";

export default function PixelEditor10x40() {
  const ROWS = 10;
  const COLS = 40;
  const BOX_SIZE = 20;

  const PALETTE = [
    "#FF0000", "#FFA500", "#FFFF00", "#00FF00", // Top Row
    "#0000FF", "#4B0082", "#000000", "#FFFFFF", // Bottom Row
  ];

  const [grid, setGrid] = useState<string[]>(Array(ROWS * COLS).fill("#2c2c2c"));
  const [mouseDown, setMouseDown] = useState(false);
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  const [activeColor, setActiveColor] = useState(PALETTE[0]);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("pixelGrid");
    if (saved) setGrid(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("pixelGrid", JSON.stringify(grid));
  }, [grid]);

  const paintSquare = (index: number, color: string) => {
    const newGrid = [...grid];
    newGrid[index] = color;
    setGrid(newGrid);
  };

  const getPalettePosition = (index: number) => {
    const row = Math.floor(index / COLS);
    const col = index % COLS;

    let top = row * (BOX_SIZE + 2) - 120;
    let left = col * (BOX_SIZE + 2) - 50;

    if (top < 0) top = row * (BOX_SIZE + 2) + 20;
    if (left < 0) left = 10;
    if (left > COLS * BOX_SIZE - 140) left = COLS * BOX_SIZE - 140;

    return { top, left };
  };

  const pos = hoveredBox !== null ? getPalettePosition(hoveredBox) : { top: 0, left: 0 };

  const smallWidth = 24;
  const largeWidth = 40;
  const boxHeight = 32;
  const borderWidth = 2;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-sans">
      <div
        className="relative bg-black text-zinc-950 p-1 rounded-md shadow-2xl"
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
        onMouseLeave={() => {
          setMouseDown(false);
          setHoveredBox(null);
        }}
      >
        {/* Pixel Grid */}
        <div
          className="grid shadow-2xs"
          style={{
            gridTemplateColumns: `repeat(${COLS}, ${BOX_SIZE}px)`,
            gap: "2px",
          }}
        >
          {grid.map((color, index) => (
            <div
              key={index}
              style={{ backgroundColor: color }}
              className="w-[20px] h-[20px] cursor-crosshair transition-colors duration-100 shadow-lg"
              onMouseDown={() => paintSquare(index, activeColor)}
              onMouseEnter={() => {
                if (mouseDown) paintSquare(index, activeColor);
                setHoveredBox(index);
              }}
            />
          ))}
        </div>

        {/* Floating Palette */}
        {hoveredBox !== null && (
          <div
            className="absolute bg-white p-3 rounded-xl shadow-lg flex flex-col gap-3 z-50 pointer-events-auto"
            style={{ top: pos.top, left: pos.left, transition: "top 0.1s, left 0.1s" }}
          >
            {/* Top Row */}
            <div className="flex">
              {PALETTE.slice(0, 4).map((c, i) => {
                const width = i === 3 ? largeWidth : smallWidth;
                return (
                  <div
                    key={c}
                    onClick={() => setActiveColor(c)}
                    onMouseEnter={() => setHoveredColor(c)}
                    onMouseLeave={() => setHoveredColor(null)}
                    className="cursor-pointer transition-all duration-200"
                    style={{
                      backgroundColor: c,
                      width: hoveredColor === c ? width * 1.4 : width,
                      height: hoveredColor === c ? boxHeight * 1.4 : boxHeight,
                      border: `${borderWidth}px solid black`,
                      marginRight: i === 3 ? 0 : 0,
                    }}
                  />
                );
              })}
            </div>

            {/* Bottom Row */}
            <div className="flex">
              {PALETTE.slice(4, 8).map((c, i) => {
                const width = i === 3 ? largeWidth : smallWidth;
                return (
                  <div
                    key={c}
                    onClick={() => setActiveColor(c)}
                    onMouseEnter={() => setHoveredColor(c)}
                    onMouseLeave={() => setHoveredColor(null)}
                    className="cursor-pointer transition-all duration-200"
                    style={{
                      backgroundColor: c,
                      width: hoveredColor === c ? width * 1.4 : width,
                      height: hoveredColor === c ? boxHeight * 1.4 : boxHeight,
                      border: `${borderWidth}px solid black`,
                      marginRight: i === 3 ? 0 : 0,
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}