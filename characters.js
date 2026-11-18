// Karakter bilgileri hayatta-kal/src/data/characters.ts kaynağından alınmıştır.
window.GAME_CHARACTERS = [
  {
    "id": "man",
    "name": "Adam",
    "desc": "Dayanıklı bir beden. Biraz daha fazla canla başlar.",
    "unlockLevel": 0,
    "isPremium": false,
    "passive": {
      "type": "hp_bonus",
      "hpBonus": 10
    }
  },
  {
    "id": "woman",
    "name": "Kadın",
    "desc": "Güçlü sezgiler. Şans atışlarında hafif avantaj.",
    "unlockLevel": 0,
    "isPremium": false,
    "passive": {
      "type": "chance_bonus",
      "chanceBonus": 0.05
    }
  },
  {
    "id": "traitor",
    "name": "Hain",
    "desc": "Vampirlerin kendi içinden biri. Onlar tarafından öldürülemez.",
    "unlockLevel": 5,
    "isPremium": false,
    "passive": {
      "type": "immunity",
      "immuneTo": "vampire_kill"
    }
  },
  {
    "id": "criminal",
    "name": "Suçlu",
    "desc": "Çatılardan atlayıp iniyor. Yüksekten düşerek ölmez.",
    "unlockLevel": 10,
    "isPremium": false,
    "passive": {
      "type": "immunity",
      "immuneTo": "fall_damage"
    }
  },
  {
    "id": "soldier",
    "name": "Asker",
    "desc": "Eğitimli göz. Mekanik tuzaklara bağışık.",
    "unlockLevel": 15,
    "isPremium": false,
    "passive": {
      "type": "immunity",
      "immuneTo": "trap_kill"
    }
  },
  {
    "id": "hunter",
    "name": "Avcı",
    "desc": "Yaban hayatını içten biliyor. Vahşi hayvanlar onu öldüremez.",
    "unlockLevel": 20,
    "isPremium": false,
    "passive": {
      "type": "immunity",
      "immuneTo": "animal_kill"
    }
  },
  {
    "id": "shaman",
    "name": "Şaman",
    "desc": "Zehre karşı bağışıklık kazanmış. Zehirden ve enfeksiyondan ölmez.",
    "unlockLevel": 25,
    "isPremium": false,
    "passive": {
      "type": "immunity",
      "immuneTo": "poison_kill"
    }
  },
  {
    "id": "child",
    "name": "Çocuk",
    "desc": "Küçük beden, keskin gözler. Her adımda 1 ekstra seçenek görür.",
    "unlockLevel": 30,
    "isPremium": false,
    "passive": {
      "type": "extra_choice",
      "extraChoices": 1
    }
  },
  {
    "id": "elder",
    "name": "Yaşlı",
    "desc": "Onlarca yılın deneyimi. Şans atışlarında +10% bonus.",
    "unlockLevel": 35,
    "isPremium": false,
    "passive": {
      "type": "chance_bonus",
      "chanceBonus": 0.1
    }
  },
  {
    "id": "ghost",
    "name": "Hayalet",
    "desc": "Neredeyse bedenssiz. Enerji tüketimi %30 daha az.",
    "unlockLevel": 40,
    "isPremium": false,
    "passive": {
      "type": "energy_save",
      "energySavePct": 0.3
    }
  },
  {
    "id": "titan",
    "name": "Titan",
    "desc": "Dev beden, dev güç. +50% can — ama aldığın hasar %25 artar.",
    "unlockLevel": 0,
    "isPremium": true,
    "passive": {
      "type": "risk_reward",
      "hpMultiplier": 1.5,
      "damageMult": 1.25
    }
  },
  {
    "id": "shadow",
    "name": "Gölge",
    "desc": "Karanlıktan doğmuş. +50% can — ama her çarptığında %25 daha fazla acıtır.",
    "unlockLevel": 0,
    "isPremium": true,
    "passive": {
      "type": "risk_reward",
      "hpMultiplier": 1.5,
      "damageMult": 1.25
    }
  },
  {
    "id": "ranger",
    "name": "İzci",
    "desc": "Yolunu dikkatle seçer. Her adımda %40 daha az enerji tüketir.",
    "unlockLevel": 0,
    "isPremium": true,
    "passive": {
      "type": "energy_save",
      "energySavePct": 0.4
    }
  },
  {
    "id": "medic",
    "name": "Sıhhiyeci",
    "desc": "Dayanıklılığıyla ayakta kalır. Oyuna +35 canla başlar.",
    "unlockLevel": 0,
    "isPremium": true,
    "passive": {
      "type": "hp_bonus",
      "hpBonus": 35
    }
  },
  {
    "id": "oracle",
    "name": "Kâhin",
    "desc": "Tehlikeyi önceden sezer. Şans atışlarında +12 yüzde puanı kazanır.",
    "unlockLevel": 0,
    "isPremium": true,
    "passive": {
      "type": "chance_bonus",
      "chanceBonus": 0.12
    }
  }
];
