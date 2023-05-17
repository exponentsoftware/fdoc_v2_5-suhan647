const LAUNCHES_API_URL = 'https://api.spacexdata.com/v4/launches';
const ROCKETS_API_URL = 'https://api.spacexdata.com/v4/rockets'
const PAYLOADS_API_URL = 'https://api.spacexdata.com/v4/payloads'

let launches = [];
let rockets = [];
let payloads = [];

let fetchData = async () => {
  try {
    let launchdata = await fetch(LAUNCHES_API_URL);
    let data = await launchdata.json();
    launches.push(data);

    let rocketsdata = await fetch(ROCKETS_API_URL);
    let rdata = await rocketsdata.json();
    rockets.push(rdata);

    let payloadsdata = await fetch(PAYLOADS_API_URL);
    let pdata = await payloadsdata.json();
    payloads.push(pdata);

    console.log("launches", launches);
    // console.log("rockets", rockets);
    // console.log("payloads", payloads);
    
    launchesresult(); 
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();

const launchesresult = () => {
    let successful = 0;
    let unsuccessful = 0;
    let noresult = 0

    launches.forEach((innerArray) => {
      innerArray.forEach((launch) => {
        console.log("sf", launch.success);
        if(launch.success){
            successful++
        }else if(launch.success === false){
            unsuccessful++
        }else if(launch.success === null){
            noresult++
        }
      });
      console.log("successful", successful,"unsuccessful", unsuccessful, "null", noresult );
    });
  };
  
