var firebaseConfig = {
    apiKey: "AIzaSyAKifMVANX9TDybiOutmdMuWWSbqxMyiuY",
    authDomain: "es6asm.firebaseapp.com",
    databaseURL: "https://es6asm-default-rtdb.firebaseio.com",
    projectId: "es6asm",
    storageBucket: "es6asm.appspot.com",
    messagingSenderId: "707406372659",
    appId: "1:707406372659:web:c645e219f5ec632f5e6846"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var products = [{
        id: 1,
        img: 'img/thoitrangnam/12.webp',
        name: 'Áo thun freesize nam cá tính',
        price: 99,
        cart: false,
        quantity: 1,
        total: 0
    },
    {
        id: 2,
        img: 'img/thoitrangnu/2.webp',
        name: 'Áo thun freesize nữ cá tính',
        price: 99,
        cart: false,
        quantity: 1,
        total: 0
    },
    {
        id: 3,
        img: 'img/watch/1.webp',
        name: 'Đồng hồ nam thời trang',
        price: 300,
        cart: false,
        quantity: 1,
        total: 0
    }
]

function buy() {
    var productsFirebase = [];
    for (let index = 0; index < products.length; index++) {
        if (products[index].cart) {
            var product = {
                name: products[index].name,
                price: products[index].price,
                quantity: products[index].quantity,
                total: products[index].total,
            }
            productsFirebase.push(product); // DAY DATA VAO FIREBASE
        }
    }
    firebase.database().ref('cart').push({ // create table cart 
        total: total(),
        products: productsFirebase
    })
    Swal.fire({
        type: 'success',
        title: 'Thành Công',
        icon: 'success',
        text: 'Đã đặt hàng'
    });
    clean();
}


// all many
function total() {
    let total = 0;
    for (let index = 0; index < products.length; index++) {
        if (products[index].cart) {
            total += products[index].total;
        }
    }
    return total
}

var con = [];
var con2 = [];


function add(id) {
    for (let index = 0; index < products.length; index++) {
        if (products[index].id != id || products[index].cart == true) {

        } else {
            products[index].cart = true;
            con2.push(products[index].id);

            document.getElementById('tableProducts').innerHTML += `
            <tr>
            <th scope="row">${con+1}</th>
            <td><img style="width: 2rem;margin-left: 10px;" src="${products[index].img}"></td>
            <td>${products[index].name}</td>
            <td><button class="btn btn-primary reduce" onclick="reduceAmount(${products[index].id})">-</button>
            <input  class="number" id="${products[index].id}" value="${products[index].quantity}" disabled>
            <button class="btn btn-primary add" onclick="addAmount(${products[index].id})">+</button>
            </td>
            <td>${products[index].price*products[index].quantity}.000 <sup>đ</sup> </td>
            <td><button class="deletebtn" onclick="remove(${products[index].id})">X</button></td>
            </tr>    `

            con++;
            products[index].total = products[index].price * products[index].quantity
        }   
    }
    document.getElementById('total').innerHTML = `
     <tr>
     <th scope="row"></th>
     <td></td>
     <td></td>
     <td>
         <h4> Total: </h4>
     </td>
     <td>
      ${total()} .000<sup>đ</sup>
     </td>
     <td><button onclick="buy()" class="btn btn-success">Mua ngay</button></td>
     </tr>
    `
}

function clean() {
    for (let index = 0; index < products.length; index++) {
        products[index].cart = false;
        products[index].quantity = 1;
        products[index].total = 0;
        con2 = [];
        updateCart();
    }
}

function remove(id) {
    for (let index = 0; index < products.length; index++) {
        if (products[index].id == id) {

            products[index].cart = false;
            products[index].total = 0;
            products[index].quantity = 1;
            total();
            for (let index2 = 0; index2 < con2.length; index2++) {
                if (products[index].id == con2[index2]) {
                    con2.splice(index2, 1);
                } else {

                }
            }
            updateCart();
        } else {
            updateCart();
        }

    }
}

function updateCart() {
    con = 0;
    document.getElementById('tableProducts').innerHTML = '';
    for (let index = 0; index < con2.length; index++) {
        var position = con2[index];
        for (let index3 = 0; index3 < products.length; index3++) {
            if (position == products[index3].id) {
                document.getElementById('tableProducts').innerHTML += `
                <tr>
                <th scope="row">${con+1}</th>
                <td><img style="width: 2rem;margin-left: 10px;" src="${products[index3].img}"></td>
                <td>${products[index3].name}</td>
                <td><button class="btn btn-primary reduce" onclick="reduceAmount(${products[index3].id})">-</button>
                <input  class="number" id="${products[index3].id}" value="${products[index3].quantity}" disabled>
                <button class="btn btn-primary add" onclick="addAmount(${products[index3].id})">+</button>
                </td>
                <td>${products[index3].price*products[index3].quantity}.000 <sup>đ</sup> </td>
                <td><button class="deletebtn" onclick="remove(${products[index3].id})">X</button></td>
                </tr> `
                    // console.log(`${products[index3].img}`);
                products[index3].total = products[index3].price * products[index3].quantity
            } else {}
        }
        con = con + 1;
    }
    if (total() == 0) {
        document.getElementById('total').innerHTML = '';
    } else {
        document.getElementById('total').innerHTML = `
        <tr>
        <th scope="row"></th>
        <td></td>
        <td></td>
        <td>
            <h4> Total: </h4>
        </td>
        <td>
         ${total()} .000<sup>đ</sup>
        </td>
        <td><button onclick="buy()" class="btn btn-success">Mua ngay</button></td>
        </tr>
            `
    }
}

function reduceAmount(id) {
    for (let index = 0; index < products.length; index++) {
        if (products[index].id == id) {
            if (products[index].quantity > 1) {
                products[index].quantity = products[index].quantity - 1
                updateCart();
            } else {}
        } else {}
    }
}

function addAmount(id) {
    for (let index = 0; index < products.length; index++) {
        if (products[index].id == id) {
            if (products[index].quantity > 0) {
                products[index].quantity = products[index].quantity + 1
                updateCart();
            } else {}
        } else {}
    }
}

(() => {
    for (let index = 0; index < products.length; index++) {
        document.getElementById('row1').innerHTML += `
        <div id="row1" class="noidung mrr">
        <div class="rtimg"><img src="${products[index].img}" alt=""></div>
        <a href="product_detail.html"><strong>${products[index].name}</strong> </a>
        <nav>Hồ Chí Minh</nav>
        <hr>
        <ins>Giá : ${products[index].price} .000<span>110.000</span><br><strong>Đánh giá : <i style="color: #ff9900;" class="fas fa-star"></i><i style="color: #ff9900;" class="fas fa-star"></i><i style="color: #ff9900;" class="fas fa-star"></i><i style="color: #ff9900;" class="fas fa-star"></i><i style="color: #ff9900;" class="fas fa-star"></i></strong></ins>
        <div id="cart" class="iconbook">
        <button class ="btn btn-primary" onclick="add('${products[index].id}')"></button>
           <i class='fas fa-shopping-cart' style='font-size:15px'></i></div>
        </div>
        `
        console.log(`${products[index].img}`);

    }


})();