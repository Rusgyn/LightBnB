const properties = require("./json/properties.json");
const users = require("./json/users.json");

const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "lightbnb",
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool
    .query('SELECT * FROM users WHERE email = $1;', [email.toLowerCase()])
    .then((response) => {
      return response.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      throw error;
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query('SELECT * FROM users WHERE id = $1;', [id])
    .then((response) => {
      return response.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      throw error;
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const queryString = `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;`
  const values = [user.name, user.email, user.password];

  return pool
    .query(queryString, values)
    .then((response)=> {
      return response.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      throw error;
    })
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  // return getAllProperties(null, 2);
  
  const queryString = `SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;`;

  const values = [guest_id, limit];

  return pool
    .query(queryString, values)
    .then((response) => {
      return response.rows;
    })
    .catch((error) => {
      console.log(error.message);
      throw error;
    })
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 3) {
  return pool
    .query(`SELECT * FROM properties LIMIT $1`, [limit])
    .then((result) => { //.then always returns a promise
      return result.rows;// return? It has to do with where getAllProperties is being used elsewhere in the project. When getAllProperties is called in the apiRoutes.js file, it is chained to .then, which can only consume a promise.
    })
    .catch((error) => {
      console.log(error.message);
      throw error;
    });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const queryString = `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;` //add RETURNING *; to the end of the query to return the saved property.

  const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms];

  return pool
    .query(queryString, values)
    .then((response) => {
      return response.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
      throw error;
    })
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
