import { Error, Loader, SongCard } from '../components'
import {useGetTopTracksQuery} from '../redux/services/spotifyCoreApi'
import { getSpotifyToken } from '../redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function AroundYou () {
    const dispatch = useDispatch()
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const { accessToken, loading: tokenLoading } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!accessToken) {
            dispatch(getSpotifyToken())
        }
    }, [accessToken, dispatch])

    const {
        data: topTracksData, 
        isFetching: fetchingTopTracks, 
        error: topTracksError,
    } = useGetTopTracksQuery('7AzF3a9z1CeuF13peMLbjB', {
        skip: !accessToken
    })

    const data = topTracksData
    
    const isFetching = fetchingTopTracks || tokenLoading
    const error = topTracksError 

    if(isFetching) {
        return <Loader title='Loading songs...' />
    }

    if(error) {
        return <Error />
    }

    return (
        <div className='flex flex-col'>
            <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
                <h2 className='font-bold text-3xl text-white text-left'>Discover Armenian Songs</h2>
            </div>

            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {data?.tracks?.map((song, i) => (
                    <SongCard 
                        key={song.id}
                        song={song} 
                        isPlaying = {isPlaying}
                        activeSong = {activeSong}
                        i = {i}
                        data = {data}
                    />
                ))}
            </div>
        </div>
    )
}

