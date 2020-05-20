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
    sql_insert($pdo, "alert_users", ["null", $_POST["name"], $_POST["surname"], $_POST["e_mail"], $_POST["password"], "[0]"]);
    $my_id_record = sql_select($pdo, "alert_users", "e_mail", $_POST["e_mail"]);
    $my_id = $my_id_record[0]["id"];
    sql_insert($pdo, "alert_updates", [$my_id, "[]", "online"]);
    echo json_encode(["status" => "ok", "id" => $my_id]);
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
            $my_id_record = sql_select($pdo, "alert_users", "e_mail", $_POST["e_mail"]);
            $my_id = $my_id_record[0]["id"];
            echo json_encode(["status" => "ok", "id" => $my_id]);
            exit();
        }
    }
    echo json_encode(["status" => "error"]);
}