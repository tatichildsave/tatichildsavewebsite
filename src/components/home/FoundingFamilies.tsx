import React from "react";
import {
  ArrowRight,
  Check,
  Rocket,
  Users,
  BadgePercent,
  Target,
} from "lucide-react";
import { APPLICATION_FORM_URL } from "../../config/application";

export function FoundingFamilies() {
  return (
    <section className="founding-offer" id="founding-families">
      <div className="ref-wrap founding-offer-layout">
        <div className="founding-offer-intro">
          <span className="founding-offer-label">Limited Time Offer</span>
          <h2>
            Join Our
            <br />
            <em>Founding Families</em>
          </h2>
          <p>
            Be part of the first cohort of children building lifelong money
            confidence with TATI. Founding families get exclusive benefits and
            help shape the future of the platform.
          </p>
          <img
            src="/assets/refinement/family.webp"
            alt="A mother and daughter sharing a joyful hug"
            width="350"
            height="284"
            loading="lazy"
          />
        </div>
        <div className="founding-offer-content">
          <div className="founding-benefits">
            {[
              {
                Icon: Rocket,
                title: "Early Access",
                text: "First to experience the full platform before general release",
              },
              {
                Icon: Users,
                title: "Community",
                text: "Lifetime connection to the TATI founding cohort community",
              },
              {
                Icon: BadgePercent,
                title: "Founder Pricing",
                text: "Special rate for founding families (locked for life)",
              },
            ].map(({ Icon, title, text }) => (
              <article key={title}>
                <span className="ref-icon">
                  <Icon size={25} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="founding-eligibility">
            <h3>Who can join?</h3>
            <ul>
              {[
                "Your child is 8–12 years old",
                "You’re ready to support their learning journey (3–5 hours/week)",
                "You’re based in Ghana, Nigeria, Kenya, or other African countries",
                "You’re excited about changing how children relate to money",
              ].map((item) => (
                <li key={item}>
                  <Check size={17} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <a
            className="ref-button founding-apply-button"
            href={APPLICATION_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Our Founding Families <ArrowRight size={18} />
          </a>
          <p className="founding-form-note">
            Complete our application on Google Forms. Opens in a new tab.
          </p>
          <div className="founding-capacity">
            <Target size={26} />
            <p>
              <strong>Only 50 spots available</strong> in this founding cohort.
              We’re keeping the group intimate so we can deliver excellent
              support to every family. Applications reviewed on a rolling basis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
