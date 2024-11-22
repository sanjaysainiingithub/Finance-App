import TransactionModel from "../model/transaction-model.js"

export const transactionOperation={
  transactions:[],
  add(transObj){
    const transaction=new TransactionModel();
    for(let key in transObj){
      transaction[key]=transObj[key];
    }
    this.transactions.push(transaction);
    return transaction;
  },

  edit(id){
    return this.search(id);
  },

  upload(){
    this.transactions.remove;
    const obj=JSON.parse(localStorage.transactions);
    const ArrObj=obj.data;
    ArrObj.map(transaction=>{
      let trans=new TransactionModel();
      for(let key in transaction){
        if(key=='amount'){
          trans[key]=parseInt(transaction[key]);
        }else
          trans[key]=transaction[key];
      }
      this.transactions.push(trans);
    })
    return this.transactions;
  },

  saveTrans(){
    if(localStorage){
      const obj={'data':this.transactions};
      const json=JSON.stringify(obj);
      localStorage.transactions=json;
    }
  },

  search(transaID){
    return this.transactions.find(transaction=>transaction.id==transaID);
  },

  toggleMarkDelete(transID){
    const transaction=this.search(transID);
    transaction.ismarked=!transaction.ismarked;
  },

  remove(){
    return this.transactions= this.transactions.filter(transaction=>transaction.ismarked==false);
  },

  enabled(){
    return this.marked();
  },


  countTransaction(){
    return this.transactions.length;
  },

  marked(){
    return this.transactions.filter(transaction=>transaction.ismarked==true).length;
  },

  unmarked(){
    return this.transactions.length-this.marked();
  },

  id(){
    if(this.transactions.length==0){
      return 1;
    }else{
      const res=this.transactions[this.transactions.length-1].id;
      return res+1;
    }
  }
}