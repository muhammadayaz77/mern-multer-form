import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
function App() {
  let data = useRef();
  let [imgData,setImgData] = useState('');
  let handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', data.current.files[0]);
    axios.post("http://localhost:3000/upload",formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
  useEffect(()=>{
    axios.get("http://localhost:3000/getImages")
    .then(res => {
      setImgData(res.data[res.data.length - 1].image)
    })
    .catch(err => console.log(err))
  },[imgData])
  return (
    <>
    <h1>Upload File</h1>
    <form 
    onSubmit={handleSubmit}
    action="">
      <input 
      ref={data}
      type="file" name="" id="" />
      <button>Submit</button>
      <img src={`http://localhost:3000/Images/${imgData}`} alt="not found" />
    </form>
    </>
  )
}

export default App