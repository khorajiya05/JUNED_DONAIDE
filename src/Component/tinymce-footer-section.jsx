import React, { useRef } from 'react';

import Header, { Editortemplateheader } from './editor-template-header';
import { Editor } from '@tinymce/tinymce-react';



export default function FooterTinyMCE() {

    
    const editorRef = useRef(null);

  return (
    <>
<Editortemplateheader/>

<main className="get-started-bg">
        <div className="main-outer-container">
        <div className="main-inner-container">
                    <div className="inner-container-template">
                  
<div className='tiny-container mt-3'>
    <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        
        initialValue="

       
        <div className='tmplt-footer m-0' style='display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        color: #fff;
        padding: 8px 10px;
        background-color: #262A7B;
        font-size: 14px;'>
            <p className='m-0' style='margin:0px;'>Copyright © 2022 Donaide. All rights reserved.</p>
        </div>



         
                "
        init={{
        height: 830,
        menubar: false,
        plugins: [
          'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
        ],

        toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',

        imagetools_cors_hosts: ['picsum.photos'],
        menubar: 'file edit view insert format tools table help',



        toolbar_mode: 'sliding',
        contextmenu: "link image imagetools table",

        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
      
        image_caption: true,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_noneditable_class: "mceNonEditable",



        toolbar_sticky: true,
        autosave_ask_before_unload: true,
        autosave_interval: "30s",
        autosave_prefix: "{path}{query}-{id}-",
        autosave_restore_when_empty: false,
        autosave_retention: "2m",
        image_advtab: true,



        selector: 'textarea#full-featured-non-premium',
        plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
        imagetools_cors_hosts: ['picsum.photos'],
        menubar: 'file edit view insert format tools table help',
        toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
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