import "./ServiceLevelAgreement.css";

export default function ServiceLevelAgreement() {
  return (
    <main className="sla-page">
      <div className="sla-container">

        <header className="sla-hero">
          <div className="sla-eyebrow">
            DPF OS · ENTERPRISE LEGAL
          </div>

          <h1>Service Level Agreement</h1>

          <p>
            This Service Level Agreement defines the service standards,
            availability commitments, support framework and operational
            responsibilities applicable to eligible DPF OS enterprise
            and Club OS customers.
          </p>

          <div className="sla-meta">
            <span>Version 1.0</span>
            <span>Effective Date: August 17, 2026</span>
            <span>Enterprise Service Framework</span>
          </div>
        </header>


        <section className="sla-section">
          <h2>1. Purpose</h2>

          <p>
            This Service Level Agreement establishes the operational
            service expectations applicable to DPF OS enterprise
            customers using authorized DPF OS environments.
          </p>

          <p>
            It is intended to define service availability, support
            responsibilities, incident handling and operational
            communication standards.
          </p>
        </section>


        <section className="sla-section">
          <h2>2. Scope</h2>

          <p>
            This SLA applies only to services expressly identified as
            covered services in the applicable Enterprise Agreement,
            Order Form or Statement of Work.
          </p>

          <p>
            Unless expressly stated otherwise, demo environments,
            development environments, experimental features and
            third-party services are not subject to the availability
            commitments described in this SLA.
          </p>
        </section>


        <section className="sla-section">
          <h2>3. Service Availability</h2>

          <p>
            DPF OS will use commercially reasonable efforts to maintain
            availability of covered production services.
          </p>

          <div className="sla-table-wrap">
            <table className="sla-table">
              <thead>
                <tr>
                  <th>Service Tier</th>
                  <th>Target Availability</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Standard Enterprise</td>
                  <td>99.5%</td>
                </tr>

                <tr>
                  <td>Premium Enterprise</td>
                  <td>99.9%</td>
                </tr>

                <tr>
                  <td>Custom Enterprise</td>
                  <td>As specified in Order Form</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Availability targets apply only to covered production
            services and are measured according to the applicable
            service measurement methodology.
          </p>
        </section>


        <section className="sla-section">
          <h2>4. Scheduled Maintenance</h2>

          <p>
            DPF OS may perform scheduled maintenance when reasonably
            necessary to maintain security, reliability, performance or
            functionality.
          </p>

          <p>
            Where reasonably practicable, advance notice will be provided
            for planned maintenance that is expected to materially affect
            service availability.
          </p>
        </section>


        <section className="sla-section">
          <h2>5. Emergency Maintenance</h2>

          <p>
            DPF OS may perform emergency maintenance without prior
            notice where necessary to address security vulnerabilities,
            service failures, infrastructure problems or other urgent
            operational risks.
          </p>
        </section>


        <section className="sla-section">
          <h2>6. Support Services</h2>

          <p>
            Enterprise customers may receive technical and operational
            support according to the support level specified in their
            applicable commercial agreement.
          </p>

          <p>
            Support may include:
          </p>

          <ul>
            <li>Technical issue investigation.</li>
            <li>Service incident handling.</li>
            <li>Account and access assistance.</li>
            <li>Platform configuration assistance.</li>
            <li>Operational troubleshooting.</li>
            <li>Service status communication.</li>
          </ul>
        </section>


        <section className="sla-section">
          <h2>7. Incident Severity</h2>

          <p>
            Service incidents may be classified according to their
            operational impact.
          </p>

          <div className="sla-table-wrap">
            <table className="sla-table">
              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Description</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>SEV-1</td>
                  <td>
                    Critical service outage or major production
                    functionality failure.
                  </td>
                </tr>

                <tr>
                  <td>SEV-2</td>
                  <td>
                    Significant degradation affecting important
                    production functionality.
                  </td>
                </tr>

                <tr>
                  <td>SEV-3</td>
                  <td>
                    Limited functionality issue with an available
                    workaround.
                  </td>
                </tr>

                <tr>
                  <td>SEV-4</td>
                  <td>
                    General inquiry, minor issue or informational request.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>


        <section className="sla-section">
          <h2>8. Response Targets</h2>

          <p>
            Target response times may vary according to the customer's
            contracted support tier.
          </p>

          <div className="sla-table-wrap">
            <table className="sla-table">
              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Target Initial Response</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>SEV-1</td>
                  <td>Within 1 hour</td>
                </tr>

                <tr>
                  <td>SEV-2</td>
                  <td>Within 4 hours</td>
                </tr>

                <tr>
                  <td>SEV-3</td>
                  <td>Within 1 business day</td>
                </tr>

                <tr>
                  <td>SEV-4</td>
                  <td>Within 2 business days</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Response time means the target period for acknowledging and
            beginning assessment of an eligible support request. It does
            not necessarily represent the time required to resolve the
            underlying issue.
          </p>
        </section>


        <section className="sla-section">
          <h2>9. Incident Communication</h2>

          <p>
            For significant service incidents, DPF OS may provide
            customers with status updates describing the known impact,
            investigation status and relevant recovery actions.
          </p>

          <p>
            Incident communications will be provided through the
            communication channels designated for the applicable
            customer relationship.
          </p>
        </section>


        <section className="sla-section">
          <h2>10. Customer Responsibilities</h2>

          <p>
            The Customer is responsible for maintaining the operational
            conditions necessary for effective use of the Services.
          </p>

          <ul>
            <li>
              Maintaining appropriate user access controls.
            </li>

            <li>
              Protecting account credentials.
            </li>

            <li>
              Maintaining accurate organizational information.
            </li>

            <li>
              Providing sufficient information when reporting incidents.
            </li>

            <li>
              Cooperating with reasonable troubleshooting requests.
            </li>

            <li>
              Maintaining compatible devices, networks and third-party
              dependencies.
            </li>
          </ul>
        </section>


        <section className="sla-section">
          <h2>11. Exclusions</h2>

          <p>
            Availability commitments and support targets do not apply to
            service interruptions caused by circumstances outside the
            reasonable control of DPF OS.
          </p>

          <p>
            Such circumstances may include:
          </p>

          <ul>
            <li>Customer-controlled systems or infrastructure.</li>
            <li>Third-party service failures.</li>
            <li>Internet or telecommunications failures.</li>
            <li>Force majeure events.</li>
            <li>Unauthorized modifications to the Services.</li>
            <li>Customer misuse or security compromise.</li>
            <li>Scheduled or emergency maintenance.</li>
          </ul>
        </section>


        <section className="sla-section">
          <h2>12. Security Incidents</h2>

          <p>
            Security incidents affecting covered services will be
            investigated according to DPF OS security and incident
            response procedures.
          </p>

          <p>
            Where Personal Data is affected, the applicable Data
            Processing Terms and Privacy Policy will govern the relevant
            data protection obligations.
          </p>
        </section>


        <section className="sla-section">
          <h2>13. Service Monitoring</h2>

          <p>
            DPF OS may monitor system performance, availability,
            infrastructure health and operational events for the purpose
            of maintaining and improving service reliability and
            security.
          </p>
        </section>


        <section className="sla-section">
          <h2>14. Service Credits</h2>

          <p>
            Unless expressly provided in the applicable commercial
            agreement, failure to meet an availability target does not
            automatically create a right to financial compensation.
          </p>

          <p>
            Where service credits or other remedies apply, their terms,
            calculation and limitations will be defined in the applicable
            Order Form or Enterprise Agreement.
          </p>
        </section>


        <section className="sla-section">
          <h2>15. Changes to the Service</h2>

          <p>
            DPF OS may evolve, modify or improve the Services as part of
            continuous platform development.
          </p>

          <p>
            Material changes affecting contracted enterprise
            functionality will be managed in accordance with the
            applicable commercial agreement.
          </p>
        </section>


        <section className="sla-section">
          <h2>16. Service Dependencies</h2>

          <p>
            Certain DPF OS services may depend on external infrastructure,
            hosting, authentication, communication, storage, security or
            other technical providers.
          </p>

          <p>
            DPF OS will take reasonable steps to manage such dependencies
            but cannot guarantee availability of services that are
            controlled exclusively by independent third parties.
          </p>
        </section>


        <section className="sla-section">
          <h2>17. Reporting and Review</h2>

          <p>
            Enterprise customers may request reasonable service
            information relating to covered incidents, availability or
            operational performance where such reporting is included in
            the applicable service tier.
          </p>
        </section>


        <section className="sla-section">
          <h2>18. Relationship with Other Agreements</h2>

          <p>
            This SLA supplements the applicable DPF OS Enterprise
            Agreement, Order Form, Statement of Work and Data Processing
            Terms.
          </p>

          <p>
            In the event of a conflict, the order of precedence specified
            in the applicable commercial agreement will apply.
          </p>
        </section>


        <section className="sla-section">
          <h2>19. Governing Law</h2>

          <p>
            The governing law and dispute resolution mechanism applicable
            to this SLA shall be determined by the applicable Enterprise
            Agreement.
          </p>
        </section>


        <section className="sla-section">
          <h2>20. Contact</h2>

          <p>
            Enterprise support and service notices should be submitted
            through the support channels designated in the applicable
            customer agreement.
          </p>

          <p className="sla-placeholder">
            Enterprise Support Contact:
            [INSERT OFFICIAL SUPPORT EMAIL]
          </p>
        </section>


        <footer className="sla-footer">
          <div>
            <strong>DPF OS</strong>
            <span>
              Dynamic Positional Football Operating System
            </span>
          </div>

          <div>
            <span>Service Level Agreement</span>
            <span>Version 1.0</span>
          </div>
        </footer>

      </div>
    </main>
  );
}