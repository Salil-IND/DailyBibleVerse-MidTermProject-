import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import versData from './versData.json'
import Votd from './components/Votd.jsx'
import LikedVerses from './components/LikedVerses.jsx'

import Navbar from './components/Navbar.jsx'
function App() {
  const [historyQueue, setHistQueue] = useState([])
  const [theme, setTheme] = useState('dark')
  const [likeList, setlikeList] = useState([])

  function toggleTheme() {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }


  function addHistQueue(id){
    historyQueue.push(id)
    setHistQueue(historyQueue)
  }

  function getRandId(){
    const availableVersList = versData.filter((item)=>{
      !historyQueue.includes(item.id)
    })

    return Math.floor(Math.random()*availableVersList.length)
  }
  async function getVerse(id) {
    const apiKey = "YxOrYAvMYz4o18xG5mSRs"
    // const randomID = getRandId()
    addHistQueue(id)
    const baseURL = `https://rest.api.bible/v1/bibles/9879dbb7cfe39e4d-01/verses/${versData[randomID-1].reference}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false&include-verse-spans=false&use-org-id=false`
    useEffect(() => {
      setLoading(true)
      const data = undefined;
      axios.get(baseURL,
        {
          headers:{
            "api-key": apiKey
          }
        }
      ).then(res=>{
        console.log(res.data)
        data = res.data;
      })
    }, []);
    setLoading(false)
    return data;

  }

  useEffect(()=>{
    document.body.className = (theme === 'dark')?'bg-black':'bg-white'
  })
  return (
    <div>
      <BrowserRouter>
        <Navbar theme={theme} toggleTheme={toggleTheme}/>
        <Routes>
          <Route path="/" element={<Votd theme={theme} getRandId={getRandId} getVerse={getVerse} historyQueue={historyQueue}/>} />
          <Route path='/liked-verses' element={<LikedVerses theme={theme}/>} />
        </Routes>


      </BrowserRouter>



    </div>
  )
}

export default App;