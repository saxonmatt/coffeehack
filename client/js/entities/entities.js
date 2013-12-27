/*------------------- 
a player entity
-------------------------------- */
game.PlayerEntity = me.ObjectEntity.extend({

    /* -----

    constructor

    ------ */

    init: function (x, y, settings, name, id) {
        // call the constructor
        this.parent(x, y, settings);

        this.name = id;

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(5,5);

        this.bubble = new game.SpeechBubble(this.pos.x, this.pos.y, "arse");
        me.game.world.addChild(this.bubble);

        this.font = new me.Font('helvetica,arial,sans-serif','16px','#ffffff','center');

        this.z = 10;

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        //window.playerEntity = this;
        this.playerName = name;
    },

    /* -----

    update the player pos

    ------ */
    update: function () {

        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }

        if (me.input.isKeyPressed('up')) {
            // flip the sprite on horizontal axis
            //this.flipX(true);
            // update the entity velocity
            this.vel.y -= this.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('down')) {
            // unflip the sprite
            //this.flipX(false);
            // update the entity velocity
            this.vel.y += this.accel.y * me.timer.tick;
        } else {
            this.vel.y = 0;
        }
        

        // check & update player movement
        this.updateMovement();

        this.bubble.pos.x = this.pos.x+32;
        this.bubble.pos.y = this.pos.y-180;

        // update animation if necessary
        if (this.vel.x != 0 || this.vel.y != 0) {
            // update object animation
            this.parent();
            return true;
        }

        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    },

    draw: function (context) {
        this.font.draw(context, this.playerName, this.pos.x+32, this.pos.y - 20);
        this.parent(context);
    }

});

game.SpeechBubble = me.ObjectContainer.extend({
    
    init: function (x, y, text) {
        // call the constructor
        this.parent(x, y, 300,200);

        this.font = new me.Font('helvetica,arial,sans-serif', '16px', '#000000', 'left');

        this.z = 11;

        var spr = new me.SpriteObject(0, 0, me.loader.getImage("bubble"), 300, 200);
        //spr.floating = true;
        spr.z = 12;
        this.addChild(spr);

        this.text = text;

        this.alwaysUpdate = true;
    },

    draw: function (context) {
        this.parent(context);
        this.font.draw(context, this.text, this.pos.x + 32, this.pos.y + 32);
        
    }

});
