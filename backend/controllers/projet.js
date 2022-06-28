const connection = require("../service/database");

exports.get = (req, res, next) => {
  try {
    connection
      .query("SELECT * FROM Projet ORDER BY name")
      .then((results) => {
        
        return res.status(201).json(results);
      })
      .catch(() => {
        return res.status(401);
      });
  } catch {
    return res.status(401);
  }
};

