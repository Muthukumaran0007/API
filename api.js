function httpGetAsync(url, callback) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}

function fetchHoliday() {
    const country = document.getElementById("countryInput").value;
    const date = document.getElementById("dateInput").value;

    const [year, month, day] = date.split('-');
    const url = `https://holidays.abstractapi.com/v1/?api_key=a7b736f1cb8c48faa354df8612c53299&country=${country}&year=${year}&month=${month}&day=${day}`;

    httpGetAsync(url, function (response) {
        const data = JSON.parse(response);
        displayHolidayResult(data);
    });
}

function displayHolidayResult(data) {
    const resultDiv = document.getElementById("result");
    if (data.length > 0) {
        const holiday = data[0];
        resultDiv.innerHTML = `
            <p><strong>Holiday Name:</strong> ${holiday.name}</p>
            <p><strong>Date:</strong> ${holiday.date}</p>
            <p><strong>Country:</strong> ${holiday.country}</p>
            <p><strong>Type:</strong> ${holiday.type}</p>
            <p><strong>Description:</strong> ${holiday.description || "No description available"}</p>
        `;
    } else {
        resultDiv.innerHTML = `<p><strong>No holiday found on this date.</strong></p>`;
    }
}

