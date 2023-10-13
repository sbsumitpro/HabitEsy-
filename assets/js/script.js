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

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    startDate = new Date(date.getFullYear(), 0, 1);
    currDate = new Date(currYear, currMonth, currDate).getDate()
    var firstWeekDate = date.getDate() - date.getDay();

    let liTag = "";

    // Rendering the 7 days of the Calender of current week starting from Sunday to Saturday

    for (let i = firstWeekDate; i <= firstWeekDate+6; i++) {
        // console.log(date.getDate(), new Date().getMonth(), new Date().getFullYear())
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                    && currYear === new Date().getFullYear() ? "active" : "";
        let x = i
        if(i<1){
            x = lastDateofLastMonth+i
        }else if(i>lastDateofMonth){
            x = i-lastDateofMonth
        }
        id = new Date(currYear, currMonth, x).toLocaleDateString();
        
        liTag += `<li class="list_item"> <span id="${id}">${x}</span>
        <div>
    
        <img onclick="fun(this)" src="https://cdn-icons-png.flaticon.com/128/11512/11512309.png" date=${id} class="status-icon" height="20px" width="20px" alt="cross"/>
    
        <div>
        </li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    for(let i=0;i<daysTag.length;i++){
        daysTag[i].innerHTML = liTag;
    }
}
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {

        date = icon.id === "prev" ? new Date(currYear,currMonth,currDate-6) : new Date(currYear,currMonth,currDate+6);
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
    let stats = (dailyStatus+1)%3
    date = e.getAttribute("date")
    icon = e.getAttribute("src")
    // console.log("ew",ulElm.getAttribute("data_id"), date)
    index = images.indexOf(icon)
    e.setAttribute("src",images[(index+1)%(images.length)])
    window.location.href = `/habbits/status/toggle?date=${date}&habbit_id=${habbit_id}&stat=${(index+1)%3}`
}



