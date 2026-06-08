const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const envoyerEmailInscription = async (
  destinataire,
  nom,
  prenom,
  email,
  motDePasse,
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: destinataire,
    subject: "Bienvenue sur Permis Étudiant+ !",
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0D47A1, #1A73E8); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0;">Permis Étudiant+</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">Votre espace apprenant est prêt !</p>
            </div>
            <div style="background: #f5f7fa; padding: 30px; border-radius: 0 0 10px 10px;">
                <h2 style="color: #0D47A1;">Bonjour ${prenom} ${nom} !</h2>
                <p>Votre inscription au Projet Permis Étudiant+ a été effectuée avec succès.</p>
                <p>Voici vos identifiants de connexion :</p>
                <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #1A73E8; margin: 20px 0;">
                    <p><strong>Email :</strong> ${email}</p>
                    <p><strong>Mot de passe :</strong> ${motDePasse}</p>
                </div>
                <p style="color: #e53935;"><strong>Gardez ces informations en lieu sûr !</strong></p>
                <a href="http://localhost:5500/frontend/login.html" 
                   style="display: inline-block; background: #1A73E8; color: white; padding: 12px 25px; border-radius: 8px; text-decoration: none; margin-top: 15px;">
                    Accéder à mon espace
                </a>
                <hr style="margin: 25px 0; border: none; border-top: 1px solid #e0e0e0;">
                <p style="color: #666; font-size: 0.85rem;">ONG La Voix des Étudiants — Projet Permis Étudiant+</p>
            </div>
        </div>
        `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { envoyerEmailInscription };
