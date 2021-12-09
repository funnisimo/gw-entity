// # File: object_base.txt
// #
// # This file is used to initialize object base information for Angband.
// # Object bases correspond to tvals as defined in src/list-tvals.h.

// # === Understanding object_base.txt ===

// # default: lines are default values for any object base

// # name: tval:name
// # graphics: default attr for inventory display
// # break: breakage chance when thrown
// # max-stack: maximum number that can appear in a stack
// # flags: default flags


var object_base = {
// # max-stack:1

chest : {"break":"10","max-stack":"40","id":"chest","name":"Chest~","graphics":"slate","flags":"HATES_ACID | HATES_FIRE"},

// # max-stack:40

shot : {"break":"0","max-stack":"40","id":"shot","name":"Shot~","graphics":"light_umber","flags":"SHOW_DICE"},

// # max-stack:40

arrow : {"break":"35","max-stack":"40","id":"arrow","name":"Arrow~","graphics":"light_umber","flags":"HATES_ACID | HATES_FIRE | SHOW_DICE"},

// # max-stack:40

bolt : {"break":"20","max-stack":"40","id":"bolt","name":"Bolt~","graphics":"light_umber","flags":"HATES_ACID | SHOW_DICE"},

// # max-stack:1

bow : {"break":"10","max-stack":"40","id":"bow","name":"Bow~","graphics":"umber","flags":"HATES_ACID | HATES_FIRE | SHOW_MULT"},

// # max-stack:1

digger : {"break":"10","max-stack":"40","id":"digger","name":"Digger~","graphics":"slate","flags":"SHOW_DICE"},

// # max-stack:1

hafted : {"break":"10","max-stack":"40","id":"hafted","name":"Hafted weapon~","graphics":"white","flags":"HATES_ACID | HATES_FIRE | SHOW_DICE"},

// # max-stack:1

polearm : {"break":"10","max-stack":"40","id":"polearm","name":"Polearm~","graphics":"white","flags":"HATES_ACID | HATES_FIRE | SHOW_DICE"},

// # max-stack:1

sword : {"break":"10","max-stack":"40","id":"sword","name":"Bladed weapon~","graphics":"white","flags":"HATES_ACID | SHOW_DICE"},

// # max-stack:1

boots : {"break":"10","max-stack":"40","id":"boots","name":"Boot~","graphics":"light_umber","flags":"HATES_ACID | HATES_FIRE"},

// # max-stack:1

gloves : {"break":"10","max-stack":"40","id":"gloves","name":"Glove~","graphics":"light_umber","flags":"HATES_ACID | HATES_FIRE"},

// # max-stack:1

helm : {"break":"10","max-stack":"40","id":"helm","name":"Helm~","graphics":"light_umber","flags":"HATES_ACID"},

// # max-stack:1

crown : {"break":"10","max-stack":"40","id":"crown","name":"Crown~","graphics":"light_umber","flags":"HATES_ACID"},

// # max-stack:1

shield : {"break":"10","max-stack":"40","id":"shield","name":"Shield~","graphics":"light_umber","flags":"HATES_ACID"},

// # max-stack:1

cloak : {"break":"10","max-stack":"40","id":"cloak","name":"Cloak~","graphics":"light_umber","flags":"HATES_ACID | HATES_FIRE"},

// # max-stack:1

soft_armor : {"break":"10","max-stack":"40","id":"soft_armor","name":"Soft Armor~","graphics":"slate","flags":"HATES_ACID | HATES_FIRE"},

// # max-stack:1

hard_armor : {"break":"10","max-stack":"40","id":"hard_armor","name":"Hard Armor~","graphics":"slate","flags":"HATES_ACID"},

// # max-stack:1

dragon_armor : {"break":"10","max-stack":"40","id":"dragon_armor","name":"Dragon Armor~","graphics":"slate"},

// # max-stack:10

light : {"break":"50","max-stack":"40","id":"light","name":"Light~","graphics":"yellow","flags":"HATES_FIRE"},

// # max-stack:2

amulet : {"break":"10","max-stack":"40","id":"amulet","name":"Amulet~","graphics":"orange"},

// # max-stack:5

ring : {"break":"10","max-stack":"40","id":"ring","name":"Ring~","graphics":"red","flags":"HATES_ELEC"},

// # max-stack:5

staff : {"break":"10","max-stack":"40","id":"staff","name":"Staff~","graphics":"light_umber","flags":"HATES_ACID | HATES_FIRE | EASY_KNOW"},

// # max-stack:5

wand : {"break":"10","max-stack":"40","id":"wand","name":"Wand~","graphics":"green","flags":"HATES_ELEC | EASY_KNOW"},

// # max-stack:5

rod : {"break":"10","max-stack":"40","id":"rod","name":"Rod~","graphics":"light_purple","flags":"HATES_ELEC | EASY_KNOW"},

// # max-stack:20

scroll : {"break":"10","max-stack":"40","id":"scroll","name":"Scroll~","graphics":"white","flags":"HATES_ACID | HATES_FIRE | EASY_KNOW"},

// # max-stack:20

potion : {"break":"100","max-stack":"40","id":"potion","name":"Potion~","graphics":"light_blue","flags":"HATES_COLD | HATES_SOUND | HATES_SHARD | HATES_ICE | HATES_FORCE | EASY_KNOW"},

// # max-stack:20

flask : {"break":"100","max-stack":"40","id":"flask","name":"Flask~","graphics":"yellow","flags":"HATES_COLD | HATES_SOUND | HATES_SHARD | HATES_ICE | HATES_FORCE | EASY_KNOW"},

// # max-stack:10

food : {"break":"100","max-stack":"40","id":"food","name":"Food","graphics":"light_umber","flags":"EASY_KNOW"},

// # max-stack:10

mushroom : {"break":"100","max-stack":"40","id":"mushroom","name":"Mushroom~","graphics":"light_umber","flags":"EASY_KNOW"},

// # max-stack:5

magic_book : {"break":"10","max-stack":"40","id":"magic_book","name":"Magic Book~","graphics":"light_red","flags":"HATES_FIRE | EASY_KNOW"},

// # max-stack:5

prayer_book : {"break":"10","max-stack":"40","id":"prayer_book","name":"Prayer Book~","graphics":"light_green","flags":"HATES_FIRE | EASY_KNOW"},

// # max-stack:5

nature_book : {"break":"10","max-stack":"40","id":"nature_book","name":"Nature Book~","graphics":"yellow","flags":"HATES_FIRE | EASY_KNOW"},

// # max-stack:5

shadow_book : {"break":"10","max-stack":"40","id":"shadow_book","name":"Shadow Book~","graphics":"light_purple","flags":"HATES_FIRE | EASY_KNOW"},

gold : {"break":"10","max-stack":"40","id":"gold","name":"gold","graphics":"light_yellow"},

}
