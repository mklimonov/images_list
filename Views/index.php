<h1>Images List</h1>
<ul>
    <?php foreach ($images as $img) : ?>
        <li>
            <img src="<?print $img['img_name']?>">
            <a href="/paint/edit/<?php print $img['id']?>">Edit</a>
            <a href="/paint/del/<?php print $img['id']?>">Delete</a>
        </li>
    <?php endforeach;?>
</ul>