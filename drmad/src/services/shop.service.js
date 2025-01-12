import LocalSource from "@/datasource/controller";

async function shopLoginFromLocal(data) {
  return LocalSource.shopLogin(data)
}


async function getAllVirusesFromlocal() {
  return LocalSource.getAllViruses()
}


async function getBasketByIdFromLocal(id) {
  return LocalSource.getBasketById(id)
}

async function updateBasketByIdFromLocal(data) {
  return LocalSource.updateBasketById(data)
}

async function addOrderByUserIdFromLocal(data) {
  return LocalSource.addOrderByUserId(data)
}



async function getOrdersByUserIdFromLocal(data) {
  return LocalSource.getOrdersByUserId(data)
}

async function payOrders(data) {
  console.log("service")
  console.log(data)
  return LocalSource.payOrders(data)
}
async function shopLogin(data) {
  let response = null;
  try {
    response = await shopLoginFromLocal(data)
  }
  catch (err) {
    response = { error: 1, status: 404, data: 'Erreur reseau, impossible de se loguer' }
  }
  return response
}




async function getBasketById(id) {
  let response = null;
  try {
    response = await getBasketByIdFromLocal(id)
  }
  catch (err) {
    response = { error: 1, status: 404, data: 'impossible de rÃ©cupÃ©rer le panier' }
  }
  return response
}

async function updateBasketById(data) {
  let response = null;
  try {
    response = await updateBasketByIdFromLocal(data)
  }
  catch (err) {
    response = { error: 1, status: 404, data: 'Erreur, impossible de rÃ©cupÃ©rer le panier' }
  }
  return response
}

async function getAllViruses() {
  let response = null;
  try {
    response = await getAllVirusesFromlocal()
  }
  catch (err) {
    response = { error: 1, status: 404, data: 'Erreur, impossible de rÃ©cupÃ©rer la liste des viruses' }
  }
  return response
}
async function cancelOrderByIdFromLocal(data) {
  return LocalSource.cancelOrderById(data)
}

async function addOrderByUserId(data) {
  let response = null;
  try {
    response = await addOrderByUserIdFromLocal(data)

  }
  catch (err) {
    response = { error: 1, status: 404, data: 'Erreur reseau, impossible de recuperer l\'uuid' }
  }
  return response
}



async function getOrdersByUserId(data) {
  let response = null;
  try {
    response = await getOrdersByUserIdFromLocal(data)
  }
  catch (err) {
    response = { error: 1, status: 404, data: 'Erreur reseau, impossible de recuperer les commandes' }
  }
  return response
}

async function cancelOrderById(data) {
  let response = null;
  try {
    response = await cancelOrderByIdFromLocal(data)
  }
  catch (err) {
    response = { error: 1, status: 404, data: 'erreur reseau, impossible de recuperer la commande' }
  }
  return response
}

export default {
  shopLogin,
  getAllViruses,
  getBasketById,
  updateBasketById,
  addOrderByUserId,
  payOrders,
  getOrdersByUserId,
  cancelOrderById
}