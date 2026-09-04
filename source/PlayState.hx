package;

import flixel.FlxG;
import flixel.FlxSprite;
import flixel.FlxState;
import flixel.text.FlxText;
import flixel.util.FlxColor;

class PlayState extends FlxState
{
	var titleText:FlxText;

	override public function create():Void
	{
		super.create();
		
		// Set background color
		FlxG.camera.bgColor = FlxColor.BLACK;
		
		// Create title text
		titleText = new FlxText(0, 0, FlxG.width, "Friday Night Funkin'", 32);
		titleText.setFormat(null, 32, FlxColor.WHITE, CENTER);
		titleText.y = FlxG.height / 2 - 16;
		add(titleText);
		
		// Create subtitle
		var subtitleText = new FlxText(0, titleText.y + 50, FlxG.width, "Press SPACE to start", 16);
		subtitleText.setFormat(null, 16, FlxColor.GRAY, CENTER);
		add(subtitleText);
	}

	override public function update(elapsed:Float):Void
	{
		super.update(elapsed);
		
		// Start game on SPACE
		if (FlxG.keys.justPressed.SPACE)
		{
			FlxG.switchState(new GameState());
		}
	}
}
