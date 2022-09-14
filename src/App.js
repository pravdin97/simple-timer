import React from 'react';
import moment from 'moment';
import './App.css';
import NotificationSound from "./notification-sound.mp3";

function getLimit() {
  return 1000 * 60 * 40;
};

const STEP = 1000;
const message = `${getLimit() / (1000 * 60)} минут прошло. Встань!`;

function App() {
  const audioPlayer = React.useRef(null);
  const [time, setTime] = React.useState(getLimit());
  const [timerId, setTimerId] = React.useState(null);

  const stopTimer = React.useCallback(() => {
    clearInterval(timerId);
    setTimerId(null);
    setTime(getLimit());
  }, [timerId]);

  React.useEffect(() => {
    if (time <= 0) {
      stopTimer();
      notification();
    }
  }, [time, stopTimer]);

  const notification = () => {
    audioPlayer.current.play();
    alert(message);
  }

  const startTimer = () => {
    if (timerId) {
      return;
    }
    const id = setInterval(() => {
      setTime((t) => t - STEP);
    }, STEP);
    setTimerId(id);
  }

  const value = `${moment.duration(time).minutes()} : ${moment.duration(time).seconds()}`;

  return (
    <div className='container'>
      <div className='flex-container'>
        <div>
          {value}
        </div>
        <div className='button-container'>
          <button type='button' className='button' onClick={startTimer}>START</button>
          <button type='button' className='button' onClick={stopTimer}>STOP</button>
        </div>
        <audio ref={audioPlayer} src={NotificationSound} />
      </div>
    </div>
  );
}

export default App;
