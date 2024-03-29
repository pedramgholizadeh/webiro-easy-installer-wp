( function ( $, window, undefined ) {
	$( window ).on( 'load', function ( a ) {
		flip_box_set_auto_height();
	} );

	$( document ).ready( function ( a ) {
		flip_box_set_auto_height();
	} );

	$( window ).resize( function ( a ) {
		flip_box_set_auto_height();
	} );

	function flip_box_set_auto_height() {
		$( '.flip-box' ).each( function ( index, value ) {
			const bodywidth = $( document ).width();
			const WW = window.innerWidth;

			if ( WW != '' ) {
				// For desktops
				if ( WW >= 768 ) {
					var h = $( this ).attr( 'data-min-height' ) || '';

					if ( h != '' ) {
						if ( $( this ).hasClass( 'ifb-custom-height' ) ) {
							$( this ).css( 'min-height', h );
							$( this ).css( 'height', h );

							if (
								$( this )
									.find( '.ifb-back' )
									.find( '.ifb-flip-box-section' )
									.hasClass(
										'ifb-flip-box-section-vertical-middle'
									)
							) {
								var back = $( this )
									.find( '.ifb-back' )
									.outerHeight();
								var backsection = $( this )
									.find( '.ifb-back' )
									.find( '.ifb-flip-box-section' )
									.outerHeight();

								back = parseInt( h );
								backsection = parseInt( backsection );

								//
								if ( backsection >= back ) {
									$( this )
										.find( '.ifb-back' )
										.find( '.ifb-flip-box-section' )
										.addClass( 'ifb_disable_middle' );
								}
							}

							if (
								$( this )
									.find( '.ifb-front' )
									.find( '.ifb-flip-box-section' )
									.hasClass(
										'ifb-flip-box-section-vertical-middle'
									)
							) {
								var front = $( this )
									.find( '.ifb-front' )
									.outerHeight();
								front = parseInt( h );
								var frontsection = $( this )
									.find( '.ifb-front' )
									.find( '.ifb-flip-box-section' )
									.outerHeight();
								frontsection = parseInt( frontsection );

								if ( frontsection >= front ) {
									$( this )
										.find( '.ifb-front' )
										.find( '.ifb-flip-box-section' )
										.addClass( 'ifb_disable_middle' );
								}
							}
						}
					} else if ( $( this ).hasClass( 'ifb-jq-height' ) ) {
						var ht1 = $( this )
							.find( '.ifb-back' )
							.find( '.ifb-flip-box-section' )
							.outerHeight();
						ht1 = parseInt( ht1 );
						var ht2 = $( this )
							.find( '.ifb-front' )
							.find( '.ifb-flip-box-section' )
							.outerHeight();
						ht2 = parseInt( ht2 );

						if ( ht1 >= ht2 ) {
							$( this ).find( '.ifb-face' ).css( 'height', ht1 );
						} else {
							$( this ).find( '.ifb-face' ).css( 'height', ht2 );
						}
					} else if ( $( this ).hasClass( 'ifb-auto-height' ) ) {
						if (
							$( this )
								.find( '.ifb-back' )
								.find( '.ifb-flip-box-section' )
								.hasClass(
									'ifb-flip-box-section-vertical-middle'
								)
						) {
							var back = $( this )
								.find( '.ifb-back' )
								.outerHeight();
							back = parseInt( back );
							var backsection = $( this )
								.find( '.ifb-back' )
								.find( '.ifb-flip-box-section' )
								.outerHeight();
							backsection = parseInt( backsection );

							if ( backsection >= back ) {
								$( this )
									.find( '.ifb-back' )
									.find( '.ifb-flip-box-section' )
									.addClass( 'ifb_disable_middle' );
							}
						}
					}
				}
				// For Mobiles
				else {
					var h = $( this ).attr( 'data-min-height' ) || '';
					//	for style - 9
					if ( $( this ).hasClass( 'style_9' ) ) {
						$( this ).css( 'height', 'initial' );
						const f1 = $( this )
							.find( '.ifb-front-1 .ifb-front' )
							.outerHeight();
						const f2 = $( this )
							.find( '.ifb-back-1 .ifb-back' )
							.outerHeight();
						//	set largest height - of either front or back
						if ( f1 > f2 ) {
							$( this ).css( 'height', f1 );
						} else {
							$( this ).css( 'height', f2 );
						}
					} else if ( $( this ).hasClass( 'ifb-jq-height' ) ) {
						var ht1 = $( this )
							.find( '.ifb-back' )
							.find( '.ifb-flip-box-section' )
							.outerHeight();
						ht1 = parseInt( ht1 );
						var ht2 = $( this )
							.find( '.ifb-front' )
							.find( '.ifb-flip-box-section' )
							.outerHeight();
						ht2 = parseInt( ht2 );
						if ( ht1 >= ht2 ) {
							$( this ).find( '.ifb-face' ).css( 'height', ht1 );
						} else {
							$( this ).find( '.ifb-face' ).css( 'height', ht2 );
						}
					} else if ( $( this ).hasClass( 'ifb-auto-height' ) ) {
						if (
							$( this )
								.find( '.ifb-back' )
								.find( '.ifb-flip-box-section' )
								.hasClass(
									'ifb-flip-box-section-vertical-middle'
								)
						) {
							var back = $( this )
								.find( '.ifb-back' )
								.outerHeight();
							var backsection = $( this )
								.find( '.ifb-back' )
								.find( '.ifb-flip-box-section' )
								.outerHeight();

							back = parseInt( back );
							backsection = parseInt( backsection );

							if ( backsection > back ) {
								$( this )
									.find( '.ifb-back' )
									.find( '.ifb-flip-box-section' )
									.addClass( 'ifb_disable_middle' );
							}
						}
					} else if ( $( this ).hasClass( 'ifb-custom-height' ) ) {
						if ( h != '' ) {
							$( this ).css( 'min-height', h );
							$( this ).css( 'height', h );
							if (
								$( this )
									.find( '.ifb-back' )
									.find( '.ifb-flip-box-section' )
									.hasClass(
										'ifb-flip-box-section-vertical-middle'
									)
							) {
								var back = $( this )
									.find( '.ifb-back' )
									.outerHeight();
								back = parseInt( back );
								var backsection = $( this )
									.find( '.ifb-back' )
									.find( '.ifb-flip-box-section' )
									.outerHeight();
								backsection = parseInt( backsection );

								if ( backsection >= back ) {
									$( this )
										.find( '.ifb-back' )
										.find( '.ifb-flip-box-section' )
										.addClass( 'ifb_disable_middle' );
								}
							}

							if (
								$( this )
									.find( '.ifb-front' )
									.find( '.ifb-flip-box-section' )
									.hasClass(
										'ifb-flip-box-section-vertical-middle'
									)
							) {
								var front = $( this )
									.find( '.ifb-front' )
									.outerHeight();
								front = parseInt( front );
								var frontsection = $( this )
									.find( '.ifb-front' )
									.find( '.ifb-flip-box-section' )
									.outerHeight();
								frontsection = parseInt( frontsection );

								if ( frontsection >= front ) {
									$( this )
										.find( '.ifb-front' )
										.find( '.ifb-flip-box-section' )
										.addClass( 'ifb_disable_middle' );
								} else {
									$( this )
										.find( '.ifb-front' )
										.find( '.ifb-flip-box-section' )
										.addClass( 'ifb_disable_middle' );
								}
							}
						}
					} else {
						$( this ).css( 'height', 'initial' );
					}
				}
			}
		} );
	}
} )( jQuery, window );
