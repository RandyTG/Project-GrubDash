const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass
//validates inputed data
function validator(req, res, next) {
  const { data = {} } = req.body;
  const { dishId } = req.params;

  if (!data.name) {
    next({ status: 400, message: "Dish must include a name" });
  } else if (!data.description) {
    next({ status: 400, message: "Dish must include a description" });
  } else if (!data.price) {
    next({ status: 400, message: "Dish must include a price" });
  } else if (!data.image_url) {
    next({ status: 400, message: "Dish must include a image_url" });
  } else if (data.price) {
    if (!Number.isInteger(data.price) || data.price < 0) {
      next({
        status: 400,
        message: "Dish must have a price that is an integer grater than 0",
      });
    }
  }
  if (data.id) {
    if (data.id !== dishId) {
      next({
        status: 400,
        message: `Dish id does not match route id. Dish: ${data.id}, Route: ${dishId}`,
      });
    }
  }

  return next();
}

function create(req, res) {
  const { data = {} } = req.body;
  const newDish = {
    id: nextId(),
    ...data,
  };
  dishes.push(newDish);
  res.status(201).json({ data: newDish });
}

function dishExists(req, res, next) {
  const { dishId } = req.params;
  const foundDish = dishes.find((dish) => dish.id === dishId);
  if (foundDish) {
    res.locals.dish = foundDish;
    next();
  }
  next({
    status: 404,
    message: `Dish does not exist: ${dishId}`,
  });
}

function read(req, res, next) {
  res.status(200).json({ data: res.locals.dish });
}

function list(req, res, next) {
  res.json({ data: dishes });
}

function update(req, res, next) {
  const { data = {} } = req.body;
  data.id = res.locals.dish.id;
  res.locals.dish = data;

  res.json({ data: res.locals.dish });
}

module.exports = {
  create: [validator, create],
  read: [dishExists, read],
  list,
  update: [dishExists, validator, update],
};
