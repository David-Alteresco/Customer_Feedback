const form = {
  self: "#feedback-form",
  author: {
    inputType: "#feedback-form > mat-form-field input",
    disableTextField: "#feedback-form mat-form-field:nth-child(2) input"
  },
  comment: {
    input: "#comment",
  },
  rating: {
    self: "#rating",
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
