<?php

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP(); // предоставляю скрипту свою почту; у кажого почтового сервиса есть smtp-сервер(в данном случае скрипт возьмет мою почту, залогинится под данными которые мы ниже введем - и как-будто от нее будет отправлять письма)
$mail->Host = 'smtp.gmail.com'; // это smtp сервер того почтового ресурса, который мы будем использовать. Сервер исходящей почты (SMTP)	smtp.mail.ru (инфо smtp в google)
$mail->SMTPAuth = true; // говорим что будем входить в нашу почту при помощи этого аккаунта
$mail->Username = 'arturkim2991@gmail.com'; // Наш логин
$mail->Password = 'ukmonzbwqklxczdl'; // Наш пароль от ящика (НОВОЕ!!!нужно указывать пароль для приложений - можно запросить пороль для приложений в google для mail)
$mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to

$mail->setFrom('arturkim2991@gmail.com', 'Pulse'); // От кого письмо(пример - example@gmail.com) 
$mail->addAddress('arturkim91@mail.ru'); // указываем куда будет приходить данное письмо
// Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true); // письмо придет в формате html 

$mail->Subject = 'Данные';
$mail->Body = '
		Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '<br>
	E-mail: ' . $email . '';

if (!$mail->send()) {
	return false;
} else {
	return true;
}

?>