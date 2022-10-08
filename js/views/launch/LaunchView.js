/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Platform, Image } from 'react-native';

import { connect } from 'react-redux';
import {
  AppAction,
  DataAction,
  DrawerAction,
  LaunchAction,
  MainTabAction,
  CriteriaSectionAction,
  RecentSearchesSectionAction,
  FindTalentSectionAction,
} from '../../redux';

import { StackActions } from '@react-navigation/native';

import { BaseComponent, Root, Header, Body, Footer } from '../../components';

import i18n from '../../../i18n';
import { Translation } from 'react-i18next';

import { Theme, Router } from '../../utils';

const ic_splash_screen_bg = require('../../../assets/images/ic_splash_screen_bg/ic_splash_screen_bg.png');

class LaunchView extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();

    const { props } = this;

    this.initialize();
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    this.clearData();
  }

  initialize = () => {
    const { props } = this;

    props.selectDrawer(0);
    props.selectTab(0);

    props.setDummyData([
      {
        label: 'profiles',
        data: [
          {
            uri: 'https://kcplace.com/castfact/dummydata/Locker-profile.jpg',
            name: 'Locker Lam 林家熙',
            title: 'Artist',
            posts: [
              {
                uri: 'https://kcplace.com/castfact/dummydata/Locker-post-1.jpg',
                description: '好耐無見大耳（想改名叫細細）又大隻咗，花生就成熟穩重咗！',
                postCreated: '6/9/2022',
                eventStartDate: '6/9/2022',
                eventEndDate: '6/9/2022',
                eventType: 'Lifestyle',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/Locker-post-2.jpg',
                description: '《MR》八月號封面',
                postCreated: '10/8/2022',
                eventStartDate: '10/8/2022',
                eventEndDate: '10/8/2022',
                eventType: 'Photography',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/Locker-post-3.jpg',
                description: 'Verified Last Day🖤',
                postCreated: '24/7/2022',
                eventStartDate: '24/7/2022',
                eventEndDate: '25/7/2022',
                eventType: 'Stage Show',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/Locker-post-4.jpg',
                description: '#一個舞台上不能接受的吻',
                postCreated: '12/7/2022',
                eventStartDate: '12/7/2022',
                eventEndDate: '14/7/2022',
                eventType: 'Stage Show',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/Locker-post-5.jpg',
                description: '夏天日照時間長左都唔可以嘥左個夜晚',
                postCreated: '22/7/2022',
                eventStartDate: '22/7/2022',
                eventEndDate: '22/7/2022',
                eventType: 'Lifestyle',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/Locker-post-6.jpg',
                description: '實謝都真係實謝… 下次見有無得要雞精',
                postCreated: '23/6/2022',
                eventStartDate: '23/6/2022',
                eventEndDate: '23/6/2022',
                eventType: 'Stage Show',
              },
            ],
            tags: [
              { text: 'Model' },
              { text: 'Actor' },
              { text: 'YouTuber' },
              { text: 'Modelling' },
              { text: 'Latte art' },
              { text: 'Football' },
              { text: 'Photography' },
              { text: 'Directing' },
              { text: 'Video shooting' },
              { text: 'Editing' },
              { text: 'Snorkelling' },
              { text: 'Camping skills' },
              { text: 'Driving' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Hong Kong' },
              { text: 'Driving license' },
              { text: '177 cm' },
              { text: 'Black hair' },
              { text: 'Black eye' },
              { text: 'Beige skin' },
              { text: 'Athletic body' },
              { text: 'Muscular body' },
              { text: 'Right-handed' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/JustinCheung-profile.jpg',
            name: 'Justin Cheung 張建聲',
            title: 'Actor',
            posts: [],
            tags: [
              { text: 'Male' },
              { text: 'Age: 39' },
              { text: '11/3/1983' },
              { text: 'Actor' },
              { text: 'Film' },
              { text: 'Producer' },
              { text: 'Director' },
              { text: 'Filmmaker' },
              { text: 'Artist' },
              { text: 'Script writer' },
              { text: 'Screenplay' },
              { text: 'Acting' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Hong Kong' },
              { text: '178 cm' },
              { text: '77 kg' },
              { text: 'Black eye' },
              { text: 'Black hair' },
              { text: 'Honey skin' },
              { text: 'Muscular body' },
              { text: 'Well-built body' },
              { text: 'Right-handed' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/MC-profile.jpg',
            name: 'MC 張天賦',
            title: 'Singer',
            posts: [
              {
                uri: 'https://kcplace.com/castfact/dummydata/MC-post-1.jpg',
                description: 'Madame Figaro 秋季刊有我，仲有期間限定嘅疤痕造型',
                postCreated: '20/9/2022',
                eventStartDate: '20/9/2022',
                eventEndDate: '20/9/2022',
                eventType: 'Photography',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/MC-post-2.jpg',
                description: '總算為Frenemy劃上一個圓滿嘅句號。係到要多謝每一位台前幕後嘅工作人員、dancer、樂隊、stylist、妝頭、導演監製同埋每一位入場支持嘅賦二代同埋院友。',
                postCreated: '5/9/2022',
                eventStartDate: '5/9/2022',
                eventEndDate: '8/9/2022',
                eventType: 'Stage Show',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/MC-post-3.jpg',
                description: '大直路了，4 days to go, 好似係',
                postCreated: '1/9/2022',
                eventStartDate: '1/9/2022',
                eventEndDate: '1/9/2022',
                eventType: 'Stage Show',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/MC-post-4.jpg',
                description: 'Yes sir🫡',
                postCreated: '26/7/2022',
                eventStartDate: '26/7/2022',
                eventEndDate: '26/7/2022',
                eventType: 'MV',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/MC-post-5.jpg',
                description: '我鍾意啲特別又有玩味嘅嘢，但同時簡約設計我又覺得好緊要喎！我今日著住Givenchy 呢對TK-360運動鞋就正正啱哂feel 啦~',
                postCreated: '13/7/2022',
                eventStartDate: '13/7/2022',
                eventEndDate: '13/7/2022',
                eventType: 'Photography',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/MC-post-6.jpg',
                description: '多謝 ADAY 邀請。正如訪問中提到，我希望自己永遠保持初心，讓自己一直是當初那個因為喜歡唱歌而唱歌的 MC。',
                postCreated: '24/4/2022',
                eventStartDate: '24/4/2022',
                eventEndDate: '24/4/2022',
                eventType: 'Photography',
              },
            ],
            tags: [
              { text: 'Male' },
              { text: 'Age: 25' },
              { text: '1/12/1996' },
              { text: 'Singer' },
              { text: 'Singing' },
              { text: 'Guitar' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Hong Kong' },
              { text: 'Dark blonde hair' },
              { text: 'Dark brown eye' },
              { text: 'Warm Ivory Skin' },
              { text: 'Toned body' },
              { text: 'Average body' },
              { text: 'Right-handed' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/kayan9896-profile.jpg',
            name: 'Jeannie Ng 吳家忻',
            title: 'Artist',
            posts: [
              {
                uri: 'https://kcplace.com/castfact/dummydata/kayan9896-post-1.jpg',
                description: 'Persian carpets inspired oversized jacket, one shoulder dress, Botsy bag in suede, echoes the burnt and neon orange hues. 🧡',
                postCreated: '5/10/2022',
                eventStartDate: '5/10/2022',
                eventEndDate: '5/10/2022',
                eventType: 'Photography',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/kayan9896-post-2.jpg',
                description: 'BELIEVE is the ability to dream that everyone carries within them.',
                postCreated: '22/9/2022',
                eventStartDate: '22/9/2022',
                eventEndDate: '22/9/2022',
                eventType: 'Photography',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/kayan9896-post-3.jpg',
                description: '🎶🎤happy day with friends at',
                postCreated: '19/9/2022',
                eventStartDate: '19/9/2022',
                eventEndDate: '21/9/2022',
                eventType: 'Stage Show',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/kayan9896-post-4.jpg',
                description: 'bts💙',
                postCreated: '24/8/2022',
                eventStartDate: '24/8/2022',
                eventEndDate: '24/8/2022',
                eventType: 'MV',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/kayan9896-post-5.jpg',
                description: 'miu miu girlssss 🥂 ',
                postCreated: '20/8/2022',
                eventStartDate: '20/8/2022',
                eventEndDate: '20/8/2022',
                eventType: 'Photography',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/kayan9896-post-6.jpg',
                description: '🖤 @ysl',
                postCreated: '28/7/2022',
                eventStartDate: '28/7/2022',
                eventEndDate: '28/7/2022',
                eventType: 'Photography',
              },
            ],
            tags: [
              { text: 'Female' },
              { text: 'Age: 23' },
              { text: '6/9/1998' },
              { text: 'Actress' },
              { text: 'Singer' },
              { text: 'YouTuber' },
              { text: 'Model' },
              { text: 'Singing' },
              { text: 'Dancing' },
              { text: 'Modelling' },
              { text: 'Photography' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Putonghua' },
              { text: 'Taiwanese Hokkien' },
              { text: 'Hong Kong' },
              { text: 'Black hair' },
              { text: 'Brown eye' },
              { text: 'Sand skin' },
              { text: 'Slim body' },
              { text: 'Lean body' },
              { text: 'Curvy body' },
              { text: 'Willowy body' },
              { text: 'Right-handed' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/LongmondLeung-profile.jpg',
            name: 'Longmond Leung 梁樂民',
            title: 'Production designer',
            posts: [],
            tags: [
              { text: 'Male' },
              { text: 'Age: 50' },
              { text: '23/3/1972' },
              { text: 'Production Designer' },
              { text: 'Director' },
              { text: 'Screenwriter' },
              { text: 'Actor' },
              { text: 'Acting' },
              { text: 'Art design' },
              { text: 'Photography' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Hong Kong' },
              { text: 'Black hair' },
              { text: 'Brown eye' },
              { text: 'Beige skin' },
              { text: 'Large body' },
              { text: 'Tubby body' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/EndyChow-profile.jpg',
            name: 'Endy Chow 周國賢',
            title: 'Singer',
            posts: [
              {
                uri: 'https://kcplace.com/castfact/dummydata/EndyChow-post-1.jpg',
                description: '做完tone festival的那晚，真的有種鬆一口氣的感覺，一個月內做了三場紅館、一場music zone、一場亞博，三場的主題都不一樣⋯⋯結束後，跟自己講，我想抖一個禮拜！（今日已經抖完了）可以寫少少嘢分享一下了🤏',
                postCreated: '8/10/2022',
                eventStartDate: '1/10/2022',
                eventEndDate: '2/10/2022',
                eventType: 'Stage Show',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/EndyChow-post-2.jpg',
                description: '「捉緊呢個時刻，活好自己！」',
                postCreated: '5/10/2022',
                eventStartDate: '1/10/2022',
                eventEndDate: '2/10/2022',
                eventType: 'Stage Show',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/EndyChow-post-3.jpg',
                description: 'home is not a physical place in the outside world, but an inner quality of relaxation and acceptance. ',
                postCreated: '28/9/2022',
                eventStartDate: '28/9/2022',
                eventEndDate: '28/9/2022',
                eventType: 'Lifestyle',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/EndyChow-post-4.jpg',
                description: '有關《太平道》的mv拍攝，中間發生了很多神奇的事，剪了一條有少少幕後花絮和鳴謝的片段放在Youtube Channel☺️',
                postCreated: '3/8/2022',
                eventStartDate: '3/8/2022',
                eventEndDate: '3/8/2022',
                eventType: 'MV',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/EndyChow-post-5.jpg',
                description: '在台上講credit的時間太少，喺ig慢慢認真感謝各單位，首先想講講，感謝為我設計靚衫的 @kitwanstudios ',
                postCreated: '1/7/2022',
                eventStartDate: '1/7/2022',
                eventEndDate: '1/7/2022',
                eventType: 'Stage Show',
              },
              {
                uri: 'https://kcplace.com/castfact/dummydata/EndyChow-post-6.jpg',
                description: '是次演唱會將會聯乘本地品牌 @growthringsupply 推出一系列紀念品，感謝 @yannyyc 率先試穿示範，歡迎大家屆時在場外選購，亦提供網上預訂紀念品。',
                postCreated: '21/6/2022',
                eventStartDate: '21/6/2022',
                eventEndDate: '21/6/2022',
                eventType: 'Stage Show',
              },
            ],
            tags: [
              { text: 'Male' },
              { text: 'Age: 42' },
              { text: '11/12/1979' },
              { text: 'Singer' },
              { text: 'Actor' },
              { text: 'Songwriter' },
              { text: 'Illustrator' },
              { text: 'Music video director' },
              { text: 'Video editor' },
              { text: 'Photographer' },
              { text: 'Acting' },
              { text: 'Singing' },
              { text: 'Songwriting' },
              { text: 'Guitar' },
              { text: 'Piano' },
              { text: 'Cello' },
              { text: 'Boxing' },
              { text: 'Drawing' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Japanese' },
              { text: 'Korean' },
              { text: 'Driving license' },
              { text: '177 cm' },
              { text: '65 kg' },
              { text: 'Black hair' },
              { text: 'Black eye' },
              { text: 'Bronze skin' },
              { text: 'Athletic body' },
              { text: 'Muscular body' },
              { text: 'Right-handed' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/GigiCheung-Profile.jpg',
            name: 'Gigi Cheung 張蔓姿',
            title: 'Singer',
            posts: [],
            tags: [
              { text: 'Female' },
              { text: 'Age: 28' },
              { text: '4/7/1994' },
              { text: 'Model' },
              { text: 'Actor' },
              { text: 'Singer' },
              { text: 'Composer' },
              { text: 'YouTuber' },
              { text: 'Acting' },
              { text: 'Singing' },
              { text: 'Photography' },
              { text: 'Directing' },
              { text: 'Modelling' },
              { text: 'Electone' },
              { text: 'Synthesizer' },
              { text: 'Guitar' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Hong Kong' },
              { text: 'Black eye' },
              { text: 'Black hair' },
              { text: 'Pale Ivory skin' },
              { text: 'Slender body' },
              { text: 'Slim body' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/SabrinaCheung-profile.jpg',
            name: 'Sabrina Cheung 張蔓莎',
            title: 'Artist',
            posts: [],
            tags: [
              { text: 'Female' },
              { text: 'Age: 28' },
              { text: '5/7/1994' },
              { text: 'Model' },
              { text: 'Actor' },
              { text: 'Singer' },
              { text: 'Composer' },
              { text: 'YouTuber' },
              { text: 'Acting' },
              { text: 'Singing' },
              { text: 'Modelling' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Spanish' },
              { text: 'Hong Kong' },
              { text: 'Black eye' },
              { text: 'Black hair' },
              { text: 'Pale Ivory skin' },
              { text: 'Slender body' },
              { text: 'Slim body' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/CobaCheng-profile.jpg',
            name: 'Coba Cheng 鄭晉軒',
            title: 'Artist',
            posts: [],
            tags: [
              { text: 'Male' },
              { text: 'Age: 30' },
              { text: '18/2/1991' },
              { text: 'Director' },
              { text: 'Screenwriter' },
              { text: 'Football' },
              { text: 'Photography' },
              { text: 'Scuba diving' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Hong Kong' },
              { text: 'Black eye' },
              { text: 'Black hair' },
              { text: 'Bronze skin' },
              { text: 'Big-boned body' },
              { text: 'Stocky body' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/KeungTo-profile.jpg',
            name: 'Keung To 姜濤',
            title: 'Singer',
            posts: [],
            tags: [
              { text: 'Male ' },
              { text: 'Age: 23' },
              { text: '30/4/1999' },
              { text: 'Actor' },
              { text: 'Singer' },
              { text: 'Acting' },
              { text: 'Singing' },
              { text: 'Dancing' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Hong Kong' },
              { text: '177 cm' },
              { text: '64 kg' },
              { text: 'Brown eye' },
              { text: 'Nut brown hair' },
              { text: 'Beige skin' },
              { text: 'Toned body' },
              { text: 'Average body' },
              { text: 'Right-handed' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/CathWong-profile.jpg',
            name: 'Cath Wong 黃妍',
            title: 'Singer',
            posts: [],
            tags: [
              { text: 'Female' },
              { text: 'Age: 30' },
              { text: '4/4/1992' },
              { text: 'Singer' },
              { text: 'Songwriter' },
              { text: 'Actor' },
              { text: 'Singing' },
              { text: 'Songwriting' },
              { text: 'Acting' },
              { text: 'Guitar' },
              { text: 'Piano' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Taiwanese Hokkien' },
              { text: 'Hong Kong' },
              { text: 'Black eye' },
              { text: 'Black hair' },
              { text: 'Pale Ivory skin' },
              { text: 'Average body' },
              { text: 'Right-handed' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/EdanLui-profile.jpg',
            name: 'Edan Lui 呂爵安',
            title: 'Singer',
            posts: [],
            tags: [
              { text: 'Male ' },
              { text: 'Age: 25' },
              { text: '21/1/1997' },
              { text: 'Singer' },
              { text: 'Actor' },
              { text: 'Model' },
              { text: 'Singing' },
              { text: 'Dancing' },
              { text: 'Acting' },
              { text: 'Piano' },
              { text: 'Violin' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Hong Kong' },
              { text: 'Brown eye' },
              { text: 'Black hair' },
              { text: 'Beige skin' },
              { text: 'Right-handed' },
              { text: '177 cm' },
              { text: '65 kg' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/AnsonLo-profile.jpg',
            name: 'Anson Lo 盧瀚霆',
            title: 'Artist',
            posts: [],
            tags: [
              { text: 'Male' },
              { text: 'Age: 27' },
              { text: '7/7/1995' },
              { text: 'Singer' },
              { text: 'Dancer' },
              { text: 'Actor' },
              { text: 'Model' },
              { text: 'Singing' },
              { text: 'Dancing' },
              { text: 'Acting' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Hong Kong' },
              { text: '176 cm' },
              { text: '67 kg' },
              { text: 'Brown eye' },
              { text: 'Black hair' },
              { text: 'Beige skin' },
              { text: 'Right-handed' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/AnsonKong-profile.jpg',
            name: 'Anson Kong 江𤒹生',
            title: 'Singer',
            posts: [],
            tags: [
              { text: 'Male' },
              { text: 'Age: 29' },
              { text: '16/10/1992' },
              { text: 'Singer' },
              { text: 'Actor' },
              { text: 'Model' },
              { text: 'Singing' },
              { text: 'Dancing' },
              { text: 'Modelling' },
              { text: 'Photography' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Hong Kong' },
              { text: 'Driving license' },
              { text: '177 cm' },
              { text: '67 kg' },
              { text: 'Brown eye' },
              { text: 'Chocolate hair' },
              { text: 'Honey skin' },
              { text: 'Muscular body' },
              { text: 'Jacked body' },
              { text: 'Well-built body' },
              { text: 'Right-handed' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/IanChan-profile.jpg',
            name: 'Ian Chan 陳卓賢',
            title: 'Singer',
            posts: [],
            tags: [
              { text: 'Male' },
              { text: 'Age: 29' },
              { text: '9/6/1993' },
              { text: 'Singer' },
              { text: 'Actor' },
              { text: 'Singing' },
              { text: 'Dancing' },
              { text: 'Acting' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Hong Kong' },
              { text: 'Driving lisence' },
              { text: '181 cm' },
              { text: '71 kg' },
              { text: 'Dark brown eye' },
              { text: 'Black hair Beige skin' },
              { text: 'Well-built body' },
              { text: 'Muscular body' },
              { text: 'Right-handed' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/RikChing-profile.jpg',
            name: 'Rik Ching 程仁富',
            title: 'Artist',
            posts: [],
            tags: [
              { text: 'Male' },
              { text: 'Age: 31' },
              { text: '25/6/1991' },
              { text: 'Actor' },
              { text: 'YouTuber' },
              { text: 'KOL' },
              { text: 'Singing' },
              { text: 'Acting' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Hong Kong' },
              { text: 'Dark brown eye' },
              { text: 'Black hair' },
              { text: 'Beige skin' },
              { text: 'Toned body' },
              { text: 'Muscular body' },
              { text: 'Right-handed' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/AmyTang-profile.jpg',
            name: 'Amy Tang 鄧麗英',
            title: 'Artist',
            posts: [],
            tags: [
              { text: 'Female' },
              { text: ': 24' },
              { text: '4/12/1997' },
              { text: 'Actress' },
              { text: 'YouTuber' },
              { text: 'Singer' },
              { text: 'Singing' },
              { text: 'Acting' },
              { text: 'Guitar' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Japanese' },
              { text: 'Hong Kong' },
              { text: '148 cm' },
              { text: 'Dark brown eye' },
              { text: 'Black hair' },
              { text: 'Pale Ivory skin' },
              { text: 'Slight body' },
              { text: 'Petite body' },
              { text: 'Right-handed' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/SabrinaNg-profile.jpg',
            name: 'Sabrina Ng 吳冰',
            title: 'Artist',
            posts: [],
            tags: [
              { text: 'Female' },
              { text: 'Age: 25' },
              { text: '1/11/1996' },
              { text: 'Actress' },
              { text: 'YouTuber' },
              { text: 'Acting' },
              { text: 'Dancing' },
              { text: 'Ballet' },
              { text: 'Jazz' },
              { text: 'Folk Dance' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Hong Kong' },
              { text: 'Dark brown eye' },
              { text: 'Chocolate hair' },
              { text: 'Pale Ivory skin' },
              { text: 'Lean body' },
              { text: 'Slim body' },
              { text: 'Right-handed' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/TungTung-profile.jpg',
            name: '童童 蔡曉童',
            title: 'Artist',
            posts: [],
            tags: [
              { text: 'Female' },
              { text: 'Age: 23' },
              { text: '5/12/1998' },
              { text: 'Actress' },
              { text: 'YouTuber' },
              { text: 'Acting' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'French' },
              { text: 'Japanese' },
              { text: 'Hong Kong' },
              { text: '151 cm' },
              { text: 'Dark brown eye' },
              { text: 'Dark brown hair' },
              { text: 'Pale Ivory skin' },
              { text: 'Slight body' },
              { text: 'Petite body' },
              { text: 'Right-handed' },
            ],
          },
          {
            uri: 'https://kcplace.com/castfact/dummydata/TerranceLau-profile.jpg',
            name: 'Terrance Lau 劉俊謙',
            title: 'Actor',
            posts: [],
            tags: [
              { text: 'Male' },
              { text: 'Age: 33' },
              { text: '26/9/1988' },
              { text: 'Actor' },
              { text: 'Acting' },
              { text: 'Cantonese' },
              { text: 'English' },
              { text: 'Mandarin' },
              { text: 'Hong Kong' },
              { text: 'British National (Overseas)' },
              { text: '180 cm' },
              { text: 'Black eye' },
              { text: 'Black hair' },
              { text: 'Warm Ivory skin' },
              { text: 'Well-built body' },
              { text: 'Toned body' },
              { text: 'Right-handed' },
            ],
          },
        ].map((profile, profileId) => {
          return {
            ...profile,
            profileId: profileId.toString(),
            posts: profile.posts.map((post, postId) => {
              return {
                ...post,
                postId: postId.toString(),
              };
            }),
            tags: profile.tags.map((tag, tagId) => {
              return {
                ...tag,
                tagId: tagId.toString(),
              };
            }),
          };
        }),
      },
      {
        label: 'tags',
        data: [
          {
            label: 'Languages',
            data: [
              {
                text: 'Cantonese',
              },
              {
                text: 'Czech',
              },
              {
                text: 'English',
              },
              {
                text: 'Filipino',
              },
              {
                text: 'French',
              },
              {
                text: 'German',
              },
              {
                text: 'Japanese',
              },
              {
                text: 'Korean',
              },
              {
                text: 'Malay',
              },
              {
                text: 'Putonghua',
              },
              {
                text: 'Shanghainese',
              },
              {
                text: 'Taiwanese Hokkien',
              },
              {
                text: 'Thai',
              },
            ],
          },
          {
            label: 'Occupation',
            data: [
              {
                text: 'Actor',
              },
              {
                text: 'Actress',
              },
              {
                text: 'Arranger',
              },
              {
                text: 'Artist',
              },
              {
                text: 'Choreographer',
              },
              {
                text: 'Cinematographer',
              },
              {
                text: 'Composer',
              },
              {
                text: 'DJ',
              },
              {
                text: 'Dancer',
              },
              {
                text: 'Director',
              },
              {
                text: 'Fashion Designer',
              },
              {
                text: 'Film Producer',
              },
              {
                text: 'Host',
              },
              {
                text: 'Illustrator',
              },
              {
                text: 'Journalist',
              },
              {
                text: 'KOL',
              },
              {
                text: 'Lyricist',
              },
              {
                text: 'Model',
              },
              {
                text: 'Narrator',
              },
              {
                text: 'Photographer',
              },
              {
                text: 'Producer',
              },
              {
                text: 'Production Designer',
              },
              {
                text: 'Singer',
              },
              {
                text: 'Video Editor',
              },
              {
                text: 'Writer',
              },
              {
                text: 'YouTuber',
              },
            ],
          },
          {
            label: 'Gender',
            data: [
              {
                text: 'Agender',
              },
              {
                text: 'Androgyne',
              },
              {
                text: 'Female',
              },
              {
                text: 'Gender-Noconforming',
              },
              {
                text: 'Male',
              },
              {
                text: 'Non-Binary',
              },
              {
                text: 'Trans Female',
              },
              {
                text: 'Trans Male',
              },
            ],
          },
          {
            label: 'Eye Color',
            data: [
              {
                text: 'Albino',
                dotColor: '#d5898c',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Black',
                dotColor: '#393b41',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Blind',
                dotColor: '#b2cdd8',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Blue',
                dotColor: '#075e9b',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Brown',
                dotColor: '#8a3919',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Dark Brown',
                dotColor: '#552531',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Gold',
                dotColor: '#e3b551',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Green',
                dotColor: '#1c7e41',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Orange',
                dotColor: '#e76732',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Purple',
                dotColor: '#5e3697',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Red',
                dotColor: '#a92332',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'Teal',
                dotColor: '#1d8e95',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
              {
                text: 'White',
                dotColor: '#cdcbd2',
                leftAccessoryType: 'dot',
                suffix: 'Eye',
              },
            ],
          },
          {
            label: 'Hair Color',
            data: [
              {
                text: 'Ash blonde',
                dotColor: '#c1b2a2',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Black',
                dotColor: '#393b41',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Brown',
                dotColor: '#8a3919',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Dark Brown',
                dotColor: '#552531',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Dark Blonde',
                dotColor: '#5f4338',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Gold',
                dotColor: '#e3b551',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Light Blonde',
                dotColor: '#b79572',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Light Brown',
                dotColor: '#997658',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Lightest Yellow',
                dotColor: '#ffe69f',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Pink',
                dotColor: '#da475e',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
              {
                text: 'Red',
                dotColor: '#a92332',
                leftAccessoryType: 'dot',
                suffix: 'Hair',
              },
            ],
          },
          {
            label: 'Skin Color',
            data: [
              {
                text: 'Beige',
                dotColor: '#f2c280',
                leftAccessoryType: 'dot',
                suffix: 'Skin',
              },
              {
                text: 'Bronze',
                dotColor: '#733e17',
                leftAccessoryType: 'dot',
                suffix: 'Skin',
              },
              {
                text: 'Honey',
                dotColor: '#ce965e',
                leftAccessoryType: 'dot',
                suffix: 'Skin',
              },
              {
                text: 'Ivory',
                dotColor: '#fee3bf',
                leftAccessoryType: 'dot',
                suffix: 'Skin',
              },
              {
                text: 'Pale Ivory',
                dotColor: '#f7ddc4',
                leftAccessoryType: 'dot',
                suffix: 'Skin',
              },
              {
                text: 'Sand',
                dotColor: '#f8d998',
                leftAccessoryType: 'dot',
                suffix: 'Skin',
              },
              {
                text: 'Warm Ivory',
                dotColor: '#f8e7c9',
                leftAccessoryType: 'dot',
                suffix: 'Skin',
              },
            ],
          },
          {
            label: 'Body Type',
            data: [
              {
                text: 'Apple',
              },
              {
                text: 'Athletic',
              },
              {
                text: 'Average',
              },
              {
                text: 'Heavy',
              },
              {
                text: 'Hourglass',
              },
              {
                text: 'Inverted Triangle',
              },
              {
                text: 'Lean',
              },
              {
                text: 'Muscular',
              },
              {
                text: 'Pear',
              },
              {
                text: 'Rectangle',
              },
              {
                text: 'Thin',
              },
            ],
          },
          {
            label: 'Nationality',
            data: [
              {
                text: 'Australia',
              },
              {
                text: 'British National (Overseas)',
              },
              {
                text: 'Canada',
              },
              {
                text: 'China',
              },
              {
                text: 'Hong Kong',
              },
              {
                text: 'Indonesia',
              },
              {
                text: 'Macau',
              },
              {
                text: 'Malaysia',
              },
              {
                text: 'New Zealand',
              },
              {
                text: 'Philippines',
              },
              {
                text: 'Portugal',
              },
              {
                text: 'Spain',
              },
              {
                text: 'Taiwan',
              },
              {
                text: 'United Kingdom',
              },
              {
                text: 'United States',
              },
            ],
          },
        ].map((groupFrame, groupFrameId) => {
          return {
            groupFrameId: groupFrameId.toString(),
            label: groupFrame.label,
            data: groupFrame.data.map((tag, tagId) => {
              return {
                ...tag,
                tagId: tagId.toString(),
              };
            }),
          };
        }),
      },
    ]);

    // props.setCriteriaTags([
    //   {
    //     groupFrameId: '0',
    //     data: [
    //       {
    //         tagId: '0',
    //         text: 'Male',
    //         rightAccessoryType: 'delete',
    //       },
    //       {
    //         tagId: '1',
    //         text: 'Blue Eye',
    //         dotColor: Theme.colors.dot.blue,
    //         leftAccessoryType: 'dot',
    //         rightAccessoryType: 'delete',
    //       },
    //     ]
    //   },
    // ]);

    // props.setRecentSearchesTags([
    //   {
    //     groupFrameId: '0',
    //     data: [
    //       {
    //         tagId: '0',
    //         text: 'Muscular',
    //       },
    //       {
    //         tagId: '1',
    //         text: 'Black Hair',
    //         dotColor: Theme.colors.dot.black,
    //         leftAccessoryType: 'dot',
    //       },
    //     ]
    //   },
    //   {
    //     groupFrameId: '1',
    //     data: [
    //       {
    //         tagId: '0',
    //         text: 'Female',
    //       },
    //       {
    //         tagId: '1',
    //         text: 'Red Eye',
    //         dotColor: Theme.colors.dot.red,
    //         leftAccessoryType: 'dot',
    //       },
    //       {
    //         tagId: '2',
    //         text: '~165CM',
    //       },
    //       {
    //         tagId: '3',
    //         text: 'Film',
    //       },
    //       {
    //         tagId: '4',
    //         text: 'Korean',
    //       },
    //     ],
    //   },
    // ]);

    // props.setFindTalentTags([
    //   {
    //     groupFrameId: '0',
    //     label: 'Gender',
    //     data: [
    //       {
    //         tagId: '0',
    //         text: 'Female',
    //       },
    //       {
    //         tagId: '1',
    //         text: 'Gender-Noconforming',
    //       },
    //       {
    //         tagId: '2',
    //         text: 'Non-Binary',
    //       },
    //       {
    //         tagId: '3',
    //         text: 'Trans Female',
    //       },
    //       {
    //         tagId: '4',
    //         text: 'Agender',
    //       },
    //       {
    //         tagId: '5',
    //         text: 'Androgyne',
    //       },
    //     ]
    //   },
    //   {
    //     groupFrameId: '1',
    //     label: 'Language',
    //     data: [
    //       {
    //         tagId: '0',
    //         text: 'Chinese',
    //       },
    //       {
    //         tagId: '1',
    //         text: 'English',
    //       },
    //       {
    //         tagId: '2',
    //         text: 'Cantonese',
    //       },
    //       {
    //         tagId: '3',
    //         text: 'Mandarin',
    //       },
    //       {
    //         tagId: '4',
    //         text: 'Korean',
    //       },
    //       {
    //         tagId: '5',
    //         text: 'Japanese',
    //       },
    //     ],
    //   },
    //   {
    //     groupFrameId: '2',
    //     label: 'Eye Color',
    //     data: [
    //       {
    //         tagId: '0',
    //         text: 'Amber',
    //         dotColor: Theme.colors.dot.amber,
    //         leftAccessoryType: 'dot',
    //       },
    //       {
    //         tagId: '1',
    //         text: 'Black',
    //         dotColor: Theme.colors.dot.black,
    //         leftAccessoryType: 'dot',
    //       },
    //       {
    //         tagId: '2',
    //         text: 'Blue',
    //         dotColor: Theme.colors.dot.blue,
    //         leftAccessoryType: 'dot',
    //       },
    //       {
    //         tagId: '3',
    //         text: 'Brown',
    //         dotColor: Theme.colors.dot.brown,
    //         leftAccessoryType: 'dot',
    //       },
    //       {
    //         tagId: '4',
    //         text: 'Gray',
    //         dotColor: Theme.colors.dot.gray,
    //         leftAccessoryType: 'dot',
    //       },
    //       {
    //         tagId: '5',
    //         text: 'Green',
    //         dotColor: Theme.colors.dot.green,
    //         leftAccessoryType: 'dot',
    //       },
    //       {
    //         tagId: '6',
    //         text: 'Hazel',
    //         dotColor: Theme.colors.dot.hazel,
    //         leftAccessoryType: 'dot',
    //       },
    //       {
    //         tagId: '7',
    //         text: 'Red',
    //         dotColor: Theme.colors.dot.red,
    //         leftAccessoryType: 'dot',
    //       },
    //     ],
    //   },
    //   {
    //     groupFrameId: '3',
    //     label: 'Height',
    //     rightAccessoryType: 'check',
    //     checked: false,
    //     data: [
    //       {
    //         tagId: '0',
    //         type: 'input',
    //         value: '170',
    //         text: 'CM',
    //         maxLength: '3',
    //         regex: '[1-9][0-9]{0,2}',
    //         keyboardType: "number-pad",
    //       },
    //       {
    //         tagId: '1',
    //         text: 'Deviation',
    //         leftAccessoryType: 'check',
    //         checked: false,
    //       },
    //     ],
    //   },
    //   {
    //     groupFrameId: '4',
    //     label: 'Age',
    //     rightAccessoryType: 'check',
    //     checked: false,
    //     data: [
    //       {
    //         tagId: '0',
    //         type: 'range',
    //         fromValue: '18',
    //         toValue: '25',
    //         regexOfFromValue: '[1-9][0-9]{0,1}',
    //         regexOfToValue: '[1-9][0-9]{0,1}',
    //         maxLengthOfFromValue: '2',
    //         maxLengthOfToValue: '2',
    //       },
    //     ],
    //   },
    // ]);

    Router.route(props, 'Login');
  };

  clearData = () => {
    const { props } = this;
  };

  renderHeader = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Header style={styles.header} />
        )}
      </Translation>
    );
  };

  renderBody = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Body style={styles.body} />
        )}
      </Translation>
    );
  };

  renderFooter = () => {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Footer style={styles.footer} />
        )}
      </Translation>
    );
  };

  render() {
    const { props } = this;

    return (
      <Translation>
        {(t) => (
          <Root
            style={styles.root}
            source={ic_splash_screen_bg}>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderFooter()}
          </Root>
        )}
      </Translation>
    );
  }
}

const styles = StyleSheet.create({
  root: {},
  header: {},
  body: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footer: {
    // backgroundColor: 'cyan',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    selectDrawer: (...args) => dispatch(DrawerAction.select(...args)),
    selectTab: (...args) => dispatch(MainTabAction.select(...args)),
    setDummyData: (...args) => dispatch(DataAction.setDummyData(...args)),
    setCriteriaTags: (...args) => dispatch(CriteriaSectionAction.setTags(...args)),
    setRecentSearchesTags: (...args) => dispatch(RecentSearchesSectionAction.setTags(...args)),
    setFindTalentTags: (...args) => dispatch(FindTalentSectionAction.setTags(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchView);
