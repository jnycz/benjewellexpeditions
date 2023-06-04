import * as React from "react";
import { Link } from "gatsby";

const RibbonCTA = () => (
    <div className="has-text-centered bg-brand-blue py-6">
        <div className="container">
            <div className="content is-flex is-justify-content-center is-flex-direction-row is-align-items-center">
                <h4 className="mb-0">Experience the ultimate fly fishing adventure in Ruidoso, New Mexico, all skill levels welcome.</h4>
                <Link to="/book">
                <button className="button is-rounded contact has-text-weight-semibold is-normal">Book Now</button>
                </Link>
            </div>
        </div>
    </div>
);

export default RibbonCTA;
