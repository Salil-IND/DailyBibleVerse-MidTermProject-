function Votd({ theme, currentVerse, isLoading, fetchNewVerse, toggleLike, likeList }) {
  
  const isLiked = currentVerse ? likeList.some(v => v.id === currentVerse.id) : false;

  return (
    <div className='w-full min-h-[calc(100vh-5rem)] flex items-center justify-center p-4'>
      
      <div className={`flex flex-col p-6 rounded-3xl shadow-2xl transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
      }`}>
        
        {/* Main Text Card */}
        <div className='min-h-[40vh] min-w-[50vw] max-w-3xl w-full rounded-2xl backdrop-blur-md bg-gray-500/10 border border-gray-400/20 p-8 flex flex-col items-center justify-center text-center'>
          
          {isLoading || !currentVerse ? (
            <p className="text-xl animate-pulse font-medium">Fetching divine inspiration...</p>
          ) : (
            <>
              {/* Cleaned up bracket numbers API sometimes returns by using replace */}
              <p className="text-2xl md:text-3xl font-serif italic mb-6">
                "{currentVerse.text.replace(/\[\d+\]/g, '')}"
              </p>
              <p className="text-lg font-bold tracking-wider text-blue-500">
                - {currentVerse.reference}
              </p>
            </>
          )}

        </div>

        {/* Buttons Section */}
        <div className='w-full mt-6 flex justify-evenly items-center'>
          
          {/* Like Button */}
          <button 
            onClick={() => !isLoading && toggleLike(currentVerse)}
            disabled={isLoading}
            className={`h-14 w-14 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 ${
              theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <i className={`fa-solid fa-heart text-2xl ${isLiked ? 'text-red-500' : 'text-gray-400'}`}></i>
          </button>

          {/* New Verse Button */}
          <button 
            onClick={fetchNewVerse}
            disabled={isLoading}
            className={`h-14 w-14 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 hover:rotate-180 ${
              theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <i className="fa-solid fa-arrows-rotate text-2xl text-blue-400"></i>
          </button>

        </div>
      </div>

    </div>
  )
}

export default Votd;