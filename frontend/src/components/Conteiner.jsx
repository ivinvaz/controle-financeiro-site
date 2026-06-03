/**
 * Conteiner
 * 
 * Componente de layout que serve como um "card" ou bloco de conteúdo.
 * 
 * Props:
 * - children: qualquer elemento React passado entre as tags <Conteiner>...</Conteiner>
 * 
 * O componente aplica estilização com Tailwind:
 * - sombra leve (shadow-md)
 * - borda de 4px na cor #114B5F
 * - cantos arredondados (15px)
 * - margens externas (m-2) e padding interno (p-2)
 * 
 * É ideal para agrupar conteúdo em caixas visuais consistentes, mantendo
 * uma aparência uniforme em toda a aplicação.
 */
export default function Conteiner({children}){
  return(
    <section className="shadow-md border-[4px] border-[#114B5F] rounded-[15px] m-2 p-2">
      {children}
    </section>
  )
}
