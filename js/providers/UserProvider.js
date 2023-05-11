/**
 * @format
 * @flow strict-local
 */

import { store, DataAction } from '../redux';

import {
  CastSheetConstants,
} from '../constants';

import {
  Converter,
} from '../utils';

import {
  UserProcessor,
  StringProcessor,
} from '../processors';

import {
  CreateProfileApi,
  GetProfileApi,
  LinkProfileApi,
  UploadProfileImageApi,
  GetProfileImageApi,
} from '../apis';

import { UserStorage } from '../storages';

import i18n from '../../i18n';

const IDENTIFIER = 'UserProvider';

export const createAndLinkProfile = (props, params, options) => {
  return new Promise((resolve, reject) => {
    CreateProfileApi.request(
      props,
      {
        json: params,
      },
      options,
    )
      .then((params) => {
        const { json } = params;

        const profileId = json[0].profile;

        LinkProfileApi.request(
          props,
          {
            profile_id: profileId,
          },
          options,
        )
          .then((params) => {
            UserStorage.setProfileId(profileId)
              .then(() => {
                resolve(params);
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const uploadProfileImage = (props, params, options) => {
  return new Promise((resolve, reject) => {
    UploadProfileImageApi.request(
      props,
      {
        file: params,
      },
      options,
    )
      .then((params) => {
        const { json } = params;

        getProfileImage(props, {}, options)
          .then(() => {
            resolve(params);
          })
          .catch((error) => {
            console.error(error);

            resolve(params);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getProfile = (props, params, options) => {
  return new Promise((resolve, reject) => {
    GetProfileApi.request(
      props,
      {},
      options,
    )
      .then((params) => {
        const { json } = params;

        store.dispatch(DataAction.setUserProfile(json));

        getProfileImage(props, {}, options)
          .then(() => {
            resolve(params);
          })
          .catch((error) => {
            console.error(error);

            resolve(params);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getProfileImage = (props, params, options) => {
  return new Promise((resolve, reject) => {
    GetProfileImageApi.request(
      props,
      {},
      options,
    )
      .then((params) => {
        const { data } = params;

        Converter.blobToBase64Data(data)
          .then((base64Data) => {
            store.dispatch(DataAction.setUserProfileImage({ uri: base64Data }));

            resolve(params);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const generateHtmlTemplate = (content) => {
  let html = `
  <!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Castsheet by CAST FACT</title>
          <!-- Embedded stylesheet -->
          <style>
              @charset "UTF-8";
              @import url("https://fonts.googleapis.com/css2?family=Heebo:wght@300;500;700&family=Noto+Sans+TC:wght@300;500;700&display=swap");
              .style-text-catagory-title, .text-catagory-title .text-catagory-title-content {
                font-weight: 700;
                font-size: 0.315cm;
                line-height: 0.315cm;
                letter-spacing: 2px;
                text-transform: uppercase;
              }

              .style-text-catagory-subtitle, .text-catagory-subtitle .text-catagory-subtitle-content {
                font-weight: 500;
                font-size: 0.245cm;
                letter-spacing: 1px;
                line-height: 0.4cm;
              }

              .style-text-data-key, .key-value-wrapper .key-content {
                font-weight: 300;
                font-size: 0.245cm;
                letter-spacing: 1px;
                line-height: 0.4cm;
                text-transform: uppercase;
              }

              .style-text-body, .header .qrcodes .qrcode-wrapper .qrcode-content, .key-value-wrapper .value-content {
                font-weight: 500;
                font-size: 0.315cm;
                letter-spacing: 0.5px;
                line-height: 0.4cm;
              }

              .style-text-secondary, .header .qrcodes .qrcode-wrapper .qrcode-site {
                font-weight: 300;
                font-size: 0.245cm;
                letter-spacing: 0.39px;
                line-height: 0.4cm;
              }

              @page {
                size: A4 portrait;
                margin: 6.65mm;
              }

              html,
              body {
                width: 200mm;
                height: 280mm;
                font-family: "Heebo", "Noto Sans TC", sans-serif;
                color: #000000;
              }

              .page {
                width: 100%;
                height: 100%;
                page-break-inside: avoid;
                /* 若順著向下排列時會切開此元素，則直接換頁 */
                page-break-after: always;
                /* 碰到此元素會直接換頁 */
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                    -ms-flex-direction: column;
                        flex-direction: column;
              }

              .header {
                height: 38mm;
                -webkit-box-flex: 1;
                    -ms-flex: 1 0 auto;
                        flex: 1 0 auto;
                display: -ms-grid;
                display: grid;
                -ms-grid-columns: 28mm 45mm 127mm;
                    grid-template-columns: 28mm 45mm 127mm;
                -ms-grid-rows: 6.3mm 30mm;
                    grid-template-rows: 6.3mm 30mm;
                border-bottom: 1px solid #d5d5d5;
              }

              .header .account-info {
                -ms-grid-column: 1;
                -ms-grid-column-span: 2;
                grid-column: 1/3;
                -ms-grid-row: 1;
                -ms-grid-row-span: 2;
                grid-row: 1/3;
              }

              .header .account-info .profile-picture-wrapper {
                width: 25.4mm;
                height: 25.4mm;
                overflow: hidden;
                border-radius: 1mm;
              }

              .header .account-info .profile-picture-wrapper img {
                width: 100%;
                height: 100%;
                -o-object-fit: fill;
                   object-fit: fill;
              }

              .header .account-info .account-display-name {
                font-weight: 500;
                font-size: 0.455cm;
                color: #000000;
                letter-spacing: 0;
              }

              .header .account-info .accouint-occupation {
                font-weight: 300;
                font-size: 0.315cm;
                color: #000000;
                letter-spacing: 1px;
                line-height: 13px;
              }

              .header .page-number {
                background-color: #F6F6F6;
                -ms-grid-column: 2;
                -ms-grid-column-span: 2;
                grid-column: 2/4;
                -ms-grid-row: 1;
                -ms-grid-row-span: 1;
                grid-row: 1/2;
                font-weight: 500;
                font-size: 9px;
                color: #000000;
                letter-spacing: 0.5px;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: end;
                    -ms-flex-pack: end;
                        justify-content: flex-end;
                -webkit-box-align: center;
                    -ms-flex-align: center;
                        align-items: center;
              }

              .header .qrcodes {
                -ms-grid-column: 3;
                -ms-grid-column-span: 1;
                grid-column: 3/4;
                -ms-grid-row: 2;
                -ms-grid-row-span: 1;
                grid-row: 2/3;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: end;
                    -ms-flex-pack: end;
                        justify-content: flex-end;
              }

              .header .qrcodes .qrcode-wrapper .qrcode-site {
                margin-top: 2mm;
              }

              .header .qrcodes .qrcode-wrapper .qrcode-content {
                margin-top: 0.5mm;
              }

              .header .qrcodes .qrcode-wrapper .qrcode-code {
                width: 17.5mm;
                height: 17.5mm;
                margin-top: 1mm;
                overflow: hidden;
              }

              .header .qrcodes .qrcode-wrapper .qrcode-code * {
                width: 100%;
                height: 100%;
              }

              .content {
                -webkit-box-flex: 1;
                    -ms-flex: 1 1 100%;
                        flex: 1 1 100%;
              }

              .content .master-detail-wrapper {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                height: 100%;
              }

              .content .master-detail-wrapper .master-view {
                -webkit-box-flex: 1;
                    -ms-flex: 1 0 auto;
                        flex: 1 0 auto;
                border-right: 1px solid #d5d5d5;
              }

              .content .master-detail-wrapper .detail-view {
                -webkit-box-flex: 2;
                    -ms-flex: 2 0 auto;
                        flex: 2 0 auto;
                padding-left: 0.3cm;
              }

              .column-view-wrapper {
                height: 100%;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
              }

              .column-view-wrapper .column-view {
                height: 100%;
                -webkit-box-sizing: border-box;
                        box-sizing: border-box;
              }

              .column-view-wrapper .column-view-50 {
                width: 45%;
              }

              .column-view-wrapper .column-view-25 {
                width: 25%;
              }

              .column-view-wrapper .column-view-auto {
                width: auto;
                -webkit-box-flex: 1;
                    -ms-flex: 1 1 auto;
                        flex: 1 1 auto;
              }

              .text-catagory-title {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                    -ms-flex-align: center;
                        align-items: center;
                margin-top: 0.3cm;
                margin-bottom: 0.1cm;
              }

              .text-catagory-title .text-catagory-title-icon img {
                width: 0.4cm;
                height: 0.4cm;
                margin-top: 0.12cm;
              }

              .text-catagory-title .text-catagory-title-content {
                margin-left: 0.2cm;
              }

              .text-catagory-subtitle {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                margin-top: 0.2cm;
                margin-bottom: 0cm;
                -webkit-box-sizing: border-box;
                        box-sizing: border-box;
              }

              .text-catagory-subtitle .text-catagory-subtitle-content {
                margin-top: 0.35cm;
              }

              .key-value-wrapper {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                margin: 0.15cm 0;
                width: 90%;
              }

              .key-value-wrapper .key-wrapper {
                width: 20mm;
                margin-right: 0.1cm;
                -webkit-box-flex: 0;
                    -ms-flex: 0 0 auto;
                        flex: 0 0 auto;
              }

              .key-value-wrapper .key-content {
                color: #000000;
                line-height: 3.85mm;
              }

              .key-value-wrapper .value-wrapper {
                width: 49mm;
                -webkit-box-flex: 0;
                    -ms-flex: 0 0 auto;
                        flex: 0 0 auto;
              }

              .key-value-wrapper .value-content {
                color: #000000;
              }

              .key-value-wrapper .value-content span {
                font-weight: 300;
              }

              .text-item-wrapper {
                margin: 0.1cm 0;
                width: 90%;
              }

              .text-item-wrapper .text-item-title-wrapper .text-item-title-content {
                font-weight: 300;
                font-size: 2.45mm;
                color: #000000;
                line-height: 3.85mm;
              }

              .text-item-wrapper .text-item-content-wrapper .text-item-content-content {
                font-weight: 500;
                font-size: 3mm;
                color: #000000;
                letter-spacing: 0.58px;
                line-height: 3.85mm;
              }

              .text-item-wrapper .text-item-content-wrapper .text-item-content-content span {
                font-weight: 300;
              }

              .footer {
                height: 42mm;
                -webkit-box-flex: 1;
                    -ms-flex: 1 0 auto;
                        flex: 1 0 auto;
                border-top: 1px solid #d5d5d5;
              }
              /*# sourceMappingURL=style.css.map */
          </style>
      </head>
      <body>
        ${content}
      </body>
  </html>
  `;

  return html;
}

export const generateHtmlCategoryContent = (name, profile) => {
  let content = '';

  const template = `
  <div class="key-value-wrapper">
      <div class="key-wrapper">
          <div class="key-content">{key}</div>
      </div>
      <div class="value-wrapper">{value}</div>
  </div>
  `;

  let info = CastSheetConstants.CAST_SHEET_INFO.filter((info) => {
    return info.name === name;
  });

  if (info.length > 0) {
    info = info[0];

    info.keys.forEach((key) => {
      let bypassed = false;

      const tags = profile[key.name];

      let categoryContent = template.replace('{key}', i18n.t(`app.${key.name}`));

      if (key.isMultiple) {
        if (key.properties) {
          let value = '';

          tags.forEach((tag) => {
            let texts = [];

            key.properties.forEach((property) => {
              if (property === CastSheetConstants.CAST_SHEET_PROPERTY_KEY_YEAR) {
                bypassed = true;
              }

              if (!tag[property] || tag[property].length === 0) {
                return;
              }

              texts = [
                ...texts,
                tag[property],
              ];
            });

            value += `<div class="value-content">${texts.join(', ')}</div>`;
          });

          categoryContent = categoryContent.replace('{value}', value);
        } else {
          let value = '';

          tags.forEach((tag) => {
            value += `<div class="value-content">${tag.text}</div>`;
          });

          categoryContent = categoryContent.replace('{value}', value);
        }
      } else {
        categoryContent = categoryContent.replace('{value}', `<div class="value-content">${tags}</div>`);
      }

      if (bypassed) {
        return;
      }

      content += categoryContent;
    });
  }

  return content;
};

export const generateHtmlAwardsContent = (profile) => {
  const name = CastSheetConstants.CAST_SHEET_KEY_AWARDS;

  let content = `
  <div class="text-catagory-title">
      <div class="text-catagory-title-icon">
          <img
              src="images/personal_awards.svg"
              alt="Awards"
              width="32px"
              height="32px"
          />
      </div>
      <div class="text-catagory-title-content">
          ${i18n.t(`app.${name}`)}
      </div>
      {value}
  </div>
  `;

  let value = '';

  let key = undefined;

  CastSheetConstants.CAST_SHEET_INFO.forEach((info) => {
    info.keys.forEach((item) => {
      if (item.name !== name) {
        return;
      }

      key = item;
    });
  });

  if (key) {
    const tags = profile[key.name];

    tags.forEach((tag) => {
      let texts = [];

      key.properties.forEach((property) => {
        if (!tag[property] || tag[property].length === 0) {
          return;
        }

        if (property === CastSheetConstants.CAST_SHEET_PROPERTY_KEY_YEAR) {
          return;
        }

        texts = [
          ...texts,
          tag[property],
        ];
      });

      value += `
      <div class="text-item-wrapper">
          <div class="text-item-title-wrapper">
              <div class="text-item-title-content">
                  ${tag.year}
              </div>
          </div>
          <div class="text-item-content-wrapper">
              <div class="text-item-content-content">
                  ${texts.join(', ')}
              </div>
          </div>
      </div>
      `;
    });
  }

  content = content.replace('{value}', value);

  return content;
};

export const generateHtmlExperienceContent = (profile) => {
  const name = CastSheetConstants.CAST_SHEET_CATEGORY_KEY_EXPERIENCE;

  let content = `
  <div class="text-catagory-title">
      <div class="text-catagory-title-icon">
          <img src="" alt="" />
      </div>
      <div class="text-catagory-title-content">
          ${i18n.t(`app.${name}`)}
      </div>
  </div>
  {value}
  `;

  const template1 = `
  <div class="key-value-wrapper">
      <div class="key-wrapper">
          <div class="key-content">{key}</div>
      </div>
      <div class="value-wrapper">{value}</div>
  </div>
  `;

  const template2 = `
  <div class="text-catagory-subtitle">
      <!--
      <div class="text-catagory-subtitle-icon">
          <img
              src="images/exp_movies.svg"
              alt="Awards"
              width="32px"
              height="32px"
          />
      </div>
      -->
      <div class="text-catagory-subtitle-content">
          {key}
      </div>
  </div>
  {value}
  `;

  let value = '';

  let info = CastSheetConstants.CAST_SHEET_INFO.filter((info) => {
    return info.name === name;
  });

  if (info.length > 0) {
    info = info[0];

    info.keys.forEach((key) => {
      const tags = profile[key.name];

      if (key.isMultiple) {
        if (key.properties) {
          let categoryContent = template2.replace('{key}', i18n.t(`app.${key.name}`));

          let categoryContentValue = '';

          tags.forEach((tag) => {
            let texts = [];

            key.properties.forEach((property) => {
              if (!tag[property] || tag[property].length === 0) {
                return;
              }

              if (property === CastSheetConstants.CAST_SHEET_PROPERTY_KEY_YEAR) {
                return;
              }

              texts = [
                ...texts,
                tag[property],
              ];
            });

            categoryContentValue += `
            <div class="text-item-wrapper">
                <div class="text-item-title-wrapper">
                    <div class="text-item-title-content">
                        ${tag.year}
                    </div>
                </div>
                <div class="text-item-content-wrapper">
                    <div class="text-item-content-content">
                        ${texts.join(', ')}
                    </div>
                </div>
            </div>
            `;
          });

          categoryContent = categoryContent.replace('{value}', categoryContentValue);

          value += categoryContent;
        } else {
          let categoryContent = template1.replace('{key}', i18n.t(`app.${key.name}`));

          let categoryContentValue = '';

          tags.forEach((tag) => {
            categoryContentValue += `<div class="value-content">${tag.text}</div>`;
          });

          categoryContent = categoryContent.replace('{value}', categoryContentValue);

          value += categoryContent;
        }
      } else {
        let categoryContent = template1.replace('{key}', i18n.t(`app.${key.name}`));

        categoryContent = categoryContent.replace('{value}', `<div class="value-content">${tags}</div>`);

        value += categoryContent;
      }
    });
  }

  content = content.replace('{value}', value);

  return content;
};

export const generateHtmlContactsContent = (profile) => {
  const name = CastSheetConstants.CAST_SHEET_CATEGORY_KEY_CONTACTS;

  let content = `
  <div class="footer-header">
      <div class="text-catagory-title">
          <div class="text-catagory-title-content">
              ${i18n.t(`app.${name}`)}
          </div>
      </div>
  </div>
  <div class="footer-content">
      <div class="column-view-wrapper">
          {value}
      </div>
  </div>
  `;

  const template1 = `
  <div class="column-view column-view-auto">
      <div class="text-catagory-subtitle">
          <div class="text-catagory-subtitle-content">
            {type}
          </div>
      </div>
      <div class="text-item-wrapper">
        {value}
      </div>
  </div>
  `;

  const template2 = `
  <div class="text-item-title-wrapper">
      <div class="text-item-title-content">
          {value}
      </div>
  </div>
  `;

  let value = '';

  let info = CastSheetConstants.CAST_SHEET_INFO.filter((info) => {
    return info.name === name;
  });

  if (info.length > 0) {
    info = info[0];

    const tags = profile[name];

    [
      CastSheetConstants.CAST_SHEET_KEY_ADDRESS,
      CastSheetConstants.CAST_SHEET_KEY_EMAIL,
      CastSheetConstants.CAST_SHEET_KEY_PHONE,
      CastSheetConstants.CAST_SHEET_KEY_AGENTS,
    ].forEach((type) => {
      let items = [];

      if (type === CastSheetConstants.CAST_SHEET_KEY_AGENTS) {
        items = profile[type] || [];
      } else {
        items = tags.filter((tag) => {
          return tag.type.toLowerCase() === type.toLowerCase();
        })
      }

      if (items.length > 0) {
        items.forEach((item) => {
          let itemContent = template1.replace('{type}', StringProcessor.toCapitalize(type));

          let itemInfo = info.keys.filter((key) => {
            return key.name === type;
          });

          if (itemInfo.length > 0) {
            itemInfo = itemInfo[0];

            let itemContentValue = '';

            itemInfo.properties.forEach((property) => {
              if (!item[property] || item[property].length === 0) {
                return;
              }

              itemContentValue += template2.replace('{value}', item[property]);
            });

            itemContent = itemContent.replace('{value}', itemContentValue);
          }

          value += itemContent;
        });
      } else {
        let itemContent = template1.replace('{type}', StringProcessor.toCapitalize(type));

        let itemContentValue = '-';

        itemContent = itemContent.replace('{value}', itemContentValue);

        value += itemContent;
      }
    });

  }

  content = content.replace('{value}', value);

  return content;
};

export const generateHtmlProfiles = (profiles) => {
  let content = '';

  profiles.forEach((profile) => {
    let name = UserProcessor.toName(profile);
    let occupations = '';

    profile[CastSheetConstants.CAST_SHEET_KEY_OCCUPATIONS].forEach((occupation) => {
      occupations += `${occupation.text}．`;
    });

    if (occupations.endsWith('．')) {
      occupations = occupations.substring(0, occupations.lastIndexOf('．'));
    }

    content += `
    <div class="page">
        <div class="header">
            <div class="account-info">
                <div class="profile-picture-wrapper">
                    <img src="images/cathwong.jpg" alt="" />
                </div>
                <div class="account-display-name">${name}</div>
                <div class="accouint-occupation">${occupations}</div>
            </div>
            <!--
            <div class="page-number">
                <div class="page-number-text">Page</div>
                <div class="page-number-current">1</div>
                <div class="page-number-text">of</div>
                <div class="page-number-total">2</div>
            </div>
            <div class="qrcodes">
                <div class="qrcode-wrapper">
                    <div class="qrcode-site">CAST FACT</div>
                    <div class="qrcode-content">林家熙 Locker94</div>
                    <div class="qrcode-code">
                        <img src="images/qrcode-sample.png" alt="" />
                    </div>
                </div>
            </div>
            -->
        </div>
        <div class="content">
            <div class="master-detail-wrapper">
                <div class="master-view">
                    <div class="text-catagory-title">
                        <div class="text-catagory-title-icon">
                            <img
                                src="images/personal_info.svg"
                                alt="Basic Information"
                                width="32px"
                                height="32px"
                            />
                        </div>
                        <div class="text-catagory-title-content">
                            ${i18n.t('app.basic_information')}
                        </div>
                    </div>
                    ${generateHtmlCategoryContent(CastSheetConstants.CAST_SHEET_CATEGORY_KEY_BASIC_INFORMATION, profile)}
                    <div class="text-catagory-title">
                        <div class="text-catagory-title-icon">
                            <img
                                src="images/personal_apperance.svg"
                                alt="Appearance"
                                width="32px"
                                height="32px"
                            />
                        </div>
                        <div class="text-catagory-title-content">
                            ${i18n.t('app.appearance')}
                        </div>
                    </div>
                    ${generateHtmlCategoryContent(CastSheetConstants.CAST_SHEET_CATEGORY_KEY_APPEARANCE, profile)}
                </div>
                <div class="detail-view">
                    <div class="column-view-wrapper">
                        <div class="column-view column-view-50">
                            ${generateHtmlAwardsContent(profile)}
                            ${generateHtmlExperienceContent(profile)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            ${generateHtmlContactsContent(profile)}
        </div>
    </div>
    `;
  });

  return generateHtmlTemplate(content);
}

export const generateHtmlProfilesExample = (profiles) => {
  let html = `
  <!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Castsheet by CAST FACT</title>
          <!-- Embedded stylesheet -->
          <style>
              @charset "UTF-8";
              @import url("https://fonts.googleapis.com/css2?family=Heebo:wght@300;500;700&family=Noto+Sans+TC:wght@300;500;700&display=swap");
              .style-text-catagory-title, .text-catagory-title .text-catagory-title-content {
                font-weight: 700;
                font-size: 0.315cm;
                line-height: 0.315cm;
                letter-spacing: 2px;
                text-transform: uppercase;
              }

              .style-text-catagory-subtitle, .text-catagory-subtitle .text-catagory-subtitle-content {
                font-weight: 500;
                font-size: 0.245cm;
                letter-spacing: 1px;
                line-height: 0.4cm;
              }

              .style-text-data-key, .key-value-wrapper .key-content {
                font-weight: 300;
                font-size: 0.245cm;
                letter-spacing: 1px;
                line-height: 0.4cm;
                text-transform: uppercase;
              }

              .style-text-body, .header .qrcodes .qrcode-wrapper .qrcode-content, .key-value-wrapper .value-content {
                font-weight: 500;
                font-size: 0.315cm;
                letter-spacing: 0.5px;
                line-height: 0.4cm;
              }

              .style-text-secondary, .header .qrcodes .qrcode-wrapper .qrcode-site {
                font-weight: 300;
                font-size: 0.245cm;
                letter-spacing: 0.39px;
                line-height: 0.4cm;
              }

              @page {
                size: A4 portrait;
                margin: 6.65mm;
              }

              html,
              body {
                width: 200mm;
                height: 280mm;
                font-family: "Heebo", "Noto Sans TC", sans-serif;
                color: #000000;
              }

              .page {
                width: 100%;
                height: 100%;
                page-break-inside: avoid;
                /* 若順著向下排列時會切開此元素，則直接換頁 */
                page-break-after: always;
                /* 碰到此元素會直接換頁 */
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                    -ms-flex-direction: column;
                        flex-direction: column;
              }

              .header {
                height: 38mm;
                -webkit-box-flex: 1;
                    -ms-flex: 1 0 auto;
                        flex: 1 0 auto;
                display: -ms-grid;
                display: grid;
                -ms-grid-columns: 28mm 45mm 127mm;
                    grid-template-columns: 28mm 45mm 127mm;
                -ms-grid-rows: 6.3mm 30mm;
                    grid-template-rows: 6.3mm 30mm;
                border-bottom: 1px solid #d5d5d5;
              }

              .header .account-info {
                -ms-grid-column: 1;
                -ms-grid-column-span: 2;
                grid-column: 1/3;
                -ms-grid-row: 1;
                -ms-grid-row-span: 2;
                grid-row: 1/3;
              }

              .header .account-info .profile-picture-wrapper {
                width: 25.4mm;
                height: 25.4mm;
                overflow: hidden;
                border-radius: 1mm;
              }

              .header .account-info .profile-picture-wrapper img {
                width: 100%;
                height: 100%;
                -o-object-fit: fill;
                   object-fit: fill;
              }

              .header .account-info .account-display-name {
                font-weight: 500;
                font-size: 0.455cm;
                color: #000000;
                letter-spacing: 0;
              }

              .header .account-info .accouint-occupation {
                font-weight: 300;
                font-size: 0.315cm;
                color: #000000;
                letter-spacing: 1px;
                line-height: 13px;
              }

              .header .page-number {
                background-color: #F6F6F6;
                -ms-grid-column: 2;
                -ms-grid-column-span: 2;
                grid-column: 2/4;
                -ms-grid-row: 1;
                -ms-grid-row-span: 1;
                grid-row: 1/2;
                font-weight: 500;
                font-size: 9px;
                color: #000000;
                letter-spacing: 0.5px;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: end;
                    -ms-flex-pack: end;
                        justify-content: flex-end;
                -webkit-box-align: center;
                    -ms-flex-align: center;
                        align-items: center;
              }

              .header .qrcodes {
                -ms-grid-column: 3;
                -ms-grid-column-span: 1;
                grid-column: 3/4;
                -ms-grid-row: 2;
                -ms-grid-row-span: 1;
                grid-row: 2/3;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: end;
                    -ms-flex-pack: end;
                        justify-content: flex-end;
              }

              .header .qrcodes .qrcode-wrapper .qrcode-site {
                margin-top: 2mm;
              }

              .header .qrcodes .qrcode-wrapper .qrcode-content {
                margin-top: 0.5mm;
              }

              .header .qrcodes .qrcode-wrapper .qrcode-code {
                width: 17.5mm;
                height: 17.5mm;
                margin-top: 1mm;
                overflow: hidden;
              }

              .header .qrcodes .qrcode-wrapper .qrcode-code * {
                width: 100%;
                height: 100%;
              }

              .content {
                -webkit-box-flex: 1;
                    -ms-flex: 1 1 100%;
                        flex: 1 1 100%;
              }

              .content .master-detail-wrapper {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                height: 100%;
              }

              .content .master-detail-wrapper .master-view {
                -webkit-box-flex: 1;
                    -ms-flex: 1 0 auto;
                        flex: 1 0 auto;
                border-right: 1px solid #d5d5d5;
              }

              .content .master-detail-wrapper .detail-view {
                -webkit-box-flex: 2;
                    -ms-flex: 2 0 auto;
                        flex: 2 0 auto;
                padding-left: 0.3cm;
              }

              .column-view-wrapper {
                height: 100%;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
              }

              .column-view-wrapper .column-view {
                height: 100%;
                -webkit-box-sizing: border-box;
                        box-sizing: border-box;
              }

              .column-view-wrapper .column-view-50 {
                width: 45%;
              }

              .column-view-wrapper .column-view-25 {
                width: 25%;
              }

              .column-view-wrapper .column-view-auto {
                width: auto;
                -webkit-box-flex: 1;
                    -ms-flex: 1 1 auto;
                        flex: 1 1 auto;
              }

              .text-catagory-title {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                    -ms-flex-align: center;
                        align-items: center;
                margin-top: 0.3cm;
                margin-bottom: 0.1cm;
              }

              .text-catagory-title .text-catagory-title-icon img {
                width: 0.4cm;
                height: 0.4cm;
                margin-top: 0.12cm;
              }

              .text-catagory-title .text-catagory-title-content {
                margin-left: 0.2cm;
              }

              .text-catagory-subtitle {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                margin-top: 0.2cm;
                margin-bottom: 0cm;
                -webkit-box-sizing: border-box;
                        box-sizing: border-box;
              }

              .text-catagory-subtitle .text-catagory-subtitle-content {
                margin-top: 0.35cm;
              }

              .key-value-wrapper {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                margin: 0.15cm 0;
                width: 90%;
              }

              .key-value-wrapper .key-wrapper {
                width: 20mm;
                margin-right: 0.1cm;
                -webkit-box-flex: 0;
                    -ms-flex: 0 0 auto;
                        flex: 0 0 auto;
              }

              .key-value-wrapper .key-content {
                color: #000000;
                line-height: 3.85mm;
              }

              .key-value-wrapper .value-wrapper {
                width: 49mm;
                -webkit-box-flex: 0;
                    -ms-flex: 0 0 auto;
                        flex: 0 0 auto;
              }

              .key-value-wrapper .value-content {
                color: #000000;
              }

              .key-value-wrapper .value-content span {
                font-weight: 300;
              }

              .text-item-wrapper {
                margin: 0.1cm 0;
                width: 90%;
              }

              .text-item-wrapper .text-item-title-wrapper .text-item-title-content {
                font-weight: 300;
                font-size: 2.45mm;
                color: #000000;
                line-height: 3.85mm;
              }

              .text-item-wrapper .text-item-content-wrapper .text-item-content-content {
                font-weight: 500;
                font-size: 3mm;
                color: #000000;
                letter-spacing: 0.58px;
                line-height: 3.85mm;
              }

              .text-item-wrapper .text-item-content-wrapper .text-item-content-content span {
                font-weight: 300;
              }

              .footer {
                height: 42mm;
                -webkit-box-flex: 1;
                    -ms-flex: 1 0 auto;
                        flex: 1 0 auto;
                border-top: 1px solid #d5d5d5;
              }
              /*# sourceMappingURL=style.css.map */
          </style>
      </head>
      <body>
          <div class="page">
              <div class="header">
                  <div class="account-info">
                      <div class="profile-picture-wrapper">
                          <img src="images/cathwong.jpg" alt="" />
                      </div>
                      <div class="account-display-name">Cath Wong 黃妍</div>
                      <div class="accouint-occupation">
                          Screenwriter．Director．Editor
                      </div>
                  </div>
                  <div class="page-number">
                      <div class="page-number-text">Page</div>
                      <div class="page-number-current">1</div>
                      <div class="page-number-text">of</div>
                      <div class="page-number-total">2</div>
                  </div>
                  <div class="qrcodes">
                      <div class="qrcode-wrapper">
                          <div class="qrcode-site">CAST FACT</div>
                          <div class="qrcode-content">林家熙 Locker94</div>
                          <div class="qrcode-code">
                              <img src="images/qrcode-sample.png" alt="" />
                          </div>
                      </div>
                  </div>
              </div>
              <div class="content">
                  <div class="master-detail-wrapper">
                      <div class="master-view">
                          <div class="text-catagory-title">
                              <div class="text-catagory-title-icon">
                                  <img
                                      src="images/personal_info.svg"
                                      alt="Awards"
                                      width="32px"
                                      height="32px"
                                  />
                              </div>
                              <div class="text-catagory-title-content">
                                  ${i18n.t('app.basic_information')}
                              </div>
                          </div>
                          <div class="key-value-wrapper">
                              <div class="key-wrapper">
                                  <div class="key-content">Gender</div>
                              </div>
                              <div class="value-wrapper">
                                  <div class="value-content">Male</div>
                              </div>
                          </div>
                          <div class="key-value-wrapper">
                              <div class="key-wrapper">
                                  <div class="key-content">Occupation</div>
                              </div>
                              <div class="value-wrapper">
                                  <div class="value-content">Screenwriter</div>
                                  <div class="value-content">Director</div>
                                  <div class="value-content">Editor</div>
                              </div>
                          </div>
                          <div class="key-value-wrapper">
                              <div class="key-wrapper">
                                  <div class="key-content">Skills</div>
                              </div>
                              <div class="value-wrapper">
                                  <div class="value-content">Cooking</div>
                                  <div class="value-content">Swimming</div>
                                  <div class="value-content">Photography</div>
                              </div>
                          </div>
                          <div class="key-value-wrapper">
                              <div class="key-wrapper">
                                  <div class="key-content">Years active</div>
                              </div>
                              <div class="value-wrapper">
                                  <div class="value-content">
                                      2012-present <span>(10 years)</span>
                                  </div>
                              </div>
                          </div>
                          <div class="key-value-wrapper">
                              <div class="key-wrapper">
                                  <div class="key-content">Working base</div>
                              </div>
                              <div class="value-wrapper">
                                  <div class="value-content">Hong Kong</div>
                              </div>
                          </div>
                          <div class="key-value-wrapper">
                              <div class="key-wrapper">
                                  <div class="key-content">Alma mater</div>
                              </div>
                              <div class="value-wrapper">
                                  <div class="value-content">
                                      City University of Hong Kong (School of
                                      Creative Media)
                                  </div>
                              </div>
                          </div>
                          <div class="key-value-wrapper">
                              <div class="key-wrapper">
                                  <div class="key-content">Nationality</div>
                              </div>
                              <div class="value-wrapper">
                                  <div class="value-content">Hong Kong</div>
                              </div>
                          </div>
                          <div class="key-value-wrapper">
                              <div class="key-wrapper">
                                  <div class="key-content">Language</div>
                              </div>
                              <div class="value-wrapper">
                                  <div class="value-content">Cantonese</div>
                                  <div class="value-content">English</div>
                                  <div class="value-content">Madarin</div>
                              </div>
                          </div>
                          <div class="text-catagory-title">
                            <div class="text-catagory-title-icon">
                                <img
                                    src="images/personal_apperance.svg"
                                    alt="Awards"
                                    width="32px"
                                    height="32px"
                                />
                            </div>
                            <div class="text-catagory-title-content">
                                ${i18n.t('app.appearance')}
                            </div>
                        </div>
                        <div class="key-value-wrapper">
                            <div class="key-wrapper">
                                <div class="key-content">Hiehgt</div>
                            </div>
                            <div class="value-wrapper">
                                <div class="value-content">5’5 (166cm)</div>
                            </div>
                        </div>
                        <div class="key-value-wrapper">
                            <div class="key-wrapper">
                                <div class="key-content">Weight</div>
                            </div>
                            <div class="value-wrapper">
                                <div class="value-content">123 lbs (56kg)</div>
                            </div>
                        </div>
                        <div class="key-value-wrapper">
                            <div class="key-wrapper">
                                <div class="key-content">Body Type</div>
                            </div>
                            <div class="value-wrapper">
                                <div class="value-content">--</div>
                            </div>
                        </div>
                        <div class="key-value-wrapper">
                            <div class="key-wrapper">
                                <div class="key-content">Skin</div>
                            </div>
                            <div class="value-wrapper">
                                <div class="value-content">--</div>
                            </div>
                        </div>
                        <div class="key-value-wrapper">
                            <div class="key-wrapper">
                                <div class="key-content">Hair</div>
                            </div>
                            <div class="value-wrapper">
                                <div class="value-content">Black</div>
                            </div>
                        </div>
                        <div class="key-value-wrapper">
                            <div class="key-wrapper">
                                <div class="key-content">Eyes</div>
                            </div>
                            <div class="value-wrapper">
                                <div class="value-content">Brown</div>
                            </div>
                        </div>
                        <div class="key-value-wrapper">
                            <div class="key-wrapper">
                                <div class="key-content">Dress size</div>
                            </div>
                            <div class="value-wrapper">
                                <div class="value-content">--</div>
                            </div>
                        </div>
                        <div class="key-value-wrapper">
                            <div class="key-wrapper">
                                <div class="key-content">Shirt</div>
                            </div>
                            <div class="value-wrapper">
                                <div class="value-content">--</div>
                            </div>
                        </div>
                        <div class="key-value-wrapper">
                            <div class="key-wrapper">
                                <div class="key-content">Shoe</div>
                            </div>
                            <div class="value-wrapper">
                                <div class="value-content">--</div>
                            </div>
                        </div>
                        <div class="key-value-wrapper">
                            <div class="key-wrapper">
                                <div class="key-content">Suit coat</div>
                            </div>
                            <div class="value-wrapper">
                                <div class="value-content">--</div>
                            </div>
                        </div>
                        <div class="key-value-wrapper">
                            <div class="key-wrapper">
                                <div class="key-content">Pants</div>
                            </div>
                            <div class="value-wrapper">
                                <div class="value-content">--</div>
                            </div>
                        </div>
                        <div class="key-value-wrapper">
                            <div class="key-wrapper">
                                <div class="key-content">Hat</div>
                            </div>
                            <div class="value-wrapper">
                                <div class="value-content">--</div>
                            </div>
                        </div>
                        <div class="key-value-wrapper">
                            <div class="key-wrapper">
                                <div class="key-content">Handedness</div>
                            </div>
                            <div class="value-wrapper">
                                <div class="value-content">Right-handed</div>
                            </div>
                        </div>
                        <div class="key-value-wrapper">
                            <div class="key-wrapper">
                                <div class="key-content">Glove</div>
                            </div>
                            <div class="value-wrapper">
                                <div class="value-content">No</div>
                            </div>
                        </div>
                      </div>
                      <div class="detail-view">
                          <div class="column-view-wrapper">
                              <div class="column-view column-view-50">
                                  <div class="text-catagory-title">
                                      <div class="text-catagory-title-icon">
                                          <img
                                              src="images/personal_awards.svg"
                                              alt="Awards"
                                              width="32px"
                                              height="32px"
                                          />
                                      </div>
                                      <div class="text-catagory-title-content">
                                          ${i18n.t('app.awards')}
                                      </div>
                                  </div>
                                  <div class="text-item-wrapper">
                                      <div class="text-item-title-wrapper">
                                          <div class="text-item-title-content">
                                              2021
                                          </div>
                                      </div>
                                      <div class="text-item-content-wrapper">
                                          <div class="text-item-content-content">
                                              32屆台灣金曲獎演奏類最佳專輯製作人獎
                                              得獎
                                          </div>
                                      </div>
                                  </div>
                                  <div class="text-item-wrapper">
                                      <div class="text-item-title-wrapper">
                                          <div class="text-item-title-content">
                                              2022
                                          </div>
                                      </div>
                                      <div class="text-item-content-wrapper">
                                          <div class="text-item-content-content">
                                              Chill Club 推介榜年度推介21/22 Chill
                                              Club 年度組合（金獎）組合得獎
                                          </div>
                                      </div>
                                  </div>
                                  <div class="text-catagory-title">
                                      <div class="text-catagory-title-icon">
                                          <img src="" alt="" />
                                      </div>
                                      <div class="text-catagory-title-content">
                                          ${i18n.t('app.experience')}
                                      </div>
                                  </div>
                                  <div class="text-catagory-subtitle">
                                      <div class="text-catagory-subtitle-icon">
                                          <img
                                              src="images/exp_movies.svg"
                                              alt="Awards"
                                              width="32px"
                                              height="32px"
                                          />
                                      </div>
                                      <div class="text-catagory-subtitle-content">
                                          MOVIE
                                      </div>
                                  </div>
                                  <div class="text-item-wrapper">
                                      <div class="text-item-title-wrapper">
                                          <div class="text-item-title-content">
                                              2016
                                          </div>
                                      </div>
                                      <div class="text-item-content-wrapper">
                                          <div class="text-item-content-content">
                                              《點五步》, 男主角, Locker
                                          </div>
                                      </div>
                                  </div>
                                  <div class="text-item-wrapper">
                                    <div class="text-item-title-wrapper">
                                        <div class="text-item-title-content">
                                            2018
                                        </div>
                                    </div>
                                    <div class="text-item-content-wrapper">
                                        <div class="text-item-content-content">
                                          《某日某月》, 男主角, 家希
                                        </div>
                                    </div>
                                </div>
                                <div class="text-item-wrapper">
                                    <div class="text-item-title-wrapper">
                                        <div class="text-item-title-content">
                                            2019
                                        </div>
                                    </div>
                                    <div class="text-item-content-wrapper">
                                        <div class="text-item-content-content">
                                          《犯罪現場》, 男主角, 葉守正團隊CID
                                        </div>
                                    </div>
                                </div>
                                <div class="text-item-wrapper">
                                    <div class="text-item-title-wrapper">
                                        <div class="text-item-title-content">
                                            2020
                                        </div>
                                    </div>
                                    <div class="text-item-content-wrapper">
                                        <div class="text-item-content-content">
                                          《Baby復仇記》, 男主角, 羅拔
                                        </div>
                                    </div>
                                </div>
                                <div class="text-item-wrapper">
                                    <div class="text-item-title-wrapper">
                                        <div class="text-item-title-content">
                                            2021
                                        </div>
                                    </div>
                                    <div class="text-item-content-wrapper">
                                        <div class="text-item-content-content">
                                          《媽媽的神奇小子》, 男主角, 蘇健瑋
                                        </div>
                                    </div>
                                </div>
                                <div class="text-item-wrapper">
                                    <div class="text-item-title-wrapper">
                                        <div class="text-item-title-content">
                                            2021
                                        </div>
                                    </div>
                                    <div class="text-item-content-wrapper">
                                        <div class="text-item-content-content">
                                          《猛鬼3寶》  
                                        </div>
                                    </div>
                                </div>
                                <div class="text-item-wrapper">
                                    <div class="text-item-title-wrapper">
                                        <div class="text-item-title-content">
                                            2022
                                        </div>
                                    </div>
                                    <div class="text-item-content-wrapper">
                                        <div class="text-item-content-content">
                                          《闔家辣》, 男主角, 阿熙
                                        </div>
                                    </div>
                                </div>
                                <div class="text-item-wrapper">
                                    <div class="text-item-title-wrapper">
                                        <div class="text-item-title-content">
                                            2022
                                        </div>
                                    </div>
                                    <div class="text-item-content-wrapper">
                                        <div class="text-item-content-content">
                                          《飯戲攻心》, 客串
                                        </div>
                                    </div>
                                </div>
                                <div class="text-catagory-subtitle">
                                  <div class="text-catagory-subtitle-icon">
                                      <img
                                          src="images/exp_tvshow.svg"
                                          alt="Awards"
                                          width="32px"
                                          height="32px"
                                      />
                                  </div>
                                  <div class="text-catagory-subtitle-content">
                                    TV SHOWS
                                  </div>
                              </div>
                              <div class="text-item-wrapper">
                                  <div class="text-item-title-wrapper">
                                      <div class="text-item-title-content">
                                          2016
                                      </div>
                                  </div>
                                  <div class="text-item-content-wrapper">
                                      <div class="text-item-content-content">
                                          《點五步》, 男主角, Locker
                                      </div>
                                  </div>
                              </div>
                              </div>
                              <div class="column-view column-view-50">
                                <div class="text-item-wrapper">
                                  <div class="text-item-title-wrapper">
                                      <div class="text-item-title-content">
                                          2016
                                      </div>
                                  </div>
                                  <div class="text-item-content-wrapper">
                                      <div class="text-item-content-content">
                                          《點五步》, 男主角, Locker
                                      </div>
                                  </div>
                              </div>
                              <div class="text-item-wrapper">
                                <div class="text-item-title-wrapper">
                                    <div class="text-item-title-content">
                                        2018
                                    </div>
                                </div>
                                <div class="text-item-content-wrapper">
                                    <div class="text-item-content-content">
                                      《某日某月》, 男主角, 家希
                                    </div>
                                </div>
                            </div>
                            <div class="text-item-wrapper">
                                <div class="text-item-title-wrapper">
                                    <div class="text-item-title-content">
                                        2019
                                    </div>
                                </div>
                                <div class="text-item-content-wrapper">
                                    <div class="text-item-content-content">
                                      《犯罪現場》, 男主角, 葉守正團隊CID
                                    </div>
                                </div>
                            </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="footer">
                  <div class="footer-header">
                      <div class="text-catagory-title">
                          <div class="text-catagory-title-content">
                              ${i18n.t('app.contacts')}
                          </div>
                      </div>
                  </div>
                  <div class="footer-content">
                      <div class="column-view-wrapper">
                          <div class="column-view column-view-auto">
                              <div class="text-catagory-subtitle">
                                  <div class="text-catagory-subtitle-content">
                                    Address
                                  </div>
                              </div>
                              <div class="text-item-wrapper">
                                  <div class="text-item-title-wrapper">
                                      <div class="text-item-title-content">
                                          2016
                                      </div>
                                  </div>
                                  <div class="text-item-content-wrapper">
                                      <div class="text-item-content-content">
                                          《點五步》, 男主角, Locker
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="column-view column-view-auto">
                              <div class="text-catagory-subtitle">
                                  <div class="text-catagory-subtitle-content">
                                      Email
                                  </div>
                              </div>
                              <div class="text-item-wrapper">
                                  <div class="text-item-title-wrapper">
                                      <div class="text-item-title-content">
                                        Work
                                      </div>
                                  </div>
                                  <div class="text-item-content-wrapper">
                                      <div class="text-item-content-content">
                                        sammi.lam@trialanderror924.com
                                      </div>
                                  </div>
                              </div>
                              <div class="text-item-wrapper">
                                <div class="text-item-title-wrapper">
                                    <div class="text-item-title-content">
                                      MUSIC
                                    </div>
                                </div>
                                <div class="text-item-content-wrapper">
                                    <div class="text-item-content-content">
                                      edwina.newagetone@gmail.com
                                    </div>
                                </div>
                            </div>

                          </div>
                          <div class="column-view column-view-auto">
                            <div class="text-catagory-subtitle">
                                <div class="text-catagory-subtitle-content">
                                  PHONE
                                </div>
                            </div>
                            <div class="text-item-wrapper">
                                <div class="text-item-title-wrapper">
                                    <div class="text-item-title-content">
                                      GENERAL
                                    </div>
                                </div>
                                <div class="text-item-content-wrapper">
                                    <div class="text-item-content-content">
                                      Michelle Ko <br> +852 9732 9499
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="column-view column-view-auto">
                          <div class="text-catagory-subtitle">
                              <div class="text-catagory-subtitle-content">
                                AGENT/MGR
                              </div>
                          </div>
                          <div class="text-item-wrapper">
                              <div class="text-item-content-wrapper">
                                  <div class="text-item-content-content">
                                    New Age Tone Entertainment <br> 試當真
                                  </div>
                              </div>
                          </div>

                      </div>
                  </div>
              </div>
          </div>
      </body>
  </html>
  `;

  return html;
}
