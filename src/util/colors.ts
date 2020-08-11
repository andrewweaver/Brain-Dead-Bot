/**
 * The default color defined for each class.
 * @see https://wow.gamepedia.com/Class_colors
 */

export class Colors {
    DEATH_KNIGHT = '#C41F3B'
    DEMON_HUNTER = '#A330C9'
    DRUID = '#FF7D0A'
    HUNTER = '#A9D271'
    MAGE = '#40C7EB'
    MONK = '#00FF96'
    PALADIN = '#F58CBA'
    PRIEST = '#FFFFFF'
    ROGUE = '#FFF569'
    SHAMAN = '#0070DE'
    WARLOCK = '#8787ED'
    WARRIOR = '#C79C6E'
}

export const getClassColor = (charClass) => {
    let ClassColor = new Colors();
    switch (charClass) {
        case 'Death Knight':
            return ClassColor.DEATH_KNIGHT;
            break;
        case 'Demon Hunter':
            return ClassColor.DEMON_HUNTER;
            break;
        case 'Druid':
            return ClassColor.DRUID;
            break;
        case 'Hunter':
            return ClassColor.HUNTER;
            break;
        case 'Mage':
            return ClassColor.MAGE;
            break;
        case 'Monk':
            return ClassColor.MONK;
            break;
        case 'Paladin':
            return ClassColor.PALADIN;
            break;
        case 'Priest':
            return ClassColor.PRIEST;
            break;
        case 'Rogue':
            return ClassColor.ROGUE;
            break;
        case 'Shaman':
            return ClassColor.SHAMAN;
            break;
        case 'Warlock':
            return ClassColor.WARLOCK;
            break;
        case 'Warrior':
            return ClassColor.WARRIOR;
            break;
        default:
            return "#161616"
    }
};