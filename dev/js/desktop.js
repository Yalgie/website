$(function() {
	var $folders = $(".fa-folder").parent();
	var $room = $(".room");
	var $screen = $(".screen");
	var $logo = $(".logo");
	var $logoMenu = $(".logo-menu");
	var $shutdown = $('.shutdown');
	var $monitor = $(".monitor");
	var $login = $(".login");
	var $loginOverlay = $(".login-overlay");
	var $close = $(".close-explorer");
	var $apps = $(".apps");
    var $login = $(".login-overlay");
    var $wallpaper = $(".wallpaper");
    var $info = $(".info");
    var $grid = $(".screenGrid");
    var $send = $(".contact-submit");
    var $noise = $(".noise");

	var $trash = $(".trash");
	var $trashExplorer = $(".explorer-window.trash-explorer");

	var $about = $(".about");
	var $aboutExplorer = $(".explorer-window.about-explorer");

	var $work = $(".work");
	var $workExplorer = $(".explorer-window.work-explorer");

	var $contact = $(".contact");
	var $contactExplorer = $(".explorer-window.contact-explorer");

	var $awards = $(".fa-trophy");
	var $awardsExplorer = $(".explorer-window.awards-explorer");

	function bindExplorer($explorer) {
		$explorer.addClass("visible")
		$explorer.fadeIn()
		$explorer.focus()
		$explorer.css("transform", "scale(1)");

		$explorer.draggable({
			handle: ".window-header",
			containment: "parent",
			minHeight: 50,
			start: function() {
				$explorer.focus()
			}
		});

		if (!$explorer.hasClass("spotify-explorer")) {
			$explorer.resizable({
				containment: "parent",
				minHeight: 400,
				minWidth: 500,
				start: function() {
					window.jqueryResizeActive = true;
				},
				resize: function() {
					if ($(this).hasClass("work-explorer")) {
						checkWorkApps($explorer);
					}
					if ($(this).hasClass("awards-explorer")) {
						checkAwardsApps($explorer);
					}
					checkExplorerFlex()
				},
				stop: function() {
					window.jqueryResizeActive = false;
				}
			});
		}

		checkExplorerFlex()
	}

	function checkExplorerFlex($explorer) {
		$(".explorer-window").each(function() {
			if ($(this).hasClass("visible")) {
				var $windowBody = $(this).find(".window-body");
				var height = $windowBody[0].clientHeight
				var scrollHeight = $windowBody[0].scrollHeight

				if (scrollHeight > height) {
					$windowBody.addClass("block-override");
				}
				else {
					$windowBody.removeClass("block-override");
				}
			}
		})
	}

	function unbindExplorer($explorer) {
		$explorer.removeClass("visible")
		$explorer.css("transform", "scale(0.8)");
		$explorer.fadeOut(500);
		$explorer.draggable("destroy");

		if (!$explorer.hasClass("spotify-explorer")) {
			$explorer.resizable("destroy");
		}
	}

	function checkWorkApps($explorer) {
		var $items = $(".work-item");

		if ($explorer.width() > 600 && $explorer.width() < 800) {
			$items.css('width', 'calc(50% - 30px)')
		}
		else if ($explorer.width() > 800 && $explorer.width() < 1200) {
			$items.css('width', 'calc(33.33% - 30px)')
		}
		else if ($explorer.width() > 1200) {
			$items.css('width', 'calc(20% - 30px)')
		}
	}

	function checkAwardsApps($explorer) {
		var $items = $(".award-item");

		if ($explorer.width() > 600 && $explorer.width() < 800) {
			$items.css('width', 'calc(50% - 30px)')
		}
		else if ($explorer.width() > 800 && $explorer.width() < 1200) {
			$items.css('width', 'calc(33.33% - 30px)')
		}
		else if ($explorer.width() > 1200) {
			$items.css('width', 'calc(20% - 30px)')
		}
	}

	$trash.on("click", function() {
		bindExplorer($trashExplorer);
	})

	$about.on("click", function() {
		bindExplorer($aboutExplorer);
	}) 

	$work.on("click", function() {
		checkWorkApps($workExplorer);
		bindExplorer($workExplorer);
	}) 

	$awards.on("click", function() {
		checkAwardsApps($awardsExplorer);
		bindExplorer($awardsExplorer);
	}) 

	$close.on("click", function() {
		var $explorer = $(this).parents(".explorer-window");
		unbindExplorer($explorer)
	})

	$logo.on("click", function() {
		if ($logoMenu.hasClass("open")) {
			$logoMenu.animate({left: "-200px"});
			$logoMenu.removeClass("open");
		}
		else {
			$logoMenu.animate({left: "5"});
			$logoMenu.addClass("open");
		}
	})

	$shutdown.on("click", function() {
		var delay = 0;

		$(".explorer-window").each(function() {
			if ($(this).hasClass("visible")) {
				unbindExplorer($(this))
				delay = 500;
			}
		})

		setTimeout(function() {
			$screen.removeClass("zoom");
			$room.removeClass("zoom-out");
	        $apps.fadeOut(500)
	        $info.fadeOut(500)
	        $noise.fadeOut(500)
	        $grid.fadeOut(500, function() {
	        	$screen.hide()
	        })
        }, delay)
	})

	$login.on("click", function() {
		$loginOverlay.addClass("zoom");
		$loginOverlay.fadeOut(500);
		$apps.fadeIn()
	    $info.fadeIn()
	});

	$(window).on("resize", function() {
		checkExplorerFlex()
	})
})