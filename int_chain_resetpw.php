<?php
// Log in database
$pdo = new pdo('mysql:host=localhost;port=3306;dbname=sample_int_chain_custody','mysql','mysql');
$staffinitial=$_POST['staffinitial'];
$username=$_POST['username'];
$pw=$_POST['pw'];
//$staffinitial='YY';
//$username='yyan';
//$pw='yypw';
//$casenumber="1701395";
$sql_update = "UPDATE staffinitials SET username=:username,pw=:pw WHERE staff_initial='".$staffinitial."'";
$stmt = $pdo->prepare($sql_update);
$stmt->execute(array(':username'=>$username,
                      ':pw'=>$pw));
echo ("<p></p>".$staffinitial." has successfully modified username and password.");
?>
