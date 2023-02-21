export class StringUtils {
  static formatNumber = (val: number) => {
    return new Intl.NumberFormat().format(val);
  };

  static formatAvatarNotSocial = (str: string) => {
    let avatar: string;
    if (str.includes("http") || str.includes("https")) avatar = str;
    else avatar = `http://localhost:3000/img/users/${str}`;

    return avatar;
  };
}
