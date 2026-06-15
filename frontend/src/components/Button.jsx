export default function Button({
  label,
  children,
  name,
  id,
  type = "submit",
  grande,
  fontcolor,
  bgColor,
  disabled = false,
  onClick,
}) {
  return (
    <section className="flex flex-1 flex-col m-2">
      <button
        type={type}
        name={name}
        id={id}
        disabled={disabled}
        onClick={onClick}
        style={{ backgroundColor: bgColor, color: fontcolor }}
        className={`flex flex-1 items-center justify-center rounded-[15px] ${
          grande ? "h-[50px] font-bold" : "h-[35px]"
        } text-[20px] disabled:cursor-not-allowed disabled:opacity-70`}
      >
        {children || label}
      </button>
    </section>
  );
}