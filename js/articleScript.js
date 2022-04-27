let articleTitle = "";
let articleContent = "";
let saveMode = "";
let getArticleID = "";
let backendURL = "./backend/Article_Class.php";
fetchAllArticles();
$(document).on("click", "#btnSaveArticle", function (e) {
  e.preventDefault();
  articleTitle = $("#articleTitle").val();
  articleContent = $("#articleContent").val();

  if (articleTitle == "" || articleContent == "") {
    alert("Please enter article title and content");
  } else {
    if (saveMode == "ADD") {
      $.ajax({
        type: "POST",
        url: backendURL,
        data: {
          saveNewArticle: "submit",
          title: articleTitle,
          content: articleContent,
        },
        success: function (response) {
          if (response.trim() == "Success") {
            // $("#articleModal").modal("hide");
            fetchAllArticles();
          }
        },
      });
    } else {
      $.ajax({
        type: "POST",
        url: backendURL,
        data: {
          updateArticle: "submit",
          title: articleTitle,
          content: articleContent,
          id: getArticleID,
        },
        success: function (response) {
          if (response.trim() == "Success") {
            // $("#articleModal").modal("hide");
            fetchAllArticles();
          }
        },
      });
    }
  }
});

function fetchAllArticles() {
  try {
    $.ajax({
      type: "POST",
      url: backendURL,
      data: {
        fetchAllArticles: "submit",
      },
      dataType: "JSON",
      success: function (response) {
        var HTML = "";
        if (response.length > 0) {
          response.forEach((element) => {
            HTML += `<tr class="articleRow">`;
            HTML += `<input type="hidden" name="" id="articleRowID" value="${element.articleID}">`;
            HTML += `<td>${element.articleID}</td>`;
            HTML += `<td>${element.article_title}</td>`;
            HTML += `<td>${element.article_content}</td>`;
            HTML += `<td><span></span></td>`;
            HTML += `<td><button class="btn btn-success btnEditArticle" data-toggle="modal" data-target="#articleModal">Edit</button>`;
            HTML += `    <button class="btn btn-danger btnDeleteArticle">Delete</button>`;
            HTML += `</td>`;
            HTML += `</tr>`;
          });
          $(".tbl_ARTICLES").html("" + HTML + "");
        } else {
        }
      },
    });
  } catch (error) {
    alert("Error fetching articles: " + error.toString());
  }
}

// this is to delete article
$(document).on("click", ".btnDeleteArticle", function (e) {
  e.preventDefault();
  let getRow = $(this).closest(".articleRow");
  getArticleID = getRow.find("#articleRowID").val();
  let msg = confirm("Continue delete?");

  if (msg) {
    $.ajax({
      type: "POST",
      url: backendURL,
      data: {
        deleteArticle: "submit",
        id: getArticleID,
      },
      success: function (response) {
        if (response.trim() == "Success") {
          fetchAllArticles();
          alert("Article deleted");
        }
      },
    });
  }
});
$(document).on("click", ".btnEditArticle", function (e) {
  e.preventDefault();
  let getRow = $(this).closest(".articleRow");
  getArticleID = getRow.find("#articleRowID").val();
  saveMode = "UPDATE";
  $.ajax({
    type: "POST",
    url: backendURL,
    dataType: "JSON",
    data: {
      getArticleDdetails: "submit",
      id: getArticleID,
    },
    success: function (response) {
      console.log(response);
      $("#articleTitle").val(response[0]["article_title"]);
      $("#articleContent").val(response[0]["article_content"]);
    },
  });
});
$(document).on("click", ".btnNew", function (e) {
  e.preventDefault();
  saveMode = "ADD";
});
