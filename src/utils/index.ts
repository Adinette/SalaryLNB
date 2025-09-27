import { appLogger } from "../utils/logger";
import { hexToRgba } from "../utils/hex_to_rgba";
import { numberFormatter } from "../utils/number_formatter";
import { toast } from "../utils/toast";
import { showAlert } from "./show_alert";
import { registerPlugins } from "./plugins";
import { formatPhoneWithSpaces, removeWhitespace } from "./remove_white_space";
import { i18n } from "../plugins/4.i18n";

export class AppUtils {
  static logger = appLogger;
  static convertHexToRgba = hexToRgba;
  static formatNumber = numberFormatter;
  static removeWhitespace = removeWhitespace;
  static formatPhoneWithSpaces = formatPhoneWithSpaces;
  static toast = toast;
  static showAlert = showAlert;
  static registerPlugins = registerPlugins;
  static translate = i18n.global.t;
}
