import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import {useEffect, useState} from "react"
import './App.css';
import { db } from "./firebase";
import Todo from "./Todo";
import firebase from "firebase"



function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")


  useEffect(() => {
    db.collection("todos").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  })

  const addTodo = (event) => {
    event.preventDefault()
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput("")
  }
  
  return (
    <div className="App">
      <h1>TODO LIST MADE WITH REACT JS AND FIREBASE</h1>

      <FormControl>
        <InputLabel>Write a Todo</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)} />
        <Button disabled={!input} color="primary" variant="contained" type="submit" onClick={addTodo}>Add Todo</Button>
      </FormControl>

      <ul>
        {todos.map(todo => (
          <Todo todo={todo}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
