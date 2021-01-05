// Get host details of micro service apps
export const HOST = () => {
  const ENV = process.env.ENV;
  let IDENTITY: any;
  if (ENV === 'localhost') {
    IDENTITY = process.env.IDENTITY_SERVICE_DEV;
  } else {
    IDENTITY = process.env.IDENTITY_SERVICE_LIVE;
  }
  return {
    IDENTITY,
  };
};

// SETUP Identity Service Routes
export const IDENTITY = {
  // Authentication Resources
  PROVIDER_LOGIN: 'identity/login/email',
  STUDENT_LOGIN: 'identity/login/mobile',
  AUTHORIZE_USER: 'private/authorize',
  GENERATE_CUSTOM_TOKEN: 'private/custom/token',
  GET_ALL_CLAIMS: `private/claim`,
  PRIVATE_LOGIN: (userId: number) => `private/user/${userId}/login`,
  LOGOUT: 'identity/logout',
  LOGOUT_ALL: (userId: number | string) => `/private/user/${userId}/logout/all`,

  // User Resources
  CREATE_USER: 'identity/user',
  CREATE_BULK_USER: '/identity/bulk/user',
  GET_PROVIDER: (appId: number, email: string) => `identity/user/app/${appId}/email/${email}`,
  GET_STUDENT: (appId: number, dialCodeId: number, mobile: number) =>
    `identity/user/app/${appId}/mobile/${dialCodeId}/${mobile}`,
  DELETE_USER: (userId: number) => `identity/user/${userId}`,
  VERIFY_PROVIDER: (userId: number, verify: boolean) => `identity/user/${userId}/email/verify/${verify}`,
  VERIFY_STUDENT: (userId: number, verify: boolean) => `identity/user/${userId}/mobile/verify/${verify}`,
  ACTIVATE_USER: (userId: number | string, active: boolean) => `identity/toggle/user/${userId}/active/${active}`,
  UPDATE_CONTACT: (userId: number) => `identity/user/${userId}/mobile`,

  // Role Resources
  REPLACE_PROVIDER_ROLE: (userId: number | string, providerId: number, roleId: number) =>
    `private/user/${userId}/provider/${providerId}/role/${roleId}/replace`,

  // Credential Resources
  RESET_PASSWORD: (userId: number) => `private/user/${userId}/reset/password`,
  CHANGE_PASSWORD: `identity/user/password`,
};
