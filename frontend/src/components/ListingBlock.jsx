/**
 * ListingBlock
 * 
 * Componente que renderiza uma listagem em formato de tabela, com suporte a expansão de cada linha (drop).
 * 
 * Props:
 * - options: Array de objetos representando os itens da listagem. Estrutura:
 *   [
 *     {
 *       id: string,
 *       nome: string,
 *       valor: string,
 *       tipo: string,       // "meta" | "receita" | "despesa"
 *       categoria: string,
 *       descricao: string,
 *       natureza?: string   // "transacoes" | "meta"
 *     }
 *   ]
 * 
 * - type: string indicando o contexto da listagem. Pode ser:
 *   - "transacoes": exibe coluna de natureza e redireciona para rotas de transações
 *   - "meta": exibe apenas nome/valor e redireciona para rotas de metas
 * 
 * Funcionalidades:
 * - Cada linha possui um botão que abre/fecha um drop com detalhes adicionais do item.
 * - Botão "Adicionar" redireciona para a rota de criação de novo item, dependendo do type.
 * - Botão "Editar" dentro do drop redireciona para a rota de edição do item correspondente.
 */

import { useNavigate } from "react-router"
import React from "react";

export default function ListingBlock({options,type}){
    const navigate = useNavigate();

    const AbrirDrop = (e) => {
        const targetId = e.target.id.replace("-button", "");
        const targetDropId = `${targetId}-drop`;
        const dropCampo = document.getElementById(targetDropId);

        if (dropCampo) {
        if (dropCampo.classList.contains("hidden")) {
            dropCampo.classList.remove("hidden");
        } else {
            dropCampo.classList.add("hidden");
        }
        }

        const buttonCampo = document.getElementById(`${targetId}-button`)

        if (buttonCampo) {
            buttonCampo.textContent = buttonCampo.textContent === "⌄" ? "⌃" : "⌄";
        }
    };

    const CriarNovo = () => {
        if(type == "transacoes"){
            navigate("/transacoes/novo")
        }else{
            navigate("/metas/novo")
        }
    }

    const EditarItem = (e) => {
        const targetId = e.target.id
        if(type == "transacoes"){
            navigate(`/transacoes/${targetId}/editar`)
        }else{
            navigate(`/metas/${targetId}/editar`)
        }
    }

    return(
        <section className="flex flex-col h-screen md:max-h-[50vh] md:m-2">
            <article className="bg-[#114B5F] w-[130px] p-2 justify-center items-center ml-auto rounded-2xl rounded-b-none hidden md:flex">
                <button className="cursor-pointer text-[15px] text-white" onClick={CriarNovo}>Adicionar</button>
            </article>
            <div className="flex-1 flex flex-col md:shadow-md md:rounded-2xl overflow-hidden md:rounded-tr-none">
                <table className="w-full text-left border-collapse">
                <thead className="bg-[#114B5F] text-white">
                    <tr>
                    <th className="px-4 py-2 font-normal md:hidden text-center">Listagem</th>
                    <th className="px-4 py-2 font-normal hidden md:table-cell">Nome</th>
                    {type =="transacoes" && <th className="px-4 py-2 font-normal hidden md:table-cell">Natureza</th>}
                    <th className="px-4 py-2 font-normal hidden md:table-cell">Valor(R$)</th>
                    </tr>
                </thead>
                </table>
                <div className="flex-1 overflow-y-auto px-2">
                <table className="w-full text-left">
                    <tbody>
                    <tr className="bg-white" key="linha-espacamento-topo"><td className="p-2"></td></tr>
                    {options.map((item)=>(
                        <React.Fragment key={item.id}>
                            <tr className={`${item.tipo == "meta" ? "bg-[#B4C5E4]" : item.tipo == "receita" ? "bg-[#6CAE75]" : "bg-[#FCAA67]"} font-bold rounded-2xl`} id={item.id}>
                                <td className="px-4 py-2">{item.nome}</td>
                                {type =="transacoes" && <td className="px-4 py-2 hidden md:table-cell">{item.natureza}</td>}
                                <td className="px-4 py-2 hidden md:table-cell">{item.valor}</td>
                                <td className="py-2 md:table-cell"><button id={`${item.id}-button`} onClick={AbrirDrop} className="cursor-pointer">⌄</button></td>
                            </tr>
                            <tr className="m-2 hidden" id={`${item.id}-drop`}>
                                <td colspan="4" className={`rounded-2xl rounded-t-none ${item.tipo == "meta" ? "bg-[#B4C5E4]" : item.tipo == "receita" ? "bg-[#6CAE75]" : "bg-[#FCAA67]"}`}>
                                <div className="flex flex-col gap-2 mx-4 my-2 ">
                                    <p className="text-sm md:hidden">Valor(R$): {item.valor}</p>
                                    {type =="transacoes" && <p className="text-sm md:hidden">Natureza: {item.natureza}</p>}
                                    {type =="transacoes" && <p className="text-sm">Tipo: {item.tipo}</p>}
                                    {type =="transacoes" && <p className="text-sm">Categoria: {item.categoria}</p>}
                                    {type =="transacoes" && <p className="text-sm">Descrição: {item.descricao}</p>}
                                    {type !="transacoes" && <p className="text-sm">Data: {item.categoria}</p>}
                                </div>
                                <article className="bg-[#EEE5E9] p-2 justify-center items-center rounded-2xl rounded-t-none flex" >
                                    <button className="cursor-pointer text-[15px] font-bold" id={item.id} onClick={EditarItem}>Editar</button>
                                </article>
                                </td>
                            </tr>
                            <tr id={`${item.id}-blank`} className="bg-white"><td className="p-2"></td></tr>
                        </React.Fragment>
                    ))}

                    </tbody>
                </table>
                </div>
            </div>

            <article className="flex flex-col m-2 md:hidden">
                <button className="bg-[#114B5F] text-white rounded-[15px] h-[35px] text-[15px]" onClick={CriarNovo}>
                Adicionar
                </button>
            </article>
        </section>
    )
}
