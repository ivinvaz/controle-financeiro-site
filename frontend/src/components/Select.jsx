 export default function Select({
  label,
  name,
  id,
  options = [],
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <section className="flex flex-1 flex-col m-2">
      <label htmlFor={id} className="p-2 text-[15px]">
        {label}
      </label>

      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        aria-label={label}
        className="flex flex-1 text-[15px] border-2 border-[#6C6C6C] rounded-[11px] bg-white h-[35px] px-2.5 focus:outline-none focus:border-[#114B5F]"
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {options.map((item, index) => (
          <option key={index} value={item.value ?? item}>
            {item.label ?? item}
          </option>
        ))}
      </select>

      {error && (
        <span className="text-red-600 text-sm px-2">
          {error}
        </span>
      )}
    </section>
  );
}