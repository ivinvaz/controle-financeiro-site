/**
 * Input
 * 
 * Componente reutilizável que renderiza um campo de entrada com rótulo.
 * 
 * Props:
 * - label: texto exibido acima do campo
 * - name: atributo name do input
 * - id: identificador único do input
 * - type: tipo do input (ex: "text", "number", "password")
 * - placeholder: texto de placeholder exibido dentro do campo
 * 
 * O componente aplica estilização com Tailwind para bordas, espaçamento e tipografia,
 * garantindo consistência visual. É ideal para formulários onde cada campo precisa
 * de um rótulo associado.
 */
export default function Input({label, name, id, type, placeholder}) {
  return (
    <section className="flex flex-col m-2">
      <label htmlFor={id} className="p-2 text-[15px]">{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className="text-[15px] border-2 border-[#6C6C6C] rounded-[11px] bg-white h-[25px] px-2.5"
      />
    </section>
  );
}
