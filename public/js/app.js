// Shorthand for $( document ).ready()
$(()=> {



    //place a new comment button
    $("#commentBtn").on("click", function(event) {
        event.preventDefault;
        console.log("Comment Button clicked, Placing comment");

    })

    //Leave a comment modal
    $('#comment-modal').on('show.bs.modal', function (event) {
        // Button that triggered the modal
        const button = $(event.relatedTarget);
        // Extract info from data-* attributes This will be the article ID to attach the comment to
        const articleId = button.data('articleid');
        const articleTitle = button.data('title');

        const modal = $(this);
        modal.find('.modal-title').text(articleTitle);
        modal.find('#commentBtn').val(articleId);
    });


    //view all comments modal
    //this modal will need a button on each comment 
    $('#view-comments-modal').on('show.bs.modal', function (event) {
        // Button that triggered the modal
        const button = $(event.relatedTarget);
        // Extract info from data-* attributes This will be the article ID to attach the comment to
        const articleId = button.data('articleid');
        const articleTitle = button.data('title');

        const modal = $(this);
        modal.find('#view-comments-modal-label').text(articleTitle);
        modal.find('#commentBtn').val(articleId);
    });

});