export const AuthState = {
  authenticated: "authenticated",
  configuring: "configuring",
};

export const LoginState = {
  signedIn: "signedIn",
  signIn: "signIn",
  signInFailure: "signIn_failure",
  signedOut: "signedOut",
  signOut: "signOut",
};

export const State = {
  home: "/home",
  login: "/admin/login",
  admin: "/admin",
};

export const loggedInKey = "loggedIn";
export const lastLoginKey = "lastLogin";

export const genres = {
  genres: [
    {
      id: "blogs",
      title: "Writings",
      map: "nonFict",
      order: 1,
    },
    {
      id: "poetry",
      title: "Rhymings",
      map: "poetry",
      order: 2,
    },
  ],
  nonFict: "blogs",
  poetry: "poetry",
};

export const published = {
  none: false,
};

export const keyOrder = {
  name: 1,
  title: 2,
  description: 3,
  content: 8,
  by: 4,
  date: 5,
  published: 0,
  genre: 6,
  image: 7,
};
