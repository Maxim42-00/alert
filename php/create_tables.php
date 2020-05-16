<?php

require_once "sql.php";

$tables = [
    "alert_users" => [
        "id" => "int(10) AUTO_INCREMENT PRIMARY KEY",
        "name" => "tinytext",
        "surname" => "tinytext",
        "e_mail" => "tinytext",
        "password" => "tinytext"
    ],
    "alert_posts" => [
        "id" => "int(10) AUTO_INCREMENT PRIMARY KEY",
        "user_id" => "int(10)",
        "date" => "tinytext",
        "ip" => "tinytext",
        "text" => "text",
        "files" => "text"
    ],
    "alert_chat_ids" => [
        "id" => "int(10) AUTO_INCREMENT PRIMARY KEY",
        "user_ids_arr_json" => "text"
    ],
    "alert_messages" => [
        "id" => "int(10) AUTO_INCREMENT PRIMARY KEY",
        "user_id" => "int(10)",
        "chat_id" => "int(10)",
        "message_date" => "tinytext",
        "ip" => "tinytext",
        "message_text" => "text",
        "message_files_arr_json" => "text"
    ],
    "alert_user_chats" => [
        "user_id" => "int(10)",
        "chat_ids_arr_json" => "text"
    ],
    "alert_friends" => [
        "user_id" => "int(10)",
        "friend_ids_arr_json" => "text"
    ],
    "alert_changes" => [
        "user_id" => "int(10)",
        "changes_arr_json" => "text"
    ],
    "alert_comments" => [
        "id" => "int(10) AUTO_INCREMENT PRIMARY KEY",
        "user_id" => "int(10)",
        "post_id" => "int(10)",
        "date" => "tinytext",
        "ip" => "tinytext",
        "text" => "text",
        "files" => "text"
    ]
];


$pdo = new PDO("mysql:host=localhost;dbname=test", "root", "", [PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING]);


foreach($tables as $table => $fields)
{
    sql_create_table($pdo, $table, $fields);
}


//sql_insert($pdo, "alert_users", ["null", "max", "mg", "mg42ms1", "123"]);
//print_r(sql_fetch_posts($pdo, 7));
//print_r(sql_fetch_comments($pdo, 1));