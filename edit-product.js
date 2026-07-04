const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", () => {

    const productName =
        document.getElementById("productName").value;

    const description =
        document.getElementById("productDescription").value;

    const images =
        document.getElementById("productImages").files;

    console.log(productName);
    console.log(description);
    console.log(images);

});