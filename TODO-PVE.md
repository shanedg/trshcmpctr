# PVE

I'm thinking about Dwarf Fortress again.
I guess I want some kind of a city builder.
The elements lashing at city walls,
electrical and radiation storms.
Oceans rise and rock crumbles as simulated eons pass.

## Prior Art

* Dwarf Fortress
* Minecraft
* Starcraft
* LEGO Rock Raiders

## Abstract

* real-time simulation
* can influence or directly command agents
* option to slow or stop "time" ticks for "perfect" control
  * this would be challenging to do symmetrically in a multiplayer context
  but there's no (technical) reason that multiple players couldn't share
  control of pause/play:
    * synchronization not impossible, honestly maybe even less trivial with zero pausing (?)
    * if one player can pause for entire server:
      * player who paused should be communicated
      * should be possible to chat with others to discuss pause and when to play
      * should be possible to "queue" pauses to avoid surprise play;
      if player a pauses and player b tries to pause before play,
      player b's pause will take effect immediately when player a plays
* procedurally generated world
