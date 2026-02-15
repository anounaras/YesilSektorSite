<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {

    // Form verilerini al ve güvenli hale getir
    $ad = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $konu = htmlspecialchars($_POST['subject']);
    $mesaj = htmlspecialchars($_POST['message']);

    // Mesaj formatı
    $icerik = "-----------------------------\n";
    $icerik .= "Ad: $ad\n";
    $icerik .= "Email: $email\n";
    $icerik .= "Konu: $konu\n";
    $icerik .= "Mesaj: $mesaj\n";
    $icerik .= "Tarih: " . date("d.m.Y H:i:s") . "\n";
    $icerik .= "-----------------------------\n\n";

    // Mesajları "mesajlar.txt" dosyasına ekle
    $result = file_put_contents(__DIR__."/mesajlar.txt", $icerik, FILE_APPEND);

    if($result === false){
        echo "Mesaj kaydedilemedi. Klasör izinlerini kontrol et.";
    } else {
        echo "Mesajınız başarıyla kaydedildi!";
    }
}
?>
