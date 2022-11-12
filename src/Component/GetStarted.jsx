import React from "react";
import { Link } from "react-router-dom";
import Header from "../Component/Header";

export const GetStarted = () => {
  return (
    <div className="bg_header_new_homepge">
      <Header />
      <main className="get-started-bg custom_bg_homepage">
        <div className="container">
         <div className="row">
           <div className="col-md-9 mx-auto">
          <div className="main-inner-container text-center">
            <h3 className="get-started-prg mb-4">
             <small> We help innovators</small> to successfully build and launch new <span>community
              website and members app</span>
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              provident porro illum repudiandae, nisi voluptatem perspiciatis
              saepe doloribus magni in ab distinctio? Eos quaerat quod tempora
              eaque. Nemo labore perspiciatis facere excepturi nulla placeat
              repellendus dicta, modi debitis distinctio qui reprehenderit non
              facilis, accusantium ipsa ...
            </p>
            <div className="buttons_flex mt-5">
            <Link to="/about-us" className="btn btn-readmore btn-get-started">
              Read More {" "}
              <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i>
            </Link>
            <Link to="/onboarding" className="btn btn-get-started">
              Get Started{" "}
              <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i>
            </Link>
            </div>
          </div>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GetStarted;
