( function( $, ExpertExtender ) {
	'use strict';

	/**
	 * An `ExpertExtender` module for selecting a quantity's unit.
	 * @class jQuery.valueview.ExpertExtender.UnitSelector
	 * @since 0.15.0
	 * @licence GNU GPL v2+
	 * @author Thiemo Mättig
	 *
	 * @constructor
	 *
	 * @param {util.MessageProvider} messageProvider
	 * @param {Function} getUpstreamValue
	 * @param {Function} onValueChange
	 */
	ExpertExtender.UnitSelector = function(
		messageProvider,
		getUpstreamValue,
		onValueChange
	) {
		this._messageProvider = messageProvider;
		this._getUpstreamValue = getUpstreamValue;
		this._onValueChange = onValueChange;

		this.$selector = $( '<input>' );
	};

	$.extend( ExpertExtender.UnitSelector.prototype, {
		/**
		 * @property {util.MessageProvider}
		 * @private
		 */
		_messageProvider: null,

		/**
		 * @property {Function}
		 * @private
		 */
		_getUpstreamValue: null,

		/**
		 * @property {Function}
		 * @private
		 */
		_onValueChange: null,

		/**
		 * @property {jQuery}
		 * @private
		 * @readonly
		 */
		$selector: null,

		/**
		 * Callback for the `init` `ExpertExtender` event.
		 *
		 * @param {jQuery} $extender
		 */
		init: function( $extender ) {
			var label = this._messageProvider.getMessage(
				'valueview-expertextender-unitsuggester-label'
			);
			this.$selector.unitsuggester( {
				change: this._onValueChange
			} );
			$extender
				.append( $( '<span>' ).text( label ) )
				.append( this.$selector );
		},

		/**
		 * Callback for the `onInitialShow` `ExpertExtender` event.
		 */
		onInitialShow: function() {
			var value = this._getUpstreamValue();
			if( value === '1'
				|| value === 'http://qudt.org/vocab/unit#Unitless'
				|| /^(?:https?:)?\/\/(?:www\.)?wikidata\.org\/\w+\/Q199$/i.test( value )
			) {
				value = null;
			}
			this.$selector.val( value );
		},

		/**
		 * Callback for the `destroy` `ExpertExtender` event.
		 */
		destroy: function() {
			this._getUpstreamValue = null;
			this.$selector = null;
			this._messageProvider = null;
			this._onValueChange = null;
		},

		/**
		 * Gets the value currently set in the rotator.
		 *
		 * @return {string|null} The current value
		 */
		getConceptUri: function() {
			var unitSuggester = this.$selector.data( 'unitsuggester' );
			return unitSuggester.getSelectedConceptUri() || this.$selector.val();
		}
	} );

}( jQuery, jQuery.valueview.ExpertExtender ) );
