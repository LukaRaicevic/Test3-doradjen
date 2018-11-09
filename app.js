var tbl = document.getElementById("m-table");
var srch = document.getElementById("srch-btn");
var rBtnIme = document.getElementById("radio-btn-ime");
var rBtnZanr = document.getElementById("radio-btn-zanr");
var tableRow = document.getElementsByTagName("tr");
var selOcj = document.getElementById("ocjena");

function myFunction() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const myObj = JSON.parse(this.responseText);
            cont(myObj);
        }
    };
    xmlhttp.open("GET", "movies.json", true);
    xmlhttp.send();
}

function cont(data) {
    let str = "";

    for(let i = 0; i < data.length; i++) {
        data[i].datum = new Date(data[i].datum);
        str += "<tr><td>" + (i+1) + "</td><td>" + "<a href="+data[i].info+" target="+"_blank"+"><img src="+data[i].slika+" title="+data[i].ime+"></a>" + "</td><td>" + data[i].datum + "</td><td>" + data[i].reziser + "</td><td>";
        for(let j = 0; j < data[i].zanr.length; j++) {
            if(j == 0) {
                str += ""+data[i].zanr[j];
            } else {
                str += ", <br>"+data[i].zanr[j];
            }
        }
        str += "</td><td>" + data[i].ocjena + "</td><td>" + "<button class=+"+"dlt-btn"+">X</button>" + "</td></tr>";
    }

    tbl.insertAdjacentHTML("beforeend", str);
    srch.addEventListener("click", function() {
        event.preventDefault();
        let userInp = document.getElementById("usr-inp").value.toLowerCase();
        for(let i = 0; i < data.length; i++) {
            if(rBtnIme.checked) {
                if(userInp == "") {
                    for(let i = 0; i < tableRow.length-1; i++) {
                        tableRow[i+1].style.display = "table-row";
                    }
                }
                if(data[i].ime.toLowerCase() != userInp) {
                    tableRow[i+1].style.display = "none";
                } else {
                    tableRow[i+1].style.display = "table-row";
                }
            } else {
                for(let j = 0; j < data[i].zanr.length; j++) {
                    if(data[i].zanr[j].toLowerCase() === userInp) {
                        tableRow[i+1].style.display = "table-row";
                        break;
                    }
                    if(j === data[i].zanr.length-1) {
                        tableRow[i+1].style.display = "none";
                    }
                    if(userInp == "") {
                        for(let i = 0; i < tableRow.length-1; i++) {
                            tableRow[i+1].style.display = "table-row";
                        }
                    }
                }
            }
        }
    });

    selOcj.addEventListener("change", function() {
        let ocj = Number(document.getElementById("ocjena").value);

        for(let i = 0; i < data.length; i++) {
            if(data[i].ocjena <= ocj) {
                tableRow[i+1].style.display = "none";
            } else {
                tableRow[i+1].style.display = "table-row";
            }
        }
    });

    let dltBtn = document.getElementsByTagName("button");
    for(let i = 0; i < dltBtn.length; i++) {
        dltBtn[i].addEventListener("click", function() {
            tableRow[i+1].remove();
            data.length--;
        });
    }
}


myFunction();
