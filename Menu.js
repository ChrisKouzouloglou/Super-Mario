  var Menu = {


	preload: function() {
        game.load.image('Menu', 'assets/gameLogo.png');
		game.load.image('lvl1', 'assets/lvl1.png');
		game.load.image('lvl2', 'assets/lvl2.png');
       // game.load.audio('menus', 'audio/menu.wav');
    },
	
	create: function() {

		/*menus = game.add.audio('menus');
		menus.play('',0,1,true);*/
        Phaser.Canvas.setImageRenderingCrisp(game.canvas)
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);

		var s = game.add.sprite(70, 5, 'Menu');
		
		

		var btn1 = game.add.button(140 , 100, "lvl1", function(){
			game.state.start('Stage1');
		});
		btn1.anchor.set(0.5, 0.5);     

		var btn2 = game.add.button(140, 150, "lvl2", function(){
			game.state.start('Stage2');
		});
		btn2.anchor.set(0.5, 0.5);

	}
}