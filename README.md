# Friday Night Funkin' Game

A rhythm game inspired by Friday Night Funkin', built with HaxeFlixel.

## Setup

### Prerequisites
- **Haxe** (v4.2.5+)
- **HaxeFlixel**
- **Lime**
- **OpenFL**

### Installation

1. Install Haxe from https://haxe.org/download/

2. Install HaxeFlixel libraries:
   ```bash
   haxelib install flixel
   haxelib install flixel-tools
   haxelib run flixel-tools setup
   haxelib install lime
   haxelib install openfl
   ```

3. Clone this repository:
   ```bash
   git clone https://github.com/djopperman-ship-it/fnf-game.git
   cd fnf-game
   ```

## Running the Game

```bash
lime test windows
```

Other targets:
- `lime test html5` (browser)
- `lime test mac`
- `lime test linux`

## Project Structure

```
fnf-game/
├── source/
│   ├── Main.hx          # Entry point
│   ├── PlayState.hx     # Menu screen
│   └── GameState.hx     # Game screen
├── assets/              # Art, music, sounds
│   ├── images/
│   ├── music/
│   └── sounds/
├── project.xml          # HaxeFlixel config
└── README.md
```

## Features (Roadmap)

- [ ] Character sprites & animations
- [ ] Song charting system
- [ ] Rhythm note mechanics
- [ ] Scoring & combo system
- [ ] Custom songs & mods
- [ ] Opponent AI
- [ ] Story mode

## Controls

- **Arrow Keys** – Hit notes
- **SPACE** – Start game
- **ESC** – Return to menu

## Learning Resources

- [HaxeFlixel Documentation](https://haxeflixel.com/documentation/)
- [Haxe Documentation](https://haxe.org/manual/)
- [FNF Modding Wiki](https://gamebanana.com/wikis/games/7749)

## Contributing

Feel free to fork and submit pull requests!

## License

MIT License
