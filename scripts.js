window.intlTelInput(document.querySelector('#billing_phone_dub'), {
	initialCountry: 'ua',
	placeholderNumberType: 'FIXED_LINE',
	utilsScript: "/utils.js",
});

let billing_phone_hidden = $('#billing_phone');
let billing_phone = $('#billing_phone_dub');
let iti_flag = $('.iti__selected-flag');

if(billing_phone_hidden.attr('value').indexOf('+380') > -1) {
	billing_phone.val(billing_phone_hidden.attr('value').split('+380')[1]);
}else{
	billing_phone.val('');
}

iti_flag.append('<span class="iti__country-code"></span>');
billing_phone.attr('placeholder', '');
billing_phone.attr('maxlength', 9);

let country_info = iti_flag.attr('title');
let flag = country_info.substring(country_info.indexOf("+"));
iti_flag.find('.iti__country-code').text(flag);

billing_phone.on('countrychange', function(){
	billing_phone_hidden.val('');
	billing_phone.val('');
	country_info = iti_flag.attr('title');
	flag = country_info.substring(country_info.indexOf("+"));
	iti_flag.find('.iti__country-code').text(flag);

	if(flag === '+380') {
		billing_phone.attr('maxlength', 9);
	}else{
		billing_phone.removeAttr('maxlength');
	}
})
billing_phone.on('change', function(){
	if($(this).val().indexOf('+380') > -1) {
		$(this).val($(this).val().split('+380')[1]);
	}
	while($(this).val() !== '' && $(this).val()[0].charAt(0) === '0')
	{
		$(this).val($(this).val().substring(1));
	}

	if($(this).val() !== '' && $(this).val()[0].charAt(0) === '0'){
		billing_phone_hidden.val(flag+$(this).val().substring(1));
	}else{
		billing_phone_hidden.val(flag+$(this).val());
	}
})