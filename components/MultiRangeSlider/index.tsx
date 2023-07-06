import {
    ChangeEvent,
    FC,
    useCallback,
    useEffect,
    useState,
    useRef,
} from "react";
import "./multiRangeSlider.css";
import { Barlow } from "next/font/google";

const barlowSemi = Barlow({
    style: "normal",
    weight: "600",
    subsets: ["latin"],
});

interface MultiRangeSliderProps {
    min: number;
    max: number;
    onChange: Function;
    name: string;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
    min,
    max,
    onChange,
    name,
}) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    return (
        <>
            <div className="flex justify-between px-6">
                <h3 className={barlowSemi.className}>{name}</h3>
                <button
                    className="button-primary px-2 py-1 text-semibold text-sm"
                    onClick={() => {
                        onChange({ min: minVal, max: maxVal });
                    }}
                >
                    Apply
                </button>
            </div>
            <div className="container h-28 pb-8">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minVal}
                    ref={minValRef}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const value = Math.min(+event.target.value, maxVal - 1);
                        setMinVal(value);
                        event.target.value = value.toString();
                    }}
                    className={`thumb thumb--zindex-3 ${
                        minVal > max - 100 ? " thumb--zindex-5" : ""
                    }`}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxVal}
                    ref={maxValRef}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const value = Math.max(+event.target.value, minVal + 1);
                        setMaxVal(value);
                        event.target.value = value.toString();
                    }}
                    className="thumb thumb--zindex-4"
                />

                <div className="slider">
                    <div className="slider__track"></div>
                    <div ref={range} className="slider__range"></div>
                    {/* <div className="border py-1 px-2 border-gray text-black rounded-md slider__left-value">
                        {minVal}
                    </div>
                    <div className="border py-1 px-2 border-gray text-black rounded-md slider__right-value">
                        {maxVal}
                    </div> */}
                    <div className={"w-full flex justify-between"}>
                        {/* <label htmlFor="min">Min Value:</label> */}
                        <div className="text-black slider__left-value w-fit">
                            <input
                                className="w-fit border border-gray rounded-md px-2 py-1"
                                type="number"
                                id="min"
                                value={minVal}
                                onChange={(e) => {
                                    setMinVal(parseInt(e.target.value));
                                }}
                            />
                        </div>

                        {/* <label htmlFor="max">Max Value:</label> */}
                        <div className="text-black slider__right-value w-fit">
                            <input
                                className="w-fit border border-gray rounded-md px-2 py-1"
                                type="number"
                                id="max"
                                value={maxVal}
                                onChange={(e) => {
                                    setMaxVal(parseInt(e.target.value));
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MultiRangeSlider;
