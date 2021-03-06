/**
 * jquery.ninepart.js
 * @author: Daniel Fone
 * @copyright: F1 Techware Ltd, 2009
 *
 * Load a nine part image. Images loaded will
 * be 'bg-all.png', 'bg-mid.png', 'bg-sides.png'
 * and 'bg-ends.png'.
 * Border and margin sizes are derived from the
 * child element's CSS.
 */
(function($){
  jQuery.ninePartPreload = function(imgPath){
    var parts, img, imgSrc;
    parts = ['all', 'ends', 'mid', 'sides'];
    document.write('<div class="slice preload" style="display:none">');
    for ( var i in parts ){
      imgSrc = imgPath.replace('%', parts[i]);
      img = '<img style="display:none" src="'+imgSrc+'">';
      document.write(img);
    }
    document.write('</div>');
  };
  
  jQuery.fn.ninePartImage = function(imgPath){
    var grid_x = ['slice_left', 'slice_center', 'slice_right'];
    var grid_y = ['slice_top', 'slice_middle', 'slice_bottom'];
    
    $(this).each(function(){
      var $this = $(this);
      
      // Wrap our target in a skeletal table
      var skel = '<table class="slice_container" cellspacing="0" cellpadding="0"><tr class="slice_row"><td class="slice_cell"></td></tr></table>';
      $this.wrap(skel);
      var jSliced = $this.parents('.slice_container');
      
      // Flesh out our nine-part table
      var hRow = '<tr class="slice_row"></tr>';
      var hCell = '<td class="slice_cell"></td>';
      jSliced.find('.slice_cell').before(hCell).after(hCell);
      jSliced.append($(hRow).append(hCell).append(hCell).append(hCell));
      jSliced.prepend($(hRow).append(hCell).append(hCell).append(hCell));
      
      // Classify our cells
      for ( var y in grid_y ){
        var $row = jSliced.find('.slice_row:eq('+y+')');
        for ( var x in grid_x){
          $row.find('.slice_cell:eq('+x+')').addClass(grid_y[y]+' '+grid_x[x]);
        }
      }
      // Make sure our table is styled like the element it's mimicking
      var tableWidth = (
        $(this).innerWidth() +
        parseInt($(this).css('border-right-width'), 10) +
        parseInt($(this).css('border-left-width'), 10)
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
    });
  };
  
  /**
   * A convenient way to style our resulting grid
   */
  jQuery.fn.ninePartCSS = function(css){
    $(this).parents('table.slice_container').css(css);
  };
})(jQuery);