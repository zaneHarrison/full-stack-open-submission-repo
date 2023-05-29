const ContactForm = ({submitAction, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <>
            <form onSubmit={submitAction}>
                <div>
                Name: 
                <input 
                    name={"name"}
                    value={newName}
                    onChange={handleNameChange}
                />
                </div>
                <div>
                Number:
                <input 
                    name={"number"}
                    value={newNumber}
                    onChange={handleNumberChange}
                />
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default ContactForm;