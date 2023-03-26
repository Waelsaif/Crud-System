let Name = document.getElementById('Name')
let dose = document.getElementById('Dose')
let route = document.getElementById('Route')
let unit = document.getElementById('Unit')
let price = document.getElementById('Price')
let total = document.getElementById('Total')
let notification = document.getElementById('notifcation')
let create = document.getElementById('Create')
let deleteAll = document.getElementById('DeleteAll')
let mode = document.getElementById('mode')
let container = document.getElementById('container')
let header = document.getElementsByClassName('header')[0]
let inputs = document.getElementsByTagName('input')
let edit = document.getElementById('edit')
let search = document.getElementById('Search')
let priceBeforeTax;
let up;
let temp;

count = 0

window.onload = function () {
  counter()
}
mode.onclick = function () {
  ++count
  if (count % 2 != 0) {
    document.body.style.backgroundColor = '#F7F1E5'
    header.style = 'color: #111'
    for (index = 0; index < inputs.length; ++index) {
      inputs[index].style.backgroundColor = 'white'
      inputs[index].style.color = '#222'
    }
  } else {
    document.body.style.backgroundColor = '#222'
    header.style.color = '#FFF'
    for (index = 0; index < inputs.length; ++index) {
      inputs[index].style.backgroundColor = '#111'
      inputs[index].style.color = 'white'
    }
  }
}

function getTotal () {
  if (price.value != '') {
    if (isNaN(price.value)) {
      notification.style = 'top:0; background-color: #DF2E38 '
      notification.innerHTML = 'PLEASE ENTER A CORRECT PRICE (NUMBERS ONLY)'
    } else {
      notification.style = 'top:-30'
      priceBeforeTax = price.value
      total.innerHTML = +price.value + price.value * 0.15 + ' SR'
    }
  } else {
    notification.style = 'top:-30'
    total.innerHTML = ''
  }
}
function checkUnit () {
  if (unit.value != '') {
    if (isNaN(unit.value) || unit.value < 1) {
      notification.style = 'top:0; background-color: #DF2E38 '
      notification.innerHTML = 'PLEASE ENTER A CORRECT NUMBER (1 OR ABOVE) '
      unit.value = 1
    } else {
      notification.style = 'top:-30'
    }
  } else {
    notification.style = 'top:-30'
  }
}

let products
if (localStorage.product != null) {
  products = JSON.parse(localStorage.getItem('product'))
} else {
  products = []
}

function counter () {
  if (products.length <= 0) {
    deleteAll.innerHTML = ' DELETE ALL'
  } else {
    deleteAll.innerHTML = ' DELETE ALL (' + products.length + ')'
  }
}
create.onclick = function () {
  let newProduct = {
    Name: Name.value,
    dose: dose.value,
    route: route.value,
    unit: unit.value,
    price: total.innerHTML,
    priceBeforeTax: price.value
  }
  if (up == true) {
    products[temp] = newProduct
    localStorage.setItem('product', JSON.stringify(products))
    notification.style = 'top:0; background-color: #FFD966; color: #222'
    notification.innerHTML = 'Product updated successfully'
    up = false
    create.style.backgroundColor = '#28783f'
    create.style.color = '#fff'
    create.innerHTML = 'CREATE'
  } else {
    products.push(newProduct)
    localStorage.setItem('product', JSON.stringify(products))
    notification.style = 'top:0; background-color: #28783f'
    notification.innerHTML = 'Product added successfully'
  }

  clear()
  showData()
  counter()
}
create.onblur = function () {
  notification.style = 'top:-30; background-color: #28783f'
}

function clear () {
  Name.value = ''
  dose.value = ''
  price.value = ''
  unit.value = ''
  route.value = ''
  total.innerHTML = ''
}

function showData () {
  let table = ''
  for (let i = 0; i < products.length; i++) {
    table += `
		<tr>
						<td>${i + 1}</td>
						<td>${products[i].Name}</td>
						<td>${products[i].dose}</td>
						<td>${products[i].route}</td>
						<td>${products[i].unit}</td>
						<td>${products[i].price}</td>
						<td><div id="edit" onclick = "update(${i})"><i class="fa-solid fa-pen-to-square" style="color: #1c4e03;"></i></div></td>				
						<td><div id="delete" onclick = "Delete(${i})" ><i class="fa-solid fa-trash" style="color: #df2e38;"></i></div></td>
		</tr>
		`
  }
  document.getElementById('tbody').innerHTML = table
  for (let i = 0; i < products.length; i++) {}
}
showData()

function Delete (i) {
  let sum = products[i].unit - 1
  products[i].unit = sum
  if (sum == 0) {
    products.splice(i, 1)
    localStorage.product = JSON.stringify(products)
  } else {
    localStorage.product = JSON.stringify(products)
  }
  console.log(sum)

  showData()
  counter()
}

deleteAll.onclick = function () {
  localStorage.clear()
  products.splice(0)
  showData()
  counter()
  clear()
}
clear()

function update (i) {
  Name.value = products[i].Name
  dose.value = products[i].dose
  unit.value = products[i].unit
  price.value = products[i].priceBeforeTax
  route.value = products[i].route
  getTotal()
  up = true
  temp = i
  create.style.backgroundColor = '#FFD966'
  create.style.color = '#111'
  create.innerHTML = 'UPDATE'
  scroll({
    top: 0,
    behavior: 'smooth'
  })
}

function Search (val) {
  let table = ''
  for (let i = 0; i < products.length; i++) {
    if (products[i].Name.includes(val)) {
      table += `
		<tr>
						<td>${i + 1}</td>
						<td>${products[i].Name}</td>
						<td>${products[i].dose}</td>
						<td>${products[i].route}</td>
						<td>${products[i].unit}</td>
						<td>${products[i].price}</td>
						<td><div id="edit" onclick = "update(${i})"><i class="fa-solid fa-pen-to-square" style="color: #1c4e03;"></i></div></td>				
						<td><div id="delete" onclick = "Delete(${i})" ><i class="fa-solid fa-trash" style="color: #df2e38;"></i></div></td>
		</tr>
		`
    }

    document.getElementById('tbody').innerHTML = table
  }
}
