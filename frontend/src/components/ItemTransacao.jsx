import { Trash2, Edit2 } from 'lucide-react';

/**
 * ItemTransacao
 * 
 * Componente que renderiza um item individual em uma listagem.
 * Exibe informações resumidas e ações (editar, deletar) se aplicável.
 * 
 * Props:
 * - id: identificador único do item
 * - nome: nome/descrição do item
 * - valor: valor numérico ou formatado
 * - data: data do item (opcional)
 * - categoria: categoria do item (opcional)
 * - natureza: tipo/natureza do item (opcional)
 * - onEdit: callback ao clicar em editar
 * - onDelete: callback ao clicar em deletar
 * - onClick: callback ao clicar no item
 */
export default function ItemTransacao({
  id,
  nome,
  valor,
  data = '',
  categoria = '',
  natureza = '',
  onEdit = () => {},
  onDelete = () => {},
  onClick = () => {},
}) {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm('Tem certeza que deseja deletar este item?')) {
      onDelete(id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(id);
  };

  return (
    <article
      onClick={() => onClick(id)}
      className="flex flex-1 items-center justify-between p-4 mb-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-[#114B5F] transition-all cursor-pointer"
    >
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 truncate">{nome}</h3>
        <div className="flex flex-1 gap-2 text-xs text-gray-500 flex-wrap">
          {data && <span>{data}</span>}
          {categoria && <span>•</span>}
          {categoria && <span>{categoria}</span>}
          {natureza && <span>•</span>}
          {natureza && <span>{natureza}</span>}
        </div>
      </div>

      <div className="flex flex-1 items-center gap-3 justify-end min-w-0 ml-4">
        <span className="font-bold text-[#114B5F] text-sm whitespace-nowrap">
          R$ {typeof valor === 'number' ? valor.toFixed(2) : valor}
        </span>

        <button
          onClick={handleEdit}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          aria-label="Editar item"
          title="Editar"
        >
          <Edit2 size={18} />
        </button>

        <button
          onClick={handleDelete}
          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          aria-label="Deletar item"
          title="Deletar"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </article>
  );
}
