import { useEffect } from "react";
import { Amplify } from "aws-amplify";
import { Hub } from "aws-amplify/utils";
import { fetchAuthSession } from "aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router";
import { getLocal, getStore, setLocal, setStore } from "./storage";
import {
  AuthState,
  LoginState,
  State,
  loggedInKey,
  lastLoginKey,
} from "app/utils/constants";
import idleTimeout from "idle-timeout";
import moment from "moment";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.REACT_APP_USERPOOL_ID,
      userPoolClientId: process.env.REACT_APP_CLIENT_ID,
    },
  },
});

export const isState = (checkState) => {
  return window.location.pathname === checkState;
};

export const setState = (toState) => {
  window.location = toState;
};

const isLoggedIn = async () => {
  return new Promise((resolve) => {
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      if (count > 100) {
        clearInterval(interval);
        resolve(false);
      }
      if (getStore(loggedInKey)) {
        resolve(true);
        clearInterval(interval);
      }
    }, 100);
  });
};

export const getToken = async () => {
  return fetchAuthSession();
};

export const getUserDetails = async () => {
  await isLoggedIn();
  const session = await getToken();
  const {
    tokens: { idToken: idObject, accessToken: accessObj },
  } = session;
  const accessToken = accessObj.toString();
  const idToken = idObject.toString();
  const {
    family_name: lastName,
    given_name: firstName,
    email,
    ["cognito:username"]: userName,
    ["custom:userBid"]: userBid,
  } = idObject?.payload || {};
  return {
    lastName,
    firstName,
    email,
    userName,
    userBid,
    accessToken,
    idToken,
  };
};

export const authGuard = () => {
  const { user, signOut, authStatus } = useAuthenticator((context) => [
    context.user,
    context.authStatus,
  ]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authStatus || authStatus === AuthState.configuring) {
      return;
    }
    if (authStatus !== AuthState.authenticated) {
      navigate(State.login);
    }
    if (authStatus === AuthState.authenticated) {
      setStore(loggedInKey, true);
    }
    if (isState(State.login) && authStatus === AuthState.authenticated) {
      navigate(State.home);
    }
  }, [authStatus]);
  return { user, signOut, authStatus };
};

const checkTimeout = (signOut, instance) => {
  const timeout = process.env.REACT_APP_TIMEOUT;
  const lastLoginStr = getLocal(lastLoginKey);
  if (!lastLoginStr) {
    return;
  }
  const lastLogin = moment(lastLoginStr);
  const timeoutDate = moment().subtract(timeout, "minutes");
  if (typeof signOut === "function" && lastLogin.isBefore(timeoutDate)) {
    if (instance) {
      clearInterval(instance);
    }
    signOut();
  }
};

export const applyTimeout = () => {
  const { signOut } = useAuthenticator();

  useEffect(() => {
    const instance = idleTimeout(
      (element) => {
        signOut();
      },
      {
        element: document,
        timeout: 15 * 1000 * 60,
        loop: false,
      }
    );

    const lastLogin = getLocal(lastLoginKey);
    if (!lastLogin) {
      setLocal(lastLoginKey, moment().toISOString());
    }

    const runningInstance = setInterval(() => {
      checkTimeout(signOut, runningInstance);
    }, 500);

    return () => {
      clearInterval(runningInstance);
      clearInterval(instance);
    };
  }, []);
};

const LoginListener = (data) => {
  switch (data.payload.event) {
    case LoginState.signedIn:
    case LoginState.signIn:
      setState(State.admin);
      setStore(loggedInKey, true);
      setLocal(lastLoginKey, moment().toISOString());
      break;
    case LoginState.signInFailure:
    case LoginState.signedOut:
    case LoginState.signOut:
      setStore(loggedInKey, false);
      setLocal(lastLoginKey, null);
      break;
    default:
      console.error("Something went wrong", data);
  }
};

Hub.listen("auth", LoginListener);
