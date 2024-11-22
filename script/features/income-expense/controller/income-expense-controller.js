import category from "../../category/category.js";
import { transactionOperation } from "../service/income-expense-service.js";

function init(){
  uploadData();
  totalTransaction();
  markedTransaction();
  unmarkedTransaction();
  bindEvents();
}

function bindEvents(){
  document.querySelector('#income').addEventListener('change',loadCategory);
  document.querySelector('#expense').addEventListener('change',loadCategory);
  document.querySelector('#add').addEventListener('click',addTransaction);
  document.querySelector('#delete').disabled=true;
  document.querySelector('#delete').addEventListener('click',deleteForever);
  document.querySelector('#save').addEventListener('click',saveTransaction);
  document.querySelector('#update').addEventListener('click',updateTransaction);
}

function uploadData(){
  if(localStorage.transactions){
    const transactions=transactionOperation.upload();
    console.log(transactions);
    printAllTransaction(transactions);
    totalTransaction();
    markedTransaction();
    unmarkedTransaction();
  }else{
    alert('Nothing to print');
  }
}

let editTransactionObject;
function editTransaction(){
  const fields=['desc','amount','date','mode'];
  editTransactionObject=transactionOperation.edit(this.getAttribute('transaction-id'));

  fields.forEach(field=>{
    document.querySelector(`#${field}`).value=editTransactionObject[field];
  })
  const button=['add','save'];
  button.forEach(btn=>{
    document.querySelector(`#${btn}`).disabled=true;
  })
}

function updateTransaction(){
  const fields=['desc','amount','date','mode'];
  fields.forEach(field=>{
    editTransactionObject[field]=document.querySelector(`#${field}`).value;
  })
  printAllTransaction(transactionOperation.transactions);
  clearFields();
  const button=['add','save'];
  button.forEach(btn=>{
    document.querySelector(`#${btn}`).disabled=false;
  })
}

function clearFields(){
  const fields=['category','desc','amount','date','mode'];
  fields.forEach(field=>{
    document.querySelector(`#${field}`).value='';
  })
}


function saveTransaction(){
  transactionOperation.saveTrans();
  alert('Save Data');
}

function deleteForever(){
  const transactions=transactionOperation.remove();
  printAllTransaction(transactions);
  totalTransaction();
  unmarkedTransaction();
  markedTransaction();
  deleteButtonEnabled();
}

function printAllTransaction(transactions){
  document.querySelector('tbody').innerHTML='';
  transactions.forEach(transaction=>printTransaction(transaction));
}

window.addEventListener('load',init)

function loadCategory(){
  let categories;
  if(document.querySelector('#income').checked){
    categories=category('income');
  }else{
    categories=category('expense');
  }
  const select=document.querySelector('#category');
  select.innerHTML='';

  categories.forEach(category=>{
    const optionTag=document.createElement('option');
    optionTag.innerText=category;
    select.appendChild(optionTag);
  })
}

function addTransaction(){
  const fields=['category','desc','amount','date','mode'];
  const transactionObject={};
  transactionObject.id=transactionOperation.id();

  fields.forEach(field=>{
    if(field=='amount'){
      transactionObject[field]=parseInt(document.querySelector(`#${field}`).value);
    }else{
      transactionObject[field]=document.querySelector(`#${field}`).value;
    }  
  })
  const transaction=transactionOperation.add(transactionObject);
  totalTransaction();
  unmarkedTransaction();

  printTransaction(transaction);
  clearFields();
}

function printTransaction(transaction){
  const tbody=document.querySelector('#tbody');
  const tr=tbody.insertRow();
  for(let key in transaction){
    if(key=='ismarked' || key=='important' || key=='isnewlyAdded'){
      continue;
    }
    const td=tr.insertCell();
    if(key=='amount'){
      td.innerText=transaction[key].toLocaleString('hi');
    }else if(key=='mode'){
      td.innerText=modes()[transaction[key]];
    }else if(key=='operation'){
      td.appendChild(createIcon('fa-solid fa-trash hand me-4',toggleMarkDelete,transaction.id));
      td.appendChild(createIcon('fa-solid fa-pen-to-square hand',editTransaction,transaction.id));
    }else
    td.innerText=transaction[key];
  }
}

function createIcon(className,fn,transactionID){
  const icon=document.createElement('i');
  icon.className=className;
  icon.setAttribute('transaction-id',transactionID);
  icon.addEventListener('click',fn);
  return icon;
}

function toggleMarkDelete(){
  const trashIcon=this.getAttribute('transaction-id');
  transactionOperation.toggleMarkDelete(trashIcon);
  this.parentNode.parentNode.classList.toggle('table-danger');
  deleteButtonEnabled();
  markedTransaction();
  unmarkedTransaction();
}

function deleteButtonEnabled(){
  document.querySelector('#delete').disabled= transactionOperation.enabled()==0;
}

const modes=()=>['','Cash','Credit','Debit','UPI']


function totalTransaction(){
  document.querySelector('#total-transaction').innerText=transactionOperation.countTransaction();
}

function markedTransaction(){
  document.querySelector('#marked').innerText=transactionOperation.marked();
}

function unmarkedTransaction(){
  document.querySelector('#unmarked').innerText=transactionOperation.unmarked();
}
