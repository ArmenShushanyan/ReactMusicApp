import {FaPlayCircle, FaPauseCircle} from 'react-icons/fa'

export default function PlayPause({ isPlaying, activeSong, song, handlePause, handlePlay }) {
  const isActive =  activeSong?.id === song.id

  return (
    <>
      {isPlaying && isActive ? (
        <FaPauseCircle className='text-gray-300' size={35} onClick={handlePause}/>
      ) : (
        <FaPlayCircle className='text-gray-300' size={35} onClick={handlePlay}/>
      )}
    </>
  )
}
