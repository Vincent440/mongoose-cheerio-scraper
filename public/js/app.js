// Shorthand for $( document ).ready()
$(()=> {
    // Submitting a new comment to db button
    $("#commentBtn").on("click", event => {
        event.preventDefault();

        //grabs the article ID stored in the value of the button clicked
        let articleId = $("#commentBtn").val();

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
            $.post("/api/article/create/comment/" + articleId , newComment).then(response => {
                console.log(response);
                debugger;
                $(location).attr('href', '/commented');
            });
        }
    });

    //Leave a comment modal
    $('#comment-modal').on('show.bs.modal', function (event) {
        // Button that triggered the modal
        const button = $(event.relatedTarget);

        // Extract data-* from attributes This will be the article ID to attach the comment to
        const articleId = button.data('articleid');
        const articleTitle = button.data('title');

        const modal = $(this);
        modal.find('.modal-title').text(articleTitle);
        modal.find('#commentBtn').val(articleId);
    });

    //view all comments modal
    $('#view-comments-modal').on('show.bs.modal', function (event) {
        // Button that triggered the modal
        const button = $(event.relatedTarget);
        // Extract info from data-* attributes This will be the article ID to attach the comment to
        const articleId = button.data('articleid');
        const articleTitle = button.data('title');

        // Ajax Get to grab all comments for this article to show in modal body
        $.get("/api/article/comments/"+ articleId , (articleComments) => {
            console.log(articleComments);
        });

        const modal = $(this);
        modal.find('#view-comments-modal-label').text(articleTitle);
        modal.find('#commentBtn').val(articleId);
    });
});