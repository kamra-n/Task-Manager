import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    collection,
    setDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore"
import { db } from '../firebase'



const getData = createAsyncThunk('todo/getData', async () => {
    try {
        const allData = [];
        const querySnapshot = await getDocs(collection(db, "tasks"));
        querySnapshot.forEach((doc) => {
            allData.push(doc.data());
        });

        return allData;
    }
    catch (e) {
        console.log("Error Occur", e)
    }
})


const addTodo = createAsyncThunk('todo/addTodo', async (data) => {
    try {
        await setDoc(doc(db, "tasks", data?.id.toString()), data);
    }
    catch (e) {
        console.log("Error Occur", e)

    }
})


const updateTodo = createAsyncThunk('todo/updateTodo', async ({title,description,id}) => {
    try {
        const taskDocRef = doc(db, 'tasks', `${id}`)
        await updateDoc(taskDocRef, {
            title: title,
            description: description
        })
    }
    catch (e) {
        console.log("Error Occur", e)

    }
})




const updateTodocheck = createAsyncThunk('todo/updateTodo', async ({checked,id}) => {
    try {
        const taskDocRef = doc(db, 'tasks', `${id}`)
        await updateDoc(taskDocRef, {
            completed: checked
          })
    }
    catch (e) {
        console.log("Error Occur", e)

    }
})


const deleteTodo = createAsyncThunk('todo/deleteTodo', async (id) => {
    try {
        await deleteDoc(doc(db, "tasks", `${id}`));
    }
    catch (e) {
        console.log("Error Occur", e)

    }
})


const initialState = {
    isLoading: false,
    dataList: [],
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dataList = action.payload;


        });
        builder.addCase(getData.rejected, (state, { payload }) => {
            state.isLoading = false;
        });


        builder.addCase(addTodo.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addTodo.fulfilled, (state, action) => {
            state.isLoading = false;


        });
        builder.addCase(addTodo.rejected, (state, { payload }) => {
            state.isLoading = false;
        });


        builder.addCase(updateTodo.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateTodo.fulfilled, (state, action) => {
            state.isLoading = false;


        });
        builder.addCase(updateTodo.rejected, (state, { payload }) => {
            state.isLoading = false;
        });


        

        builder.addCase(deleteTodo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteTodo.fulfilled, (state) => {
            state.isLoading = false;


        });
        builder.addCase(deleteTodo.rejected, (state) => {
            state.isLoading = false;
        });



        builder.addCase(updateTodocheck.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateTodocheck.fulfilled, (state, action) => {
            state.isLoading = false;


        });
        builder.addCase(updateTodocheck.rejected, (state, { payload }) => {
            state.isLoading = false;
        });

        
    }
});

export { getData, addTodo, updateTodo, deleteTodo,updateTodocheck };

export default todoSlice.reducer;
