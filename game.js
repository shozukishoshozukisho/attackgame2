enchant();
window.onload = function(){
  var game = new Game(300, 300);
  game.keybind(32, 'a');
  game.spriteSheetWidth = 256;
  game.spriteSheetHeight = 16;
  game.itemSpriteSheetWidth = 64;
  game.preload(['sprites.png', 'items.png']);
  game.items = [{price: 1000, description: "Hurter", id: 0}, 
               {price: 5000, description: "Drg. Paw", id: 1},
               {price: 5000, description: "Ice Magic", id: 2},
               {price: 60, description: "Chess Set", id: 3}]
  game.fps = 15;
  game.spriteWidth = 16;
  game.spriteHeight = 16;
  var map = new Map(game.spriteWidth, game.spriteHeight);
  var foregroundMap = new Map(game.spriteWidth, game.spriteHeight);
  var setMaps = function(){
    map.image = game.assets['sprites.png'];
    map.loadData(mapData);
    foregroundMap.image = game.assets['sprites.png'];
    foregroundMap.loadData(foregroundData);
    var collisionData = [];
    for(var i = 0; i< foregroundData.length; i++){
      collisionData.push([]);
      for(var j = 0; j< foregroundData[0].length; j++){
        var collision = foregroundData[i][j] %13 > 1 ? 1 : 0;
        collisionData[i][j] = collision;
      }
    }
    map.collisionData = collisionData;
  };
  var setStage = function(){
    var stage = new Group();
    stage.addChild(map);
    stage.addChild(player);
    stage.addChild(foregroundMap);
    stage.addChild(player.statusLabel);
    game.rootScene.addChild(stage);
  };
  var player = new Sprite(game.spriteWidth, game.spriteHeight);
  var setPlayer = function(){
    player.spriteOffset = 5;
    player.startingX = 6;
    player.startingY = 14;
    player.x = player.startingX * game.spriteWidth;
    player.y = player.startingY * game.spriteHeight;
    player.direction = 0;
    player.walk = 0;
    player.frame = player.spriteOffset + player.direction; 
    player.image = new Surface(game.spriteSheetWidth, game.spriteSheetHeight);
    player.image.draw(game.assets['sprites.png']);

    player.name = "Roger";
    player.characterClass = "Rogue";
    player.exp = 0;
    player.level = 1;
    player.gp = 100;
    player.levelStats = [{},{attack: 4, maxHp: 10, maxMp: 0, expMax: 10},
                         {attack: 6, maxHp: 12, maxMp: 0, expMax: 20},
                         {attack: 8, maxHp: 14, maxMp: 5, expMax: 40},
                         {attack: 10, maxHp: 16, maxMp: 10, expMax: 80},
                         {attack: 12, maxHp: 18, maxMp: 15, expMax: 160},
                         {attack: 14, maxHp: 20, maxMp: 20, expMax: 320},
                         {attack: 16, maxHp: 22, maxMp: 25, expMax: 640},
                         {attack: 18, maxHp: 24, maxMp: 30, expMax: 1280},
                         {attack: 20, maxHp: 26, maxMp: 35, expMax: 2560},
                         {attack: 22, maxHp: 28, maxMp: 40, expMax: 5120},
                         {attack: 24, maxHp: 30, maxMp: 45, expMax: 10240},
                         {attack: 26, maxHp: 32, maxMp: 50, expMax: 20480},
                         {attack: 28, maxHp: 34, maxMp: 55, expMax: 40960},
                         {attack: 30, maxHp: 36, maxMp: 60, expMax: 40960*2},
                         {attack: 32, maxHp: 38, maxMp: 65, expMax: 40960*2*2},
                         {attack: 34, maxHp: 40, maxMp: 70, expMax: 40960*2*2*2},
                         {attack: 36, maxHp: 42, maxMp: 75, expMax: 40960*2*2*2*2},
                         {attack: 38, maxHp: 44, maxMp: 80, expMax: 40960*2*2*2*2*2},
                         {attack: 40, maxHp: 46, maxMp: 85, expMax: 40960*2*2*2*2*2*2},
                         {attack: 42, maxHp: 48, maxMp: 90, expMax: 40960*2*2*2*2*2*2*2},
                         {attack: 44, maxHp: 50, maxMp: 95, expMax: 40960*2*2*2*2*2*2*2*2},
                         {attack: 50, maxHp: 60, maxMp: 100, expMax: 40960*2*2*2*2*2*2*2*2*2},
                         {attack: 60, maxHp: 90, maxMp: 200, expMax: 40960*2*2*2*2*2*2*2*2*2*2},
                         {attack: 80, maxHp: 120, maxMp: 300, expMax: 40960*2*2*2*2*2*2*2*2*2*2*2},
                         {attack: 100, maxHp: 150, maxMp: 400, expMax: 40960*2*2*2*2*2*2*2*2*2*2*2*2},
                         {attack: 110, maxHp: 180, maxMp: 500, expMax: 40960*2*2*2*2*2*2*2*2*2*2*2*2*2},
                         {attack: 130, maxHp: 200, maxMp: 600, expMax: "max"}
    ];
    player.attack = function(){
      return player.levelStats[player.level].attack;
    };
    player.hp = player.levelStats[player.level].maxHp;
    player.mp = player.levelStats[player.level].maxMp;
      
    player.statusLabel = new Label("");
    player.statusLabel.width = game.width;
    player.statusLabel.y = undefined;
    player.statusLabel.x = undefined;
    player.statusLabel.color = '#fff';
    player.statusLabel.backgroundColor = '#000';
  };
  player.displayStatus = function(){
    player.statusLabel.text = 
      "--" + player.name + " the " + player.characterClass + 
      "<br />--HP: "+player.hp + "/" + player.levelStats[player.level].maxHp + 
      "<br />--MP: "+player.mp + "/" + player.levelStats[player.level].maxMp + 
      "<br />--経験値: "+player.exp + 
      "<br />--レベル: " + player.level + 
      "<br />--GP: " + player.gp +
      "<br /><br />--インベントリ:"; 
    player.statusLabel.height = 170;
    player.showInventory(0);
  };
  player.clearStatus = function(){
    player.statusLabel.text = "";
    player.statusLabel.height = 0;
    player.hideInventory();
  };

  player.move = function(){
    this.frame = this.spriteOffset + this.direction * 2 + this.walk;
    if (this.isMoving) {
      this.moveBy(this.xMovement, this.yMovement);
      if (!(game.frame % 2)) {
        this.walk++;
        this.walk %= 2;
      }
      if ((this.xMovement && this.x % 16 === 0) || (this.yMovement && this.y % 16 === 0)) {
        this.isMoving = false;
        this.walk = 1;
      }
    } else {
      this.xMovement = 0;
      this.yMovement = 0;
      if (game.input.up) {
        this.direction = 1;
        this.yMovement = -4;
        player.clearStatus();
      } else if (game.input.right) {
        this.direction = 2;
        this.xMovement = 4;
        player.clearStatus();
      } else if (game.input.left) {
        this.direction = 3;
        this.xMovement = -4;
        player.clearStatus();
      } else if (game.input.down) {
        this.direction = 0;
        this.yMovement = 4;
        player.clearStatus();
      }
      if (this.xMovement || this.yMovement) {
        var x = this.x + (this.xMovement ? this.xMovement / Math.abs(this.xMovement) * 16 : 0);
        var y = this.y + (this.yMovement ? this.yMovement / Math.abs(this.yMovement) * 16 : 0);
      if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
          this.isMoving = true;
          this.move();
        }
      }
    }
  };
  player.square = function(){
    return {x: Math.floor(this.x /game.spriteWidth), y: Math.floor(this.y/game.spriteHeight)}
  }
  player.facingSquare = function(){
    var playerSquare = player.square();
    var facingSquare;
    if(player.direction === 0){
      facingSquare = {x: playerSquare.x, y: playerSquare.y + 1}
    }else if (player.direction === 1) {
      facingSquare = {x: playerSquare.x, y: playerSquare.y - 1}
    }else if (player.direction === 2) {
      facingSquare = {x: playerSquare.x + 1, y: playerSquare.y}
    }else if (player.direction === 3) {
      facingSquare = {x: playerSquare.x - 1, y: playerSquare.y}
    }
    if ((facingSquare.x < 0 || facingSquare.x >= map.width/16) || (facingSquare.y < 0 || facingSquare.y >= map.height/16)) {
      return null;
    } else {
      return facingSquare;
    }
  }
  player.facing = function(){
    var facingSquare = player.facingSquare();
    if (!facingSquare){
      return null;
    }else{
      return foregroundData[facingSquare.y][facingSquare.x];
    }
  }
  player.visibleItems = [];
  player.itemSurface = new Surface(game.itemSpriteSheetWidth, game.spriteSheetHeight);
  player.inventory = [];
  player.hideInventory = function(){
    for(var i = 0; i < player.visibleItems.length; i++){
      player.visibleItems[i].remove();
    }
      player.visibleItems = [];
  };
  player.showInventory = function(yOffset){
     if(player.visibleItems.length === 0){
      player.itemSurface.draw(game.assets['items.png']);
      for (var i = 0; i < player.inventory.length; i++){
        var item = new Sprite(game.spriteWidth, game.spriteHeight);
        item.y = 130 + yOffset;
        item.x = 30 + 70*i;
        item.frame = player.inventory[i];
        item.scaleX = 2;
        item.scaleY = 2;
        item.image = player.itemSurface;
        player.visibleItems.push(item);
        game.currentScene.addChild(item);
      }
    }
  };
  var npc = {
    say: function(message){
      player.statusLabel.height = 12;
      player.statusLabel.text = message;
    }
  }
  var greeter = {
    action: function(){
      npc.say("ブルブル・・・、裏切り者がいるし、敵がうじゃうじゃ");
    }
  };
  var shopScene = new Scene();
  var cat = {
    action: function(){
      game.pushScene(shopScene);
    }
  };
  var battleScene = new Scene();
  var brawler = {
    maxHp: 20,
    hp: 20,
    sprite: 15,
    attack: 3,
    exp: 3,
    gp: 5,
    action: function(){
      player.currentEnemy = this;
      game.pushScene(battleScene);
    }
  };
  var battleSceneTwo = new Scene();
  var uragirimono = {
    maxHp: 5,
    hp: 5,
    sprite: 16,
    attack: 1,
    exp: 20,
    gp: 40,
    action: function(){
      player.currentEnemy = this;
      game.pushScene(battleSceneTwo);
    }
  };
  var battleBossScene = new Scene();
  var BossBattle = {
    maxHp: 6000,
    hp: 6000,
    sprite: 17,
    attack: 60,
    exp: 10000,
    gp: 10000,
    action: function(){
      player.currentEnemy = this;
      game.pushScene(battleBossScene);
    }
  };
  var spriteRoles = [,,greeter,,cat,,,,,,,,,,,brawler,uragirimono,BossBattle]
  var setBattle = function(){
    battleScene.backgroundColor = '#000';
    var battle = new Group();
    battle.menu = new Label();
    battle.menu.x = 20;
    battle.menu.y = 170;
    battle.menu.color = '#fff';  
    battle.activeAction = 0;
    battle.getPlayerStatus = function(){
      return "HP: " + player.hp + "<br />MP: " + player.mp;
    };
    battle.playerStatus = new Label(battle.getPlayerStatus());
    battle.playerStatus.color = '#fff';
    battle.playerStatus.x = 200;
    battle.playerStatus.y = 120;
    battle.hitStrength = function(hit){
      return Math.round((Math.random() + .5) * hit);
    };
    battle.won = function(){
      battle.over = true;
      player.exp += player.currentEnemy.exp;
      player.gp += player.currentEnemy.gp;
      player.currentEnemy.hp = player.currentEnemy.maxHp;
      player.statusLabel.text = "You won!<br />" +
        "経験値を "+ player.currentEnemy.exp + " 獲得し、<br />"+
        "金貨を " + player.currentEnemy.gp + " 獲得した！";
      player.statusLabel.height = 45;
      if(player.exp > player.levelStats[player.level].expMax){
        player.level += 1;
        player.statusLabel.text = player.statusLabel.text + 
          "<br />レベルアップした！"+
          "<br />レベルは " + player.level +"になった！";
        player.statusLabel.height = 75;
      }
      player.hp = player.levelStats[player.level].maxHp;
      player.mp = player.levelStats[player.level].maxMp;
    };
    battle.lost = function(){
      battle.over = true;
      player.hp = player.levelStats[player.level].maxHp;
      player.mp = player.levelStats[player.level].maxMp;
      player.gp = Math.round(player.gp/2);
      player.statusLabel.text = "あなたは負けた・・・";
      player.statusLabel.height = 12;
    };
    battle.playerAttack = function(){
      var currentEnemy = player.currentEnemy;
      var playerHit = battle.hitStrength(player.attack());
      if (player.inventory[0] === 0){
        if(player.inventory[1] === 1){
          playerHit += 10;
        }else if(player.inventory[2] === 1){
          playerHit += 10;
        }else if(player.inventory[3] === 1){
          playerHit += 10;
        }else{
          playerHit += 5;
        }
      }else if (player.inventory[1] === 0){
        if(player.inventory[0] === 1){
          playerHit += 10;
        }else if(player.inventory[2] === 1){
          playerHit += 10;
        }else if(player.inventory[3] === 1){
          playerHit += 10;
        }else{
          playerHit += 5;
        }
      }else if (player.inventory[2] === 0){
        if(player.inventory[1] === 1){
          playerHit += 10;
        }else if(player.inventory[0] === 1){
          playerHit += 10;
        }else if(player.inventory[3] === 1){
          playerHit += 10;
        }else{
          playerHit += 5;
        }
      }else if (player.inventory[3] === 0){
        if(player.inventory[1] === 1){
          playerHit += 10;
        }else if(player.inventory[2] === 1){
          playerHit += 10;
        }else if(player.inventory[0] === 1){
          playerHit += 10;
        }else{
          playerHit += 5;
        }
      }else if(player.inventory[0] === 1){
        playerHit += 10;
      }else if(player.inventory[1] === 1){
        playerHit += 10;
      }else if(player.inventory[2] === 1){
        playerHit += 10;
      }else if(player.inventory[3] === 1){
        playerHit += 10;
      };
      currentEnemy.hp = currentEnemy.hp - playerHit;
      battle.menu.text = "ダメージを " + playerHit + " 与えた！";
      if(currentEnemy.hp <= 0){
         battle.won();
      };
    };
    battle.playerMagic = function(){
      if(player.inventory[0] === 2){
        var currentEnemy = player.currentEnemy;
        var playerHit = 5 * player.level;
        currentEnemy.hp = currentEnemy.hp - playerHit;
        battle.menu.text = "ダメージを　" + playerHit + "　与えた！";
        if(currentEnemy.hp <= 0){
          battle.won;
        };
      };
      if(player.inventory[1] === 2){
        var currentEnemy = player.currentEnemy;
        var playerHit = 5 * player.level;
        currentEnemy.hp = currentEnemy.hp - playerHit;
        battle.menu.text = "ダメージを　" + playerHit + "　与えた！";
        if(currentEnemy.hp <= 0){
          battle.won;
        };
      };
      if(player.inventory[2] === 2){
        var currentEnemy = player.currentEnemy;
        var playerHit = 5 * player.level;
        currentEnemy.hp = currentEnemy.hp - playerHit;
        battle.menu.text = "ダメージを　" + playerHit + "　与えた！";
        if(currentEnemy.hp <= 0){
          battle.won;
        };
      };
      if(player.inventory[3] === 2){
        var currentEnemy = player.currentEnemy;
        var playerHit = 5 * player.level;
        currentEnemy.hp = currentEnemy.hp - playerHit;
        battle.menu.text = "ダメージを　" + playerHit + "　与えた！";
        if(currentEnemy.hp <= 0){
          battle.won;
        };
      };
    };
    battle.enemyAttack = function(){
      var currentEnemy = player.currentEnemy;
      var enemyHit = battle.hitStrength(currentEnemy.attack);
      player.hp = player.hp - enemyHit;
      battle.menu.text = "ダメージを" + enemyHit + " 受けた！";
      if(player.hp <= 0){
        battle.lost();
      };
    };
    battle.actions = [{name: "戦う", action: function(){
        battle.wait = true;
        battle.playerAttack();
        setTimeout(function(){
          if(!battle.over){
            battle.enemyAttack();
          };
          if(!battle.over){
            setTimeout(function(){
              battle.menu.text = battle.listActions();
              battle.wait = false;
            }, 1000)
          } else {
            setTimeout(function(){
              battle.menu.text = "";
              game.popScene();
            }, 1000)
          };
        }, 1000);
      }},
      {name: "魔法", action: function(){ 
        battle.wait = true;
        battle.playerMagic();
        setTimeout(function(){
          if(!battle.over){
            battle.enemyAttack();
          };
          if(!battle.over){
            setTimeout(function(){
              battle.menu.text = battle.listActions();
              battle.wait = false;
            }, 1000)
          } else {
            setTimeout(function(){
              battle.menu.text = "";
              game.popScene();
            }, 1000)
          };
        }, 1000);
      }},
      {name: "逃げる", action: function(){
        game.pause();
        player.statusLabel.text = "あなたはそそくさと逃げた！";
        player.statusLabel.height = 12;
        battle.menu.text = "";
        game.popScene();
      }}
    ];
    battle.listActions = function(){
      battle.optionText = [];
      for(var i = 0; i < battle.actions.length; i++){
        if(i === battle.activeAction){
          battle.optionText[i] = "<span class='active-option'>"+ battle.actions[i].name + "</span>";
        } else {
          battle.optionText[i] = battle.actions[i].name;
        }
      }
      return battle.optionText.join("<br />");
    };
    battle.addCombatants = function(){
      var image = new Surface(game.spriteSheetWidth, game.spriteSheetHeight);
      image.draw(game.assets['sprites.png']);
      battle.player = new Sprite(game.spriteWidth, game.spriteHeight);
      battle.player.image = image;
      battle.player.frame = 7;
      battle.player.x = 150;
      battle.player.y = 120;
      battle.player.scaleX = 2;
      battle.player.scaleY = 2;
      battle.enemy = new Sprite(game.spriteWidth, game.spriteHeight);
      battle.enemy.image = image;
      battle.enemy.x = 150;
      battle.enemy.y = 70;
      battle.enemy.scaleX = 2;
      battle.enemy.scaleY = 2;
      battle.addChild(battle.enemy);
    };
    battle.addCombatants();
    
    battleScene.on('enter', function() {
      battle.over = false;
      battle.wait = true;
      battle.menu.text = "";
      battle.enemy.frame = 15;
      setTimeout(function(){
        battle.menu.text = battle.listActions();
        battle.wait = false;
      }, 500);
    });
    battleScene.on('enterframe', function() {
      if(!battle.wait){
        if (game.input.a){
          battle.actions[battle.activeAction].action();
        } else if (game.input.down){
          battle.activeAction = (battle.activeAction + 1) % battle.actions.length;
          battle.menu.text = battle.listActions();
        } else if (game.input.up){
          battle.activeAction = (battle.activeAction - 1 + battle.actions.length) % battle.actions.length;
          battle.menu.text = battle.listActions();
        }
        battle.playerStatus.text = battle.getPlayerStatus();
      };
    })
    battleScene.on('exit', function() {
      setTimeout(function(){
        battle.menu.text = "";
        battle.activeAction = 0;
        battle.playerStatus.text = battle.getPlayerStatus();
        game.resume();
      }, 1000);
    });
    battle.addChild(battle.playerStatus);
    battle.addChild(battle.menu);
    battle.addChild(battle.player);
    battleScene.addChild(battle);
  };
  var setBattleTwo = function(){
    battleSceneTwo.backgroundColor = '#000';
    var battleTwo = new Group();
    battleTwo.menu = new Label();
    battleTwo.menu.x = 20;
    battleTwo.menu.y = 170;
    battleTwo.menu.color = '#fff';  
    battleTwo.activeAction = 0;
    battleTwo.getPlayerStatus = function(){
      return "HP: " + player.hp + "<br />MP: " + player.mp;
    };
    battleTwo.playerStatus = new Label(battleTwo.getPlayerStatus());
    battleTwo.playerStatus.color = '#fff';
    battleTwo.playerStatus.x = 200;
    battleTwo.playerStatus.y = 120;
    battleTwo.hitStrength = function(hit){
      return Math.round((Math.random() + .5) * hit);
    };
    battleTwo.won = function(){
      battleTwo.over = true;
      player.exp += player.currentEnemy.exp;
      player.gp += player.currentEnemy.gp;
      player.currentEnemy.hp = player.currentEnemy.maxHp;
      player.statusLabel.text = "You won!<br />" +
        "経験値を "+ player.currentEnemy.exp + " 獲得し、<br />"+
        "金貨を " + player.currentEnemy.gp + " 獲得した！";
      player.statusLabel.height = 45;
      if(player.exp > player.levelStats[player.level].expMax){
        player.level += 1;
        player.statusLabel.text = player.statusLabel.text + 
          "<br />レベルアップした！"+
          "<br />レベルは " + player.level +"になった！";
        player.statusLabel.height = 75;
      }
      player.hp = player.levelStats[player.level].maxHp;
      player.mp = player.levelStats[player.level].maxMp;
    };
    battleTwo.lost = function(){
      battleTwo.over = true;
      player.hp = player.levelStats[player.level].maxHp;
      player.mp = player.levelStats[player.level].maxMp;
      player.gp = Math.round(player.gp/2);
      player.statusLabel.text = "あなたは負けた・・・";
      player.statusLabel.height = 12;
    };
    battleTwo.playerAttack = function(){
      var currentEnemy = player.currentEnemy;
      var playerHit = battleTwo.hitStrength(player.attack());
      if (player.inventory[0] === 0){
        if(player.inventory[1] === 1){
          playerHit += 10;
        }else if(player.inventory[2] === 1){
          playerHit += 10;
        }else if(player.inventory[3] === 1){
          playerHit += 10;
        }else{
          playerHit += 5;
        }
      }else if (player.inventory[1] === 0){
        if(player.inventory[0] === 1){
          playerHit += 10;
        }else if(player.inventory[2] === 1){
          playerHit += 10;
        }else if(player.inventory[3] === 1){
          playerHit += 10;
        }else{
          playerHit += 5;
        }
      }else if (player.inventory[2] === 0){
        if(player.inventory[1] === 1){
          playerHit += 10;
        }else if(player.inventory[0] === 1){
          playerHit += 10;
        }else if(player.inventory[3] === 1){
          playerHit += 10;
        }else{
          playerHit += 5;
        }
      }else if (player.inventory[3] === 0){
        if(player.inventory[1] === 1){
          playerHit += 10;
        }else if(player.inventory[2] === 1){
          playerHit += 10;
        }else if(player.inventory[0] === 1){
          playerHit += 10;
        }else{
          playerHit += 5;
        }
      }else if(player.inventory[0] === 1){
        playerHit += 10;
      }else if(player.inventory[1] === 1){
        playerHit += 10;
      }else if(player.inventory[2] === 1){
        playerHit += 10;
      }else if(player.inventory[3] === 1){
        playerHit += 10;
      };
      currentEnemy.hp = currentEnemy.hp - playerHit;
      battleTwo.menu.text = "ダメージを " + playerHit + " 与えた！";
      if(currentEnemy.hp <= 0){
         battleTwo.won();
      };
    };
    battleTwo.playerMagic = function(){
      if(player.inventory[0] === 2){
        var currentEnemy = player.currentEnemy;
        var playerHit = 5 * player.level;
        currentEnemy.hp = currentEnemy.hp - playerHit;
        battleTwo.menu.text = "ダメージを　" + playerHit + "　与えた！";
        if(currentEnemy.hp <= 0){
          battleTwo.won;
        };        }
      };
      if(player.inventory[1] === 2){
        var currentEnemy = player.currentEnemy;
        var playerHit = 5 * player.level;
        currentEnemy.hp = currentEnemy.hp - playerHit;
        battleTwo.menu.text = "ダメージを　" + playerHit + "　与えた！";
        if(currentEnemy.hp <= 0){
          battleTwo.won;
        };
      };
      if(player.inventory[2] === 2){
        var currentEnemy = player.currentEnemy;
        var playerHit = 5 * player.level;
        currentEnemy.hp = currentEnemy.hp - playerHit;
        battleTwo.menu.text = "ダメージを　" + playerHit + "　与えた！";
        if(currentEnemy.hp <= 0){
          battleTwo.won;
        };
      };
      if(player.inventory[3] === 2){
        var currentEnemy = player.currentEnemy;
        var playerHit = 5 * player.level;
        currentEnemy.hp = currentEnemy.hp - playerHit;
        battleTwo.menu.text = "ダメージを　" + playerHit + "　与えた！";
        if(currentEnemy.hp <= 0){
          battleTwo.won;
        };
      };
    };
    battleTwo.enemyAttack = function(){
      var currentEnemy = player.currentEnemy;
      var enemyHit = battleTwo.hitStrength(currentEnemy.attack);
      player.hp = player.hp - enemyHit;
      battleTwo.menu.text = "ダメージを" + enemyHit + " 受けた！";
      if(player.hp <= 0){
        battleTwo.lost();
      };
    };
    battleTwo.actions = [{name: "戦う", action: function(){
        battleTwo.wait = true;
        battleTwo.playerAttack();
        setTimeout(function(){
          if(!battleTwo.over){
            battleTwo.enemyAttack();
          };
          if(!battleTwo.over){
            setTimeout(function(){
              battleTwo.menu.text = battleTwo.listActions();
              battleTwo.wait = false;
            }, 1000)
          } else {
            setTimeout(function(){
              battleTwo.menu.text = "";
              game.popScene();
            }, 1000)
          };
        }, 1000);
      }},
      {name: "魔法", action: function(){
        battleTwo.wait = true;
        battleTwo.playerMagic();
        setTimeout(function(){
          if(!battleTwo.over){
            battleTwo.enemyAttack();
          };
          if(!battleTwo.over){
            setTimeout(function(){
              battleTwo.menu.text = battleTwo.listActions();
              battleTwo.wait = false;
            }, 1000)
          } else {
            setTimeout(function(){
              battleTwo.menu.text = "";
              game.popScene();
            }, 1000)
          };
        }, 1000);
      }},
      {name: "逃げる", action: function(){
        game.pause();
        player.statusLabel.text = "あなたはそくそくと逃げた！";
        player.statusLabel.height = 12;
        battleTwo.menu.text = "";
        game.popScene();
      }}
    ];
    battleTwo.listActions = function(){
      battleTwo.optionText = [];
      for(var i = 0; i < battleTwo.actions.length; i++){
        if(i === battleTwo.activeAction){
          battleTwo.optionText[i] = "<span class='active-option'>"+ battleTwo.actions[i].name + "</span>";
        } else {
          battleTwo.optionText[i] = battleTwo.actions[i].name;
        }
      }
      return battleTwo.optionText.join("<br />");
    };
    battleTwo.addCombatants = function(){
      var image = new Surface(game.spriteSheetWidth, game.spriteSheetHeight);
      image.draw(game.assets['sprites.png']);
      battleTwo.player = new Sprite(game.spriteWidth, game.spriteHeight);
      battleTwo.player.image = image;
      battleTwo.player.frame = 7;
      battleTwo.player.x = 150;
      battleTwo.player.y = 120;
      battleTwo.player.scaleX = 2;
      battleTwo.player.scaleY = 2;
      battleTwo.enemy = new Sprite(game.spriteWidth, game.spriteHeight);
      battleTwo.enemy.image = image;
      battleTwo.enemy.frame = 16;
      battleTwo.enemy.x = 150;
      battleTwo.enemy.y = 70;
      battleTwo.enemy.scaleX = 2;
      battleTwo.enemy.scaleY = 2;
      battleTwo.addChild(battleTwo.enemy);
    };
    battleTwo.addCombatants();
    
    battleSceneTwo.on('enter', function() {
      battleTwo.over = false;
      battleTwo.wait = true;
      battleTwo.menu.text = "";
      battleTwo.enemy.frame = 16;
      setTimeout(function(){
        battleTwo.menu.text = battleTwo.listActions();
        battleTwo.wait = false;
      }, 500);
    });
    battleSceneTwo.on('enterframe', function() {
      if(!battleTwo.wait){
        if (game.input.a){
          battleTwo.actions[battleTwo.activeAction].action();
        } else if (game.input.down){
          battleTwo.activeAction = (battleTwo.activeAction + 1) % battleTwo.actions.length;
          battleTwo.menu.text = battleTwo.listActions();
        } else if (game.input.up){
          battleTwo.activeAction = (battleTwo.activeAction - 1 + battleTwo.actions.length) % battleTwo.actions.length;
          battleTwo.menu.text = battleTwo.listActions();
        }
        battleTwo.playerStatus.text = battleTwo.getPlayerStatus();
      };
    })
    battleSceneTwo.on('exit', function() {
      setTimeout(function(){
        battleTwo.menu.text = "";
        battleTwo.activeAction = 0;
        battleTwo.playerStatus.text = battleTwo.getPlayerStatus();
        game.resume();
      }, 1000);
    });
    battleTwo.addChild(battleTwo.playerStatus);
    battleTwo.addChild(battleTwo.menu);
    battleTwo.addChild(battleTwo.player);
    battleSceneTwo.addChild(battleTwo);
  };

    var setBattleBoss = function(){
    battleBossScene.backgroundColor = '#000';
    var battleBoss = new Group();
    battleBoss.menu = new Label();
    battleBoss.menu.x = 20;
    battleBoss.menu.y = 170;
    battleBoss.menu.color = '#fff';  
    battleBoss.activeAction = 0;
    battleBoss.getPlayerStatus = function(){
      return "HP: " + player.hp + "<br />MP: " + player.mp;
    };
    battleBoss.playerStatus = new Label(battleBoss.getPlayerStatus());
    battleBoss.playerStatus.color = '#fff';
    battleBoss.playerStatus.x = 200;
    battleBoss.playerStatus.y = 120;
    battleBoss.hitStrength = function(hit){
      return Math.round((Math.random() + .5) * hit);
    };
    battleBoss.won = function(){
      battleBoss.over = true;
      player.exp += player.currentEnemy.exp;
      player.gp += player.currentEnemy.gp;
      player.currentEnemy.hp = player.currentEnemy.maxHp;
      player.statusLabel.text = "You won!<br />" +
        "経験値を "+ player.currentEnemy.exp + " 獲得し、<br />"+
        "金貨を " + player.currentEnemy.gp + " 獲得した！";
      player.statusLabel.height = 45;
      if(player.exp > player.levelStats[player.level].expMax){
        player.level += 1;
        player.statusLabel.text = player.statusLabel.text + 
          "<br />レベルアップした！"+
          "<br />レベルは " + player.level +"になった！";
        player.statusLabel.height = 75;
      }
      player.hp = player.levelStats[player.level].maxHp;
      player.mp = player.levelStats[player.level].maxMp;
    };
    battleBoss.lost = function(){
      battleBoss.over = true;
      player.hp = player.levelStats[player.level].maxHp;
      player.mp = player.levelStats[player.level].maxMp;
      player.gp = Math.round(player.gp/2);
      player.statusLabel.text = "あなたは負けた・・・";
      player.statusLabel.height = 12;
    };
    battleBoss.playerAttack = function(){
      var currentEnemy = player.currentEnemy;
      var playerHit = battleBoss.hitStrength(player.attack());
      if (player.inventory[0] === 0){
        if(player.inventory[1] === 1){
          playerHit += 10;
        }else if(player.inventory[2] === 1){
          playerHit += 10;
        }else if(player.inventory[3] === 1){
          playerHit += 10;
        }else{
          playerHit += 5;
        }
      }else if (player.inventory[1] === 0){
        if(player.inventory[0] === 1){
          playerHit += 10;
        }else if(player.inventory[2] === 1){
          playerHit += 10;
        }else if(player.inventory[3] === 1){
          playerHit += 10;
        }else{
          playerHit += 5;
        }
      }else if (player.inventory[2] === 0){
        if(player.inventory[1] === 1){
          playerHit += 10;
        }else if(player.inventory[0] === 1){
          playerHit += 10;
        }else if(player.inventory[3] === 1){
          playerHit += 10;
        }else{
          playerHit += 5;
        }
      }else if (player.inventory[3] === 0){
        if(player.inventory[1] === 1){
          playerHit += 10;
        }else if(player.inventory[2] === 1){
          playerHit += 10;
        }else if(player.inventory[0] === 1){
          playerHit += 10;
        }else{
          playerHit += 5;
        }
      }else if(player.inventory[0] === 1){
        playerHit += 10;
      }else if(player.inventory[1] === 1){
        playerHit += 10;
      }else if(player.inventory[2] === 1){
        playerHit += 10;
      }else if(player.inventory[3] === 1){
        playerHit += 10;
      };
      currentEnemy.hp = currentEnemy.hp - playerHit;
      battleBoss.menu.text = "ダメージを " + playerHit + " 与えた！";
      if(currentEnemy.hp <= 0){
         battleBoss.won();
      };
    };
    battleBoss.playerMagic = function(){
      if(player.inventory[0] === 2){
        var currentEnemy = player.currentEnemy;
        var playerHit = 5 * player.level;
        currentEnemy.hp = currentEnemy.hp - playerHit;
        battleBoss.menu.text = "ダメージを　" + playerHit + "　与えた！";
        if(currentEnemy.hp <= 0){
          battleBoss.won;
        };
      };
      if(player.inventory[1] === 2){
        var currentEnemy = player.currentEnemy;
        var playerHit = 5 * player.level;
        currentEnemy.hp = currentEnemy.hp - playerHit;
        battleBoss.menu.text = "ダメージを　" + playerHit + "　与えた！";
        if(currentEnemy.hp <= 0){
          battleBoss.won;
        };
      };
      if(player.inventory[2] === 2){
        var currentEnemy = player.currentEnemy;
        var playerHit = 5 * player.level;
        currentEnemy.hp = currentEnemy.hp - playerHit;
        battleBoss.menu.text = "ダメージを　" + playerHit + "　与えた！";
        if(currentEnemy.hp <= 0){
          battleBoss.won;
        };
      };
      if(player.inventory[3] === 2){
        var currentEnemy = player.currentEnemy;
        var playerHit = 5 * player.level;
        currentEnemy.hp = currentEnemy.hp - playerHit;
        battleBoss.menu.text = "ダメージを　" + playerHit + "　与えた！";
        if(currentEnemy.hp <= 0){
          battleBoss.won;
        };
      };
    };
    battleBoss.enemyAttack = function(){
      var currentEnemy = player.currentEnemy;
      var enemyHit = battleBoss.hitStrength(currentEnemy.attack);
      player.hp = player.hp - enemyHit;
      battleBoss.menu.text = "ダメージを" + enemyHit + " 受けた！";
      if(player.hp <= 0){
        battleBoss.lost();
      };
    };
    battleBoss.actions = [{name: "戦う", action: function(){
        battleBoss.wait = true;
        battleBoss.playerAttack();
        setTimeout(function(){
          if(!battleBoss.over){
            battleBoss.enemyAttack();
          };
          if(!battleBoss.over){
            setTimeout(function(){
              battleBoss.menu.text = battleBoss.listActions();
              battleBoss.wait = false;
            }, 1000)
          } else {
            setTimeout(function(){
              battleBoss.menu.text = "";
              game.popScene();
            }, 1000)
          };
        }, 1000);
      }},
      {name: "魔法", action: function(){
        battleBoss.wait = true;
        battleBoss.playerMagic();
        setTimeout(function(){
          if(!battleBoss.over){
            battleBoss.enemyAttack();
          };
          if(!battleBoss.over){
            setTimeout(function(){
              battleBoss.menu.text = battleBoss.listActions();
              battleBoss.wait = false;
            }, 1000)
          } else {
            setTimeout(function(){
              battleBoss.menu.text = "";
              game.popScene();
            }, 1000)
          };
        }, 1000);
      }},
      {name: "逃げる", action: function(){
        game.pause();
        player.statusLabel.text = "あなたはそそくさと逃げた！";
        player.statusLabel.height = 12;
        battleBoss.menu.text = "";
        game.popScene();
      }}
    ];
    battleBoss.listActions = function(){
      battleBoss.optionText = [];
      for(var i = 0; i < battleBoss.actions.length; i++){
        if(i === battleBoss.activeAction){
          battleBoss.optionText[i] = "<span class='active-option'>"+ battleBoss.actions[i].name + "</span>";
        } else {
          battleBoss.optionText[i] = battleBoss.actions[i].name;
        }
      }
      return battleBoss.optionText.join("<br />");
    };
    battleBoss.addCombatants = function(){
      var image = new Surface(game.spriteSheetWidth, game.spriteSheetHeight);
      image.draw(game.assets['sprites.png']);
      battleBoss.player = new Sprite(game.spriteWidth, game.spriteHeight);
      battleBoss.player.image = image;
      battleBoss.player.frame = 7;
      battleBoss.player.x = 150;
      battleBoss.player.y = 120;
      battleBoss.player.scaleX = 2;
      battleBoss.player.scaleY = 2;
      battleBoss.enemy = new Sprite(game.spriteWidth, game.spriteHeight);
      battleBoss.enemy.image = image;
      battleBoss.enemy.x = 150;
      battleBoss.enemy.y = 70;
      battleBoss.enemy.scaleX = 2;
      battleBoss.enemy.scaleY = 2;
      battleBoss.addChild(battleBoss.enemy);
    };
    battleBoss.addCombatants();
    
    battleBossScene.on('enter', function() {
      battleBoss.over = false;
      battleBoss.wait = true;
      battleBoss.menu.text = "";
      battleBoss.enemy.frame = 17;
      setTimeout(function(){
        battleBoss.menu.text = battleBoss.listActions();
        battleBoss.wait = false;
      }, 500);
    });
    battleBossScene.on('enterframe', function() {
      if(!battleBoss.wait){
        if (game.input.a){
          battleBoss.actions[battleBoss.activeAction].action();
        } else if (game.input.down){
          battleBoss.activeAction = (battleBoss.activeAction + 1) % battleBoss.actions.length;
          battleBoss.menu.text = battleBoss.listActions();
        } else if (game.input.up){
          battleBoss.activeAction = (battleBoss.activeAction - 1 + battleBoss.actions.length) % battleBoss.actions.length;
          battleBoss.menu.text = battleBoss.listActions();
        }
        battleBoss.playerStatus.text = battleBoss.getPlayerStatus();
      };
    })
    battleBossScene.on('exit', function() {
      setTimeout(function(){
        battleBoss.menu.text = "";
        battleBoss.activeAction = 0;
        battleBoss.playerStatus.text = battleBoss.getPlayerStatus();
        game.resume();
      }, 1000);
    });
    battleBoss.addChild(battleBoss.playerStatus);
    battleBoss.addChild(battleBoss.menu);
    battleBoss.addChild(battleBoss.player);
    battleBossScene.addChild(battleBoss);
  };

  var setShopping = function(){
    var shop = new Group();
    shop.itemSelected = 0;
    shop.shoppingFunds = function(){
      return "Gold: " + player.gp;
    };
    shop.drawManeki = function(){
      var image = new Surface(game.spriteSheetWidth, game.spriteSheetHeight);
      var maneki = new Sprite(game.spriteWidth, game.spriteHeight);
      maneki.image = image;
      image.draw(game.assets['sprites.png']);
      maneki.frame = 4;
      maneki.y = 10;
      maneki.x = 10;
      maneki.scaleX = 2;
      maneki.scaleY = 2;
      this.addChild(maneki);
      this.message.x = 40;
      this.message.y = 10;
      this.message.color = '#fff';
      this.addChild(this.message);
    };
    
    shop.drawItemsForSale = function(){
      for(var i = 0; i < game.items.length; i++){
        var image = new Surface(game.itemSpriteSheetWidth, game.spriteSheetHeight);
        var item = new Sprite(game.spriteWidth, game.spriteHeight);
        image.draw(game.assets['items.png']);
        itemLocationX = 30 + 70*i;
        itemLocationY = 70;
        item.y = itemLocationY;
        item.x = itemLocationX;
        item.frame = i;
        item.scaleX = 2;
        item.scaleY = 2;
        item.image = image;
        this.addChild(item);
        var itemDescription = new Label(game.items[i].price + "<br />" + game.items[i].description);
        itemDescription.x = itemLocationX - 8;
        itemDescription.y = itemLocationY + 40;
        itemDescription.color = '#fff';
        this.addChild(itemDescription);
        if(i === this.itemSelected){
          var image = new Surface(game.spriteSheetWidth, game.spriteSheetHeight);
          this.itemSelector = new Sprite(game.spriteWidth, game.spriteHeight);
          image.draw(game.assets['sprites.png']);
          itemLocationX = 30 + 70*i;
          itemLocationY = 160;
          this.itemSelector.scaleX = 2;
          this.itemSelector.scaleY = 2;
          this.itemSelector.y = itemLocationY;
          this.itemSelector.x = itemLocationX;
          this.itemSelector.frame = 7;
          this.itemSelector.image = image;
          this.addChild(this.itemSelector);
        };
      };
    };
    shop.on('enter', function(){
      shoppingFunds.text = shop.shoppingFunds();
    });
    shop.on('enterframe', function() {
      setTimeout(function(){
        if (game.input.a){
          shop.attemptToBuy();
        } else if (game.input.down) {
          shop.message.text = shop.farewell;
          setTimeout(function(){
            game.popScene();
            shop.message.text = shop.greeting;
          }, 1000);
        } else if (game.input.left) {
          shop.itemSelected = shop.itemSelected + game.items.length - 1;
          shop.itemSelected = shop.itemSelected % game.items.length;
          shop.itemSelector.x = 30 + 70*shop.itemSelected;
          shop.message.text = shop.greeting;
        } else if (game.input.right) {
          shop.itemSelected = (shop.itemSelected + 1) % game.items.length;
          shop.itemSelector.x = 30 + 70*shop.itemSelected;
          shop.message.text = shop.greeting;
        }
      }, 500);
      player.showInventory(100);
      shoppingFunds.text = shop.shoppingFunds();
    });
    shop.attemptToBuy = function(){
      var itemPrice = game.items[this.itemSelected].price;
      if (player.gp < itemPrice){
        this.message.text = this.apology;
      }else{
        player.visibleItems = [];
        player.gp = player.gp - itemPrice;
        player.inventory.push(game.items[this.itemSelected].id);
        this.message.text = this.sale;
      }
    };
    
    shop.greeting = "久ぶりのお客だにゃあ！";
    shop.apology = "ごめんにゃさいね、金貨が足りないの、ミャオ。";
    shop.sale = "ありがとうだにゃ！";
    shop.farewell = "また来てにゃ、ミャオ！";
    shop.message = new Label(shop.greeting);
    shop.drawManeki();
    var shoppingFunds = new Label(shop.shoppingFunds());
    shoppingFunds.color = '#fff';
    shoppingFunds.y = 200;
    shoppingFunds.x = 10;
    shop.addChild(shoppingFunds);
    shop.drawItemsForSale();
    shopScene.backgroundColor = '#000';
    shopScene.addChild(shop);
  };
    
  game.focusViewport = function(){
    var x = Math.min((game.width  - 16) / 2 - player.x, 0);
    var y = Math.min((game.height - 16) / 2 - player.y, 0);
    x = Math.max(game.width,  x + map.width)  - map.width;
    y = Math.max(game.height, y + map.height) - map.height;
    game.rootScene.firstChild.x = x;
    game.rootScene.firstChild.y = y;
  };
  game.onload = function(){
    setMaps();
    setPlayer();
    setStage();
    setShopping();
    setBattle();
    setBattleTwo();
    setBattleBoss();
    player.on('enterframe', function() {
      player.move();
      if (game.input.a) {
        var playerFacing = player.facing();
        if(!playerFacing || !spriteRoles[playerFacing]){
          player.displayStatus();
        }else{
          spriteRoles[playerFacing].action();
        };
      };
    });
    game.rootScene.on('enterframe', function(e) {
      game.focusViewport();
    });
  };
  game.start();
};