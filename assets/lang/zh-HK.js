/* eslint-disable prettier/prettier */

const zhHK = {
  app: {
    login: '登入',
    sign_up: 'Sign Up',
    criteria: 'Criteria',
    recent_searches: 'Recent Searches',
    based_on_projects_format: 'Based On Project {0}',
    feed: 'Feed',
    follow: 'Follow',
    find_talent: 'Find Talent',
    error: {
      empty_field_message: '請輸入所需資料。',
      password_validation_message: '密碼必須是由8-14個字的字母及數字所組成。',
    },
  },
  components: {

  },
  views: {
    login: {
      email_label: '電郵地址',
      password_label: '密碼',
      create_account_hint: 'New user?',
      create_account: 'Create Account',
    },
    sign_up: {
      name_label: 'Name',
      email_label: 'Email',
      phone_label: 'Phone',
      password_label: 'Password',
    },
    feed: {
      header: 'Cast Fact',
    },
    search: {
      header: 'Search',
    },
    search_result: {
      header: 'Results',
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
