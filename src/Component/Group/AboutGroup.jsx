import React from "react";

const AboutGroup = (props) => {
  const { groupDetails } = props;
  return (
    <div className="container-fluid admin-group-page bg-grey-wall">
      <div className="row justify-content-center mt-3  ">
        <div className="col-md-8">
          <div className="card border-0 shadow custom-card-design">
            <div className="sec-first">
              <h3>About</h3>
            </div>
            <div className="flex--about">
              <span>
                <i className="fa fa-globe" aria-hidden="true"></i>
              </span>
              <div className="areatext">
                <h3>
                  {groupDetails.isPublic === true ? " Public" : "Private"}
                </h3>
                <p>
                  {groupDetails.isPublic === true
                    ? "Anyone can see who's in the community and what they post."
                    : "Only Group member can see the group details."}
                </p>
              </div>
            </div>
            <div className="flex--about">
              <span>
                <i className="fa fa-eye" aria-hidden="true"></i>
              </span>
              <div className="areatext">
                <h3>Visible</h3>
                <p>
                  {groupDetails.isPublic === true
                    ? "Anyone can see who's in the community and what they post."
                    : "Only Group member can see the group details."}
                </p>
              </div>
            </div>
            <div className="flex--about">
              <span>
              <i className="fa fa-film" aria-hidden="true"></i>
              </span>
              <div className="areatext">
                <h3>Description</h3>
                <p>
                {groupDetails.description
                  ? groupDetails.description
                  : "No Description"}
                </p>
              </div>
            </div>    
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutGroup;
