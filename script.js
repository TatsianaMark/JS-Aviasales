const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
    dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
    inputCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
    dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to');

const city = ['Москва','Санкт-Перербург','Минск','Караганда','Челябинск','Керч','Волгоград','Самара','Калининград'];

inputCitiesFrom.addEventListener('input',()=>{

    const filterCity = city.filter((item)=>{
        const fixItem = item.toLowerCase();

        return fixItem.includes(inputCitiesFrom.value.toLowerCase());
    });

    filterCity.forEach((item)=>{
        const li = document.createElement('li');
        li.classList.add('dropdown__city');
        li.textContent = item ;
        dropdownCitiesFrom.append(li);
        console.log(li);
    });
});

const get = (name) => {

    console.log('вызов get:'+ name);
};






