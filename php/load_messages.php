<?php

require_once "sql.php";
require_once "is_auth.php";
require_once "accept_files.php";
require_once "get_img_of_user.php";
require_once "msg_is_deletable.php";
require_once "set_updates.php";
require_once "delete_updates.php";
require_once "access_allow_origin.php";

function recall_backtrace($pdo, $recall_json)
{
    if($recall_json === "none")
        return [];
    $recall = json_decode($recall_json, true);

    $type = $recall["type"];
    $id = $recall["id"];

    $recall = sql_select_by_id($pdo, "alert_" . $recall["type"], $recall["id"]);
    if(!$recall)
        return [];
    $user = sql_select_by_id($pdo, "alert_users", $recall["user_id"]);
    $recall["name"] = $user["name"];
    $recall["surname"] = $user["surname"];
    $recall["img"] = get_img_of_user($pdo, $user);
    $recall["files"] = sql_select_by_ids($pdo, "alert_files", json_decode($recall["files"], true));
    $recall["msg_type"] = $type;
    $message["deletable"] = false;

    return array_merge([$recall], recall_backtrace($pdo, $recall["recall"]));
}

function get_recall($pdo, $recall_json)
{
    if($recall_json === "none")
        return "none";
    $recall = json_decode($recall_json, true);

    $type = $recall["type"];

    $recall = sql_select_by_id($pdo, "alert_" . $recall["type"], $recall["id"]);
    if(!$recall)
        return "none";
    $recall["files"] = sql_select_by_ids($pdo, "alert_files", json_decode($recall["files"], true));

    $user = sql_select_by_id($pdo, "alert_users", $recall["user_id"]);
    $recall["name"] = $user["name"];
    $recall["surname"] = $user["surname"];
    $recall["img"] = get_img_of_user($pdo, $user);
    $recall["recall_backtrace"] = recall_backtrace($pdo, $recall["recall"]);
    $recall["msg_type"] = $type;
    $message["deletable"] = false;
    unset($recall["recall"]);
    return $recall;
}

$my_id = is_auth();

if($my_id)
{
    if(isset($_GET["user_id"]))
        $user_id = $_GET["user_id"];

    $msg_type = $_POST["type"];
    if(isset($_POST["text"]))
    {
        $text = $_POST["text"];
    }

    $pdo = sql_create_pdo();
    if(isset($_FILES["files"]))
    {
        $files = accept_files($pdo, $my_id, $_FILES["files"], $msg_type);
    }

    if(isset($_POST["recall"]))
    {
        $recall = $_POST["recall"];
    }


    if(isset($text) || isset($files) || isset($recall))
    {
        $time = "" . time();
        if(!isset($files)) $files = [];
        if(!isset($recall)) $recall = "none";
        if(!isset($text)) $text = " ";
        if($msg_type === "posts")
            $values = ["null", $my_id, $time, $_SERVER["REMOTE_ADDR"], $text, json_encode($files, JSON_UNESCAPED_UNICODE), $recall];
        if($msg_type === "comments")
            $values = ["null", $my_id, $_POST["post_id"], $time, $_SERVER["REMOTE_ADDR"], $text, json_encode($files, JSON_UNESCAPED_UNICODE), $recall];
        sql_insert($pdo, "alert_" . $msg_type, $values);

        if($msg_type === "comments")
            set_updates($pdo, $my_id, $msg_type, $_POST["post_id"]);
    }

    if($msg_type === "posts")
        $messages = sql_fetch_posts($pdo, $user_id);
    if($msg_type === "comments")
    {
        $messages = sql_fetch_comments($pdo, $_POST["post_id"]);
        delete_updates($pdo, $my_id, $msg_type, $_POST["post_id"]);
    }
    foreach($messages as &$message)
    {
        $message["files"] = sql_select_by_ids($pdo, "alert_files", json_decode($message["files"], true));
        $user = sql_select_by_id($pdo, "alert_users", $message["user_id"]);
        $message["name"] = $user["name"];
        $message["surname"] = $user["surname"];
        $message["img"] = get_img_of_user($pdo, $user);
        $message["recall"] = get_recall($pdo, $message["recall"]);
        $message["msg_type"] = $msg_type;
        $message["deletable"] = msg_is_deletable($pdo, $message, $msg_type, $my_id);
    }

    
    echo json_encode(["status" => "ok", "data" => $messages]);

}
else
{
    echo json_encode(["status" => "error"]);
}