/* eslint-disable prettier/prettier */

const zhHK = {
  app: {
    login: '登入',
    criteria: 'Criteria',
    recent_searches: 'Recent Searches',
    based_on_projects_format: 'Based On Project {0}',
    feed: 'Feed',
    follow: 'Follow',
    error: {
      empty_field_message: '請輸入所需資料。',
      password_validation_message: '密碼必須是由8-14個字的字母及數字所組成。',
    },
  },
  components: {

  },
  views: {
    login: {
      login_id_label: '登入名稱',
      password_label: '密碼',
      create_account_hint: 'New user?',
      create_account: 'Create Account',
    },
    feed: {
      header: 'Cast Fact',
    },
  },
  providers: {
    auth: {
      logging_in: '正在登入',
      logging_out: '正在登出',
    },
  },
};

export default zhHK;

/* eslint-enable prettier/prettier */
