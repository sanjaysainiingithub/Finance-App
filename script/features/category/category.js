function category(type){
  const categories={
    "income":['Rent','Salary','Stock Market'],
    "expense":['Shopping','Travelling','Movies','Groceries']
  }
  return categories[type];
}
export default category