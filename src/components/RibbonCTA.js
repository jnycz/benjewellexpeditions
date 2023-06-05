import * as React from "react";
import { Link } from "gatsby";

const RibbonCTA = () => (
    <section className="section ribbon-cta is-medium">
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-10">
                    <div className="content">
                        <div className="is-flex-desktop is-justify-content-center is-align-items-center is-justify-content-space-between">
                            <div className="has-text-weight-semibold has-text-centered">
                                <h4 className="mb-0">Experience the ultimate fly fishing adventure in Ruidoso, New Mexico, all skill levels welcome.</h4>
                            </div>
                            <div className="btn has-text-centered">
                                <Link to="/book">
                                    <button className="button is-rounded has-text-weight-semibold is-normal ribbon-btn">Book Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
);

export default RibbonCTA;
