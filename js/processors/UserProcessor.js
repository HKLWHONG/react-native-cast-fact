/**
 * @format
 * @flow strict-local
 */

export const toName = (profile) => {
  let firstnameZh = (profile && profile.firstnameZh) || '';
  let lastnameZh = (profile && profile.lastnameZh) || '';
  let nickname = (profile && profile.nickname) || '';

  let name = (nickname + ' ' + lastnameZh + firstnameZh).trim();

  return name;
};
