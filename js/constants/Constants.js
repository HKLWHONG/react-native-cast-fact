/**
 * @format
 * @flow strict-local
 */

export const HEIGHT = 'Height';
export const WEIGHT = 'Weight';
export const AGE = 'Age';
export const EYES_COLOR = 'Eyes Color';
export const HAIR_COLOR = 'Hair Color';
export const SKIN_COLOR = 'Skin Color';

export const TAGS =
[
    {
        "rightAccessoryType": "plus",
        "label": HEIGHT,
        "data": [
            {
                "id": 1,
                "categoryId": 1,
                "referenceId": null,
                "type": "input",
                "leftAccessoryType": null,
                "rightAccessoryType": null,
                "text": "170",
                "fromText": null,
                "toText": null,
                "unit": "cm",
                "fromUnit": null,
                "toUnit": null,
                "prefix": null,
                "suffix": "cm",
                "color": null,
                "image": null,
                "checked": false,
                "regex": null,
                "maxLength": 3,
                "keyboardType": "numeric",
                "frequence": 0,
                "createdAt": "2022-11-03T19:25:08.000000Z",
                "updatedAt": "2022-11-03T19:25:08.000000Z",
                "enabled": true
            },
            {
                "id": 2,
                "categoryId": 1,
                "referenceId": 1,
                "type": "reference",
                "leftAccessoryType": "check",
                "rightAccessoryType": null,
                "text": "Deviation",
                "fromText": null,
                "toText": null,
                "unit": null,
                "fromUnit": null,
                "toUnit": null,
                "prefix": "~",
                "suffix": null,
                "color": null,
                "image": null,
                "checked": true,
                "regex": null,
                "maxLength": null,
                "keyboardType": null,
                "frequence": 0,
                "createdAt": "2022-11-03T19:25:08.000000Z",
                "updatedAt": "2022-11-03T19:25:08.000000Z",
                "enabled": true
            }
        ]
    },
    {
        "rightAccessoryType": "plus",
        "label": WEIGHT,
        "data": [
            {
                "id": 3,
                "categoryId": 2,
                "referenceId": null,
                "type": "input",
                "leftAccessoryType": null,
                "rightAccessoryType": null,
                "text": "60",
                "fromText": null,
                "toText": null,
                "unit": "kg",
                "fromUnit": null,
                "toUnit": null,
                "prefix": null,
                "suffix": "kg",
                "color": null,
                "image": null,
                "checked": false,
                "regex": null,
                "maxLength": 3,
                "keyboardType": "numeric",
                "frequence": 0,
                "createdAt": "2022-11-03T19:25:08.000000Z",
                "updatedAt": "2022-11-03T19:25:08.000000Z",
                "enabled": true
            },
            {
                "id": 4,
                "categoryId": 2,
                "referenceId": 3,
                "type": "reference",
                "leftAccessoryType": "check",
                "rightAccessoryType": null,
                "text": "Deviation",
                "fromText": null,
                "toText": null,
                "unit": null,
                "fromUnit": null,
                "toUnit": null,
                "prefix": "~",
                "suffix": null,
                "color": null,
                "image": null,
                "checked": true,
                "regex": null,
                "maxLength": null,
                "keyboardType": null,
                "frequence": 0,
                "createdAt": "2022-11-03T19:25:08.000000Z",
                "updatedAt": "2022-11-03T19:25:08.000000Z",
                "enabled": true
            }
        ]
    },
    {
        "rightAccessoryType": "plus",
        "label": AGE,
        "data": [
            {
                "id": 5,
                "categoryId": 3,
                "referenceId": null,
                "type": "range",
                "leftAccessoryType": null,
                "rightAccessoryType": null,
                "text": null,
                "fromText": "18",
                "toText": "25",
                "unit": null,
                "fromUnit": null,
                "toUnit": null,
                "prefix": null,
                "suffix": "y",
                "color": null,
                "image": null,
                "checked": false,
                "regex": null,
                "maxLength": 3,
                "keyboardType": "number-pad",
                "frequence": 0,
                "createdAt": "2022-11-03T19:25:08.000000Z",
                "updatedAt": "2022-11-03T19:25:08.000000Z",
                "enabled": true
            }
        ]
    },
    {
        "rightAccessoryType": null,
        "label": "Language",
        "data": [],
    },
    {
        "rightAccessoryType": null,
        "label": "Occupation",
        "data": [],
    },
    {
        "rightAccessoryType": null,
        "label": "Gender",
        "data": [],
    },
    {
        "rightAccessoryType": null,
        "label": EYES_COLOR,
        "data": [],
    },
    {
        "rightAccessoryType": null,
        "label": HAIR_COLOR,
        "data": [],
    },
    {
        "rightAccessoryType": null,
        "label": SKIN_COLOR,
        "data": [],
    },
    {
        "rightAccessoryType": null,
        "label": "Body Type",
        "data": [],
    },
    {
        "rightAccessoryType": null,
        "label": "Nationality",
        "data": [],
    }
];

export const TAGS_SUFFIX_MAPPING = {
  [EYES_COLOR.toLowerCase()]: 'eye',
  [HAIR_COLOR.toLowerCase()]: 'hair',
  [SKIN_COLOR.toLowerCase()]: 'skin',
};

export const TAGS_COLOR_MAPPING = {
  'black': '#000000',
};

export const CAST_SHEET_WHITE_LIST = {
  [CAST_SHEET_KEY_GENDER]: [
    'Female',
    'Male',
  ],
};

// Basic Information
export const CAST_SHEET_KEY_GENDER = 'gender';
export const CAST_SHEET_KEY_DATE_OF_BIRTH = 'date_of_birth';
export const CAST_SHEET_KEY_PLACE_OF_BIRTH = 'place_of_birth';
export const CAST_SHEET_KEY_ACTING_YEAR_START = 'acting_year_start';
export const CAST_SHEET_KEY_ACTING_YEAR_END = 'acting_year_end';
export const CAST_SHEET_KEY_LANGUAGES = 'languages';
export const CAST_SHEET_KEY_WORKING_BASES = 'working_bases';
export const CAST_SHEET_KEY_OCCUPATIONS = 'occupations';
export const CAST_SHEET_KEY_SKILLS = 'skills';
export const CAST_SHEET_KEY_ALMA_MATERS = 'alma_maters';
export const CAST_SHEET_KEY_AWARDS = 'awards';
export const CAST_SHEET_KEY_NATIONALITIES = 'nationalities';

// Appearance
export const CAST_SHEET_KEY_HEIGHT = 'height';
export const CAST_SHEET_KEY_WEIGHT = 'weight';
export const CAST_SHEET_KEY_SKIN_COLOR = 'skin_color';
export const CAST_SHEET_KEY_DRESS_SIZE = 'dress_size';
export const CAST_SHEET_KEY_SHIRT_SIZE = 'shirt_size';
export const CAST_SHEET_KEY_SHOE_SIZE = 'shoe_size';
export const CAST_SHEET_KEY_SUIT_COST_SIZE = 'suit_cost_size';
export const CAST_SHEET_KEY_PANTS_SIZE = 'pants_size';
export const CAST_SHEET_KEY_HAT_SIZE = 'hat_size';
export const CAST_SHEET_KEY_HANDEDNESS = 'handedness';
export const CAST_SHEET_KEY_GLOVE = 'glove';
export const CAST_SHEET_KEY_HAIR_COLORS = 'hair_colors';
export const CAST_SHEET_KEY_EYES_COLORS = 'eyes_colors';
export const CAST_SHEET_KEY_BODY_TYPES = 'body_types';

// Experience
export const CAST_SHEET_KEY_LICENSES = 'licenses';
export const CAST_SHEET_KEY_MOVIES = 'movies';
export const CAST_SHEET_KEY_TV_SHOWS = 'tv_shows';
export const CAST_SHEET_KEY_COMMERCIALS = 'commercials';
export const CAST_SHEET_KEY_MUSIC_VIDEOS = 'music_videos';
export const CAST_SHEET_KEY_STAGE_SHOWS = 'stage_shows';
export const CAST_SHEET_KEY_VARIETY_SHOWS = 'variety_shows';
export const CAST_SHEET_KEY_PERFORMING_ARTS = 'performing_arts';
export const CAST_SHEET_KEY_BROADCASTS = 'broadcasts';
export const CAST_SHEET_KEY_MODELLINGS = 'modellings';
export const CAST_SHEET_KEY_VOICEOVERS = 'voiceovers';
export const CAST_SHEET_KEY_ONLINES = 'onlines';
export const CAST_SHEET_KEY_EVENTS = 'events';

// Contacts
export const CAST_SHEET_KEY_CONTACTS = 'contacts';
export const CAST_SHEET_KEY_CONTACTS_ADDRESS = 'address';
export const CAST_SHEET_KEY_CONTACTS_EMAIL = 'email';
export const CAST_SHEET_KEY_CONTACTS_PHONE = 'phone';
export const CAST_SHEET_KEY_CONTACTS_AGENTS = 'agents';

// Social Media
export const CAST_SHEET_KEY_SOCIAL_MEDIAS = 'social_medias';
export const CAST_SHEET_KEY_SOCIAL_MEDIA_INSTAGRAM = 'instagram';
export const CAST_SHEET_KEY_SOCIAL_MEDIA_FACEBOOK = 'facebook';
export const CAST_SHEET_KEY_SOCIAL_MEDIA_YOUTUBE = 'youtube';
