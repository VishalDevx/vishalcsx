"use client";

import { useState, useEffect } from "react";

export default function PixelEditor10x50() {
  const ROWS = 12;
  const COLS = 50;
  const BOX_SIZE = 22;

  const PALETTE = [
    "#FF0000", "#FFA500", "#FFFF00", "#00FF00",
    "#0000FF", "#4B0082", "#000000", "#FFFFFF",
  ];

  const [grid, setGrid] = useState<string[]>(
    Array(ROWS * COLS).fill("#2c2c2c")
  );
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

  const paintSquare = (index: number) => {
    const newGrid = [...grid];
    newGrid[index] = activeColor;
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

  const pos =
    hoveredBox !== null
      ? getPalettePosition(hoveredBox)
      : { top: 0, left: 0 };

  return (
    <div className="flex justify-center">
      <div
        className="relative bg-black p-2 rounded-lg"
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
        onMouseLeave={() => {
          setMouseDown(false);
          setHoveredBox(null);
        }}
      >
        {/* GRID */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${COLS}, ${BOX_SIZE}px)`,
            gap: "1px",
          }}
        >
          {grid.map((color, index) => (
            <div
              key={index}
              onMouseDown={() => paintSquare(index)}
              onMouseEnter={() => {
                if (mouseDown) paintSquare(index);
                setHoveredBox(index);
              }}
              className="
                cursor-crosshair
                transition-all duration-150
                border border-zinc-700
                hover:scale-110 hover:z-10
              "
              style={{
                width: BOX_SIZE,
                height: BOX_SIZE,
                backgroundColor: color,
                boxShadow: `
                  inset 0 0 0 1px rgba(255,255,255,0.08),
                  0 1px 2px rgba(0,0,0,0.6)
                `,
              }}
            />
          ))}
        </div>

        {/* PALETTE */}
        {hoveredBox !== null && (
          <div
            className="absolute bg-white p-3 rounded-xl shadow-lg flex flex-col gap-2 z-50"
            style={{ top: pos.top, left: pos.left }}
          >
            {[0, 1].map((row) => (
              <div key={row} className="flex gap-1">
                {PALETTE.slice(row * 4, row * 4 + 4).map((c) => (
                  <div
                    key={c}
                    onClick={() => setActiveColor(c)}
                    onMouseEnter={() => setHoveredColor(c)}
                    onMouseLeave={() => setHoveredColor(null)}
                    className="cursor-pointer transition-all duration-200"
                    style={{
                      width: hoveredColor === c ? 40 : 26,
                      height: hoveredColor === c ? 40 : 26,
                      backgroundColor: c,
                      border: "2px solid black",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}