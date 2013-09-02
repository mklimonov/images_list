1. Place this in .htaccess
RewriteEngine on 

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

RewriteRule ^(.*)$ index.php [L]

2. Db settings in include/model.php
