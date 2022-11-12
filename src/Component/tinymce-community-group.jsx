import React, { useRef } from "react";

import Header, { Editortemplateheader } from "./editor-template-header";
import { Editor } from "@tinymce/tinymce-react";

export default function CommunityGroupTinyMCE() {
  const editorRef = useRef(null);

  return (
    <>
      <Editortemplateheader />

      <main className="get-started-bg">
        <div className="main-outer-container">
          <div className="main-inner-container">
            <div className="inner-container-template">
              <div className="tiny-container mt-3">
                <Editor
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="

       
        <div className='tmplt-community-group' style='padding: 40px 0px 50px; position: relative; text-align: center; padding: 40px 0; background: #F5F5F5;'>
        <h3 style='font-family: Poppins; font-weight:500;font-size: 32px;
        width: 75%;
        margin: 0 auto 15px;
        padding: 0 10px;text-align:center;
        color: #222222;'>Community Group</h3>

        <div className='view-all-adm-group-cards border-0' style='padding: 20px 18px 20px;
        position: relative;
        width: 100%;'>
                
                <div className='view-all-adm-group-container' style='display: flex;
                justify-content: center;
                flex-wrap: wrap; '>
                
                        <div className='owl-cstm-item' style='    width: 31.80%;
                        margin: 10px;position:relative; text-align:left'><Link to='/admin-group-detail' className='item'><img src='Images/item-one.jpg' alt='Payment methods' style='display: block;
                        width: 100%;
                        object-fit: cover;
                        height: 200px;
                        border-radius: 30px;
                        box-shadow: 0px 4px 3px rgb(0 0 0 / 10%);'/> <div className='group-type' style='color: #fff; position: absolute; top: 140px; left: 23px; z-index: 1;'><p style='color: #fff;
                        margin-bottom: -5px;'>Group Name Here</p><span style='color: #fff; margin-bottom: 0; font-size: 14px;'>Group Type</span></div></Link></div>
                        <div className='owl-cstm-item' style='    width: 31.80%;
                        margin: 10px;position:relative; text-align:left'><Link to='/admin-group-detail' className='item'><img src='Images/item-two.jpg'  style='display: block;
                        width: 100%;
                        object-fit: cover;
                        height: 200px;
                        border-radius: 30px;
                        box-shadow: 0px 4px 3px rgb(0 0 0 / 10%);' alt='Payment methods' /><div className='group-type' style='color: #fff; position: absolute; top: 140px; left: 23px; z-index: 1;'><p style='color: #fff; margin-bottom: -5px;'>Group Name Here</p><span style='color: #fff; margin-bottom: 0; font-size: 14px;'>Group Type</span></div></Link></div>
                        <div className='owl-cstm-item' style='    width: 31.80%;
                        margin: 10px;position:relative; text-align:left'><Link to='/admin-group-detail' className='item'><img src='Images/item-three.jpg' style='display: block;
                        width: 100%;
                        object-fit: cover;
                        height: 200px;
                        border-radius: 30px;
                        box-shadow: 0px 4px 3px rgb(0 0 0 / 10%);'  alt='Payment methods' /><div className='group-type' style='color: #fff; position: absolute; top: 140px; left: 23px; z-index: 1;'><p  style='color: #fff; margin-bottom: -5px;'>Group Name Here</p><span style='color: #fff; margin-bottom: 0; font-size: 14px;'>Group Type</span></div></Link></div>
                        
                    
                </div>
            </div>

    </div>
                "
                  init={{
                    height: 830,
                    menubar: false,
                    plugins: [
                      "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
                    ],

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
                {/* <button onClick={log}>Log editor content</button> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
