const {Grid} = MaterialUI


function BreakTime(props) {
  return (
    <div className="block">
    <div id="break-label" className="title">Break Length</div>
    <div id="break-increment" className="touch" onClick={props.breakIncrement}><i class="fas fa-chevron-circle-up"></i></div>
    <div id="break-length">{props.breakTime}</div>
      <div className="min">min</div> 
    <div id="break-decrement" className="touch" onClick={props.breakDecrement}><i class="fas fa-chevron-circle-down"></i></div>
   </div>
  )
}
function SessionTime(props) {
  return (
    <div className="block">
      <div id="session-label" className="title">Session Length</div>
      <div id="session-increment" className="touch" onClick={props.sessionIncrement}><i class="fas fa-chevron-circle-up"></i></div>
      <div id="session-length">{props.sessionTime}</div> 
      <div className="min">min</div> 
      <div id="session-decrement" className="touch" onClick={props.sessionDecrement}><i class="fas fa-chevron-circle-down"></i></div>
    </div>
  )
}
function Timer(props){
  return(
    <>
    <h1 id="timer-label" className="title session">{props.timerTitle}</h1>
    <div className="control">
      <div id="start_stop" className="actionButton" onClick={props.handleStartStop}>
      <i className="fas fa-play"></i><i className="fas fa-pause"></i>
      </div>
      <div id="reset" className="actionButton" onClick={props.handleReset}>reset</div>
    </div>
   <div id="time-left">{props.timeLeft}</div>
      <audio id="beep" src="https://actions.google.com/sounds/v1/emergency/beeper_emergency_call.ogg" preload="auto"/>
      
  </>
  )
}

  
function App() {
  
  let [breakTime, setBreakTime] = React.useState(300)
 let [sessionTime, setSessionTime] = React.useState(1500)
 let [timeLeft, setTimeLeft] = React.useState(1500)
  let [timerTitle, setTimerTitle] = React.useState('Session')
  let [isStart, setIsStart] = React.useState(false)
  let [timerInterval, setTimerInterval] = React.useState(null)

 
  // time conversion
  function timeConv(timeLeftInSecond){ 
        let minutes = Math.floor(timeLeftInSecond / 60);
        if(minutes < 10){
            minutes = "0"+minutes
        }
        let seconds = Math.floor(timeLeftInSecond - minutes * 60);
        if(seconds < 10){
            seconds = "0"+seconds
        }
        return `${minutes}:${seconds}`;
    }
   
  // Time management function -- to be refactored
  
  const sessionIncrement = () => {
    if (sessionTime<3600 && !isStart){
      setSessionTime(sessionTime+60)
      setTimeLeft(sessionTime+60)
    }
   else {sessionTime}
  }
  const sessionDecrement = () => {
    if (sessionTime>60  && !isStart ){
      setSessionTime(sessionTime-60)
      setTimeLeft(sessionTime-60)
    }
    else(sessionTime)
   
  }
  const breakIncrement = () => {
    if (breakTime<3600  && !isStart){
      setBreakTime(breakTime+60)
    }
    else(breakTime)
 
  }
  const breakDecrement = () => {
    if (breakTime>60  && !isStart ){
      setBreakTime(breakTime-60)
    }
     else(breakTime)

  }

  // Session function 
  // button start stop
  const handleReset = () => {
  setTimeLeft(1500);
  setBreakTime(300), 
  setSessionTime(1500)
  setIsStart(false)
  setTimerInterval(null)
  setTimerTitle("Session")
  timerInterval && clearInterval(timerInterval)
  const beep = document.getElementById('beep');
  beep.currentTime = 0;
  beep.pause();
  }
   
  const handleStartStop = () => { 
    if (!isStart){
      setIsStart(!isStart)
      setTimerInterval(
      setInterval(() => {
          timerDown();
          ToggleBreakSession();
        }, 1000))
    }          
    else  {
      timerInterval && clearInterval(timerInterval)
      setIsStart(!isStart)
      setTimerInterval(null)  
    }
  }
   
  const timerDown = () => {
      setTimeLeft(timeLeft = timeLeft-1)
  }
  
 const ToggleBreakSession= () => {
    if (timeLeft === 0) {
      const beep = document.getElementById('beep');
      beep.currentTime = 0;
      beep.play();
    }      
    else if (timeLeft === -1){
      if (timerTitle === 'Session') {
       setTimeLeft(timeLeft = breakTime)
       setTimerTitle(timerTitle = 'Break') 
      } 
      else {
      setTimeLeft(timeLeft = sessionTime)
      setTimerTitle(timerTitle = 'Session')
      }
    } 
 } 

  return (
    <Grid
     container
     justify="center"
     align-items="center"
     
   >
    <Grid item container xs={10} justify="center" align-items="center" className="mainContainer"> 
    <Grid item xs={6} align="center">
    <BreakTime
        breakTime={Math.floor(breakTime/60)}
        breakIncrement={breakIncrement}
        breakDecrement={breakDecrement}
        /> 
    </Grid>   
    <Grid item xs={6} align="center">
      <SessionTime
        sessionTime={Math.floor(sessionTime/60)}
        sessionIncrement={sessionIncrement}
        sessionDecrement={sessionDecrement}
      />
    </Grid>
      
    <Grid item align="center" className='timerContainer'>
     <Timer
       handleStartStop={handleStartStop}
       timerTitle={timerTitle}
       timeLeft={timeConv(timeLeft)}
       handleReset={handleReset}
       />
     </Grid>
    </Grid>
   </Grid>
  )
}
 
ReactDOM.render(
  <App />, document.getElementById("root")

)
