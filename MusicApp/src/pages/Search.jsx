import { Error, Loader } from '../components'
import { useGetSearchResultsQuery } from '../redux/services/spotifyCoreApi'
import { getSpotifyToken } from '../redux/features/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { setActiveSong, playPause } from '../redux/features/playerSlice'
import PlayPause from '../components/PlayPause'

export default function Search () {
    const dispatch = useDispatch()
    const { accessToken, loading: tokenLoading } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!accessToken) {
            dispatch(getSpotifyToken())
        }
    }, [accessToken, dispatch])

    const { searchTerm } = useParams()
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const { data, isFetching: fetchingSearch, error: searchError } = useGetSearchResultsQuery(searchTerm)
    
    const isFetching = fetchingSearch || tokenLoading
    const error = searchError

    const handlePauseClick = () => {
        dispatch(playPause(false))
    }
    
    const handlePlayClick = (song, i) => {    
        dispatch(setActiveSong({song, data: data.tracks.items, i}))
        dispatch(playPause(true))
    }

    if(isFetching) {
        return <Loader title='Loading Search...' />
    }

    if(error) {
        return <Error />
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-white text-3xl font-bold"> Search results for "{searchTerm}"</h2>

            <div className='flex flex-wrap sm:justify-start justify-center gap-8 w-[670px]'>
                <h3 className="text-xl text-white mb-3">Songs</h3>
                <div className="flex flex-wrap gap-6">
                    {data?.tracks?.items.map((song, i) => (
                        <div key={song.id} className='flex flex-col w-[200px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
                            <div className='relative w-full h-55 group'>
                                <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.id === song.id ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
                                    <PlayPause 
                                     song={song} 
                                     isPlaying = {isPlaying}
                                     activeSong = {activeSong}
                                     handlePause={handlePauseClick}
                                     handlePlay={() => handlePlayClick(song, i)}  
                                    />
                                </div>
                                <img src={song?.album?.images[0]?.url} alt={song?.name || 'Album Cover'} className='w-full h-full object-cover rounded-lg' />
                            </div>
                            <div className='mt-4 flex flex-col'>
                                <p className='font-semibold text-white text-lg truncate'>
                                {song?.name}
                                </p>
                                <p className='text-sm text-gray-300 mt-1 truncate'>
                                {song?.artists[0]?.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-[650px] flex-wrap sm:justify-start justify-center gap-8 ">
                <h3 className="text-xl text-white mb-3">Artists</h3>
                <div className="flex flex-wrap gap-6">
                    {data?.artists?.items.map((artists) => (
                        <div key={artists.id} className='flex flex-col w-[200px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
                            <div className='relative w-full h-55 group'>
                                <img src={artists?.images[0]?.url} alt={artists?.name || 'Album Cover'} className='w-full h-full object-cover rounded-lg' />
                            </div>

                            <div className='mt-4 flex flex-col'>
                                <p className='font-semibold text-white text-lg truncate'>
                                {artists?.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='w-[650px] flex-wrap sm:justify-start justify-center gap-8'>
                <h3 className="text-xl text-white mb-3">Albums</h3>
                <div className="flex flex-wrap gap-6">
                    {data?.albums?.items.map((album) => (
                        <div key={album.id} className='flex flex-col w-[200px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
                            <div className='relative w-full h-55 group'>
                                <img src={album?.images[0]?.url} alt={album?.name || 'Album Cover'} className='w-full h-full object-cover rounded-lg' />
                            </div>

                            <div className='mt-4 flex flex-col'>
                                <p className='font-semibold text-white text-lg truncate'>
                                {album?.name}
                                </p>
                                <p className='text-sm text-gray-300 mt-1 truncate'>
                                {album?.artists[0]?.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

