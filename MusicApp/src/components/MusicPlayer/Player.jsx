import { useRef, useEffect } from 'react'

export default function Player ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) {

  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeSong])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current && !isNaN(seekTime)) {
      audioRef.current.currentTime = seekTime
    }
  }, [seekTime]);

  if (!activeSong?.preview_url) return null

  return (
    <audio
      src={activeSong?.preview_url}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  )
}
