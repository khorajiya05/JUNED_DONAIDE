// import React from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import CommunityService from "../Services/CommunityService";
// import { Link } from 'react-router-dom';

// export const Dashboard = () => {

//   const [userCommunity, setUserCommunity] = useState([]);


//   const [isLoader, setIsLoader] = useState(true);



//   const getUserCommunityByUserID = async () => {
//     setIsLoader(true)
//     const userID = localStorage.getItem("userID");
//     const res = await CommunityService.getUserCommunityByUserID(userID);
//     setUserCommunity(res.data);
//     setIsLoader(false)
   
//   };

//   useEffect(() => {
//     getUserCommunityByUserID();
//   },[]);

//   return (
//     <div>
//       <div className="row">
//         <div className="col-12 grid-margin stretch-card">
//           <div className="card corona-gradient-card">
//             <div className="card-body py-0 px-0 px-sm-3">
//               <div className="row align-items-center">

//                 <div className="col-5 col-sm-7 col-xl-8 p-0">
//                   <h4 className="mb-1 mb-sm-0">All Communities</h4>

//                 </div>
//                 <div className="col-3 col-sm-2 col-xl-2 pl-0 text-center">
//                   <Link to="/#">Create new community</Link>
//                 </div>
//                 <div className="col-3 col-sm-2 col-xl-2 pl-0 text-center">
//                   <Link to="/#">Update Plan</Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
    
//               <div className="row">
//               {userCommunity&&userCommunity.length>0? userCommunity.map((data) => (
//               <div className="col-xl-3 col-sm-6 grid-margin stretch-card" key={data.communityName}>
//                 <div className="card">
                 
//                   <div className="card-body">
//                       <div className="row">
//                         <div className="col-9">
//                           <div className="d-flex align-items-center align-self-start">
//                             <h3 className="mb-0">{data.communityName}</h3>
      
//                           </div>
//                         </div>
//                         <div className="col-3">
//                           <div className="icon icon-box-success ">
//                             <span className="mdi mdi-arrow-top-right icon-item"></span>
//                           </div>
//                         </div>
//                       </div>
//                       <Link to="/edittemplate">Edit Community</Link>
//                     </div>
//                 </div>
//               </div>
//   ))
//   :  isLoader ? (
//     <div className="spinner-container">
//       <div className="loading-spinner"></div>
//     </div>
//   ) : (
//     <div className="spinner-container">
//     <h4> No Record Found</h4>
//   </div>

//   )
//   }
      
//             </div>
            
//     </div>
//   );
// }

// export default Dashboard;