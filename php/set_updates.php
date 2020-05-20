<?php

function set_updates($pdo, $msg_type, $target_id)
{
    if($msg_type === "comments")
    {
        $post_id = $target_id;
        $post = sql_select_by_id($pdo, "alert_posts", $post_id);
        $user_id = $post["user_id"];
        $updates_json = (sql_select_by_id($pdo, "alert_updates", $user_id))["updates"];
        $updates = json_decode($updates_json, true);
        $updates["comments"][0] = ["post_id" => $post_id];
        $updates_json = json_encode($updates);
        sql_update_by_id($pdo, "alert_updates", $user_id, ["updates" => $updates_json]);
    }
}