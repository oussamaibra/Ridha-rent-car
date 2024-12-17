const Reclamation = require("../models/reclamation");

exports.find = async (req, res) => {
  res.send({
    reclamations: await Reclamation.find({ publication: req.body.publication }),
  });
};

exports.findOne = async (req, res) => {
  res.send(await Reclamation.findById(req.body._id));
};

exports.findAllByEmail = async (req, res) => {
  res.send(await Reclamation.find({ email: req.body.email }));
};

exports.create = async (req, res) => {
  const {
    name,
    lastname,
    email,
    phone,
    nbDays,
    pickUpLocation,
    pickUpTime,
    pickUpDate,
    dropOffdate,
    dropOfftime,
    price,
    message,
    car,
  } = req.body;

  const newReclamation = new Reclamation();

  newReclamation.name = name;
  newReclamation.lastname = lastname;
  newReclamation.email = email;
  newReclamation.phone = phone;
  newReclamation.nbDays = nbDays;
  newReclamation.car = car;

  newReclamation.pickUpLocation = pickUpLocation;
  newReclamation.pickUpTime = pickUpTime;
  newReclamation.pickUpDate = pickUpDate;

  newReclamation.dropOffdate = dropOffdate;
  newReclamation.dropOfftime = dropOfftime;

  newReclamation.price = price;
  newReclamation.message = message;

  newReclamation.save();

  res.status(201).send({ message: "success", reclamation: newReclamation });
};

exports.update = async (req, res) => {
  const {
    _id,
    name,
    lastname,
    email,
    phone,
    nbDays,
    pickUpLocation,
    pickUpTime,
    pickUpDate,
    dropOffdate,
    dropOfftime,
    price,
    message,
    car,
  } = req.body;

  let reclamation = await Reclamation.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        _id,
        name,
        lastname,
        email,
        phone,
        nbDays,
        pickUpLocation,
        pickUpTime,
        pickUpDate,
        dropOffdate,
        dropOfftime,
        price,
        message,
        car,
      },
    }
  );
  res.status(201).send({ message: "success" });
};

exports.delete = async (req, res) => {
  const reclamation = await Reclamation.findById(req.params.id).remove();
  res.status(201).send({ message: "success", reclamation: reclamation });
};

exports.deleteAll = async (req, res) => {
  Reclamation.remove({}, function (err, reclamation) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(204).send({ message: "success" });
  });
};
