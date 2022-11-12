import React, { useEffect,useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import CommunityService from "../../Services/CommunityService";
import { useDispatch, useSelector } from "react-redux";
import { openFourthEditorAct } from "../../ReduxStore/Actions/openEditorActs"

function FootersectionComp(props) {
    const [sectionData, setSectionData] = useState([]);
    const [isExists, setIsExists] = useState(false);
    const [defaultFourthTemplateData,setDefaultFourthTemplateData] = useState([]);
    const dispatch = useDispatch();
    const search = useLocation().search;


  let siteID = localStorage.getItem("siteIDs");

  const getSiteID = new URLSearchParams(search).get("id");

  
    siteID = getSiteID !== null ?  getSiteID : siteID;
  
    useEffect(() => {
      GetCommunitySiteSection();
    }, []);
  
    const GetCommunitySiteSection = async () => {

      const res = await CommunityService.getCommunitySiteSection(siteID);
  
      // if (res.data[0]._id) {
      //   setSectionData(res.data);
      //   setIsExists(true);
      // }
  


      let getFourthSecData = res.data.filter((value)=>{
        if(value.order === 4){
          return value
        }
      })

      if (getFourthSecData.length !==0) {
        setSectionData(getFourthSecData);
        // setIsExists(true);
        // localStorage.setItem("isExists", true);
      }
    };
  
    const CheckExistsOrNot = async (id) => {
      const Exists = sectionData.some(
        (item) => siteID === item.siteID && 4 === item.order
      );
  
      setIsExists(Exists);
      if (Exists) {
        UpdateCommunitySiteSection(id);
        //alert("if")
      } else {
        AddCommunitySiteSection(id);
      }
    };
  
    const AddCommunitySiteSection = async (id) => {
      const Content = editorRef.current.getContent();
      const siteID = localStorage.getItem("siteIDs");
      var data = {
        Order: id,
        SiteID:  getSiteID !== null ?  getSiteID : siteID,
        HTML: Content,
      };
  
      CommunityService.addCommunitySiteSection(data)
        .then((userResponse) => {
          if (userResponse.data.status === "SUCCESS") {
            props.datafooter(false);
            localStorage.setItem("isExistsFooter", true);
            // window.location.reload();
            dispatch(openFourthEditorAct(false))
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const UpdateCommunitySiteSection = async (id) => {
      // debugger;
      //e.preventDefault();
  
      const Content = editorRef.current.getContent();
  
      const siteID = localStorage.getItem("siteIDs");
      var data = {
        Order: id,
        SiteID:  getSiteID !== null ?  getSiteID : siteID,
        HTML: Content,
      };
  
      CommunityService.updateCommunitySiteSection(data)
        .then((userResponse) => {
          if (userResponse.data.status === "SUCCESS") {
            props.datafooter(false);
            localStorage.setItem("isExistsFooter", true);
            // window.location.reload();
            dispatch(openFourthEditorAct(false))
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const editorRef = useRef(null);

    const GetAllDefaultSectionsTemplate = async () => {

      const res = await CommunityService.getAllDefaultSectionsTemplate();
  
      setDefaultFourthTemplateData(res.data[3].sectionContent);
    };
  
    useEffect(() => {
      GetAllDefaultSectionsTemplate();
    }, []);

    return (
      <>
        <div className="tiny-container mt-0">
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            // initialValue={
            //   !isExists
            //     ? localStorage.getItem("defaultFourthSection")
            //     : localStorage.getItem("fourthSection")
            // }

            initialValue={
              !isExists &&  sectionData.length === 0
                  ? defaultFourthTemplateData
                  : sectionData[0].html

              }
            init={{
              height: 200,
              branding: false,
              menubar: false,
  
              selector: "textarea", // change this value according to your HTML
              images_upload_url: "postAcceptor.php",
              automatic_uploads: false,
  
              plugins: [
                "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
              ],
  
              selector: "textarea#local-upload",
              plugins: "image code",
              toolbar: "undo redo | image code",
  
              /* without images_upload_url set, Upload tab won't show up*/
              images_upload_url: "postAcceptor.php",
  
              /* we override default upload handler to simulate successful upload*/
              images_upload_handler: function (blobInfo, success, failure) {
                setTimeout(function () {
                  /* no matter what you upload, we will turn it into TinyMCE logo :)*/
                  success(
                    "http://moxiecode.cachefly.net/tinymce/v9/images/logo.png"
                  );
                }, 2000);
              },
  
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px } img{width:100% !important; height: auto !important;} h3{font-size:3vw!important;} @media screen and (max-width: 480px){h3{font-size:5.4vw!important;}  h4{font-size:3.2vw!important;}  }",
  
              toolbar:
                "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
  
              imagetools_cors_hosts: ["picsum.photos"],
              menubar: "file edit view insert format tools table help",
  
              toolbar_mode: "sliding",
              contextmenu: "link image imagetools table",
  
              template_cdate_format:
                "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
              template_mdate_format:
                "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
  
              image_caption: true,
              quickbars_selection_toolbar:
                "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
              noneditable_noneditable_class: "mceNonEditable",
  
              toolbar_sticky: true,
              autosave_ask_before_unload: true,
              autosave_interval: "30s",
              autosave_prefix: "{path}{query}-{id}-",
              autosave_restore_when_empty: false,
              autosave_retention: "2m",
              image_advtab: true,
  
              selector: "textarea#full-featured-non-premium",
              plugins:
                "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
              imagetools_cors_hosts: ["picsum.photos"],
              menubar: "file edit view insert format tools table help",
              toolbar:
                "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
              toolbar_sticky: true,
              autosave_ask_before_unload: true,
              autosave_interval: "30s",
              autosave_prefix: "{path}{query}-{id}-",
              autosave_restore_when_empty: false,
              autosave_retention: "2m",
              image_advtab: true,
            }}
          />
        </div>
        <div className="d-flex justify-content-end mt-3 pb-4 me-2">
          <button
            className="btn btn-danger m-1"
            onClick={() => dispatch(openFourthEditorAct(false))}
          >
            {" "}
            Cancel
          </button>
          <button
            className="btn btn-primary m-1"
            onClick={() => CheckExistsOrNot(4)}
            // onClick={() => dispatch(openFourthEditorAct(false))}
          >
            {" "}
            Save Changes
          </button>
        </div>
      </>
    );
  }

  export default FootersectionComp;
