//get information

const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
    dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
    inputCitiesTo = formSearch.querySelector('.input__cities-to'),
    dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
    inputDateDepart = formSearch.querySelector('.input__date-depart');


//data

const citiesApi = 'http://api.travelpayouts.com/data/ru/cities.json',
      proxy = 'https://cors-anywhere.herokuapp.com/',
      API_KEY = 'd318cc44a462bb0ab1ef5ff6cac1a6c6',
      calendar = 'http://min-prices.aviasales.ru/calendar_preload';

let city = [];

//functions

const getData = (url, callback) =>{
    const request = new XMLHttpRequest();

    request.open('GET',url);

    request.addEventListener('readystatechange',() => {
        if (request.readyState !== 4) return;

        if (request.status === 200){
            callback(request.response);
        } else {
            console.error(request.status);//здесь ругается
        }
    });

    request.send(); // и здесь:)


};

const showCity = (input,list)=>{
    list.textContent = '';

    if(input.value !== '') {
        const filterCity = city.filter((item) => {
                const fixItem = item.name.toLowerCase();
                return fixItem.includes(input.value.toLowerCase());

        });

        filterCity.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item.name;
            list.append(li);
        });
    }

};

const selectCity = (event,input,list) => {
    const target = event.target;
    if(target.tagName.toLowerCase() === 'li'){
        input.value = target.textContent;
        list.textContent = '';
    }
};

const renderCheap = (data,date) => {
    const cheapTicketYear = JSON.parse(data).best_prices;



    const cheapTicketDay = cheapTicketYear.filter((item) => {
        return item.depart_date === date;
    });

    renderCheapDay(cheapTicketDay);
    renderCheapYear(cheapTicketYear);


};



//events

inputCitiesFrom.addEventListener('input',() => {
    showCity(inputCitiesFrom,dropdownCitiesFrom)
});

inputCitiesTo.addEventListener('input',() => {
    showCity(inputCitiesTo,dropdownCitiesTo)
});

dropdownCitiesFrom.addEventListener('click',(event) => {
    selectCity(event,inputCitiesFrom,dropdownCitiesFrom);
});
dropdownCitiesTo.addEventListener('click',(event) => {
   selectCity(event,inputCitiesTo,dropdownCitiesTo);
});


formSearch.addEventListener('submit',(event) => {
    event.preventDefault();

    const cityFrom = city.find((item) => {
        return inputCitiesFrom.value === item.name
    });
    const cityTo = city.find((item) => {
        return inputCitiesTo.value === item.name
    });

    const formData = {
        from: cityFrom.code,
        to: cityTo.code,
        when: inputDateDepart.value,
    };

    const requestData = '?depart_date=' + formData.when +
        '&origin=' + formData.from +
        '&destination=' + formData.to +
        '&one_way=true';




    getData( calendar + requestData, (response) => {
        renderCheap(response, formData.when);

    });
});
//Calls function

    getData(proxy + citiesApi, (data) => {
        city = JSON.parse(data).filter(item => item.name);
        console.log(city);
    });


/*

(item) => {
return item.name
}

 */



























