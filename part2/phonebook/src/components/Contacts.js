const Contacts = ({persons, filterText}) => {
    return (
        <div>
            {persons
            .filter((person) => person.name.toLowerCase().includes(filterText.toLowerCase()))
            .map((person) => (<p key={person.name} style={{ margin: 0 }}>{person.name} {person.number}</p>))}
        </div>
    )
}

export default Contacts;