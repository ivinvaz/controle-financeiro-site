// CadastroTransacao.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Conteiner from "../components/Conteiner";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import transacaoServices from "../services/TransacaoService";
import CategoriaService from "../services/CategoriaService";

function CadastroTransacao() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      nome: "",
      natureza: "",
      descricao: "",
      valor: "",
      dataRealizacao: "",
      categoria: "",
    },
  });

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [categorias,setCategorias] = useState([]);

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
    register("categoria", { required: "Categoria é obrigatória." });
  }, [register]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    if (!name) return;

    const parsedValue = (name === "categoria" && value !== "") && !isNaN(value) 
    ? Number(value) 
    : value;

    setValue(name, parsedValue, {
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
        categoriaId: data.categoria
      });

      setSubmitSuccess("Transação cadastrada com sucesso.");
      setTimeout(() => navigate("/transacoes"), 1200);
    } catch (error) {
      setSubmitError(error.message || "Erro ao cadastrar transação.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    const disparar = async () => {
      const resultado = await CategoriaService.listar();
      if (resultado.success) {
        setCategorias(resultado.data);
      }else{
        setCategorias(["outros"])
      }
    }
    disparar();
  },[])

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4 py-10 sm:px-8">
      <section className="w-full max-w-[400px]">
        <Conteiner>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onChange={handleFormChange}
            noValidate
            className="flex flex-1 flex-col gap-2"
          >
            <h1 className="text-xl font-bold text-[#114B5F] text-center mb-4">
              Cadastro de Transação
            </h1>

            <fieldset className="flex flex-1 flex-col gap-2 border-0 p-0 m-0">
              <Input
                label="Nome"
                name="nome"
                id="nome"
                placeholder="Ex: Mercado"
                value={watch("nome")}
                onChange={handleFormChange}
              />
              {errors.nome && (
                <span className="px-2 text-xs text-rose-600">
                  {errors.nome.message}
                </span>
              )}

              <Input
                label="Descrição"
                name="descricao"
                id="descricao"
                placeholder="Ex: Compra mensal"
                value={watch("descricao")}
                onChange={handleFormChange}
              />
              {errors.descricao && (
                <span className="px-2 text-xs text-rose-600">
                  {errors.descricao.message}
                </span>
              )}

              <Input
                label="Valor(R$)"
                name="valor"
                id="valor"
                type="number"
                placeholder="Ex: 150.00"
                value={watch("valor")}
                onChange={handleFormChange}
              />
              {errors.valor && (
                <span className="px-2 text-xs text-rose-600">
                  {errors.valor.message}
                </span>
              )}

              <Input
                label="Data de realização"
                name="dataRealizacao"
                id="dataRealizacao"
                type="date"
                value={watch("dataRealizacao")}
                onChange={handleFormChange}
              />
              {errors.dataRealizacao && (
                <span className="px-2 text-xs text-rose-600">
                  {errors.dataRealizacao.message}
                </span>
              )}

              <Select
                label="Natureza"
                name="natureza"
                id="natureza"
                placeholder="Selecione"
                options={["receita", "despesa"]}
                value={watch("natureza")}
                onChange={handleFormChange}
              />
              {errors.natureza && (
                <span className="px-2 text-xs text-rose-600">
                  {errors.natureza.message}
                </span>
              )}

              <Select
                label="Categoria"
                name="categoria"
                id="categoria"
                placeholder="Selecione"
                options={categorias}
                value={watch("categoria")}
                onChange={handleFormChange}
              />
              {errors.categoria && (
                <span className="px-2 text-xs text-rose-600">
                  {errors.categoria.message}
                </span>
              )}
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

            <div className="flex flex-col sm:flex-row sm:mt-2">
              <div className="sm:w-fit">
                <Button
                  label={loading ? "Salvando..." : "Salvar"}
                  name="salvar"
                  id="salvar"
                  tipo="submit"
                  disabled={loading}
                  grande
                  bgColor="#114B5F"
                  fontcolor="#fff"
                  className="sm:text-sm sm:h-[35px] sm:px-8"
                />
              </div>
              <div className="sm:w-fit">
                <Button
                  label="Cancelar"
                  name="cancelar"
                  id="cancelar"
                  tipo="button"
                  grande
                  bgColor="#EEE5E9"
                  fontcolor="#114B5F"
                  onClick={() => navigate("/transacoes")}
                  className="sm:text-sm sm:h-[35px] sm:px-6"
                />
              </div>
            </div>
          </form>
        </Conteiner>
      </section>
    </main>
  );
}

export default CadastroTransacao;