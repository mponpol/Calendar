const calendar = document.querySelector('.calendar');
const date = document.querySelector('.date');
const daysContainer = document.querySelector('.days');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const todayBtn = document.querySelector('.today-btn');
const gotoBtn = document.querySelector('.goto-btn');
const dateInput = document.querySelector('.date-input');

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Function to add days to calendar
function initCalendar() {
  // To get prev month days and current month all days and next month days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  // Update date top of calendar
  date.innerHTML = months[month] + ' ' + year;

  // Adding days on DOM
  let days = '';
  // prev month days
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }
  // Current month days
  for (let i = 1; i <= lastDate; i++) {
    // if day is today add class today
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      days += `<div class="day today">${i}</div>`;
    }
    // Add remaining as it is
    else {
      days += `<div class="day">${i}</div>`;
    }
  }
  //Next month days
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
}

initCalendar();

// Prev month
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

// Next month
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

// Add event listeners on prev and next
prev.addEventListener('click', prevMonth);
next.addEventListener('click', nextMonth);

// CALENDAR READY

// Add goto date and goto today functionality
todayBtn.addEventListener('click', () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener('input', e => {
  // allow only numbers, remove anything else
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, '');
  if (dateInput.value.length === 2) {
    // add a slash if two numbers entered
    dateInput.value += '/';
  }
  // don't allow more than 7 characters
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  // if we remove until slash its not removing
  // if backspace pressed
  if (e.inputType === 'deleteContentBackward') {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2); // FIX problem with slash
    }
  }
});

gotoBtn.addEventListener('click', gotoDate);

// function to go to entered date
function gotoDate() {
  const dateArr = dateInput.value.split('/');
  // some date validation
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr.length < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  // if invalid date
  alert('Invalid date'); // FIX problem with alert
}
