/**
 * jquery.ninepart.js
 * @author: Daniel Fone
 * @copyright: F1 Techware Ltd, 2009
 *
 * Example:
 *   $('li').ninePartImage('border-%.png', 8);
 *       - The '%' in the image path will be replaced with 'all', 'mid', 'sides' and 'ends'
 *       - The 8 stipluates the border is 8px wide
 */
(function($){
  jQuery.fn.ninePartImage = function(imgPath){
    var grid_x = ['slice_left', 'slice_center', 'slice_right'];
    var grid_y = ['slice_top', 'slice_middle', 'slice_bottom'];
    
    $(this).each(function(){
      // Create our slice_-part table
      var jSliced = $('<table class="slice_container" cellspacing="0" cellpadding="0"></table>');
      for ( var y in grid_y ){
        var jRow = $('<tr class="slice_row"></tr>');
        for ( var x in grid_x){
          var jCell = $('<td class="slice_cell '+grid_y[y]+' '+grid_x[x]+'"></td>');
          jRow.append(jCell);
        }
        jSliced.append(jRow);
      }
      // Make sure our table is styled like the element it's mimicking
      var tableWidth = (
        $(this).innerWidth() +
        parseInt($(this).css('border-right-width')) +
        parseInt($(this).css('border-left-width'))
      ) + 'px';
      jSliced.css({
        display:      $(this).css('display'),
        marginTop:    $(this).css('marginTop'),
        marginRight:  $(this).css('marginRight'),
        marginBottom: $(this).css('marginBottom'),
        marginLeft:   $(this).css('marginLeft'),
        width:        tableWidth
      });
      // Style our table to be border-like
      jSliced.find('.slice_left'  ).css({width:  $(this).css('border-left-width')});
      jSliced.find('.slice_right' ).css({width:  $(this).css('border-right-width')});
      jSliced.find('.slice_top'   ).css({height: $(this).css('border-top-width')});
      jSliced.find('.slice_bottom').css({height: $(this).css('border-bottom-width')});
      jSliced.find('.slice_top.slice_left'     ).css({background: 'url('+imgPath.replace('%', 'all')+') no-repeat 0 0'});
      jSliced.find('.slice_top.slice_center'   ).css({background: 'url('+imgPath.replace('%', 'ends')+') repeat-x' });
      jSliced.find('.slice_top.slice_right'    ).css({background: 'url('+imgPath.replace('%', 'all')+') no-repeat 100% 0'});
      jSliced.find('.slice_middle.slice_left'  ).css({background: 'url('+imgPath.replace('%', 'sides')+') repeat-y' });
      jSliced.find('.slice_middle.slice_center').css({background: 'url('+imgPath.replace('%', 'mid')+') repeat'});
      jSliced.find('.slice_middle.slice_right' ).css({background: 'url('+imgPath.replace('%', 'sides')+') repeat-y 100%' });
      jSliced.find('.slice_bottom.slice_left'  ).css({background: 'url('+imgPath.replace('%', 'all')+') no-repeat 0 100%'});
      jSliced.find('.slice_bottom.slice_center').css({background: 'url('+imgPath.replace('%', 'ends')+') repeat-x 0 100%' });
      jSliced.find('.slice_bottom.slice_right' ).css({background: 'url('+imgPath.replace('%', 'all')+') no-repeat 100% 100%'});
      // Remove unwanted styles from our target element
      $(this).css({
        border: 'none',
        margin: '0',
        position: 'static',
        background: 'transparent'
      });
      // Apply table
      jSliced.find('.slice_center.slice_middle').append($(this).clone(true));
      $(this).replaceWith(jSliced);
    });
  };
  
  jQuery.fn.ninePartCSS = function(css){
    $(this).parents('table.slice_container').css(css);
  }
})(jQuery);