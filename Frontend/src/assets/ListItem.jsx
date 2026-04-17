import './ListItem.css';

function ListItem({ item, isSelected, onSelect }) {
    return (
        <>
            <button 
                className={`list-item ${isSelected ? 'active' : ''}`}
                onClick={() => onSelect(item)}
            >
                {item.title}
            </button>
        </>
    )
}
export default ListItem