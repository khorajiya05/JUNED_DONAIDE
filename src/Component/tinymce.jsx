import React, { useRef } from 'react';

import { Editortemplateheader } from './editor-template-header';
import { Editor } from '@tinymce/tinymce-react';
import Preview from './preview';



export default function App(props) {

    
    const editorRef = useRef(null);

 
  return (
    <>
<Editortemplateheader />

<main className="get-started-bg">
        <div className="main-outer-container">
        <div className="main-inner-container">
                    <div className="inner-container-template">
                  
<div className='tiny-container mt-3'>
    <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        
        initialValue="

        <div className='templateherobanner' />
                                <div className='templateherobanner-bg' style='height: 58vh;
                                width: 100%;
                                text-align: center;
                                color: #fff;
                                position: relative;'>
                                <img src='../Images/herobanner.svg' style='height: 58vh;
                                background-image: url(../Images/herobanner.svg);
                             object-fit: cover;
                                width: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                text-align: center;
                                color: #fff;' />
                                    <div className='templateherobanner-bg-content' style=' position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    transform: translate(-50%, -50%);
                                    width: 65%;'>
                                        <h3 style=' font-family: Poppins; font-weight:500;  margin-bottom: 0px;
                                        font-size: 38px;
                                        text-shadow: 0px 4px 3px rgb(0 0 0 / 10%);'>Content Heading</h3>
                                        <h4 style='font-family:Poppins; margin-bottom: 10px;
                                        font-size: 24px;
                                        font-weight: 300;
                                        text-shadow: 0px 4px 3px rgb(0 0 0 / 10%);'>Lorem Ipsum is simply dummy text of the printing and type setting Ipsum is simply adummy text.</h4>
                                    </div>
                                </div>
                                <div className='templateherobanner-content text-center' style='width: 75%; text-align:center;
                                padding: 50px 0;
                                margin: auto;'>
                                    <h3 style='font-size: 32px;
                                    margin-bottom: 15px;
                                    color: #222222;text-align-center'>Content Heading</h3>
                                    <h4 style='    color: #333333;
                                    font-size: 20px;
                                    font-weight: 400;
                                    margin-bottom: 20px;'>Lorem Ipsum is simply dummy text of the printing and type setting text of the printing and type setting Ipsum is simply adummy text Ipsum is simply adummy text.</h4>
                                  
                                  
                                    <button to='' className='btn tmplt-btn' style='color: #262A7B;
                                    border: 2px solid #262A7B;
                                    border-radius: 50px;
                                    padding: 10px 33px;
                                    font-weight: 500;
                                    font-size: 16px;
                                    position: relative;
                                    transition: 0.3s ease-in-out;'>Button</button> 

                                </div>
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