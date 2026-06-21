import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import MetaService from "../services/MetaService";

const LISTA_MESES = [
  { value: "1", label: "Janeiro" },
  { value: "2", label: "Fevereiro" },
  { value: "3", label: "Março" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Maio" },
  { value: "6", label: "Junho" },
  { value: "7", label: "Julho" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const ANOS = Array.from({ length: 10 }, (_, i) =>
  String(new Date().getFullYear() + i),
);

function CadastroMeta() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ nome: "", mes: "", ano: "", valor: "" });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validar = () => {
    if (!form.nome.trim()) return "Informe o nome da meta.";
    if (!form.mes) return "Selecione o mês.";
    if (!form.ano) return "Selecione o ano.";
    if (!form.valor || isNaN(Number(form.valor)) || Number(form.valor) <= 0)
      return "Informe um valor numérico válido.";
    return null;
  };

  const handleSubmit = async () => {
    setErro("");
    setSucesso("");
    const erroValidacao = validar();
    if (erroValidacao) return setErro(erroValidacao);
    setCarregando(true);

    const resultado = await MetaService.criar({
      nome: form.nome.trim(),
      mes: Number(form.mes), 
      ano: Number(form.ano), 
      meta: Number(form.valor),
    });

    setCarregando(false);
    if (resultado.success) {
      setSucesso(resultado.message);
      setTimeout(() => navigate("/metas"), 1200);
    } else {
      setErro(resultado.message);
    }
  };

  return (
    <div className="flex flex-1 min-h-screen sm:bg-slate-50 items-start sm:items-center justify-center p-4">
      <div className="flex flex-col w-full sm:w-[420px] lg:w-[400px] sm:border sm:border-[#114B5F] sm:rounded-2xl sm:p-6 sm:bg-white sm:shadow-md">
        <h2 className="text-center font-semibold text-lg mb-4">Nova Meta</h2>

        {erro && <p className="text-red-600 text-sm text-center mb-2">{erro}</p>}
        {sucesso && <p className="text-green-600 text-sm text-center mb-2">{sucesso}</p>}

        <Input
          label="Nome"
          name="nome"
          id="nome"
          type="text"
          value={form.nome}
          onChange={handleChange}
        />
        
        {/* 🔴 CORREÇÃO AQUI: Ajustado para usar a nova estrutura de meses */}
        <Select
          label="Mês"
          name="mes"
          id="mes"
          options={LISTA_MESES.map(m => m.label)} // Se o seu componente Select só aceita array de strings
          placeholder="Selecione"
          value={LISTA_MESES.find(m => m.value === form.mes)?.label || ""} 
          onChange={(e) => {
            const nomeMes = e.target.value;
            const mesObj = LISTA_MESES.find(m => m.label === nomeMes);
            setForm(prev => ({ ...prev, mes: mesObj ? mesObj.value : "" }));
          }}
        />

        <Select
          label="Ano"
          name="ano"
          id="ano"
          options={ANOS}
          placeholder="Selecione"
          value={form.ano}
          onChange={handleChange}
        />
        <Input
          label="Valor(R$)"
          name="valor"
          id="valor"
          type="number"
          value={form.valor}
          onChange={handleChange}
        />

        <div className="flex flex-col sm:flex-row sm:mt-2 gap-2">
          <Button
            label={carregando ? "Salvando..." : "Criar"}
            bgColor="#114B5F"
            fontcolor="#fff"
            grande
            disabled={carregando}
            onClick={handleSubmit}
            className="sm:text-sm sm:h-[35px] sm:px-8"
          />
          <Button
            label="Cancelar"
            bgColor="#EEE5E9"
            fontcolor="#114B5F"
            grande
            onClick={() => navigate("/metas")}
            className="sm:text-sm sm:h-[35px] sm:px-6"
          />
        </div>
      </div>
    </div>
  );
}

export default CadastroMeta;