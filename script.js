//get information

const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
    dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
    inputCitiesTo = formSearch.querySelector('.input__cities-to'),
    dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
    inputDateDepart = formSearch.querySelector('.input__date-depart'),
    cheapestTicket = document.getElementById('cheapest-ticket'),
    otherCheapTickets = document.getElementById('other-cheap-tickets');


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
                return fixItem.startsWith(input.value.toLowerCase());
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

const createCard = (data) => {
    const ticket = document.createElement('article');
    ticket.classList.add('ticket');

    let deep = '';

    if (data) {
        deep =`
               <h3 class="agent">Aviakassa</h3>
                <div class="ticket__wrapper">
                    <div class="left-side">
                        <a href="https://www.aviasales.ru/search/SVX2905KGD1" class="button button__buy">Купить
                            за 19700₽</a>
                    </div>
                    <div class="right-side">
                        <div class="block-left">
                            <div class="city__from">Вылет из города
                                <span class="city__name">Екатеринбург</span>
                            </div>
                            <div class="date">29 мая 2020 г.</div>
                        </div>
                
                        <div class="block-right">
                            <div class="changes">Без пересадок</div>
                            <div class="city__to">Город назначения:
                                <span class="city__name">Калининград</span>
                            </div>
                        </div>
                    </div>
                </div>  
        `;
    } else {
        deep = '<h3>No tickets for the current date!</h3>'
    }


    ticket.insertAdjacentHTML('afterbegin',deep);

    return ticket;

};

const renderCheapDay = (cheapTicket) => {
    const ticket = createCard(cheapTicket[0]);
    console.log(ticket);
};

const renderCheapYear = (cheapTickets) => {
    //not for string
    cheapTickets.sort((a, b) => a.value - b.value);

    // you can sort number,string
    // cheapTickets.sort((a, b) => {
    //     if (a.value > b.value) {
    //         return 1;
    //     }
    //     if (a.value < b.value) {
    //         return -1;
    //     }
    //     // a должно быть равным b
    //     return 0;
    // });
    console.log(cheapTickets);
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
        from: cityFrom,
        to: cityTo,
        when: inputDateDepart.value,
    };

    if (formData.from && formData.to) {
            const requestData = `?depart_date=${formData.when}&origin=${formData.from.code}` +
                `&destination=${formData.to.code}&one_way=true`;


            getData(calendar + requestData, (data) => {
                renderCheap(data, formData.when);

        });
    } else {
        alert('Enter the correct city name!');
    }
});
//Calls function

    getData(proxy + citiesApi, (data) => {
        city = JSON.parse(data).filter(item => item.name);

        city.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
        console.log(city);
    });


/*

(item) => {
return item.name
}

 */

























