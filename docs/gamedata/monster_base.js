// # This file provides information for monster "templates".
// #
// # name : template name
// # glyph : default display character
// # pain : pain message index
// # flags : flag | flag | ...
// # desc : description
// #
// # 'name' indicates the beginning of an entry. The template name is used in
// # monster.txt.
// #
// # 'glyph' indicates the default display character. This is used for displaying
// # the monster in ASCII mode, and also for determining which monsters are
// # of the same "type" for things like the ESCORT flag or the S_KIN summon.
// #
// # 'pain' indicates which set of "pain messages" (from pain.txt) is used.
// #
// # 'flags' indicates the flags that every monster inherits from this template.
// #
// # 'desc' indicates the textual description of this template that is used by
// # the '/' command in-game.
// #
// # Note that these templates have references in other data files. Changing
// # characteristics of monster bases is fine, but the names are referenced in
// # several other data files (notably monster.txt), so any name changes will
// # have to take this into account.

// ##### Normal monster templates #####

// # Dragons are the most important breathing monsters in Angband, and their
// # breaths are their most important quality.
var monster_base = {
    // # Ainur were the founding spirits of Arda, and could take any form they wished.
    // # Ainur in Angband typically have shapechanges and many possibe other spells,
    // # but typically don't breathe
    ANCIENT_DRAGON: {
        id: 'ANCIENT_DRAGON',
        name: 'ancient dragon',
        ch: 'D',
        pain: '1',
        flags: 'DRAGON | EVIL | POWERFUL | SMART | SPIRIT | DROP_4 | MOVE_BODY | CLEAR_WEB | NO_CONF | NO_SLEEP | NO_HOLD | FORCE_SLEEP',
        desc: 'Ancient Dragon/Wyrm',
    },

    // # Ants have lowish HP but highish armor class, and powerful melee for their
    // # depth
    AINU: {
        id: 'AINU',
        name: 'ainu',
        ch: 'A',
        pain: '1',
        flags: 'POWERFUL | SPIRIT | SMART | ONLY_ITEM | OPEN_DOOR | BASH_DOOR | TAKE_ITEM | CLEAR_WEB | IM_COLD | IM_FIRE | IM_POIS | NO_CONF | NO_SLEEP | NO_HOLD | FORCE_SLEEP',
        desc: 'Ainu/maia',
    },

    // # Fast, not strong, annoying
    ANT: {
        id: 'ANT',
        name: 'ant',
        ch: 'a',
        pain: '7',
        flags: 'ANIMAL | WEIRD_MIND | BASH_DOOR',
        desc: 'Ant',
    },

    // # Quickish monsters usually with some effect beyond melee
    BAT: {
        id: 'BAT',
        name: 'bat',
        ch: 'b',
        pain: '4',
        flags: 'ANIMAL',
        desc: 'Bat',
    },

    // # Wolves are animals which mostly come in packs, and are associated with evil
    // # creatures, especially orcs and Sauron
    BIRD: {
        id: 'BIRD',
        name: 'bird',
        ch: 'B',
        pain: '8',
        flags: 'ANIMAL | CLEAR_WEB',
        desc: 'Bird',
    },

    // # Centipedes are mastly weak, sometimes quick, and their melee attacks are often
    // # early examples of different blow effects
    CANINE: {
        id: 'CANINE',
        name: 'canine',
        ch: 'C',
        pain: '3',
        flags: 'ANIMAL | CLEAR_WEB',
        desc: 'Canine (Dog)',
    },

    // # Creeping coins are mimics which look like coins until they attack, hit to
    // # poison, and drop the approriate type of treasure
    CENTIPEDE: {
        id: 'CENTIPEDE',
        name: 'centipede',
        ch: 'c',
        pain: '5',
        flags: 'ANIMAL | WEIRD_MIND',
        desc: 'Centipede',
    },

    // # Dragons are the most important breathing monsters in Angband, and their
    // # breaths are their most important quality.
    CREEPING_COINS: {
        id: 'CREEPING_COINS',
        name: 'creeping coins',
        ch: '$',
        pain: '1',
        flags: 'COLD_BLOOD | METAL | UNAWARE | EMPTY_MIND | ONLY_GOLD | BASH_DOOR | CLEAR_WEB | IM_ELEC | IM_POIS | NO_CONF | NO_SLEEP | MIMIC_INV',
        desc: 'Creeping Coins',
    },

    // # Early, weak breathers which move quickly and erratically
    DRAGON: {
        id: 'DRAGON',
        name: 'dragon',
        ch: 'd',
        pain: '1',
        flags: 'DRAGON | EVIL | SPIRIT | FORCE_SLEEP | CLEAR_WEB',
        desc: 'Dragon',
    },

    // # These come in two stages:
    // # 1. Motionless creatures which cause bad effects if you stand next to them
    // # 2. Moving spellcasters (typically as many spells as eye-stalks) with
    // #    anti-magic melee
    DRAGON_FLY: {
        id: 'DRAGON_FLY',
        name: 'dragon fly',
        ch: 'F',
        pain: '7',
        flags: 'ANIMAL | WEIRD_MIND | RAND_50 | BASH_DOOR | FORCE_SLEEP',
        desc: 'Dragon Fly',
    },

    // # Creatures (mostly) embodying a single element, mostly with lowish HP
    EYE: {
        id: 'EYE',
        name: 'eye',
        ch: 'e',
        pain: '1',
        flags: 'CLEAR_WEB',
        desc: 'Floating Eye',
    },

    // # Fast moving, bash doors, hit hard in melee
    ELEMENTAL: {
        id: 'ELEMENTAL',
        name: 'elemental',
        ch: 'E',
        pain: '1',
        flags: 'EMPTY_MIND | CLEAR_WEB | IM_POIS | NO_FEAR | NO_CONF | NO_SLEEP | NONLIVING',
        desc: 'Elemental',
    },

    // # Wall-passing invisible spirits, frequently drain experience and/or stats.
    // # Relatively weak to compensate for being hard to escape
    FELINE: {
        id: 'FELINE',
        name: 'feline',
        ch: 'f',
        pain: '6',
        flags: 'ANIMAL | CLEAR_WEB',
        desc: 'Feline (Cat)',
    },

    // # Giants are big, strong humanoids which hit hard and throw boulders.  They
    // # may be associated with an element and have some spells, but their focus is
    // # powerful melee.
    GHOST: {
        id: 'GHOST',
        name: 'ghost',
        ch: 'G',
        pain: '1',
        flags: 'UNDEAD | EVIL | INVISIBLE | COLD_BLOOD | SPIRIT | PASS_WALL | IM_COLD | IM_POIS | NO_CONF | NO_SLEEP | NO_STUN | NO_HOLD',
        desc: 'Ghost',
    },

    // # Mostly slow with lots of hitpoints and armor
    GIANT: {
        id: 'GIANT',
        name: 'giant',
        ch: 'P',
        pain: '1',
        flags: 'GIANT | EVIL | SPIRIT | BASH_DOOR | CLEAR_WEB',
        desc: 'Giant Humanoid',
    },

    GOLEM: {
        id: 'GOLEM',
        name: 'golem',
        ch: 'g',
        pain: '1',
        flags: 'EMPTY_MIND | CLEAR_WEB | IM_ELEC | NO_FEAR | NO_CONF | NO_SLEEP | NONLIVING',
        desc: 'Golem',
    },

    // # Weird legendary stuff, mostly without spells, sometimes with breath
    HUMANOID: {
        id: 'HUMANOID',
        name: 'humanoid',
        ch: 'h',
        pain: '1',
        flags: 'OPEN_DOOR | BASH_DOOR | SPIRIT | CLEAR_WEB',
        desc: 'Hobbit/Elf/Dwarf',
    },

    // # Quick monsters with strong melee, the higher level ones getting fire and/or
    // # poison attacks
    HYBRID: {
        id: 'HYBRID',
        name: 'hybrid',
        ch: 'H',
        pain: '1',
        flags: 'CLEAR_WEB',
        desc: 'Hybrid',
    },

    // # Non-descript early monsters that demonstrate some stuff but are mostly filler
    HYDRA: {
        id: 'HYDRA',
        name: 'hydra',
        ch: 'M',
        pain: '4',
        flags: 'ANIMAL | ONLY_GOLD | BASH_DOOR | CLEAR_WEB | FORCE_SLEEP | HURT_COLD',
        desc: 'Hydra',
    },

    // # Insects are small, a bit fast, weak breeders which bite for various effects
    ICKY_THING: {
        id: 'ICKY_THING',
        name: 'icky thing',
        ch: 'i',
        pain: '2',
        flags: 'RAND_50',
        desc: 'Icky Thing',
    },

    // # Mostly non-moving creatures which touch for various effects
    INSECT: {
        id: 'INSECT',
        name: 'insect',
        ch: 'I',
        pain: '7',
        flags: 'ANIMAL | WEIRD_MIND | MULTIPLY | RAND_50 | RAND_25',
        desc: 'Insect',
    },

    // # Giant beetles with high armor class and fairly powerful bites, frequently
    // # spitting.  No breaths or spells.
    JELLY: {
        id: 'JELLY',
        name: 'jelly',
        ch: 'j',
        pain: '2',
        flags: 'EMPTY_MIND | STUPID | CLEAR_WEB | NO_FEAR',
        desc: 'Jelly',
    },

    // # Early-game equivalents of things like orcs and trolls
    KILLER_BEETLE: {
        id: 'KILLER_BEETLE',
        name: 'killer beetle',
        ch: 'K',
        pain: '7',
        flags: 'ANIMAL | WEIRD_MIND | BASH_DOOR',
        desc: 'Killer Beetle',
    },

    // # Powerful undead spellcasters, tending to drain dexterity and charges in melee
    KOBOLD: {
        id: 'KOBOLD',
        name: 'kobold',
        ch: 'k',
        pain: '1',
        flags: 'EVIL | OPEN_DOOR | BASH_DOOR | SPIRIT | CLEAR_WEB | IM_POIS',
        desc: 'Kobold',
    },

    // # Weird monsters tha look like floor.
    LICH: {
        id: 'LICH',
        name: 'lich',
        ch: 'L',
        pain: '1',
        flags: 'UNDEAD | EVIL | COLD_BLOOD | SMART | SPIRIT | OPEN_DOOR | BASH_DOOR | CLEAR_WEB | IM_COLD | IM_POIS | NO_CONF | NO_SLEEP | NO_STUN | NO_HOLD | FORCE_SLEEP',
        desc: 'Lich',
    },

    // # Demons are evil and tend to be fire-based.  Major demons frequently summon,
    // # have a few powerful spells and/or breaths, and often dangerous melee.
    LURKER: {
        id: 'LURKER',
        name: 'lurker',
        ch: '.',
        pain: '1',
        flags: 'COLD_BLOOD | EMPTY_MIND | INVISIBLE | UNAWARE | NEVER_MOVE | NO_FEAR | NO_CONF | NO_SLEEP | CHAR_CLEAR | ATTR_CLEAR',
        desc: 'Lurker',
    },

    // # Monsters which pretend to be objects.  They don't move but do cast spells,
    // # and attack if the player steps next to them.
    MAJOR_DEMON: {
        id: 'MAJOR_DEMON',
        name: 'major demon',
        ch: 'U',
        pain: '1',
        flags: 'DEMON | EVIL | SPIRIT | ONLY_ITEM | OPEN_DOOR | BASH_DOOR | CLEAR_WEB | NO_CONF | NO_SLEEP | NO_HOLD | FORCE_SLEEP',
        desc: 'Major Demon',
    },

    // # Demons are evil and tend to be fire-based.  Minor demons are mostly
    // # annoying rather than dangerous.
    MIMIC: {
        id: 'MIMIC',
        name: 'mimic',
        ch: '?',
        pain: '1',
        flags: 'COLD_BLOOD | EMPTY_MIND | UNAWARE | NEVER_MOVE | NO_FEAR | NO_CONF | NO_SLEEP | FORCE_SLEEP | ATTR_CLEAR',
        desc: 'Mimic',
    },

    // # Non-moving growths which release spores when stepped next to
    MINOR_DEMON: {
        id: 'MINOR_DEMON',
        name: 'minor demon',
        ch: 'u',
        pain: '1',
        flags: 'DEMON | EVIL | SPIRIT | CLEAR_WEB | IM_FIRE',
        desc: 'Minor Demon',
    },

    // # Small (mostly) non-moving (mostly) spore-releasing-for-effect creatures
    MOLD: {
        id: 'MOLD',
        name: 'mold',
        ch: 'm',
        pain: '2',
        flags: 'NEVER_MOVE | IM_POIS | HURT_FIRE | NO_FEAR | NO_CONF | NO_SLEEP',
        desc: 'Mold',
    },

    // # Female serpent-like monsters
    MUSHROOM: {
        id: 'MUSHROOM',
        name: 'mushroom',
        ch: ',',
        pain: '2',
        flags: 'EMPTY_MIND | STUPID | HURT_FIRE | NO_FEAR | NO_CONF | NO_SLEEP',
        desc: 'Mushroom',
    },

    // # Ogres are like small giants, or large orcs.  Mostly straightforward melee
    // # fighters who come in packs, with occaisonal lone spellcasters.
    NAGA: {
        id: 'NAGA',
        name: 'naga',
        ch: 'n',
        pain: '1',
        flags: 'FEMALE | EVIL | HURT_COLD | SPIRIT | BASH_DOOR | CLEAR_WEB',
        desc: 'Naga',
    },

    // # Orcs are the foot-soldiers of Morgoth.  They melee and use archery, but
    // # mostly don't use magic.  They tend to appear in groups.
    OGRE: {
        id: 'OGRE',
        name: 'ogre',
        ch: 'O',
        pain: '1',
        flags: 'GIANT | EVIL | SPIRIT | OPEN_DOOR | BASH_DOOR | CLEAR_WEB',
        desc: 'Ogre',
    },

    ORC: {
        id: 'ORC',
        name: 'orc',
        ch: 'o',
        pain: '1',
        flags: 'MALE | ORC | EVIL | SPIRIT | OPEN_DOOR | BASH_DOOR | CLEAR_WEB',
        desc: 'Orc',
    },

    // # A grab-bag of four-legged things with no real defining quality
    PERSON: {
        id: 'PERSON',
        name: 'person',
        ch: 'p',
        pain: '1',
        flags: 'BASH_DOOR | SPIRIT | CLEAR_WEB',
        desc: 'Person/Human',
    },

    // # Non-moving, non-attacking summoners
    QUADRUPED: {
        id: 'QUADRUPED',
        name: 'quadruped',
        ch: 'q',
        pain: '4',
        flags: 'BASH_DOOR | CLEAR_WEB',
        desc: 'Quadruped',
    },

    // # Mostly early monsters, but later ones are dangerous.  Not fast for depth
    QUYLTHULG: {
        id: 'QUYLTHULG',
        name: 'quylthulg',
        ch: 'Q',
        pain: '2',
        flags: 'EMPTY_MIND | INVISIBLE | NEVER_BLOW | NEVER_MOVE | NO_FEAR | NO_CONF | NO_SLEEP | NO_HOLD | FORCE_SLEEP',
        desc: 'Quylthulg',
    },

    // # Small, weak, early breeders, with one surprise non-breeder
    REPTILE: {
        id: 'REPTILE',
        name: 'reptile',
        ch: 'R',
        pain: '5',
        flags: 'ANIMAL | HURT_COLD | CLEAR_WEB',
        desc: 'Reptile/Amphibian',
    },

    // # The non-unique skeletons break into two (early and late) groups:
    // # 1. Empty minded animated skeletons with movement and melee but no spells
    // # 2. Smart drujs with no movement or melee, but which have high speed and
    // #    cast spells every turn
    RODENT: {
        id: 'RODENT',
        name: 'rodent',
        ch: 'r',
        pain: '4',
        flags: 'ANIMAL | CLEAR_WEB',
        desc: 'Rodent',
    },

    // # Snakes are typically slow, but have high armor class
    SKELETON: {
        id: 'SKELETON',
        name: 'skeleton',
        ch: 's',
        pain: '9',
        flags: 'UNDEAD | EVIL | COLD_BLOOD | CLEAR_WEB | IM_COLD | IM_POIS | NO_FEAR | NO_CONF | NO_SLEEP | NO_STUN',
        desc: 'Skeleton',
    },

    // # Spiders are frequently poisonous and weave webs, and tend to have an
    // # affinity with darkness.  Any spells they have tend to focus on disabling
    // # their prey so they can be finished off in melee, but they may also breathe.
    SNAKE: {
        id: 'SNAKE',
        name: 'snake',
        ch: 'J',
        pain: '5',
        flags: 'ANIMAL | HURT_COLD | BASH_DOOR | CLEAR_WEB',
        desc: 'Snake',
    },

    // # Weak, except the odd one to surprise the unwary newcomer.  Always native to
    // # level 0, never give experience
    SPIDER: {
        id: 'SPIDER',
        name: 'spider',
        ch: 'S',
        pain: '7',
        flags: 'BASH_DOOR | PASS_WEB',
        desc: 'Spider/Scorpion/Tick',
    },

    // # High hitpoints and armor class
    TOWNSFOLK: {
        id: 'TOWNSFOLK',
        name: 'townsfolk',
        ch: 't',
        pain: '4',
        flags: 'SPIRIT | CLEAR_WEB',
        desc: 'Townsfolk',
    },

    // # Trolls are evil, larger than human-size humanoids. They have strong melee
    // # combat, and many are hurt by light.  They fall roughly between ogres and
    // # giants in Morgoth's humanoid soldiery.
    TREE: {
        id: 'TREE',
        name: 'tree',
        ch: 'l',
        pain: '9',
        flags: 'CLEAR_WEB | COLD_BLOOD | REGENERATE | NO_FEAR | NO_CONF | HURT_FIRE | IM_WATER',
        desc: 'Tree/Ent',
    },

    // # Powerful undead which drain experience
    TROLL: {
        id: 'TROLL',
        name: 'troll',
        ch: 'T',
        pain: '1',
        flags: 'TROLL | EVIL | SPIRIT | OPEN_DOOR | BASH_DOOR | CLEAR_WEB',
        desc: 'Troll',
    },

    // # Always awake, elemental objects which engulf and breathe their element(s)
    VAMPIRE: {
        id: 'VAMPIRE',
        name: 'vampire',
        ch: 'V',
        pain: '1',
        flags: 'UNDEAD | EVIL | COLD_BLOOD | REGENERATE | SPIRIT | OPEN_DOOR | BASH_DOOR | CLEAR_WEB | HURT_LIGHT | HURT_FIRE | IM_COLD | IM_POIS | NO_CONF | NO_SLEEP | NO_STUN | FORCE_SLEEP',
        desc: 'Vampire',
    },

    // # Worms are mostly low level slow breeders with crawl attacks for an effect
    VORTEX: {
        id: 'VORTEX',
        name: 'vortex',
        ch: 'v',
        pain: '11',
        flags: 'EMPTY_MIND | POWERFUL | RAND_50 | BASH_DOOR | CLEAR_WEB | NO_FEAR | NO_CONF | NO_SLEEP | NO_HOLD | IM_POIS | FORCE_SLEEP | NONLIVING',
        desc: 'Vortex',
    },

    // # Undead which range from wights to wraiths to the Ringwraiths.  Experience
    // # drainers and spellcasters; the Ringwraiths summon each other and are the
    // # only monsters which get the Black Breath melee attack.
    WORM: {
        id: 'WORM',
        name: 'worm',
        ch: 'w',
        pain: '1',
        flags: 'ANIMAL',
        desc: 'Worm/Worm Mass',
    },

    // # Strange part rock beings which can destroy or pass through walls
    WRAITH: {
        id: 'WRAITH',
        name: 'wraith',
        ch: 'W',
        pain: '1',
        flags: 'UNDEAD | EVIL | COLD_BLOOD | SPIRIT | CLEAR_WEB | HURT_LIGHT | IM_COLD | IM_POIS | NO_CONF | NO_SLEEP | NO_STUN | NO_HOLD',
        desc: 'Wight/Wraith',
    },

    // # Small, weak, comical humanoids
    XORN: {
        id: 'XORN',
        name: 'xorn',
        ch: 'X',
        pain: '4',
        flags: 'COLD_BLOOD | EMPTY_MIND | CLEAR_WEB | HURT_ROCK | IM_POIS | NO_CONF | NO_SLEEP',
        desc: 'Xorn/Xaren',
    },

    // # Yetis are a couple of niche monsters, big furry bear-like creatures
    YEEK: {
        id: 'YEEK',
        name: 'yeek',
        ch: 'y',
        pain: '1',
        flags: 'ANIMAL | SPIRIT | OPEN_DOOR | BASH_DOOR | CLEAR_WEB | IM_ACID',
        desc: 'Yeek',
    },

    // # Zephyr hounds come in packs and (with a couple of exceptions) breathe a
    // # single element, with melee that matches where possible.  Simple.
    YETI: {
        id: 'YETI',
        name: 'yeti',
        ch: 'Y',
        pain: '1',
        flags: 'ANIMAL | OPEN_DOOR | BASH_DOOR | CLEAR_WEB | IM_COLD',
        desc: 'Yeti',
    },

    // # Animated corpses, frequently with no mind of their own.  Mostly fairly weak
    // # for their level
    ZEPHYR_HOUND: {
        id: 'ZEPHYR_HOUND',
        name: 'zephyr hound',
        ch: 'Z',
        pain: '3',
        flags: 'ANIMAL | GROUP_AI | CLEAR_WEB',
        desc: 'Zephyr Hound',
    },

    // ##### Special templates #####

    ZOMBIE: {
        id: 'ZOMBIE',
        name: 'zombie',
        ch: 'z',
        pain: '10',
        flags: 'UNDEAD | EVIL | COLD_BLOOD | OPEN_DOOR | BASH_DOOR | CLEAR_WEB | IM_COLD | IM_POIS | HURT_FIRE | NO_CONF | NO_SLEEP | NO_STUN',
        desc: 'Zombie/Mummy',
    },

    PLAYER: { id: 'PLAYER', name: 'player', ch: '@', pain: '1', desc: 'You' },

    MORGOTH: {
        id: 'MORGOTH',
        name: 'Morgoth',
        ch: 'P',
        pain: '12',
        desc: 'Morgoth',
    },
};
