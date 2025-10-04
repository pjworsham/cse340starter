const invModel = require("../models/inventory-model")
const Util = {}
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      // Clean up the image path
      let imagePath = vehicle.inv_image.replace('images/vehicles/vehicles/', 'images/vehicles/')
      if (!imagePath.startsWith('/')) {
        imagePath = '/' + imagePath
      }
      
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + imagePath 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the inventory item detail view HTML ---  THIS IS STEP #4 
* ************************************ */
Util.buildItemDetailView = function(data){
  let detail
  if(data){
    detail = '<div id="inv-detail">'
    detail += '<div class="vehicle-image">'
    detail += '<img src="/' + data.inv_image.replace('images/vehicles/vehicles/', 'images/vehicles/') 
    + '" alt="Image of ' + data.inv_make + ' ' + data.inv_model 
    + ' on CSE Motors" />'
    detail += '</div>'
    detail += '<div class="vehicle-info">'
    detail += '<h2>' + data.inv_make + ' ' + data.inv_model + ' Details</h2>'
    detail += '<ul class="vehicle-specs">'
    detail += '<li><strong>Make:</strong> ' + data.inv_make + '</li>'
    detail += '<li><strong>Model:</strong> ' + data.inv_model + '</li>'
    detail += '<li><strong>Year:</strong> ' + data.inv_year + '</li>'
    detail += '<li><strong>Price:</strong> $' + new Intl.NumberFormat('en-US').format(data.inv_price) + '</li>'
    detail += '<li><strong>Description:</strong> ' + data.inv_description + '</li>'
    detail += '<li><strong>Miles:</strong> ' + new Intl.NumberFormat('en-US').format(data.inv_miles) + '</li>'
    detail += '<li><strong>Color:</strong> ' + data.inv_color + '</li>'
    detail += '</ul>'
    detail += '</div>'
    detail += '</div>'
  } else {
    detail = '<p class="notice">Sorry, no vehicle details could be found.</p>'
  }
  return detail
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/* ****************************************
 * Build classification list select element
 **************************************** */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}

/* ****************************************
* Middleware to check token validity - wk5
**************************************** */
Util.checkJWTToken = (req, res, next) => {
 if (req.cookies.jwt) {
  jwt.verify(
   req.cookies.jwt,
   process.env.ACCESS_TOKEN_SECRET,
   function (err, accountData) {
    if (err) {
     req.flash("Please log in")
     res.clearCookie("jwt")
     return res.redirect("/account/login")
    }
    res.locals.accountData = accountData
    res.locals.loggedin = 1
    next()
   })
 } else {
  next()
 }
}



module.exports = Util