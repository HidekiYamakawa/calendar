main();

function main() {
    const year = new Date();
    const yearNumber = getYearNumber(year);

    let container = document.getElementById("page");

    let calendar = document.createElement("div");
    calendar.setAttribute("id", yearNumber);
    calendar.setAttribute("class", "calendar");

    for (var i = 1; i <= 12; i++) {
        var month = createMonthArray(i, yearNumber);

        let table = createMonth(month[i], yearNumber);

        calendar.appendChild(table);
    }

    header = document.createElement("header");
    h1 = document.createElement("h1");

    h1Text = document.createTextNode(yearNumber);

    h1.appendChild(h1Text);

    header.appendChild(h1);

    container.appendChild(header);

    container.appendChild(calendar);

    let holidayData = getApiData("http://localhost:3333/holiday");
    let holidays = JSON.parse(holidayData);

    holidays.forEach(element => {
        highlightHoliday(element);
    });
}

function getApiData(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
}

function highlightHoliday(holiday) {
    let holidayMonth = holiday.month;   // mês do feriado em número
    let holidayDay = holiday.day;   // dia do feriado em número
    let holidayName = holiday.name; // nome do feriado em texto

    // recupera o elemento do mês do feriado
    let monthElement = document.getElementById(holidayMonth);
    // recupera o elemento que contêm a classe do dia do feriado e mais a palavra day
    // na posição 0 pois ele só deverá retornar um objeto dentro do NodeList
    let dayElement = monthElement.getElementsByClassName(`${holidayDay} day`).item(0);

    // recupera a classe do elemento dayElement (como um backup)
    let dayElementClass = dayElement.getAttribute("class");

    // substitui o valor do class para o valor anterior já existente e mais a palavra holiday
    dayElement.setAttribute("class", `${dayElementClass} holiday`);
    // atribui o valor de title para o nome do feriado
    dayElement.setAttribute("title", holidayName);
}

function createMonth(month, year) {
    var monthNumber = month.getDate() - 1;
    var monthName = getMonthName(monthNumber);
    var monthAmountDays = getMonthAmountOfDays(monthNumber);
    var monthDays = createMonthArray(monthNumber, year);

    table = document.createElement("table");
    table.setAttribute("class", "month");
    table.setAttribute("id", monthNumber);

    colgroup = document.createElement("colgroup");

    for (var i = 0; i < 7; i++) {
        col = document.createElement("col");
        col.setAttribute("id", getWeekTitle(i, 1));

        colgroup.appendChild(col);
    }

    table.appendChild(colgroup);

    thead = document.createElement("thead");

    trMonthTitle = document.createElement("tr");
    trMonthTitle.setAttribute("class", "monthTitle");

    thMonth = document.createElement("th");
    thMonth.setAttribute("class", "month");
    thMonth.setAttribute("colspan", "7");

    header1 = document.createElement("h1");
    header1Text = document.createTextNode(monthName);
    header1.appendChild(header1Text);

    thMonth.appendChild(header1);
    trMonthTitle.appendChild(thMonth);
    thead.appendChild(trMonthTitle);

    table.appendChild(thead);

    trWeekDayTitle = document.createElement("tr");
    trWeekDayTitle.setAttribute("class", "weekDayTitle");

    for (var i = 0; i < 7; i++) {
        theader = document.createElement("th");
        theader.setAttribute("id", getWeekTitle(i, 3));
        theader.setAttribute("class", "weekDay");

        abbr = document.createElement("abbr");
        abbr.setAttribute("title", getWeekTitle(i));
        abbrText = document.createTextNode(getWeekTitle(i, 1));
        abbr.appendChild(abbrText);

        theader.appendChild(abbr);

        trWeekDayTitle.appendChild(theader);

        thead.appendChild(trWeekDayTitle);
    }

    tbody = document.createElement("tbody");

    for (var i = 0; i < monthDays.length; i++) {
        var firstDayPositionFound = false;
        try {
            var firstDayPosition = getWeekNumber(monthNumber, year, monthDays[0].getDate() - 1);

            if (firstDayPosition === -1) {
                firstDayPosition = 6;
            }
        } catch (error) {
            console.log(error);
        }


        for (var j = 0; j < 6; j++) {
            trWeek = document.createElement("tr");

            for (var k = 0; k < 7; k++) {
                tdDay = document.createElement("td");

                var message = '';
                var dayClass = '';

                if (j == 0 && firstDayPositionFound === false) {

                    if (firstDayPosition !== undefined) {
                        if (firstDayPosition == k) {
                            message = `${monthDays[0].getDate()}`;
                            dayClass = message;
                            firstDayPositionFound = true;
                        } else {
                            message = '';
                        }
                    } else {
                        message = '';
                    }
                } else {     
                    try {
                        message = `${monthDays[i-firstDayPosition].getDate()}`;
                        dayClass = message;
                    } catch (error) {
                        message = '';
                    }

                }

                tdDayText = document.createTextNode(message);

                tdDay.setAttribute("class", `${getWeekTitle(k, 3)} ${dayClass} day`);

                tdDay.appendChild(tdDayText);

                trWeek.appendChild(tdDay);
                i++
            }

            tbody.appendChild(trWeek);

            table.appendChild(tbody);
        }
    }

    tfoot = document.createElement("tfoot");

    table.appendChild(tfoot);

    return table;
}

function getYearNumber(year) {
    return year.getFullYear();
}

function getMonthAmountOfDays(month, year) {
    var lastDayOfTheMonth = new Date(year, month, 0);

    return lastDayOfTheMonth.getDate();
}

function getMonthNumber(month, year) {
    var date = new Date(year, month, 0);

    return date.getMonth() + 1;
}

function getMonthName(month) {
    var date = new Date(0, month, 0);

    var monthName = '';

    try {
        switch (date.getMonth()) {
            case 0:
                monthName = "January";
                break;
            case 1:
                monthName = "February";
                break;
            case 2:
                monthName = "March";
                break;
            case 3:
                monthName = "April";
                break;
            case 4:
                monthName = "May";
                break;
            case 5:
                monthName = "June";
                break;
            case 6:
                monthName = "July";
                break;
            case 7:
                monthName = "August";
                break;
            case 8:
                monthName = "September";
                break;
            case 9:
                monthName = "October";
                break;
            case 10:
                monthName = "November";
                break;
            case 11:
                monthName = "Dezember";
                break;
            default:
                throw "Error: This number of week is invalid " + date.getMonth() + " ! (Valid: 0 - 11)";
        }
    } catch (error) {
        console.log(error);
    }

    return monthName;
}

function getWeekNumber(month, year, day) {
    var date = new Date(year, month - 1, day);

    return date.getDay();
}

function getWeekName(month, year, day, letters) {
    var date = new Date(year, month - 1, day);

    var weekName = '';

    try {
        switch (date.getDay()) {
            case 0:
                weekName = "Sunday";
                break;
            case 1:
                weekName = "Monday";
                break;
            case 2:
                weekName = "Tuesday";
                break;
            case 3:
                weekName = "Wednesday";
                break;
            case 4:
                weekName = "Thursday";
                break;
            case 5:
                weekName = "Friday";
                break;
            case 6:
                weekName = "Saturday";
                break;
            default:
                throw "Error: This number of week is invalid " + date.getDay() + " ! (Valid: 0 - 6)";
        }
    } catch (error) {
        console.log(error);
    }

    return weekName.slice(0, letters);
}

function getWeekTitle(index, letters) {
    var weekTitle = '';

    try {
        switch (index) {
            case 0:
                weekTitle = "Monday";
                break;
            case 1:
                weekTitle = "Tuesday";
                break;
            case 2:
                weekTitle = "Wednesday";
                break;
            case 3:
                weekTitle = "Thursday";
                break;
            case 4:
                weekTitle = "Friday";
                break;
            case 5:
                weekTitle = "Saturday";
                break;
            case 6:
                weekTitle = "Sunday";
                break;
            default:
                throw "Error: This number of week is invalid " + date.getDay() + " ! (Valid: 0 - 6)";
        }
    } catch (error) {
        console.log(error);
    }

    return weekTitle.slice(0, letters);
}

function createMonthArray(month, year) {
    var monthArray = new Array();

    for (var i = 0; i < getMonthAmountOfDays(month, year); i++) {
        var date = new Date(year, month - 1, i + 1);
        monthArray = [...monthArray, date];
    }

    return monthArray;
}



// console.log(getYearNumber(2021));

// console.log(getMonthAmountOfDays(2, 2020));
// console.log(getMonthNumber(7, 2021));
// console.log(getMonthName(1));

// console.log(getWeekNumber(5, 2021, 14));
// console.log(getWeekName(5, 2021, 14));
// console.log(getWeekName(5, 2021, 14, 3));
// console.log(getWeekName(5, 2021, 14, 1));

// console.log(createMonthArray(1, 2020));