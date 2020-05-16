<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

if(isset($_COOKIE["e_mail"]) && isset($_COOKIE["password"]))
{
    setcookie("e_mail");
    setcookie("password");
}

echo "by";