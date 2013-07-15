<?php 
echo "La ruta es: "; 
$path = ereg_replace ("\\\\","/",__FILE__); 
$path = dirname ($path); 
$path = trim($path); 
echo "$path"; 
?> 