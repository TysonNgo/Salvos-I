# Deployment

```
git checkout gh-pages
sh _deploy.sh
```

# Development

```
npm start
```

# Gameplay

##### *Controls:

↑ - move up

↓ - move down

← - move left

→ - move right

x - shoot

z - shield

\*Note: controls can be changed in the config menu.

### Player

##### Special Inputs

- Dash by pressing the `shoot` and `shield` button at the same time while holding a direction. You cannot change directions while dashing. You may cancel your dash by pressing the `shoot` button. 25% meter cost.

- Clear nearby enemy projectiles by quickly moving the player in a circle either counter-clockwise or clockwise and then pressing the `shoot` button. If you are familiar with Street Fighter, performing this action is equivalent to inputting Zangief's Spinning Piledriver. 50% meter cost.

##### Meter

- A resource used to help you survive.

- Meter is gained when you attack the enemy.

- While a shield is active, the amount of meter gained is decreased.

### Enemy

The enemy has 13 unique actions. Actions are constantly executed randomly. At the start of the game, all actions have the same probability of being executed, but every 30 seconds, their probabilities are adjusted.

# Extra Information

- Built with Phaser 3.15.1

- Sound effects created with Audacity.

- Sprites created with Krita.
