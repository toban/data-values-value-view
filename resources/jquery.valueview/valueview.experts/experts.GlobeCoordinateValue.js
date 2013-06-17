/**
 * @file
 * @ingroup ValueView
 * @licence GNU GPL v2+
 *
 * @author H. Snater < mediawiki@snater.com >
 */
( function( dv, vp, $, vv, GlobeCoordinate ) {
	'use strict';

	var PARENT = vv.BifidExpert,
		editableExpert = vv.experts.GlobeCoordinateInput;

	/**
	 * Valueview expert for handling coordinate values.
	 *
	 * @since 0.1
	 *
	 * @constructor
	 * @extends jQuery.valueview.experts.BifidExpert
	 */
	vv.experts.GlobeCoordinateValue = vv.expert( 'globecoordinatevalue', PARENT, {
		/**
		 * @see jQuery.valueview.BifidExpert._editableExpert
		 */
		_editableExpert: editableExpert,

		/**
		 * @see jQuery.valueview.BifidExpert._editableExpertOptions
		 */
		_editableExpertOptions: {},

		/**
		 * @see jQuery.valueview.BifidExpert._staticExpert
		 */
		_staticExpert: vv.experts.StaticDom,

		/**
		 * @see jQuery.valueview.BifidExpert._staticExpertOptions
		 */
		_staticExpertOptions: {
			/**
			 * @param {string|globeCoordinate.GlobeCoordinate|null} currentRawValue
			 * @param {jQuery.valueview.ViewState} [viewState]
			 */
			domBuilder: function( currentRawValue, viewState ) {
				var $node = $( '<span/>' );

				if( !currentRawValue ) {
					return $node;
				}

				// On initialization, the static expert will be fed with a GlobeCoordinate instance.
				var text = ( currentRawValue instanceof GlobeCoordinate )
					? currentRawValue.degreeText()
					: currentRawValue;

				return $node.text( text );
			},
			baseExpert: editableExpert
		}
	} );

}( dataValues, valueParsers, jQuery, jQuery.valueview, globeCoordinate.GlobeCoordinate ) );
