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
                        <p class="card-text">${data.location}</p>
                        <a href="#" class="btn btn-primary" onclick="deleteKartya(${data.id})">Törlés</a>
                        <a href="#" class="btn btn-primary" onclick="reszletesKartya(${data.id})">Részletek</a>
                        <a href="#" class="btn btn-primary" onclick="putKartyaSetup(${data.id})">Módosítás</a>
                </div>
        </div>`

        return kartya;
}

function reszletesKartya(id){
        fetch("https://www.nodejs.sulla.hu/data/" + id)
        .then(function(datas) {
                return datas.json();
        })
        .then(function(data) {
                document.getElementById('tartalom').innerHTML = 
                `<div class="card reszletes" style="width: 18rem;">
                        <div class="card-body">
                                <h5 class="card-title">${data.name}</h5>
                                <p>${data.hostname}</p>
                                <p class="card-text">${data.location}</p>
                                <p class="card-text">${data.price}</p>
                                <p class="card-text">${data.minimum_nights}</p>
                                <a href="#" class="btn btn-primary" onclick="deleteKartya(${data.id})">Törlés</a>
                                <a href="#" class="btn btn-primary" onclick="putKartyaSetup(${data.id})">Módosítás</a>
                        </div>
                </div>`;
        }).catch(error => {
                console.error('Hiba történt a kérés során:', error);
                alert('Hiba történt az adatok lekérése közben.');
        });
}

function postKartya(){
        if(vanUres()){
                alert("Hiányzó adat!");
                return;
        }
        let adatok = JSON.stringify({
                name: document.getElementById("nev").value,
                hostname: document.getElementById("hostname").value,
                location: document.getElementById("location").value,
                price: parseInt(document.getElementById("price").value),
                minimum_nights: document.getElementById("minimum_nights").value + " éjszaka"
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
                return fetch("https://nodejs.sulla.hu/data");
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
                <label for="nev">Név:</label>
                <input type="text" class="form-control" id="nev" placeholder="Example2">
                <label for="hostname">Weboldal címe:</label>
                <input type="text" class="form-control" id="hostname" placeholder="booking.com">
                <label for="location">Cím:</label>
                <input type="text" class="form-control" id="location" placeholder="City2">
                <label for="price">Ár:</label>
                <input type="number" class="form-control" id="price" placeholder="0">
                <label for="minimum_nights">Éjszakák száma:</label>
                <input type="number" class="form-control" id="minimum_nights" placeholder="1">
                <input type="button" id="ujGomb" class="btn btn-primary" onclick="postKartya()" value="Új szállás hozzáadása">
        </div>`;
}

function kezdooldal(){
        document.getElementById('tartalom').innerHTML = '<h1 id="kezdo">Szállások admin oldal :)</h1>'
}

function putKartyaSetup(id){
        fetch("https://www.nodejs.sulla.hu/data/" + id)
        .then(function(datas) {
                return datas.json();
        })
        .then(function(data) {
                document.getElementById('tartalom').innerHTML = 
                `<div class="form-group" id="adatok">
                        <label for="nev">Név:</label>
                        <input type="text" class="form-control" id="nev" value="${data.name}" placeholder="Example2">
                        <label for="hostname">Weboldal címe:</label>
                        <input type="text" class="form-control" id="hostname" value="${data.hostname}" placeholder="booking.com">
                        <label for="location">Cím:</label>
                        <input type="text" class="form-control" id="location" value="${data.location}" placeholder="City2">
                        <label for="price">Ár:</label>
                        <input type="number" class="form-control" id="price" value="${data.price}" placeholder="0">
                        <label for="minimum_nights">Éjszakák száma:</label>
                        <input type="number" class="form-control" id="minimum_nights" value="${parseInt(data.minimum_nights)}" placeholder="1">
                        <input type="button" id="ujGomb" class="btn btn-primary" onclick="putKartya(${data.id})" value="Szállás módosítása">
                </div>`;
        }).catch(error => {
                console.error('Hiba történt a kérés során:', error);
                alert('Hiba történt az adatok lekérése közben.');
        });
}

function putKartya(id){
        if(vanUres()){
                alert("Hiányzó adat!");
                return;
        }

        let bodyForPut = JSON.stringify({
                hostname: document.getElementById("hostname").value,
                location: document.getElementById("location").value,
                minimum_nights: document.getElementById("minimum_nights").value + " éjszaka",
                name: document.getElementById("nev").value,
                price: Number(document.getElementById("price").value)
        });
        
        fetch("https://www.nodejs.sulla.hu/data/" + id, {
                method: "PUT",
                body: bodyForPut,
                headers: {
                        'Content-Type': 'application/json'
                }
        }).then(function() {
                location.reload()
        }).catch(error => {
                console.error('Hiba történt a kérés során:', error);
                alert('Hiba történt az adatok lekérése közben.');
        });
}

function deleteKartya(id){
        fetch("https://www.nodejs.sulla.hu/data/" + id, {
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json'
        }
        }).then(function() {
                location.reload()
        }).catch(error => {
                console.error('Hiba történt a kérés során:', error);
                alert('Hiba történt az adatok lekérése közben.');
        });
}

function vanUres(){
        return document.getElementById("hostname").value == "" || 
        document.getElementById("location").value == "" || 
        document.getElementById("minimum_nights").value == "" || 
        document.getElementById("nev").value == "" || 
        document.getElementById("price").value == "";
}