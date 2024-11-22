export function userLogin(userData){
  if(localStorage){
    console.log(userData);
    localStorage.user=JSON.stringify(userData);
    alert('Successfully Register');
    location.href='index.html';
  }else{
    alert('Browser is not up to date');
  }
}
