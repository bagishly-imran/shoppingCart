    


const content = document.querySelector('#list');
const shopCards = document.querySelector('#cards');
const allTotal = document.querySelector('#alltotal');

const list  = [
    {id: 1, name: 'Pear', price: 0.20, quantity: 1,},
    {id: 2, name: 'Apple', price: 0.22, quantity: 1,},
    {id: 3, name: 'Orange', price: 0.77, quantity: 1,},
    {id: 4, name: 'Avocado', price: 1.20, quantity: 1,},
    {id: 5, name: 'Tomato', price: 2.22, quantity: 1,},
    {id: 6, name: 'Quince', price: 3.77, quantity: 1,},
    {id: 7, name: 'Watermelon', price: 5.84, quantity: 1,},
]


const cards = [];
const local = JSON.parse(localStorage.getItem('cards'));


// Bu kod localStorage - de mehsul varsa  mehsullari yeniden cards arrayina elave edir.
if(local) {
    for(const card of local){
        cards.push(card)
    }
}

list.map(fruit => {
    return (
        $(content).append(`
            <div class="card col-3" id = {${fruit.id}}>
                <div class="card-body d-flex justify-content-between w-100">
                    <strong>
                        ${fruit.name}
                    </strong>
                    $${fruit.price}
                </div>
                <button
                    type = 'button'
                    class = 'button btn btn-dark'
                    onClick = {addToCard(${fruit.id})}
                >Add to Card</button>
            </div>
        `)
    )
})    


// Bu kod yeni mehsulu elave edir. ve elave ederken mehsulu kontrol edib eyni id - e beraber olub olmadiqini yoxlayir. 
// Eger mehsul evvelceden varsa sayini artirir yoxdursa yeni olaraq elave edir... 
const addToCard = (id) => {
    
    if(cards.find(card => card?.id == id)) {
        cards.filter(card => {return card.id == id ? card.quantity++ : card})
    } else {
        list.filter(lis => {return lis.id == id ? cards.push(lis) : null})
    }
    
    localStorage.setItem('cards', JSON.stringify(cards))
}

// Bu kod mehsulu birbasa sayini azaltmadan silecek...
const deleteCard = (id) => {
    const removeCard = cards.filter(card => {return card.id !== id})
    localStorage.setItem('cards', JSON.stringify(removeCard))
}

// Bu funksiyadir ve cagirildigi yerde daxilindeki kodlari tetbiq edir...
const quantityControll = () => {
    
    // Bu kod Mehsulun sayini yoxlayir. Seyfe her yenilenende eger mehsullardan her hansi birinin sayi 1 - den azdirsa mehsulu datadan silir.
    const quantityControllCard = cards.filter((card, index) => {return card.quantity > 0 ? card : null})
    localStorage.setItem('cards', JSON.stringify(quantityControllCard))
}

// Bu kod mehsulu sayini azaldacaq ve en sonda say sifira beraber olduqunda localStorage den silinecek.
const deleteCount = (id) => {

    if(cards.find(card => card?.id == id)) {
        cards.filter(card => {return card.id == id ? card.quantity-- : card});
    }     
    localStorage.setItem('cards', JSON.stringify(cards))
    quantityControll();
}

// BU KOD LOCALSTORAGE - de olan mehsullari cards seyfesine add (elave) edir.
if(local) {

    // Bu kod local data - da olan umumi mehsulun qiymetini hesablayir
    const allTotalProducts = local.reduce((sum, card) => {
        return sum + (card.quantity * card.price)
    },0)

    // Bu if kodu innerHTML in diger fayllarda istifade olunmadiqi ucun xeta vermemesi ucundur...
    if(location.pathname.includes('/shoppingCard.html')) {

        // Bu kod neticeni teyin olunmus id atributuna aid tag - in icine yazdirir...
        allTotal.innerHTML = `Total Price: ${allTotalProducts.toFixed(2)}$`;
    }

    local.map(fruit => {
        return (
            $(shopCards).append(`
                <div class="card col-3" id = {${fruit.id}}>
                    <div class="card-body gap-1">
                        <h5>${fruit.name}</h5>
                        <h5>Total: ${(fruit.quantity * fruit.price).toFixed(2)}$</h5>
                        <div class = 'd-flex justify-content-between align-items-center'>
                            <strong>Count: ${fruit.quantity}</strong>
                            <button 
                                type = 'button' 
                                class = 'circle-btn'
                                onClick = {deleteCount(${fruit.id})}
                            >
                                <span class="material-symbols-outlined">
                                    remove
                                </span>
                            </button>
                        </div>
                    </div>
                    <button
                        type = 'button'
                        class = 'button btn btn-danger'
                        onClick = {deleteCard(${fruit.id})}
                    >Remove All</button>
                </div>
            `)
        )
    });
    
}
