const connection = require("../service/database");

exports.post = (req, res, next) => {
  const user_id = req.user.user_id;

  try {
    let notesReq = req.body.notesCloud;
    console.log(notesReq);
    notesReq.forEach((note) => {
      let sql = "SELECT * FROM Note where id = ?";
      connection.query(sql, [note.id], (err, results) => {
        if (err) throw err;
        if (results.length < 1) {
          note.txt = encodeURIComponent(note.txt);
          note.date = note.date.replace("T", " ");
          note.date = note.date.split(".")[0];

          let sqlInsert =
            "INSERT INTO Note (id, title, content, date, note_user) values (?,?,?,?,?)";

          connection.query(
            sqlInsert,
            [note.id, note.title, note.txt, note.date, user_id],
            (err, results) => {
              if (err) throw err;
            }
          );
        } else {
          note.txt = encodeURIComponent(note.txt);

          if (note.date !== results[0].date.toISOString()) {
            note.date = note.date.replace("T", " ");
            note.date = note.date.split(".")[0];
            let sqlUpdate =
              "UPDATE Note SET title= ?, content= ?, date = ? WHERE id= ?";

            connection.query(
              sqlUpdate,
              [note.title, note.txt, note.date, note.id],
              (err, results) => {
                if (err) throw err;
              }
            );
          }
        }
      });
    });
    return res.status(201).json({ message: "notes sauvegardées" });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "notes non sauvegardées" });
  }
};

exports.get = (req, res, next) => {
  const user_id = req.user.user_id;
  try {
    let sql = "SELECT * FROM Note WHERE note_user = ?";
    connection.query(sql, [user_id], (err, results) => {
      if (err) throw err;

      return res.status(201).json({ results });
    });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Les notes n'ont pas pu être récupérées" });
  }
};

exports.delete = (req, res) => {
  const id = req.body.id;

  try {
    let sql = "DELETE FROM Note WHERE id=?";

    connection.query(sql, [id], (err, results) => {
      if (err) throw err;
      return res.status(201).json({ message: "note supprimée" });
    });
  } catch (err) {
    return res.status(401).json({ message: "Une erreur s'est produite" });
  }
};
