package;

import flixel.FlxG;
import flixel.FlxSprite;
import flixel.FlxState;
import flixel.group.FlxGroup;
import flixel.text.FlxText;
import flixel.util.FlxColor;

class GameState extends FlxState
{
	var notes:FlxGroup;
	var score:Int = 0;
	var scoreText:FlxText;
	var combo:Int = 0;
	var comboText:FlxText;

	override public function create():Void
	{
		super.create();
		
		// Background
		FlxG.camera.bgColor = FlxColor.GRAY;
		
		// Initialize note group
		notes = new FlxGroup();
		add(notes);
		
		// Score display
		scoreText = new FlxText(10, 10, 200, "Score: 0", 16);
		scoreText.setFormat(null, 16, FlxColor.WHITE);
		add(scoreText);
		
		// Combo display
		comboText = new FlxText(10, 40, 200, "Combo: 0", 16);
		comboText.setFormat(null, 16, FlxColor.WHITE);
		add(comboText);
		
		// Draw lane guides
		drawLanes();
	}

	function drawLanes():Void
	{
		// Draw 4 lanes for left, down, right, up arrows
		var laneWidth = FlxG.width / 4;
		for (i in 0...4)
		{
			var lane = new FlxSprite(i * laneWidth, 0);
			lane.makeGraphic(Std.int(laneWidth), FlxG.height, FlxColor.DARK_GRAY);
			lane.alpha = 0.3;
			add(lane);
		}
	}

	override public function update(elapsed:Float):Void
	{
		super.update(elapsed);
		
		// LEFT: Arrow Left or A
		if (FlxG.keys.justPressed.LEFT || FlxG.keys.justPressed.A)
		{
			onNoteHit();
		}
		// DOWN: Arrow Down or S
		else if (FlxG.keys.justPressed.DOWN || FlxG.keys.justPressed.S)
		{
			onNoteHit();
		}
		// RIGHT: Arrow Right or D
		else if (FlxG.keys.justPressed.RIGHT || FlxG.keys.justPressed.D)
		{
			onNoteHit();
		}
		// UP: Arrow Up or W
		else if (FlxG.keys.justPressed.UP || FlxG.keys.justPressed.W)
		{
			onNoteHit();
		}
		
		// Return to menu
		if (FlxG.keys.justPressed.ESCAPE)
		{
			FlxG.switchState(new PlayState());
		}
	}

	function onNoteHit():Void
	{
		score += 10;
		combo += 1;
		updateUI();
	}

	function updateUI():Void
	{
		scoreText.text = "Score: " + score;
		comboText.text = "Combo: " + combo;
	}
}
