const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
*  Get product data
* ************************** */
async function getProductById (inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory
      WHERE inv_id = $1`,
      [inv_id]
    )
    return data.rows
  } catch (error) {
    console.error("getproductbyid error " + error)
  }
  }


/* ***************************
 *  Add new classification
 * ************************** */
async function insertClassification (classification_name) {
  try {
    const data = await pool.query(
      `INSERT INTO public.classification (classification_name)
      VALUES ($1)`,
      [classification_name]
    )
    return data.rows
  } catch (error) {
    console.error("insertClassification error " + error)
  }
}

/* ***************************
 *  Check if classification already exists
 * ************************** */
async function checkClassification (classification_name) {
  try {
    const sql = "SELECT * FROM classification WHERE classification_name = $1"
    const classificationName = await pool.query(sql, [classification_name])
    return classificationName.rowCount
  } catch (error) {
    return error.message
  }
}

/* ***************************
 *  Add to inventory
 * ************************** */
async function insertToInventory (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color) {
  try {
    const sql = "INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
    return await pool.query(sql, [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id])
  } catch (error) {
    return error.message
  }
}


module.exports = {getClassifications, getInventoryByClassificationId, getProductById, insertClassification, checkClassification, insertToInventory};
