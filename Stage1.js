var Stage1 = {

     preload: function() { 
            this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,
					16);
			this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
			this.load.spritesheet('turtle', 'assets/turtle.png', 16, 16);
			this.load.spritesheet('mario', 'assets/mario.png', 16, 16);
			this.load.spritesheet('coin', 'assets/coin.png', 16, 16);
			

			this.load.tilemap('level', 'assets/super_mario_map.json', null,Phaser.Tilemap.TILED_JSON);

            this.load.image('endcoin', 'assets/endcoin.png',16,16);
			this.load.audio('music','audio/music.mp3');
			this.load.audio('coin','audio/coin.wav');
			this.load.audio('jump','audio/jump.wav' );
			this.load.audio('stomp','audio/stomp.wav');

     },

 create:function() {

            

            music=game.add.audio('music');
            music.play();

            var style = { font: "bold 14px Arial", fill: "#f99a00", boundsAlignH: "center", boundsAlignV: "middle" };
            var style2 = { font: "bold 14px Arial", fill: "#f99a00", boundsAlignH: "center", boundsAlignV: "middle" };

			Phaser.Canvas.setImageRenderingCrisp(game.canvas)
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.physics.startSystem(Phaser.Physics.ARCADE);

			game.stage.backgroundColor = '#5c94fc';

			map = game.add.tilemap('level');
			map.addTilesetImage('tiles', 'tiles');
			map.setCollisionBetween(3, 12, true, 'solid');

			map.createLayer('background');

			layer = map.createLayer('solid');
			layer.resizeWorld();

			coins = game.add.group();
			coins.enableBody = true;
			map.createFromTiles(2, null, 'coin', 'stuff', coins);
			coins.callAll('animations.add', 'animations', 'spin',
					[ 0, 0, 1, 2 ], 3, true);
			coins.callAll('animations.play', 'animations', 'spin');
             


            //endcoin = game.add.sprite(100, game.world.height - 140,'endcoin');
		    endcoin = game.add.group(); 
		    endcoin.enableBody = true;
            game.physics.arcade.enable(endcoin)

			goombas = game.add.group();
			goombas.enableBody = true;
			map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -20);
			goombas.setAll('body.gravity.y', 500);

 
			turtle = game.add.group();
			turtle.enableBody = true;
			map.createFromTiles(3, null, 'turtle', 'stuff', turtle);
			turtle.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
			turtle.callAll('animations.play', 'animations', 'walk');
			turtle.setAll('body.bounce.x', 1);
			turtle.setAll('body.velocity.x', -20);
			turtle.setAll('body.gravity.y', 500);  

			player = game.add.sprite(16, game.world.height - 48, 'mario');
			game.physics.arcade.enable(player);
			player.body.gravity.y = 370;
			player.body.collideWorldBounds = true;
			player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
			player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
			player.goesRight = true;

			livestext = game.add.text(150, 5, "LIVES: "+(lives+1) +'/2', style2);
			livestext.fixedToCamera=true;
			text = game.add.text(10, 5, "SCORE:  "+points, style);
			text.fixedToCamera=true;

			game.camera.follow(player);

			cursors = game.input.keyboard.createCursorKeys();
		},

update:function() {
			game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(goombas, layer);
			game.physics.arcade.collide(turtle, layer);
			game.physics.arcade.overlap(player, goombas, goombaOverlap);
			game.physics.arcade.overlap(player, turtle, turtleOverlap);
			game.physics.arcade.overlap(player, coins, coinOverlap);

			if (player.body.enable) {
				player.body.velocity.x = 0;
				if (cursors.left.isDown) {
					player.body.velocity.x = -90;
					player.animations.play('walkLeft');
					player.goesRight = false;
				} else if (cursors.right.isDown) {
					player.body.velocity.x = 90;
					player.animations.play('walkRight');
					player.goesRight = true;
				} else {
					player.animations.stop();
					if (player.goesRight)
						player.frame = 0;
					else
						player.frame = 7;
				}

				if (cursors.up.isDown && player.body.onFloor()) {


                    var jum;

                    jum=game.add.audio('jump');
                    jum.play();

					player.body.velocity.y = -190;
					player.animations.stop();
				}

				if (player.body.velocity.y != 0) {
					if (player.goesRight)
						player.frame = 5;
					else
						player.frame = 12;
				}
			}
		}
	}
