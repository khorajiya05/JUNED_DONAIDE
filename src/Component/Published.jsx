
import React, { useRef, useState } from 'react';
import logo from "../Assests/Images/Logo.svg";
import { Editabletemplateheader } from './EditTemplateHeader';
import { Link, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import OwlCarousel from 'react-owl-carousel';
import { Editor } from '@tinymce/tinymce-react';
import CommunityService from "../Services/CommunityService";
import { useEffect } from 'react';
import { useMemo } from 'react';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const state = {
    responsive: {
        0: {
            items: 1,
        },
        450: {
            items: 1,
        },
        600: {
            items: 2,
        },
        1000: {
            items: 3,
        },
    },
}



const Published = () => {

   

    const [sectionData, setSectionData] = useState([]);
    const [isExists, setIsExists] = useState(false);

    const search = useLocation().search;
    const siteID1 = new URLSearchParams(search).get('id');
    localStorage.setItem("siteID", siteID1);


    // useEffect(() => {
    //     GetAllDefaultSectionsTemplate();

    // },[]);

    useEffect(() => {
        GetCommunitySiteSection();
    }, [sectionData])

    // const GetAllDefaultSectionsTemplate = async () => {
    //     const res = await CommunityService.getAllDefaultSectionsTemplate();
    //     setDefaultTemplateData(res.data);
    //     localStorage.setItem("defaultFirstSection", defaultTemplateData[0].sectionContent);
    //     localStorage.setItem("defaultSecondSection", defaultTemplateData[1].sectionContent);
    //     localStorage.setItem("defaultThirdSection", defaultTemplateData[2].sectionContent);
    //     localStorage.setItem("defaultFourthSection", defaultTemplateData[3].sectionContent);
    // };
        

    const GetCommunitySiteSection = async () => {
   
        //const siteID = localStorage.getItem("siteID");
        const siteID = "62bfeef2fd1265ee626c3124";
        const res = await CommunityService.getCommunitySiteSection("62bfeef2fd1265ee626c3124");
        setSectionData(res.data);
     
    //  localStorage.setItem("firstSection", sectionData[0].html);
    //     localStorage.setItem("secondSection", sectionData[1].html);
    //     localStorage.setItem("thirdSection", sectionData[2].html);
    //     localStorage.setItem("fourthSection", sectionData[3].html);
        if (res.data[0]._id) {
            setSectionData(res.data);
            setIsExists(true);
            localStorage.setItem("isExists", true);
        }
       
        
    };

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [editor, setToEditor] = useState(false);
    const [serviceList, setServiceList] = useState(1);
    const [modalIsOpen1, setIsOpen1] = React.useState(false);
    const [modalIsOpen2, setIsOpen2] = React.useState(false);
    const [modalIsOpen3, setIsOpen3] = React.useState(false);
    const [modalIsOpen4, setIsOpen4] = React.useState(false);
    const [modalIsOpen5, setIsOpen5] = React.useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [communitygroup, setCommunitygroup] = useState(false);
    const [mainSection, setMainsections] = useState(false);
    const [footersection, setFootersection] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function deleteIcon(e) {
        alert("ddd")
        setServiceList(serviceList.filter(serviceList => e !== serviceList.id));
    }

    const AddedElement = () => <Link to="#" className="btn ms-1 mb-2 me-1 tmplt-btn">
        <div data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Button" className='section-edit-icon'></div>
        <div className='section-dlt-icon' onClick={() => deleteIcon(serviceList.id)} ></div>
        Button</Link>

    function openModal1() {
        setIsOpen1(true);
    }

    function closeModal1() {
        setIsOpen1(false);
    }

    function afterOpenModal1() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function openModal2() {
        setIsOpen2(true);
    }
    function closeModal2() {
        setIsOpen2(false);
    }

    function afterOpenModal2() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function openModal3() {
        setIsOpen3(true);
    }

    function closeModal3() {
        setIsOpen3(false);
    }

    function afterOpenModal3() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function openModal4() {
        setIsOpen4(true);
    }

    function closeModal4() {
        setIsOpen4(false);
    }

    function afterOpenModal3() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function openModal5() {
        setIsOpen5(true);
    }

    function closeModal5() {
        setIsOpen5(false);
    }

    function afterOpenModal5() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    return (
        
        <div>
         
            <main className="get-started-bg">
                <div className="main-outer-container">
                    <div className="main-inner-container">
                        <div className="inner-container-template">
                            <div className='inner-content-height'>

                                <Modal
                                    isOpen={modalIsOpen}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal">
                                    <div className='modal-header'>
                                        <h5 className='mb-0' >Header section</h5>
                                        <button className='modal-close-btn' onClick={closeModal}><i className="fa fa-times" aria-hidden="true"></i></button>
                                    </div>
                                    <form>
                                        <div className='modal-body p-0'>
                                            <div className='upload-logo-edit-section'>
                                                <div className='upload-logo-button'>
                                                    <h5>Upload Logo</h5>
                                                    <div className='cstm-logo-upld-btn'>
                                                        <label htmlFor='input-file' className='upload-btn-logo'><i className="fa fa-upload me-1 " aria-hidden="true"></i> Upload</label>
                                                        <input id='input-file' type='file' />
                                                    </div>

                                                    {/* <button  className='upload-btn-logo'><i className="fa fa-upload me-1 " aria-hidden="true"></i> Upload</button> */}
                                                </div>
                                                <div className='upload-logo-file-name'><p>logo-name.jpg</p></div>
                                            </div>

                                            <div className='menu-title-edit-section'>
                                                <div className='upload-menu-button'>
                                                    <h5>Menu List</h5>
                                                    <button className='upload-btn-logo'><i className="fa fa-plus me-1 " aria-hidden="true"></i> Add List</button>
                                                </div>

                                                <div className='edit-template-menu-title'>
                                                    <div className='edit-title-menu'>Contact Us</div>
                                                    <div className='edit-title-menu-icons'>
                                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                                <div className='edit-template-menu-title'>
                                                    <div className='edit-title-menu'>Make a Donation</div>
                                                    <div className='edit-title-menu-icons'>
                                                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='modal-footer'>
                                            <button type='button' onClick={closeModal} className='cancel-button'>Cancel</button>
                                            <button type='button' className='save-button'>Save</button>
                                        </div>

                                    </form>
                                </Modal>

                                <Modal
                                    isOpen={modalIsOpen1}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal">
                                    <div className='modal-header'>
                                        <h5 className='mb-0' >Are you sure?</h5>
                                        <button className='modal-close-btn' onClick={closeModal1}><i className="fa fa-times" aria-hidden="true"></i></button>
                                    </div>
                                    <form>
                                        <div className='modal-body p-0'>


                                            <div className='menu-title-edit-section py-3'>
                                                <div className='text-center'>
                                                    <h6 className='px-2'>Are you sure want to delete this image?</h6></div>
                                            </div>
                                        </div>

                                        <div className='modal-footer'>
                                            <button type='button' onClick={closeModal1} className='save-button'>Cancel</button>
                                            <button type='button' className='cancel-button'>Delete</button>

                                        </div>

                                    </form>
                                </Modal>

                                <Modal
                                    isOpen={modalIsOpen2}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal">
                                    <div className='modal-header'>
                                        <h5 className='mb-0' >Are you sure?</h5>
                                        <button className='modal-close-btn' onClick={closeModal2}><i className="fa fa-times" aria-hidden="true"></i></button>
                                    </div>
                                    <form>
                                        <div className='modal-body p-0'>


                                            <div className='menu-title-edit-section py-3'>
                                                <div className='text-center'>
                                                    <h6 className='px-2'>Are you sure you want to delete this section?</h6></div>
                                            </div>
                                        </div>

                                        <div className='modal-footer'>
                                            <button type='button' onClick={closeModal2} className='save-button'>Cancel</button>
                                            <button type='button' className='cancel-button'>Delete</button>

                                        </div>

                                    </form>
                                </Modal>

                                <Modal
                                    isOpen={modalIsOpen3}
                                    onAfterOpen={afterOpenModal}
                                    // onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                    backdrop="static">
                                    <div className="modal-header">
                                        <h5 className="mb-0"> Add Button</h5>
                                        <button
                                            className="modal-close-btn"
                                            onClick={closeModal3}
                                        >
                                            <i className="fa fa-times" aria-hidden="true"></i>
                                        </button>

                                    </div>

                                    <form>

                                        <div className="modal-body p-0">

                                            <div className="modal-create-group-name">
                                                <div className="form-group field-set-form mb-3">
                                                    <div className="form-group mb-3">
                                                        <label className="form-label">Button Name</label>
                                                        <input type="text" className="form-control cstm-field" placeholder="Button Name" name="Name"
                                                        />
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label className="form-label">Button Link</label>
                                                        <input type="text" className="form-control cstm-field" placeholder="Button Link" name="Name"
                                                        />
                                                    </div>

                                                </div>
                                            </div>

                                            <div>

                                            </div>
                                        </div>

                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                onClick={closeModal3}
                                                className="cancel-button"
                                            >
                                                Cancel
                                            </button>
                                            <button type="button" className="save-button">
                                                Add
                                            </button>
                                        </div>
                                    </form>
                                </Modal>

                                <Modal
                                    isOpen={modalIsOpen4}
                                    onAfterOpen={afterOpenModal}
                                    // onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                    backdrop="static">
                                    <div className="modal-header">
                                        <h5 className="mb-0"> Edit Button</h5>
                                        <button
                                            className="modal-close-btn"
                                            onClick={closeModal4}
                                        >
                                            <i className="fa fa-times" aria-hidden="true"></i>
                                        </button>

                                    </div>

                                    <form>

                                        <div className="modal-body p-0">

                                            <div className="modal-create-group-name">
                                                <div className="form-group field-set-form mb-3">
                                                    <div className="form-group mb-3">
                                                        <label className="form-label">Button Name</label>
                                                        <input type="text" className="form-control cstm-field" placeholder="Button Name" name="Name"
                                                        />
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <label className="form-label">Button Link</label>
                                                        <input type="text" className="form-control cstm-field" placeholder="Button Link" name="Name"
                                                        />
                                                    </div>

                                                </div>
                                            </div>

                                            <div>

                                            </div>
                                        </div>

                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                onClick={closeModal4}
                                                className="cancel-button"
                                            >
                                                Cancel
                                            </button>
                                            <button type="button" className="save-button">
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </Modal>

                                <Modal
                                    isOpen={modalIsOpen5}
                                    onAfterOpen={afterOpenModal}
                                    // onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                    backdrop="static">
                                    <div className="modal-header">
                                        <h5 className="mb-0"> Add Image</h5>
                                        <button
                                            className="modal-close-btn"
                                            onClick={closeModal5}
                                        >
                                            <i className="fa fa-times" aria-hidden="true"></i>
                                        </button>

                                    </div>

                                    <form>

                                        <div className="modal-body p-0">

                                            <div className="modal-create-group-upld-img mb-3">
                                                <div className="create-group-upld-img">
                                                    <label>
                                                        {selectedImage && (
                                                            <div className="">
                                                                <img
                                                                    alt="not fount"
                                                                    width={"100%"}
                                                                    src={URL.createObjectURL(selectedImage)}
                                                                />
                                                                <br />
                                                                {/* <button onClick={() => setSelectedImage(null)}> Remove</button> */}
                                                            </div>
                                                        )}

                                                        <input
                                                            type="file"
                                                            name="myImage"
                                                            onChange={(event) => {
                                                             
                                                                setSelectedImage(event.target.files[0]);
                                                            }}
                                                        />
                                                    </label>
                                                </div>




                                            </div>

                                            <div>

                                            </div>
                                        </div>

                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                onClick={closeModal5}
                                                className="cancel-button"
                                            >
                                                Cancel
                                            </button>
                                            <button type="button" className="save-button">
                                                Add
                                            </button>
                                        </div>
                                    </form>
                                </Modal>

                                <nav className="navbar navbar-expand-md  template-navbr-edit edit-sec shadow" onClick={openModal} id="top-template-nav-header">
                                    <a className="navbar-brand " >
                                        <img src={logo} width={100} alt="logo" />
                                    </a>
                                    <span className='community-name-header'>Community Name</span>
                                    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#tmplt-collapsibleNavbar">
                                        <i className="fa fa-bars fa-1x" aria-hidden="true" />
                                    </button>
                                    <div className="collapse navbar-collapse" id="tmplt-collapsibleNavbar">
                                        <ul className="navbar-nav get-started-links ms-auto ">
                                            <li className="nav-item ">
                                                <a className="nav-link" >
                                                    Contact Us
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" >
                                                    Make a Donation
                                                </a>
                                            </li>

                                        </ul>
                                    </div>
                                </nav>

                                <div>
                                    <div className="section-edit-icon"></div>

                                    {
                                        mainSection ? <Mainsection data={setMainsections} /> :

                                           
                                            !isExists ? (
                                                
                                                <div className="templateherobanner templateherobanner-edit delete-sec">
                                                    <div className='section-edit-icon' onClick={() => setMainsections(true)}></div>
                                                    <section dangerouslySetInnerHTML={{ __html: localStorage.getItem("defaultFirstSection") }}>
                                                    </section>
                                                </div>
                                            ) : (

                                                <div className="templateherobanner templateherobanner-edit delete-sec">
                                                    <div className='section-edit-icon' onClick={() => setMainsections(true)}></div>
                                                    <section dangerouslySetInnerHTML={{ __html: sectionData[0].html }}>
                                                    </section>
                                                </div>
                                            )
                                            
                                    }
                                    
                                </div>

                                <div className="">

                                    {
                                        editor ? <AboutUs dataabout={setToEditor} /> :
                                            (<>

                                               
                                               {
                                                 !isExists?(
                                                    <div className="templateherobanner templateherobanner-edit delete-sec">
                                                        <div className='section-edit-icon' onClick={() => setToEditor(true)}></div>
                                                        <section dangerouslySetInnerHTML={{ __html: localStorage.getItem("defaultSecondSection") }}>
                                                        </section>
                                                    </div>
                                                    ):(
    
                                                    <div className="templateherobanner templateherobanner-edit delete-sec">
                                                        <div className='section-edit-icon' onClick={() => setToEditor(true)}></div>
                                                        <section dangerouslySetInnerHTML={{ __html: sectionData[1].html }}>
                                                        </section>
                                                    </div>
    
    
                                                    )
                                               }

                                            </>
                                            )
                                    }
                                </div>

                                <div className="">
                                    {communitygroup ? <Communitygroup datacomunity={setCommunitygroup} />
                                        :
                                        <>
                                            
                                            {
                                                 !isExists?(
                                                    <div className="templateherobanner templateherobanner-edit delete-sec">
                                                        <div className='section-edit-icon' onClick={() => setCommunitygroup(true)}></div>
                                                        
                                                        <section dangerouslySetInnerHTML={{ __html: localStorage.getItem("defaultThirdSection") }}>
                                                </section>
                                                    </div>
                                                    ):(
    
                                                    <div className="templateherobanner templateherobanner-edit delete-sec">
                                                        <div className='section-edit-icon' onClick={() => setCommunitygroup(true)}></div>
                                                        <section dangerouslySetInnerHTML={{ __html: sectionData[2].html }}>
                                                        </section>
                                                    </div>
    
    
                                                    )
                                               }
                                            
                                        </>
                                    }
                                </div>
                            </div>

                            <div className='mb-2'>

                                {footersection ? <Footersection datafooter={setFootersection} /> :
                                    <>

                                        {/* <div className='tmplt-footer'>
                                            <div className='section-edit-icon' onClick={() => setFootersection(true)}></div>
                                            <p className='m-0'>Copyright © 2022 Donaide. All rights reserved.</p>
                                        </div> */}
                                        {/* <section dangerouslySetInnerHTML={{ __html: localStorage.getItem("fourthSection") }}>
                                                </section> */}
                                                {
                                                 !isExists?(
                                                    <div className="templateherobanner templateherobanner-edit delete-sec">
                                                        <div className='section-edit-icon' onClick={() => setFootersection(true)}></div>
                                                        
                                                        <section dangerouslySetInnerHTML={{ __html: localStorage.getItem("defaultFourthSection") }}>
                                                </section>
                                                    </div>
                                                    ):(
    
                                                    <div className="templateherobanner templateherobanner-edit delete-sec">
                                                        <div className='section-edit-icon' onClick={() => setFootersection(true)}></div>
                                                        <section dangerouslySetInnerHTML={{ __html: sectionData[3].html }}>
                                                        </section>
                                                    </div>
    
    
                                                    )
                                               }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

function AboutUs(props) {
    // const [defaultTemplateData, setDefaultTemplateData] = useState([]);

    const [sectionData, setSectionData] = useState([]);
    const [isExists, setIsExists] = useState(false);

    const search = useLocation().search;
    const siteID1 = new URLSearchParams(search).get('id');
    localStorage.setItem("siteID", siteID1);

    useEffect(() => {
        GetCommunitySiteSection();
    },[sectionData]);

    const GetCommunitySiteSection = async () => {
        const siteID = localStorage.getItem("siteID");
        const res = await CommunityService.getCommunitySiteSection(siteID);

        if (res.data[0]._id) {
            setSectionData(res.data);
            setIsExists(true);
        }

        
    };

    const CheckExistsOrNot = async (id) => {
        const siteID = localStorage.getItem("siteID")
        const Exists = sectionData.some(item => siteID === item.siteID && 2===item.order);

        setIsExists(Exists);
        if (Exists) {
            UpdateCommunitySiteSection(id);
            //alert("if")
        }
        else {
            AddCommunitySiteSection(id);

        }
    }

    const AddCommunitySiteSection = async (id) => {

        const Content = editorRef.current.getContent();
        const siteID = localStorage.getItem("siteID");
        var data = {
            Order: id,
            SiteID: siteID,
            HTML: Content
        };

        CommunityService.addCommunitySiteSection(data)
            .then(userResponse => {
                if (userResponse.data.status === "SUCCESS") {
                    props.dataabout(false)
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    const UpdateCommunitySiteSection = async (id) => {
      
        //e.preventDefault();

        const Content = editorRef.current.getContent();

        const siteID = localStorage.getItem("siteID");
        var data = {
            Order: id,
            SiteID: siteID,
            HTML: Content
        };

        CommunityService.updateCommunitySiteSection(data)
            .then(userResponse => {
                if (userResponse.data.status === "SUCCESS") {
                    props.dataabout(false)
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    const editorRef = useRef(null);
  
    return (
        <>
            <div className='tiny-container mt-0'>

                <Editor onInit={(evt, editor) => editorRef.current = editor}

                    initialValue={!localStorage.getItem("isExists") ? localStorage.getItem("defaultSecondSection") : localStorage.getItem("secondSection")}

                    init={{
                        height: 910,
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
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            
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



            <div className='d-flex justify-content-end mt-3 pb-4 me-2' >

                <button className='btn btn-danger m-1' onClick={() => props.dataabout(false)}> Cancel</button>
                <button className='btn btn-primary m-1' onClick={() => CheckExistsOrNot(2)}> Save Changes</button>
            </div>



        </>

    );
}

function Communitygroup(props) {

    const [sectionData, setSectionData] = useState([]);
    const [isExists, setIsExists] = useState(false);

    const search = useLocation().search;
    const siteID1 = new URLSearchParams(search).get('id');
    localStorage.setItem("siteID", siteID1);

    useEffect(() => {
        GetCommunitySiteSection();
    },[sectionData]);

    const GetCommunitySiteSection = async () => {
        const siteID = localStorage.getItem("siteID");
        const res = await CommunityService.getCommunitySiteSection(siteID);

        if (res.data[0]._id) {
            setSectionData(res.data);
            setIsExists(true);
        }

       
    };

    const CheckExistsOrNot = async (id) => {
        const siteID = localStorage.getItem("siteID")
        const Exists = sectionData.some(item => siteID === item.siteID && 3===item.order);

        setIsExists(Exists);
        if (Exists) {
            UpdateCommunitySiteSection(id);
            //alert("if")
        }
        else {
            AddCommunitySiteSection(id);
            //alert("else")
        }
    }

    const AddCommunitySiteSection = async (id) => {

        const Content = editorRef.current.getContent();
        const siteID = localStorage.getItem("siteID");
        var data = {
            Order: id,
            SiteID: siteID,
            HTML: Content
        };

        CommunityService.addCommunitySiteSection(data)
            .then(userResponse => {
                if (userResponse.data.status === "SUCCESS") {
                    props.datacomunity(false)
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    const UpdateCommunitySiteSection = async (id) => {
       
        //e.preventDefault();

        const Content = editorRef.current.getContent();

        const siteID = localStorage.getItem("siteID");
        var data = {
            Order: id,
            SiteID: siteID,
            HTML: Content
        };

        CommunityService.updateCommunitySiteSection(data)
            .then(userResponse => {
                if (userResponse.data.status === "SUCCESS") {
                    props.datacomunity(false)
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    const editorRef = useRef(null);
 
    return (
      
        <>
            <div className='tiny-container mt-0'>
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}

                    initialValue={!localStorage.getItem("isExists") ? localStorage.getItem("defaultThirdSection") : localStorage.getItem("thirdSection")}

                    init={{
                        height: 530,
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
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            
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
            
            <div className='d-flex justify-content-end mt-3 pb-4 me-2' >

                <button className='btn btn-danger m-1' onClick={() => props.datacomunity(false)}> Cancel</button>
                <button className='btn btn-primary m-1' onClick={() => CheckExistsOrNot(3)}> Save Changes</button>
            </div>
        </>
    );
}

function Mainsection(porps) {

    const [sectionData, setSectionData] = useState([]);
    const [isExists, setIsExists] = useState(false);

    const search = useLocation().search;
    const siteID1 = new URLSearchParams(search).get('id');
    localStorage.setItem("siteID", siteID1);

    useEffect(() => {
        GetCommunitySiteSection();
     
    },[sectionData]);

    const GetCommunitySiteSection = async () => {
        const siteID = localStorage.getItem("siteID");
        const res = await CommunityService.getCommunitySiteSection(siteID);
        setSectionData(res.data);
        if (res.data[0]._id) {
            setSectionData(res.data);
            setIsExists(true);
        }

        
    };

    const CheckExistsOrNot = async (id) => {
        const siteID = localStorage.getItem("siteID")
        const Exists = sectionData.some(item => siteID === item.siteID && 1===item.order);

        setIsExists(Exists);
        if (Exists) {
            UpdateCommunitySiteSection(id);
            //alert("if")
        }
        else {
            AddCommunitySiteSection(id);

        }
    }

    const AddCommunitySiteSection = async (id) => {

        const Content = editorRef.current.getContent();
        const siteID = localStorage.getItem("siteID");
        var data = {
            Order: id,
            SiteID: siteID,
            HTML: Content
        };

        CommunityService.addCommunitySiteSection(data)
            .then(userResponse => {
                if (userResponse.data.status === "SUCCESS") {
                    porps.data(false);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    const UpdateCommunitySiteSection = async (id) => {
      
        //e.preventDefault();

        const Content = editorRef.current.getContent();

        const siteID = localStorage.getItem("siteID");
        var data = {
            Order: id,
            SiteID: siteID,
            HTML: Content
        };

        CommunityService.updateCommunitySiteSection(data)
            .then(userResponse => {
                if (userResponse.data.status === "SUCCESS") {
                    porps.data(false);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    const editorRef = useRef(null);

    return (
        <>
            <div className='tiny-container mt-0'>
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={!localStorage.getItem("isExists") ? localStorage.getItem("defaultFirstSection") : localStorage.getItem("firstSection")}
                    
                    init={{
                        height: 650,
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
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            
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

            <div className='d-flex justify-content-end mt-3 pb-4 me-2' >

                <button className='btn btn-danger m-1' onClick={() => porps.data(false)}> Cancel</button>
                <button className='btn btn-primary m-1' onClick={() => CheckExistsOrNot(1)}> Save Changes</button>
            </div>
        </>
    );
}

function Footersection(props) {

    const [sectionData, setSectionData] = useState([]);
    const [isExists, setIsExists] = useState(false);

    const search = useLocation().search;
    const siteID1 = new URLSearchParams(search).get('id');
    localStorage.setItem("siteID", siteID1);

    useEffect(() => {
        GetCommunitySiteSection();
    },[sectionData]);

    const GetCommunitySiteSection = async () => {
        const siteID = localStorage.getItem("siteID");
        const res = await CommunityService.getCommunitySiteSection(siteID);

        if (res.data[0]._id) {
            setSectionData(res.data);
            setIsExists(true);
        }

    
    };

    const CheckExistsOrNot = async (id) => {
        const siteID = localStorage.getItem("siteID")
        const Exists = sectionData.some(item => siteID === item.siteID && 4===item.order);

        setIsExists(Exists);
        if (Exists) {
            UpdateCommunitySiteSection(id);
            //alert("if")
        }
        else {
            AddCommunitySiteSection(id);

        }
    }

    const AddCommunitySiteSection = async (id) => {

        const Content = editorRef.current.getContent();
        const siteID = localStorage.getItem("siteID");
        var data = {
            Order: id,
            SiteID: siteID,
            HTML: Content
        };

        CommunityService.addCommunitySiteSection(data)
            .then(userResponse => {
                if (userResponse.data.status === "SUCCESS") {
                    props.datafooter(false)
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    const UpdateCommunitySiteSection = async (id) => {
    
        //e.preventDefault();

        const Content = editorRef.current.getContent();

        const siteID = localStorage.getItem("siteID");
        var data = {
            Order: id,
            SiteID: siteID,
            HTML: Content
        };

        CommunityService.updateCommunitySiteSection(data)
            .then(userResponse => {
                if (userResponse.data.status === "SUCCESS") {
                    props.datafooter(false)
                }
            })
            .catch(e => {
                console.log(e);
            });
    }


    const editorRef = useRef(null);
 
    return (
        <>
            <div className='tiny-container mt-0'>
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}

                    initialValue={!localStorage.getItem("isExists") ? localStorage.getItem("defaultFourthSection") : localStorage.getItem("fourthSection")}
    
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
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            
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
            <div className='d-flex justify-content-end mt-3 pb-4 me-2' >

                <button className='btn btn-danger m-1' onClick={() => props.datafooter(false)}> Cancel</button>
                <button className='btn btn-primary m-1' onClick={() => CheckExistsOrNot(4)}> Save Changes</button>
            </div>
        </>
    );
}

export default Published;