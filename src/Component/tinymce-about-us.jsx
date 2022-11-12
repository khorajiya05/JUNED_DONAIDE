import React, { useRef } from 'react';

import { Editortemplateheader } from './editor-template-header';
import { Editor } from '@tinymce/tinymce-react';


export default function AboutUsTinyMCE() {

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

       
        <div className='tmplt-about-us' style='    text-align: center;
        padding: 50px 0;
        position: relative;
        background-image: url(../Images/aboutus-bg.jpg);
        background-repeat: no-repeat;
        width: 100%;
        background-size: cover;
        background-position: center center;'>
        <div className='tmplt-about-us-heading' style='width: 75%;
        margin: auto;'>
            <h3 style='font-family: Poppins; font-weight:500;font-size: 32px;
            margin-bottom: 15px;
            color: #222222;'>About Us</h3>
            <h4 style='font-family:Poppins;color: #333333;
            font-size: 20px;
            font-weight: 400;
            margin-bottom: 10px;'>Lorem Ipsum is simply dummy text of the printing and type setting Ipsum is simply adummy text text of the printing text of the printing and type setting Ipsum is simply adummy text and type setting Ipsum is simply adummy text of the printing and type setting Ipsum is simply adummy text.</h4>
        </div>
        <div className='carousel-container' style='margin-top:50px'>
            <OwlCarousel  className='owl-theme'
                loop
                margin={15}  
                autoplay={true}
                responsive={state.responsive}                                                                             
                >
                <div className={'item'} style='width: 410.333px; margin: 10px; display:inline-block'> <img src='Images/item-one.jpg'  style='display: block;
                
                object-fit: cover;
                height: 520px;
                border-radius: 30px;
                box-shadow: 0px 4px 3px rgb(0 0 0 / 10%); ' alt='Payment methods' /></div>
                <div className={'item'} style='width: 410.333px; margin: 10px; display:inline-block'><img src='Images/item-two.jpg'  style='display: block;
                
                object-fit: cover;
                height: 520px;
                border-radius: 30px;
                box-shadow: 0px 4px 3px rgb(0 0 0 / 10%); '  alt='Payment methods' /></div>
                <div className={'item'} style='width: 410.333px; margin: 10px; display:inline-block'><img src='Images/item-three.jpg' style='display: block;
               
                object-fit: cover;
                height: 520px;
                border-radius: 30px;
                box-shadow: 0px 4px 3px rgb(0 0 0 / 10%); '  alt='Payment methods' /></div>
                <div className={'item'} style='width: 410.333px; margin: 10px; display:inline-block'><img src='Images/item-four.jpg' style='display: block;
               
                object-fit: cover;
                height: 520px;
                border-radius: 30px;
                box-shadow: 0px 4px 3px rgb(0 0 0 / 10%); '  alt='Payment methods' /></div>
                <div className={'item'} style='width: 410.333px; margin: 10px; display:inline-block'><img src='Images/item-five.jpg' style='display: block;
            
                object-fit: cover;
                height: 520px;
                border-radius: 30px;
                box-shadow: 0px 4px 3px rgb(0 0 0 / 10%); '  alt='Payment methods' /></div>
                <div className={'item'} style='width: 410.333px; margin: 10px; display:inline-block'><img src='Images/item-six.jpg'  style='display: block;
               
                object-fit: cover;
                height: 520px;
                border-radius: 30px;
                box-shadow: 0px 4px 3px rgb(0 0 0 / 10%); ' alt='Payment methods' /></div>
                <div className={'item'} style='width: 410.333px; margin: 10px; display:inline-block'><img src='Images/item-four.jpg' style='display: block;
                
                object-fit: cover;
                height: 520px;
                border-radius: 30px;
                box-shadow: 0px 4px 3px rgb(0 0 0 / 10%); '  alt='Payment methods' /></div>              
            </OwlCarousel>
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