// @flow
/* eslint flowtype/no-weak-types: 0 */
import get from 'lodash/get';
import User from '../actions/User';

export type UserStore = {
  registrationStatus: null | string,
  loginStatus: null | string,
  profileUpdateStatus: null | string,
  passwordUpdateStatus: null | string,
  userPasswordUpdateStatus: null | string,
  emailExistsStatus: null | string,
  loginAttempted: boolean,
  user: {
    id: string | number,
    firstName?: string,
    lastName?: string,
    email: string
  },
  isAuth: boolean,
  isProfileUpdated: boolean,
  isPasswordUpdated: boolean,
  ccLastFour: string,
  hasEmail: boolean,
  isUserPasswordUpdated: boolean,
  isSubscriptionCancelled: boolean,
}

export type UserAction = {
  type: string,
  payload: any
}

const initialState: UserStore = {
  registrationStatus: null,
  loginStatus: null,
  profileUpdateStatus: null,
  passwordUpdateStatus: null,
  userPasswordUpdateStatus: null,
  emailExistsStatus: null,
  loginAttempted: false,
  user: {
    id: '',
    email: '',
  },
  isAuth: false,
  isProfileUpdated: false,
  isPasswordUpdated: false,
  isUserPasswordUpdated: false,
  ccLastFour: '',
  hasEmail: false,
  isSubscriptionCancelled: false,
};

function userAuth(state: UserStore = initialState, action: UserAction): UserStore {
  switch (action.type) {
    case User.REGISTER_TRIGGERED: {
      return {
        ...state,
        registrationStatus: 'pending',
      };
    }
    case User.REGISTER_SUCCESS: {
      return {
        ...state,
        registrationStatus: null,
        user: { ...action.payload.data.data.user },
        loginAttempted: true,
        isAuth: true,
      };
    }
    case User.REGISTER_FAILED: {
      return {
        ...state,
        registrationStatus: 'failed',
      };
    }
    case User.LOGIN_TRIGGERED: {
      return {
        ...state,
        loginStatus: 'pending',
        loginAttempted: false,
      };
    }
    case User.LOGIN_SUCCESS: {
      return {
        ...state,
        loginStatus: null,
        loginAttempted: true,
        user: { ...action.payload.data.data },
        isAuth: true,
      };
    }
    case User.LOGIN_FAILED: {
      return {
        ...state,
        loginStatus: 'failed',
        loginAttempted: true,
      };
    }
    case User.PROFILE_UPDATE_TRIGGERED: {
      return {
        ...state,
        profileUpdateStatus: 'pending',
        isProfileUpdated: false,
      };
    }
    case User.PROFILE_UPDATE_SUCCESS: {
      return {
        ...state,
        profileUpdateStatus: null,
        user: action.payload.data.data,
        isProfileUpdated: true,
      };
    }
    case User.PROFILE_UPDATE_FAILED: {
      return {
        ...state,
        profileUpdateStatus: 'failed',
      };
    }
    case User.PASSWORD_UPDATE_TRIGGERED: {
      return {
        ...state,
        passwordUpdateStatus: 'pending',
        isPasswordUpdated: false,
      };
    }
    case User.PASSWORD_UPDATE_SUCCESS: {
      return {
        ...state,
        passwordUpdateStatus: null,
        isPasswordUpdated: true,
      };
    }
    case User.PASSWORD_UPDATE_FAILED: {
      return {
        ...state,
        passwordUpdateStatus: 'failed',
        isPasswordUpdated: false,
      };
    }
    case User.STRIPE_GET_SUCCESS: {
      return {
        ...state,
        ccLastFour: get(action, 'payload.data.data[0].last4'),
      };
    }
    case User.FORGOT_PASSWORD_PENDING: {
      return {
        ...state,
        emailExistsStatus: 'pending',
        hasEmail: false,
      };
    }
    case User.FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        emailExistsStatus: null,
        hasEmail: true,
      };
    }
    case User.FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        emailExistsStatus: 'failed',
        hasEmail: false,
      };
    }
    case User.FORGOT_PASSWORD_RESET: {
      return {
        ...state,
        emailExistsStatus: null,
        hasEmail: false,
      };
    }
    case User.UPDATE_PASSWORD_PENDING: {
      return {
        ...state,
        userPasswordUpdateStatus: 'pending',
        isUserPasswordUpdated: false,
      };
    }
    case User.UPDATE_PASSWORD_ERROR: {
      return {
        ...state,
        userPasswordUpdateStatus: null,
        isUserPasswordUpdated: false,
      };
    }
    case User.UPDATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        userPasswordUpdateStatus: 'failed',
        isUserPasswordUpdated: true,
      };
    }
    case User.CANCEL_SUBSCRIPTION_TRIGGERED: {
      return {
        ...state,
        isSubscriptionCancelled: false,
      };
    }
    case User.CANCEL_SUBSCRIPTION_ERROR: {
      return {
        ...state,
        isSubscriptionCancelled: false,
      };
    }
    case User.CANCEL_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        isSubscriptionCancelled: true,
      };
    }
    case User.LOGOUT: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
}

export default userAuth;
