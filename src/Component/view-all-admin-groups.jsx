
import React from 'react';
import Header, { AdminHeader } from './admin-header';
import logo from  "../Assests/Images/Logo.svg";



import {Link} from 'react-router-dom';



const Congratulation = () => {

    


 
   

    return(
<div>
<AdminHeader/>
    <main className="">
        <div className="main-outer-container">
        <div className="main-inner-container">
                    <div className="inner-container-template">

                        <div className='inner-content-height'>

                        

                            <div className="admin-group-page">

                                <div className='adm-group-heading'>
                                    <h3><Link to="/admin-group"> <i className="fa fa-long-arrow-left me-2" aria-hidden="true"></i></Link>All Groups</h3>
                                    <Link to="#" className="btn tmplt-btn"><i className="fa fa-plus me-2"
                                    aria-hidden="true"></i>Create</Link>
                                </div>


                                <div className="view-all-adm-group-cards">
                                    
                                    <div className="view-all-adm-group-container">
                                       
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-one.jpg" alt="Picture" /> <div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div>
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-two.jpg" alt="Picture" /><div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div>
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-three.jpg" alt="Picture" /><div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div>
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-four.jpg" alt="Picture" /><div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div>
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-five.jpg" alt="Picture" /><div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div>
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-six.jpg" alt="Picture" /><div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div>
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-six.jpg" alt="Picture" /><div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div>   
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-three.jpg" alt="Picture" /><div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div>
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-four.jpg" alt="Picture" /><div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div>     
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-one.jpg" alt="Picture" /><div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div>
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-two.jpg" alt="Picture" /><div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div>
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-three.jpg" alt="Picture" /><div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div>
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-four.jpg" alt="Picture" /><div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div>
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-five.jpg" alt="Picture" /><div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div>
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-six.jpg" alt="Picture" /><div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div>   
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-three.jpg" alt="Picture" /><div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div>
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-four.jpg" alt="Picture" /><div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div> 
                                            <div className='owl-cstm-item'><Link to="/admin-group-detail" className='item'><img src="Images/item-two.jpg" alt="Picture" /><div className='group-type'><p>Group Name Here</p><span>Group Type</span></div></Link></div>      
                                        
                                    </div>
                                </div>



                              








                            </div>
                        </div>


                        <div className='tmplt-footer'>
                            <p className='m-0'>Copyright ©  2022-2022 logo name. All rights reserved.</p>
                        </div>
                        
                    </div>
                   
                </div>
                
                
        



        </div>
    </main>
</div>
    )
}

export default Congratulation;