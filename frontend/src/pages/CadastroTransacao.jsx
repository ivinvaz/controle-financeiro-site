import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Conteiner from "../components/Conteiner";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import transacaoServices from "../services/TransacaoService";

const estadoInicial = {
  nome: "",
  natureza: "",
  descricao: "",
  valor: "",
  dataRealizacao: "",
  categoriaId: "",
  tipoId: "",
};

function CadastroTransacao() {
  const navigate = useNavigate();
  const [form, setForm] = useState(estadoInicial);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  function alterarCampo(event) {
    const { name, value } = event.target;

    setForm((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  function validarFormulario() {
    if (
      !form.nome ||
      !form.natureza ||
      !form.descricao ||
      !form.valor ||
      !form.dataRealizacao ||
      !form.categoriaId ||
      !form.tipoId
    ) {
      return "Preencha todos os campos obrigatórios.";
    }

    if (Number(form.valor) <= 0 || Number.isNaN(Number(form.valor))) {
      return "Informe um valor válido maior que zero.";
    }

    if (Number.isNaN(Date.parse(form.dataRealizacao))) {
      return "Informe uma data válida.";
    }

    return "";
  }

  async function salvarTransacao(event) {
    event.preventDefault();

    setErro("");
    setSucesso("");

    const erroValidacao = validarFormulario();

    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    const payload = {
      ...form,
      valor: Number(form.valor),
    };

    try {
      setCarregando(true);
      await transacaoServices.criar(payload);
      setSucesso("Transação cadastrada com sucesso.");
      setForm(estadoInicial);
    } catch (error) {
      setErro(error.message || "Erro ao cadastrar transação.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="flex flex-1 min-h-screen bg-[#EEE5E9] p-4">
      <Conteiner className="max-w-3xl mx-auto bg-white">
        <form onSubmit={salvarTransacao} className="flex flex-1 flex-col gap-2">
          <h1 className="text-2xl font-bold text-[#114B5F] m-2">
            Cadastro de Transação
          </h1>

          {erro && <p className="m-2 text-red-600">{erro}</p>}
          {sucesso && <p className="m-2 text-green-700">{sucesso}</p>}

          <Input
            label="Nome"
            name="nome"
            id="nome"
            placeholder="Ex: Mercado"
            value={form.nome}
            onChange={alterarCampo}
          />

          <Input
            label="Descrição"
            name="descricao"
            id="descricao"
            placeholder="Ex: Compra mensal"
            value={form.descricao}
            onChange={alterarCampo}
          />

          <Input
            label="Valor"
            name="valor"
            id="valor"
            type="number"
            placeholder="Ex: 150.00"
            value={form.valor}
            onChange={alterarCampo}
          />

          <Input
            label="Data de realização"
            name="dataRealizacao"
            id="dataRealizacao"
            type="date"
            value={form.dataRealizacao}
            onChange={alterarCampo}
          />

          <Select
            label="Natureza"
            name="natureza"
            id="natureza"
            placeholder="Selecione a natureza"
            value={form.natureza}
            onChange={alterarCampo}
            options={[
              { label: "Receita", value: "receita" },
              { label: "Despesa", value: "despesa" },
            ]}
          />

          <Input
            label="Categoria ID"
            name="categoriaId"
            id="categoriaId"
            placeholder="Informe o ID da categoria"
            value={form.categoriaId}
            onChange={alterarCampo}
          />

          <Input
            label="Tipo ID"
            name="tipoId"
            id="tipoId"
            placeholder="Informe o ID do tipo"
            value={form.tipoId}
            onChange={alterarCampo}
          />

          <div className="flex flex-1 flex-col md:flex-row">
            <Button
              type="submit"
              label={carregando ? "Salvando..." : "Salvar"}
              bgColor="#114B5F"
              fontcolor="#FFFFFF"
              grande
              disabled={carregando}
            />

            <Button
              type="button"
              label="Cancelar"
              bgColor="#EEE5E9"
              fontcolor="#114B5F"
              grande
              onClick={() => navigate("/transacoes")}
            />
          </div>
        </form>
      </Conteiner>
    </main>
  );
}

export default CadastroTransacao;