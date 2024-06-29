/**
 * Mapping of error codes to error messages and HTTP status codes.
 *
 * @type {Object}
 */
const errorMapping = {
    CodeDeliveryFailureException: { message: 'Code delivery failed', status: 400 },
    ForbiddenException: { message: 'Request forbidden by web ACL', status: 400 },
    InternalErrorException: { message: 'Internal server error', status: 500 },
    InvalidEmailRoleAccessPolicyException: { message: 'Invalid email role access policy', status: 400 },
    InvalidLambdaResponseException: { message: 'Invalid Lambda response', status: 400 },
    InvalidParameterException: { message: 'Invalid parameters', status: 400 },
    InvalidPasswordException: {
        message: 'Invalid password. Password must have uppercase, lowercase, number and special character with minimum length of 8 characters',
        status: 400
    },
    InvalidSmsRoleAccessPolicyException: { message: 'Invalid SMS role access policy', status: 400 },
    InvalidSmsRoleTrustRelationshipException: { message: 'Invalid SMS role trust relationship', status: 400 },
    LimitExceededException: { message: 'Resource limit exceeded', status: 400 },
    NotAuthorizedException: { message: 'Not authorized', status: 400 },
    ResourceNotFoundException: { message: 'Resource not found', status: 400 },
    TooManyRequestsException: { message: 'Too many requests', status: 400 },
    UnexpectedLambdaException: { message: 'Unexpected Lambda exception', status: 400 },
    UserLambdaValidationException: { message: 'User validation exception', status: 400 },
    UsernameExistsException: { message: 'User already exists', status: 400 },
    default: { message: 'Unknown error', status: 500 }
};

const handleError = (err) => {
    return errorMapping[err.name] || errorMapping.default;
};

module.exports = handleError;
