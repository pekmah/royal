"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function ColorSelector({ colors }: { colors: string[] }) {
    const [selected, setSelected] = useState(0);

    return (
        <div className="flex gap-4 w-full py-4 ">
            {colors.map((color, idx) => (
                <button
                    key={color}
                    className={`rounded-full w-6 h-6 flex items-center justify-center`}
                    style={{ background: color }}
                    onClick={() => setSelected(idx)}
                    data-hex={color}
                >
                    {selected === idx ? (
                        <FaCheck size={12} className="text-white" />
                    ) : (
                        <div className="w-4 h-4" />
                    )}
                </button>
            ))}
        </div>
    );
}
