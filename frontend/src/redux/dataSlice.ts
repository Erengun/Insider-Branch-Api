import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BranchData = {
  branch_id: string;
  name: string;
  full_address: string;
  latitude: number;
  longtitude: number;
  phone: string;
};

const initialState : BranchData[] = [
  {
    branch_id: 'branch_1',
    name: 'Branch 1',
    full_address: 'Street 1, City, Country',
    latitude: 34.0522,
    longtitude: -118.2437,
    phone: '+12345678901'
  },
  {
    branch_id: 'branch_2',
    name: 'Branch 2',
    full_address: 'Street 2, City, Country',
    latitude: 40.7128,
    longtitude: -74.0060,
    phone: '+12345678902'
  },
  {
    branch_id: 'branch_3',
    name: 'Branch 3',
    full_address: 'Street 3, City, Country',
    latitude: 51.5074,
    longtitude: -0.1278,
    phone: '+12345678903'
  },
  {
    branch_id: 'branch_4',
    name: 'Branch 4',
    full_address: 'Street 4, City, Country',
    latitude: 35.6895,
    longtitude: 139.6917,
    phone: '+12345678904'
  },
  {
    branch_id: 'branch_5',
    name: 'Branch 5',
    full_address: 'Street 5, City, Country',
    latitude: 48.8566,
    longtitude: 2.3522,
    phone: '+12345678905'
  },
  {
    branch_id: 'branch_6',
    name: 'Branch 6',
    full_address: 'Street 6, City, Country',
    latitude: 55.7558,
    longtitude: 37.6173,
    phone: '+12345678906'
  },
  {
    branch_id: 'branch_7',
    name: 'Branch 7',
    full_address: 'Street 7, City, Country',
    latitude: 39.9042,
    longtitude: 116.4074,
    phone: '+12345678907'
  },
  {
    branch_id: 'branch_8',
    name: 'Branch 8',
    full_address: 'Street 8, City, Country',
    latitude: -33.8688,
    longtitude: 151.2093,
    phone: '+12345678908'
  },
  {
    branch_id: 'branch_9',
    name: 'Branch 9',
    full_address: 'Street 9, City, Country',
    latitude: 52.5200,
    longtitude: 13.4050,
    phone: '+12345678909'
  },
  {
    branch_id: 'branch_10',
    name: 'Branch 10',
    full_address: 'Street 10, City, Country',
    latitude: 41.9028,
    longtitude: 12.4964,
    phone: '+12345678910'
  },
  {
    branch_id: 'branch_11',
    name: 'Branch 11',
    full_address: 'Street 11, City, Country',
    latitude: 35.6762,
    longtitude: 139.6503,
    phone: '+12345678911'
  },
  {
    branch_id: 'branch_12',
    name: 'Branch 12',
    full_address: 'Street 12, City, Country',
    latitude: 37.7749,
    longtitude: -122.4194,
    phone: '+12345678912'
  },
  {
    branch_id: 'branch_13',
    name: 'Branch 13',
    full_address: 'Street 13, City, Country',
    latitude: -22.9068,
    longtitude: -43.1729,
    phone: '+12345678913'
  },
  {
    branch_id: 'branch_14',
    name: 'Branch 14',
    full_address: 'Street 14, City, Country',
    latitude: 28.7041,
    longtitude: 77.1025,
    phone: '+12345678914'
  },
  {
    branch_id: 'branch_15',
    name: 'Branch 15',
    full_address: 'Street 15, City, Country',
    latitude: 19.0760,
    longtitude: 72.8777,
    phone: '+12345678915'
  }
];

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