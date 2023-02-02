/* eslint-disable prettier/prettier */

const zhHK = {
  app: {
    loading: '加載中',
    login: '登入',
    forgotPassword: '忘記密碼',
    create_account: 'Create Account',
    sign_up: 'Sign Up',
    criteria: 'Criteria',
    recent_searches: 'Recent Searches',
    based_on_projects_format: 'Based On Project {0}',
    feed: 'Feed',
    my_projects: 'My Projects',
    my_events: 'My Events',
    name: 'Name',
    duration: 'Duration',
    location: 'Location',
    type: 'Type',
    notes: 'Notes',
    overview: 'Overview',
    availability: 'Availability',
    next: "Next",
    create: "Create",
    follow: 'Follow',
    followed: 'Followed',
    find_talent: 'Find Talent',
    no_post_yet: 'No Post Yet',
    no_result: 'No Result',
    no_result_description: 'Try to refine the search criteria.',
    error: {
      empty_field_message: '請輸入所需資料。',
      password_validation_message: '密碼必須是由8或以上的字母及數字所組成。',
    },
  },
  components: {
    feed_list: {
      view_more: '查看更多',
    }
  },
  views: {
    welcome: {
      login_hint: 'Existing user?',
    },
    login: {
      email_label: '電郵地址',
      password_label: '密碼',
      create_account_hint: 'New user?',
      create_account: 'Create Account',
    },
    sign_up: {
      firstname_en_label: 'First Name',
      lastname_en_label: 'Last Name',
      firstname_zh_label: '中文名字',
      lastname_zh_label: '中文姓氏',
      email_label: 'Email',
      phone_label: 'Phone',
      password_label: 'Password',
    },
    feed: {
      header: 'Cast Fact',
    },
    search: {
      header: 'Cast Fact',
      result_format: 'More than {0} results.',
    },
    search_result: {
      header: 'Results',
    },
    inbox: {
      header: 'Inbox',
    },
    project: {
      header: 'Projects',
    },
    create_project: {
      title: 'Create Project',
      project_information: 'Project Information',
      my_availability: 'My Availability',
      visibility_on_profile: 'Visibility On Profile',
      visible_on_profile: 'Visiable On Profile',
    },
    account: {
      header: 'Account',
    },
    profile: {
      header: 'Profile',
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
