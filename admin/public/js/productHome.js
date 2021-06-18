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
const db = firebase.firestore();


let id;
const tableProduct = document.querySelector('#product_id');
const addModalForm = document.querySelector('#form-add-product');
const editModalForm = document.querySelector('#myEditModal  #form-add-product');

// kết nối db
db.collection('product').get().then(querySnapshot => {
    querySnapshot.forEach(ad => {
        renderAdmin(ad);

    });
})


const renderAdmin = doc => {

    const output = `
    <tr data-id = '${doc.id}'>
        <th scope="row"><input type="checkbox" name="acs" id=""></th>
        <td scope="row">${doc.data().name}</td>
        <td scope="row">${doc.data().price}.000 <sup>đ</sup></td>
        <td><img src="../../../img/thoitrangnam/${doc.data().image}" alt="" width="50px"></td>
        <td><a  type="button" class="btn-edit btn btn-warning">Sửa</a></td>
        <td><a  type="button" class="btn-del btn btn-danger">Xóa</a></td>
    </tr>
    `;
    //add
    tableProduct.insertAdjacentHTML('beforeend', output); //insert ouput vao table Product

    //del
    const btnDel = document.querySelector(`[data-id = '${doc.id}'] .btn-del`); // get id button kem id
    btnDel.addEventListener('click', (e) => {
        e.preventDefault();
        db.collection('product').doc(`${doc.id}`).delete().then(() => {
            console.log('delete: !!!!! ' + doc.data().name);
        }).catch(err => {
            console.log('Error:' + err);
        }).then(() => {
            location.reload();
        })
    })

    // edit 
    const btnEdit = document.querySelector(`[data-id = '${doc.id}'] .btn-edit`);
    btnEdit.addEventListener('click', (e) => {
        // console.log('edit product' + doc.data().name);
        $("#myEditModal").modal('show');
        id = doc.id
        editModalForm.name.value = doc.data().name;
        editModalForm.price.value = doc.data().price;
        editModalForm.image.value = doc.data().image;

    })
}

//form add
addModalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var file = document.getElementById('image').files[0].name;
    db.collection('product').add({
        name: addModalForm.name.value,
        price: addModalForm.price.value,
        image: file,


    }).then(() => {
        location.reload();
    })

    addModalForm.name.value,
        addModalForm.price.value,
        addModalForm.image.value;
})

//form edit
editModalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var file = document.getElementById('imageUpload').files[0].name;
    db.collection('product').doc(id).update({
        name: editModalForm.name.value,
        price: editModalForm.price.value,
        image: file,

    }).then(() => {
        location.reload();
    })
    editModalForm.name.value,
        editModalForm.price.value,
        editModalForm.image.value

})