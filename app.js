const dys = document.querySelector("#days");
const hrs = document.querySelector("#hours");
const mins = document.querySelector("#minutes");
const secs = document.querySelector("#seconds");

const getMonthsEnd = () => {
  let monthEnd = new Date();
  let currentMonth = monthEnd.getMonth();
  monthEnd.setHours(00, 00, 00);
  switch (currentMonth + 1) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12: {
      monthEnd.setDate(31);
      monthEnd.setMonth(currentMonth);
      return monthEnd;
    }
    case 4:
    case 6:
    case 9:
    case 11: {
      monthEnd.setDate(30);
      monthEnd.setMonth(currentMonth);
      return monthEnd;
    }
    case 2: {
      let currentYear = monthEnd.getFullYear();
      monthEnd.setMonth(currentMonth);
      if (
        (currentYear % 4 === 0 && currentYear % 100 != 0) ||
        currentYear % 400 == 0
      ) {
        monthEnd.setDate(29);
      } else {
        monthEnd.setDate(28);
      }
      return monthEnd;
    }
  }
};

// console.log(getMonthsEnd()); Check the about the last day of the month
const lastDay = getMonthsEnd().getTime();

const displayDifference = (arrEl, arrVal) => {
  for (let i = 0; i < 4; i++) {
    arrEl[i].innerHTML = arrVal[i];
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const calcDifference = setInterval(() => {
    const current = new Date().getTime();
    const diffMills = lastDay - current;
    //   console.log(diffM)
    if (diffMills > 0) {
      const diffDays = Math.floor(diffMills / (1000 * 60 * 60 * 24));
      const diffHrs = Math.floor(
        (diffMills % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const diffMins = Math.floor((diffMills % (1000 * 60 * 60)) / (1000 * 60));
      const diffSecs = Math.floor((diffMills % (1000 * 60)) / 1000);

      displayDifference(
        [dys, hrs, mins, secs],
        [
          diffDays < 10 ? `0${diffDays}` : diffDays,
          diffHrs < 10 ? `0${diffHrs}` : diffHrs,
          diffMins < 10 ? `0${diffMins}` : diffMins,
          diffSecs < 10 ? `0${diffSecs}` : diffSecs,
        ]
      );
    } else {
      clearInterval(calcDifference);
      displayDifference([dys, hrs, mins, secs], [0, 0, 0, 0]);
    }
  }, 1000);
});
