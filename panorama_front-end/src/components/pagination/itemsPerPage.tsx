import './itemsPerPage.css'

export const ItemsPerPage: React.FC<{
    onChange: (value: React.ChangeEvent<HTMLSelectElement>)=> void, 
    itemValue: number
}> = ({onChange, itemValue}) => {
    return (
        <div className="itemsPerPage-content">
            <legend>Itens por página</legend>
            <select name="itemsPerPage" value={itemValue} onChange={onChange}>
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="24">24</option>
            </select>
        </div>
    )
}