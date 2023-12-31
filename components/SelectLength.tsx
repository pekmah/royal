
interface Props {
    label: string;
    options: string[]
    selectedOption: number | null;
    onSelectOption: (option: number | null) => void;
}

export default function SelectLength({
    label,
    options,
    selectedOption,
    onSelectOption,
}: Props) {
    return (
        <div className='w-full flex flex-col gap-2'>
            <label htmlFor={label} className='text-sm font-semibold mb-1'>
                {label}
            </label>
            {options ? (
                options.length === 1 ? (
                    <span className='border border-grey text-[#888888] text-[12px] font-medium rounded-md w-full p-2'>
                        {options[0]}
                    </span>
                ) : (
                    <select
                        id={label}
                        value={selectedOption ? selectedOption : ''}
                        onChange={(e) => {
                            const key = e.target.value;
                            const option = options.find(opt => opt === key) || null;
                            onSelectOption(Number(option));
                        }}
                        className='border border-grey text-[#020202] text-[12px] font-medium rounded-md w-full p-2 outline-none'>
                        <option value=''>Select</option>
                        {options.map((option, idx) => (
                            <option
                                value={option}
                                key={idx}
                                className='bg-white text-black'>
                                {option}
                            </option>
                        ))}
                    </select>
                )
            ) : null}
        </div>
    );
}
