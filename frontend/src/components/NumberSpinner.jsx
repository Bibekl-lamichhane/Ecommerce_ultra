"use client";
export function NumberSpinner({ value, min = 1, max = 99, onChange }) {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  const handleInput = (e) => {
    const parsed = parseInt(e.target.value);
    if (!isNaN(parsed)) onChange(Math.max(min, Math.min(max, parsed)));
  };

  return (
    <div className="flex justify-center items-center border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={decrement}
        disabled={value <= min}
        className="w-9 h-9 flex items-center justify-center bg-gray-50 
                   hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed 
                   transition-colors cursor-pointer"
        aria-label="Decrease quantity"
      >
        −
      </button>

      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={handleInput}
        className="w-10 h-9 text-center text-sm font-medium border-x border-gray-200
                   bg-white focus:outline-none [appearance:textfield] 
                   [&::-webkit-outer-spin-button]:appearance-none 
                   [&::-webkit-inner-spin-button]:appearance-none"
        aria-label="Quantity"
      />

      <button
        onClick={increment}
        disabled={value >= max}
        className="w-9 h-9 flex items-center justify-center bg-gray-50 
                   hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed 
                   transition-colors cursor-pointer"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}