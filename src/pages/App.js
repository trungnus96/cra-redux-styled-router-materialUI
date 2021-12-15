import React, { Component, useEffect } from "react";

import Button from "@material-ui/core/Button";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
const env = {
  REACT_APP_FIREBASE_APPID: "1:983043845801:web:27358f73eb679f474003b8",
  REACT_APP_VERCEL_ORG_ID: "team_BsC0XBztx8i1Zkn3aBd2pD5l",
  REACT_APP_VERCEL_GIT_COMMIT_SHA: "6610fdc751dbb65b3bdd5a147881697c7099f04c",
  REACT_APP_VERCEL_URL:
    "loot-explorers-frontend-3yhdbo7to-lootexplorers.vercel.app",
  REACT_APP_ENV: "production",
  REACT_APP_VERCEL_ENV: "production",
  REACT_APP_FIREBASE_AUTHDOMAIN: "lootexplorers-feff0.firebaseapp.com",
  REACT_APP_VERCEL_GIT_COMMIT_AUTHOR_LOGIN: "cjinghong",
  REACT_APP_VERCEL_GIT_PROVIDER: "github",
  REACT_APP_VERCEL_PROJECT_ID: "prj_2uMHMrj34xmOfPHzxmQcjjQWY6NU",
  REACT_APP_MAINNET_URI:
    "https://mainnet.infura.io/v3/4c9a458399ae41599b7295a08eee0798",
  REACT_APP_VERCEL_GIT_COMMIT_AUTHOR_NAME: "Chan Jing Hong",
  REACT_APP_ENCRYPTION_KEY: "Earl does not exist",
  REACT_APP_FIREBASE_MESSAGINGSENDERID: "983043845801",
  REACT_APP_VERCEL_GIT_REPO_OWNER: "cjinghong",
  REACT_APP_VERCEL_GIT_REPO_SLUG: "loot-explorers-frontend",
  REACT_APP_TESTNET_URI:
    "https://rinkeby.infura.io/v3/4c9a458399ae41599b7295a08eee0798",
  REACT_APP_FIREBASE_STORAGEBUCKET: "lootexplorers-feff0.appspot.com",
  REACT_APP_FIREBASE_APIKEY: "AIzaSyBj98OrNx3LCYVDh9tWBZ54IMQ5VaAocjE",
  REACT_APP_VERCEL_GIT_COMMIT_MESSAGE: "updated puzzle key",
  REACT_APP_VERCEL_ARTIFACTS_TOKEN:
    "artifacts:eyJkZXBsb3ltZW50SWQiOiJkcGxfRW9VQ1Y3eTh2REtORmVIYWFrYlBLRm1ab1VHTSIsIm93bmVySWQiOiJ0ZWFtX0JzQzBYQnp0eDhpMVprbjNhQmQycEQ1bCIsInRpY2tldCI6ImdxRjB6UWNJb1dPUzJTQmtjR3hmUlc5VlExWTNlVGgyUkV0T1JtVklZV0ZyWWxCTFJtMWFiMVZIVGExQlVFbGZRVkpVU1VaQlExUlRHQU1hOUtVVG5vZ0NEN2N0RVgrdmtVMHRlUEk9In0=",
  REACT_APP_FIREBASE_PROJECTID: "lootexplorers-feff0",
  REACT_APP_VERCEL_GIT_REPO_ID: "407426434",
  REACT_APP_VERCEL_ARTIFACTS_OWNER: "team_BsC0XBztx8i1Zkn3aBd2pD5l",
  REACT_APP_VERCEL_GIT_COMMIT_REF: "master",
};

const {
  REACT_APP_FIREBASE_APIKEY,
  REACT_APP_FIREBASE_AUTHDOMAIN,
  REACT_APP_FIREBASE_PROJECTID,
  REACT_APP_FIREBASE_STORAGEBUCKET,
  REACT_APP_FIREBASE_MESSAGINGSENDERID,
  REACT_APP_FIREBASE_APPID,
} = env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_APIKEY,
  authDomain: REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECTID,
  storageBucket: REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: REACT_APP_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

function App() {
  // Auto sign-in, retrieve config
  useEffect(() => {
    signInAnonymously(auth).catch((error) => {
      console.log(error);
    });
  }, []);

  const onClick = () => {
    console.log(123);

    completePuzzle();
  };

  const completePuzzle = async () => {
    // Update firestore
    const db = getFirestore(app);

    // get all puzzle discord
    onSnapshot(collection(db, "puzzle1"), (snap) => {
      snap.forEach((doc) => {
        console.log(doc.data());
      });
    });

    // await deleteDoc(doc(db, "puzzle1/myko#0364"));

    // update
    // const docRef = doc(db, `puzzle1/Huyen Cutie#8667`);
    // setDoc(docRef, {
    //   date: new Date(1639602655000),
    //   discord: `Huyen Cutie#8667`,
    //   puzzle: "beast,storm,psychic,storm",
    // });
  };

  return (
    <div>
      <h2>Hello world!</h2>
      <Button variant="contained" color="primary" onClick={onClick}>
        Default
      </Button>
    </div>
  );
}

export default App;
