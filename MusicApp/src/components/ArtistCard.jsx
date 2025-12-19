import { useDispatch, useSelector } from "react-redux"
import { getSpotifyToken } from "../redux/features/authSlice"
import { useGetArtistQuery } from "../redux/services/spotifyCoreApi"
import { useEffect } from "react"

const ArtistsCardImg = ({artistID}) => {
  const { data: artistsData, isFetching} = useGetArtistQuery(artistID)

  if(isFetching) return null

  return(
    <img src={artistsData?.images} alt={artistsData?.name} className=" w-full h-56 rounded-lg"/>
  )
}

export default function ArtistCard({ track }) {
    const dispatch = useDispatch()
    const { accessToken, loading: tokenLoading } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!accessToken) {
            dispatch(getSpotifyToken())
        }
    }, [accessToken, dispatch])

  return (
    <div className="flex flex-col w-[200px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <ArtistsCardImg artistID={track.artist.id} />
      <p className="mt-4 font-semibold text-lg text-white truncate">{track.artist.name}</p>
    </div>
  )
};


