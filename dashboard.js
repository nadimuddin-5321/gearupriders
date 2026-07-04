import {
    db,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc
} from "./firebase-config.js";

import { uploadImages } from "./cloudinary.js";

/* =========================
   DOM ELEMENTS
========================= */

const saveBtn = document.getElementById("saveBtn");

const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const offerPrice = document.getElementById("offerPrice");
const productCategory = document.getElementById("productCategory");
const productImages = document.getElementById("productImages");

const productsContainer = document.getElementById("productsContainer");

const totalProducts = document.getElementById("totalProducts");
const totalCategories = document.getElementById("totalCategories");
const totalImages = document.getElementById("totalImages");

/* =========================
   STATE
========================= */

let editingProductId = null;
let oldImages = [];

/* =========================
   INIT
========================= */

saveBtn.addEventListener("click", saveProduct);
loadProducts();

/* =========================
   SAVE / UPDATE PRODUCT
========================= */

async function saveProduct() {
    if (
        productName.value.trim() === "" ||
        productDescription.value.trim() === "" ||
        productPrice.value.trim() === "" ||
        productCategory.value.trim() === ""
    ) {
        alert("Please fill all details");
        return;
    }

    saveBtn.disabled = true;
    saveBtn.innerHTML = editingProductId ? "Updating..." : "Uploading...";

    try {
        let imageUrls = [...oldImages];

        if (productImages.files.length > 0) {
            imageUrls = await uploadImages(productImages.files);
        }

        const product = {
            name: productName.value,
            description: productDescription.value,
            price: Number(productPrice.value),
            offerPrice: offerPrice.value === ""
                ? Number(productPrice.value)
                : Number(offerPrice.value),
            
            category: productCategory.value,
            images: imageUrls,
            createdAt: new Date()
        };

        if (editingProductId) {
            await updateDoc(doc(db, "products", editingProductId), product);
            alert("Product updated successfully");
        } else {
            await addDoc(collection(db, "products"), product);
            alert("Product added successfully");
        }

        clearForm();
        loadProducts();

    } catch (error) {
        console.log(error);
        alert(error.message);
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = "Save Product";
    }
}

/* =========================
   LOAD PRODUCTS
========================= */

async function loadProducts() {
    productsContainer.innerHTML = "Loading...";

    const snapshot = await getDocs(collection(db, "products"));

    productsContainer.innerHTML = "";

    let productCount = 0;
    let imageCount = 0;
    let categoryArray = [];

    snapshot.forEach((docSnap) => {
        const product = docSnap.data();
        productCount++;

        imageCount += product.images ? product.images.length : 0;

        if (!categoryArray.includes(product.category)) {
            categoryArray.push(product.category);
        }

        let imagesHTML = "";

        if (product.images) {
            product.images.forEach((img) => {
                imagesHTML += `
                    <img src="${img}" width="90" height="90"
                    style="object-fit:cover;border-radius:10px;margin:5px;">
                `;
            });
        }

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.description}</p>

         <h3>₹${product.offerPrice}</h3>
<del>₹${product.price}</del>

            <strong>${product.category}</strong>

            <br><br>

            ${imagesHTML}

            <div style="display:flex;gap:10px;margin-top:15px;">
                <button class="editBtn" data-id="${docSnap.id}">Edit</button>
                <button class="deleteBtn" data-id="${docSnap.id}">Delete</button>
            </div>
        `;

        productsContainer.appendChild(card);
    });

    totalProducts.innerHTML = productCount;
    totalCategories.innerHTML = categoryArray.length;
    totalImages.innerHTML = imageCount;

    attachEvents();
}

/* =========================
   EDIT / DELETE EVENTS
========================= */

function attachEvents() {

    document.querySelectorAll(".editBtn").forEach((button) => {
        button.onclick = async () => {
            const id = button.dataset.id;

            const snapshot = await getDocs(collection(db, "products"));

            snapshot.forEach((docSnap) => {
                if (docSnap.id === id) {
                    const product = docSnap.data();

                    editingProductId = id;
                    oldImages = product.images || [];

                    productName.value = product.name || "";
                    productDescription.value = product.description || "";
                    productPrice.value = product.price || "";
                    offerPrice.value = product.offerPrice || "";
                    productCategory.value = product.category || "";

                    saveBtn.innerHTML = "Update Product";

                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            });
        };
    });

    document.querySelectorAll(".deleteBtn").forEach((button) => {
        button.onclick = async () => {
            const id = button.dataset.id;

            if (!confirm("Delete this product?")) return;

            try {
                await deleteDoc(doc(db, "products", id));
                loadProducts();
            } catch (error) {
                console.log(error);
                alert("Delete failed");
            }
        };
    });
}

/* =========================
   CLEAR FORM
========================= */

function clearForm() {
    productName.value = "";
    productDescription.value = "";
    productPrice.value = "";
    offerPrice.value = "";
    productCategory.value = "";
    productImages.value = "";

    oldImages = [];
    editingProductId = null;

    saveBtn.innerHTML = "Save Product";
}

/* =========================
   LOGOUT
========================= */

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
    if (confirm("Logout?")) {
        window.location.href = "index.html";
    }
});