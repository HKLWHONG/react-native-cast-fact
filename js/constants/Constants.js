/**
 * @format
 * @flow strict-local
 */

import * as CastSheetConstants from './CastSheetConstants';

export const VERSION = 'v1.0.0';

export const TAGS =
[
    {
        "rightAccessoryType": "plus",
        "label": "Height",
        "category_name": CastSheetConstants.CAST_SHEET_KEY_HEIGHT,
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
                "regex": '^[1-9][0-9]*$',
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
        "label": "Weight",
        "category_name": CastSheetConstants.CAST_SHEET_KEY_WEIGHT,
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
                "regex": '^[1-9][0-9]*$',
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
        "label": "Age",
        "category_name": CastSheetConstants.CAST_SHEET_KEY_AGE,
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
                "regex": '^[1-9][0-9]*$',
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
        "category_name": CastSheetConstants.CAST_SHEET_KEY_LANGUAGES,
        "data": [],
    },
    {
        "rightAccessoryType": null,
        "category_name": CastSheetConstants.CAST_SHEET_KEY_OCCUPATIONS,
        "data": [],
    },
    {
        "rightAccessoryType": null,
        "category_name": CastSheetConstants.CAST_SHEET_KEY_GENDER,
        "data": [],
    },
    {
        "rightAccessoryType": null,
        "category_name": CastSheetConstants.CAST_SHEET_KEY_EYES_COLORS,
        "data": [],
    },
    {
        "rightAccessoryType": null,
        "category_name": CastSheetConstants.CAST_SHEET_KEY_HAIR_COLORS,
        "data": [],
    },
    {
        "rightAccessoryType": null,
        "category_name": CastSheetConstants.CAST_SHEET_KEY_SKIN_COLOR,
        "data": [],
    },
    {
        "rightAccessoryType": null,
        "category_name": CastSheetConstants.CAST_SHEET_KEY_BODY_TYPES,
        "data": [],
    },
    {
        "rightAccessoryType": null,
        "category_name": CastSheetConstants.CAST_SHEET_KEY_NATIONALITIES,
        "data": [],
    }
];

export const TAGS_COLOR_MAPPING = {
  'black': '#000000',
};

export const PDF_HTML = `<!DOCTYPE html>
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
                                Basic information
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
                              Apperarance
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
                                        Awards
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
                                        EXPERIENCE
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
                            Basic information
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
