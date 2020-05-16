<?php

require_once "sql.php";
require_once "is_auth.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

$id = is_auth();

if($id)
{
    $pdo = sql_create_pdo();
    $user = sql_select_by_id($pdo, "alert_users", $id);
    echo json_encode(["status" => "ok", "data" => $user]);
}
else
{
    echo json_encode(["status" => "error"]);
}