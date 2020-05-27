<?php

require_once "sql.php";
require_once "is_auth.php";
require_once "access_allow_origin.php";

$online = $_POST["online"];
$users_ids_json = $_POST["users_ids"];
$users_ids = json_decode($users_ids_json, true);

function get_updates($online, $users_ids)
{
    $my_id = is_auth();

    if($my_id)
    {
        $pdo = sql_create_pdo();
        sql_update_by_id($pdo, "alert_updates", $my_id, ["online" => $online]);
        if($online === "offline")
            return json_encode(["status" => "offline"]);

        $user_id_to_online = [];
        foreach($users_ids as $user_id)
        {
            $user = sql_select_by_id($pdo, "alert_updates", $user_id);
            if(!$user) continue;
            $user_id_to_online[$user_id] = $user["online"];
        }

        $my_updates_json = (sql_select_by_id($pdo, "alert_updates", $my_id))["updates"];
        $my_updates = json_decode($my_updates_json, true);

        return json_encode(["status" => "ok", "updates" => $my_updates, "user_id_to_online" => $user_id_to_online]);
    }
    else
    {
        return json_encode(["status" => "error"]);
    }
}

echo get_updates($online, $users_ids);