const express = require("express");

const router = express.Router();

const uuid = require("uuid");

let items = require("../../Items");

router.get("/", (req, res) => {
  res.json(items);
});

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  const found = items.some((item) => item.id === parseInt(req.params.id));

  if (found) {
    res.json(items.filter((item) => item.id === parseInt(req.params.id)));
  } else {
    res.sendStatus(400);
  }
});

router.post("/", (req, res) => {
  const newItem = {
    id: uuid.v4(),
    image: req.body.image,
    category: req.body.category,
  };

  if (!newItem.image || !newItem.category) {
    return res.sendStatus(400);
  }

  items.push(newItem);

  res.json(items);
});

//Update User

router.put("/:id", (req, res) => {
  const found = items.some((item) => item.id === parseInt(req.params.id));

  if (found) {
    const updateItem = req.body;

    items.forEach((item) => {
      if (item.id === parseInt(req.params.id)) {
        item.category = updateItem.category
          ? updateItem.category
          : item.category;
        res.json({ msg: "Item updated", item });
      }
    });
  } else {
    res.sendStatus(400);
  }
});

//Delete User

router.delete("/:id", (req, res) => {
  const found = items.some((item) => item.id === parseInt(req.params.id));

  if (found) {
    items = items.filter((item) => item.id !== parseInt(req.params.id));

    res.json({
      msg: "Item deleted",

      items,
    });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
