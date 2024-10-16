import { useState } from 'react';
import { FaRegPauseCircle } from 'react-icons/fa';
import { FaRegCirclePlay } from 'react-icons/fa6';

interface Props {
  audio: string;
}
const LocationAudio = ({ audio }: Props) => {
  const [audioPlaying, setAudioPlaying] = useState(false);

  const handleAudioClick = () => {
    const audio: any = document.getElementById('audioPlayer');
    if (audio) {
      if (!audioPlaying) {
        setAudioPlaying(true);
        audio.play();
      } else {
        audio.pause();
        setAudioPlaying(false);
      }
    }
  };
  return (
    <>
      <div hidden={audioPlaying}>
        <FaRegCirclePlay
          onClick={handleAudioClick}
          size={30}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div hidden={!audioPlaying}>
        <FaRegPauseCircle
          onClick={handleAudioClick}
          size={30}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <audio id='audioPlayer' controls style={{ display: 'none' }}>
        <source src={audio} type='audio/mp3' />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default LocationAudio;
