
let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
const auth_div = document.getElementById('auth_div')

const title_h2 = document.createElement("h2")
title_h2.innerHTML = 'Booking Calendar'
auth_div.appendChild(title_h2)
const login_btn = document.createElement("button")
login_btn.setAttribute("id", "login_btn")
login_btn.innerHTML = 'Login'
login_btn.setAttribute("onclick", "openModalLogin()")

const register_btn = document.createElement("button")
register_btn.setAttribute("id", "register_btn")
register_btn.innerHTML = 'Register'
register_btn.setAttribute("onclick", "openModalRegister()")

auth_div.appendChild(login_btn)
auth_div.appendChild(register_btn)

const modal = document.getElementById('id01');
const modal2 = document.getElementById('id02');

// When the user clicks the button, open the modal
const openModalLogin = () => modal.style.display="block"

const closeModalLogin = () => modal.style.display="none"

const openModalRegister = () => modal2.style.display="block"

// When the user clicks anywhere outside of the modal2, close it
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
  if (event.target == modal2) {
      modal2.style.display = "none";
  }
}

const closeModalRegister = () => {
  
  document.getElementById('id02').style.display="none"
}

const login = () => {

  let _user = document.getElementById("uname").value
  let _psw = document.getElementById("psw").value

  let searchUser = users.filter(users => users.pass == _psw);

  if (searchUser) {

    sessionStorage.setItem("username", _user);
    sessionStorage.setItem("password", _psw);

    alert("- You are logged in -")
    
  }
  else {
    alert("- Login Failed - Please enter correct username, password or register -")
  }
}

const logout = () => {

  if (confirm("Are you sure you want to log out ?") == true) {
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("password")
    location.reload()
  } else {
      text = "You canceled!";
  }
  
}

const register = () => {

  let _user = document.getElementById("reguname").value
  let _regpsw = document.getElementById("regpsw").value
  let _reregpsw = document.getElementById("reregpsw").value

  if (_regpsw == _reregpsw) {

    let dta = new Date()
    
      const lds = dta.toLocaleDateString().split('/')
      const lts = dta.toLocaleTimeString().split(' ')
      const ltsh = lts[0].replaceAll(':', '')

      let uid = lds[1] + ""+ lds[0] + "" + lds[2] +""+ ltsh
      let regDate = lds[1] + "-"+ lds[0] + "-" + lds[2]

    users.push({
      uid: uid,
      client: _user,
      pass: _regpsw,
      regDate: regDate
    });

    localStorage.setItem('users', JSON.stringify(users));

    alert("- You have successfully registered -")
    
  }
  else {
    alert("- Register Failed - Password should match")
  }
}
