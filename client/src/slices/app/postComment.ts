import { apiSlice } from "../authentication/apiSlice";
import { postComment } from "../../types";

export const eventsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
      createComment: builder.mutation<postComment,{text: string,id:string}>({
        query: ({text,id}) => {
          return{
            url: `/api/comment/${id}`,
            method:'POST',
            body: {text: text}
          }
        }
      })
    })
  })
  
  export const{
    useCreateCommentMutation
  } = eventsApiSlice