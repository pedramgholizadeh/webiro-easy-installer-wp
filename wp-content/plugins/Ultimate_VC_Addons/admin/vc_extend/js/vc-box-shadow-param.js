/* Transparent - Color Picker */
! ( function ( r, a, e, o ) {
	'use strict';
	typeof Color.fn.toString !== o &&
		( Color.fn.toString = function () {
			if ( this._alpha < 1 )
				return this.toCSS( 'rgba', this._alpha ).replace( /\s+/g, '' );
			let r = parseInt( this._color, 10 ).toString( 16 );
			if ( this.error ) return '';
			if ( r.length < 6 )
				for ( let a = 6 - r.length - 1; a >= 0; a-- ) r = '0' + r;
			return '#' + r;
		} ),
		( r.cs_ParseColorValue = function ( r ) {
			const a = r.replace( /\s+/g, '' ),
				e =
					-1 !== a.indexOf( 'rgba' )
						? parseFloat( 100 * a.replace( /^.*,(.+)\)/, '$1' ) )
						: 100,
				o = 100 > e ? ! 0 : ! 1;
			return { value: a, alpha: e, rgba: o };
		} ),
		( r.fn.cs_wpColorPicker = function () {
			return this.each( function () {
				const a = r( this );
				if ( a.data( 'rgba' ) !== ! 1 ) {
					const e = r.cs_ParseColorValue( a.val() );
					a.wpColorPicker( {
						clear() {
							a.trigger( 'keyup' );
						},
						change( r, e ) {
							const o = e.color.toString();
							a
								.closest( '.wp-picker-container' )
								.find( '.cs-alpha-slider-offset' )
								.css( 'background-color', o ),
								a.val( o ).trigger( 'change' );
						},
						create() {
							const o = a.data( 'a8cIris' ),
								c = a.closest( '.wp-picker-container' ),
								l = r(
									'<div class="cs-alpha-wrap"><div class="cs-alpha-slider"></div><div class="cs-alpha-slider-offset"></div><div class="cs-alpha-text"></div></div>'
								).appendTo( c.find( '.wp-picker-holder' ) ),
								i = l.find( '.cs-alpha-slider' ),
								t = l.find( '.cs-alpha-text' ),
								n = l.find( '.cs-alpha-slider-offset' );
							i.slider( {
								slide( r, e ) {
									const c = parseFloat( e.value / 100 );
									( o._color._alpha = c ),
										a.wpColorPicker(
											'color',
											o._color.toString()
										),
										t.text( 1 > c ? c : '' );
								},
								create() {
									const s = parseFloat( e.alpha / 100 ),
										p = 1 > s ? s : '';
									t.text( p ),
										n.css( 'background-color', e.value ),
										c.on(
											'click',
											'.wp-picker-clear',
											function () {
												( o._color._alpha = 1 ),
													t.text( '' ),
													i
														.slider(
															'option',
															'value',
															100
														)
														.trigger( 'slide' );
											}
										),
										c.on(
											'click',
											'.wp-picker-default',
											function () {
												const e = r.cs_ParseColorValue(
														a.data(
															'default-color'
														)
													),
													c = parseFloat(
														e.alpha / 100
													),
													l = 1 > c ? c : '';
												( o._color._alpha = c ),
													t.text( l ),
													i
														.slider(
															'option',
															'value',
															e.alpha
														)
														.trigger( 'slide' );
											}
										),
										c.on(
											'click',
											'.wp-color-result',
											function () {
												l.toggle();
											}
										),
										r( 'body' ).on(
											'click.wpcolorpicker',
											function () {
												l.hide();
											}
										);
								},
								value: e.alpha,
								step: 1,
								min: 1,
								max: 100,
							} );
						},
					} );
				} else
					a.wpColorPicker( {
						clear() {
							a.trigger( 'keyup' );
						},
						change( r, e ) {
							a.val( e.color.toString() ).trigger( 'change' );
						},
					} );
			} );
		} ),
		r( e ).ready( function () {
			r( '.cs-wp-color-picker' ).cs_wpColorPicker();
		} );
} )( jQuery, window, document );

/*  Get alpha values   */
( function ( $, window, undefined ) {
	$.cs_ParseColorValue = function ( val ) {
		const value = val.replace( /\s+/g, '' ),
			alpha =
				value.indexOf( 'rgba' ) !== -1
					? parseFloat( value.replace( /^.*,(.+)\)/, '$1' ) * 100 )
					: 100,
			rgba = alpha < 100 ? true : false;
		return { value, alpha, rgba };
	};
} )( jQuery, window );

/*
 *  Project: Box Shadow
 *  Description: Ultimate Box Shadow for WPBakery Page Builder
 *  Author: BrainStorm Force
 *  License:
 */
( function ( $, window, undefined ) {
	function get_values_from_hidden_field( t ) {
		const mv = t.find( '.ultbs-result-value' ).val() || null;
		if ( mv != null ) {
			const vals = mv.split( '|' );
			$.each( vals, function ( i, vl ) {
				if ( vl != '' ) {
					const splitval = vl.split( ':' );

					switch ( splitval[ 0 ] ) {
						case 'color':
							if ( splitval[ 1 ] != 'transparent' ) {
								t.find( '.ultbs-colorpicker' )
									.val( splitval[ 1 ] )
									.trigger( 'change' );
								//   set alpha value
								const picker = $.cs_ParseColorValue(
									splitval[ 1 ]
								);
								const sl_value = parseFloat(
									picker.alpha / 100
								);
								let alpha_val = sl_value < 1 ? sl_value : '';
								t.find( '.cs-alpha-text' ).text( alpha_val );
								//  drag position
								if ( alpha_val == '' ) {
									t.find(
										'.cs-alpha-slider .ui-slider-handle'
									).css( 'left', '100%' );
								} else {
									alpha_val = parseFloat( alpha_val * 100 );
									t.find(
										'.cs-alpha-slider .ui-slider-handle'
									).css( 'left', alpha_val + '%' );
								}
								t.find( '.wp-picker-container' )
									.find( '.cs-alpha-slider-offset' )
									.css( 'background-color', splitval[ 1 ] );
								t.find( '.iris-strip' ).css(
									'background-image',
									'-webkit-linear-gradient(top, ' +
										splitval[ 1 ] +
										', rgb(197, 197, 197))'
								);
							}
							break;
						case 'style':
							t.find( '.ultbs-select' )
								.find( 'option[value=' + splitval[ 1 ] + ']' )
								.attr( 'selected', true );
							if (
								splitval[ 1 ] === 'none' ||
								splitval[ 1 ] === 'inherit'
							) {
								t.find(
									'.ultbs-input-block, .ultbs-colorpicker-block'
								).hide();
								//  Remove box shadow color - required color - param name "box_shadow_color"
								/*var c = t.closest('.vc_shortcode-param').attr('data-param_name') || null;
                                      if( typeof c != 'undefined' && c != null ) {
                                        $('.'+c+'
                                        ').hide();
                                      }*/
							}
							break;
						default:
							t.find( '.ultbs-input' ).each( function (
								input_index,
								elem
							) {
								const dataid = $( elem ).attr( 'data-id' );
								if ( dataid == splitval[ 0 ] ) {
									const unit = $( elem ).attr( 'data-unit' );
									mval = splitval[ 1 ].split( unit );
									$( elem ).val( mval[ 0 ] );
								}
							} );
							break;
					}
				}
			} );
		} else {
			const s = t.find( '.ultbs-select option:selected' ).val();
			if ( s === 'none' || s === 'inherit' ) {
				t.find( '.ultbs-input-block, .ultbs-colorpicker-block' ).hide();
				//  Remove box shadow color - required color - param name "box_shadow_color"
				/*var c = t.closest('.vc_shortcode-param').attr('data-param_name') || null;
            if( typeof c != 'undefined' && c != null ) {
              $('.'+c+'_ultimate_box_shadow_color').hide();
            }*/
			}
			/*t.find(".ultimate-spacing-inputs").each(function(input_index, elem) {
            var d = $(elem).attr("data-default");
            $(elem).val(d);
          });*/
		}
	}
	function set_values_from_hidden_field( t, hxcolor ) {
		var nval = '';
		//  Set Inputs
		t.find( '.ultbs-input' ).each( function ( index, elm ) {
			const unit = t.find( '.ultbs-result-value' ).attr( 'data-unit' );
			const ival = $( elm ).val();
			//if ($.isNumeric(ival)) {
			//if (ival.match(/^[0-9]+$/))
			const item =
				$( elm ).attr( 'data-id' ) + ':' + $( elm ).val() + unit + '|';
			nval += item;
			//}
		} );

		//  Set Color
		if ( typeof hxcolor !== 'undefined' || hxcolor != null ) {
			var nval = nval + 'color:' + hxcolor + '|';
		} else {
			const va =
				t.find( '.ultbs-colorpicker' ).val() ||
				t.find( 'a.wp-color-result' ).css( 'background-color' ) ||
				'';
			if ( va != '' ) {
				var nval = nval + 'color:' + va + '|';
			}
		}

		//  Selected Shadow Type - inset, initial, inherit
		const sv = t.find( '.ultbs-select option:selected' ).val() || '';
		if ( typeof sv !== 'undefined' && sv != '' ) {
			var nval = nval + 'style:' + sv + '|';
		}
		t.find( '.ultbs-result-value' ).val( nval );
	}
	$( document ).ready( function ( $ ) {
		$( '.ultimate-boxshadow' ).each( function ( index, element ) {
			const t = $( element );

			//  Add dependency for none box shadow'
			t.find( '.ultbs-select' ).change( function ( event ) {
				const s = $( this ).val();

				if ( typeof s !== 'undefined' && s != null ) {
					if ( s === 'none' || s === 'inherit' ) {
						t.find(
							'.ultbs-input-block, .ultbs-colorpicker-block'
						).hide();
						//  Remove box shadow color - required color - param name "box_shadow_color"
						/*var c = t.closest('.vc_shortcode-param').attr('data-param_name') || null;
                if( typeof c != 'undefined' && c != null ) {
                  $('.'+c+'_ultimate_box_shadow_color').hide();
                }*/
					} else {
						t.find( '.ultbs-input-block' ).show();
						t.find( '.ultbs-colorpicker-block' ).show();
						//  Remove box shadow color - required color - param name "box_shadow_color"
						/*var c = t.closest('.vc_shortcode-param').attr('data-param_name') || null;
                if( typeof c != 'undefined' && c != null ) {
                  $('.'+c+'_ultimate_box_shadow_color').show();
                }*/
					}
				}
			} );

			get_values_from_hidden_field( t );
			set_values_from_hidden_field( t );

			//  On change - input / select
			t.find( '.ultbs-input, .ultbs-select, .ultbs-colorpicker' ).on(
				'change',
				function ( e ) {
					set_values_from_hidden_field( t );
				}
			);

			//  Color
			const options = {
				change( event, ui ) {
					const hxcolor = $( this ).wpColorPicker( 'color' );
					//   set alpha value
					const picker = $.cs_ParseColorValue( hxcolor );
					const sl_value = parseFloat( picker.alpha / 100 );
					let alpha_val = sl_value < 1 ? sl_value : '';
					t.find( '.cs-alpha-text' ).text( alpha_val );
					//  drag position
					if ( alpha_val == '' ) {
						t.find( '.cs-alpha-slider .ui-slider-handle' ).css(
							'left',
							'100%'
						);
					} else {
						alpha_val = parseFloat( alpha_val * 100 );
						t.find( '.cs-alpha-slider .ui-slider-handle' ).css(
							'left',
							alpha_val + '%'
						);
					}
					t.find( '.wp-picker-container' )
						.find( '.cs-alpha-slider-offset' )
						.css( 'background-color', hxcolor );
					t.find( '.iris-strip' ).css(
						'background-image',
						'-webkit-linear-gradient(top, ' +
							hxcolor +
							', rgb(197, 197, 197))'
					);
					set_values_from_hidden_field( t, hxcolor );
				},
				clear( event, ui ) {
					const hxcolor = 'transparent';
					set_values_from_hidden_field( t, hxcolor );
				},
			};
			t.find( '.ultbs-colorpicker' ).wpColorPicker( options );
		} );
	} );
} )( jQuery, window );
