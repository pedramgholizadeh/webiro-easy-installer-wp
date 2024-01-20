( function ( $ ) {
	'use strict';
	window.InlineShortcodeView_info_list = window.InlineShortcodeViewContainer.extend(
		{
			render() {
				const modal_id = this.model.get( 'id' );
				const style = jQuery(
					this.$el.find( '.smile_icon_list' )
				).data( 'style' );
				const fonts = jQuery(
					this.$el.find( '.smile_icon_list' )
				).data( 'fonts' );
				const connector = jQuery(
					this.$el.find( '.smile_icon_list' )
				).data( 'connector' );
				window.InlineShortcodeView_info_list.__super__.render.call(
					this
				);
				this.content().addClass( 'vc-element-container' );
				const info_list_iframe = jQuery( 'iframe' )
					.contents()
					.find( 'div[data-model-id="' + modal_id + '"]' );
				info_list_iframe
					.find( '.icon_list_item' )
					.each( function ( index, element ) {
						jQuery( this ).attr( 'style', fonts );
						jQuery( this )
							.find( '.icon_list_icon' )
							.attr( 'style', style );
						jQuery( this )
							.find( '.icon_list_connector' )
							.attr( 'style', 'border-color:' + connector );
					} );
				this.$el.addClass( 'vc-container' );
				return this;
			},
		}
	);
	window.InlineShortcodeView_info_list_item = window.InlineShortcodeView.extend(
		{
			render() {
				const style = jQuery( this.$el.find( '.icon_list_icon' ) )
					.parents( 'ul.smile_icon_list' )
					.data( 'style' );
				const fonts = jQuery( this.$el.find( '.icon_list_icon' ) )
					.parents( 'ul.smile_icon_list' )
					.data( 'fonts' );
				const connector = jQuery( this.$el.find( '.icon_list_icon' ) )
					.parents( 'ul.smile_icon_list' )
					.data( 'connector' );
				jQuery( this.$el.find( '.icon_list_item' ) ).each( function (
					index,
					element
				) {
					jQuery( this ).attr( 'style', fonts );
					jQuery( this )
						.find( '.icon_list_icon' )
						.attr( 'style', style );
					jQuery( this )
						.find( '.icon_list_connector' )
						.attr( 'style', 'border-color:' + connector );
				} );
				window.InlineShortcodeView_info_list_item.__super__.render.call(
					this
				);
				return this;
			},
		}
	);
} )( jQuery );
