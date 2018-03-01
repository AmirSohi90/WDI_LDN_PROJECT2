$(document).ready(function(){


  // if star{number} is cicked, change the value of the input to {number}
  const $ratingValue = $('.ratingValue');
  const $stars = $('[name=rating]');

  $stars.change(function(e) {
    $ratingValue.val($(e.target).val());
  });

});
