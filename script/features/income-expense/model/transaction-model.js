class TransactionModel{
  constructor(id=0,desc='',amount=0.0,category='',date='2000/01/01',mode='',operation=''){
    this.id=id;
    this.desc=desc;
    this.amount=amount;
    this.category=category;
    this.date=date;
    this.mode=mode;
    this.operation=operation;
    this.ismarked=false;
    this.isnewlyAdded=false;
    this.important=false;
  }
}
export default TransactionModel;