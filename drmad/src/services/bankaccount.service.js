import LocalSource from "@/datasource/controller";


async function getAccountAmountFromLocalSource(number) {
  return LocalSource.getAccountAmount(number)
}

async function getAccountAmount(number) {
  let response = null;
  try {
    // changer la methode appelee quand cette fonctionnalite l'API est prete
    response = await getAccountAmountFromLocalSource(number)
  }
  // NB: le catch n'aura lieu que pour des requete vers l'API, s'il y a une erreur reseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur reseau, impossible de recuperer le detail du compte'  }
  }
  return response
}

async function getAccountTransactionsFromLocalSouce(number) {
  return LocalSource.getAccountTransactions(number)
}

async function getAccountTransactions(number) {
  let response = null;
  try {
    // changer la methode appelee quand cette fonctionnalite l'API est prete
    response = await getAccountTransactionsFromLocalSouce(number)
  }
  // NB: le catch n'aura lieu que pour des requete vers l'API, s'il y a une erreur reseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur reseau, impossible de recuperer le detail du compte'  }
  }
  return response
}
async function getAccount(number) {
  let response = null;
  try {
    response = await getAccountFromLocalSource(number)
  }
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur reseau, impossible de recuperer le compte'  }
  }
  return response
}

async function getAccountFromLocalSource(number){
  return LocalSource.getAccount(number);
}

async function getTransactions(data) {
  let response = null;
  try {
    response = await getTransactionsFromLocalSource(data)
  }
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur reseau, impossible de recuperer les transactions'  }
  }
  return response
}
async function getTransactionsFromLocalSource(data){
  return LocalSource.getTransactions(data);
}

async function createWithdraw(data) {
  let response = null;
  try {
    response = await createWithdrawFromLocalSource(data)
  }
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur reseau, impossible de créer un retrait'  }
  }
  return response
}
async function createWithdrawFromLocalSource(data){
  return LocalSource.createWithdraw(data);
}

async function createPayment(data) {
  let response = null;
  try {
    response = await createPaymentFromLocalSource(data)
  }
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur reseau, impossible de créer un payement'  }
  }
  return response
}

async function createPaymentFromLocalSource(data){
  return LocalSource.createPayment(data);
}

export default {
  getAccountAmount,
  getAccountTransactions,
  getAccount,
  getTransactions,
  createWithdraw,
  createPayment,
}