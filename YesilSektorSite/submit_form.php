<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Formdan gelen verileri alalım
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    // E-postanın gideceği adres (Kendi e-postanı buraya yaz)
    $recipient = "arasmandira18@gmail.com"; 

    // E-posta başlığı
    $email_subject = "Yeni İletişim Formu: $subject";

    // E-posta içeriği
    $email_content = "Ad Soyad: $name\n";
    $email_content .= "E-posta: $email\n\n";
    $email_content .= "Mesaj:\n$message\n";

    // E-posta başlıkları (Headers)
    $email_headers = "From: $name <$email>";

    // Gönderme işlemi
    if (mail($recipient, $email_subject, $email_content, $email_headers)) {
        echo "Teşekkürler! Mesajınız başarıyla gönderildi.";
    } else {
        echo "Üzgünüz, bir hata oluştu ve mesajınız iletilemedi.";
    }
} else {
    echo "Bu sayfaya doğrudan erişim izni yoktur.";
}
?>