import ajv from 'ajv';

export default new ajv({
  allErrors: true,
  removeAdditional: true,
});
