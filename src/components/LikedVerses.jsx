import { useState } from 'react';

function LikedVerses({ theme, likeList, toggleLike }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the list based on user search input
  const filteredVerses = likeList.filter(verse => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      verse.text.toLowerCase().includes(lowerQuery) || 
      verse.reference.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <div className={`min-h-[calc(100vh-5rem)] w-full flex flex-col items-center pt-12 px-4 transition-colors duration-300 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}>
      
      <h1 className="text-3xl font-bold mb-2">Saved Verses</h1>
      <p className="mb-8 opacity-70">You have {likeList.length} favorite verses.</p>

      {/* Search Filter (Project Constraint fulfilled here) */}
      <input 
        type="text"
        placeholder="Search by word or book..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`w-full max-w-xl p-4 mb-8 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
            : 'bg-white border-gray-300 text-black placeholder-gray-500'
        }`}
      />

      
      <div className="w-full max-w-2xl space-y-6 pb-12">
        {filteredVerses.length > 0 ? (
          filteredVerses.map((verse) => (
            <div 
              key={verse.id} 
              className={`p-6 rounded-2xl shadow-md flex flex-col relative ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              
              <button 
                onClick={() => toggleLike(verse)}
                className="absolute top-4 right-4 text-red-500 hover:scale-110 transition-transform cursor-pointer"
                title="Remove from favorites"
              >
                <i className="fa-solid fa-heart text-xl"></i>
              </button>

              <p className="text-lg font-serif italic mb-4 pr-8">"{verse.text.replace(/\[\d+\]/g, '')}"</p>
              <p className="text-sm font-bold text-blue-500">- {verse.reference}</p>
            </div>
          ))
        ) : (
          <div className="text-center opacity-50 mt-10">
            <i className="fa-solid fa-book-open text-4xl mb-4"></i>
            <p className="text-lg">
              {likeList.length === 0 ? "You haven't liked any verses yet." : "No saved verses match your search."}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

export default LikedVerses;