<?php

function accept_files($files)
{
    $host = "http://localhost/alert/php/files/";
    for($i=0; $i<count(($files)["error"]); $i++)
    {
        if($files["error"][$i] === 0 && $files["size"][$i]>0)
        {
            move_uploaded_file($files["tmp_name"][$i], "./files/" . $files["name"][$i]);
            $file_url = $host . $files["name"][$i];
            $file_type =  $files["type"][$i];
            $input_files[] = ["url" => $file_url, "type" => $file_type];
        }
    }
    return $input_files;
}