import React, { Component,useState,useEffect } from "react";
import Mastercard from "../Assests/Images/master-card.png";
import Visa from "../Assests/Images/visa.png";
import Maestro from "../Assests/Images/Maestro.png";
import Americanexpress from "../Assests/Images/American-Express.png";
import { Link } from 'react-router-dom';
import MembershipService from "../Services/MemberShipService";
import PaymentService from "../Services/UserServices";
import Congratulation from "../Component/Congratulation";
import Header from '../Component/Header';
import ReactLoading from "react-loading";
import logo1 from "../Assests/Images/Combo-logo.png";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import useForm from "../Component/cardValidation/useForm";
import validateInfo from '../Component/cardValidation/validateInfo';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { AdminHeader } from "./admin-header";
import SideBar from "../Component/SideBar/index";
import UserService from "../Services/UserServices";

// class Payment extends Component {
let Payment = (props) => {


    const { handleChange, handleFocus, values } = useForm();
    const [errors, setErrors] = useState({});
    const [monthlyAmount,setMonthlyAmount] = useState(0);
    const [isPaymentSuccess,setIsPaymentSuccess] = useState(false);
    const [isSuccess,setIsSuccess] = useState(false);
    const [loader,setLoader] = useState(false);

    let getMonthlyAmount =async ()=> {
        try{
            const res = await MembershipService.getMemberShipByMemberShipID(props.membershipID)
            const data = res.data
       
            setMonthlyAmount(data.monthlyPrice);
        }catch(error){
            console.log(error.message)
        }
       
    }

    useEffect(()=>{
        getMonthlyAmount()
    },[])


   

    const handleSubmit = async(e) => {
        e.preventDefault()
        let response = await validateInfo(values);
        setErrors(validateInfo(values))

        if(response.variant === "success"){
            //alert(response.variant)
           

            savePaymentDetails(values)
        }
        else{
            NotificationManager.error(response.message,false)
        }

        

       

    };

    let savePaymentDetails = (cardDetail)=> {
        const splitValue = cardDetail.cardExpiration.split('/');
        const cardAmount = monthlyAmount.replace(",", "");
        var cardDetails = {
            email: props.email? props.email:localStorage.getItem("email"),
            amount: cardAmount,
            currency: props.currency,
            cardNumber: cardDetail.cardNumber,
            expireMonth: splitValue[0],
            expireYear: splitValue[1],
            cvv: cardDetail.cardSecurityCode,
            cardHolderName: cardDetail.cardName
        }
        setLoader(true);
        PaymentService.payment(cardDetails)
            .then(cardResponse => {

        
                
                if (cardResponse.data === "Success") {
                    upgradePlan();
                 
                }else {
                    setIsSuccess(false );
                }
            })
            .catch(e => {
                console.log(e);
            });
    }


    let upgradePlan = ()=> {
        const userid = localStorage.getItem("userID");
        var data = {
          UserID: userid,
          PlanID: props.membershipID,
        };
    
        UserService.upgradePlan(data)
          .then(userResponse => {
            if (userResponse.data.status === "SUCCESS") {
            //   this.setState({ isPayment: true });
            setIsPaymentSuccess(true);
            setIsSuccess(true);
            setLoader(false);
            }
          })
          .catch(e => {
            console.log(e);
          });
      }

  
    // render() {
    return (
        <div>
             {/* {window.location.href.split('/')[3] === "upgrade-plan"  ?
                <><AdminHeader /><SideBar/></>
                :<Header/>    }
             */}
            {!isPaymentSuccess && !loader ? (
            <main className="get-started-bg">
                <div className="main-outer-container">
                    <div className="main-inner-container">
                        <div className="inner-container-form">
                            <div className="inner-container-box">
                                <div className="plan-payment">
                                    <div className="plan-payment-outer-box">
                                        <div className="plan-payment-header">
                                            <h4 className="m-0"><Link to="/GetStarted" className="text-white"><i className="fa fa-long-arrow-left me-2"
                                                aria-hidden="true"></i></Link> Payment Details</h4>
                                        </div>
                                        <div className="plan-payment-body">

                                            <div className="plan-payment-amount">
                                                <h4>Payment amount</h4>
                                                <p>$ {monthlyAmount}</p>
                                            </div>

                                            <div className="plan-payment-images text-center">
                                                <img src={Visa} alt="Picture" />
                                                <img src={Mastercard} alt="Picture" />
                                                <img src={Maestro} alt="Picture" />
                                                <img src={Americanexpress} alt="Picture" />
                                            </div>

                                            <div className="plan-payment-form">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="field-set-form">
                                                        <div className="form-group mb-3">
                                                            <label htmlFor="email" className="form-label">Card Number</label>
                                                            {/* <input type="tel" className="form-control cstm-field" maxLength={19} id="" placeholder="2414 - 7512 - 3412 - 3456"
                                                                        name="cardNumber" value={this.state.cardNumber} onChange={this.onChangeCardNumber} />
                                                                    <span style={{ color: "red" }}>{this.state.errors["cardNumber"]}</span> */}
                                                            <input  className="form-control cstm-field"  id="" placeholder="2414 - 7512 - 3412 - 3456"
                                                                name="cardNumber"
                                                                type="text"
                                                                maxLength={16} 
                                                                data-testid="cardNumber"
                                                                value={values.cardNumber}
                                                                onChange={handleChange}
                                                                onFocus={handleFocus} />
                                                            {/* <span style={{ color: "red" }}> {errors.message}</span> */}
                                                        </div>

                                                        <div className="form-group">

                                                            <div className="field-expire-date">
                                                                <div className="w-100  mb-3">
                                                                    <label htmlFor="" className="form-label" >Expiry Date</label>
                                                                    <input 
                                                                    id="expirationdate" 
                                                                    type="text"
                                                                     maxLength={5} 
                                                                     inputMode="numeric" 
                                                                     name="cardExpiration"
                                                                     className="form-control cstm-field" 
                                                                     placeholder="MM / YY" 

                                                                     data-testid="cardExpiration"
                                                                     value={values.cardExpiration.replace(/^(\d\d)(\d)$/g,'$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g,'$1/$2').replace(/[^\d\/]/g,'')}
                                                                     onChange={handleChange}
                                                                     onFocus={handleFocus}
                                                                     />
                                                                    {/* <span style={{ color: "red" }}>{this.state.errors["expiryDate"]}</span> */}
                                                                </div>
                                                                <div className="divider"></div>
                                                                <div className="w-100  mb-3">
                                                                    <label htmlFor="" className="form-label" >CVV</label>
                                                                    <input 
                                                                    type="text"
                                                                    className="form-control cstm-field" 
                                                                     id="expires-year" 
                                                                     lassName="form-control cstm-field" 
                                                                     placeholder="cvv"
                                                                     allowed-pattern="[0-9]"
                                                                     maxLength={4} 
                                                                     data-testid="cardSecurityCode"
                                                                     name="cardSecurityCode"
                                                                     value={values.cardSecurityCode}
                                                                     onChange={handleChange}
                                                                     onFocus={handleFocus}
                                                                     />
                                                                    {/* <span style={{ color: "red" }}>{this.state.errors["cvvNumber"]}</span> */}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="" className="form-label">Card Holder Name</label>
                                                            <input 
                                                            type="text" 
                                                            id="cvv-number" 
                                                            name="cardName" 
                                                            className="form-control cstm-field" 
                                                            placeholder="Card Holder Name" 
                                                            data-testid="cardName"
                                                           
                                                            value={values.cardName}
                                                            onChange={handleChange}
                                                            onFocus={handleFocus}
                                                            />
                                                            {/* <span style={{ color: "red" }}> {errors.message}</span> */}
                                                            {/* <span style={{ color: "red" }}>{this.state.errors["cardHolderName"]}</span> */}
                                                        </div>
                                                        {/* <span style={{ color: "red" }}>{this.state.cardResponseError["Error"]}</span> */}
                                                    </div>

                                                    <div className="text-end">
                                                        <input type="submit" name="next" className="btn next next-button" defaultValue="Pay Now" />
                                                    </div>

                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            ) :
                    loader && !isPaymentSuccess?
                        (
                            <div className="logo-loader">
                            <div className="logo-loader-pulse pulse" id="Idloader"> <img src={logo1} width={140} alt="logo" /></div>
                     </div>
                        ) : (<Congratulation  type={props.type} CommunityData={props.CommunityData}/>)
                } 
        <NotificationContainer/>
        </div>
    )
    // }
}

export default Payment;
