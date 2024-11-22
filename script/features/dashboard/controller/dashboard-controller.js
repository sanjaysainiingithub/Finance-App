window.addEventListener('load',isAlreadyLogin);

function isAlreadyLogin(){
  if(!localStorage.user){
    location.href='login.html';
  }
}