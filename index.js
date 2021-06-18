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
//tham chieu toi root vaf node user
const db = firebase.database().ref();
const _category = db.child('category');
const _prd_new_in_week = db.child('prd_new_in_week');


//show category
const _cate_list = document.querySelector("#_cate_List");
_category.on("child_added", snap => {
    let _cate = snap.val();

    let content = `
    <div class="box_cgr ">
        <img src="${_cate.imgUrl}" alt="" >
        <li>${_cate.name}</li>
    <div class="countsp">
        ${_cate.sLuong}+ sản phẩm
    </div>  </div>`
    let frag = document.createRange().createContextualFragment(content)
    _cate_list.append(frag);
});

//show san pham new in week
const _prd_list = document.querySelector("#_prd_niw");
_prd_new_in_week.on("child_added", snap => {
    let _prd = snap.val();

    let content = `
    <div class="content ${_prd.mr}">
    <div class="rtimg"><img src="${_prd.imgUrl}" alt=""></div>
    <a href="#"><strong>${_prd.title}</strong> </a>
    <nav>${_prd.place}</nav>
    <hr>
    <ins>Giá : ${_prd.price}.000<strong>${_prd.price_old}.000</strong></ins>
    <div class="iconbook">
        <a href="product_detail.html"><i class='fas fa-shopping-cart' style='font-size:15px'></i></a></div>
    </div>`
    let frag = document.createRange().createContextualFragment(content)
    _prd_list.append(frag);
});