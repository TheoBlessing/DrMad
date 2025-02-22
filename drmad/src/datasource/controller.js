import { items, shopusers, transactions } from './data'
import { v4 as uuidv4 } from 'uuid'
import { bankaccounts } from './data'
import bcrypt from 'bcryptjs'
import { ObjectId } from 'bson';


function shopLogin(data) {
  if ((!data.login) || (!data.password)) return { error: 1, status: 404, data: 'aucun login/pass fourni' }
  let user = shopusers.find(e => e.login === data.login)
  if (!user) return { error: 1, status: 404, data: 'login/pass incorrect' }

  const passwordMatches = bcrypt.compareSync(data.password, user.password); // `user.password` is the stored hashed password
  if (!passwordMatches) {
    return { error: 1, status: 404, data: 'login/pass incorrect' };
  }
  if (!user.session) {
    user.session = uuidv4()
  }
  let u = {
    _id: user._id,
    name: user.name,
    login: user.login,
    email: user.email,
    session: user.session
  }
  return { error: 0, status: 200, data: u }
}

function getAllViruses() {
  console.log("in controller : " + items)

  return { error: 0, data: items }
}

function getAccountAmount(number) {
  if (number == null)
    return
  if (number == "")
    return
  for (let i = 0; i < bankaccounts.length; i++) {
    if (bankaccounts[i]["number"] === number) {
      return { error: 0, status: 200, data: bankaccounts[i]["amount"] }
    }
  }
  return { error: 1, status: 404, data: 'nw' }
}

function getAccountId(number) {
  if (number == "")
    return
  for (let i = 0; i < bankaccounts.length; i++) {
    if (bankaccounts[i]["number"] === number) {
      return { error: 0, status: 200, data: bankaccounts[i]["_id"] }
    }
  }
  return { error: 1, status: 404, data: 'nw' }
}

function getAccountTransactions(number) {
  if (number == null) {
    return
  }
  if (number == "") {
    return
  }
  let id = getAccountId(number)
  if (id.error === 1) {
    return { error: 1, status: 404, data: 'nw' }
  }
  let AccountTransactions = [];
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i]["account"] === id["data"]) {
      AccountTransactions.push(transactions[i])
    }
  }
  console.log(id)
  console.log(AccountTransactions)
  return { error: 0, status: 200, data: AccountTransactions }
}

function updateBasketById(data) {
  let id = data.id
  let bakset = data.basket
  if (id == null || id == "") {
    return
  }
  if (id == "") {
    return
  }
  for (let i = 0; i < shopusers.length; i++) {
    if (shopusers[i]["_id"] === id) {
      shopusers[i]["basket"] = bakset
      return { error: 0, status: 200, data: shopusers[i]["basket"] }
    }
  }
  return { error: 1, status: 404, data: 'no users found' }
}

function getBasketById(id) {
  if (id == null) {
    return
  }
  if (id == "") {
    return
  }
  for (let i = 0; i < shopusers.length; i++) {
    if (shopusers[i]["_id"] === id) {
      if(shopusers[i]["basket"] == null){
        shopusers[i]["basket"] = []
      }
      return { error: 0, status: 200, data: shopusers[i]["basket"] }
    }
  }
  console.log("no users found")
  return { error: 1, status: 404, data: 'no users found' }
}

function addOrderByUserId(data) {
  let id = data.user_id
  let order = {"items": data.items}
  if(id == null || id == ""){
    console.log("id is null")
    return
  }
  let total = 0
  for(let i = 0; i < data.items.length; i++){
    let item = data.items[i]
    let reduction = 0
    for(let j = 0; j < item.item.promotion.length; j++){
      if(item.item.promotion[j].amount <= item.amount){
        reduction = item.item.promotion[j].discount
      } 
    }
    // On ajoute le prix de l'item au total en fonction de la réduction
    total += (item.item.price * item.amount) * (1 - reduction / 100)
  }
  console.log("total :" + total)
  order["date"] = new Date()
  order["total"] = total
  order["status"] = "waiting_payment"
  order["uuid"] = uuidv4()

  for (let i = 0; i < shopusers.length; i++) {
    if (shopusers[i]["_id"] === id) {
      shopusers[i]["orders"].push(order)
      return { error: 0, status: 200, data: order["uuid"] }
    }
  }
  return { error: 1, status: 404, data: 'no users found' }
}



function getOrdersByUserId(data){
  let user_id = data.user_id
  if(user_id == null || user_id == ""){
    return
  }
  for(let i = 0; i < shopusers.length; i++){
    if(shopusers[i]["_id"] === user_id){
      return { error: 0, status: 200, data: shopusers[i]["orders"] }
    }
  }
  return { error: 1, status: 404, data: 'no users found' }
  
}

function cancelOrderById(data){
  let user_id = data.user_id
  let order_id = data.order_id
  if(user_id == null || user_id == ""){
    return
  }
  if(order_id == null || order_id == ""){
    return
  }
  for(let i = 0; i < shopusers.length; i++){
    if(shopusers[i]["_id"] === user_id){
      for(let j = 0; j < shopusers[i]["orders"].length; j++){
        if(shopusers[i]["orders"][j]["uuid"] === order_id){
          shopusers[i]["orders"][j]["status"] = "cancelled"
          return { error: 0, status: 200, data: shopusers[i]["orders"][j] }
        }
      }
    }
  }
  console.log("no corresponding order found")
  return { error: 1, status: 404, data: 'no order found' }
}
function getAccount(data) {
  const account = bankaccounts.find(acc => acc.number === data);

  if (account) {
    console.log("Compte trouvé :", account.number);
    return { error: 0, status: 'success', data: account };
  }

  console.log("Numéro de compte invalide");
  return { error: 1, status: 'error', data: 'numéro de compte invalide' };
}

function getTransactions(data){
 const transaction = transactions.filter((transaction)=> transaction.account === data);
  if (transaction.length > 0) {
    return { error: 0, status: 'success', data: transaction };
  }
  return { error: 1, status: 'error', data: 'aucune transaction pour ce compte' };
}

function createWithdraw(data){
  const account = bankaccounts.find(acc => acc._id === data.idAccount);
  if (!account) {
    return { error: 1, status: 'error', data: 'id de compte invalide' };
  }

  const newTransaction = {
    _id: ObjectId().toString(),
    amount: -data.amount,
    account: data.idAccount,
    date: { $date: new Date() },
    uuid: uuidv4()
  };


  transactions.push(newTransaction)
  account.amount += -data.amount;
  return {error: 0, status: 'success', data: { uuid: newTransaction.uuid, amount: account.balance }};
}
function createPayment(data){
  const account = bankaccounts.find((acc) => acc._id === data.idAccount);
  const dest = bankaccounts.find((acc)=>acc.number === data.destNumber);

  if (!account)
    return { data: 'id de compte invalide' };
  else if (!dest)
    return {data: 'compte destinataire inexistant'}

  const date = {$date: new Date()};
  const expTransaction = {
    _id: ObjectId().toString(),
    amount: -data.amount,
    account: data.idAccount,
    date: date,
    uuid: uuidv4(),
    destination: dest._id
  };
  const destTransaction = {
    _id: ObjectId().toString(),
    amount: data.amount,
    account: data.idAccount,
    date: date,
    uuid: uuidv4(),
  };

  transactions.push(destTransaction, expTransaction);
  account.balance -= data.amount;
  dest.balance += data.amount;
  return {
    data: {
      withdraw: { uuid: expTransaction.uuid, amount: account.balance },
      deposit: { uuid: destTransaction.uuid, amount: dest.balance },
    },
  };

}

function payOrders(data){
  let user_id = data.user_id;
  let order_id = data.order_id;
  let transactionId = data.transactionId;
  let coutTotal = 0;
  let amount = 0;

  if (!user_id || !order_id || !transactionId) {
    return { error: 1, status: 400, data: "Champs requis manquants" };
  }

  // Vérification de la transaction
  let transactionFound = false;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i]["uuid"] === transactionId) {
      transactionFound = true;

      if (transactions[i]["destination"] !== "65d721c44399ae9c8321832c") {
        return { error: 1, status: 400, data: "Destination de transaction invalide" };
      }

      amount = transactions[i]["amount"];
      if (amount > 0) {
        return { error: 1, status: 400, data: "Le montant de la transaction doit être négatif" };
      }

      break;
    }
  }

  if (!transactionFound) {
    return { error: 1, status: 404, data: "Transaction introuvable" };
  }

  let userFound = false;
  for (let i = 0; i < shopusers.length; i++) {
    if (shopusers[i]["_id"] === user_id) {
      userFound = true;

      let orderFound = false;
      for (let j = 0; j < shopusers[i]["orders"].length; j++) {
        if (shopusers[i]["orders"][j]["uuid"] === order_id) {
          orderFound = true;

          coutTotal = shopusers[i]["orders"][j]["total"];
          if (coutTotal + amount !== 0) {
            return { error: 1, status: 400, data: "La transaction ne solde pas le total de la commande ou est trop élever" };
          }

          shopusers[i]["orders"][j]["status"] = "finalized";
          return { error: 0, status: 200, data: shopusers[i]["orders"][j] };
        }
      }

      if (!orderFound) {
        return { error: 1, status: 404, data: "Commande introuvable" };
      }

      break;
    }
  }

  if (!userFound) {
    return { error: 1, status: 404, data: "Utilisateur introuvable" };
  }

  return { error: 1, status: 500, message: "Erreur inconnue" };

}




export default {
  shopLogin,
  getAllViruses,
  getAccountAmount,
  getAccountTransactions,
  getBasketById,
  updateBasketById,
  addOrderByUserId,
  getOrdersByUserId,
  cancelOrderById,
  payOrders,
  getAccount,
  getTransactions,
  createWithdraw,
  createPayment,
}