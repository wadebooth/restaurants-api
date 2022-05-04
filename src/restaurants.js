import connectDb from "./connectDb.js";

// // CREATE

// export function addRestaurant(req, res){} //ES5
// export const AddRestaurant (req, res) => {} //ES6

// export async function addRestaurant(req, res){} //ES5
// export const addRestaurant = async (req, res) => {} //ES6

export const addRestaurant = async (req, res) => {
  //check if request is valid
  if (!req.body || !req.body.name || !req.body.address) {
    res.status(401).send("Invalid request");
    return;
  }
  // connect to Firestore
  const db = connectDb();
  // prepare the data
  const newRestaurant = {
    name: req.body.name,
    address: req.body.address,
    rating: req.body.rating || 3,
    cuisine: req.body.cuisine || "American",
  };
  // add data to the restaurants collection
  try {
    const doc = await db.collection("restaurants").add(newRestaurant);
    // return success
    res.status(201).send("Restaurant created " + doc.id);
  } catch (err) {
    // return error
    res.status(500).send(err);
  }
};

// // READ

// export const getAllRestaurants = async (req, res) => {
//   const db = connectDb();
//   try {
//     const snapshot = await db.collection("restaurants").get();
//     const restaurantsArray = snapshot.docs.map((doc) => {
//       let Restaurant = doc.data();
//       restaurant.id = doc.id;
//       return restaurant;
//     });
//     res.send(restaurantsArray);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

export function getAllRestaurants(req, res) {
  const db = connectDb();
  db.collection("restaurants")
    .get()
    .then((snapshot) => {
      const restaurantArray = snapshot.docs.map((doc) => {
        //get the original array and allow the change
        let restaurant = doc.data(); //keep the originial order
        restaurant.id = doc.id; //id does not come out without data, we need to insert it
        return restaurant; //add this restaurant to an array that will be sent out
      });
      res.send(restaurantArray);
    })
    .catch((err) => {
      res.status(500).send(err); //returns the status 500 (HTML code for error) and the error
    });
}
export function getRestaurantById(req, res) {
  const { restaurantId } = req.params; // take the param sent via browser
  if (!restaurantId) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection("restaurants")
    .doc(restaurantId)
    .get() //get the document itself
    .then((doc) => {
      let restaurant = doc.data(); // keeping the original order
      restaurant.id = doc.id; // id does not come out with data, we need to insert it
      res.send(restaurant); // add this restaurant to an array that will be sent out
    }) // 200 (HTML code for success) is not required
    .catch((err) => {
      res.status(500).send(err); //returns the status 500 (HTML code for error) and the error
    });
}

// // UPDATE

function validateUpdateParams(req) {
  if (!req.params.restaurantId || !req.body) {
    // check if there is a body with data in the request parameter
    return -1;
  }
  return 0;
}

export function updateRestaurant(req, res) {
  const { restaurantId } = req.params;
  // validate req params
  if (validateUpdateParams(req) < 0) {
    res.status(401).send("Invalid request for restaurant: " + restaurantId);
    return;
  }
  // connect to DB
  const db = connectDb();
  // update the data in the collection
  db.collection("restaurants")
    .doc(restaurantId)
    .update(req.body)
    .then(
      // return success
      res.status(201).send("Restaurant Updated " + restaurantId)
    )
    .catch((err) => {
      // return error
      res.status(500).send(err);
    });
}

// // DELETE

function validateDeleteParams(req) {
  if (!req.params.restaurantId) {
    // check if there is a body with data in the request parameter
    return -1;
  }
  return 0;
}
export function deleteRestaurant(req, res) {
  const { restaurantId } = req.params;
  // validate req params
  if (validateDeleteParams(req) < 0) {
    res.status(401).send("Invalid request for restaurant: " + restaurantId);
    return;
  }
  // connect to DB
  const db = connectDb();
  // hard delete data
  db.collection("restaurants")
    .doc(restaurantId)
    .delete()
    .then(
      // return success
      res.status(201).send("Restaurant deleted: " + restaurantId)
    )
    .catch((err) => {
      // return error
      res.status(500).send(err);
    });
}
