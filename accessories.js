import { db } from "./firebase-config.js";

import {
    collection,
    getDocs
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const productsContainer =
document.getElementById("productsContainer");

loadProducts();

async function loadProducts(){

    productsContainer.innerHTML="<h2>Loading...</h2>";

    const snapshot=
    await getDocs(
        collection(db,"products")
    );

    productsContainer.innerHTML="";

    snapshot.forEach((doc)=>{

        const product=doc.data();

    let imagesHTML = "";

product.images.forEach((image,index)=>{

    imagesHTML += `

    <img
        src="${image}"
        class="product-image"
        style="display:${index===0 ? "block" : "none"}; cursor:zoom-in;">

    `;

});

        const card=document.createElement("div");

        card.className="gallery-card";

        card.innerHTML=`

       <div class="slider">

<button class="prev">❮</button>

${imagesHTML}

<button class="next">❯</button>

</div>

        <h3>

        ${product.name}

        </h3>

        <p>

        ${product.description}

        </p>

<h4>

₹${product.offerPrice || product.price}

${product.offerPrice && product.offerPrice != product.price
? `<br><del>₹${product.price}</del>`
: ""}

</h4>

        <strong>

        ${product.category}

        </strong>

        `;

        productsContainer.appendChild(card);

    });

}

document.addEventListener("click",(e)=>{

    if(
        !e.target.classList.contains("prev") &&
        !e.target.classList.contains("next")
    ){
        return;
    }

    const slider = e.target.parentElement;

    const images = slider.querySelectorAll(".product-image");

    let current = 0;

    images.forEach((img,index)=>{

        if(img.style.display==="block"){

            current=index;

        }

    });

    /* ========= FULL SCREEN IMAGE ========= */

const modal=document.createElement("div");

modal.className="imageModal";

modal.innerHTML="<img>";

document.body.appendChild(modal);

const modalImg=modal.querySelector("img");

document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("product-image")){

        modal.style.display="flex";

        modalImg.src=e.target.src;

    }

});

modal.addEventListener("click",()=>{

    modal.style.display="none";

});

    images[current].style.display="none";

    if(e.target.classList.contains("next")){

        current++;

        if(current>=images.length){

            current=0;

        }

    }else{

        current--;

        if(current<0){

            current=images.length-1;

        }

    }

    images[current].style.display="block";

});