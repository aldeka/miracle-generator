export const BELLS = {
  "1" : {
    url: "bells/bell1.mp3"
  },
  "2" : {
    url: "bells/bell2.mp3"
  },
  "3" : {
    url: "bells/bell3.mp3"
  },
  "4" : {
    url: "bells/bell4.mp3"
  },
  "5" : {
    url: "bells/bell5.mp3"
  }
}; [1, 2, 3, 4, 5];

const soundContext = new AudioContext();

Object.keys(BELLS).forEach((name) => {
  loadBell(name);
})

function loadBell(name){
  const url = BELLS[name].url;

  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    soundContext.decodeAudioData(request.response)
      .then((newBuffer) => {
        BELLS[name].buffer = newBuffer;
      });
  }
  request.send();
}


export default function playSound(name){
  const sound = BELLS[name];
  const soundVolume = BELLS[name].volume || 0.5;

  const buffer = sound.buffer;
  if (buffer){
    const source = soundContext.createBufferSource();
    source.buffer = buffer;

    const volume = soundContext.createGain();
    volume.gain.value = soundVolume;

    volume.connect(soundContext.destination);
    source.connect(volume);
    source.start(0);
  }
}