const daysTag = document.querySelectorAll(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");
const images = ["https://cdn-icons-png.flaticon.com/128/11512/11512309.png","https://cdn-icons-png.flaticon.com/128/190/190411.png","https://cdn-icons-png.flaticon.com/128/1828/1828665.png"]

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
currDate = date.getDate()
console.log(currYear,currMonth)

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
    console.log("---Curr Date",date.getDate())
    console.log("First Week Date",firstWeekDate)

    let liTag = "";


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
        liTag += `<li class="${isToday}">${x}
        <div>
        <img onclick="fun(this)" src="https://cdn-icons-png.flaticon.com/128/11512/11512309.png" class="status-icon" id=${1000000+Math.floor(Math.random()*1000000)} height="20px" width="20px" alt="cross"/>
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


function fun(e){
    console.log("======",e)
    // console.log(document.querySelectorAll(".status-icon"))
    // console.log($(".status-icon"))
    icon = e.getAttribute("src")
    index = images.indexOf(icon)
    e.setAttribute("src",images[(index+1)%(images.length)])
    // let icon = $("#status-icon").attr("src")

    // console.log(icon,images[(index+1)%(images.length)])
    // $("#status-icon").attr("src",images[(index+1)%(images.length)])
    

}

// https://cdn-icons-png.flaticon.com/128/190/190411.png
// https://cdn-icons-png.flaticon.com/128/1828/1828665.png