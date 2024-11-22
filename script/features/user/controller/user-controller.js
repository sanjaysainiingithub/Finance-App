import User from "../model/user-model.js";
import { userLogin } from "../service/user-service.js";


function login(){
  if(localStorage){
    const email=document.querySelector('#userEmail').value;
    const password=document.querySelector('#userPassword').value;
    const name=document.querySelector('#userName').value;
    const user=new User(email,password,name);
    userLogin(user);
  }else{
    alert('Browser not up to date');
  }
}

document.querySelector('#go-btn').addEventListener('click',login);