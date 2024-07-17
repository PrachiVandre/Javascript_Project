let label = document.querySelector('#summary');
let shoppingCart = document.querySelector('#shopping-cart');

let basket = JSON.parse(localStorage.getItem('data')) || [];

const total = document.getElementById('total');

const calculation = () => {
    const cartIcon = document.getElementById('prod_qty');
     const totalprod = basket.map((prod)=>{
       return prod.item;
     }).reduce((a, b)=> a + b, 0);
   
     cartIcon.innerHTML= totalprod;
   }
   
calculation();

let generateCartItems = () => {
    if(basket.length !== 0){
        return shoppingCart.innerHTML = basket.map((items) => {
           const{id, item} = items;
           const search = shopItemsData.find((y) => y.id === id) || [];

            return `
            <div class="border-top border-bottom">
                <div class="row main align-items-center">
                    <div class="col-2"><img class="img-fluid" src=${search.img}></div>
                    <div class="col">
                        <div class="row text-muted">${search.name}</div>
                        <div class="row">$${search.price}</div>
                    </div>
                    <div class="col">
                        <p>
                            <a href="#" onClick="increment(${id})">+</a>
                            <a id=${id} class="border">${item}</a>
                            <a href="#" onClick="decrement(${id})">-</a>
                        </p>
                    </div>
                    <div class="col">&euro; ${item * search.price} <span class="close" style="cursor:pointer" onClick="removeItem(${search.id})">&#10005;</span></div>
                </div>
            </div>
            `
        }).join("");
    }
    else {
        shoppingCart.classList.replace("col-md-8", "col-md-12");
        shoppingCart.innerHTML = `
            <div class="empty">
                <img src="images/bag.png" />
                 <h4>Hey, your Bag is empty !</h4>
                <a href="index.html">
                    <button>ADD ITEMS FROM WISHLIST</button>
                </a>
            </div>
        `;
        label.style.display = "none";
    }
}

generateCartItems();

const increment = (id) => {
    let selectedId = id;
    let search = basket.find((x) => x.id === selectedId.id);
    
    if(search === undefined){
      basket.push({
        id: selectedId.id,
        item: 1
      })
    }
    else {
      search.item += 1;
    }
  
    update(selectedId.id);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}

const decrement = (id) => {
    let selectedId = id;
    let search = basket.find(x => x.id === selectedId.id);

    if(search === undefined) return;
    else if(search.item === 0) return;
     else {
      search.item -=1;
    }
    update(selectedId.id);
   
    basket = basket.filter((el)=>{
      return el.item !== 0;
    })
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}

const update = (id) =>{
  let search = basket.find(x => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
  removeItem();
}

const removeItem = (id) => {
    let removeId = id;
    basket = basket.filter((x) =>{
        return x.id !== removeId.id;
    })
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

const totalAmount = () => {
    if(basket.length !== 0) {
        const res = basket.map((ele) => {
            const{ id, item } = ele;
            const search = shopItemsData.find(shop => shop.id === id) || [];
            
            return item * search.price;
        }).reduce((a, b)=> a+ b);
        
        total.innerHTML = `
          <span>&euro;${res}</span>
        `
    } else return;
    
}

const clearCart = () =>{    
    basket = [];
    generateCartItems();
    localStorage.clear();
    calculation();
}
