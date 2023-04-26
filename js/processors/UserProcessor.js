/**
 * @format
 * @flow strict-local
 */

export const toName = (profile, displayFormat) => {
  const firstnameEn = (profile && profile.firstname_en) || '';
  const lastnameEn = (profile && profile.lastname_en) || '';
  const firstnameZh = (profile && profile.firstname_zh) || '';
  const lastnameZh = (profile && profile.lastname_zh) || '';
  const nickname = (profile && profile.nickname) || '';

  if (!displayFormat) {
    displayFormat = 0;

    if (profile && profile.name_display_format && profile.name_display_format.length > 0) {
      displayFormat = parseInt(profile.name_display_format);
    }
  }

  let name = '';

  if (displayFormat === 0) {
    name = `${nickname} ${lastnameEn} ${lastnameZh}${firstnameZh}`.trim();
  } else if (displayFormat === 1) {
    name = `${firstnameEn} ${lastnameEn} ${lastnameZh}${firstnameZh}`.trim();
  } else if (displayFormat === 2) {
    name = `${nickname} ${lastnameZh}${firstnameZh}`.trim();
  } else if (displayFormat === 3) {
    name = `${nickname}`.trim();
  }

  if (name.length === 0) {
    name = undefined;
  }

  return name;
};

export const toOccupation = (profile) => {
  let occupation = '';

  if (profile && profile.occupations && profile.occupations.length > 0) {
     occupation = (profile.occupations[0].text || '').trim();
  }

  if (occupation.length === 0) {
    occupation = undefined;
  }

  return occupation;
};
