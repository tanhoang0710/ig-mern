export class StringUtils {
  static formatNumber = (val: number) => {
    return new Intl.NumberFormat().format(val);
  };
}
