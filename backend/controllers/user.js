const connection = require("../service/database");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.register = (req, res, next) => {
  
    const emailReg = /.+\@.+\..+/;
    const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
  
    const {  email, password } = req.body;
  
    if (!email || !password)
      return res.status(402).json({
        message: "Les données envoyées ne respectent pas le format requis",
      });
  
    if (
      emailReg.test(email) &&
      passwordReg.test(password)
    ) {
      try {
        // Vérification de l'existance de l'utilisateur
        let sql = `SELECT email FROM User WHERE email = "${email}"`;
  
        connection.query(sql, (err, results) => {
          if (err) throw err;
  
          if (results.length > 0) {
            return res.status(401).json({ message: "L'utilisateur existe déjà" });
          } else {
            bcrypt.hash(password, 10, (err, hash) => {
              if (err) throw err;
              // Ajout de l'utilisateur dans la base de donnée
              let insertSql = `INSERT INTO User (email, password) values(?,?)`;
  
              connection.query(
                insertSql,
                [email, hash],
                (err, results) => {
                  if (err) throw err;
                  if (results)
                    return res
                      .status(201)
                      .json({ message: "Le compte a été créé !" });
                }
              );
            });
          }
        });
      } catch (err) {
        return res.status(401).json({ message: "La requête n'a pu aboutir" });
      }
    } else {
      return res.status(402).json({
        message: "Les données envoyées ne respectent pas le format requis",
      });
    }
  };

  exports.login = (req, res, next) => {
    const { email, password } = req.body;
  
    const emailReg = /.+\@.+\..+/;
    const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
  
    if (!passwordReg.test(password) && !emailReg.test(email))
      return res.status(401).json({
        message: "Le nom d'utilisateur ou le mot de passe est incorrect",
      });
  
    try {
      // Vérification que l'utilisateur existe
      let verifSql =
        "SELECT email, password, user_id FROM User where email = ?";
      connection.query(verifSql, [email], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
          return res.status(401).json({
            message: "Le nom d'utilisateur ou le mot de passe est incorrect",
          });
        }
        if (results.length > 0) {
          const userFromDatabase = {
            email: results[0].email,
            password: results[0].password,
            user_id: results[0].user_id
          };
  
          bcrypt.compare(password, userFromDatabase.password, (err, results) => {
            if (err) throw err;
            if (results === true) {
              
  
              return res.status(200).json({
                token: jwt.sign(
                  {
                    email: `${userFromDatabase.email}`,
                    user_id: `${userFromDatabase.user_id}`
                  },
                  process.env.TOKEN,
                  { expiresIn: "24h" }
                )
              });
            } else
              return res.status(401).json({
                message: "Le nom d'utilisateur ou le mot de passe est incorrect",
              });
          });
        }
      });
    } catch (err) {
      return res.status(402).json({ message: "La connexion a échouée" });
    }
  };