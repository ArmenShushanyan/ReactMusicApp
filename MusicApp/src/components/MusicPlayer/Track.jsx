export default function Track ({ isPlaying, isActive, activeSong }) {
  return (
    <div className="flex-1 flex items-center justify-start">
      <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
        <img src={activeSong?.album ? (activeSong?.album?.images?.[0]?.url ? activeSong?.album?.images?.[0]?.url : activeSong?.album?.image?.[0]?.url ): activeSong?.album?.images?.[0]?.url} alt="cover art" className="rounded-full" />
      </div>
      <div className="w-[50%]">
        <p className="truncate text-white font-bold text-lg">
          {activeSong?.name ? activeSong?.name : 'No active Song'}
        </p>
        <p className="truncate text-gray-300">
          {activeSong?.artist ? activeSong?.artist.name : activeSong?.artists[0].name}
        </p>
      </div>
    </div>
  )
}


