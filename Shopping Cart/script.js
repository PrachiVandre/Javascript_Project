let shop = document.querySelector('#shop');

let basket = JSON.parse(localStorage.getItem('data')) || [];

let generateShop = () => {
    return(
        shop.innerHTML = shopItemsData.map(items => {
            const {id, name, oldPrice, price, img} = items;
            let search = basket.find((x) => x.id === id) || [];
            return `
            <div class="col-md-3 col-sm-4 col-xs-6 products">
                <div class="item">
                    <img width="200" src=${img} alt=${name}>
                    <div class="details">
                        <h3>${name}</h3>
                        <div class="price-quantity">
                            <p>
                                <span class="price">$${price}</span>
                                <span class="oldprice">M.R.P <span style="text-decoration: line-through;">${oldPrice}</span> </span>
                            </p>
                            <p>
                                <span onClick="increment(${id})">+</span>
                                <span id=${id}>${search.item === undefined ? 0 : search.item}</span>
                                <span onClick="decrement(${id})">-</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
           `
        }).join("")
    );
}
generateShop();

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
  
    localStorage.setItem("data", JSON.stringify(basket));
}

const update = (id) =>{
  let search = basket.find(x => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
}

const calculation = () => {
 const cartIcon = document.getElementById('prod_qty');
  const totalprod = basket.map((prod)=>{
    return prod.item;
  }).reduce((a, b)=> a + b, 0);

  cartIcon.innerHTML= totalprod;
}

calculation();

// const generateCartItems = () => {
//   if(basket.length !==0 ) {
//     console.log('You have selected products');
//   } else {
//     console.log('empty');
//   }
// }
// generateCartItems();