// const GWE = require("../dist/gw-entity");

// # File: pain.txt


// # This file is used to initialize the monster pain messages for Angband.

// # === Understanding pain.txt ===

// # type: serial number
// # message: message
// # message: message
// # etc.

// # 'type' indicates the beginning of an entry. The serial number must
// # increase for each new item.

// # 'message' is for the pain message. Each entry must have 7 messages --
// # each one corresponds to a range of health, with higher messages 
// # being displayed when a monster is damaged only a little, and lower
// # messages being displayed when a monster is near death.


GWE.actor.installPain( "2", ["shrug[s] off the attack.","grunt[s] with pain.","cr[ies|y] out in pain.","scream[s] in pain.","scream[s] in agony.","writhe[s] in agony.","cr[ies|y] out feebly."]);

GWE.actor.installPain( "3", ["barely notice[s].","flinch[es].","squelch[es].","quiver[s] in pain.","writhe[s] about.","writhe[s] in agony.","jerk[s] limply."]);

GWE.actor.installPain( "4", ["shrug[s] off the attack.","snarl[s] with pain.","yelp[s] in pain.","howl[s] in pain.","howl[s] in agony.","writhe[s] in agony.","yelp[s] feebly."]);

GWE.actor.installPain( "5", ["ignore[s] the attack.","grunt[s] with pain.","squeal[s] in pain.","shriek[s] in pain.","shriek[s] in agony.","writhe[s] in agony.","cr[ies|y] out feebly."]);

GWE.actor.installPain( "6", ["barely notice[s].","hiss[es].","rear[s] up in anger.","hiss[es] furiously.","writhe[s] about.","writhe[s] in agony.","jerk[s] limply."]);

GWE.actor.installPain( "7", ["shrug[s] off the attack.","snarl[s].","growl[s] angrily.","hiss[es] in pain.","mewl[s] in pain.","hiss[es] in agony.","mewl[s] pitifully."]);

GWE.actor.installPain( "8", ["ignore[s] the attack.","drone[s] angrily.","scuttle[s] about.","twitch[es] in pain.","jerk[s] in pain.","jerk[s] in agony.","jerk[s] feebly."]);

GWE.actor.installPain( "9", ["shrug[s] off the attack.","flap[s] angrily.","jeer[s] in pain.","squawk[s] with pain.","twitter[s] in agony.","flutter[s] about.","chirp[s] feebly."]);

GWE.actor.installPain( "10", ["ignore[s] the attack.","jerk[s].","rattle[s].","clatter[s].","shake[s].","stagger[s].","crumple[s]."]);

GWE.actor.installPain( "11", ["ignore[s] the attack.","grunt[s].","jerk[s].","moan[s].","groan[s].","hesitate[s].","stagger[s]."]);

GWE.actor.installPain( "12", ["ignore[s] the attack.","spin[s] fiercely.","swirl[s] about.","twist[s] around.","spin[s] slowly.","swirl[s] weakly.","twist[s] limply."]);
GWE.actor.installPain( "12", ["laugh[s] off the attack.","sneer[s].","scowl[s].","bellow[s] in rage.","scream[s] in fury.","grunt[s].","wince[s]."]);
