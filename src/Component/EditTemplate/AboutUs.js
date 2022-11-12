import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import CommunityService from "../../Services/CommunityService";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openSecEditorAct } from "../../ReduxStore/Actions/openEditorActs"

function AboutUs(props) {
  const [defaultTemplateData, setDefaultTemplateData] = useState([]);

  const [sectionData, setSectionData] = useState([]);
  const [isExists, setIsExists] = useState(false);
  const [defaultSecTemplateData, setDefaultSecTemplateData] = useState([]);
  const dispatch = useDispatch();

  const search = useLocation().search;


  let siteID = localStorage.getItem("siteIDs");

  const getSiteID = new URLSearchParams(search).get("id");

  
    siteID = getSiteID !== null ?  getSiteID : siteID;

  const GetCommunitySiteSection = async () => {
    const res = await CommunityService.getCommunitySiteSection(siteID);
    if (res.data.length > 0) {
      let getSecondSecData = res.data.filter((value) => {
        if (value.order === 2) {
          return value
        }
      })

      if (getSecondSecData.length !== 0) {
        setSectionData(getSecondSecData);
        // setIsExists(true);
        // localStorage.setItem("isExistsAbout", true);
      }
    }


  };

  useEffect(() => {
    GetCommunitySiteSection();
  }, []);

  const CheckExistsOrNot = async (id) => {
    //   debugger;

    const Exists = sectionData.some(
      (item) => siteID === item.siteID && 2 === item.order
    );

    setIsExists(Exists);
    if (Exists) {
      UpdateCommunitySiteSection(id);
    } else {
      AddCommunitySiteSection(id);
    }
  };

  const AddCommunitySiteSection = async (id) => {
    //   debugger;
    const Content = editorRef.current.getContent();
    const siteID = localStorage.getItem("siteIDs");
    var data = {
      Order: id,
      SiteID: getSiteID !== null ?  getSiteID : siteID,
      HTML: Content,
    };

    CommunityService.addCommunitySiteSection(data)
      .then((userResponse) => {
        if (userResponse.data.status === "SUCCESS") {
          localStorage.setItem("isExistsAbout", true);
          props.dataabout(false);
  
          dispatch(openSecEditorAct(false))
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const UpdateCommunitySiteSection = async (id) => {
    // debugger;

    const Content = editorRef.current.getContent();
    var data = {
      Order: id,
      SiteID: getSiteID !== null ?  getSiteID : siteID,
      HTML: Content,
    };

    CommunityService.updateCommunitySiteSection(data)
      .then((userResponse) => {
        // window.location.reload();
        if (userResponse.data.status === "SUCCESS") {
          localStorage.setItem("isExistsAbout", true);
          props.dataabout(false);
          // window.location.reload();
          dispatch(openSecEditorAct(false))
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editorRef = useRef(null);


  const GetAllDefaultSectionsTemplate = async () => {

    const res = await CommunityService.getAllDefaultSectionsTemplate();

    setDefaultSecTemplateData(res.data[1].sectionContent);
  };

  useEffect(() => {
    GetAllDefaultSectionsTemplate();
  }, []);


  return (
    <>
      <div className="tiny-container mt-0">
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={
            !isExists && sectionData.length === 0
              ? defaultSecTemplateData
              : sectionData[0].html

          }
          init={{
            height: 1100,
            branding: false,
            menubar: false,

            selector: "textarea", 
            images_upload_url: "postAcceptor.php",
            automatic_uploads: false,

            plugins: [
              "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
            ],

            selector: "textarea#local-upload",
            plugins: "image code",
            toolbar: "undo redo | image code",
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
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px } img{width:330px !important; max-width:330px; max-height:535px!important;  min-height:535px!important; object-fit:cover !important;} h3{font-size:3vw!important;} @media screen and (max-width: 480px){h3{font-size:5.4vw!important;}  h4{font-size:3.2vw!important;}  }",

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

      <div className="d-flex justify-content-end mt-3 pb-4 me-2 custom-template-button">
        <button
          className="btn cancel-button m-1"
          // onClick={() => props.dataabout(false)}
          onClick={() => dispatch(openSecEditorAct(false))}
        >
          {" "}
          Cancel
        </button>
        <button
          className="btn Save-button m-1"
          onClick={() => CheckExistsOrNot(2)}
        >
          {" "}
          Save Changes
        </button>
      </div>
    </>
  );
}

export default AboutUs;
