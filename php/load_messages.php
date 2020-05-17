<?php

require_once "sql.php";
require_once "is_auth.php";
require_once "accept_files.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

$id = is_auth();

if($id)
{
    $msg_type = $_POST["type"];
    if(isset($_POST["text"]))
    {
        $text = $_POST["text"];
    }

    $pdo = sql_create_pdo();
    if(isset($_FILES["files"]))
    {
        $files = accept_files($pdo, $id, $_FILES["files"], $msg_type);
    }

    if(isset($text) || isset($files))
    {
        $time = "" . time();
        if(!isset($files)) $files = [];
        if($msg_type === "posts")
            $values = ["null", $id, $time, $_SERVER["REMOTE_ADDR"], $text, json_encode($files, JSON_UNESCAPED_UNICODE)];
        if($msg_type === "comments")
            $values = ["null", $id, $_POST["post_id"], $time, $_SERVER["REMOTE_ADDR"], $text, json_encode($files, JSON_UNESCAPED_UNICODE)];
        sql_insert($pdo, "alert_" . $msg_type, $values);
    }

    if($msg_type === "posts")
        $messages = sql_fetch_posts($pdo, $id);
    if($msg_type === "comments")
        $messages = sql_fetch_comments($pdo, $_POST["post_id"]);
    foreach($messages as &$message)
    {
        $message["files"] = sql_select_by_ids($pdo, "alert_files", json_decode($message["files"], true));
    }

    
    echo json_encode(["status" => "ok", "data" => $messages]);

}
else
{
    echo json_encode(["status" => "error"]);
}