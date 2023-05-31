const Contacts = ({persons, filterText, deleteContact}) => {
    return (
        <div>
            {persons
            .filter((person) => person.name.toLowerCase().includes(filterText.toLowerCase()))
            .map((person) => (
                <div style={{display: 'flex'}} key={person.id}>
                    <p style={{ margin: 0, marginRight: '1rem' }}>{person.name} {person.number}</p>
                    <button onClick={() => deleteContact(person)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default Contacts;