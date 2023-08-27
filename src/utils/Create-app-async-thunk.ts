

import {AppDispatch, RootReducerType} from "../store/Store";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const createAppAsyncThunk=createAsyncThunk.withTypes<{
    state: RootReducerType
    dispatch: AppDispatch
    rejectValue: RejectValueType| null
}>()

type RejectValueType= string