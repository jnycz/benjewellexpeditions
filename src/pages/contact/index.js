import * as React from "react";
import { navigate } from "gatsby-link";
import Layout from "../../components/Layout";
// import Recaptcha from "react-google-recaptcha";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // handleRecaptcha = value => {
  //   this.setState({ "g-recaptcha-response": value });
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Book Your Trip</h1>
              <div className="columns">
                <div className="column">
                  <p>Thanks for your interest in booking with Jewell Expeditions.  Please fill out the form with as much information as possible.  This will help expedite the process and allow me to plan a customized trip based on the information provided.</p>
                  <p>Once you submit the form I will be notified by email. I will then reach out by phone or email (based on your selection) to discuss the trip details and to answer any questions.</p>
                </div>
                <div className="column">
                  <form
                    name="contact"
                    method="post"
                    action="/contact/thanks/"
                    data-netlify="true"
                    // data-netlify-recaptcha="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={this.handleSubmit}
                  >
                  {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                  <input type="hidden" name="form-name" value="contact" />
                  <div hidden>
                    <label>
                      Don’t fill this out:{" "}
                      <input name="bot-field" onChange={this.handleChange} />
                    </label>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={"name"}>
                      Full Name
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={"text"}
                        name={"name"}
                        onChange={this.handleChange}
                        id={"name"}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={"email"}>
                      Email
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={"email"}
                        name={"email"}
                        onChange={this.handleChange}
                        id={"email"}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={"phone"}>
                      Phone
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={"tel"}
                        name={"phone"}
                        onChange={this.handleChange}
                        id={"phone"}
                        // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={"contacted"}>
                      How do you wish to be contacted?
                    </label>
                    <div className="select">
                      <select
                        className="select"
                        type={"select"}
                        name={"contacted"}
                        onChange={this.handleChange}
                        id={"contacted"}
                        required={false}
                      >
                        <option value="" disabled="">Select contact method</option>
                        <option name="phone" value="Phone">Phone</option>
                        <option name="email" value="Email">Email</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={"age_weight_height"}>
                      Trip Date
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        name={"age_weight_height"}
                        onChange={this.handleChange}
                        id={"age_weight_height"}
                        required={false}
                      />
                    </div>
                    <p className="help">Enter desired date of trip using this format: mm/dd/yy</p>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={"experience"}>
                      What is your fly fishing experience level?
                    </label>
                    <div className="select">
                      <select
                        className="select"
                        type={"select"}
                        name={"experience"}
                        onChange={this.handleChange}
                        id={"experience"}
                        required={false}
                      >
                        <option value="" disabled="">Select level</option>
                        <option name="rookie" value="Rookie">Rookie</option>
                        <option name="novice" value="Novice">Novice</option>
                        <option name="experienced" value="Experienced">Experienced</option>
                      </select>
                    </div>
                    <p className="help">Rookie has never fly fished, novice fly fishes 5-10 times a year, experienced fishes at least once a week 50+ times a year for many years.</p>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={"hiking"}>
                      What is your hiking ability?
                    </label>
                    <div className="select">
                      <select
                        className="select"
                        type={"select"}
                        name={"hiking"}
                        onChange={this.handleChange}
                        id={"hiking"}
                        required={false}
                      >
                        <option value="" disabled="">Select ability</option>
                        <option name="less_than_one" value="Less than 1 mile">Less than 1 mile</option>
                        <option name="1_2_miles" value="1-2 miles">1-2 miles</option>
                        <option name="3_4_miles" value="3-4 miles">3-4 miles</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={"age_weight_height"}>
                      Please specify your age, weight, and height.  
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        name={"age_weight_height"}
                        onChange={this.handleChange}
                        id={"age_weight_height"}
                        required={false}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={"trip"}>
                      What type of a trip are you looking to plan?
                    </label>
                    <div className="select">
                      <select
                        className="select"
                        type={"select"}
                        name={"trip"}
                        onChange={this.handleChange}
                        id={"trip"}
                        required={false}
                      >
                        <option value="" disabled="">Select trip type</option>
                        <option name="walk_wade" value="Walk/wade">Walk/wade</option>
                        <option name="belly_boat_trip" value="Belly boat trip">Belly boat trip</option>
                        <option name="combo_boat_walk" value="Combo trip boat and walk">Combo trip boat and walk</option>
                      </select>
                    </div>
                    <p className="help">Half days are on one body of water, full days can be river and lake or 2 lakes.</p>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={"goals"}>
                      What are your goals for the day?
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        name={"goals"}
                        onChange={this.handleChange}
                        id={"goals"}
                        required={false}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={"gear"}>
                      Do you have gear?
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        name={"gear"}
                        onChange={this.handleChange}
                        id={"gear"}
                        required={false}
                      />
                    </div>
                    <p className="help">Please specify what gear you will bring such as rod and real, waders, etc.  Note rod size and wt. Example 9 ft. 5 wt.</p>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={"restrictions"}>
                      Do you have any food allergies or dietary restrictions?
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        name={"restrictions"}
                        onChange={this.handleChange}
                        id={"restrictions"}
                        required={false}
                      />
                    </div>
                    <p className="help">Only valid for full day trips.</p>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={"message"}>
                      Additional information
                    </label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        name={"message"}
                        onChange={this.handleChange}
                        id={"message"}
                        required={false}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={"referral"}>
                      How did you find Jewell Expeditions?
                    </label>
                    <div className="select">
                      <select
                        className="select"
                        type={"select"}
                        name={"referral"}
                        onChange={this.handleChange}
                        id={"referral"}
                        required={true}
                      >
                        <option value="" disabled="">Select</option>
                        <option name="Website" value="Website">Website</option>
                        <option name="Repeat" value="Repeat">Repeat client</option>
                        <option name="Señor" value="Señor">Señor Fishing Outdoor Gear store</option>
                      </select>
                    </div>
                  </div>
                  {/* <Recaptcha
                    ref="recaptcha"
                    sitekey={process.env.GATSBY_SITE_RECAPTCHA_KEY}
                    onChange={this.handleRecaptcha}
                  /> */}
                  <div className="field">
                    <button className="button is-link" type="submit">
                      Send
                    </button>
                  </div>
                </form>
                </div>
              </div>

            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
