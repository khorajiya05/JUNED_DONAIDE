import React from 'react';

const data = () => {
  return (
    <div>
        
      <div
        class='main-div'
        style=' width: 100%; text-align: center; color: #fff; position: relative;'
      >
        <img
          style='height:500px; object-fit: cover; width: 100%; display: flex; align-items: center; 
  justify-content: center; text-align: center; color: #fff;'
          src='../Images/herobanner.svg'
        />
        <blockquote class='banner-content' style='margin:0;'>
          <div
            class='banner-content-div'
            style='position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 65%;'
          >
            <h3
              style=' sans-serif !important, sans-serif !important; font-weight:600;  margin-bottom: 30px;
                                      font-size: 38px;
                                      text-shadow: 0px 4px 3px rgb(0 0 0 / 10%);'
            >
              Content Heading
            </h3>
            <h4
              style=' sans-serif ; margin-bottom: 10px;
                                      font-size: 24px;
                                      font-weight: 300;
                                      text-shadow: 0px 4px 3px rgb(0 0 0 / 10%);'
            >
              Lorem Ipsum is simply dummy text of the printing and type setting
              Ipsum is simply adummy text.
            </h4>
          </div>
        </blockquote>
      </div>
      <div style=' width: 100%; text-align: center; color: #fff; position: relative;'>
        <img
          style='height:500px; object-fit: cover; width: 100%; display: flex; align-items: center;
   justify-content: center; text-align: center; color: #fff;'
          src='../Images/herobanner.svg'
        />
        <blockquote class='banner-content' style='margin:0;'>
          <div
            class='banner-content-div'
            style='width: 75%; text-align: center; padding: 50px 0; margin: auto; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);'
          >
            <h3 style=' sans-serif !important, sans-serif !important font-weight: 500; margin-bottom: 0px; font-size: 38px; text-shadow: 0px 4px 3px rgb(0 0 0 / 10%);'>
              Content Heading
            </h3>
            <h4 style='color: #fff; font-size: 20px; font-weight: 400; margin-bottom: 20px;'>
              Lorem Ipsum is simply dummy text of the printing and type setting
              Ipsum is simply adummy text text of the printing text of the
              printing and type setting Ipsum is simply adummy text and type
              setting Ipsum is simply adummy text of the printing and type
              setting Ipsum is simply adummy text.
            </h4>
            <div
              class='button-flex'
              style='width:100%; display:flex; justify-content:center'
            >
              <div style='border-radius: 50px; overflow: hidden;'>
                <button
                  class='btn tmplt-btn'
                  style='margin:0 0px; border: 2px solid #fff; color:#fff; background:transparent; border-radius: 50px; padding: 10px 33px; font-weight: 500; font-size: 16px; position: relative; transition: 0.3s ease-in-out;'
                >
                  Button
                </button>
              </div>
              <div style='margin-left:10px; border-radius: 50px; overflow: hidden;'>
                <button
                  class='btn tmplt-btn'
                  style=' margin:0 0px; border: 2px solid #fff; color:#fff; background:transparent; border-radius: 50px; padding: 10px 33px; font-weight: 500; font-size: 16px; position: relative; transition: 0.3s ease-in-out;'
                >
                  Button
                </button>
              </div>
            </div>
          </div>
        </blockquote>
      </div>
    
    </div>
  );
};

export default data;
