function Button({
  label,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  className = '',
  ...rest
}) {
  const base =
    'flex flex-1 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer select-none';

  const variants = {
    primary:
      'bg-[#1a5c5c] text-white hover:bg-[#154a4a] active:bg-[#113d3d] focus:ring-[#1a5c5c]/40 disabled:bg-[#c8d6d6] disabled:text-[#6a8f8f] disabled:cursor-not-allowed',
    secondary:
      'bg-white text-[#1a5c5c] border border-[#1a5c5c] hover:bg-[#f0f7f7] active:bg-[#e0eeee] focus:ring-[#1a5c5c]/30',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
      {...rest}
    >
      {label}
    </button>
  );
}

export default Button;