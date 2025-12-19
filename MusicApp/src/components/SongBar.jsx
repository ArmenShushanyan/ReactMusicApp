import PlayPause from './PlayPause';

export default function SongBar({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) {
  return (
    <div className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong?.id === song?.id ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.album?.images?.[0]?.url}
          alt={song?.name}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <p className="text-xl font-bold text-white">{song?.name}</p>
          <p className="text-base text-gray-300 mt-1">
            {song?.artists?.[0]?.name}
          </p>
        </div>
      </div>
      {song?.preview_url && (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, i)}
        />
      )}
    </div>
  )
}
