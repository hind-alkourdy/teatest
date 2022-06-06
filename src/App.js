import React from 'react';
import  get  from 'lodash/get';
  
import forEach from 'lodash/forEach';
  var i=0;
 class App extends React.Component {

  constructor(props) {
    var now2 = new Date();
    var date=now2.getDay+ '/' +now2.getMonth+ '/' +now2.getFullYear;
    var current2 = now2.getHours() + ':' + now2.getMinutes()+ ':' + now2.getSeconds();
    console.log( "current: "+current2);
    
    var dt = Date.parse(current2);  
    dt= dt / 1000;  
      super(props);
      this.state = {
        bpi: {},
        time: {},
        currentDateTime: dt,
        currentDateTimeReal: current2
      };
  }
  //   toTimestamp(strDate)  {  
  //   const dt = Date.parse(strDate);  
  //   dt= dt / 1000;  
  // }  
 FetchData(){
   this.setState({
     loading:1,
   });
  i++;
  var headers = {}

    fetch('https://ourtestingwork.website/getTime.php?xx='+Math.random()  )
    .then(results => {
      console.log(results);
     return results.json();
    }).then(data => {
        console.log( "servertime  "+data.servertime);
     
        var dt24 = Date.parse(data.servertime );  
        dt24= dt24 / 1000; 
 
        this.setState({
       
        mmd:dt24,
        mmdReal:data.servertime,
        loading:0,
        });
     
    });

  }

  CalculateDefrence(){
    var now2 = new Date();
    var date= now2.getDay()+ '/' +now2.getMonth()+ '/' +now2.getFullYear();
    var startDate = Date.parse(date+" "+this.state.currentDateTimeReal);
// Do your operations
var endDate   = Date.parse(date+" "+this.state.mmdReal );
var seconds = (startDate - endDate) / 1000;
console.log("date:"+date );
console.log("startDateee:"+startDate );
console.log("endDateee:"+endDate);
console.log("seconds:"+seconds);
this.secondsToHms(seconds);
  

  }
  componentDidMount() {
    var now2 = new Date();
    var current2 = now2.getHours() + ':' + now2.getMinutes()+ ':' + now2.getSeconds();
    console.log( "current: "+current2);
    var dt = Date.parse(current2);  
    dt= dt / 1000;  
    this.setState({ currentDateTime: dt });
    this.FetchData();
    var timer =1;
     setInterval(() =>{
      timer++;
      if(timer>30){
        timer=1;
      }
    this.setState({ timermm: timer });
    this.CalculateDefrence();
  } , 1000);
    this.interval = setInterval(() =>{

        now2 = new Date();
      current2 = now2.getHours() + ':' + now2.getMinutes()+ ':' + now2.getSeconds();
    console.log( "current: "+current2);

      var dt2 = Date.parse(current2);  
      dt2= dt2 / 1000;  
      this.setState({ currentDateTime: dt2 });
      this.setState({ currentDateTimeReal: current2 });
      this.FetchData();
      var timestamp = this.state.currentDateTime-this.state.mmd;
      console.log("timestamp"+timestamp);
      var dates =   Date.parse(timestamp);
      console.log("dates"+dates);
      this.setState({ currentDateTimeDef: dates });
      
    } , 30000);
  }

 
  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    this.setState({
   
      seconds:hDisplay + mDisplay + sDisplay
      });
   
   
}
 

  render() {
    var mloadinn;
    if(this.state.loading==1){
      mloadinn=<strong> <img src="/loading.png" alt="BigCo Inc. logo"/></strong>
    }else{
      mloadinn= this.state.mmdReal
    }
    return (
      
      <div>
      
      
      
      <p>
<h2>Timer : { this.state.timermm }</h2>
  
        </p>
        <p>
<h2>My Time:</h2>
     
          { this.state.currentDateTimeReal }

        </p>

   
        <p>
<h2>Server Time:</h2>
{mloadinn}

        </p>
         
 
        
        <p>
<h2>Difference between Two times:</h2>
          { (this.state.seconds) }<br/>
 
          
        </p>
    </div>
    );
  }
}

export default App;