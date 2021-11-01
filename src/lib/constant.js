import { BASE_PATH } from "../config/settings";

export default class Constants {
  static ACTIVE_STATUS = 1;
  static ACTIVE_USER = "Active";
  static PENDING_USER = "Pending";

  static PURCHASE_TYPE_SUBSCRIPTION = 1;
  static PURCHASE_TYPE_IAP = 2;

  static TRANSACTION_STATUS = 1;

  static BLOCKED_STATUS = 11;

  static CONTENT_ACTIVE = 1;
  static CONTENT_BLOCKED = 2;
  static CONTENT_DELETED = 5;

  static CHIPS_ADDING = 1;
  static CHIPS_REMOVING = 2;

  static XP_ADDING = 1;
  static XP_REMOVING = 2;

  static SUBSCRIPTION_ENABLE = 1;
  static SUBSCRIPTION_DISABLE = 2;

  static DEFAULT_PROFILE = `${BASE_PATH}/default-profile-pic.png`;

  static ACTIVE_SUBSCRIPTION = 1;
  static ACTIVE_SUBSCRIPTION_TXT = 'Active';

  static ANALYTICS_TYPE_1 = 1;
  static ANALYTICS_TYPE_2 = 2;
  static ANALYTICS_TYPE_3 = 3;
  static ANALYTICS_TYPE_4 = 4;
  static ANALYTICS_TYPE_5 = 5;
  static ANALYTICS_TYPE_6 = 6;

  static LANGUAGE_ENGLISH = 0;
  static LANGUAGE_HINDI = 1;
  static LANGUAGE_BANGLA = 2;

  static TOTAL_REAL_PLAYER_COUNT = 4;

}