<?php

require_once "sql.php";
require_once "is_auth.php";
require_once "accept_files.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

$id = is_auth();

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
        $files_ids = json_decode($msg["files"], true);

        $files = sql_select_by_ids($pdo, "alert_files", $files_ids);

        foreach($files as $file)
        {
            $file_basename = basename($file["url"]);
            $file_name = "./files/" . $file_basename;
            if(file_exists($file_name))
            {
                unlink($file_name);
            }
        }

        sql_delete_by_ids($pdo, "alert_files", $files_ids);
        sql_delete($pdo, "alert_comments", "id", $msg_id);
    }
}



if($id)
{
    $msg_id = $_POST["id"];
    $msg_type = $_POST["type"];
    $pdo = sql_create_pdo();
    $msg = sql_select_by_id($pdo, "alert_" . $msg_type, $msg_id);

    if($id === $msg["user_id"])
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