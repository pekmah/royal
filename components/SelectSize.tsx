interface Props<T> {
    label: string;
    explanatoryText?: string
    options: (T | null)[];
    selectedOption: T | null;
    onSelectOption: (option: T | null) => void;
    getKey: (option: T | null) => string | number; // Function to get the display key from the option
}

export default function SelectOption<T>({
                                            label,
                                            explanatoryText,
                                            options,
                                            selectedOption,
                                            onSelectOption,
                                            getKey,
                                        }: Props<T>) {
    const uniqueOptions = Array.from(new Set(options.map((option) => getKey(option))));
    return (
        <div className='w-full flex flex-col gap-2'>
            <div className="flex gap-4 items-center">
                <label htmlFor={label} className='text-sm font-semibold mb-1'>
                    {label}
                </label>
                {explanatoryText &&
                    <div
                        className="bg-[#FCC2C0] text-primary_red px-4 text-xs py-1.5 rounded-3xl">{explanatoryText}</div>}

            </div>
            {options ? (
                options.length === 1 ? (
                    <span className='border border-grey text-[#888888] text-[12px] font-medium rounded-md w-full p-2'>
                        {getKey(options[0])}
                    </span>
                ) : (
                    <select
                        id={label}
                        value={selectedOption ? getKey(selectedOption) : ''}
                        onChange={(e) => {
                            const key = e.target.value;
                            const option = options.find((opt) => getKey(opt) === key) || null;
                            onSelectOption(option);
                        }}
                        className='border border-grey text-[#888888] text-[12px] font-medium rounded-md w-full p-2 outline-none'>
                        <option value=''>Select</option>
                        {uniqueOptions.map((key) => {
                            const option = options.find((opt) => getKey(opt) === key);
                            if (option) {
                                return (
                                    <option
                                        value={getKey(option)}
                                        key={getKey(option)}
                                        className='bg-white text-black'>
                                        {getKey(option)}
                                    </option>
                                );
                            }
                            return null;
                        })}
                    </select>
                )
            ) : null}
        </div>
    );
}
