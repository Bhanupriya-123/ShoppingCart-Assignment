//const productDataList = require('./index2');
import productData from './index2';

require("babel-core/register");
require("babel-polyfill");

//Variable declaration 
const productListEl = document.querySelector(".productList");

const detailsEl = document.querySelector(".displayCart");
const show_mens_category=document.querySelector(".men");
const show_women_category=document.querySelector(".women");
const show_electronic_category=document.querySelector(".electronic");
const show_jewellery_category=document.querySelector(".jewellery");

const Show_PriceRange1 =document.querySelector(".priceItem1");
const Show_PriceRange2 =document.querySelector(".priceItem2");

let product_list = [];
let save_ToCart;
let get_list;
let product_id_cart=[];

let mens_product_category=[];
let womens_product_category=[];
let electronics_product_category=[];
let jewellery_product_category=[];

// fetch data from api
productData();
 const fetchData = productData();
 fetchData.then(ProductsData =>{

  //---------Storing the data in locastorage by using setItem() method--------------- 
  localStorage.setItem('all_product_data',JSON.stringify(ProductsData));
  ProductsData.forEach((element) => product_list.push(element));
  //console.log(product_list);
   get_list = JSON.parse(localStorage.getItem('all_product_data'));

console.log(get_list);
//Mainpage rendering 
  const trItems = product_list
    .map((item) => {
      return `
      <div class="apiList">
        <div>${item.title}</div>
        <div><img src="${item.image}" height="100"/></div>
        <div>&#8377;. ${item.price}</div>
        <div><button id="addCart" class="cart" data-id="${item.id}" data-title="${item.title}" data-image="${item.image}" data-description="${item.description}" data-category="${item.category}" data-price="${item.price}">Add to cart</button></div>
      </div>
    `;
    })
    .join("");
    productListEl.innerHTML = `
    <table id="table-list">
      <tbody>
        ${trItems}
      </tbody>
    </table>
  `;
  
let i=0;

for(i=0;i<product_list.length;i++){
  if(get_list[i].category.includes("jewelery")){
    jewellery_product_category.push(get_list[i]);
  }
else if(get_list[i].category.includes("electronics")){
  electronics_product_category.push(get_list[i]);
}
 else if(get_list[i].category.includes("women's clothing")){
  womens_product_category.push(get_list[i]);
}
else if(get_list[i].category===("men's clothing")){
  mens_product_category.push(get_list[i]);
}
}   


  //-------------------Display saved AddToCart Product----------------------------
     document.getElementById("addToCart").addEventListener("click", function(){
          document.getElementsByClassName("productList")[0].style.display = "none";
          document.getElementsByClassName("displayCart")[0].style.display = "block";

          // let filter_result3=product_list.filter(word=>(word.id===+product_id_cart));
           console.log(product_id_cart);
           
          let show_item_incart=[];

          let i;
          for( i=0;i<product_id_cart.length;i++){
            let z=product_id_cart[i]-1;               
            show_item_incart.push(product_list[z]);      

          }

          let trItem = show_item_incart.map((item) => {
          return `
          <div id="cartDivList">
            <tr>
              <td>
                <img src="${item.image}" height="150" id="cartImg"/>
              </td>
              <td>
                <p style="font-weight:bold">${item.title}</p>
                <p>${item.description}</p>
                <p> &#8377;. ${item.price}</p>
              </td>
            </tr>
          </div>
          `;
          }).join("");
          detailsEl.innerHTML = `
          <table>
            <tbody>
              <td>${trItem}</td>
              <td>
                <button id="homeBtn">Return to MainPage</button>
                <button id="clearCart">Clear</button>
              </td>
            </tbody>
          </table>
        `;
    document.getElementById("homeBtn").addEventListener('click',function(){
      document.getElementsByClassName("displayCart")[0].style.display = "none";
      document.getElementsByClassName("productList")[0].style.display = "block";
      });
      document.getElementById("clearCart").addEventListener('click', function(){
        localStorage.removeItem('id');
        document.getElementsByClassName("displayCart")[0].style.display = "none";
        document.getElementsByClassName("productList")[0].style.display = "block";
        product_id_cart.length=0;
        
      });
    });


 });
 
 const displayProducts = document.getElementsByClassName("productList")[0];
 displayProducts.addEventListener("click", (e) => {
  e.stopPropagation();
  const dataid = e.target.getAttribute("data-id");
  const dataDescription = e.target.getAttribute("data-description");
  const dataTitle = e.target.getAttribute("data-title");
  const dataImage = e.target.getAttribute("data-image");
  const dataPrice = e.target.getAttribute("data-price");
  console.log(dataid);
   let x;
  let count=0;
  for(x=0;x<get_list.length;x++){
    let j=[];                          
     j.push(get_list[count].id);
    if(j.indexOf(+dataid)>  -1){
  let product_id,product_name,product_description,product_price;
  product_id = localStorage.getItem("id")? localStorage.getItem("id")+","+dataid  :  dataid;

  localStorage.setItem('id',product_id);

  if(localStorage.getItem("id")!=null && localStorage.getItem("id")!="" && localStorage.getItem("id")!=undefined){
    //if(product_id_cart!=""){
    product_id_cart = product_id.split(",").reverse();
    // }
    // else{
    //   product_id_cart=product_id;
    // }
    console.log(product_id_cart);
  }
    }count++;
  }
 });

//------------------------EventListener for Category List---------------------------------

//-------------EventListener for Category Men-Block------------------
document.getElementById("mens-block").addEventListener("click",function(){
  document.getElementsByClassName("productList")[0].style.display = "none";
  document.getElementsByClassName("men")[0].style.display = "block";
  const trItems = mens_product_category
    .map((item) => {
      return `
    
      <div class="apiList">
        <div>${item.title}</div>
        <div><img src="${item.image}" height="100"/></div>
        <div>${item.description}</div>
        <div>&#8377;. ${item.price}</div>
        <div><button id="addCart" class="cart" data-id="${item.id}" data-title="${item.title}" data-image="${item.image}" data-description="${item.description}" data-category="${item.category}" data-price="${item.price}">Add to cart</button></div>
      </div>
    `;
    })
    .join("");
    show_mens_category.innerHTML = `
    <table id="table-list">
      <tbody>
        ${trItems}
      </tbody>
    </table>
  `;
});

//-------------EventListener for Category Women-Block------------------
document.getElementById("women-block").addEventListener("click",function(){
  document.getElementsByClassName("productList")[0].style.display = "none";
  document.getElementsByClassName("women")[0].style.display = "block";
  const trItems = womens_product_category
    .map((item) => {
      return `
    
      <div class="apiList">
        <div>${item.title}</div>
        <div><img src="${item.image}" height="100"/></div>
        <div>${item.description}</div>
        <div>&#8377;. ${item.price}</div>
        <div><button id="addCart" class="cart" data-id="${item.id}" data-title="${item.title}" data-image="${item.image}" data-description="${item.description}" data-category="${item.category}" data-price="${item.price}">Add to cart</button></div>
      </div>
    `;
    })
    .join("");
    show_women_category.innerHTML = `
    <table id="table-list">
      <tbody>
        ${trItems}
      </tbody>
    </table>
  `;
});

//-------------EventListener for Category Electronics-Block------------------
document.getElementById("electronics-block").addEventListener("click",function(){
  document.getElementsByClassName("productList")[0].style.display = "none";
  document.getElementsByClassName("electronic")[0].style.display = "block";
  const trItems = electronics_product_category
    .map((item) => {
      return `
    
      <div class="apiList">
        <div>${item.title}</div>
        <div><img src="${item.image}" height="100"/></div>
        <div>${item.description}</div>
        <div>&#8377;. ${item.price}</div>
        <div><button id="addCart" class="cart" data-id="${item.id}" data-title="${item.title}" data-image="${item.image}" data-description="${item.description}" data-category="${item.category}" data-price="${item.price}">Add to cart</button></div>
      </div>
    `;
    })
    .join("");
    show_electronic_category.innerHTML = `
    <table id="table-list">
      <tbody>
        ${trItems}
      </tbody>
    </table>
  `;
});

//-------------EventListener for Category Jewellery-Block------------------
document.getElementById("jewellery-block").addEventListener("click",function(){
  document.getElementsByClassName("productList")[0].style.display = "none";
  document.getElementsByClassName("jewellery")[0].style.display = "block";
  const trItems = jewellery_product_category
    .map((item) => {
      return `
    
      <div class="apiList">
        <div>${item.title}</div>
        <div><img src="${item.image}" height="100"/></div>
        <div>${item.description}</div>
        <div>&#8377;. ${item.price}</div>
        <div><button id="addCart" class="cart" data-id="${item.id}" data-title="${item.title}" data-image="${item.image}" data-description="${item.description}" data-category="${item.category}" data-price="${item.price}">Add to cart</button></div>
      </div>
    `;
    })
    .join("");
    show_jewellery_category.innerHTML = `
    <table id="table-list">
      <tbody>
        ${trItems}
      </tbody>
    </table>
  `;
});



//-------------------------EventListener For PriceList------------------------------------

//--------------EventListener For PriceRange from Rs.0-Rs.500----------------------


document.getElementById("PriceRange1").addEventListener("click",function(){
let filter_result1=product_list.filter(word=>((word.price>=0) && (word.price<=500)));
document.getElementsByClassName("productList")[0].style.display = "none";
document.getElementsByClassName("priceItem1")[0].style.display = "block";

  const trItems = filter_result1
    .map((item) => {
      return `
    
      <div class="apiList">
        <div>${item.title}</div>
        <div><img src="${item.image}" height="100"/></div>
        <div>${item.description}</div>
        <div>&#8377;. ${item.price}</div>
        <div><button id="addCart" class="cart" data-id="${item.id}" data-title="${item.title}" data-image="${item.image}" data-description="${item.description}" data-category="${item.category}" data-price="${item.price}">Add to cart</button></div>
      </div>
    `;
    })
    .join("");
    Show_PriceRange1.innerHTML = `
    <table id="table-list">
      <tbody>
        ${trItems}
      </tbody>
    </table>
  `;
});

//--------------EventListener For PriceRange from Rs.500-Rs.1000----------------------
document.getElementById("PriceRange2").addEventListener("click",function(){
  let filter_result2=product_list.filter(word=>((word.price>=500) && (word.price<=1000)));
  document.getElementsByClassName("productList")[0].style.display = "none";
document.getElementsByClassName("priceItem2")[0].style.display = "block";

  const trItems = filter_result2
    .map((item) => {
      return `
    
      <div class="apiList">
        <div>${item.title}</div>
        <div><img src="${item.image}" height="100"/></div>
        <div>${item.description}</div>
        <div>&#8377;. ${item.price}</div>
        <div><button id="addCart" class="cart" data-id="${item.id}" data-title="${item.title}" data-image="${item.image}" data-description="${item.description}" data-category="${item.category}" data-price="${item.price}">Add to cart</button></div>
      </div>
    `;
    })
    .join("");
    Show_PriceRange2.innerHTML = `
    <table id="table-list">
      <tbody>
        ${trItems}
      </tbody>
    </table>
  `;
});



const display_category1 = document.getElementsByClassName("men")[0];
display_category1.addEventListener("click", (e) => {
  e.stopPropagation();

  const dataid = e.target.getAttribute("data-id");
  move_tocart(dataid);

});

const display_category2 = document.getElementsByClassName("women")[0];
display_category2.addEventListener("click", (e) => {
  e.stopPropagation();

  const dataid = e.target.getAttribute("data-id");
  move_tocart(dataid);
});

const display_category3 = document.getElementsByClassName("jewellery")[0];
display_category3.addEventListener("click", (e) => {
  e.stopPropagation();

  const dataid = e.target.getAttribute("data-id");
  move_tocart(dataid);
});

const display_category4 = document.getElementsByClassName("electronic")[0];
display_category4.addEventListener("click", (e) => {
  e.stopPropagation();

  const dataid = e.target.getAttribute("data-id");
  move_tocart(dataid);
});

//--------------------------------------------------------
const display_price1 = document.getElementsByClassName("priceItem1")[0];
display_price1.addEventListener("click", (e) => {
  e.stopPropagation();

  const dataid = e.target.getAttribute("data-id");
  move_tocart(dataid);

});

const display_price2 = document.getElementsByClassName("priceItem2")[0];
display_price2.addEventListener("click", (e) => {
  e.stopPropagation();

  const dataid = e.target.getAttribute("data-id");
  move_tocart(dataid);

});

document.getElementById("all").addEventListener("click", function(){
  document.getElementsByClassName("productList")[0].style.display = "block";
  document.getElementsByClassName("men")[0].style.display = "none";
  document.getElementsByClassName("women")[0].style.display = "none";
  document.getElementsByClassName("electronic")[0].style.display = "none";
  document.getElementsByClassName("jewellery")[0].style.display = "none";
  document.getElementsByClassName("priceItem1")[0].style.display = "none";
  document.getElementsByClassName("priceItem2")[0].style.display = "none";
});

function move_tocart(dataid){

  console.log(dataid);
   let x;
  let count=0;
  for(x=0;x<get_list.length;x++){
    let j=[];                          
     j.push(get_list[count].id);
    if(j.indexOf(+dataid)>  -1){
  let product_id,product_name,product_description,product_price;
  product_id = localStorage.getItem("id")? localStorage.getItem("id")+","+dataid  :  +dataid;

  localStorage.setItem('id',product_id);

  if(localStorage.getItem("id")!=null && localStorage.getItem("id")!="" && localStorage.getItem("id")!=undefined){

    product_id_cart = product_id.split(",").reverse();
    console.log(product_id_cart);
  }
    }count++;
  }
 

}

//----------------------Search Item-name code------------------------
// const charactersList = document.getElementById('charactersList');
// const searchBar = document.getElementById('searchBar');
// let data = [];

// searchBar.addEventListener('KeyUp', (e) => {
//   const searchString = e.target.value;
//   const filteredCharacters = data.filter( (character) =>{
//     return (character.title.toLowercase().includes(searchString) || character.description.toLowercase().includes(searchString));
//   });
//   displayCharacters(filteredCharacters);
// });

// const displayCharacters = (characters) => {
//   const htmlString = characters
//   .map(character) => {
//     return`
//     <li class="character">
//       <div>${item.title}</div>
//       <div><img src="${item.image}" height="100"/></div>
//       <div>${item.price}</div>
//       <div><button id="addCart" class="cart" data-id="${item.id}" data-title="${item.title}" data-image="${item.image}" data-description="${item.description}" data-category="${item.category}" data-price="${item.price}">Add to cart</button></div>
//     </li>
    
//     `;
//   }) .join('');
//   charactersList.innerHTML = htmlString;
// };