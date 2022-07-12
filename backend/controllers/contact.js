const connection = require("../service/database");
const nodemailer = require('nodemailer')

exports.post = (req, res, next) => {
  
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const message = req.body.message;

  // ---------- Mail d'envoi pour administrateur
function adminMail() {

    let transporter = nodemailer.createTransport({
        host: "ssl0.ovh.net",
        port:"465",
        secure:"false",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
      });
    
      let mailOptions ={
        from: `Contact pa-delamare <${process.env.MAIL_USER}>`,
        to: "padelamare@gmail.com",
        subject: `Message provenant du site pa-delamare.fr`,
        
        html: `<p>Expéditeur : ${firstname + " " + lastname}</p>
        <p>Email: ${email}</p>
        <p>Message : <br/>
        ${message}</p>
        `
    
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            return res.status(401).end("Le message n'a pas pu être envoyé, veuillez ré-essayer ultérieurement")
        } else {
            console.log("email envoyé: " + info.response);
            return res.status(201).end("Message envoyé")
    
        }
      })

}

adminMail()
  

  // ------------ Mail d'envoi pour remercier l'expéditeur

  function thanksMail() {

    let transporter = nodemailer.createTransport({
        host: "ssl0.ovh.net",
        port:"465",
        secure:"false",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
      });

      let mailOptions = {
        from: `pa-delamare.fr <${process.env.MAIL_USER}>`,
        to: `${email}`,
        subject: 'Votre message sur le site pa-delamare.fr à bien été envoyé.',

        html: `<p>Bonjour ${firstname} !</p>
        <p>Merci d'avoir contacté le site pa-delamare.fr, le message suivant a été envoyé:</p>
        <p>${message}</p>
        <p>Une réponse vous sera rapidement adressé, cordialement.</p>
        `
      }

      transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            console.log("message de remerciement non envoyé")
        } else {
            console.log("email de remerciement envoyé: " + info.response);
            
    
        }
      })

  }

  thanksMail()

};
