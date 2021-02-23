import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import jsonservfuncs from './jsonservfuncs'
import './index.css'

const Filter = ({filter, changeHandler}) => {
  return (
  <form>
    <div>
      filter shown entries by: <input value={filter} onChange={changeHandler}/>
    </div>
  </form>
  )
}

const AddPersonDialog = ({ curName, nameChangeHandler, curPhone, phoneChangeHandler, submitHandler }) => {
  return (
  <form onSubmit={submitHandler}>
    <div>
      name: <input value={curName} onChange={(event) => nameChangeHandler(event.target.value)} />
    </div>
    <div>
      phone: <input value={curPhone} onChange={(event) => phoneChangeHandler(event.target.value)} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const People = ({persons,filterfunc,delfunc}) => {

return (
  <div>
    <table>
      <tbody>
    {persons.filter(filterfunc).map(p => <tr key={p.name}><td><b>{p.name}</b></td><td>{p.number ? p.number : '-'}</td><td><button onClick={()=>{ delfunc(p) }}>Delete</button></td></tr>)}
    </tbody>
    </table>
  </div>
)
}

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  if (notification.err) {
  return (
    <div className="error">
      {notification.msg}
    </div>
  )
  }

  else {
    return (
      <div className="success">
        {notification.msg}
      </div>
    )
  }
}

const App = () => {

  const [ persons, setPersons ] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')

  const [ notification, setNotification ] = useState(null)

  const commitMsg = (message) => {
      const timeout = setTimeout(() => {
        setNotification(null)
      }, 5000)

      if (notification) {
        clearTimeout(notification.tout)
      }

      setNotification({...message, tout: timeout})
  }

  const showMessage = (messageText) => {
      commitMsg({msg: messageText, err: false})
  }

  const showError = (messageText) => {
      commitMsg({msg: messageText, err: true})
  }

  const addName = (event) => { 
    event.preventDefault()
    if (!newName) {
      showError("Name field is mandatory!")
      return
    }
    const existing = persons.find(p => p.name == newName) 
    if (existing) {
      if (existing.number != newPhone) {
        const ans = window.confirm(`${newName} is already in the phone book! Want to update phone number to ${newPhone}?`)
        if (ans) {
          jsonservfuncs.update(existing.id, {name: existing.name, number: newPhone})
          .then((resp) => {
            const copy = [...persons]
            const fp = copy.find(p => p.id === resp.id)
            if (fp) {
              fp.number = resp.number 
              setPersons(copy)
              showMessage(`Successfully updated ${fp.name}'s number to ${resp.number}!`)
            }
          }).catch((e) => {
            showError(e.message)
          })
        }
      }
      else {
        //alert(`${newName} is already in the phone book!`)
        showError(`${newName} already has an identical entry in the phone book!`)
      }
      return false
    }

    const newP = {name:newName, number: newPhone ? newPhone : "-"}
    const names = [...persons, newP ]

    jsonservfuncs.addEntry(newP)
    .then((resp)=> {
      setPersons([...persons, resp])
      setNotification({msg: `Succesfully added ${resp.name}!`, err: false})
    })

    return true
  }

  const deletePerson = (person) => {
    const ans = window.confirm(`Delete ${person.name} from phone book?`)
    if (!ans) return
    jsonservfuncs.deletePerson(person.id)
    .then( (e)=>{
      jsonservfuncs.getAll().then(
        (resp) => {
          setPersons(resp)
          showMessage('Delete successful!')
        }
      )
    }
    ).catch((e) => {
      if (e.response.status == 404) {
        setPersons(persons.filter(p => p.id !== person.id))
        showError(`Entry ${person.name} already deleted!`)
      }
    })
  }

  const filterFunc = (p) => p.name.toLowerCase().search(filter.toLowerCase()) >= 0

  return (
    <div>
      <Notification notification={notification}/>
      <h2>Phonebook</h2>
        <Filter filter={filter} changeHandler={(event) => { setFilter(event.target.value) }}/>
      <h3>Add new entry</h3>
        <AddPersonDialog curName={newName} nameChangeHandler={setNewName} curPhone={newPhone} phoneChangeHandler={setNewPhone} submitHandler={addName}/>
      <h3>Numbers</h3>
        <People persons={persons} filterfunc={filterFunc} delfunc={deletePerson} />
    </div>
  )

}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
