import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Conteiner from "../components/Conteiner";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import transacaoServices from "../services/TransacaoService";

function CadastroTransacao() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      nome: "",
      natureza: "",
      descricao: "",
      valor: "",
      dataRealizacao: "",
      categoriaId: "",
      tipoId: "",
    },
  });

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    register("nome", { required: "Nome é obrigatório." });
    register("natureza", { required: "Natureza é obrigatória." });
    register("descricao", { required: "Descrição é obrigatória." });
    register("valor", {
      required: "Valor é obrigatório.",
      validate: (value) =>
        Number(value) > 0 || "Informe um valor válido maior que zero.",
    });
    register("dataRealizacao", {
      required: "Data de realização é obrigatória.",
      validate: (value) =>
        !Number.isNaN(Date.parse(value)) || "Informe uma data válida.",
    });
    register("categoriaId", { required: "Categoria é obrigatória." });
    register("tipoId", { required: "Tipo é obrigatório." });
  }, [register]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    if (!name) return;

    setValue(name, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitSuccess("");
    setLoading(true);

    try {
      await transacaoServices.criar({
        ...data,
        valor: Number(data.valor),
      });

      setSubmitSuccess("Transação cadastrada com sucesso.");
    } catch (error) {
      setSubmitError(error.message || "Erro ao cadastrar transação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-1 min-h-screen bg-[#EEE5E9] p-4">
      <section className="flex flex-1 max-w-3xl mx-auto">
        <Conteiner>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onChange={handleFormChange}
            noValidate
            className="flex flex-1 flex-col gap-2"
          >
            <h1 className="text-2xl font-bold text-[#114B5F] m-2">
              Cadastro de Transação
            </h1>

            <fieldset className="flex flex-1 flex-col gap-2 border-0 p-0 m-0">
              <Input
                label="Nome"
                name="nome"
                id="nome"
                placeholder="Ex: Mercado"
              />
              {errors.nome && <span className="px-2 text-xs text-rose-600">{errors.nome.message}</span>}

              <Input
                label="Descrição"
                name="descricao"
                id="descricao"
                placeholder="Ex: Compra mensal"
              />
              {errors.descricao && <span className="px-2 text-xs text-rose-600">{errors.descricao.message}</span>}

              <Input
                label="Valor"
                name="valor"
                id="valor"
                type="number"
                placeholder="Ex: 150.00"
              />
              {errors.valor && <span className="px-2 text-xs text-rose-600">{errors.valor.message}</span>}

              <Input
                label="Data de realização"
                name="dataRealizacao"
                id="dataRealizacao"
                type="date"
              />
              {errors.dataRealizacao && <span className="px-2 text-xs text-rose-600">{errors.dataRealizacao.message}</span>}

              <Select
                label="Natureza"
                name="natureza"
                id="natureza"
                placeholder="Selecione a natureza"
                options={["receita", "despesa"]}
              />
              {errors.natureza && <span className="px-2 text-xs text-rose-600">{errors.natureza.message}</span>}

              <Input
                label="Categoria ID"
                name="categoriaId"
                id="categoriaId"
                placeholder="Informe o ID da categoria"
              />
              {errors.categoriaId && <span className="px-2 text-xs text-rose-600">{errors.categoriaId.message}</span>}

              <Input
                label="Tipo ID"
                name="tipoId"
                id="tipoId"
                placeholder="Informe o ID do tipo"
              />
              {errors.tipoId && <span className="px-2 text-xs text-rose-600">{errors.tipoId.message}</span>}
            </fieldset>

            {submitError && (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {submitError}
              </p>
            )}

            {submitSuccess && (
              <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {submitSuccess}
              </p>
            )}

            <div className="flex flex-1 flex-col md:flex-row">
              <Button
                label={loading ? "Salvando..." : "Salvar"}
                name="salvar"
                id="salvar"
                disabled={loading}
                grande
                bgColor="#114B5F"
                fontcolor="#fff"
              />

              <Button
                label="Cancelar"
                name="cancelar"
                id="cancelar"
                bgColor="#EEE5E9"
                fontcolor="#114B5F"
                grande
                onClick={() => navigate("/transacoes")}
              />
            </div>
          </form>
        </Conteiner>
      </section>
    </main>
  );
}

export default CadastroTransacao;