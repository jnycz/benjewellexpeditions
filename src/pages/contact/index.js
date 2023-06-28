import * as React from "react";
import { navigate } from "gatsby-link";
import { Link } from "gatsby";
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
        <div className="bg-brand-green">


        <section className="section">
          <div className="container">
            <div className="content">
              <div className="columns is-centered">
                <div className="column is-10 booking-form">
                  <h1>Contact</h1>
                  <p>To book a trip, please use the <Link to="/book">Book a Trip</Link> form. For all other questions please use this contact form or reach out by phone or email.</p>
                  
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

                    {/* Begin fields */}

                    <div className="columns">
                      <div className="field column">
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
                      <div className="field column">
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
                      <div className="field column">
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
                    </div>

                    <div className="columns">
                      <div className="field column">
                        <label className="label" htmlFor={"contacted"}>
                          How do you wish to be contacted?
                        </label>
                        <div className="select is-fullwidth">
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
                    </div>


                    <div className="field">
                      <label className="label" htmlFor={"message"}>
                        Message
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
                      <div className="select is-fullwidth">
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
                      <button className="button is-rounded contact has-text-weight-semibold is-normal bg-brand-green bg-brand-green-hover has-text-white" type="submit">
                        Send
                      </button>
                    </div>
                  </form>

                </div>
              </div>

            </div>
          </div>
        </section>
        </div>
      </Layout>
    );
  }
}
