/* eslint-disable no-undef */
// Shorthand for $( document ).ready()
$(()=> {

    // Create a comment modal
    $("#comment-modal").on("show.bs.modal", function (event) {
        const button = $(event.relatedTarget);
        const articleId = button.data("articleid");
        const articleTitle = button.data("title");
        const modal = $(this);
        modal.find(".modal-title").text(articleTitle);
        modal.find("#commentBtn").val(articleId);
    });

    // Click event for submitting the new comment to Database
    $("#commentBtn").on("click", event => {
        event.preventDefault();
        //grabs the article ID stored in the value of the button clicked
        const articleId = $("#commentBtn").val();
        //Check if there is any text in the textarea input alert if there is not
        if(!$("#comment-text").val().trim()) {
            $("#comment-alert").removeClass("d-none");
        }
        else {
            $("#comment-alert").addClass("d-none");
        // If there is any text in the text area create the comment and make the POST request
            const newComment = {
                text: $("#comment-text").val().trim()
            }
            $.post("/api/article/create/comment/" + articleId , newComment).then(() => $(location).attr("href", "/commented"));
        }
    });
    //view all comments modal
    $("#view-comments-modal").on("show.bs.modal", function (event) {
        const button = $(event.relatedTarget);
        const articleId = button.data("articleid");
        const articleTitle = button.data("title");
        // Ajax Get to grab all comments for this article to show in modal body
        $.get("/api/article/get/all/comments/"+ articleId , (articleComments) => {
            $("#comments-box").empty();
        
            articleComments.comments.forEach(comment => {
                let listComment = $("<li>").html(`<p title="Click the trash icon to delete comment.">
                <button title="Delete comment" type="button" data-commentid="${comment._id}"
                data-articleid="${articleId}" class="delete-comment badge badge-danger">
                <i class="fas fa-trash-alt"></i></button> ${comment.text} &nbsp;</p>`);
                
                $("#comments-box").append(listComment);
            });
            
        });
        const modal = $(this);
        modal.find("#view-comments-modal-label").text(articleTitle);
        modal.find("#commentBtn").val(articleId);
    });

    $(document).on("click",".delete-comment",function(event){
        event.preventDefault();
        let button = this.dataset;//button holds commentid and articleid
        $.ajax("/api/article/delete/comment/"+ button.articleid , {
            type: "DELETE",
            data: { _id: button.commentid }
        }).then(() => $(location).attr("href", "/commented"));
    });

    $("#wipe-all").on("click", event => {
        event.preventDefault();
        $.ajax("/api/article/delete/all", {
            type: "DELETE"
        }).then(() => $(location).attr("href", "/"));
    });

});