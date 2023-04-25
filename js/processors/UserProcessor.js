/**
 * @format
 * @flow strict-local
 */

export const toName = (profile) => {
  const firstnameEn = (profile && profile.firstname_en) || '';
  const lastnameEn = (profile && profile.lastname_en) || '';
  const firstnameZh = (profile && profile.firstname_zh) || '';
  const lastnameZh = (profile && profile.lastname_zh) || '';
  const nickname = (profile && profile.nickname) || '';

  let nameDisplayFormat = 0;

  if (profile && profile.name_display_format && profile.name_display_format.length > 0) {
    nameDisplayFormat = parseInt(profile.name_display_format);
  }

  let name = '';

  if (nameDisplayFormat === 0) {
    name = `${nickname} ${lastnameEn} ${lastnameZh}${firstnameZh}`.trim();
  } else if (nameDisplayFormat === 1) {
    name = `${firstnameEn} ${lastnameEn} ${lastnameZh}${firstnameZh}`.trim();
  } else if (nameDisplayFormat === 2) {
    name = `${nickname} ${lastnameZh}${firstnameZh}`.trim();
  } else if (nameDisplayFormat === 3) {
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
