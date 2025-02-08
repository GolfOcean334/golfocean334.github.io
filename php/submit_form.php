<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    $captcha = htmlspecialchars($_POST['captcha']);

    // Vérifier le captcha
    if ($captcha != '7') {
        echo "Captcha incorrect. Veuillez réessayer.";
        exit;
    }

    // Préparer l'e-mail
    $to = "gathelieraxel45@gmail.com";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $email_subject = "Nouveau message de contact: $subject";
    $email_body = "Nom: $name\n";
    $email_body .= "Adresse e-mail: $email\n";
    $email_body .= "Sujet: $subject\n";
    $email_body .= "Message:\n$message\n";

    // Envoyer l'e-mail
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "Message envoyé avec succès.";
    } else {
        echo "Échec de l'envoi du message.";
    }
} else {
    echo "Méthode de requête non autorisée.";
}
?>