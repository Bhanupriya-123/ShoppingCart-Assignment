
const productDataList = require('./index2');
require("babel-core/register");
require("babel-polyfill");

const productListEl = document.querySelector(".productList");
const detailsEl = document.querySelector(".details");

let product_list = [];
const save_ToCart = [];

//searchcharacters
const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let data = [];

searchBar.addEventListener('KeyUp', (e) => {
  const searchString = e.target.value;
  const filteredCharacters = data.filter( (character) =>{
    return (character.name.toLowercase().includes(searchString) || character.house.toLowercase().includes(searchString));
  });
  displayCharacters(filteredCharacters);
});

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

//-------------------------------------------------------------------------------------------------------------------------------

// let iconsForCat = document.querySelector('.iconsForCat').children;
// let main = document.querySelector('.apiList').children;

// for(let j=0; j<iconsForCat.length; j++){
//   indicator[j].onclick = function(){

//     for(let y=0; y<iconsForCat.length; y++){
//       iconsForCat[y].classList.remove('active');
//     }
//     this.classList.add('active');
//     const displayItems = this.getAttribute('data-filter');

//     for(let z=0; z<iconsForCat.length; z++){
//       main[z].style.transform = 'scale(0)';
//       setTimeout(()=>{
//         main[z].style.display = 'none';
//       }, 500);

//       if((main[z].getAttribute('data-category') == displayItems) || displayItems == 'all'){
//         main[z].style.transform = 'scale(1)';
//         setTimeout(()=>{
//         main[z].style.display = 'block';
//       }, 500);
//       }
//     }
//   }
// }


// fetch data from api




productDataList();
 const fetchData = productDataList();
 fetchData.then(ProductsData =>{


  ProductsData.forEach((element) => product_list.push(element));
  console.log(product_list);

  const trItems = product_list
    .map((item) => {
      return `
    
      <div class="apiList">
        <div>${item.title}</div>
        <div><img src="${item.image}" height="100"/></div>
        <div>${item.price}</div>
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

  
     document.getElementById("addToCart").addEventListener("click", function(){
          document.getElementsByClassName("productList")[0].style.display = "none";
          document.getElementsByClassName("details")[0].style.display = "block";

          const trItem = save_ToCart.map((item) => {
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
                <button id="homeBtn">Home</button>
              </td>
            </tbody>
          </table>
        `;
    document.getElementById("homeBtn").addEventListener('click',function(){
      document.getElementsByClassName("details")[0].style.display = "none";
      document.getElementsByClassName("productList")[0].style.display = "block";
      });
    });


 });
 
 const displayProducts = document.getElementsByClassName("productList")[0];
  displayProducts.addEventListener("click", myclick, false);
  function myclick(event) {
       if (event.target.className === "cart") {
        const buttons = document.querySelectorAll(".cart");
    
            buttons.forEach((btnel) => {
            btnel.addEventListener("click", (e) => {
            const dataid = e.target.getAttribute("data-id");
            const dataDescription = e.target.getAttribute("data-description");
            const dataTitle = e.target.getAttribute("data-title");
            const dataImage = e.target.getAttribute("data-image");
            const dataCategory = e.target.getAttribute("data-category"); 
            const dataPrice = e.target.getAttribute("data-price");
            
            let x;
            if(typeof(dataid)!==undefined){
              x = dataid - 1;
              console.log(x);
              save_ToCart.push(product_list[x]);
            }
           });
         });
       }
     }

  