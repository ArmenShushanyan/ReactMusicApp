import { Error, Loader, ArtistCard } from '../components'
import {useGetTopTracksQuery} from '../redux/services/spotifyCoreApi'
import { getSpotifyToken } from '../redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function TopArtists () {
    const dispatch = useDispatch()
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
    } = useGetTopTracksQuery('4liDm4FUbLZKkN7hmwBB0x', {
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
                <h2 className='font-bold text-3xl text-white text-left'>Discover Top Artists</h2>
            </div>

            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {data?.tracks.map((track) => (
                    <ArtistCard 
                      key={track.id}
                      track={track}
                    />
                ))}
            </div>
        </div>
    )
}

