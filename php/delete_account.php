<?php

require_once "sql.php";
require_once "is_auth.php";
require "del_files.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

$my_id = is_auth();

if($my_id)
{
    $pdo = sql_create_pdo();

    

    echo json_encode(["status" => "ok", "data" => $user, "my_id" => $my_id]);
}
else
{
    echo json_encode(["status" => "error"]);
}