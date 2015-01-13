/**
 * @file main.js
 * @author mengke01
 * @description
 * 帮助文档入口
 */

define(
    function (require) {

        var AnchorDetect = require('./ui/AnchorDetect');
        var scrollTo = require('./ui/scrollTo');

        var entry = {

            /**
             * 初始化
             */
            init: function () {
                var sidebar = $('#sidebar');
                var anchorDetect = new AnchorDetect(window, {
                    selector: 'section[data-anchor]',
                    anchorOffset: -71,
                    onAnchorChange: function(e) {
                        sidebar.find('.active').removeClass('active');
                        sidebar.find('[href*="#' + e.anchor + '"]').addClass('active')
                    }
                });

                var scrollToAnchor = function(anchor) {
                    var ctlAnchor;
                    if (anchor && (ctlAnchor = $('[data-anchor="' + anchor + '"]')).length) {

                        anchorDetect.stop();
                        scrollTo(ctlAnchor, {
                            top: -70,
                            onFinish: function() {
                                location.hash = anchor;
                                sidebar.find('.active').removeClass('active');
                                sidebar.find('[href*="#' + anchor + '"]').addClass('active')
                                anchorDetect.start();
                            }
                        });
                    }
                }

                sidebar.on('click', '[href]', function(e) {
                    e.preventDefault();
                    var hash = this.href.slice(this.href.lastIndexOf('#') + 1);
                    hash && scrollToAnchor(hash);
                });

                $(window).on('load', function() {
                    anchorDetect.refresh();
                    if (location.hash) {
                        scrollToAnchor(location.hash.slice(1));
                    }
                });
            }
        };

        entry.init();

        return entry;
    }
);