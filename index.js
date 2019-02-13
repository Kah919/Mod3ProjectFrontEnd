document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");

  function login() {
    const landing = document.querySelector(".landing");
    landing.addEventListener("click", event => {
      event.preventDefault();
      if(event.target.classList.contains("btn")) {
        setTimeout(()=> {
          flip();
          setTimeout(() => {
            loggedIn();
          },1500) // change to 2000 later
        },500) // change to 500 later
      }
    })
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
        <div class="craving">Cravings <span class="clickMe"><- Click Me!</span></div>
        <div class="foods">Foods</div>
      </div>
    `
    addCraving()
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

  login()
})
