<?php

function print_r_txt($file, $arr)
{
    $reg_in = '/(\\n)+/';
    $reg_out = PHP_EOL;
    $res = preg_replace($reg_in, $reg_out, print_r($arr, true));
    file_put_contents($file, $res);
}