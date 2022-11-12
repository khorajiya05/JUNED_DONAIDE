import {  GET_JOIN_GROUP_MEM_DETAIL } from "../Constants/templateConstant";

      

      const getJoinGroupMemDetail = (data)=>{
       return { 
        type: GET_JOIN_GROUP_MEM_DETAIL,
        payload: data
      }
      }

      export { getJoinGroupMemDetail };