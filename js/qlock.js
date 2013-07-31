function qlock( date, activeProperties ) {

	// Reset the clock...
	$('#qlock span').removeClass('active');

	// We can pass a date to the function for testing...
	var d = date || new Date();
	
	var time = { 
		hours: d.getHours() > 12 ? d.getHours() - 12 : d.getHours(), 
		minutes: d.getMinutes(), 
		seconds: d.getSeconds()
	};
	
	// This is always active...
	var ac = ['its'];
	
	// The class name on the hour...
	var hours = [ 
		'one', 'two', 'three', 'four', 'five', 'six', 
		'seven', 'eight', 'nine', 'ten', 'eleven', 
		'twelve' 
	];
	
	var precision = [ 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60 ];
	
	var proximity = [ 
		'oclock', 'five', 'ten', 'quarter', 'twenty', 'twenty five', 'half',
		'twenty five', 'twenty', 'quarter', 'ten', 'five', 'oclock' 
	];
	
	var past = time.minutes <= 35 ? true : false;
	var hour = past ? hours[ time.hours - 1 ] : hours[ time.hours ] || hours[0];
	
	for( var i = 0; i < precision.length; i++ ) {
		if(  time.minutes < precision[i] + 3 ) {
			var classes = proximity[i].split(' ');
			for( var j = 0; j < classes.length; j++ ) {
				ac.push( classes[j] + '.of' );
				if( /(ten|twenty|five)/.test(classes[j]) ) { 
					ac.push('minutes'); 
				} else if ( classes[j] == 'quarter' ) {
					ac.push('a.of');
				}
			} break;
		}
	}
	
	if( ac.indexOf('oclock.of') < 0 ) { 
		ac.push( past ? 'past' : 'to' );
	}
	
	ac.push( hour + '.hour' );
	
	for( var i = 0; i < ac.length; i++ ) {
		var selector = '#qlock span.' + ac[i];
		$(selector).addClass('active');
	}

}