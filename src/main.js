
//Fetch the items from the JSON file
function loadItems(){
    //fetch:데이터 받아오고 받아온 데이터(response) 리턴함
    return fetch('data/data.json')
    .then(response => response.json()) //받아온 데이터를 json으로 변환
    .then(json => json.items);
}

//items를 html 요소로 변환해 페이지에 나타내는 함수
function displayItems(items){
    const container=document.querySelector('.items');
    //map():items 배열의 원소를 하나씩 형태를 바꿈 (object 배열 -> 문자열 배열)
    //join(): 문자열의 배열을 다시 하나의 문자열로 병합
    container.innerHTML=items.map(item => createHTMLString(item)).join('');
}

//li 태그 속 사진과 설명은 서로 옆에 위치 (li의 특성) 
//text는 주로 span(block:한 줄 차지) 또는 div(inline:할당된만큼만)
function createHTMLString(item){
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail">
        <span class="item_description"> ${item.gender}, ${item.size}</span>
    </li>
    `;
}
//클릭된 애(event)를 매개변수로 가짐
function onButtonClick(event, items){
    const dataset=event.target.dataset;
    //클릭된 item의 key, value 값 
    const key=dataset.key;
    const value=dataset.value;

    if (key == null || value ==null){
        return;
    }
    const filtered =items.filter(item => item[key] === value);
    displayItems(filtered);
}

function setEventListener(items){
    const logo=document.querySelector('.logo');
    //.btn으로 querySelector하면 맨 먼저 나오는 버튼 하나만 고려함
    //따라서 버튼 전체를 buttons로 다루기 위해서는 .buttons해야함
    const buttons=document.querySelector('.buttons');
    logo.addEventListener('click', ()=> displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}

//main
loadItems()
.then(items=>{
    displayItems(items);
    setEventListener(items);
})
.catch(console.log);