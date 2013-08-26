<h1>Images List</h1>
<ul>
    <?php foreach ($images as $img) : ?>
        <li><img src="<?print $img['img_name']?>"></li>
    <?php endforeach;?>
</ul>