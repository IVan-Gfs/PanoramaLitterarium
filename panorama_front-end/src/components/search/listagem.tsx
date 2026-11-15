
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

export type ListagemAction<T> = {
    key: string;
    label: string;
    icon: ReactNode;
    className?: string;
    onClick: (item: T) => void;
    visible?: (item: T) => boolean;
    disabled?: (item: T) => boolean;
};

type ListagemProps<T> = {
    data: T[];
    columns: ListagemColumn<T>[];
    actions?: ListagemAction<T>[];

    loading?: boolean;
    emptyMessage?: string;

    currentPage: number;
    totalPages: number;
    itemsPerPage: number;

    onPageChange: (page: number) => void;

    onItemsPerPageChange: (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => void;

    onRowClick?: (item: T) => void;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;

    showEdit?: (item: T) => boolean;
    showDelete?: (item: T) => boolean;

    showActions?: boolean;
};

const Listagem = <T,>({
    data,
    columns,
    actions = [],

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

    showEdit,
    showDelete,

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
                                        textAlign: column.align ?? 'left',
                                    }}
                                >
                                    {column.label}
                                </th>
                            ))}

                            {showActions && (
                                <th className="listagem-actions-header">
                                    Ações
                                </th>
                            )}

                        </tr>
                    </thead>

                    <tbody>

                        {loading && (
                            <tr>
                                <td
                                    colSpan={columns.length + (showActions ? 1 : 0)}
                                    className="listagem-message"
                                >
                                    Carregando...
                                </td>
                            </tr>
                        )}

                        {!loading && data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length + (showActions ? 1 : 0)}
                                    className="listagem-message"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}

                        {!loading && data.map((item, index) => (
                            <tr
                                key={index}
                                className={
                                    onRowClick
                                        ? 'listagem-row-clickable'
                                        : ''
                                }
                                onClick={() => onRowClick?.(item)}
                            >

                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        style={{
                                            textAlign: column.align ?? 'left',
                                        }}
                                    >
                                        {column.render
                                            ? column.render(item)
                                            : String(
                                                (
                                                    item as Record<string, unknown>
                                                )[column.key] ?? '-'
                                            )}
                                    </td>
                                ))}

                                {showActions && (
                                    <td className="listagem-actions">

                                        {onEdit && showEdit?.(item) !== false && (
                                            <button
                                                type="button"
                                                className="listagem-action-button listagem-action-edit"
                                                title="Editar"
                                                aria-label="Editar"
                                                onClick={(event) => handleEdit(event, item)}
                                            >
                                                <Pencil size={17} strokeWidth={2} />
                                            </button>
                                        )}

                                        {onDelete && showDelete?.(item) !== false && (
                                            <button
                                                type="button"
                                                className="listagem-action-button listagem-action-delete"
                                                title="Excluir"
                                                aria-label="Excluir"
                                                onClick={(event) => handleDelete(event, item)}
                                            >
                                                <Trash2 size={17} strokeWidth={2} />
                                            </button>
                                        )}

                                        {actions.map((action) => {
                                            const visible = action.visible?.(item) ?? true;
                                            if (!visible) return null;

                                            const disabled = action.disabled?.(item) ?? false;

                                            return (
                                                <button
                                                    key={action.key}
                                                    type="button"
                                                    className={`listagem-action-button ${action.className ?? ''}`}
                                                    title={disabled
                                                        ? `${action.label} indisponível`
                                                        : action.label}
                                                    aria-label={action.label}
                                                    disabled={disabled}
                                                    onClick={(event) => {
                                                        event.stopPropagation();

                                                        if (!disabled) {
                                                            action.onClick(item);
                                                        }
                                                    }}
                                                >
                                                    {action.icon}
                                                </button>
                                            );
                                        })}

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
