import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import versData from './versData.json'

import Navbar from './components/Navbar.jsx'
import Votd from './components/Votd.jsx'
import LikedVerses from './components/LikedVerses.jsx'

function App() {
  const [theme, setTheme] = useState('dark')
  
  // Data States
  const [currentVerse, setCurrentVerse] = useState(null)

  const [isLoading, setIsLoading] = useState(true)
  const [historyQueue, setHistoryQueue] = useState([])

  const [likeList, setLikeList] = useState(()=>{
    const savedLikes = localStorage.getItem("likedVerses")
    return savedLikes ? JSON.parse(savedLikes) : []
  })

  // Add this right below your state declarations:
  useEffect(() => {
    localStorage.setItem('likedVerses', JSON.stringify(likeList));
  }, [likeList]); 

  function toggleTheme() {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'
  },
   [theme])

  
  const fetchNewVerse = () => {
    setIsLoading(true);
    let availableVerses = versData.filter(item => !historyQueue.includes(item.id));
    
    
    if (availableVerses.length === 0) {

      availableVerses = versData

      setHistoryQueue([])
    }

  
    const randomVerse = availableVerses[Math.floor(Math.random() * availableVerses.length)];

    setHistoryQueue(prev => {
      const newQueue = [...prev, randomVerse.id];

      if (newQueue.length > 30) newQueue.shift(); 
      return newQueue;
    });

    // 4. Make the API Call
    const apiKey = "YxOrYAvMYz4o18xG5mSRs"

    const baseURL = `https://rest.api.bible/v1/bibles/65eec8e0b60e656b-01/verses/${randomVerse.reference}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false&include-verse-spans=false&use-org-id=false`

    axios.get(baseURL, { headers: { "api-key": apiKey } })
      .then(res => {
        // api.bible nests the text inside res.data.data.content
        const fetchedText = res.data.data?.content || "Could not load verse text.";
        
        

        setCurrentVerse({
          id: randomVerse.id,
          text: fetchedText,
          reference: randomVerse.originalReference


        });
        setIsLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);

        setIsLoading(false);
      });
  }

  // Fetch the very first verse when the app loads
  useEffect(() => {
    fetchNewVerse();
  }, []);



  
  const toggleLike = (verseObj) => {
    const isLiked = likeList.some(v => v.id === verseObj.id);
    if (isLiked) {

      setLikeList(prev => prev.filter(v => v.id !== verseObj.id));
    } else {
      

      setLikeList(prev => [...prev, verseObj])


    }
  }

  return (
    <div>
      <HashRouter>
        <Navbar theme={theme} toggleTheme={toggleTheme} likeList={likeList}/>
        <Routes>
          <Route path="/" element={
            <Votd 
              theme={theme} 
              currentVerse={currentVerse} 
              isLoading={isLoading} 
              fetchNewVerse={fetchNewVerse}
              toggleLike={toggleLike}
              likeList={likeList}
            />
          } />
          <Route path='/liked-verses' element={
            <LikedVerses 
              theme={theme} 
              likeList={likeList} 
              toggleLike={toggleLike}
            />
          } />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;