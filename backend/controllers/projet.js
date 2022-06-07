const connection = require("../service/database");

exports.get = (req, res, next) => {
  try {
    connection
      .query("SELECT * FROM Language LEFT JOIN Projet on projet_id = projet.id ORDER BY name")
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

