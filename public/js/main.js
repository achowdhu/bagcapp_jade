jQuery(function($) {
    'use strict';
    $(document).ready(function() {;
        //Initiat WOW JS
        var wow = new WOW({
            boxClass: 'wow', // default
            animateClass: 'animated', // default
            offset: 0, // default
            mobile: false,
            live: true // default
        })
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
        //$('.accordion-toggle').on('click', function() {
        $('.panel-heading').on('click', function() {
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



        $(window).scroll(function(event) {
            var hash = window.location.hash;
            if (hash) {
                var sectionName = "#nav_" + hash.substr(1);
                //console.log(sectionName);
                //console.log($(sectionName));
                $('.nav.navbar-nav li.active:not(.dropdown)').removeClass('active');
                $(sectionName).addClass('active');
            }
        });
        
    });
});
