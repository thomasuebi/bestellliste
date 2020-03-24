<?php
$data = json_decode('{
   "data":[
      {
         "name":"Margharita",
         "gesamtpreis":"35.40",
         "stückzahl":"6"
      }
   ],
   "formId":"test"
}');
// $data = json_decode($_POST['data']);
var_dump($data);

?>