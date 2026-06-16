import ItemTransacao from './ItemTransacao';

/**
 * ListItemTransacao
 * 
 * Componente que renderiza uma lista de itens com suporte a paginação/scroll.
 * Utiliza ItemTransacao para cada item da lista.
 * 
 * Props:
 * - items: array de objetos representando os itens
 * - onEdit: callback ao editar um item
 * - onDelete: callback ao deletar um item
 * - onClick: callback ao clicar em um item
 * - loading: estado de carregamento (opcional)
 * - emptyMessage: mensagem a exibir quando lista vazia (opcional)
 */
export default function ListItemTransacao({
  items = [],
  onEdit = () => {},
  onDelete = () => {},
  onClick = () => {},
  loading = false,
  emptyMessage = 'Nenhum item encontrado',
}) {
  return (
    <section className="flex flex-1 flex-col w-full max-w-full">
      {loading ? (
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#114B5F] border-t-transparent mb-4"></div>
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-1 items-center justify-center p-8">
          <p className="text-gray-500 text-center">{emptyMessage}</p>
        </div>
      ) : (
        <div className="flex flex-1 flex-col overflow-y-auto gap-2 p-2 md:p-4">
          {items.map((item) => (
            <ItemTransacao
              key={item.id}
              id={item.id}
              nome={item.nome}
              valor={item.valor}
              data={item.data}
              categoria={item.categoria}
              natureza={item.natureza}
              onEdit={onEdit}
              onDelete={onDelete}
              onClick={onClick}
            />
          ))}
        </div>
      )}
    </section>
  );
}
