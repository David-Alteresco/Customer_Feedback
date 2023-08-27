const form = {
  self: "#feedback-form",
  author: {
    inputType: "#feedback-form > mat-form-field  input",
  },
  comment: {
    input: "#comment",
  },
  rating: {
    self: "#feedback-form #rating",
  },
  captcha: {
    self: "#captcha",
    input: "#captchaControl",
  },
  submit: {
    self: "#submitButton",
  },
};

export { form };
