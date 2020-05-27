<?php

require_once "sql.php";
require_once "is_auth.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

$online = $_POST["online"];

function get_updates($online)
{
    $my_id = is_auth();

    if($my_id)
    {
        $pdo = sql_create_pdo();
        sql_update_by_id($pdo, "alert_updates", $my_id, ["online" => $online]);
        if($online === "offline")
            return json_encode(["status" => "offline"]);

        $my_updates = (sql_select_by_id($pdo, "alert_updates", $my_id))["updates"];

        return json_encode(["status" => "ok", "updates" => $my_updates]);
    }
    else
    {
        return json_encode(["status" => "error"]);
    }
}

echo get_updates($online);