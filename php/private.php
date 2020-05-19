<?php

require_once "sql.php";
require_once "is_auth.php";
require_once "get_img_of_user.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

$my_id = is_auth();

if($my_id)
{
    $user_id = $_GET["user_id"];
    $pdo = sql_create_pdo();
    $user = sql_select_by_id($pdo, "alert_users", $user_id);
    $user["img"]= get_img_of_user($pdo, $user);
    unset($user["password"]);
    unset($user["e_mail"]);
    unset($user["files"]);
    if(!$user)
        echo json_encode(["status" => "ok", "found" => "not_found"]);
    else
        echo json_encode(["status" => "ok", "data" => $user, "my_id" => $my_id, "found" => "found"]);
}
else
{
    echo json_encode(["status" => "error"]);
}