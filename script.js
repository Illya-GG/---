let stodata = ''
let masterdata1 = ''
let benzdata = ''
const currentUrl = window.location.href;
const fileName = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

Promise.all([
  fetch('datasto.CSV')
    .then(response => response.text())
    .then(csvText => Papa.parse(csvText, { header: true, comments: "#", skipEmptyLines: true }).data),
  fetch('datamaster.CSV')
    .then(response => response.text())
    .then(csvText => Papa.parse(csvText, { header: true, comments: "#", skipEmptyLines: true }).data),
  fetch('databenz.CSV')
    .then(response => response.text())
    .then(csvText => Papa.parse(csvText, { header: true, comments: "#", skipEmptyLines: true }).data)
])
  .then(([stodata, masterdata, benzdata]) => {
    masterdata1 = masterdata
    function displaycardD(){
      displaycard(stodata, masterdata, benzdata, makecard, fileName)
    }
    document.getElementById('searchinput2').addEventListener('keydown', (event) => {
      serch2(event, masterdata1, makecard, fileName);
    });
    displaycardD();
    document.getElementById('searchinput').addEventListener('keydown', (event) => {
      serch(event, benzdata, makecard, fileName);
    });
  })
if (window.innerWidth < 500) {
  document.body.style.fontSize = '20px'
}
if (!localStorage.getItem('beloved')) {
  localStorage.setItem('beloved', '');
}

let p = ''
let serchRequest = ''

function cityORnot(nameX) {

  document.body.innerHTML = ''; 
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.height = '100vh';
  document.body.style.overflow = 'hidden';
  document.body.style.display = 'flex'

  let black = document.createElement('div');
  black.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
  black.style.position = 'absolute'
  black.style.left = '0'
  black.style.right = '0'
  black.style.top = '0'
  black.style.bottom = '0'
  black.style.zIndex = '5'
  black.textContent = 'Де ви знаходитесь?'
  black.style.color = 'rgb(255, 255, 255)'
  black.style.textAlign = 'center'
  black.style.fontSize = '50px'

  let div = document.createElement('div');
  let div2 = document.createElement('div');
  div.classList.add('half-screen');
  div2.classList.add('half-screen');
  div.style.display = 'flex';
  div2.style.display = 'flex';
  div.style.width = '50%';
  div2.style.width = '50%';
  div.style.alignItems = 'center'
  div2.style.alignItems = 'center'
  div.addEventListener('click', () => {distance(nameX)})
  navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    div2.addEventListener('click', () => {check(0, nameX, `${latitude}, ${longitude}`)})
  });
  

  let h3 = document.createElement('h1')
  h3.style.position = 'absolute'
  h3.textContent = 'За містом'
  h3.style.color = 'rgb(255, 255, 255)'
  h3.style.zIndex = '5'
  h3.style.width = '50%'
  h3.style.textAlign = 'center'
  h3.addEventListener('click', () => {distance(nameX)});
  div.appendChild(h3)

  let h32 = document.createElement('h1')
  h32.style.position = 'absolute'
  h32.textContent = 'В місті'
  h32.style.color = 'rgb(255, 255, 255)'
  h32.style.zIndex = '5'
  h32.style.width = '50%'
  h32.style.textAlign = 'center'
  div2.appendChild(h32)

  let img = document.createElement('img');
  let img2 = document.createElement('img');
  img.src = 'media/trasa.jpg';
  img2.src = 'media/sity.jpg';
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  img2.style.width = '100%';
  img2.style.height = '100%';
  img2.style.objectFit = 'cover';

  let div3 = document.createElement('div')
  if (window.innerWidth < 500) {
    div3.style.marginTop = '120%'
  }else{
    div3.style.marginTop = '30%'
  }
  

  let btn = document.createElement('button');
  btn.classList.add('btn', 'btn-warning', 'but');
  btn.style.zIndex = '7'
  btn.position = 'fixed'
  btn.style.bottom = '0'
  btn.textContent = 'Повернутись'
  btn.style.alignItems = 'center'
  btn.style.bottom = '200px'
  if(fileName == 'evo.html'){
    btn.addEventListener('click', () => {
      window.location.href = './index.html'
    })
  }else{
    btn.addEventListener('click', () => {
      location.reload();
  })}
  

  div.appendChild(img);
  div2.appendChild(img2);
  black.appendChild(div3);
  div3.appendChild(btn);
  document.body.appendChild(black);
  document.body.appendChild(div);
  document.body.appendChild(div2);
}

function makecard(obj, fileName, n, data) {
  if (fileName == 'benzin.html') {
    let con = document.getElementById('card-con');

    let div = document.createElement('div');
    div.classList.add('card');
    con.appendChild(div);

    let h5 = document.createElement('h5');
    h5.classList.add('card-header');
    h5.textContent = `${obj.name} - ${obj.price} грн.`;
    div.appendChild(h5);

    let div2 = document.createElement('div');
    div2.classList.add('card-body');
    div.appendChild(div2);

    let h52 = document.createElement('h5');
    h52.classList.add('card-title');
    if (obj.type == 'Євро5') {
      h52.style.color = 'rgb(93, 113, 177)';
    } else if (obj.type == 'Mustang' | obj.type == 'Mustang+') {
      h52.style.color = 'rgb(207, 92, 114)';
    };
    h52.textContent = obj.type;
    div2.appendChild(h52)

    let a = document.createElement('a');
    a.classList.add('btn', 'btn-primary');
    a.textContent = 'Замовити';
    a.addEventListener('click', () => {cityORnot(obj.name)})
    div2.appendChild(a);
  }
  if (fileName == 'sto.html') {
    if (n == 1) {
      let con = document.getElementById('mastercon');
      if (localStorage.getItem('beloved').includes(obj.id)) {
        p.style.display = 'block';

        let li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        con.appendChild(li);

        let btn = document.createElement('button');
        btn.type = 'button';
        btn.classList.add('btn');
        btn.style.display = 'flex';
        btn.style.cursor = 'pointer';
        btn.onclick = () => masterober(odj.name);
        btn.addEventListener('click', () => {masterober(obj.name)});
        li.appendChild(btn);

        let h6 = document.createElement('h6');
        h6.textContent = `${obj.name} `
        btn.appendChild(h6);

        let h61 = document.createElement('h6');
        h61.textContent = `${obj.rating}`;
        btn.appendChild(h61);
        if (Math.round(obj.rating) == 1) {
          h61.style.color = 'rgb(193, 0, 0)';
        } else if (Math.round(obj.rating) == 2) {
          h61.style.color = 'rgb(197, 82, 0)';
        } else if (Math.round(obj.rating) == 3) {
          h61.style.color = 'rgb(197, 194, 0)';
        } else if (Math.round(obj.rating) == 4) {
          h61.style.color = 'rgb(118, 197, 0)';
        } else if (Math.round(obj.rating) == 5) {
          h61.style.color = 'rgb(13, 201, 0)';
        }

        let img = document.createElement('img');
        img.src = 'media/zirka2.png';
        img.addEventListener('mouseover', () => { img.src = 'media/zirka.png'; });
        img.addEventListener('mouseout', () => { img.src = 'media/zirka2.png'; });
        img.onclick = () => beloved(obj.id);
        img.style.width = '20px';
        img.style.height = '20px';
        img.style.cursor = 'pointer';
        li.appendChild(img);
      }
      if (!localStorage.getItem('beloved').includes(obj.id)) {
        let li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        con.appendChild(li);

        let btn = document.createElement('button');
        btn.type = 'button';
        btn.classList.add('btn');
        btn.style.display = 'flex';
        btn.style.cursor = 'pointer';
        btn.onclick = () => masterober(obj.name);
        btn.addEventListener('click', () => {masterober(obj.name)});
        li.appendChild(btn);

        let h6 = document.createElement('h6');
        h6.textContent = `${obj.name} `
        btn.appendChild(h6);

        let h61 = document.createElement('h6');
        h61.textContent = `${obj.rating}`;
        btn.appendChild(h61);
        if (Math.round(obj.rating) == 1) {
          h61.style.color = 'rgb(193, 0, 0)';
        } else if (Math.round(obj.rating) == 2) {
          h61.style.color = 'rgb(197, 82, 0)';
        } else if (Math.round(obj.rating) == 3) {
          h61.style.color = 'rgb(197, 194, 0)';
        } else if (Math.round(obj.rating) == 4) {
          h61.style.color = 'rgb(118, 197, 0)';
        } else if (Math.round(obj.rating) == 5) {
          h61.style.color = 'rgb(13, 201, 0)';
        }

        let img = document.createElement('img');
        img.src = 'media/zirka.png';
        img.style.width = '20px';
        img.style.height = '20px';
        img.style.cursor = 'pointer';
        img.addEventListener('mouseover', () => { img.src = 'media/zirka2.png'; });
        img.addEventListener('mouseout', () => { img.src = 'media/zirka.png'; });
        img.onclick = () => beloved(obj.id);
        li.appendChild(img);
      }
    }
    if(n == 2){
      let con = document.getElementById('card-con');

      let div = document.createElement('div');
      div.classList.add('card');
      con.appendChild(div);
  
      let h5 = document.createElement('h5');
      h5.classList.add('card-header');
      h5.textContent = `${obj.name}`;
      div.appendChild(h5);
  
      let div2 = document.createElement('div');
      div2.classList.add('card-body');
      div.appendChild(div2);
  
      let a = document.createElement('a');
      a.classList.add('btn', 'btn-primary');
      a.textContent = 'Замовити';
      a.addEventListener('click', () => {cityORnot(obj.name)})
      div2.appendChild(a);
    }
  }
}

function displaycard(stodata, masterdata, benzdata, callback, fileName) {
  if (fileName == 'sto.html') {

    let con = document.getElementById('mastercon');
    p = document.createElement('p');
    p.style.color = 'rgb(150, 150, 150)'
    p.textContent = 'Улюблені майстри'
    p.style.display = 'none'
    p.style.marginLeft = '10px'
    con.appendChild(p);

    for (const obj of masterdata) {
      if (localStorage.getItem('beloved').includes(obj.id)) {
        p.style.display = 'block'
        callback(obj, fileName, 1, masterdata);
      }
    }
    let p2 = document.createElement('p');
    p2.style.color = 'rgb(150, 150, 150)'
    p2.textContent = 'Всі майстри'
    p2.style.marginLeft = '10px'
    con.appendChild(p2);

    for (const obj of masterdata) {
      if (!localStorage.getItem('beloved').includes(obj.id)) {
        callback(obj, fileName, 1, masterdata);
      }
    }
    for (const obj of stodata) {
      callback(obj, fileName, 2);
    }
  }

  if (fileName == 'benzin.html') {
    for (const obj of benzdata) {
      callback(obj, fileName, 0);
    }
  }
  if(fileName == 'evo.html'){
    cityORnot('x')
  }
}
function serch(event, data, callback, fileName) {
  if (event.key === "Enter") {
    event.preventDefault();
    serchRequest = document.getElementById('searchinput').value
    document.getElementById('searchinput').value = ''
    let con = document.getElementById('card-con');
    con.innerHTML = ''
    for (const obj of data) {
      if (obj.name.includes(serchRequest)) {
        callback(obj, fileName);
      }
    }
  }
}

function dininput(masterdata, fileName) {
  let con = document.getElementById('mastercon');
  let input = document.createElement('input');
  input.classList.add('form-control', 'me-2');
  input.type = 'text'
  input.placeholder = 'Search'
  input.id = 'searchinput2'
  input.style.width = '90%'
  input.style.marginLeft = '10px'
  con.appendChild(input);

  input.addEventListener('keydown', (event) => { serch2(event, masterdata, makecard, fileName) });
}

function serch2(event, data, callback, fileName, s) {
  if(event.key === "Enter"){
    console.log('serch2 active');
    event.preventDefault();
    serchRequest = document.getElementById('searchinput2').value
    document.getElementById('searchinput2').value = ''
    let con = document.getElementById('mastercon');
    con.innerHTML = ''
    dininput(data, fileName);
    p = document.createElement('p');
    p.style.color = 'rgb(150, 150, 150)'
    p.textContent = 'Улюблені майстри'
    p.style.display = 'none'
    p.style.marginLeft = '10px'
    con.appendChild(p);

    for (const obj of data) {
      if (localStorage.getItem('beloved').includes(obj.id) & obj.name.includes(serchRequest)) {
        p.style.display = 'block'
        callback(obj, fileName, 1, true);
      }
    }
    let p2 = document.createElement('p');
    p2.style.color = 'rgb(150, 150, 150)'
    p2.textContent = 'Всі майстри'
    p2.style.marginLeft = '10px'
    con.appendChild(p2);

    for (const obj of data) {
      if (!localStorage.getItem('beloved').includes(obj.id) & obj.name.includes(serchRequest)) {
        callback(obj, fileName, 1, false);
      }
    }
  }
}

function beloved(id) {
  let belovedList = localStorage.getItem('beloved').split(',').filter(Boolean);
  
  if (belovedList.includes(id)) {
    belovedList = belovedList.filter(item => item !== id);
  } else {
    belovedList.push(id);
  }
  localStorage.setItem('beloved', belovedList.join(','));
  location.reload();
}
  let nam = ''
function masterober(name){
  let con = document.getElementById('dropmas');
  con.textContent = name;
  nam = name
}

function check(d, nameX, cord){
  document.body.innerHTML = ''
  document.body.style.display = 'grid'
  document.body.style.placeItems = 'center'

  let div = document.createElement('div')
  div.style.width = '370px'
  div.style.height = '100vh'
  div.style.backgroundColor = 'rgb(240, 240, 240)'
  document.body.appendChild(div)

  let p = document.createElement('h4')
  p.align = 'center'
  p.textContent = 'ТОВ СтоБудьДе'
  div.appendChild(p)
  p.style.marginTop = '10%'

  let i
  let name = document.createElement('p')
  if(nam == ''){
    name.textContent = 'Майстер: будь який'
    i = 0
  }else{
    name.textContent = `Майстер: ${nam}`
    i = 100
  }
  name.style.marginTop = '50%'
  div.appendChild(name)
  let cor = document.createElement('p')
  cor.textContent = `Кординати користувача: ${cord}`;
  div.appendChild(cor)
  let price
  if(d < 15){
    price = 500+i
    d = 'До 15'
  }else{
    price = d*50+i
  }

  let p2 = document.createElement('p')
  p2.textContent = `Відсань: ${d} км`
  div.appendChild(p2)

  let p4 = document.createElement('p')
  if(fileName == 'benzin.html'){
    p4.textContent = `Послуга: Доставка ${nameX}`
  }else if(fileName == 'evo.html'){
    p4.textContent = `Послуга: евакуатор`
  }else if(fileName == 'sto.html'){
    p4.textContent = `Послуга: ремонт ${nameX}`
  }
  
  div.appendChild(p4)

  let p3 = document.createElement('h4');
  p3.style.marginTop = '80%'
  p3.textContent = `Ціна виїзду: ${price}`
  div.appendChild(p3)

}

function distance(nameC) {
  navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    // const officeLat = 47.842486;
    // const officeLon = 35.130887;
    const officeLat = 50.443135;
    const officeLon = 30.531770;

    if (latitude !== undefined && longitude !== undefined) {
      const distanceValue = calculateDistance(latitude, longitude, officeLat, officeLon);
      check(distanceValue, nameC, `${latitude}, ${longitude}`);
    } 
  });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  let dLat = deg2rad(lat2 - lat1);
  let dLon = deg2rad(lon2 - lon1);
  let a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return Math.round(d);
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}