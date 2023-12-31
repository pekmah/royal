import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./multiRangeSlider.css";
import { Barlow } from "next/font/google";
import { useSearchContext } from "@/context/SearchContext";
import { useMediaQuery } from "usehooks-ts";

const barlowSemi = Barlow({
  style: "normal",
  weight: "600",
  subsets: ["latin"],
});

interface MultiRangeSliderProps {
  min: number;
  max: number;
  onApply: Function;
  onClear: Function;
  name: string;
  initialValues?: { min: number; max: number };
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
  min,
  max,
  onApply,
  onClear,
  name,
  initialValues,
}) => {
  const [minVal, setMinVal] = useState(initialValues ? initialValues.min : min);
  const [maxVal, setMaxVal] = useState(initialValues ? initialValues.max : max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
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

  const isMediumDevice = useMediaQuery("(max-width: 1024px)");
  const { isSidebarOpen, setIsSidebarOpen } = useSearchContext();

  const CloseSidebar = () => {
    if (isMediumDevice) setIsSidebarOpen(false);
  };
  console.log(isSidebarOpen);

  return (
    <>
      <div className="flex justify-between px-6">
        <h3 className={barlowSemi.className}>{name}</h3>
        <div className="gap-2 flex">
          <button
            className="button-secondary border border-primary_red rounded-md px-2 py-1 text-semibold text-sm"
            onClick={() => {
              onClear();
              CloseSidebar();
            }}
          >
            Clear
          </button>
          <button
            className="button-primary px-2 py-1 text-semibold text-sm"
            onClick={() => {
              onApply({ min: minVal, max: maxVal });
              CloseSidebar();
            }}
          >
            Apply
          </button>
        </div>
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
          max={30000}
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
          <div className={"w-full flex justify-between"}>
            <div className="text-black slider__left-value w-fit">
              <input
                className="w-fit border border-grey rounded-md px-2 py-1"
                type="number"
                id="min"
                min={1}
                max={Math.min(maxVal - 1, 30000)} // Restrict to minimum of 1 and maxVal - 1 or 30000
                value={minVal}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) {
                    const clampedValue = Math.min(
                      Math.max(val, 1),
                      Math.min(maxVal - 1, 30000),
                    );
                    setMinVal(clampedValue);
                  }
                }}
              />
            </div>
            <div className="text-black slider__right-value w-fit">
              <input
                className="w-fit border border-grey rounded-md px-2 py-1"
                type="number"
                id="max"
                min={minVal + 1}
                max={30000}
                value={maxVal}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) {
                    const clampedValue = Math.min(
                      Math.max(val, minVal + 1),
                      30000,
                    );
                    setMaxVal(clampedValue);
                  }
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
