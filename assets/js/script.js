const statCountTag = document.querySelectorAll(".statCount");
const daysTag = document.querySelectorAll(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");
const images = ["https://cdn-icons-png.flaticon.com/128/11512/11512309.png","https://cdn-icons-png.flaticon.com/128/190/190411.png","https://cdn-icons-png.flaticon.com/128/1828/1828665.png"]

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
currDate = date.getDate()
// console.log(currYear,currMonth)

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const getCalendar = async(habbit_id)=>{
    let getHabbitStatus = await getAllDatesOfStatusForHabit(habbit_id)
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    startDate = new Date(date.getFullYear(), 0, 1);
    // currDate = new Date(currYear, currMonth, currDate).getDate()
    var firstWeekDate = currDate - date.getDay();

    let liTag = "";

    // Rendering the 7 days of the Calender of current week starting from Sunday to Saturday
    
    for (let i = firstWeekDate; i <= firstWeekDate+6; i++) {
        // console.log(date.getDate(), new Date().getMonth(), new Date().getFullYear())
        // let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
        //             && currYear === new Date().getFullYear() ? "active" : "";
        let x = i
        if(i<1){
            x = lastDateofLastMonth+i
        }else if(i>lastDateofMonth){
            x = i-lastDateofMonth
        }
        id = new Date(currYear, currMonth, x).toLocaleDateString();
        
        // console.log("getHabbitStatus",x, getHabbitStatus, typeof(getHabbitStatus[id]), id) 
        let stat = 0
        srcURl = images[0]
        if (getHabbitStatus[id]==1){
            stat = 1
            srcURl = images[1]
        }else if(getHabbitStatus[id]==2){
            stat = 2
            srcURl = images[2]
        }
        // console.log("srcURL",srcURl)
        liTag += `<li class="list_item"> <span id="${id}">${x}</span>
        <div>
    
        <img onclick="fun(this)" src="${srcURl}" date=${id} stat=${stat} class="status-icon" height="20px" width="20px" alt="cross"/>
    
        <div>
        </li>`;
    }
    return liTag;
}

const renderCalendar = async () => {
    // console.log(date)
    console.log(statCountTag)
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    // console.log("daysTag",daysTag);
    for(let i=0;i<daysTag.length;i++){
        var habitId = daysTag[i].closest(".habbit-div").getAttribute('data_id');
        let statusCount = await getCompletedStatCount(habitId);
        console.log('statusCount', statusCount);
        let liTag = await getCalendar(habitId);
        daysTag[i].innerHTML = liTag;
        statCountTag[i].innerHTML= statusCount;
    }
}
renderCalendar();
console.log(prevNextIcon)
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {

        date = icon.id === "prev" ? new Date(currYear,currMonth,currDate-7) : new Date(currYear,currMonth,currDate+7);
        currYear = date.getFullYear();
        currMonth = date.getMonth();
        currDate = date.getDate();

        renderCalendar();
    });
});

let dailyStatus = 0
function fun(e){

    habbitDivElm = e.parentNode.parentNode.parentNode.parentNode
    habbit_id = habbitDivElm.getAttribute("data_id")
    date = e.getAttribute("date")
    icon = e.getAttribute("src")
    stat = e.getAttribute("stat")
    // console.log("ew",ulElm.getAttribute("data_id"), date)
    index = images.indexOf(icon)
    e.setAttribute("src",images[(index+1)%(images.length)])
    console.log(date,habbit_id,stat)
    window.location.href = `/habbits/status/toggle?date=${date}&habbit_id=${habbit_id}&stat=${(stat+1)%3}`
}



async function getAllDatesOfStatusForHabit(habbit_id) {
    //get request , habit id , return all dates --> status

    var resp = await fetch(`http://localhost:5000/habbits/status/${habbit_id}`);
    var data = await resp.json();
    // console.log(data)
    return data.data;

}

async function getCompletedStatCount(habbit_id){
    var resp = await fetch(`http://localhost:5000/habbits/status/count/${habbit_id}`);
    var data = await resp.json();
    console.log(data)
    return data.data;
}
 