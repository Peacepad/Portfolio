const connection = require("../service/database");

exports.get = (req, res, next) => {
  try {
    connection
      .query("SELECT * FROM Projet")
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

exports.oneProjet = (req, res, next) => {
  const id =req.params.id;
  console.log(req.params.id)
  try {
    connection.query(`SELECT * FROM Projet where id=${id}`)
    .then((projet) => {
      return res.status(201).json(projet)
      
    }
  
    )
    .catch(() => {return res.status(401).json({message: "erreur lors du chargement du projet"})}
    )
  } catch {

  }
}