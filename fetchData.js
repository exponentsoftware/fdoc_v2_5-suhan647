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
    console.log("rockets", rockets);
    console.log("payloads", payloads);
    
    launchesresult(); 
    findMostCommonRockets(launches,rockets);
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
        // console.log("sf", launch.success);
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
  

  function findMostCommonRockets(launchesData, rocketsData) {
   
    const launches = launchesData.map((launch) => launch.map((a) => {
        return a.name
    }));
  
    console.log("launches1", launches)
   
    const rocketCounts = launches.reduce((counts, rocket) => {
      counts[rocket] = (counts[rocket] || 0) + 1;
      return counts;
    }, {});
  
    console.log("rocketCounts", rocketCounts)
  
    const sortedRockets = Object.keys(rocketCounts).sort(
      (a, b) => rocketCounts[b] - rocketCounts[a]
    );
    console.log("sortedRockets", sortedRockets)
    
    const rocketNames = rocketsData.reduce((names, rocket) => {
      names[rocket.id] = rocket.name;
      return names;
    }, {});

    console.log("rocketNames", rocketNames)
  
    const top5Rockets = sortedRockets.slice(0, 5).map((rocket) => ({
      rocket: rocket,
      name: rocketNames[rocket],
      launches: rocketCounts[rocket],
     
    }));

    return top5Rockets;
  }
  