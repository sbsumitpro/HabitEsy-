const statCountTag = document.querySelectorAll(".statCount");
const daysTag = document.querySelectorAll(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");
const images = ["https://cdn-icons-png.flaticon.com/128/11512/11512309.png","https://cdn-icons-png.flaticon.com/128/190/190411.png","https://cdn-icons-png.flaticon.com/128/1828/1828665.png"]

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
currDate = date.getDate()

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

        let x = i
        if(i<1){
            x = lastDateofLastMonth+i
        }else if(i>lastDateofMonth){
            x = i-lastDateofMonth
        }
        id = new Date(currYear, currMonth, x).toLocaleDateString();
        
        let stat = 0
        srcURl = images[0]
        if (getHabbitStatus[id]==1){
            stat = 1
            srcURl = images[1]
        }else if(getHabbitStatus[id]==2){
            stat = 2
            srcURl = images[2]
        }
        let isToday = i === new Date().getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";

        liTag += `<li class="list_item ${isToday}"> 
            <span id="${id}">${x}</span>
        <div>
            <img onclick="fun(this)" src="${srcURl}" date=${id} stat=${stat} class="status-icon" height="20px" width="20px" alt="cross"/>
        <div>
        </li>`;
    }
    return liTag;
}

const renderCalendar = async () => {
    currentDate.innerText = `${months[currMonth]} ${currYear}`;

    for(let i=0;i<daysTag.length;i++){
        var habitId = daysTag[i].closest(".habbit-div").getAttribute('data_id');
        let statusCount = await getCompletedStatCount(habitId);
        let liTag = await getCalendar(habitId);
        daysTag[i].innerHTML = liTag;
        statCountTag[i].innerHTML= statusCount;
    }
}

if(currentDate){
    renderCalendar();
}

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {

        date = icon.id === "prev" ? new Date(currYear,currMonth,currDate-7) : new Date(currYear,currMonth,currDate+7);
        currYear = date.getFullYear();
        currMonth = date.getMonth();
        currDate = date.getDate();

        renderCalendar();
    });
});

// This is handling the ajax call after we click the toggle button and the rendeing the new status accordingly
async function fun(e){
    habbitDivElm = e.parentNode.parentNode.parentNode.parentNode
    habbit_id = habbitDivElm.getAttribute("data_id")
    habbit_index=habbitDivElm.getAttribute("id")
    date = e.getAttribute("date")
    icon = e.getAttribute("src")
    stat = e.getAttribute("stat")
    stat = (Number(stat)+1)%3

    data = {"date":date, "habbit_id":habbit_id, "stat":stat}
    var resp = await fetch("/habbits/status/toggle",{      // Making post call to send data to server
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }); 
    if(resp.ok){
        res = await resp.json()                      // Fetching the data from the server and then based on that changing the UI for status
        e.setAttribute("src", images[stat])
        e.setAttribute("stat", stat)
        statCountTag[habbit_index].innerHTML = await getCompletedStatCount(habbit_id)
    }
}

async function getAllDatesOfStatusForHabit(habbit_id) {
    //get request , habit id , return all dates --> status
    var resp = await fetch(`http://localhost:7000/habbits/status/${habbit_id}`);
    var data = await resp.json();
    return data.data;

}

async function getCompletedStatCount(habbit_id){
    var resp = await fetch(`http://localhost:7000/habbits/status/count/${habbit_id}`);
    var data = await resp.json();
    return data.data;
}

