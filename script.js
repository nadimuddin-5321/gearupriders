const images = {
    phone: [
        "images/phone1.png",
        "images/phone2.png",
        "images/phone3.png",
        "images/phone4.png",
        "images/phone5.png"
    ],

    ilight: [
        "images/ilight1.png",
        "images/ilight2.png",
        "images/ilight3.png",
        "images/ilight4.png",
        "images/ilight5.png"
    ],

    silencer: [
        "images/silencers1.png",
        "images/silencers2.png",
        "images/silencers3.png",
        "images/silencers4.png",
        "images/silencers5.png",
        "images/silencers6.png",
        "images/silencers7.png"
    ],

    alloy: [
        "images/alloy-wheels1.png"
    ],

    engine: [
        "images/engine-parts1.png",
        "images/engine-parts2.png"
    ],

    spare: [
        "images/spare-parts1.png",
        "images/spare-parts2.png"
    ]
};

const currentIndex = {

    phone:0,
    ilight:0,
    silencer:0,
    alloy:0,
    engine:0,
    spare:0

};

function changeSlide(product, direction){

    console.log(product);

    currentIndex[product] += direction;

    if(currentIndex[product] < 0){
        currentIndex[product] = images[product].length - 1;
    }

    if(currentIndex[product] >= images[product].length){
        currentIndex[product] = 0;
    }

    document.getElementById(product).src =
    images[product][currentIndex[product]];

}