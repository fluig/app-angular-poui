abstract class AppSettings {

  public static APP_ROOT = window['_app_baseUrl'];
  public static APP_PAGE_CODE = window['_app_pageCode'];

  /**
   * base url + application prefix
   */
  public static APP_BASE = AppSettings.APP_ROOT + '/' + AppSettings.APP_PAGE_CODE;
}

export { AppSettings as APP_CONFIG };
