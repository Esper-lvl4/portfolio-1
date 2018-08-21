'use strict'

const port_navi = $('#port_navi > button');

for (var j = 0; j <= 3; j++) {
	$(port_navi[j]).on("click", event => {
		var imgs = $('#portfolio_collection img'), div = $('#portfolio_collection');
		$(div).fadeToggle('500', () => {
			for (var i = 0; i < 4; i++) {
				$(imgs[i]).attr('src' , 'img/'+ event.target.id + '.png');
			};
			$(div).fadeToggle('500');
		});	
	});
};

const ul = $('#contact_towns'), text_town = $('#contact_town');

function getList () {
	$.ajax('https://gist.githubusercontent.com/Rank-Up/bcb33746262ad613a9e9b0a754a57a5a/raw/29dac27b766ec47abfbb467ccae1628fddf24712/towns.json', {
		dataType: "json",
		success: (data) => {
			$(ul).empty();
			var arr = data, html = '';
			for (var i in arr[0]) {
				html += '<li>' + arr[0][i] + '</li>\n';
			};
			$(ul).append(html).slideDown('300', () => {
				$('#contact_towns > li').on('click', event => {
					$(text_town).val(event.target.textContent);
					$(ul).slideUp('300');
				});
			});
		}
	})
}

$(text_town).on('focus', event => {
	getList();
}).on('blur', () => {
	$(ul).delay('200').slideUp('300');
}).on('keypress', event => {
	if (event.target.value.length >= 2) {
		$.ajax('https://gist.githubusercontent.com/Rank-Up/bcb33746262ad613a9e9b0a754a57a5a/raw/29dac27b766ec47abfbb467ccae1628fddf24712/towns.json', {
			dataType: "json",
			success: (data) => {
				$(ul).empty();
				var arr = data, html = '', regex = new RegExp(event.target.value, 'g');
				for (var i in arr[0]) {
					if (arr[0][i].match(regex) != null) {
						html += '<li>' + arr[0][i] + '</li>\n';
					}
				};
				$(ul).append(html).slideDown('300', () => {
					$('#contact_towns > li').on('click', event => {
						$(text_town).removeAttr('value').val(event.target.textContent);
						$(ul).slideUp('300');
					});
				})
			}
		})
	}
});

