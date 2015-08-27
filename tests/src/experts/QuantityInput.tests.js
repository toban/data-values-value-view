/**
 * @licence GNU GPL v2+
 * @author Thiemo Mättig
 */
( function( $, QUnit, vv ) {
	'use strict';

	QUnit.module( 'jquery.valueview.experts.QuantityInput' );

	vv.tests.testExpert( {
		expertConstructor: vv.experts.QuantityInput
	} );

	function newExpert() {
		return new vv.experts.QuantityInput(
			$( '<div>' ),
			new vv.tests.MockViewState(),
			undefined,
			{ messages: {} }
		);
	}

	QUnit.test( 'valueCharacteristics', function( assert ) {
		var expert = newExpert(),
			characteristics = expert.valueCharacteristics();

		assert.ok(
			characteristics.hasOwnProperty( 'unit' ),
			'unit exists'
		);

		assert.ok(
			characteristics.unit === null || typeof characteristics.unit === 'string',
			'unit is null or a string'
		);

		assert.ok(
			characteristics.applyUnit === false,
			'applyUnit must be false'
		);

		assert.ok(
			characteristics.applyRounding === false,
			'applyRounding must be false'
		);
	} );

}( jQuery, QUnit, jQuery.valueview ) );
