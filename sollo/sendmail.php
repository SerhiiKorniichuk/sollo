<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	//От кого письмо
	$mail->setFrom('support@post.ua', 'ПП "Солло"');
	//Кому отправить
	$mail->addAddress('oleg@custom.kiev.ua');
	//Тема письма
	$mail->Subject = 'Заявка с сайта';

	//Тело письма
	$body = '<h3>Информация отправленная пользователем</h3>';
	
	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['phone']))){
		$body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
	}
	if(trim(!empty($_POST['year_car']))){
		$body.='<p><strong>Год авто:</strong> '.$_POST['year_car'].'</p>';
	}
	if(trim(!empty($_POST['type_car']))){
		$body.='<p><strong>Тип кузова:</strong> '.$_POST['type_car'].'</p>';
	}
	if(trim(!empty($_POST['price_car']))){
		$body.='<p><strong>Стоимость авто:</strong> '.$_POST['price_car'].'</p>';
	}
	if(trim(!empty($_POST['type_engine']))){
		$body.='<p><strong>Тип двигателя:</strong> '.$_POST['type_engine'].'</p>';
	}

	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>