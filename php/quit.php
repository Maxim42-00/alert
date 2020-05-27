<?php

require_once "sql.php";
require_once "is_auth.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

$my_id = is_auth();

if($my_id)
{
    if(isset($_COOKIE["e_mail"]) && isset($_COOKIE["password"]))
    {
        setcookie("e_mail");
        setcookie("password");
    }
    echo "by";
}