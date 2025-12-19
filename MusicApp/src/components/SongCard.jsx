import { useDispatch } from 'react-redux'
import PlayPause from './PlayPause'
import { playPause, setActiveSong } from '../redux/features/playerSlice'

export default function SongCard({song, isPlaying, activeSong, i, data}) {
  const dispatch = useDispatch()
 
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    console.log('Preview URL:', song?.preview_url);

    dispatch(setActiveSong({song, data, i}))
    dispatch(playPause(true))
  }

  const albumImage = song?.album?.image?.[0]?.url

  return (
    <div className='flex flex-col w-[200px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
      <div className='relative w-full h-55 group'>
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.id === song.id ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause 
            song={song} 
            isPlaying = {isPlaying}
            activeSong = {activeSong}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}  
          />
        </div>
        <img src={albumImage} alt={song?.name || 'Album Cover'} className='w-full h-full object-cover rounded-lg' />
      </div>

      <div className='mt-4 flex flex-col'>
        <p className='font-semibold text-white text-lg truncate'>
          {song?.name}
        </p>
        <p className='text-sm text-gray-300 mt-1 truncate'>
          {song?.artists?.[0]?.id || song?.artist?.name}
        </p>
      </div>
    </div>
  )
};
