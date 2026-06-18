/**
 * Select
 * 
 * Componente reutilizável que renderiza um campo de seleção (dropdown) com rótulo.
 * 
 * Props:
 * - label: texto exibido acima do campo
 * - name: atributo name do select
 * - id: identificador único do select
 * - options: array de strings que serão exibidas como opções do dropdown
 * - placeholder: texto exibido como opção inicial desabilitada/oculta
 * 
 * O componente aplica estilização com Tailwind para bordas, espaçamento e tipografia,
 * garantindo consistência visual. É ideal para formulários onde o usuário precisa
 * escolher entre múltiplas opções pré-definidas.
 */
export default function Select({label, name, id, options, placeholder}){
  return (
    <section className="flex flex-col m-2">
      <label htmlFor={id} className="p-2 text-[15px]">{label}</label>
      <select 
        name={name} 
        id={id} 
        className="text-[15px] border-2 border-[#6C6C6C] rounded-[11px] bg-white h-[40px] px-2.5"
      >
        <option disabled selected hidden>{placeholder}</option>
        {options.map((item, index)=>(
          <option key={index}>{item}</option>
        ))}
      </select>
    </section>
  )
}
