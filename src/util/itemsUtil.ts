export enum ItemType {
    NONE,

    // Cyberware //
    CW_AUDIO,
    CW_OPTICS,
    CW_BORGWARE,
    CW_INTERNAL,
    CW_ARMS,
    CW_FASHION,
    CW_NEURALWARE,
    CW_LEGS,
    CW_EXTERNAL,
    CW_GENERIC,

    // Weapons //
    WP_ASSAULT_RIFLE,
    WP_BOW,
    WP_GRENADE_LAUNCHER,
    WP_PISTOL_LIGHT,
    WP_PISTOL_MEDIUM,
    WP_PISTOL_HEAVY,
    WP_PISTOL_VHEAVY,
    WP_SMG_HEAVY,
    WP_MELEE_HEAVY,
    WP_MELEE_LIGHT,
    WP_MELEE_MED,
    WP_MELEE_VHEAVY,
    WP_ROCKET_LAUNCHER,
    WP_SMG,
    WP_SHOTGUN,
    WP_SNIPER,

    // Fashion //
    FS_BAGLADY,
    FS_GANG,
    FS_GENERIC,
    FS_BOHEMIAN,
    FS_LEISURE,
    FS_NOMAD,
    FS_ASIA,
    FS_URBAN,
    FS_BUSINESS,
    FS_HIGH
}

const ItemTypeToStringMap: Record<ItemType, string> = {
    [ItemType.NONE]: 'NONE',
    [ItemType.CW_AUDIO]: 'Cyberaudio',
    [ItemType.CW_OPTICS]: 'Cyberoptics',
    [ItemType.CW_BORGWARE]: 'Borgware',
    [ItemType.CW_INTERNAL]: 'Internal Cyberware',
    [ItemType.CW_ARMS]: 'Cyberarms',
    [ItemType.CW_FASHION]: 'Fashionware',
    [ItemType.CW_NEURALWARE]: 'Neuralware',
    [ItemType.CW_LEGS]: 'Cyberlegs',
    [ItemType.CW_EXTERNAL]: 'External Cyberware',
    [ItemType.CW_GENERIC]: 'Cyberware',
    [ItemType.WP_ASSAULT_RIFLE]: 'Assault Rifle',
    [ItemType.WP_BOW]: 'Bow/Crossbow',
    [ItemType.WP_GRENADE_LAUNCHER]: 'Grenade Launcher',
    [ItemType.WP_PISTOL_LIGHT]: 'Light Pistol',
    [ItemType.WP_PISTOL_MEDIUM]: 'Medium Pistol',
    [ItemType.WP_PISTOL_HEAVY]: 'Heavy Pistol',
    [ItemType.WP_PISTOL_VHEAVY]: 'Very Heavy Pistol',
    [ItemType.WP_SMG_HEAVY]: 'Heavy Submachine Gun',
    [ItemType.WP_MELEE_HEAVY]: 'Heavy Melee Weapon',
    [ItemType.WP_MELEE_LIGHT]: 'Light Melee Weapon',
    [ItemType.WP_MELEE_MED]: 'Medium Melee Weapon',
    [ItemType.WP_MELEE_VHEAVY]: 'Very Heavy Melee Weapon',
    [ItemType.WP_ROCKET_LAUNCHER]: 'Rocket Launcher',
    [ItemType.WP_SMG]: 'Submachine Gun',
    [ItemType.WP_SHOTGUN]: 'Shotgun',
    [ItemType.WP_SNIPER]: 'Sniper Rifle',
    [ItemType.FS_BAGLADY]: 'Bag Lady Chic',
    [ItemType.FS_GANG]: 'Gang Colors',
    [ItemType.FS_GENERIC]: 'Generic Chic',
    [ItemType.FS_BOHEMIAN]: 'Bohemian',
    [ItemType.FS_LEISURE]: 'Leisurewear',
    [ItemType.FS_NOMAD]: 'Nomad Leathers',
    [ItemType.FS_ASIA]: 'Asia Pop',
    [ItemType.FS_URBAN]: 'Urban Flash',
    [ItemType.FS_BUSINESS]: 'Businesswear',
    [ItemType.FS_HIGH]: 'High Fashion'
};

export function ItemTypeToString(type: ItemType): string {
    return ItemTypeToStringMap[type];
}

export enum ItemQuality {
    NONE,
    POOR,
    STANDARD,
    EXCELLENT
}

const ItemQualityToStringMap: Record<ItemQuality, string> = {
    [ItemQuality.NONE]: 'N/A',
    [ItemQuality.POOR]: 'Poor Quality',
    [ItemQuality.STANDARD]: 'Standard Quality',
    [ItemQuality.EXCELLENT]: 'Excellent Quality'
};

export function ItemQualityToString(type: ItemQuality): string {
    return ItemQualityToStringMap[type];
}
