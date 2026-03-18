import VerseModal from './VerseModal.jsx'
import versData from '../versData.json'


function Votd({theme, getRandId, getVerse, historyQueue}) {
    const randId = getRandId()
    const data = getVerse(randId)
    const verse = data.content;
    const verseInfo = versData[randId-1].originalReference;


  return (
    
    <div className='w-full min-h-[calc(100vh-5rem)] flex items-center justify-center p-4'>
        
      <div className={`flex-row p-2 h-fit w-fit rounded-3xl ${
      theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'
    }`} >
        <div className='min-h-[40vh] min-w-[50vw] max-w-3xl w-full rounded-2xl backdrop-blur-md bg-gray-600/20 border border-white/30 shadow-xl p-8 flex flex-col items-center justify-center'>
        
        {/* Placeholder text so you can see the layout */}
        <p className="text-2xl md:text-3xl font-serif italic text-center mb-6">
          "{verse}"
        </p>
        <p className="text-lg font-bold tracking-wider">
          - {verseInfo}
        </p>

        </div>
        <div className='h-1/5 w-1/1 p-1 flex justify-evenly'>
            {/**Like Button  */}
            <i className={`fa-solid fa-heart p-5 ${
             theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`} 
             style={{color: "rgb(255, 0, 0)"}}></i>
            {/*New Verse button*/}
            <i className={`fa-solid fa-arrows-rotate p-5 ${
             theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`} 
             style={{color: "rgb(116, 192, 252)"}}></i>
        </div>
      </div>
      

    </div>
  )
}

export default Votd;