( function ( $ ) {
	$.fn.unveil = function ( threshold, callback ) {
		let $w = $( window ),
			th = threshold || 0,
			retina = window.devicePixelRatio > 1,
			attrib = retina ? 'data-src-retina' : 'data-src',
			images = this,
			loaded;
		this.one( 'unveil', function () {
			let source = this.getAttribute( attrib );
			source = source || this.getAttribute( 'data-src' );
			if ( source ) {
				this.setAttribute( 'src', source );
				if ( typeof callback === 'function' ) callback.call( this );
			}
		} );
		function unveil() {
			const inview = images.filter( function () {
				const $e = $( this ),
					wt = $w.scrollTop(),
					wb = wt + $w.height(),
					et = $e.offset().top,
					eb = et + $e.height();
				return eb >= wt - th && et <= wb + th;
			} );
			loaded = inview.trigger( 'unveil' );
			images = images.not( loaded );
		}
		$w.scroll( unveil );
		$w.resize( unveil );
		unveil();
		return this;
	};
} )( window.jQuery || window.Zepto );
