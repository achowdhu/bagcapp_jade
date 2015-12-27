jQuery(function($) {
    'use strict';
    $(document).ready(function() {;
        //Initiat WOW JS
        var wow = new WOW();
        wow.init();
        $("[rel^='prettyPhoto']").prettyPhoto({
            deeplinking: false,
            social_tools: false
        });
        // $("body").scrollspy({
        //     target: "#bagcnav",
        //     offset="0"
        // });

        // accordian
        $('.accordion-toggle').on('click', function() {
            $(this).closest('.panel-group').children().each(function() {
                $(this).find('>.panel-heading').removeClass('active');
            });

            $(this).closest('.panel-heading').toggleClass('active');
        });

        //For changing active class for navigation
        $('.nav.navbar-nav li').click(function(e) {
            $('.nav.navbar-nav li.active').removeClass('active');
            var $this = $(this);
            if (!$this.hasClass('active')) {
                $this.addClass('active');
            }
        });
    });
});
