"use strict";


Object.defineProperty(String.prototype, 'toLocaleTitleCase', 
  {
    value: function() {
      return this.slice(0,1).toUpperCase() + this.slice(1);
    }
  }
)


let content = document.querySelector(".content");


// category -> type -> {filter} :  manufact.. ->
// PC, Laptop, perefery -> laptop's, mouse's, etc. -> {filter} : 
// perefery -> mouse -> {filter} : lihgting + wireless + Logitech + etc.
let list_products = 
[
  {
    'category' : 'mouses',
    'products' : 
    [
      {
        'type' : 'mouse',
        'manufacturer' : 'Aceline',
        'manufacturer_code' : '',
        'model' : 'CM-408BU',
        'primary_color' : 'black',
        'lighting': '',
        'key_count' : 3,
        'connection_type' : 'wired',
        'connection_interface' : 'USB Type-A',
        'price' : 99   
      },
      {
        'type' : 'mouse',
        'manufacturer' : 'Razer',
        'manufacturer_code' : 'RZ01-03210100-R3M1',
        'model' : 'DeathAdder V2',
        'primary_color' : 'black',
        'lighting': 'RGB',
        'key_count' : 8,
        'connection_type' : 'wired',
        'connection_interface' : 'USB Type-A',
        'price' : 4299   
      },
      {
        'type' : 'mouse',
        'manufacturer' : 'A4Tech',
        'manufacturer_code' : '',
        'model' : 'Bloody P30 Pro',
        'primary_color' : 'black',
        'secondary_color' : 'red',
        'lighting': 'RGB',
        'key_count' : 8,
        'connection_type' : 'wired',
        'connection_interface' : 'USB Type-A',
        'price' : 2699   
      },
      {
        'type' : 'mouse',
        'manufacturer' : 'Logitech',
        'manufacturer_code' : '910-005824',
        'model' : 'G102 LIGHTSYNC',
        'primary_color' : 'white',
        'lighting': 'RGB',
        'key_count' : 6,
        'connection_type' : 'wired',
        'connection_interface' : 'USB Type-A',
        'price' : 2399   
      },
      {
        'type' : 'mouse',
        'manufacturer' : 'Apple',
        'manufacturer_code' : 'MK2E3AM/A',
        'model' : 'Magic Mouse',
        'primary_color' : 'white',
        'lighting': '',
        'key_count' : 0,
        'connection_type' : 'wireless',
        'connection_interface' : 'Bluetooth',
        'price' : 7999   
      },
      {
        'type' : 'mouse',
        'manufacturer' : 'Xiaomi',
        'manufacturer_code' : '',
        'model' : 'Dual Mode Wireless Mouse Silent Edition',
        'primary_color' : 'black',
        'lighting': '',
        'key_count' : 6,
        'connection_type' : 'wireless',
        'connection_interface' : 'Bluetooth',
        'connection_interface' : 'Radio',
        'price' : 1399   
      }
    ]
  },
  {
    'category' : 'keyboards',
    'products' : 
    [
      {
        'manufacturer' : 'Logitech',
        'manufacturer_code' : '920-008516',
        'type' : 'keyboard',
        'model' : 'G413',
        'primary_color' : 'white',
        'lighting': 'white',
        'connection_type' : 'wired',
        'connection_interface' : 'USB',
        'price' : 8999
      },
      {
        'manufacturer' : 'Apple',
        'manufacturer_code' : 'MK293RS/A',
        'type' : 'keyboard',
        'model' : 'Magic Keyboard с Touch ID',
        'primary_color' : 'silwer',
        'lighting': '',
        'connection_type' : 'wireless',
        'connection_interface' : 'Bluetooth',
        'price' : 13999
      }
    ]
  }
]


function build_card_html (obj) {
  let card = document.createElement('div');
  card.className = 'card';
  
  let type = document.createElement('div');
  type.className = 'type';
  type.innerHTML += `Type: ${obj.type}`;
  
  let manufacturer = document.createElement('div');
  manufacturer.className = 'manufacturer';
  manufacturer.innerHTML += `Manufacturer: ${obj.manufacturer}`;
  
  let model = document.createElement('div');
  model.className = 'model';
  model.innerHTML += `Model: ${obj.model}`;
  
  let lighting = document.createElement('div');
  lighting.className = 'lighting';
  lighting.innerHTML += `Lighting: ${obj.lighting}`;
  
  let price = document.createElement('div');
  price.className = 'price';
  price.append(`Price: ${obj.price}`);

  card.append(type, manufacturer, model, lighting, price);

  return card;
}


function show_products() {
  content.innerHTML = "";
  list_products.map(el => el.products.map(el => build_card_html(el))).map(el => el.map(el => content.append(el)));
}
window.addEventListener("load", show_products);
document.form_filter.bReset.addEventListener("click", show_products);


// function show_products_sort() {
//   content.innerHTML = "";
//   list_products.map(el => el.products.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer)).map(el => build_card_html(el))).map(el => el.map(el => content.append(el)));
// }
// document.form_filter.bSort.addEventListener("click", show_products_sort);


function show_filtred_products() {
  let filter_type = Array.from(document.form_filter.filter_type).filter(el => el.checked).map(el => el.value).toString();
  let filter_manufacturer = Array.from(document.form_filter.filter_manufacturer).filter(el => el.checked)
  let filter_lighting = Array.from(document.form_filter.filter_lighting).filter(el => el.checked)

  content.innerHTML = "";
  list_products.map(el => el.products.filter(productsFilter).map(el => build_card_html(el))).map(el => el.map(el => content.append(el)));
  
  
  function productsFilter (obj) {
    if(!filter_type.length && !filter_manufacturer.length && !filter_lighting.length){return true}
    
    var filtred_product = obj; 
    
    if (!!filter_type && !(filtred_product.type == filter_type)){filtred_product = null;}
    
    if (filtred_product && !!filter_manufacturer.length){
      let match = 0;
      filter_manufacturer.forEach(fil => fil.value.toLowerCase() == obj.manufacturer.toLowerCase() ? match+=1 : {});
      if(!match){filtred_product = null;}
    }

    if (filtred_product && !!filter_lighting.length){
      let match = 0;
      filter_lighting.forEach(fil => fil.value.toLowerCase() == obj.lighting.toLowerCase() ? match+=1 : {});
      if(!match){filtred_product = null;}
    }
    // console.log(filtred_product);
    return !!filtred_product;
  }
} 
document.form_filter.bApply.addEventListener("click", show_filtred_products);




// function select_product() {
//   content.innerHTML = "";
//   let cards = []
//   let filtres = Array.from(document.form_filter.flist)
//   .filter(el => el.checked)
//   .map(el => Array.prototype.filter.call(list_products, e => e == el.value) 
//     .map(l => cards.push(build_card_html(l))));
//   content.append(build_category_html(cards));
//   if(!filtres.length) {show_all_products()} 
// }


// function select_product() {
//   content.innerHTML = "";
//   let cards = []
//   let filtres = Array.from(document.form_filter.flist)
//   .filter(el => el.checked)
//   .map(el => list_products
//     .filter(e => e.type == el.value) 
//     .map(l => cards.push(build_card_html(l))));
//   content.append(build_category_html(cards));
//   if(!filtres.length) {show_all_products()} 
// }
