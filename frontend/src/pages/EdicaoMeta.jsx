import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Conteiner from "../components/Conteiner";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import MetaService from "../services/MetaService";

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const ANOS = Array.from({ length: 10 }, (_, i) =>
  String(new Date().getFullYear() + i),
);

function EdicaoMeta() {
  const { id } = useParams();
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
      mes: "",
      ano: "",
      valor: "",
    },
  });

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [carregandoMeta, setCarregandoMeta] = useState(true);

  useEffect(() => {
    register("nome", { required: "Nome é obrigatório." });
    register("mes", { required: "Selecione o mês." });
    register("ano", { required: "Selecione o ano." });
    register("valor", {
      required: "Valor é obrigatório.",
      validate: (value) =>
        Number(value) > 0 || "Informe um valor válido maior que zero.",
    });
  }, [register]);

  useEffect(() => {
    async function carregarMeta() {
      setSubmitError("");
      setCarregandoMeta(true);

      try {
        const resultado = await MetaService.obterPorId(id);

        if (!resultado.success) {
          throw new Error(resultado.message || "Erro ao carregar meta.");
        }

        const meta = resultado.data?.meta || resultado.data || {};

        setValue("nome", meta.nome || "");
        setValue("mes", meta.mes || "");
        setValue("ano", meta.ano ? String(meta.ano) : "");
        setValue("valor", meta.valor ?? meta.meta ?? "");
      } catch (error) {
        setSubmitError(error.message || "Erro ao carregar meta.");
      } finally {
        setCarregandoMeta(false);
      }
    }

    carregarMeta();
  }, [id, setValue]);

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

    const resultado = await MetaService.editar(id, {
      ...data,
      valor: Number(data.valor),
    });

    setLoading(false);

    if (resultado.success) {
      setSubmitSuccess(resultado.message || "Meta atualizada com sucesso.");
      setTimeout(() => navigate("/metas"), 1200);
    } else {
      setSubmitError(resultado.message || "Erro ao atualizar meta.");
    }
  };

  const handleRemover = async () => {
    setSubmitError("");
    setSubmitSuccess("");
    setLoading(true);

    const resultado = await MetaService.deletar(id);

    setLoading(false);

    if (resultado.success) {
      setSubmitSuccess(resultado.message || "Meta removida com sucesso.");
      setTimeout(() => navigate("/metas"), 1000);
    } else {
      setSubmitError(resultado.message || "Erro ao remover meta.");
    }
  };

  if (carregandoMeta) {
    return <p className="m-2 text-slate-600">Carregando meta...</p>;
  }

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
              Nova Meta
            </h1>

            <fieldset className="flex flex-1 flex-col gap-2 border-0 p-0 m-0">
              <Input
                label="Nome"
                name="nome"
                id="nome"
                placeholder=""
                value={watch("nome")}
                onChange={handleFormChange}
              />
              {errors.nome && (
                <span className="px-2 text-xs text-rose-600">
                  {errors.nome.message}
                </span>
              )}

              <Select
                label="Mês"
                name="mes"
                id="mes"
                options={MESES}
                placeholder="Selecione"
                value={watch("mes")}
                onChange={handleFormChange}
              />
              {errors.mes && (
                <span className="px-2 text-xs text-rose-600">
                  {errors.mes.message}
                </span>
              )}

              <Select
                label="Ano"
                name="ano"
                id="ano"
                options={ANOS}
                placeholder="Selecione"
                value={watch("ano")}
                onChange={handleFormChange}
              />
              {errors.ano && (
                <span className="px-2 text-xs text-rose-600">
                  {errors.ano.message}
                </span>
              )}

              <Input
                label="Valor(R$)"
                name="valor"
                id="valor"
                type="number"
                placeholder=""
                value={watch("valor")}
                onChange={handleFormChange}
              />
              {errors.valor && (
                <span className="px-2 text-xs text-rose-600">
                  {errors.valor.message}
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
                  label={loading ? "Salvando..." : "Criar"}
                  name="salvar"
                  id="salvar"
                  type="submit"
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
                  type="button"
                  grande
                  bgColor="#EEE5E9"
                  fontcolor="#114B5F"
                  onClick={() => navigate("/metas")}
                  className="sm:text-sm sm:h-[35px] sm:px-6"
                />
              </div>
              <div className="sm:w-fit">
                <Button
                  label="Remover"
                  name="remover"
                  id="remover"
                  type="button"
                  disabled={loading}
                  grande
                  bgColor="#E05C34"
                  fontcolor="#fff"
                  onClick={handleRemover}
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

export default EdicaoMeta;
