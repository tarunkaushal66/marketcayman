import { createSlice, current } from "@reduxjs/toolkit";
import status from "../../constants/status";

import { listUsers } from "./thunks/listUsers";
import { deleteUser } from "./thunks/deleteUser";
import { listBlockUsers } from "./thunks/listBlockUser";
import { blockUnblockUser } from "./thunks/blockUnblockUser";
import { addUser } from "./thunks/addUser";
import { editUser } from "./thunks/editUser";
import { fetchUser } from "./thunks/fetchUser";

const initialState = {
  manage_user: [],
  blocked_user: [],
  fetchedUser: null,
};

const slice = createSlice({
  name: "users",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listUsers.pending, (state, action) => {
    });
    builder.addCase(listUsers.fulfilled, (state, action) => {
      state.manage_user = action.payload.body;
    });
    builder.addCase(listUsers.rejected, (state, action) => {
    });
    builder.addCase(deleteUser.pending, (state, action) => {
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.manage_user.data = state?.manage_user?.data?.filter(
        (item) => item._id != action?.payload?.body?.id
      );
      state.manage_user.total_count -= 1;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
    });
    builder.addCase(addUser.pending, (state, action) => {
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
    });
    builder.addCase(addUser.rejected, (state, action) => {
    });
    builder.addCase(editUser.pending, (state, action) => {
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
    });
    builder.addCase(editUser.rejected, (state, action) => {
    });
    builder.addCase(fetchUser.pending, (state, action) => {
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.fetchedUser = action.payload?.body;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.fetchedUser = initialState.fetchedUser;
    });
    builder.addCase(listBlockUsers.pending, (state, action) => {
    });
    builder.addCase(listBlockUsers.fulfilled, (state, action) => {
      state.blocked_user= action.payload.body;
    });
    builder.addCase(listBlockUsers.rejected, (state, action) => {
    });
    builder.addCase(blockUnblockUser.pending, (state, action) => {
    });
    builder.addCase(blockUnblockUser.fulfilled, (state, action) => {
      // if (!action?.payload?.data?.is_blocked) {
      //   state.blocked_user.data = state?.blocked_user?.data?.filter(
      //     (item) => item._id != action?.payload?.body?.id
      //   );
      //   state.blocked_user.total_count -= 1;
      // } else {
      //   state.blocked_user.total_count += 1;
      //   state.blocked_user.data = state.blocked_user.data.push(
      //     action?.payload?.body
      //   );
      // }
    });
    builder.addCase(blockUnblockUser.rejected, (state, action) => {
    });
  },
});

export default slice;
