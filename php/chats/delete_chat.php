<?php

require_once "../access_allow_origin.php";
require_once "../sql.php";
require_once "../is_auth.php";
require_once "../array_to_list.php";

$my_id = is_auth();

if($my_id)
{
    $pdo = sql_create_pdo();

    $chat_id = $_POST["chat_id"];

    $chat = sql_select_by_id($pdo, "alert_chats", $chat_id);
    if(!$chat)
    {
        echo json_encode(["status" => "chat_not_found"]);
        exit();
    }
    if($chat["user_id"] != $my_id)
    {
        echo json_encode(["status" => "not_your_chat"]);
        exit();
    }

    $participants = json_decode($chat["participants"], true);
    $inviters = json_decode($chat["inviters"], true);
    $users = array_merge($participants, $inviters);

    $my_chats_records = sql_select_by_ids($pdo, "alert_my_chats", "id", $users);
    foreach($my_chats_records as &$my_chat_record)
    {
        $my_chats = json_decode($my_chat_record["chats"], true);
        $key = array_search($chat_id, $my_chats);
        if($key === false)
            continue;
        unset($my_chats[$key]);
        $my_chats = array_to_list($my_chats);
        sql_update_by_id($pdo, "alert_my_chats", $my_chat_record["id"], ["chats" => json_encode($my_chats)]);
    }
    sql_delete_by_id($pdo, "alert_chats", $chat_id);
    
    echo json_encode(["status" => "ok"]);
}
else
{
    echo json_encode(["status" => "error"]);
}