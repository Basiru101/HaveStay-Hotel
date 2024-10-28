// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   currentUser: null,
//   error: null,
//   loading: false,
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     signInStart: (state) => {
//       state.loading = true;
//     },
//     signInSuccess: (state, action) => {
//       state.currentUser = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     signInFailure: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     updateUserStart: (state) => {
//       state.loading = true;
//     },
//     updateUserSuccess: (state, action) => {
//       state.currentUser = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     updateUserFailure: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     deleteUserStart: (state) => {
//       state.loading = true;
//     },
//     deleteUserSuccess: (state) => {
//       state.currentUser = null;
//       state.loading = false;
//       state.error = null;
//     },
//     deleteUserFailure: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     signOutUserStart: (state) => {
//       state.loading = true;
//     },
//     signOutUserSuccess: (state) => {
//       state.currentUser = null;
//       state.loading = false;
//       state.error = null;
//     },
//     signOutUserFailure: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//   },
// });

// export const {
//   signInStart,
//   signInSuccess,
//   signInFailure,
//   updateUserFailure,
//   updateUserSuccess,
//   updateUserStart,
//   deleteUserFailure,
//   deleteUserSuccess,
//   deleteUserStart,
//   signOutUserFailure,
//   signOutUserSuccess,
//   signOutUserStart,
// } = userSlice.actions;

// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  currentUser: null, // Stores the currently logged-in user's information
  error: null, // Used to store any error messages
  loading: false, // Indicates whether an async action is in progress
  listings: [], // An array to hold listings (for creating, etc.)
};

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Start the sign-in process
    signInStart: (state) => {
      state.loading = true;
    },
    // Handle successful sign-in
    signInSuccess: (state, action) => {
      state.currentUser = action.payload; // Store user info in currentUser
      state.loading = false; // Loading finished
      state.error = null; // Clear any previous errors
    },
    // Handle sign-in failure
    signInFailure: (state, action) => {
      state.error = action.payload; // Store error message
      state.loading = false; // Loading finished
    },
    // Start the user update process
    updateUserStart: (state) => {
      state.loading = true;
    },
    // Handle successful user update
    updateUserSuccess: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload }; // Update user info
      state.loading = false;
      state.error = null;
    },
    // Handle user update failure
    updateUserFailure: (state, action) => {
      state.error = action.payload; // Store error message
      state.loading = false; // Loading finished
    },
    // Start the user deletion process
    deleteUserStart: (state) => {
      state.loading = true;
    },
    // Handle successful user deletion
    deleteUserSuccess: (state) => {
      state.currentUser = null; // Reset currentUser to null
      state.loading = false;
      state.error = null;
    },
    // Handle user deletion failure
    deleteUserFailure: (state, action) => {
      state.error = action.payload; // Store error message
      state.loading = false; // Loading finished
    },
    // Start the sign-out process
    signOutUserStart: (state) => {
      state.loading = true;
    },
    // Handle successful sign-out
    signOutUserSuccess: (state) => {
      state.currentUser = null; // Reset currentUser to null
      state.loading = false;
      state.error = null;
    },
    // Handle sign-out failure
    signOutUserFailure: (state, action) => {
      state.error = action.payload; // Store error message
      state.loading = false; // Loading finished
    },
    // Start the listing creation process
    createListingStart: (state) => {
      state.loading = true;
    },
    // Handle successful listing creation
    createListingSuccess: (state, action) => {
      state.listings.push(action.payload); // Add new listing to the array
      state.loading = false;
      state.error = null;
    },
    // Handle listing creation failure
    createListingFailure: (state, action) => {
      state.error = action.payload; // Store error message
      state.loading = false; // Loading finished
    },
  },
});

// Export actions for use in components
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  createListingStart,
  createListingSuccess,
  createListingFailure,
} = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
