<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

require_once "sql.php";

$type = $_POST["type"];
if($type === "new_account")
{
    $pdo = sql_create_pdo();
    $users = sql_fetch_all($pdo, "alert_users");

    foreach($users as $user)
    {
        if($user["e_mail"] === $_POST["e_mail"])
        {
            echo json_encode(["status" => "exists"]);
            exit();
        }
    }
    sql_insert($pdo, "alert_users", ["id" => "null", "name" => $_POST["name"], "surname" => $_POST["surname"], "e_mail" => $_POST["e_mail"], "password" => $_POST["password"]]);
    echo json_encode(["status" => "ok"]);
    setcookie("e_mail", $_POST["e_mail"]);
    setcookie("password", $_POST["password"]);
}

if($type === "log_in")
{
    $pdo = sql_create_pdo();
    $users = sql_fetch_all($pdo, "alert_users");

    foreach($users as $user)
    {
        if(($user["e_mail"] === $_POST["e_mail"]) && ($user["password"] === $_POST["password"]))
        {
            setcookie("e_mail", $_POST["e_mail"]);
            setcookie("password", $_POST["password"]);
            echo json_encode(["status" => "ok"]);
            exit();
        }
    }
    echo json_encode(["status" => "error"]);
}