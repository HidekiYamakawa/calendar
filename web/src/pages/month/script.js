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
    // recupera o elemento que contêm a classe do mês do feriado e mais a palavra day
    // na posição do dia do feriado (menos 1 pois o array inicia em 0)
    let dayElement = monthElement.getElementsByClassName(`${holidayMonth} day`).item(holidayDay-1);

    // recupera a classe do elemento dayElement (como um backup)
    let dayElementClass = dayElement.getAttribute("class");

    // substitui o valor do class para o valor anterior já existente e mais a palavra holiday
    dayElement.setAttribute("class", `${dayElementClass} holiday`);
    // atribui o valor de title para o nome do feriado
    dayElement.setAttribute("title", holidayName);
}

function main() {
    let data = getApiData("http://localhost:3333/holiday");
    let holidays = JSON.parse(data);
    
    holidays.forEach(element => {
        highlightHoliday(element);
    })
}

main();