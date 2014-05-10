/**
 * @licence GNU GPL v2+
 * @author Adrian Lang < adrian.lang@wikimedia.de >
 */

( function( $, ExpertExtender, sinon, QUnit, CompletenessTest ) {
	'use strict';

	QUnit.module( 'jquery.valueview.ExpertExtender' );

	if( QUnit.urlParams.completenesstest ) {
		new CompletenessTest( ExpertExtender.prototype, function( cur, tester, path ) {
			return false;
		} );
	}

	QUnit.test( 'Constructor', function( assert ) {
		var expertExtender = new ExpertExtender( $( '<input/>' ), [] );

		assert.ok(
			expertExtender instanceof ExpertExtender,
			'Instantiated ExpertExtender.'
		);

		assert.notDeepEqual( expertExtender, ExpertExtender.prototype );
	} );

	QUnit.test( 'destroy cleans up properties', function( assert ) {
		var expertExtender = new ExpertExtender( $( '<input/>' ), [] );

		expertExtender.destroy();

		assert.deepEqual( expertExtender, ExpertExtender.prototype );
	} );

	QUnit.test( 'destroy calls extensions', function( assert ) {
		var destroy = sinon.spy();
		var expertExtender = new ExpertExtender( $( '<input/>' ), [ {
			destroy: destroy
		} ] );

		expertExtender.destroy();

		sinon.assert.calledOnce( destroy );
	} );

	QUnit.asyncTest( 'init calls extensions', function( assert ) {
		var $input = $( '<input/>' ).appendTo( 'body' );
		var init = sinon.spy();
		var initialShow = sinon.spy();
		var draw = sinon.spy();
		var expertExtender = new ExpertExtender( $input, [ {
			init: init, initialShow: initialShow, draw: draw
		} ] );

		$input.focus();
		expertExtender.init();

		window.setTimeout( function() {
			sinon.assert.calledOnce( init );
			sinon.assert.calledOnce( initialShow );
			sinon.assert.calledOnce( draw );

			$input.remove();

			QUnit.start();
		}, 200 );
	} );

} )( jQuery, jQuery.valueview.ExpertExtender, sinon, QUnit, CompletenessTest );
