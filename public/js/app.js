// Shorthand for $( document ).ready()
$(()=> {

    $('#commentModal').on('show.bs.modal', function (event) {
        // Button that triggered the modal
        const button = $(event.relatedTarget);
        // Extract info from data-* attributes This will be the article ID to attach the comment to
        const articleId = button.data('articleid');
        const articleTitle = button.data('title');

        const modal = $(this);
        modal.find('.modal-title').text(articleTitle);
        modal.find('#commentBtn').val(articleId);
    });

});