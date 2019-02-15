document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  let userID;
  function login() {
    setTimeout(()=> {
      flip();
      setTimeout(() => {
        loggedIn();
      },2000) // change to 2000 later
    },500) // change to 500 later
  }

  function flip() {
    body.innerHTML =
    `<div class="flip-container welcome" ontouchstart="this.classList.toggle('hover');">
			<div class="flipper">
				<div class="front">
					<h1> WELCOME </h1>
				</div>
				<div class="back">
					<h1 class=""><span class="go">go</span><span class="feed">Feed</span><span class="me">Me</span></h1>
				</div>
			</div>
		</div>
    `
  }

  function loggedIn() {
    body.innerHTML = `
    <div class="foodBar">
      <form>
        <h1 class="add_craving_header">Add A Craving! 🍔 </h1>
        <input type="text" name="name" value="" placeholder="Enter a food's name..." class="input-text login form-control">

        <br>
        <input type="text" name="image" value="" placeholder="Enter a food's image URL..." class="input-text login form-control">
        <br>
        <input type="submit" name="submit" value="New Craving" class="submit btn btn-primary">
      </form>

      </div>
      <div class="front_container">
        <div class="craving">Cravings
        <span class="clickMe"><- Click Me!</span>
        <div class="inner-craving"></div>
        </div>
        <div class="foods">Foods
          <div class="grid-container"></div>
        </div>
      </div>
    `
    addCraving()
    slapFoodToDOM()
  }

  function addCraving() {
    const craving = document.querySelector(".craving");
    const foodBar = document.querySelector(".foodBar")
    let reveal = false;
    body.addEventListener('click', event => {
      if(event.target.classList.contains("craving")) {
        if(reveal === false) {
          reveal = true;
          foodBar.style.display = "block";
        } else {
          reveal = false;
          foodBar.style.display = "none";
        }
      }
    })
  }

  function slapFoodToDOM() {
    const foodsDIV = document.querySelector(".grid-container");
    fetch("http://localhost:3000/api/v1/products")
    .then(res => res.json())
    .then(foods => {
      foods.forEach(food => {
        foodsDIV.innerHTML +=
        `<div class="foodCard" data-id="${food.id}">
          <li class="foodName">${food.name}</li>
          <img class="foodImg" src= ${food.images}>
          <br>
          <button class="addFood btn btn-primary">Add</button>
         </div>
        `
      })
      addEventListenerToFoodCard()
    })
  }

  function addEventListenerToFoodCard(event){
    const foodCard = document.querySelector(".grid-container")
    const craving = document.querySelector(".inner-craving")
    foodCard.addEventListener("click", event =>{
      event.preventDefault()
      // console.log(event.target.parentNode)
      if (event.target.classList.contains("addFood")){
        const name = event.target.parentNode.querySelector(".foodName").innerText;
        const image = event.target.parentNode.querySelector(".foodImg").src;
        const id = event.target.parentNode.dataset.id;
        fetch("http://localhost:3000/api/v1/wishlists", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            product_id: id,
            user_id: userID
          })
        })
        // .then(res => res.json())
        .then(
        craving.innerHTML += `
        <div class="foodCard appendToFrontContainer" data-id="${id}">
          <li class="foodName">${name}</li>
          <img src= ${image}>
          <br>
          <button class="addFood btn btn-primary">Add</button>
         </div>
        `)
      }
    })
  }

  function loginSignup() {
    const button = document.querySelector(".button");
    button.addEventListener("click", event => {
      event.preventDefault()
      const userValue = document.querySelector(".login").value;
      const signup = document.querySelector(".signup").value;
      if(userValue.length > 0) {
        checkUser()
      }else if(signup.length > 0) {
        createUser()
      }
    })
  }
  loginSignup()

  function createUser() {
    const signup = document.querySelector(".signup");
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: signup.value
      })
    })
    .then(login())
  }

  function checkUser(){
    const userValue = document.querySelector(".login").value;
    fetch("http://localhost:3000/api/v1/users")
    .then(res => res.json())
    .then(users => {
      let foundUser = users.find(user => user.name === userValue)
      userID = foundUser.id
      if(foundUser) {
        login()
      } else {
        alert("User Doesn't Exist. Please Sign Up Or Log In Again")
      }
    })
  }
})
