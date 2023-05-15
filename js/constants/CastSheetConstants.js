/**
 * @format
 * @flow strict-local
 */

// Categories
export const CAST_SHEET_CATEGORY_KEY_BASIC_INFORMATION = 'basic_information';
export const CAST_SHEET_CATEGORY_KEY_APPEARANCE = 'appearance';
export const CAST_SHEET_CATEGORY_KEY_EXPERIENCE = 'experience';
export const CAST_SHEET_CATEGORY_KEY_CONTACTS = 'contacts';
export const CAST_SHEET_CATEGORY_KEY_SOCIAL_MEDIAS = 'social_medias';

 // Properties
 export const CAST_SHEET_PROPERTY_KEY_SCHOOL = 'school';
 export const CAST_SHEET_PROPERTY_KEY_MAJOR = 'major';
 export const CAST_SHEET_PROPERTY_KEY_YEAR = 'year';
 export const CAST_SHEET_PROPERTY_KEY_AWARD_CEREMONY_NAME = 'award_ceremony_name';
 export const CAST_SHEET_PROPERTY_KEY_AWARD_NAME = 'award_name';
 export const CAST_SHEET_PROPERTY_KEY_WINNER = 'winner';
 export const CAST_SHEET_PROPERTY_KEY_NAME = 'name';
 export const CAST_SHEET_PROPERTY_KEY_SINGER = 'singer';
 export const CAST_SHEET_PROPERTY_KEY_ROLE_TITLE = 'role_title';
 export const CAST_SHEET_PROPERTY_KEY_ROLE_NAME = 'role_name';
 export const CAST_SHEET_PROPERTY_KEY_PHONE = 'phone';
 export const CAST_SHEET_PROPERTY_KEY_EMAIL = 'email';
 export const CAST_SHEET_PROPERTY_KEY_CATEGORY = 'category';
 export const CAST_SHEET_PROPERTY_KEY_TEXT = 'text';
 export const CAST_SHEET_PROPERTY_KEY_AGENT_STATUS = 'agent_status';

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
 export const CAST_SHEET_KEY_ADDRESS = 'address';
 export const CAST_SHEET_KEY_EMAIL = 'email';
 export const CAST_SHEET_KEY_PHONE = 'phone';
 export const CAST_SHEET_KEY_AGENTS = 'agents';

 // Social Media
 export const CAST_SHEET_KEY_INSTAGRAM = 'instagram';
 export const CAST_SHEET_KEY_FACEBOOK = 'facebook';
 export const CAST_SHEET_KEY_YOUTUBE = 'youtube';

 export const CAST_SHEET_INFO = [
   {
     name: CAST_SHEET_CATEGORY_KEY_BASIC_INFORMATION,
     keys: [
       {
         name: CAST_SHEET_KEY_GENDER,
       },
       {
         name: CAST_SHEET_KEY_DATE_OF_BIRTH,
         isDate: true,
       },
       {
         name: CAST_SHEET_KEY_PLACE_OF_BIRTH,
       },
       {
         name: CAST_SHEET_KEY_ACTING_YEAR_START,
       },
       {
         name: CAST_SHEET_KEY_ACTING_YEAR_END,
       },
       {
         name: CAST_SHEET_KEY_LANGUAGES,
         isMultiple: true,
       },
       {
         name: CAST_SHEET_KEY_WORKING_BASES,
         isMultiple: true,
       },
       {
         name: CAST_SHEET_KEY_OCCUPATIONS,
         isMultiple: true,
       },
       {
         name: CAST_SHEET_KEY_SKILLS,
         isMultiple: true,
       },
       {
         name: CAST_SHEET_KEY_ALMA_MATERS,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_SCHOOL,
           CAST_SHEET_PROPERTY_KEY_MAJOR,
         ],
       },
       {
         name: CAST_SHEET_KEY_AWARDS,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_YEAR,
           CAST_SHEET_PROPERTY_KEY_AWARD_CEREMONY_NAME,
           CAST_SHEET_PROPERTY_KEY_AWARD_NAME,
           CAST_SHEET_PROPERTY_KEY_WINNER,
         ],
       },
       {
         name: CAST_SHEET_KEY_NATIONALITIES,
         isMultiple: true,
       },
     ],
   },
   {
     name: CAST_SHEET_CATEGORY_KEY_APPEARANCE,
     keys: [
       {
         name: CAST_SHEET_KEY_HEIGHT,
       },
       {
         name: CAST_SHEET_KEY_WEIGHT,
       },
       {
         name: CAST_SHEET_KEY_SKIN_COLOR,
       },
       {
         name: CAST_SHEET_KEY_DRESS_SIZE,
       },
       {
         name: CAST_SHEET_KEY_SHIRT_SIZE,
       },
       {
         name: CAST_SHEET_KEY_SHOE_SIZE,
       },
       {
         name: CAST_SHEET_KEY_SUIT_COST_SIZE,
       },
       {
         name: CAST_SHEET_KEY_PANTS_SIZE,
       },
       {
         name: CAST_SHEET_KEY_HAT_SIZE,
       },
       {
         name: CAST_SHEET_KEY_HANDEDNESS,
       },
       {
         name: CAST_SHEET_KEY_GLOVE,
       },
       {
         name: CAST_SHEET_KEY_HAIR_COLORS,
         isMultiple: true,
       },
       {
         name: CAST_SHEET_KEY_EYES_COLORS,
         isMultiple: true,
       },
       {
         name: CAST_SHEET_KEY_BODY_TYPES,
         isMultiple: true,
       },
     ],
   },
   {
     name: CAST_SHEET_CATEGORY_KEY_EXPERIENCE,
     keys: [
       {
         name: CAST_SHEET_KEY_LICENSES,
         isMultiple: true,
       },
       {
         name: CAST_SHEET_KEY_MOVIES,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_YEAR,
           CAST_SHEET_PROPERTY_KEY_NAME,
           CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
           CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
         ],
       },
       {
         name: CAST_SHEET_KEY_TV_SHOWS,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_YEAR,
           CAST_SHEET_PROPERTY_KEY_NAME,
           CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
           CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
         ],
       },
       {
         name: CAST_SHEET_KEY_COMMERCIALS,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_YEAR,
           CAST_SHEET_PROPERTY_KEY_NAME,
           CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
           CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
         ],
       },
       {
         name: CAST_SHEET_KEY_MUSIC_VIDEOS,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_YEAR,
           CAST_SHEET_PROPERTY_KEY_NAME,
           CAST_SHEET_PROPERTY_KEY_SINGER,
           CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
           CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
         ],
       },
       {
         name: CAST_SHEET_KEY_STAGE_SHOWS,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_YEAR,
           CAST_SHEET_PROPERTY_KEY_NAME,
           CAST_SHEET_PROPERTY_KEY_SINGER,
           CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
           CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
         ],
       },
       {
         name: CAST_SHEET_KEY_VARIETY_SHOWS,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_YEAR,
           CAST_SHEET_PROPERTY_KEY_NAME,
           CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
           CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
         ],
       },
       {
         name: CAST_SHEET_KEY_PERFORMING_ARTS,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_YEAR,
           CAST_SHEET_PROPERTY_KEY_NAME,
           CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
           CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
         ],
       },
       {
         name: CAST_SHEET_KEY_BROADCASTS,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_YEAR,
           CAST_SHEET_PROPERTY_KEY_NAME,
           CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
           CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
         ],
       },
       {
         name: CAST_SHEET_KEY_MODELLINGS,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_YEAR,
           CAST_SHEET_PROPERTY_KEY_NAME,
           CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
           CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
         ],
       },
       {
         name: CAST_SHEET_KEY_VOICEOVERS,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_YEAR,
           CAST_SHEET_PROPERTY_KEY_NAME,
           CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
           CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
         ],
       },
       {
         name: CAST_SHEET_KEY_ONLINES,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_YEAR,
           CAST_SHEET_PROPERTY_KEY_NAME,
           CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
           CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
         ],
       },
       {
         name: CAST_SHEET_KEY_EVENTS,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_YEAR,
           CAST_SHEET_PROPERTY_KEY_NAME,
           CAST_SHEET_PROPERTY_KEY_ROLE_TITLE,
           CAST_SHEET_PROPERTY_KEY_ROLE_NAME,
         ],
       },
     ],
   },
   {
     name: CAST_SHEET_CATEGORY_KEY_CONTACTS,
     keys: [
       {
         name: CAST_SHEET_KEY_ADDRESS,
         super: CAST_SHEET_CATEGORY_KEY_CONTACTS,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_CATEGORY,
           CAST_SHEET_PROPERTY_KEY_TEXT,
         ],
       },
       {
         name: CAST_SHEET_KEY_EMAIL,
         super: CAST_SHEET_CATEGORY_KEY_CONTACTS,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_CATEGORY,
           CAST_SHEET_PROPERTY_KEY_TEXT,
         ],
       },
       {
         name: CAST_SHEET_KEY_PHONE,
         super: CAST_SHEET_CATEGORY_KEY_CONTACTS,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_CATEGORY,
           CAST_SHEET_PROPERTY_KEY_TEXT,
         ],
       },
       {
         name: CAST_SHEET_KEY_AGENTS,
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_NAME,
           CAST_SHEET_PROPERTY_KEY_PHONE,
           CAST_SHEET_PROPERTY_KEY_EMAIL,
           CAST_SHEET_PROPERTY_KEY_AGENT_STATUS,
         ],
       },
     ],
   },
   {
     name: CAST_SHEET_CATEGORY_KEY_SOCIAL_MEDIAS,
     keys: [
       {
         name: CAST_SHEET_KEY_INSTAGRAM,
         super: CAST_SHEET_CATEGORY_KEY_SOCIAL_MEDIAS,
         type: 'Instagram',
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_CATEGORY,
           CAST_SHEET_PROPERTY_KEY_TEXT,
         ],
       },
       {
         name: CAST_SHEET_KEY_FACEBOOK,
         super: CAST_SHEET_CATEGORY_KEY_SOCIAL_MEDIAS,
         type: 'Facebook',
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_CATEGORY,
           CAST_SHEET_PROPERTY_KEY_TEXT,
         ],
       },
       {
         name: CAST_SHEET_KEY_YOUTUBE,
         super: CAST_SHEET_CATEGORY_KEY_SOCIAL_MEDIAS,
         type: 'YouTube',
         isMultiple: true,
         properties: [
           CAST_SHEET_PROPERTY_KEY_CATEGORY,
           CAST_SHEET_PROPERTY_KEY_TEXT,
         ],
       },
     ],
   },
 ];
