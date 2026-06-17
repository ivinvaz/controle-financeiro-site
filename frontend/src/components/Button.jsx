/**
 * Button
 * 
 * Componente reutilizável que renderiza um botão estilizado com Tailwind.
 * 
 * Props:
 * - label: texto exibido no botão
 * - name: atributo name do botão
 * - id: identificador único
 * - grande: booleano que define altura e peso da fonte (true = botão maior e negrito)
 * - fontcolor: cor da fonte (string, ex: "#fff" ou "red")
 * - bgColor: cor de fundo (string, ex: "#114B5F" ou "blue")
 * 
 * O botão ajusta dinamicamente seu tamanho e estilo conforme as props recebidas.
 */
export default function Button({ label, name, id, grande, fontcolor, bgColor, disabled = false, onClick }) {
  return (
    <section className="flex flex-col m-2">
      <button
        type="submit"
        name={name}
        id={id}
        disabled={disabled}
        onClick={onClick}
        style={{ backgroundColor: bgColor, color: fontcolor }}
        className={`rounded-[15px] ${grande ? "h-[50px] font-bold" : "h-[35px]"} text-[20px] disabled:cursor-not-allowed disabled:opacity-70`}
      >
        {label}
      </button>
    </section>
  );
}
