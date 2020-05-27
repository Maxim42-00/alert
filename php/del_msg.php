<?php

require_once "sql.php";
require_once "is_auth.php";
require_once "accept_files.php";
require "del_files.php";
require_once "msg_is_deletable.php";
require_once "access_allow_origin.php";

$my_id = is_auth();



function del_msg($pdo, $msg_type, $msg_id)
{
    if($msg_type === "posts")
    {
        sql_delete_by_id($pdo, "alert_posts", $msg_id);
        $comments = sql_select($pdo, "alert_comments", "post_id", $msg_id);
        foreach($comments as $comment)
        {
            del_msg($pdo, "comments", $comment["id"]);
        }
    }
    
    if($msg_type === "comments")
    {
        $files = [];
        $msg = sql_select_by_id($pdo, "alert_" . $msg_type, $msg_id);

        del_files($pdo, $msg);        

        sql_delete($pdo, "alert_comments", "id", $msg_id);
    }
}



if($my_id)
{
    $msg_id = $_POST["id"];
    $msg_type = $_POST["type"];
    $pdo = sql_create_pdo();
    $msg = sql_select_by_id($pdo, "alert_" . $msg_type, $msg_id);

    if(msg_is_deletable($pdo, $msg, $msg_type, $my_id))
    {
        del_msg($pdo, $msg_type, $msg_id);
        echo json_encode(["status" => "ok"]);
    }
    else echo json_encode(["status" => "error"]);
}
else
{
    echo json_encode(["status" => "error"]);
}