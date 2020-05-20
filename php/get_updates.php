<?php

require_once "sql.php";
require_once "is_auth.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

$online = $_GET["online"];

function get_updates($online)
{
    $my_id = is_auth();

    if($my_id)
    {
        $pdo = sql_create_pdo();
        $my_updates = (sql_select_by_id($pdo, "alert_updates", $my_id))["updates"];

        sql_update_by_id($pdo, "alert_updates", $my_id, ["online" => $online]);

        return json_encode(["status" => "ok", "updates" => $my_updates]);
    }
    else
    {
        return json_encode(["status" => "error"]);
    }
}

echo get_updates($online);