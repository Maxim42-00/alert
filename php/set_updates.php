<?php

function set_updates($pdo, $my_id, $msg_type, $target_id)
{
    if($msg_type === "comments")
    {
        $post_id = $target_id;
        $post = sql_select_by_id($pdo, "alert_posts", $post_id);
        $user_id = $post["user_id"];
        if($my_id == $user_id)
            return;
        $updates_json = (sql_select_by_id($pdo, "alert_updates", $user_id))["updates"];
        $updates = json_decode($updates_json, true);
        if(isset($updates["comments"]))
            if(in_array($post_id, $updates["comments"]))
                return;
        $updates["comments"][] = $post_id;
        $updates_json = json_encode($updates);
        sql_update_by_id($pdo, "alert_updates", $user_id, ["updates" => $updates_json]);
    }
    if(($msg_type === "followers") || ($msg_type === "friends") || ($msg_type === "news") || ($msg_type === "new_chats") || ($msg_type === "messages") || ($msg_type === "del_message"))
    {
        $updates_json = (sql_select_by_id($pdo, "alert_updates", $my_id))["updates"];
        $updates = json_decode($updates_json, true);
        if(isset($updates[$msg_type]))
            if(in_array($target_id, $updates[$msg_type]))
                return;
        $updates[$msg_type][] = $target_id;
        $updates_json = json_encode($updates);
        sql_update_by_id($pdo, "alert_updates", $my_id, ["updates" => $updates_json]);
    }
}