import { useState,useEffect } from 'react'
import axios from "axios"


function App() {
  const [notes, setnotes] = useState([

  ])
function fetchnotes(){
  axios.get("https://fullstack-deployment-uqpq.onrender.com/api/notes")
  .then((res)=>{
    console.log(res.data);
    setnotes(res.data.notes)
  })
}
 useEffect(()=>{
fetchnotes()
  },[])

function handlesubmit(e){
  e.preventDefault()
  const {title,description}=e.target.elements;
  console.log(title.value,description.value)
  axios.post("https://fullstack-deployment-uqpq.onrender.com/api/notes",{
    title:title.value,
    description:description.value
  })
  .then(res=>{
    console.log(res.data)
    fetchnotes()
  })
  
}
function handledeltenotes(noteId){
  axios.delete("https://fullstack-deployment-uqpq.onrender.com/api/notes/"+noteId)
  .then(res=>{
    console.log(res.data);
    fetchnotes()
  })
}

  return (
    <>
    <form className='create_notes' onSubmit={handlesubmit}>
      <input name='title' type="text" placeholder='Enter title'/>
      <input name='description' type="text" placeholder='Enter description' />
      <button>create note</button>
    </form>
     <div className='notes'>
      {
        notes.map((note)=>(
      <div className='note' key={note._id}>
        <h1>{note.title}</h1>
        <p>{note.description}</p>
        <button onClick={()=>{handledeltenotes(note._id)}}>delete</button>
      </div>
        ))
}
     </div>
    </>
  )
}

export default App
