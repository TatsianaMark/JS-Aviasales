//get information

const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
    dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
    inputCitiesTo = formSearch.querySelector('.input__cities-to'),
    dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to');


//data base
const city = ['Москва','Санкт-Перербург','Минск','Караганда','Челябинск','Керч','Волгоград','Самара','Калининград'];

//functions




const showCity = (input,list)=>{
    list.textContent = '';

    if(input.value !== '') {

        const filterCity = city.filter((item) => {
            const fixItem = item.toLowerCase();
            return fixItem.includes(input.value.toLowerCase());
        });

        filterCity.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item;
            list.append(li);
        });
    }

};

const selectCity = (event,input,list)=>{
    const target = event.target;
    if(target.tagName.toLowerCase() === 'li'){
        input.value = target.textContent;
        list.textContent = '';
    }
};



//events

inputCitiesFrom.addEventListener('input',()=>{
    showCity(inputCitiesFrom,dropdownCitiesFrom)
});

inputCitiesTo.addEventListener('input',()=>{
    showCity(inputCitiesTo,dropdownCitiesTo)
});

dropdownCitiesFrom.addEventListener('click',(event)=> {
    selectCity(event,inputCitiesFrom,dropdownCitiesFrom);
});
dropdownCitiesTo.addEventListener('click',(event)=>{
   selectCity(event,inputCitiesTo,dropdownCitiesTo);
});






