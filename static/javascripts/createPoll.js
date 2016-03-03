function createPoll() {
  $("#create-poll").on("click", function() {
    var title = $('#poll-title').val()
    var responses = $('.poll-responses').val()
    debugger;
    // $.ajax({
    //   type: "POST",
    //   url: "/api/v1/polls?title="+title+"&responses="+responses,
    //   success: function(newPoll){
    //     renderPoll(newPoll)
    //     $("#poll-title").val("");
    //     $("#poll-description").val("");
    //   },
    //   error: function(xhr) {
    //     console.log(xhr.responseText)
    //   }
    // })
  })
}
