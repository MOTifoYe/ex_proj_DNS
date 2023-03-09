const card = (c) => {
  let a = document.createElement('div');
  a.className = 'card';
  a.innerHTML += `<p>${c}</p>`;
  return a;
}


/**
 * 
 * @param {string} title 
 * @param {Array} products 
 * @returns HTML
 */
const category = (title, products) => {
  let a = document.createElement('div');
  a.className = 'category';
  a.innerHTML += `<h1>${title.toLocaleTitleCase()}</h1>`;

  for (const product in products) {
    if (Object.hasOwnProperty.call(products, product)) {
      const element = products[product];
      a.append(card(element));
    }
  }

  return a;
}

/**
 * 
 * @param {string} key - key in list_products  
 * @returns HTML
 */
const category1 = (key) => {
  let category_html = document.createElement('div');
  category_html.className = 'category';
  category_html.innerHTML += `<h1>${key.toLocaleTitleCase()}</h1>`;

  for (const category_product in list_products) {
    if (Object.hasOwnProperty.call(list_products, category_product)) {
      const categories_list = list_products[category_product];
      
      for (const manufacturer in categories_list) {
        if (Object.hasOwnProperty.call(categories_list, manufacturer)) {
          const element = categories_list[manufacturer];
          
          let card_html = document.createElement('div');
          card_html.className = 'card';
          card_html.innerHTML += `<p>${element}</p>`;

          category_html.append(card_html);
        }
      }
    }
  }

  return category_html;
}

function show_all_products() {
  for (const key in list_products) {
    // content.append(category(key));
    content.append(card_builder(key));
  }
}


window.addEventListener("load", show_all_products);


let bfil = document.querySelector("#bfil");
bfil.addEventListener("click", select_product);


function select_product() {
  content.innerHTML = "";
  let checkboxes = Array.from(document.main_form.flist)
  .filter(el => el.checked)
  .map(el => content.append(category(el.value)));
  if(!checkboxes.length) {show_all_products()} 
}

