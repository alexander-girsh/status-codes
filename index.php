<?php 

require('StatusCode.php');

$json = file_get_contents('statuses.json');
$statusCode = new StatusCode($json);

$statusCode['accounts']['INCORRECT_USERNAME_LENGTH'] = 123; // не изменит значение
unset($statusCode['accounts']['INCORRECT_USERNAME_LENGTH']); // не удалит значение

echo
	json_encode($statusCode['a']). PHP_EOL .
		// null
	json_encode($statusCode['WRONG_ARGS']). PHP_EOL .
		// { "code": 106, "message": "WRONG_ARGS" }
	json_encode($statusCode['accounts']['INCORRECT_USERNAME_LENGTH']). PHP_EOL; 
		// { "code": 206, "message": "INCORRECT_USERNAME_LENGTH" }