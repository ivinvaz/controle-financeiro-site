import { useEffect, useState } from 'react';

import Input from "../components/Input";
import Box from "../components/Box";
import Button  from "../components/Button";
import GraficoPizza  from "../components/GraficoPizza";
import GraficoLinha from '../components/GraficoLinha';

import {GetSumDespesas, GetSumMetas, GetSumReceitas, GetDashboardData} from "../services/DashBoardService";

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [loadingGraph, setLoadingGraph] = useState(false);

    const [dataInicio,setDataInicio] = useState(null);
    const [dataFim,setDataFim] = useState(null);
    const [sumReceita, setSumReceita] = useState(0);
    const [sumDespesa, setSumDespesa] = useState(0);
    const [sumMeta, setSumMeta] = useState(0);
    const [dadosDashboard,setDadosDashboard] = useState(null);

    const [receitaAtiva, setReceitaAtiva] = useState(true);
    const [despesaAtiva, setDespesaAtiva] = useState(true);

    const clickButtonDespesa = () => setDespesaAtiva(!despesaAtiva);
    const clickButtonReceita = () => setReceitaAtiva(!receitaAtiva);
    const changeInicio = (event) => setDataInicio(event.target.value);
    const changeFim = (event) => setDataFim(event.target.value);

    const corReceita = receitaAtiva ? "#6CAE75" : "rgba(108,174,117,0.5)";
    const corDespesa = despesaAtiva ? "#FCAA67" : "rgba(252,170,103,0.5)";

    useEffect(()=>{
        setLoading(true);
        const disparar = async () => {
            const somaDasReceitas = await GetSumReceitas(dataInicio, dataFim);
            const somaDasDespesas = await GetSumDespesas(dataInicio, dataFim);
            const somaDasMetas = await GetSumMetas(dataInicio, dataFim);

            setSumDespesa(somaDasDespesas);
            setSumReceita(somaDasReceitas);
            setSumMeta(somaDasMetas);
            setLoading(false);
        }
        disparar() 
    },[dataInicio, dataFim])

    useEffect(()=>{
        setLoadingGraph(true);
        const disparar = async () => {
            const dados = await GetDashboardData({ DataInicio: dataInicio, DataFim: dataFim, receitaAtiva, despesaAtiva });
            setDadosDashboard(dados);
            setLoadingGraph(false);
        }
        disparar() 
    },[dataInicio, dataFim,receitaAtiva, despesaAtiva])

    return (
        <>
        {loading ? (
            <section>
                <p>Carregando dados...</p>
            </section>
        ) : (
            <>
                <section className="flex flex-1 justify-center md:justify-start">
                    <Input name={"DataInicio"} id={"DataInicio"} type={"date"} placeholder={"Início"} onChange={changeInicio} value={dataInicio ?? ""}/>
                    <Input name={"DataFim"} id={"DataFim"} type={"date"} placeholder={"Fim"} onChange={changeFim} value={dataFim ?? ""}/>
                </section>

                <section className='flex  flex-col md:flex-row'>
                    <section className="flex flex-col md:flex-row md:min-w-[40rem]">
                        <section className="flex gap-2 m-2 md:flex-1">
                            <Box title={"Receita"} text={`R$${sumReceita}`} fontcolor={"black"}  bgColor={"6CAE75"} />
                            <Box title={"Despesas"} text={`R$${sumDespesa}`} fontcolor={"black"}  bgColor={"FCAA67"} />

                            <section className="flex-1 hidden sm:flex">
                                <Box title={"Em Banco"} text={`R$${sumReceita-sumDespesa}`} fontcolor={"white"}  bgColor={"114B5F"} />
                            </section>     
                        </section>        
                    </section>

                    <section className="flex m-2 flex-1 sm:hidden">
                        <section className="flex flex-1 justify-between p-2 px-7 rounded-xl font-bold shadow-md bg-black text-white">
                            <p>Em Banco: </p>
                            <p>{`R$${sumReceita-sumDespesa}`}</p>
                        </section>
                    </section>

                    <section className="flex gap-2 m-2 md:flex-1">
                        <Box title={"Metas"} text={`R$${sumMeta}`} fontcolor={"black"}  bgColor={"B4C5E4"} />
                        <Box title={"Margem"} text={`R$${sumMeta-(sumReceita-sumDespesa)}`} fontcolor={"black"}  bgColor={"B4C5E4"} />
                    </section>    
                </section>

                <section className="flex h-fit justify-center md:justify-start">
                    <Button label={"Receitas"} name={"receitasButton"} id={"receitasButton"} grande={false} fontcolor={"black"} bgColor={corReceita} disabled={false} onClick={clickButtonReceita}/>
                    <Button label={"Despesas"} name={"despesasButton"} id={"despesasButton"} grande={false} fontcolor={"black"} bgColor={corDespesa} disabled={false} onClick={clickButtonDespesa}/>
                </section>

                <section className="flex gap-2 flex-1 m-2 flex-col items-center justify-center sm:flex-row">

                    { (!dadosDashboard || dadosDashboard.semDados) ? (
                        <section>
                            <p>Sem dados para Demonstrar</p>
                        </section>
                    ) : loadingGraph ?(
                        <section>
                            <p>Carregando dados...</p>
                        </section>
                    ) : (
                        <section>
                            {dadosDashboard.grafico?.pizza && (<GraficoPizza labels={dadosDashboard.grafico.pizza.labels} datasets={dadosDashboard.grafico.pizza.datasets} />)}
                            {dadosDashboard.grafico?.linha && (<GraficoLinha labels={dadosDashboard.grafico.linha.labels} datasets={dadosDashboard.grafico.linha.datasets} />)}
                        </section>
                    )}
                </section>

                <section className="sm:flex m-1 h-fit justify-center hidden">
                    <p className="font-bold text-gray-300">Mês atual por padrão</p>
                </section>
            </>
        )}
        </>
    );
}