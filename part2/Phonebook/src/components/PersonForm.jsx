const PersonForm = ({handleSubmit, newName, handleChange, newNumber, handleChange1}) => {
  return(
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={handleChange1}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm