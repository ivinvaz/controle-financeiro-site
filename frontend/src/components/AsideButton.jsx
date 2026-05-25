function AsideButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-[#0d4a5c] flex items-center justify-center text-white text-xl font-bold shadow-md"
      aria-label="Abrir menu"
    >
      ⋮
    </button>
  );
}

export default AsideButton;