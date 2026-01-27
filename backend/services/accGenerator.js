
const Account = require("../models/acc.js");




async function  CreateAccount(userId){
  function generateAccountNo(){
   return Math.floor(1000000000 + Math.random() * 9000000000);
}
  let AccountNo;
  let createdAccount = false;
  while(!createdAccount){
     try{
    AccountNo = generateAccountNo();

    await Account.create({
      userId : userId,
      accountNo : AccountNo,
      balance : 0,
    })

    createdAccount = true;
     return AccountNo;
  }catch(err){
   if (err.code !== 11000) throw err;
  }
  }
}

module.exports = {CreateAccount};
