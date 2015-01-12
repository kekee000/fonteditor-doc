/**
 * @file main.js
 * @author mengke01
 * @description
 * 帮助文档入口
 */

define(
    function (require) {

        var AnchorDetect = require('./AnchorDetect');

        var entry = {

            /**
             * 初始化
             */
            init: function () {

                var anchorDetect = new AnchorDetect(window, {
                    selector: 'section[id]',
                    onAnchorChange: function(e) {
                        var anchor = $(e.target).attr('id');
                        var sidebar = $('#sidebar');
                        sidebar.find('.active').removeClass('active');
                        sidebar.find('[href*="#' + anchor + '"]').addClass('active')
                    }
                });

            }
        };

        entry.init();

        return entry;
    }
);