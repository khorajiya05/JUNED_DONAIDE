import {  TEMPLATE_HEADING_REQUEST, TEMPLATE_DESC_REQUEST, TEMPLATE_CONTENT_ID, TEMPLATE_LOGO_COMMUNITY_NAME } from "../Constants/templateConstant";

      const getHeadingContent = (data)=>{
       return { 
        type: TEMPLATE_HEADING_REQUEST, 
        payload: data }
      }

      const getDesContent = (data)=>{
       return { 
        type: TEMPLATE_DESC_REQUEST, 
        payload: data }
      }

      const getAboutusHeadingContent = (data)=>{
       return { 
        type: TEMPLATE_HEADING_REQUEST, 
        payload: data }
      }

      const getAboutusDesContent = (data)=>{
       return { 
        type: TEMPLATE_DESC_REQUEST, 
        payload: data }
      }   

      const getEditorContent = (contentID)=>{
       return { 
        type: TEMPLATE_CONTENT_ID, 
        payload: contentID }
      }

      const getLogoCommunityName = (data)=>{
       return { 
        type: TEMPLATE_LOGO_COMMUNITY_NAME,
        payload: data
      }
      }

      export { getHeadingContent, getDesContent, getAboutusHeadingContent, getAboutusDesContent, getEditorContent, getLogoCommunityName };