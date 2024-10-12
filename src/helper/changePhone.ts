export const p2e = (s: string) =>
  s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());

export const getIrPhone = (phone: string): string | null => {
  const irPhoneRegex = /^(\+989|00989|989|9|09)\d{9}$/;

  if (!irPhoneRegex.test(phone)) {
    return null;
  }

  if (phone.match(/^09\d{9}$/)) {
    return phone;
  }

  if (phone.match(/^(\+989)\d{9}$/)) {
    return '0' + phone.substr(3);
  }
  if (phone.match(/^00989\d{9}$/)) {
    return '0' + phone.substr(4);
  }

  if (phone.match(/^989\d{9}$/)) {
    return '0' + phone.substr(2);
  }

  if (phone.match(/^9\d{9}$/)) {
    return '0' + phone;
  }
};
