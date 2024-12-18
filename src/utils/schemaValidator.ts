import Ajv, { ErrorObject } from 'ajv';

function validateSchema(Schema: object, responseBidy: object) {
    const ajv = new Ajv( {strictTuples: false });
    const validate = ajv.complice(Schema);
    const valid = validate(responseBidy);
    if(!valid) {
        console.log(`Validation errors: \n`, formatAjvErrors(validate.errors));
    };
    expect(valid).toBe(true);
};

function formatAjvErrors(errors: ErrorObject[] | null | undefined): string {
    if(!errors) return '';
    return errors
        .map((error) => {
            return`Error in property ${error.instancePath}: ${error.message}`;
        })
        .join('\n');
}

export{ validateSchema };