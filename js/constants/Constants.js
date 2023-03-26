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
