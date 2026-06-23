// BoxLabel é um componente reutilizável que exibe um título e um texto
// dentro de uma seção estilizada. Ele recebe quatro props:
// - title: texto pequeno exibido no topo
// - text: texto principal em destaque
// - fontcolor: classe Tailwind para cor da fonte 
// - bgColor: classe Tailwind para cor de fundo 

export default function Box({ title, text, fontcolor, bgColor }) {
  return (
    <section 
      style={{ backgroundColor: `#${bgColor}`, color: fontcolor }}
      className="flex flex-col flex-1 justify-center rounded-xl text-center font-bold shadow-md h-[142px]"
    >
      <p className="text-[20px] h-[10%]">{title}</p>
      <p className="text-[35px] h-[80%] flex justify-center items-center">{text}</p>
    </section>
  );
}