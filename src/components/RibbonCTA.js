import * as React from "react";
import { Link } from "gatsby";

const RibbonCTA = () => (
    <section className="section testimonials is-medium">
        <div className="container">
            <div className="content columns">
                <div className="column is-10">
                    <h4 className="mb-0 has-text-left line-height-one">Experience the ultimate fly fishing adventure in Ruidoso, New Mexico, all skill levels welcome.</h4>
                </div>
                <div className="column is-2">
                    <Link to="/book">
                        <button className="button is-rounded has-text-weight-semibold is-normal">Book Now</button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
);

export default RibbonCTA;
