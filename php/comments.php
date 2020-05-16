<?php

require_once "sql.php";
require_once "is_auth.php";
require_once "accept_files.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

$id = is_auth();


if($id)
{
    if(isset($_POST["text"]))
    {
        $text = $_POST["text"];
    }
    if(isset($_FILES["files"]))
    {
        $files = accept_files($_FILES["files"]);
    }
    $post_id = $_POST["post_id"];
    $pdo = sql_create_pdo();
    if(isset($text) || isset($files))
    {
        $time = "" . time();
        if(!isset($files)) $files = [];
        $values = ["null", $id, $post_id, $time, $_SERVER["REMOTE_ADDR"], $text, json_encode($files, JSON_UNESCAPED_UNICODE)];
        sql_insert($pdo, "alert_comments", $values);
    }
    $comments = sql_fetch_comments($pdo, $post_id);
    foreach($comments as &$comment)
    {
        $comment["files"] = json_decode($comment["files"], true);
    }
    
    echo json_encode(["status" => "ok", "data" => $comments]);
}
else
{
    echo json_encode(["status" => "error"]);
}
