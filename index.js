const card = document.querySelectorAll('.info-card')
const links = document.querySelectorAll('.links')

let cardData ; //This will be set to data fetch by json file


// Setting default screen data
fetch('./data.json')
.then(res => res.json())
.then(data => {
    cardData =  data.map((item, index) => {
        return item
    })

    fillCards('weekly')
})

// Dynamically changes cards data
links.forEach( link => link.addEventListener('click', (e) => {
    fillCards(e.target.dataset.value)

    // Changing current link 
    links.forEach(link => link.classList.remove('active'))
    link.classList.add('active')
}))

// Function to fill cards with info
function fillCards(time){
    // Setting up default info set to weekly 
    let lastTime = time === 'weekly' ? 'Last Week' : time === 'daily' ? 'Yesterday' : time === 'monthly' ? 'Last Month' : ''

    for(let i = 0 ; i < cardData.length ; i++){
        const html = `
                    <div class='title-wrapper'> 
                        <p class='card-title'>${cardData[i].title}</p>
                        <img src='./images/icon-ellipsis.svg' alt='more-icon' class='more-icon'/>
                    </div>
                    <div class='card-time'>
                        <p class='card-current-time'>${cardData[i].timeframes[time].current}hrs</p>
                        <p class='card-previous-time'>${lastTime} - ${cardData[i].timeframes[time].previous}hrs</p>
                    </div>
                `
        card[i].innerHTML = html
    }
}