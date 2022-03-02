// search field
const searchPhone = () => {
    
    const searchField = document.getElementById('search-box');
    const searchText = searchField.value;

    // clear search field
    searchField.value = '';
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));
}

const displaySearchResult = (data) => {
    const searchResult = document.getElementById('search-result');

    try {
        let child = searchResult.lastChild;

        while (child) {
            searchResult.removeChild(child);
            child = searchResult.lastChild;
        }
    } catch (error) {

    }

    //error msg remove
    document.getElementById('error-message').style.display = 'none';
    // clear search area
    searchResult.innerHTML = '';
    searchResult.textContent = '';

    // return massage
    if (data.length == 0) {
        alert('Inter A Valid Name ');
    }
    let counter = 0;
    data.forEach(element => {
        if (counter == 20) {
            throw 'Break';
        }
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
                                <div  class="card h-100">
                                        <img src="${element.image} " class="card-img-top w-50 mx-auto pt-5" alt="...">
                                    <div class="card-body">
                                         <h5 class="card-text">${element.phone_name} </h5>
                                            <p class="card-text">${element.brand} </p>
                                    </div>
                                    <div class="card-footer">
                                        <button onclick="loadPhoneDetail(this.id)" type="button" class="btn btn-primary" id="${element.slug}">Details</button>
                                    </div>
                                </div>
                             `;
        searchResult.appendChild(div);
        counter++;
    });
}
const loadPhoneDetail = (id) => {

    // load meal id
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data))
}

//display details
const displayPhoneDetail = info => {
    const phoneData = info.data;
    const phoneDetails = document.getElementById('phone-details');
    try {
        let child = phoneDetails.lastChild;
        phoneDetails.removeChild(child);
    } catch (error) {

    }
    const div = document.createElement('div');

    //others
    if (!phoneData.others) {
        phoneData.others ={Bluetooth:'',GPS:'',NFC:'',Radio:'',USB:'',WLAN:''};
    }
    
    //relese Date
    if (!phoneData.releaseDate) {
        phoneData.releaseDate ='' ;   
    }
    
    div.classList.add('card');
    div.innerHTML = `   <div  class="card h-100">
                                <img src="${phoneData.image}" class="card-img-top w-50 mx-auto pt-5" alt="...">
                            <div class="card-body">
                                <h5 class="card-title"> ${phoneData.brand}</h5>
                                <h5 class="card-title"> ${phoneData.name}</h5>
                                <h5 class="card-title">Release Date: ${phoneData.releaseDate ? phoneData.releaseDate : 'Release Date not found'}</h5>
                                    <p class="card-text">Storage: ${phoneData.mainFeatures.storage}</p>
                                    <p class="card-text">ChipSet: ${phoneData.mainFeatures.chipSet}</p>
                                    <p class="card-text">Memory: ${phoneData.mainFeatures.memory}</p>
                                    <p class="card-text">Sensors: ${phoneData.mainFeatures.sensors}</p>
                                    <p class="card-text">Other: ${phoneData.others ? phoneData.others : 'N/A'}</p>
                                    <p class="card-text">Bluetooth: ${phoneData.others.Bluetooth}</p>
                                    <p class="card-text">GPS: ${phoneData.others.GPS ? phoneData.others.GPS : 'N/A'}</p>
                                    <p class="card-text">NFC: ${phoneData.others.NFC ? phoneData.others.NFC : 'N/A'}</p>
                                    <p class="card-text">Radio: ${phoneData.others.Radio ? phoneData.others.Radio : 'N/A'}</p>
                                    <p class="card-text">USB: ${phoneData.others.USB ? phoneData.others.USB : 'N/A'}</p>
                                    <p class="card-text">WLAN: ${phoneData.others.WLAN ? phoneData.others.WLAN : 'N/A'}</p>
                            </div>
                        </div>
                    `;

    phoneDetails.appendChild(div)
}