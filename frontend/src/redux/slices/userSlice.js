import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { updateScores } from '../../services/api';
import axios from 'axios';
const initialState = {
    user: null,
    leaderboard: [],
    error: null,
}


export const fetchLeaderboard = createAsyncThunk('user/fetchLeaderboard', async () => {
  try {
    const response = await axios.get('https://emitr-backend.onrender.com/users/leaderboard');
    return response.data.users;
  } catch (error) {
    throw error.response.data.message;
  }
});



export const updateScore = createAsyncThunk('user/updateScore', async (userId,pointsToAdd) => {
  try {
    const response = await axios.patch(`https://emitr-backend.onrender.com/users/updatescore/${userId}`,{ score: pointsToAdd });
    console.log(response.data,"Score updated")
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload
    },
    logoutUser: (state) => {
        state.user = null
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateScore.fulfilled, (state, action) => {
      const user = state.user;
      if (user) {
        user.score += 1;
  }

    });
    builder.addCase(fetchLeaderboard.fulfilled, (state, action) => {
      state.leaderboard = action.payload;
    });
    builder.addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
      state.error = action.error.message;
    });
  },
})


export const { setUser, logoutUser,clearError  } = userSlice.actions

export default userSlice.reducer