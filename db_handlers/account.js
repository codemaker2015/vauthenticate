const express = require("express")
const accountRoutes = express.Router();
const fs = require('fs');

const dataPath = './models/account.json'

// util functions 

const saveAccountData = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync(dataPath, stringifyData)
}

const getAccountData = () => {
  const jsonData = fs.readFileSync(dataPath)
  return JSON.parse(jsonData)
}


// reading the data
accountRoutes.get('/account', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    res.send(JSON.parse(data));
  });
});

accountRoutes.post('/account/validate', (req, res) => {
  const {username, password} = req.body

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.send({ success: false, msg: 'exception' })
      throw err;
    }

    let accounts = JSON.parse(data);
    let valid = false;

    for (var key in accounts)
      if (accounts.hasOwnProperty(key)) {
        var val = accounts[key];
        for (var key in val) 
          if(val.username === username && val.password === password) {
            valid = true;
            break;
          }
      }
    
    if(valid)
      res.send({ success: true, valid: true, msg: 'valid user', token: Math.floor(100000 + Math.random() * 900000) })
    else
      res.send({ success: true, valid: false, msg: 'invalid user' })
  });
});


accountRoutes.post('/account/addaccount', (req, res) => {

  var existAccounts = getAccountData()
  const newAccountId = Math.floor(100000 + Math.random() * 900000)

  existAccounts[newAccountId] = req.body

  // console.log(existAccounts);

  saveAccountData(existAccounts);
  res.send({ success: true, msg: 'account data added successfully' })
})

// Read - get all accounts from the json file
accountRoutes.get('/account/list', (req, res) => {
  const accounts = getAccountData()
  res.send(accounts)
})

// Update - using Put method
accountRoutes.put('/account/:id', (req, res) => {
  var existAccounts = getAccountData()
  fs.readFile(dataPath, 'utf8', (err, data) => {
    const accountId = req.params['id'];
    existAccounts[accountId] = req.body;

    saveAccountData(existAccounts);
    res.send(`accounts with id ${accountId} has been updated`)
  }, true);
});

//delete - using delete method
accountRoutes.delete('/account/delete/:id', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    var existAccounts = getAccountData()

    const userId = req.params['id'];

    delete existAccounts[userId];
    saveAccountData(existAccounts);
    res.send(`accounts with id ${userId} has been deleted`)
  }, true);
})
module.exports = accountRoutes