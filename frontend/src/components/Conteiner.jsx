export default function Conteiner({ children, className = "" }) {
  return (
    <section
      className={`flex flex-1 flex-col shadow-md border-[4px] border-[#114B5F] rounded-[15px] m-2 p-2 ${className}`}
    >
      {children}
    </section>
  );
}