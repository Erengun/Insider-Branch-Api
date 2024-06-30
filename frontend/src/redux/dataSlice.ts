import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BranchData = {
  id: string;
  name: string;
  full_address: string;
  latitude: number;
  longitude: number;
  phone: string;
};

const initialState : BranchData[] = [];

const dataSlice = createSlice({
  name : 'dataSlice',
  initialState,
  reducers : {
    changeData : (state , action : PayloadAction<BranchData[]>) => {
      Object.assign(state , action.payload);
    }
  }
})

export const { changeData } = dataSlice.actions
export default dataSlice