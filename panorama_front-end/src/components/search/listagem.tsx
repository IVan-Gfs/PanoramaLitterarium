import type { ReactNode } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

import Pagination from '../pagination/Pagination';
import { ItemsPerPage } from '../pagination/itemsPerPage';

import './listagem.css';

export type ListagemColumn<T> = {
    key: string;
    label: string;
    width?: string;
    align?: 'left' | 'center' | 'right';

    render?: (item: T) => ReactNode;
};

type ListagemProps<T> = {
    data: T[];
    columns: ListagemColumn<T>[];

    loading?: boolean;
    emptyMessage?: string;

    currentPage: number;
    totalPages: number;
    itemsPerPage: number;

    onPageChange: (page: number) => void;

    onItemsPerPageChange: (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => void;

    /**
     * Clique em qualquer lugar da linha.
     */
    onRowClick?: (item: T) => void;

    /**
     * Clique no botão de editar.
     */
    onEdit?: (item: T) => void;

    /**
     * Clique no botão de excluir.
     */
    onDelete?: (item: T) => void;

    /**
     * Define se a coluna de ações será exibida.
     * Por padrão é true.
     */
    showActions?: boolean;
};

const Listagem = <T,>({
    data,
    columns,

    loading = false,
    emptyMessage = 'Nenhum registro encontrado.',

    currentPage,
    totalPages,
    itemsPerPage,

    onPageChange,
    onItemsPerPageChange,

    onRowClick,
    onEdit,
    onDelete,

    showActions = true,
}: ListagemProps<T>) => {

    const handleEdit = (
        event: React.MouseEvent,
        item: T
    ) => {
        event.stopPropagation();

        onEdit?.(item);
    };

    const handleDelete = (
        event: React.MouseEvent,
        item: T
    ) => {
        event.stopPropagation();

        onDelete?.(item);
    };

    return (
        <div className="listagem">

            <div className="listagem-table-container">

                <table className="listagem-table">

                    <thead>
                        <tr>

                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    style={{
                                        width: column.width,
                                        textAlign:
                                            column.align ?? 'left',
                                    }}
                                >
                                    {column.label}
                                </th>
                            ))}

                            {showActions && (
                                <th
                                    className="listagem-actions-header"
                                >
                                    Ações
                                </th>
                            )}

                        </tr>
                    </thead>

                    <tbody>

                        {loading && (
                            <tr>
                                <td
                                    colSpan={
                                        columns.length +
                                        (showActions ? 1 : 0)
                                    }
                                    className="listagem-message"
                                >
                                    Carregando...
                                </td>
                            </tr>
                        )}

                        {!loading && data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={
                                        columns.length +
                                        (showActions ? 1 : 0)
                                    }
                                    className="listagem-message"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}

                        {!loading &&
                            data.map((item, index) => (
                                <tr
                                    key={index}
                                    className={
                                        onRowClick
                                            ? 'listagem-row-clickable'
                                            : ''
                                    }
                                    onClick={() =>
                                        onRowClick?.(item)
                                    }
                                >

                                    {columns.map((column) => (
                                        <td
                                            key={column.key}
                                            style={{
                                                textAlign:
                                                    column.align ??
                                                    'left',
                                            }}
                                        >
                                            {column.render
                                                ? column.render(item)
                                                : String(
                                                    (
                                                        item as Record<
                                                            string,
                                                            unknown
                                                        >
                                                    )[column.key] ??
                                                    '-'
                                                )}
                                        </td>
                                    ))}

                                    {showActions && (
                                        <td className="listagem-actions">

                                            {onEdit && (
                                                <button
                                                    type="button"
                                                    className="listagem-action-button listagem-action-edit"
                                                    title="Editar"
                                                    aria-label="Editar"
                                                    onClick={(event) =>
                                                        handleEdit(
                                                            event,
                                                            item
                                                        )
                                                    }
                                                >
                                                    <Pencil
                                                        size={17}
                                                        strokeWidth={2}
                                                    />
                                                </button>
                                            )}

                                            {onDelete && (
                                                <button
                                                    type="button"
                                                    className="listagem-action-button listagem-action-delete"
                                                    title="Excluir"
                                                    aria-label="Excluir"
                                                    onClick={(event) =>
                                                        handleDelete(
                                                            event,
                                                            item
                                                        )
                                                    }
                                                >
                                                    <Trash2
                                                        size={17}
                                                        strokeWidth={2}
                                                    />
                                                </button>
                                            )}

                                        </td>
                                    )}

                                </tr>
                            ))}

                    </tbody>

                </table>

            </div>

            <div className="listagem-footer">

                <ItemsPerPage
                    itemValue={itemsPerPage}
                    onChange={onItemsPerPageChange}
                />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />

            </div>

        </div>
    );
};

export default Listagem;
