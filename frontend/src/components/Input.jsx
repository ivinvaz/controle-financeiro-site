function Input({
  label,
  id,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  required = false,
  ...rest
}) {
  return (
    <fieldset className="flex flex-1 flex-col gap-1 border-0 p-0 m-0 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-[#1a3a3a] select-none"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-label={label || placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="flex flex-1 w-full rounded-xl border border-[#c8d6d6] bg-white px-4 py-3 text-sm text-[#1a3a3a] placeholder-[#9ab0b0] outline-none transition-all duration-150 focus:border-[#1a5c5c] focus:ring-2 focus:ring-[#1a5c5c]/20 hover:border-[#9ab0b0]"
        {...rest}
      />
      {error && (
        <span
          id={`${id}-error`}
          role="alert"
          className="text-xs font-medium text-rose-600 mt-0.5"
        >
          {error}
        </span>
      )}
    </fieldset>
  );
}

export default Input;