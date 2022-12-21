
let sespsw = sessionStorage.getItem("password")

let returnedPass = returnUser(users)

function returnUser(users) {
  for(j=0; j < users.length; j++)
  {
    if(users[j].pass == sespsw)   return sespsw
  }  
}

if ((sessionStorage.getItem("password") == returnedPass) && sespsw) {
  
  document.getElementById("container").style.display = 'block'
  document.getElementById("auth_div").style.display = 'none'

}
else document.getElementById("container").style.display = 'none';

let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const backDrop = document.getElementById('modalBackDrop');

const weekdays_ID = document.getElementById('weekdays')
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date, weekday) {

  clicked = date;

  let eventForDay = events.filter(filterDate);

  function filterDate(paramDate) {
    return paramDate.date === clicked;
  }

  const arr = []
  for(let t = 0; t < eventForDay.length; t++) {
    let eventTime = (eventForDay[t].time).split(":")
    arr.push(eventTime[0])
  }

    newEventModal.style.display = 'block';
    backDrop.style.display = 'block'
    
    newEventModal.innerHTML = weekday.split(',')[0] + " " + date

    let cancel_btn = document.createElement('span')
    cancel_btn.classList.add('close');
    cancel_btn.setAttribute("id", "cancelButton")
    cancel_btn.setAttribute("onclick", "closeModal()")
    cancel_btn.innerHTML = 'x'
    newEventModal.appendChild(cancel_btn) 

    for(let i=9; i<19; i+=2) {

      var book_btn = document.createElement("button")
      var attr_ID = "btn_time_" + i + ""
      var attr_Class = "btn_time"
      var btn_txt_time = ""+ i + ":00"
      book_btn.setAttribute("id", attr_ID)
      book_btn.setAttribute("class", attr_Class)
      book_btn.innerHTML = btn_txt_time

      newEventModal.appendChild(book_btn)

      book_btn.addEventListener('click', () => bookTime(i, clicked));      
    }

  reservedTimeFun(arr)
}

const reservedTimeFun = (arr) => {

  for(let i=9; i<19; i+=2) {
    if (arr.includes(''+i+'')) {
      const resTimeBtn = document.getElementById("btn_time_"+i+"")
      resTimeBtn.disabled = true
      resTimeBtn.style.background = 'red'
    }
  }

}

getResolution = () => {

  if (window.screen.width <= 800) {
    const weekdays_short = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays_short

  } else {
    const weekdays_long = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays_long

  }

}

loadWeekdays = () => {
  const weekdays = getResolution()

  for(var d=0; d<7; d++) {

    var weekdays_div = document.createElement("div")
    var w_attr_ID = "wd_" + weekdays[d] + ""
    var w_attr_Class = "weekdays_cl"
    var weekdays_day = ""+ weekdays[d] + ""
    weekdays_div.setAttribute("id", w_attr_ID)
    weekdays_div.setAttribute("class", w_attr_Class)
    weekdays_div.innerHTML = weekdays_day

    weekdays_ID.appendChild(weekdays_div)
  }
}

load = () => {

  const dt = new Date();

  if (nav < 0) {
    dt.setMonth(new Date().getMonth() + nav);
    document.getElementById('backButton').disabled = true
  }
  else if (nav == 1) {
    dt.setMonth(new Date().getMonth() + nav);
  } else if (nav > 1) {
    dt.setMonth(new Date().getMonth() + nav);
    document.getElementById('nextButton').disabled = true
  } else {  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${i - paddingDays}/${month + 1}/${year}`;
    
    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

        let eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.setAttribute('id', "eventId_"+(i-paddingDays)+"")

        daySquare.appendChild(eventDiv);

      daySquare.addEventListener('click', () => openModal(dayString, dateString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
}

loadEventsAvailability = () => {
  const dt = new Date();

  if (nav < 0) {
    dt.setMonth(new Date().getMonth() + nav);
    document.getElementById('backButton').disabled = true
  }
  else if (nav == 1) {
    dt.setMonth(new Date().getMonth() + nav);
  } else if (nav > 1) {
    dt.setMonth(new Date().getMonth() + nav);
    document.getElementById('nextButton').disabled = true
  } else {  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for(let i = 1; i <= daysInMonth; i++) {

    const dayString = `${i}/${month + 1}/${year}`;
    var clr = checkEventsForDay(dayString)
    const eventDiv = document.getElementById("eventId_"+i+"");
    eventDiv.style.background = clr
    
  }
}

checkEventsForDay = (dt) => {
  let eventForDay = events.filter(filterDate);

  function filterDate(paramDate) {
    return paramDate.date === dt;
  }

  if (eventForDay.length == 0) return 'green'
  else if (eventForDay.length == 5) return 'red'
  else return 'yellow' 
}

function closeModal() {

  while (newEventModal.firstChild) {
    newEventModal.removeChild(newEventModal.firstChild);
  }

  newEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  clicked = null;

  load();
  loadEventsAvailability();
}

function bookTime(bookT, wday) {

  if (confirm("Please confirm your appointment time & date !") == true) {
    const reservedTime = document.getElementById("btn_time_"+bookT+"")
  
    let text = "You are booked for "+bookT+":00 "+wday;
    let evId = (bookT+'/'+wday)
    document.getElementById("newEventModal").innerHTML = text;

    setTimeout(saveEvent(evId), 2000);
    setTimeout(closeModal, 3000);

  } else {
    text = "You canceled!";
  }
  
}

function saveEvent(evId) {

  let event_id = evId.replaceAll('/', '')
  const splitedEv = evId.split("/")
    
    events.push({
      eid: event_id,
      client: 'Lorem',
      procedure: 'Procedure',
      time: splitedEv[0]+":00",
      date: clicked
    });

    localStorage.setItem('events', JSON.stringify(events));
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    document.getElementById('backButton').disabled = false
    load();
    loadEventsAvailability();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    document.getElementById('nextButton').disabled = false
    load();
    loadEventsAvailability();
  });

  window.addEventListener("resize", getResolution);

}

initButtons();
getResolution();
loadWeekdays();
load();
loadEventsAvailability();
