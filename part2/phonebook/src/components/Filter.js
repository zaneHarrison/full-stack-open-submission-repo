const Filter = ({filterText, handleFilterChange}) => {
    return (
        <div>
            Filter:
            <input
                name={"filter"}
                value={filterText}
                onChange={handleFilterChange}
            />
        </div>
    )
}

export default Filter;