window.addEventListener("load", () => {
        getKartyak();
});

function getKartyak(){
        document.getElementById('tartalom').innerHTML = 
        `<h1 id="focim">Szállások:</h1>
        <div id="kartyak"></div>`;

        fetch("https://nodejs.sulla.hu/data")
        .then((res) => res.json())
        .then((datas) => {
                console.log(datas);
                for (const data of datas) {
                        document.getElementById("kartyak").innerHTML += ujKartya(data);
                }
        });
}

function ujKartya(data){
        let kartya = 
        `<div class="card" style="width: 18rem;">
                <div class="card-body">
                        <h5 class="card-title">${data.name}</h5>
                        <p>${data.hostname}</p>
                        <p class="card-text">${data.location}</p>
                        <p class="card-text">${data.price}</p>
                        <p class="card-text">${data.minimum_nights}</p>
                        <a href="#" class="btn btn-primary">Módosítás</a>
                        <a href="#" class="btn btn-primary">Részletek</a>
                </div>
        </div>`

        return kartya;
}

function postKartya(){
        let adatok = JSON.stringify({
                name: document.getElementById("nev").value,
                hostname: document.getElementById("hostname").value,
                location: document.getElementById("location").value,
                price: parseInt(document.getElementById("price").value),
                minimum_nights: document.getElementById("minimum_nights").value
        });

        fetch("https://nodejs.sulla.hu/data",{
        method: "POST",
        body: adatok,
        headers: {
        'Content-Type': 'application/json'
        },
        })
        .then((res) => {
        if(res) {
         return fetch("https://nodejs.sulla.hu/data")
        }
         })
        .then((res) => res.json())
        .then((datas) => {
        console.log(datas);
                for (const data of datas) {
          //document.getElementById("datas").innerHTML += data.name + " " + data.location + "<br>";
        }
        });
}

function ujszallasMenu(){
        document.getElementById('tartalom').innerHTML = 
        `<div class="form-group" id="adatok">
                <label for="nev">Name:</label>
                <input type="text" class="form-control" id="nev">
                <label for="hostname">Hostname:</label>
                <input type="text" class="form-control" id="hostname">
                <label for="location">Location:</label>
                <input type="text" class="form-control" id="location">
                <label for="price">Price:</label>
                <input type="number" class="form-control" id="price">
                <label for="minimum_nights">Minimum-nights:</label>
                <input type="text" class="form-control" id="minimum_nights">
                <input type="button" id="ujGomb" class="btn btn-primary" onclick="postKartya()" value="Új szállás hozzáadása">
        </div>`;
}

function kezdooldal(){
        document.getElementById('tartalom').innerHTML = '<h1 id="kezdo">Szállások admin oldal :)</h1>'
}