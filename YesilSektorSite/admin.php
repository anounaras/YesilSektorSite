<?php
$dosya = __DIR__ . "/mesajlar.txt";
$icerik = file_exists($dosya) ? file_get_contents($dosya) : "Henüz mesaj yok";
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>Admin Paneli</title>
    <style>
        body { background:#1b1b1b; color:white; font-family:Arial; padding:20px; }
        pre { white-space: pre-wrap; word-wrap: break-word; background: rgba(0,45,28,0.7); padding:15px; border-radius:15px; }
    </style>
</head>
<body>
    <h2>Gelen Mesajlar</h2>
    <pre><?php echo $icerik; ?></pre>
</body>
</html>
