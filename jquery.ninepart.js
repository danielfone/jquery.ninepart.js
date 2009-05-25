/**
 * jquery.ninepart.js
 * @author: Daniel Fone
 * @copyright: F1 Techware Ltd, 2009
 *
 * Example:
 *   $('li').ninePartImage('border-%.png', 8);
 *       - The '%' in the image path will be replaced with tl, tc, tr, ml, mc, mr, bl, bc and br,
 *         representing combinations of top, middle, bottom, left, center and right
 *       - The 8 stipluates the border is 8px wide
 */
(function($){
  jQuery.fn.ninePartImage = function(imgPath, borderSize){
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
      jSliced.css({
        display:      $(this).css('display'),
        cssFloat:     $(this).css('float'),
        marginTop:    $(this).css('marginTop'),
        marginRight:  $(this).css('marginRight'),
        marginBottom: $(this).css('marginBottom'),
        marginLeft:   $(this).css('marginLeft')
      });
      $(this).css({
        border: 'none',
        margin: '0'
      });
      // Style our table to be a border
      var sizePx = borderSize+'px';
      var widthPx  = $(this).innerWidth()+'px';
      var heightPx = $(this).innerHeight()+'px';
      jSliced.find('.slice_cell').css({height: sizePx, width: sizePx});
      jSliced.find('.slice_top.slice_left'     ).css({background: 'url('+imgPath.replace('%', 'tl')+') no-repeat'});
      jSliced.find('.slice_top.slice_center'   ).css({background: 'url('+imgPath.replace('%', 'tc')+') repeat-x' });
      jSliced.find('.slice_top.slice_right'    ).css({background: 'url('+imgPath.replace('%', 'tr')+') no-repeat'});
      jSliced.find('.slice_middle.slice_left'  ).css({background: 'url('+imgPath.replace('%', 'ml')+') repeat-y' });
      jSliced.find('.slice_middle.slice_center').css({background: 'url('+imgPath.replace('%', 'mc')+') repeat', height: heightPx, width: widthPx});
      jSliced.find('.slice_middle.slice_right' ).css({background: 'url('+imgPath.replace('%', 'mr')+') repeat-y' });
      jSliced.find('.slice_bottom.slice_left'  ).css({background: 'url('+imgPath.replace('%', 'bl')+') no-repeat'});
      jSliced.find('.slice_bottom.slice_center').css({background: 'url('+imgPath.replace('%', 'bc')+') repeat-x' });
      jSliced.find('.slice_bottom.slice_right' ).css({background: 'url('+imgPath.replace('%', 'br')+') no-repeat'});
      jSliced.find('.slice_center.slice_middle').append($(this).clone(true));
      $(this).replaceWith(jSliced);
    });
    
  };
})(jQuery);