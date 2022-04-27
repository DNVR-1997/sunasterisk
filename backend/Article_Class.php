<?php
require_once('dbconnection.php');


if (isset($_POST['saveNewArticle'])) {

    try {
        $title = $_POST['title'];
        $content = $_POST['content'];

        $conn = openDBconnection();
        $query = $conn->prepare("INSERT INTO articles (article_title, article_content,article_date_created,article_vote) VALUES (?,?,?,0)");
        $query->execute([$title, $content, date('Y-m-d')]);
        echo "Success";
    } catch (Exception $ex) {
        echo 'Error: ' . $ex->getMessage();
    }
}
if (isset($_POST['updateArticle'])) {

    try {
        $title = $_POST['title'];
        $content = $_POST['content'];
        $ID = $_POST['id'];

        $conn = openDBconnection();
        $query = $conn->prepare("UPDATE  articles SET article_title=?, article_content=?) WHERE articleID=?");
        $query->execute([$title, $content, $ID]);
        echo "Success";
    } catch (Exception $ex) {
        echo 'Error: ' . $ex->getMessage();
    }
}
if (isset($_POST['fetchAllArticles'])) {

    try {
        $conn = openDBconnection();
        $query = $conn->prepare("SELECT * FROM articles ORDER BY articleID DESC");
        $query->execute();
        $articles = $query->fetchAll();
        echo json_encode($articles);
    } catch (Exception $ex) {
        echo 'Error: ' . $ex->getMessage();
    }
}
if (isset($_POST['deleteArticle'])) {

    try {
        $id = $_POST['id'];

        $conn = openDBconnection();
        $query = $conn->prepare("DELETE FROM articles WHERE  articleID=?");
        $query->execute([$id]);
        echo "Success";
    } catch (Exception $ex) {
        echo 'Error: ' . $ex->getMessage();
    }
}
if (isset($_POST['getArticleDdetails'])) {

    try {
        $id = $_POST['id'];
        $conn = openDBconnection();
        $query = $conn->prepare("SELECT * FROM articles where articleID=?");
        $query->execute([$id]);
        $articles = $query->fetchAll();
        echo json_encode($articles);
    } catch (Exception $ex) {
        echo 'Error: ' . $ex->getMessage();
    }
}
