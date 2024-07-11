async function getProducts() {
  let data = await fetch("https://fakestoreapi.com/products");
  let res = await data.json();

  console.log(res);
  displayProducts(res);
}

getProducts();

function displayProducts(products) {
  let container = "";
  products.map((product) => {
    container = `
      <div class="col-md-4">
        <div class="item">
          <img src="${product.image}" class="w-100">
          <h5>${product.title.split(" ").slice(0, 3).join(" ")}</h5>
          <p>${product.price} EGP</p>
          <div class="icons">
            <i class="fa-solid fa-heart text-danger"></i>
            <i class="fa-solid fa-cart-shopping text-warning" onclick="addToCart(${
              product.id
            })"></i>
          </div>
        </div>
      </div>`;

    document.getElementById("containerProducts").innerHTML += container;
  });
}

// ----------------------------------------------------------------------------

var signinemail = document.getElementById("signInEmail");
var signinpassword = document.getElementById("signInPassword");
var signupname = document.getElementById("signUpName");
var signupemail = document.getElementById("signUpEmail");
var signuppassword = document.getElementById("signUpPassword");

//Email should have at least a char or digit and end with @gmail.com
var exmailRegex =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//Password should have capital and small chars, digits and sympols
var passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

// Chech if the user has an account or not
var signUpArray = [];
if (localStorage.getItem("usersInfo") != null) {
  signUpArray = JSON.parse(localStorage["usersInfo"]);
}

//check if any input is empty or not
function isSignUpEmpty() {
  if (
    signupemail.value == "" ||
    signuppassword.value == "" ||
    signupname.value == ""
  ) {
    return false;
  }
  return true;
}

function isEmailExist(emailToCheck) {
  for (var i = 0; i < signUpArray.length; i++) {
    if (signUpArray[i].email.toLowerCase() == emailToCheck.toLowerCase()) {
      document.querySelector(".exist").classList.replace("d-none", "d-block");
      return true;
    }
  }
  return false;
}

function signUp() {
  if (isSignUpEmpty() == false) {
    document.querySelector(".wrong").classList.replace("d-none", "d-block");
  } else {
    if (
      passwordRegex.test(signuppassword.value) == false ||
      exmailRegex.test(signupemail.value) == false
    ) {
      if (passwordRegex.test(signuppassword.value) == false) {
        document
          .querySelector(".validatePass")
          .classList.replace("d-none", "d-block");
      }
      if (exmailRegex.test(signupemail.value) == false) {
        document
          .querySelector(".validateEmail")
          .classList.replace("d-none", "d-block");
      }
    } else {
      var singUpData = {
        name: signupname.value,
        email: signupemail.value,
        password: signuppassword.value,
      };
      if (isEmailExist(singUpData.email)) {
        signupname.value = "";
        signupemail.value = "";
        signuppassword.value = "";
      } else {
        signUpArray.push(singUpData);
        localStorage.setItem("usersInfo", JSON.stringify(signUpArray));
        document
          .querySelector(".passed")
          .classList.replace("d-none", "d-block");
        localStorage.setItem("userName", singUpData.name);
        window.location.href = "login.html";
      }
    }
  }
  if (isEmailExist(singUpData.email)) {
    signupname.value = "";
    signupemail.value = "";
    signuppassword.value = "";
  } else {
    signUpArray.push(singUpData);
    localStorage.setItem("usersInfo", JSON.stringify(signUpArray));
    document.querySelector(".passed").classList.replace("d-none", "d-block");
    localStorage.setItem("userName", singUpData.name);
    window.location.href = "index.html";
    updateButtons(); // تحديث الأزرار
  }
}

function isLoginEmpty() {
  if (signinemail.value == "" || signinpassword.value == "") {
    return false;
  }
  return true;
}

function logIn() {
  if (isLoginEmpty() == false) {
    document.querySelector(".wrong").classList.replace("d-none", "d-block");
  } else {
    var password = signinpassword.value;
    var email = signinemail.value;
    for (var i = 0; i < signUpArray.length; i++) {
      if (
        password.toLowerCase() == signUpArray[i].password.toLowerCase() &&
        email.toLowerCase() == signUpArray[i].email.toLowerCase()
      ) {
        localStorage.setItem("userName", signUpArray[i].name);
        window.location.href = "index.html";
        return;
      }
    }
    document
      .querySelector(".wrongLogin")
      .classList.replace("d-none", "d-block");
  }
  if (
    password.toLowerCase() == signUpArray[i].password.toLowerCase() &&
    email.toLowerCase() == signUpArray[i].email.toLowerCase()
  ) {
    localStorage.setItem("userName", signUpArray[i].name);
    window.location.href = "index.html";
    updateButtons(); // تحديث الأزرار
    return;
  }
}

// if (document.getElementById("logo") != null) {
//   document.getElementById("welcome").innerHTML =
//     "Welcome " + localStorage.getItem("userName");
// }

// function logout() {
//   window.location.href = "index.html";
// }

document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  function updateButtons() {
    const userName = localStorage.getItem("userName");

    if (userName) {
      if (loginBtn) loginBtn.classList.add("d-none");
      if (registerBtn) registerBtn.classList.add("d-none");
      if (logoutBtn) logoutBtn.classList.remove("d-none");
    } else {
      if (loginBtn) loginBtn.classList.remove("d-none");
      if (registerBtn) registerBtn.classList.remove("d-none");
      if (logoutBtn) logoutBtn.classList.add("d-none");
    }
  }

  updateButtons();
});
document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("userName");
  window.location.href = "login.html";
});
