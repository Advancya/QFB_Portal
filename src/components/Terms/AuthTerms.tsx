import React, { useContext, useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../providers/AuthProvider";

interface iAuthTerms {
  showAuthTermsModal: boolean;
  hideAuthTermsModal: () => void;
}
function AuthTerms(authTermsProps: iAuthTerms) {
  const history = useHistory();
  const currentContext = useContext(AuthContext);
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);

  return (
    <Modal
      show={authTermsProps.showAuthTermsModal}
      onHide={authTermsProps.hideAuthTermsModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
      dialogClassName="myModal"
    >
      <Modal.Header>
        <div className="modal-header-text">
          <div className="d-flex align-items-center">
            <div className="ib-text">
              <h4 id="newReqTxt">{local_Strings.AnonymousTermsTitle}</h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="close"
          onClick={authTermsProps.hideAuthTermsModal}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box p-4  scrollabel-modal-box ">
          {currentContext.language === "en" ? (
            <div className="EN">
              <ol type="I">
                <li>
                  <strong>
                    <u>Terminology</u>
                  </strong>
                  <p>
                    <strong>QFB Digital Banking:</strong> An application that
                    enables QFB Clients to give electronic instructions or
                    requests electronically, and to use a number of banking
                    services as provided by QFB; and to conduct e-transactions
                    remotely. QFB Digital Banking also includes the "Online
                    Services" as defined in the General Terms and Conditions.
                  </p>
                  <p>
                    <strong>Client:</strong> is an individual or an entity that
                    holds an Account at QFB.
                  </p>
                  <p>
                    <strong>Services:</strong> refers to the online services and
                    facilities to enable the Client to give instructions to us
                    or communicate with us for (i) operating accounts, (ii)
                    conducting banking, investment, financial and other
                    transactions and dealings of various nature and (iii)
                    obtaining services, products, information, goods, benefits
                    and privileges offered by QFB or its affiliates.
                  </p>
                  <p>
                    <strong>E-Transactions:</strong> through using QFB Digital
                    Banking the Client acknowledges and agrees that all the
                    electronic transactions (E-Transactions) provided by QFB
                    Digital Banking shall be deemed to be as authentic and as
                    valid as live transactions and are irrevocable. The Client
                    also acknowledges and agrees that the Bank shall rely upon
                    and enforce the instructions submitted electronically by the
                    Client to the same extent as if such instructions were
                    written and signed on paper and ink.
                  </p>
                  <p>
                    <strong>Qualified Investor:</strong> refers to the natural
                    persons and entities that meet the requirements stated in
                    the definition above who shall be considered eligible for to
                    subscribe for the QFB products and services.
                  </p>
                  <p>
                    <strong>Eligibility Criteria:</strong>
                  </p>
                  <ol>
                    <li>
                      <strong>Natural Persons: </strong>
                      <ul>
                        <li>
                          Shall have a minimum net worth of four (4) million
                          QAR, excluding the calculation of the value of the
                          primary residence of the Qualified Investor.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong>Corporate Entities:</strong>
                      <ul>
                        <li>
                          a body corporate that has (or, at any time during the
                          previous 2 years, has had) either:
                          <ul>
                            <li>
                              called-up share capital, or net assets, of QR 18
                              million or more; or
                            </li>
                            <li>
                              annual net turnover of QR 30 million or more;
                            </li>
                          </ul>
                        </li>
                        <li>
                          a body corporate that has a holding company or
                          subsidiary that has (or, at any time during the
                          previous 2 years, has had) either:
                          <ul>
                            <li>
                              called-up share capital, or net assets, of at
                              least QR 18 million; or
                            </li>
                            <li>
                              annual net turnover of QR 30 million or more;
                            </li>
                          </ul>
                        </li>
                        <li>
                          a partnership or unincorporated association that has
                          (or, at any time during the previous 2 years, has had)
                          either:
                          <ul>
                            <li>
                              net assets of QR 18 million or more (calculated,
                              in the case of a limited partnership, without
                              deducting loans owing to any of the partners); or
                            </li>
                            <li>
                              annual net turnover of QR 30 million or more.
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong>Eligible Counterparty:</strong>
                      <ul>
                        <li>an authorized firm;</li>
                        <li>a regulated financial institution;</li>
                        <li>
                          an eligible clearing house or eligible exchange;
                        </li>
                        <li>
                          a government, government agency, or central bank or
                          other national monetary authority, of any
                          jurisdiction;
                        </li>
                        <li>
                          a state investment body, or a body charged with, or
                          intervening in, the management of the public debt;
                        </li>
                        <li>
                          a supranational organisation, the members of which are
                          jurisdictions, central banks or national monetary
                          authorities.
                        </li>
                      </ul>
                    </li>
                  </ol>
                  <p>
                    <strong>Fees: </strong>Refers to the charges imposed on the
                    transactions and products made available by the Bank. The
                    Bank reserves the right to change or vary such charges at
                    any time, at its sole discretion. <br />
                    To get the fee schedule, please contact your Relationship
                    Manager.  
                  </p>
                  <p>
                    <strong>Personal Data:</strong> which means any information
                    and documents pertaining to the client relating to their
                    usage of the Bank's services including but not limited to
                    their contact details, bank information, national
                    identification numbers, nationalities, their income and
                    wealth, their relationship with the Bank and other financial
                    institutions, and any other information and documents that
                    includes any sensitive data that are of a personal nature.
                  </p>
                </li>
                <li>
                  <strong>
                    <u>General Provisions: </u>
                  </strong>
                  <ol type="1">
                    <li>
                      The following general terms and conditions (the "Terms and
                      Conditions") form the basis of the relationship between
                      the Bank and the Client availing the Electronic Banking
                      Services (the "Services") provided by the Bank to the
                      Client and is considered complementary and supplementary
                      to the General Terms and Conditions of the Bank.
                    </li>
                    <li>
                      The Client acknowledges when he uses and accesses the
                      Services that he has viewed, accepted and shall comply
                      with all the conditions and security instructions
                      mentioned in this Terms and Conditions.
                    </li>
                    <li>
                      The Bank reserves the right to amend and/or supplement
                      provisions related to QFB Digital Banking. Customers will
                      be automatically notified of such amendments through the
                      App. The client shall accept the updated Terms and
                      Conditions if he wishes to continue using QFB Digital
                      Banking.
                    </li>
                    <li>
                      The Customer's signature or e-signature on any
                      application, request form or any other document relating
                      to any of the Services mentioned in these Terms and
                      Conditions shall be the Customer's Confirmation of having
                      read, understood and accepted these Terms and Conditions.
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    <u>Termination:</u>
                  </strong>
                  <p>
                    The Bank reserves its right to terminate the services
                    provided by QFB Digital Banking. The Client may also
                    terminate it through cancelling his subscription to QFB
                    Digital Banking by providing the Bank with a notice within
                    ten (10) days. The Client may notify the Bank via mail or
                    e-mail.
                  </p>
                </li>
                <li>
                  <strong>
                    <u>Security Provisions:</u>
                  </strong>
                  <ol type="1">
                    <li>
                      The Client agrees to comply with the Security Procedures
                      and any other instructions the Bank may issue. The Client
                      agrees his responsibility to set up, maintain and
                      regularly review security arrangements concerning its
                      access to and use of the E-channel.
                    </li>
                    <li>
                      By signing these Terms and Conditions the Client confirms
                      that he has assessed the security arrangements set out in
                      these Terms and Conditions and have determined that they
                      are adequate to protect his interests.
                    </li>
                    <li>
                      The Client must notify the Bank as soon as reasonably
                      possible upon becoming aware of any actual or attempted
                      unauthorized access to his account or any unauthorized
                      transaction or attempt to execute an unauthorized
                      transaction pursuant to these Terms and Conditions.
                    </li>
                    <li>
                      The Client must ensure that neither the Customer, the
                      Users nor its employees do anything during or after the
                      term of these Terms and Conditions which may impact the
                      security of the Client or the systems or security of any
                      of the Banks' customers.
                    </li>
                    <li>
                      Access to the Electronic Banking Service is password
                      protected. The Client shall create his own personal
                      password for his exclusive use. The password shall be at
                      his own responsibility and shall always be kept
                      confidential as per the security requirements and shall
                      not reveal his password to any other person.
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    <u>Availability of the Services:</u>
                  </strong>
                  <ol type="1">
                    <li>
                      The Bank – at its sole discretion – shall be entitled to
                      suspend, withdraw or limit the use of all or part of the
                      Services for the protection of its Customer. The Bank
                      shall notify the Client of any such procedure.
                    </li>
                    <li>
                      The Bank shall make reasonable effort to provide the
                      Services. However, the Bank shall not be liable for any
                      failure to provide all or part of the Bank Electronic
                      Banking Services for any reason including in particular
                      any suspension due to maintenance or upgrades or defect to
                      the Banks' systems or those at any party the Bank uses to
                      provide the Services.
                    </li>
                    <li>
                      A transaction being carried out is not always simultaneous
                      with an Instruction given. Certain transactions may take
                      more time to process and certain Instructions will only be
                      processed during the Business Day and during normal
                      working hours although the Services are accessible at any
                      time of the day.
                    </li>
                    <li>
                      From time to time, the Bank may offer available to the
                      Client enhancements, improvements and upgrades to the
                      existing Services, which shall be governed by the
                      provisions of these Terms and Conditions.
                    </li>
                    <li>
                      From time to time the Bank may suspend some or all of the
                      E-Channels or Services for routine, non-routine or
                      emergency maintenance or for any other reason where we
                      reasonably consider it necessary to do so.
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    <u>Laws and Regulations:</u>
                  </strong>
                  <ol type="1">
                    <li>
                      Through using QFB Digital Banking the client irrevocably
                      agrees to comply with the laws and regulations issued by
                      the regulatory authorities in Qatar, including but not
                      limited to Qatar Financial Centre Regulatory Authority
                      (QFCRA) and any other regulatory authority governing
                      investments and products that the Client has subscribed
                      to.
                    </li>
                    <li>
                      The client shall also provide all the documents and
                      information to complete the requirements including but not
                      limited to Know-Your-Client ("KYC") and Anti-Money
                      Laundering requirements as amended from time to time.
                    </li>
                    <li>
                      If the client violates these laws and regulations, the
                      Bank shall have the right to suspend the provided
                      services, freeze the products or freeze the client's
                      account as the Bank deems appropriate and at the its sole
                      discretion.
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    <u>Specific conditions for some Electronic Service:</u>
                  </strong>
                  <ol type="1">
                    <li>
                      <strong>SMS Alert Service</strong>
                      <ul>
                        <li>
                          The Client authorizes the bank to send SMS to his
                          mobile number registered at the Bank in case of
                          password verification or password reset.
                        </li>
                        <li>
                          The Client shall inform the Bank immediately if his
                          mobile phone is stolen or his number is changed. The
                          Bank shall immediately suspend all the services upon
                          such notice. However, the Bank will not be liable for
                          any unauthorized transaction that took place prior the
                          notice.
                        </li>
                        <li>
                          The Client accepts that any information he receives
                          under the SMS Alert Service is for his information and
                          he shall be responsible for maintaining its
                          confidentiality.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong>Money Transfer:</strong>
                      <ul>
                        <li>
                          The client shall be the sole responsible for the
                          accuracy of the beneficiaries' details.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong>Investment related services:</strong>
                      <ul>
                        <li>
                          Before subscribing to any investment related services,
                          the client shall ensure that he meets the requirements
                          of a Qualified investors as defined in the Terminology
                          section these Terms and Conditions.
                        </li>
                      </ul>
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    <u>Miscellaneous:</u>
                  </strong>
                  <ol type="1">
                    <li>
                      These Terms and Conditions shall form the entire agreement
                      between the parties concerning the supply and use of the
                      Services. It supersedes any pre-existing agreements
                      communications, representations and discussions between
                      the Bank and the Client relating to the E-Channels and
                      Services which are hereby terminated. The Client will not
                      have a right of action against the Bank arising from any
                      previous agreement, communication, representation and
                      discussion in respect to the Services, except in the case
                      of fraud. Any other agreements between the Bank and the
                      Customer, terms of business and/or mandates relating to
                      the conduct of your accounts or our provision of related
                      services shall remain unaffected, save that if any
                      conflict between such terms and the terms of these Terms
                      and Conditions arises, these Terms and Conditions shall
                      prevail in so far as the conflict relates to the subject
                      matter of the Services.
                    </li>
                    <li>
                      If the Client and the Bank agrees to communicate with each
                      other (or any third party) via e-mail, the internet, Short
                      Message Service (SMS), or any other method, you
                      acknowledge the risks that any such communications may be
                      intercepted, monitored, amended or otherwise interfered
                      with by third parties. We are not responsible or liable to
                      you or any third party in the event of any such occurrence
                      in relation to any communication between us and you (or
                      which appears to have been made on your behalf), or any
                      communication you ask us to enter into with any third
                      party.
                    </li>
                    <li>
                      The Client authorizes the Bank to record the telephone
                      conversations concerning the service offered to the Client
                      through its specialised center. The Client recognises
                      these recordings as true evidence. The Bank shall also be
                      entitled to use these recordings in the cases it considers
                      using them.
                    </li>
                    <li>
                      The Client agrees to pay our fees and other charges (where
                      applicable) for providing the E- Services as the Bank
                      advise the Client from time to time, and the Bank are
                      entitled to debit the Customer's account(s) wherever they
                      are situated and wherever they are opened, with the amount
                      of any such fees and/or charges. The current fees and
                      other charges for providing the Services. The Bank may
                      vary our fees and/or charges and the frequency and dates
                      of payment.
                    </li>
                    <li>
                      Each party shall take all reasonable precautions to ensure
                      that communications through the E-Channels are not
                      affected by computer viruses, Trojan horse programs (such
                      as key loggers) and other harmful programs or components.
                    </li>
                    <li>
                      Each of the terms of these Terms and Conditions is
                      severable from the other and if one or more of them
                      becomes void, illegal or unenforceable, the remainder will
                      not be affected in any way.
                    </li>
                    <li>
                      The rights of the Bank under these Terms and Conditions
                      are cumulative and not exclusive of its rights under any
                      applicable law, and may be waived only in writing and
                      specifically, and any delay in the exercise or
                      non-exercise of any such right is not a waiver of that
                      right.
                    </li>
                    <li>
                      The Client may not assign any right or benefit under any
                      provision of these Terms and Conditions without the Bank
                      prior written consent.
                    </li>
                    <li>
                      The Bank may make modifications to these Terms and
                      Conditions for any reasons or due or required or in
                      connection with changes in any laws and/or regulations and
                      we will inform you as soon as possible for the effective
                      operation of the Services.
                    </li>
                    <li>
                      No addition to or modification of any provision of these
                      Terms and Conditions shall be binding upon us unless made
                      by a written instrument signed by the Bank's duly
                      authorized representative.
                    </li>
                    <li>
                      Certain jurisdictions may have particular legal or
                      regulatory requirements that require you to agree to
                      supplementary terms. Where such supplementary terms are
                      necessary, the Bank will provide the Client with those
                      terms in writing together with these Terms and Conditions
                      and other relevant documentation, and such supplementary
                      terms shall form an integral part of these Terms and
                      Conditions.
                    </li>
                    <li>
                      Where the Client is a corporate or joint account, these
                      Terms and Conditions will continue in force unless revoked
                      by notice given by any one authorized person(s),
                      notwithstanding any change of name of the partnership,
                      selling of the company admission of a new partner(s) or
                      any partner ceasing to be a member of the partnership by
                      reason of death or otherwise.
                    </li>
                    <li>
                      The Client hereby explicitly acknowledges the validity of
                      the Bank's automatic and electronic extracts establishing
                      the Client instructions and transactions through the
                      electronic service whether these extracts are in English
                      or Arabic appearing on the internet system.
                    </li>
                    <li>
                      The Client authorizes the Bank to store the internet,
                      mobile or email correspondences by using the modern
                      computer archiving systems or other. The Client also
                      accepts that extracted copies are identical to the
                      original and have full authority in matters of proof and
                      confirms the validity of his signature on the documents
                      archived in the stated manner.
                    </li>
                    <li>
                      The Bank shall not be responsible for any unauthorized
                      access by third parties.
                    </li>
                    <li>
                      The Client authorizes the Bank to cooperate with any other
                      party to transfer the information sent by SMS authorizes
                      the showing of information on the screens of the
                      electronic equipment. Bank shall not be responsible where
                      a third party – without the Bank's approval or
                      participation–succeeds in obtaining information of the
                      accounts opened in the Client's name at the Bank.
                    </li>
                    <li>
                      The Client hereby authorizes the Bank to accept and deal
                      with his instructions to perform payments and transfers to
                      and from the account after the Bank verifies the
                      authenticity of the transaction through its security
                      system.
                    </li>
                    <li>
                      For joint accounts, the Bank shall deal with the
                      instructions issued by authorized person(s), the account
                      holders shall be responsible for the executed transactions
                      and the payment of any indebtedness resulting on the
                      account.
                    </li>
                    <li>
                      The Client authorizes the Bank to send alerts,
                      announcements, new products and marketing campaign using
                      any of the electronic means that includes and not limited
                      to internet, email, SMS; the Client shall not consider the
                      foregoing as a violation of his privacy.
                    </li>
                    <li>
                      The Client shall indemnify the Bank, its employees and
                      agents and hold them harmless against any liability,
                      damage, loss, proceedings, claim, lawsuits, cost or
                      expenses whatsoever incurred by the Bank or its employees
                      as a result of (i) the entry by the Bank into these terms
                      and conditions, (ii) any transactions instructed by the
                      Client under this agreement or (iii) the breach by the
                      Client of these terms and conditions, any agreement or
                      contract related thereto.
                    </li>
                    <li>
                      The Bank shall be entitled at any time, without prior
                      notice, to freeze and / or set-off any amount due or
                      payable to the Bank by the Client from any of the
                      Customer`s accounts held with the Bank irrespective of
                      their types and names or whether they are individual and /
                      or joint and whether in local or foreign currency whereby
                      each such amount shall be considered as a security /
                      collateral for the other accounts jointly or severally for
                      the settlement of any indebtedness due from the Client or
                      its guarantor to the Bank.
                    </li>
                    <li>
                      The Client acknowledges that if the Bank sends data
                      through any electronic means – as requested by the Client
                      - it is the Customer's responsibility to maintain the
                      confidentiality of this data. The Bank shall not be
                      responsible for the leakage of this data or the Customer's
                      non-receipt of the data for any reason beyond the Bank's
                      control. The charges for the service shall be debited from
                      the Customer's accounts and may not be entitled to claim
                      any compensation.
                    </li>
                    <li>
                      The Client is obliged when he travels outside of the State
                      of Qatar, to notify the Bank of the country to which he is
                      traveling and the period expected to be outside Qatar, and
                      the Client is obliged to ensure that his mobile phone
                      number registered with the Bank is available during his
                      travel. The Bank shall not bear any damages that the
                      Client may incur as a result of his failure to comply with
                      this clause.
                    </li>
                    <li>
                      In case the Bank becomes aware of the death of a Client,
                      the Bank shall have the right to suspend the Digital
                      Banking services and to freeze the deceased Client's bank
                      account(s) at the Bank's sole discretion until such time
                      where the Bank receives instructions from Family
                      (Inheritance) Court or any other specialized governmental
                      entity that has jurisdiction over inheritance issues
                      regarding the account of the deceased Client. This shall
                      also be applicable to joint bank accounts even if the
                      other joint account holder(s) is/are not deceased.
                    </li>
                    <li>
                      The copyright and all other rights in QFB Digital Banking
                      and in any user guides or other information the Bank
                      provides to the Client, remains owned by the Bank or by
                      the person who licenses it to the Bank, if applicable. The
                      usage of QFB Digital Banking by the client shall not be
                      deemed as a license, a waiver or a grant of any right to
                      the Client. The Client will obtain no rights, title or
                      interest in any such materials or intellectual property
                      rights relating to these services.
                      <br />
                    </li>
                    <li>
                      In case of conflict, discrepancies or difference between
                      the Arabic Version and the English Version, the English
                      version shall prevail and shall therefore be the binding
                      version.
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    <u>Force Majeure and Other Rights:</u>
                  </strong>
                  <ol type="1">
                    <li>
                      The Bank will not be liable for any loss (including loss
                      of profit), damage, delay or failure in performing any of
                      its duties relating to this Agreement caused in whole or
                      in part by the action of any government or governmental
                      agency, natural occurrence, law or regulation (or any
                      change in the interpretation thereof),injunction, currency
                      restriction, sanction, exchange control, industrial action
                      (whether involving its staff or not), war, terrorist
                      action, equipment failure, or interruption to power
                      supplies or anything else beyond its reasonable control.
                      The Bank will attempt to notify the Client as soon as is
                      reasonably practicable of the existence of such
                      circumstances.
                    </li>
                    <li>
                      The Bank is required to act in accordance with the laws
                      and regulations operating in various jurisdictions which
                      relate to the prevention of money laundering, terrorist
                      financing and the provision of financial and other
                      services to any persons or entities which may be subject
                      to sanctions.
                    </li>
                    <li>
                      The Bank may take any action which it, in its sole and
                      absolute discretion, considers appropriate to act in
                      accordance with all such laws and regulations. Such action
                      may include but not limited to the interception and
                      investigation of any payment messages and other
                      information or Client Instructions sent to or by the
                      Client or on its behalf via the Bank's systems or any
                      E-Channel; and making further enquiries as to whether a
                      name which might refer to a sanctioned person or entity
                      actually refers to that person or entity. The Bank may
                      take, and may instruct third party to take, any action
                      which it, in its sole and absolute discretion, considers
                      appropriate to act in accordance with all such laws and
                      regulations. Such action may include but is not limited to
                      the interception and investigation of any payment messages
                      and other information or Client Instructions sent to or by
                      the Client or on its behalf via the Bank's systems or any
                      E-Channel; and making further enquiries as to whether a
                      name which might refer to a sanctioned person or entity
                      actually refers to that person or entity. Notwithstanding
                      any provision of this Agreement, the Bank shall not be
                      liable for any loss (whether direct, consequential or loss
                      of profit, data or damage suffered by any party arising
                      out of: (a) any delay or failure by the Bank in performing
                      any of its duties under these terms and conditions or
                      other obligations caused in whole or in part by any steps
                      which any of them, in their sole and absolute discretion,
                      considers appropriate to act in accordance with all such
                      laws and regulations; or (b) the exercise of any of the
                      Bank's rights under this clause. In certain circumstances,
                      the action which the Bank may take may prevent or cause a
                      delay in the processing of certain information. Subject to
                      the overriding requirements of any applicable laws and
                      regulations, the Bank will endeavor to notify the Client
                      of the existence of such circumstances as soon as is
                      reasonably practicable.
                    </li>
                    <li>
                      The Bank and any entity it engages its services shall not
                      be responsible for losses arising from delays in sending
                      or transmitting, non-receipt or loss of information, or
                      breakdowns or emergencies such as technical problems,
                      suspension of work, strikes, force majeure, natural
                      disasters, security problems, measures taken by the
                      state's authorities or any other events. The Client shall
                      not hold the Bank liable for damages sustained by the
                      Customer, the technology, the electronic and electrical
                      equipment in the case of any of the above events.
                      <br />
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    <u>Personal Data Protection:</u>
                  </strong>
                  <p>
                    By using the Bank's Services, the Client here agrees and
                    consents that the Bank collects, processes, maintains,
                    transfers and discloses the Client's personal sensitive data
                    in accordance with the applicable QFC's Data Protection
                    Regulation as amended from time to time.
                  </p>
                </li>
                <li>
                  <strong>
                    <u>Disclaimer:</u>
                  </strong>
                  <ol type="1">
                    <li>
                      Before you subscribe for or use any of QFB Digital Banking
                      services, please be advised to read these Terms and
                      Conditions carefully.
                    </li>
                    <li>
                      The Client acknowledges and agrees that all the electronic
                      transactions (E-Transactions) provided by QFB Digital
                      Banking shall be deemed to be as authentic and as valid as
                      live transactions and are irrevocable.
                    </li>
                    <li>
                      All information provided on these Terms and Conditions is
                      as is, without warranties, conditions, or representations
                      of any kind, including warranties of non-infringement,
                      merchantability or fitness for a particular purpose. All
                      users of this Application acknowledge and agree that there
                      is no assurance that information on the Application is
                      timely, accurate or complete and it may be changed or
                      amended from time to time.
                    </li>
                    <li>
                      In no event shall Qatar First Bank (QFB) or any of its
                      subsidiaries or affiliates or their respective directors,
                      officers or employees be liable for any direct or
                      indirect, incidental, special or consequential damages,
                      including, but not limited to, lost data or lost profits,
                      even if it has been advised of the possibility of such
                      damages, arising out of or relating to the use of this
                      Application.
                    </li>
                    <li>
                      By clicking "Accept and Agree", you acknowledge that you
                      are an authorized User of this Application and you
                      irrevocably agree to access and use QFB Digital Banking in
                      accordance with these Terms and Conditions and the General
                      Terms and Conditions of the Bank.
                    </li>
                    <li>
                      QFB Digital Banking is only intended for "Qualified
                      Investors". By using this Application, you acknowledge at
                      your own risk that you fulfill the eligibility criteria
                      for "Qualified Investors" as defined under these Terms and
                      Conditions and as set out under the QFC Regulations as
                      amended from time to time.
                    </li>
                    <li>
                      In case of discrepancy between the English and the Arabic
                      versions of these Terms and Conditions, the English
                      version shall apply and prevail.
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    <u>Privacy Policy:</u>
                  </strong>
                  <p>
                    At Qatar First Bank LLC (Public), QFB Office Building, 29
                    Suhaim Bin Hamad Street Al Sadd, PO Box 28028, Doha, Qatar
                    (hereinafter referred to as "we" or "QFB"), we value your
                    relationship and honor your trust. As a result, you can rely
                    on us to respect and help protect your personal and
                    company-related data.
                  </p>
                  <p>
                    We respect your privacy and secure your data. We employ
                    strict security standards and safeguards to help protect
                    your personal data and prevent fraud.
                  </p>
                  <p>
                    We offer continued protection. We protect your personal
                    data, whether you are a current or former customer.
                  </p>
                  <ol type="1">
                    <li>
                      About this Privacy Statement
                      <p>
                        This Privacy Statement explains how we handle and
                        protect your personal and company-related data, how we
                        gather this data, and how we manage this data to serve
                        you. We may change this Statement from time to time as
                        the need arises to accurately reflect how we gather and
                        manage your data.
                      </p>
                      <p>
                        All changes to this Statement will be effective upon
                        posting to this website without any other notice to you.
                        Use of the website following such changes constitutes
                        your acceptance of the revised Privacy Statement then in
                        effect. We encourage you to frequently visit this
                        Privacy Statement for modifications.
                      </p>
                    </li>
                    <li>
                      Personal Data
                      <p>
                        Personal data, where used in this Privacy Statement
                        shall mean any information concerning personal or
                        material circumstances of an identified or identifiable
                        natural person, such as your name, your telephone number
                        or your email address.
                      </p>
                      <p>
                        The Client acknowledges that the personal data of any
                        third parties or beneficiaries that is provided by the
                        Client to QFB Digital Banking are also subject to
                        Personal Data provisions of these Terms and Conditions.
                      </p>
                    </li>
                    <li>
                      Scope of this Privacy Statement
                      <p>
                        This Privacy Statement applies to personal data
                        submitted to us through this website and its various
                        applications, our online advertisements and electronic
                        communications.
                      </p>
                    </li>
                    <li>
                      Administration of this Privacy Statement
                      <p>
                        Any questions or concerns about the interpretation or
                        operation of this Statement or about what may or may not
                        be done with regard to personal information should be
                        directed in the first instance to our legal department,
                        which can be contacted at LegalDept@QFB.com.qa.
                      </p>
                    </li>
                    <li>
                      What Information We Collect and Why?
                      <p>
                        The information we collect from you at this website may
                        include the following: your name, gender, home and work
                        contact details, business title, email address, IP
                        address, telephone number, date of birth, nationality,
                        payment information, purchase history and your reviews
                        and opinions about our products and services.
                      </p>
                      <ol type="i">
                        <li>
                          INFORMATION PROVIDED BY YOU
                          <p>
                            If you use this website or its various applications,
                            you may be required to provide personal information
                            as part of registration, including but not limited
                            to: first name, last name, company name, title,
                            address, city, state, zip, telephone, email address,
                            preferred method of contact (email, phone, postal),
                            account number, service and product interest
                            information, and intended use of services or
                            products. In addition, you may choose to provide
                            additional information relating to yourself or your
                            companies to take advantage of different services
                            available on this website.
                          </p>
                          <p>
                            Personal information provided on our website in
                            connection with an application for employment will
                            be used to determine your suitability for a position
                            with QFB. Such information may also be used to
                            monitor our recruitment initiatives and equal
                            opportunities policies. Applicant details may be
                            disclosed to third parties to verify or obtain
                            additional information including education
                            institutions, current/previous employers and credit
                            reference agencies. Credit reference agencies record
                            these searches and you can contact us to find out
                            which agencies we used. Unsuccessful applications
                            may be retained to match your skills to future job
                            opportunities. These are usually retained for up to
                            12 months but let us know if you do not wish for us
                            to retain your personal information for this
                            purpose.
                          </p>
                          <p>
                            If you contact us by email, we may keep a record of
                            that correspondence.
                          </p>
                          <p>
                            While we generally do not require you to provide
                            sensitive personal data, such as that which reveals
                            race, national origin, political opinions, religion
                            or philosophical beliefs, or that reveals criminal
                            convictions, health or marital status, if it becomes
                            necessary for us to collect such information we may
                            provide the opportunity to affirmatively and
                            explicitly consent to the processing and disclosure
                            of such sensitive data.
                          </p>
                        </li>
                        <li>
                          LOG FILES
                          <p>
                            We also periodically gather certain information
                            automatically and store it in log files. This
                            information includes browser type, Internet service
                            provider (ISP), referring/exit pages, operating
                            system, date/time stamp and click-stream data.
                          </p>
                        </li>
                        <li>
                          COOKIES
                          <p>
                            Our website stores "cookies" for analytical
                            purposes, in order to make the use of the website
                            more convenient. "Cookies" are small files stored on
                            your computer with the aid of your browser. If you
                            wish, you can prevent the storing of "cookies" on
                            your computer through appropriate browser settings.
                            To learn how to delete or disable cookies please
                            visit
                            <a
                              href="www.allaboutcookies.org/manage-cookies"
                              target="_blank"
                            >
                              www.allaboutcookies.org/manage-cookies
                            </a>
                            . Please note that this might restrict the
                            performance and function range of our offering.
                          </p>
                        </li>
                        <li>
                          CHILDREN'S INFORMATION
                          <p>
                            We do not knowingly collect information from
                            children under the age of 18 and we do not target
                            our websites to children under 18. If we determine
                            that an individual under the age of 18 has submitted
                            information to this site, we will delete that
                            information.
                          </p>
                        </li>
                      </ol>
                    </li>
                    <li>
                      Use of Your Personal Data
                      <ol type="i">
                        <li>
                          Personal Data INPUT BY THE USER
                          <p>We may use the personal data we collect:</p>
                          <p>
                            to provide you with information, goods and/or
                            services which you have requested;
                            <br />
                            to contact you in connection with support-related
                            activities;
                            <br />
                            to contact you in the event that we have
                            announcements regarding this website or the
                            applications within this website;
                            <br />
                            to fulfil any other purpose for which you provided
                            it;
                            <br />
                            for billing and collection purposes;
                            <br />
                            in any other way we may describe when you provide
                            the data; or
                            <br />
                            for any other purpose with your consent.
                            <br />
                            We may also use your data to contact you about our
                            goods and services that may be of interest to you.
                            If you do not want us to use your information in
                            this way or any of the ways described above, please
                            (i) contact us at the following email address:
                            communications@qfb.com.qa, (ii) check the relevant
                            box or ensure the relevant box is checked on the
                            form on which we collect your data for this purpose,
                            or (iii) follow the unsubscribe instructions in the
                            email or other communication you have received.
                          </p>
                          <p>
                            We do not generally use your personal information
                            collected on this website for marketing purposes but
                            if you apply for products and services via any of
                            our affiliates, your information may be used by us
                            to inform you about other related products and
                            services that may be of interest.
                          </p>
                        </li>
                        <li>
                          LOG FILES
                          <p>
                            Log files give us a general picture of who is
                            visiting our website and which pages are viewed most
                            often. This information is not specific to an
                            individual viewer and is only collected to assist us
                            in the maintenance, administration and improvement
                            of our website. Log files are collected mainly for
                            research purposes to see what pages, services and
                            information are of greatest interest to current and
                            potential clients. We do not link this automatically
                            collected data to personal data.
                          </p>
                        </li>
                      </ol>
                    </li>
                    <li>
                      Disclosure and Transfer of Your Information
                      <p>
                        In some instances, we may be asked to disclose certain
                        personal data pursuant to a court order, subpoena,
                        search warrant or law enforcement request or to protect
                        the rights, property or safety of our company, our
                        customers, our employees or others. We may also disclose
                        your information in order to enforce our terms of use or
                        to protect the rights or property and/or the personal
                        safety of (in each case) us, our staff and customers. In
                        addition, we may disclose your information in order to
                        permit us to pursue available remedies or limit the
                        damages that we may sustain, to respond to an emergency
                        and/or in the event that we sell (or propose to sell)
                        any property, business or assets, we may disclose your
                        information to the prospective buyer.
                      </p>
                      <ol type="i">
                        <li>
                          QFB AFFILIATES AND SERVICE PROVIDERS
                          <p>
                            We may disclose your personal data on a need to know
                            basis to any member of our company group. Some
                            affiliates of QFB have their own websites with their
                            own unique privacy statements, tailored to the
                            services they provide. We encourage you to read
                            those privacy statements carefully when you visit
                            those affiliated sites.
                          </p>
                          <p>
                            From time to time we may engage our affiliated
                            entities or other carefully selected third parties
                            to provide services on our behalf, in particular to
                            collect, process and use your personal data on our
                            behalf. We may disclose your information to such
                            service providers compliant with applicable data
                            protection law and provided that they agree to use
                            your information only for the purposes of providing
                            services to us.
                          </p>
                        </li>
                        <li>
                          TRANSFERS OVERSEAS
                          <p>
                            The personal data we receive will be held on our
                            computers and systems in Qatar and may be accessed
                            by or given to our staff, one of our affiliates or
                            carefully selected suppliers working in Qatar or
                            outside of Qatar. By submitting your information to
                            us, you agree to this transfer, storing and
                            processing.
                          </p>
                        </li>
                      </ol>
                    </li>
                    <li>
                      Revocation of Consent
                      <p>
                        You may revoke your consent to your information being
                        used by us. To revoke your consent, please send an email
                        to: information@qfb.com.qa.
                      </p>
                      <p>
                        We will promptly process your request, but you may
                        continue to receive some communications from us while
                        your request is being processed. Thereafter we may still
                        communicate with you to respond to your new inquiries or
                        in connection with services you have engaged.
                      </p>
                    </li>
                    <li>
                      Website Links to Other Sites
                      <p>
                        For your convenience, our website may contain links to
                        websites that are owned or operated by third parties not
                        affiliated with QFB. We can make no promises or
                        guarantees regarding personal data collection or privacy
                        practices on websites that are not owned or operated by
                        QFB. We strongly suggest that you review such third
                        parties' privacy policies before providing any personal
                        data to them. These other sites may send their own
                        cookies to users, collect data, or solicit personal
                        data. You should contact these entities directly if you
                        have any questions about their use of the information
                        that they collect.
                      </p>
                    </li>
                    <li>
                      Steps We Take to Ensure your Privacy
                      <p>
                        The security of your personal data is important to us.
                        We use generally accepted, industry standard tools and
                        techniques to protect your personal data against
                        unauthorized disclosure. However, no method of
                        transmission over the Internet, or method of electronic
                        storage, is 100% secure. Therefore, while we strive to
                        use commercially reasonable means to protect your
                        personal information, we cannot guarantee its absolute
                        security.
                      </p>
                      <ol type="i">
                        <li>
                          PERIMETER SECURITY
                          <p>
                            We use firewalls to secure the perimeter of our
                            information network and monitor our systems on a
                            regular basis.
                          </p>
                        </li>
                      </ol>
                    </li>
                    <li>
                      Access to Your Information
                      <p>
                        We provide you with reasonable access to the personal
                        information we hold about you. To learn what information
                        we hold about you or to correct, amend or delete that
                        information, please contact us using the contact details
                        above.
                      </p>
                    </li>
                  </ol>
                </li>
              </ol>
            </div>
          ) : (
            <div className="Ar">
              <ol type="I">
                <li>
                  <strong>
                    <u>المفاهيم</u>
                  </strong>
                  <p>
                    <strong>خدمات بنك قطر الأول الإلكترونية: </strong> تطبيق
                    إلكتروني يتيح لعملاء بنك قطر الأول إعطاء توجيهات أو تقديم
                    طلبات إلكترونياُ للبنك، كما يتيح لهم إمكانية استخدام مجموعة
                    من الخدمات البنكية الإلكترونية التي يقدمها البنك والقيام
                    بمعاملاتهم عن بعد. كما تتضمن خدمات بنك قطر الأول "الخدمات
                    المصرفية عبر الإنترنت" كما ورد تعريفها في الشروط والأحكام
                    العامة.
                  </p>
                  <p>
                    <strong>العميل:</strong> أي شخص طبيعي أو قانوني له حساب بنكي
                    لدى بنك قطر الأول.
                  </p>
                  <p>
                    <strong>الخدمات:</strong> وتعني الخدمات والمرافق الإلكترونية
                    التي تمكن العميل من إعطاء توجيهات للبنك أو للتواصل مع البنك
                    بخصوص 1- تشغيل حسابات بنكية، 2- القيام بمختلف المعاملات
                    البنكية والاستثمارية والمالية وغيرها من المعاملات والصفقات
                    بمختلف أنواعها. 3- الحصول على الخدمات والمنتجات والمعلومات
                    والبضائع والفوائد والامتيازات التي يقدمها بنك قطر الأول أو
                    أحد تابعيه.
                  </p>
                  <p>
                    <strong>المعاملات الإلكترونية:</strong> من خلال استخدامه
                    للخدمات البنكية الإلكترونية، يقر العميل ويوافق على أن جميع
                    المعاملات الإلكترونية التي يوفرها بنك قطر الأول تُعد حقيقية
                    وأصلية وسارية المفعول وغير قابلة للنقض كما لو كانت معاملات
                    غير إلكترونية. كما يقر العميل ويوافق على أن البنك سيعول على
                    وسينفذ كافة توجيهات العميل وستتعامل معها كما لو كانت معاملات
                    تمت بصفة غير إلكترونية ومكتوبة وموقعة يدوياً.
                  </p>
                  <p>
                    <strong>المستثمر المؤهل:</strong> وتعود على الأشخاص
                    الطبيعيين أو القانونيين الذين يستوفون المعايير المنصوص عليها
                    في التعريف التالي، ويعد هؤلاء مؤهلون للاشتراك في خدمات
                    ومنتجات بنك قطر الأول.
                  </p>
                  <p>
                    <strong>معايير التأهل:</strong>
                  </p>
                  <ol>
                    <li>
                      <strong>شخص طبيعي: </strong>
                      <ul>
                        <li>
                          أن يبلغ صافي قيمة ثروته أربعة (4) مليون ريال قطري على
                          الأقل ويستثنى من هذا المبلغ قيمة مسكن المستثمر المؤهل
                          (مكان إقامته) الأساسي.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong>شركة:</strong>
                      <ul>
                        <li>
                          أن تكون الشركة قد (أو خلال السنتين الماضيتين قد) إما:
                          <ul>
                            <li>
                              أن يقدر رأسمالها السهمي أو صافي قيمة أصولها
                              بثمانية عشر (18) مليون ريال قطري أو أكثر، أو
                            </li>
                            <li>
                              أن تقدر قيمة صافي حجم أعمالها السنوي بثلاثين (30)
                              مليون ريال قطري أو أكثر
                            </li>
                          </ul>
                        </li>
                        <li>
                          أن تمتلك الشركة المستثمرة شركة قابضة أو شركة تابعة لها
                          تكون قد (أو خلال السنتين الماضيتين قد) إما:
                          <ul>
                            <li>
                              أن يقدر رأسمالها أو صافي قيمة أصولها بثمانية عشر
                              (18) مليون ريال قطري على الأقل، أو
                            </li>
                            <li>
                              أن تقدر قيمة صافي حجم أعمالها السنوي بثلاثين (30)
                              مليون ريال قطري أو أكثر
                            </li>
                          </ul>
                        </li>
                        <li>
                          الشراكات والشركات الفردية غير المسجلة التي تكون قد (أو
                          خلال السنتين السابقتين، قد) إما:
                          <ul>
                            <li>
                              أن تقدر قيمة صافي أصولها بثمانية عشر (18) مليون
                              ريال قطري أو أكثر (ولا يستثنى من هذه القيمة احتساب
                              القروض التي ضخها أي من الشركاء في رأسمال الشراكات
                              المحدودة) أو
                            </li>
                            <li>
                              أن تكون قيمة صافي حجم الأعمال ثلاثين (30) مليون
                              ريال قطري أو أكثر.
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong>الطرف المقابل المؤهل:</strong>
                      <ul>
                        <li>أن تكون شركة مرخصة من قبل مركز قطر للمال;</li>
                        <li>مؤسسة مالية مرخصة حسب الأصول.;</li>
                        <li>مركز مقاصة مؤهل أو بورصة مؤهلة.</li>
                        <li>
                          حكومة أو وكالة حكومية أو بنك مركزي أو غيرها من الهيئات
                          النقدية الوطنية في أي دولة.
                        </li>
                        <li>
                          هيئة استثمارية تابعة للدولة، أو أي هيئة مسؤولة عن أو
                          تتدخل في إدارة المديونية العامة
                        </li>
                        <li>
                          منظمة إقليمية أو دولية يكون أعضاءها إما دول أو بنوك
                          مركزية أو هيئات نقدية وطنية.
                        </li>
                      </ul>
                    </li>
                  </ol>
                  <p>
                    <strong>الرسوم: </strong>وتعني الرسوم المفروضة على المعاملات
                    والمنتجات التي يتيحها بنك قطر الأول. ويحتفظ البنك بحقه في
                    تغيير أو تعديل هذه الرسوم في أي وقت، وفق سلطته التقديرية
                    المطلقة. وللاطلاع على جدول الرسوم الرجاء التواصل مع مدير
                    العلاقات الخاص بكم لدى بنك قطر الأول
                  </p>
                  <p>
                    <strong>البيانات الشخصية:</strong> وتعني أي معلومات أو وثائق
                    خاصة بالعميل وتتعلق باستخدامهم للخدمات البنكية، منها على
                    سبيل المثال لا الحصر، بيانات الاتصال والتواصل، معلومات
                    البنك، أرقام البطاقات الشخصية، الجنسيات، المداخيل والثروات،
                    طبيعة علاقتهم بالبنك وبالمؤسسات المالية الأخرى، وغيرها من
                    المعلومات والوثائق التي تتضمن أي بيانات حساسة ذات الطابع
                    الشخصي.
                  </p>
                </li>
                <li>
                  <strong>
                    <u>أحكام عامة: </u>
                  </strong>
                  <ol type="1">
                    <li>
                      تشكل الشروط والأحكام العامة التالية ("الشروط والأحكام")
                      أساس العلاقة بين البنك والعميل للاستفادة من أي من الخدمات
                      البنكية الإلكترونية ("الخدمات") التي يوفرها البنك للعميل
                      وتعدد متممة ومكملة للأحكام والشروط العامة للبنك
                    </li>
                    <li>
                      يقر العميل بأنه عند استخدامه للخدمات باطلاعه وموافقته
                      والتزامه بكافة الشروط الخاصة بالخدمات المذكورة بهذه الشروط
                      والأحكام
                    </li>
                    <li>
                      يحتفظ البنك بحقه في تعديل أو إضافة أحكام أخرى تتعلق بنظام
                      الخدمات البنكية الالكترونية لبنك قطر الأول. سيتم إخطار
                      العملاء بصفة آلية عن طريق التطبيق في حال وجود أي من هذه
                      التعديلات ويتوجب على العميل الموافقة على الشروط والأحكام
                      المُحدثة في حال رغبته في الاستمرار في استخدام الخدمات
                      البنكية الالكترونية.
                    </li>
                    <li>
                      يعتبر توقيع العميل و/أو توقيعه الإلكتروني على أي استمارة،
                      أو أي توجيهات أو طلب أو أي مستند آخر يتعلق بأي من الخدمات
                      الواردة في هذه الشروط والأحكام بمثابة إقرار من العميل بأنه
                      قرأ هذه الشروط والأحكام وفهمها ووافق عليها.
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    <u>فسخ/إنهاء الاتفاقية:</u>
                  </strong>
                  <p>
                    يحتفظ البنك بحقه في انهاء الخدمات البنكية الإلكترونية، كما
                    يحق للعميل فسخها من خلال إلغاء اشتراكه وإخطار البنك في غضون
                    عشرة (10) أيام ويتم إرسال الإخطار عبر البريد أو البريد
                    الإلكتروني
                  </p>
                </li>
                <li>
                  <strong>
                    <u>الأحكام الأمنية:</u>
                  </strong>
                  <ol type="1">
                    <li>
                      يوافق العميل على الامتثال للإجراءات الأمنية وأي تعليمات
                      أخرى قد تصدر إليه من قبل البنك بشأن أمن الخدمات المصرفية
                      الإلكترونية، كما أنه يوافق على تحمل مسؤولية إعداد
                      الإجراءات الأمنية والحفاظ عليها وتنقيحها بصورة منتظمة فيما
                      يتعلق بالوصول إلى كل من القنوات الإلكترونية والمعلومات
                      المخزنة على الكمبيوتر الخاص به ونظم الاتصالات واستخدامها
                    </li>
                    <li>
                      يؤكد العميل أنه بتوقيع هذه الشروط والأحكام بأنه قد قام
                      بتقييم الترتيبات الأمنية المنصوص عليها في هذه الشروط
                      والأحكام وتأكد من كونها كافية لحماية مصالحه
                    </li>
                    <li>
                      يجب على العميل إبلاغ البنك في أقرب وقت ممكن بصورة معقولة
                      بمجرد علمه بأي دخول فعلي أو محاولة دخول غير مصرح بها إلى
                      القنوات الإلكترونية أو أي معاملة غير مصرح بها أو أي محاولة
                      لتنفيذ أي معاملة غير مصرح بها وفقاً لهذه الشروط والأحكام
                    </li>
                    <li>
                      يتعين على العميل التأكد من عدم قيامه أو قيام المستخدم أو
                      أي من موظفيه بأية تصرفات أثناء مدة سريان هذه الشروط
                      والأحكام أو بعد انتهائها والتي من شأنها التأثير على حماية
                      معلومات العميل أو أي من العملاء الآخرين لدى البنك
                    </li>
                    <li>
                      الدخول على نظام الخدمة المصرفية الإلكترونية للبنك مؤمن حيث
                      يتعين على العميل أن يقوم بنفسه بإنشاء الرمز السري الخاص به
                      لاستخدامه الشخصي فقط ومن ثم يكون هذا الرمز السري خاص به
                      وتحت مسؤوليته، ويجب على العميل الاحتفاظ بالرمز السري طبقاّ
                      لمتطلبات النظام الامني، كما يتعين على العميل عدم إفشاء
                      الرمز السري الخاص به للغير
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    <u>إتاحة الخدمات:</u>
                  </strong>
                  <ol type="1">
                    <li>
                      يحق للبنك وفقاً لمطلق تقديره وبهدف حماية العميل أن يوقف أو
                      يسحب أو يحد من استخدام العميل للخدمة أو أي جزء منها، ويقوم
                      البنك بإخطار العميل بأي من هذه الإجراءات.
                    </li>
                    <li>
                      يقوم البنك ببذل العناية الواجبة لتقديم الخدمات ولا يعد
                      البنك مسؤولا عن أي إخفاق أو تعذر في تقديم الخدمات جزئياً
                      أو كلياَ لأي سبب ويتضمن هذا على وجه الخصوص أي إيقاف
                      للخدمات ناتج عن الصيانة أو تحديث أو خلل في النظم لدى البنك
                      أو عن أي جهة يستخدمها البنك لتقديم الخدمات.
                    </li>
                    <li>
                      العملية التي يجري تنفيذها لا تكون دائما متزامنة مع إعطاء
                      التعليمات بشأنها، فبعض العمليات قد تستغرق مزيداً من الوقت
                      لمعالجتها وبعض التعليمات سوف تتم معالجتها خلال أيام وساعات
                      العمل المعتادة، أما الخدمات البنكية الإلكترونية فيمكن
                      للعميل استعمالها طوال اليوم
                    </li>
                    <li>
                      يجوز للبنك أن يوفر للعميل من وقت لآخر التحديثات والتحسينات
                      والتطويرات الخاصة بالخدمات الحالية، والتي تخضع بدورها لهذه
                      الشروط والأحكام
                    </li>
                    <li>
                      يجوز للبنك من وقت لآخر إيقاف كل أو بعض الخدمات الإلكترونية
                      بغرض الصيانة الدورية أو غير الدورية أو الصيانة التي تتم
                      لظرف طارئ يستدعي القيام بذلك
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    <u> القوانين والقواعد التنظيمية:</u>
                  </strong>
                  <ol type="1">
                    <li>
                      بموافقة العميل على استخدام الخدمات البنكية الإلكترونية
                      لبنك قطر الأول، يتعهد العميل بالتزامه بالقوانين الصادرة عن
                      الهيئات التنظيمية في قطر، منها على سبيل المثال لا الحصر
                      الهيئة التنظيمية لمركز قطر للمال وأية هيئات تنظيمية أخرى
                      تقنن الاستثمارات والمنتجات التي اشترك العميل بها
                    </li>
                    <li>
                      يتوجب على العميل تقديم جميع الوثائق والمعلومات لاستيفاء
                      الشروط المتعلقة ب-على سبيل المثال لا الحصر- "اعرف عميلك"
                      ومتطلبات مكافحة غسيل الأموال كما يتم تعديلها وتحديثها من
                      وقت لآخر
                    </li>
                    <li>
                      في حال خرق العميل لأي من هذه القوانين أو القواعد
                      التنظيمية، يحق للبنك حسب سلطته التقديرية المطلقة، إيقاف
                      الخدمات المتاحة أو تجميد المنتجات المالية أو تجميد حساب
                      العميل لدى البنك وفق ما يراه البنك مناسباً
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    <u>شروط خاصة ببعض الخدمات الإلكترونية</u>
                  </strong>
                  <ol type="1">
                    <li>
                      <strong>خدمة الرسائل القصيرة</strong>
                      <ul>
                        <li>
                          يصرح العميل للبنك بإرسال الرسائل النصية القصيرة لرقم
                          الجوال الخاص بالعميل والمسجل لدى البنك في حال التأكد
                          من كلمة السر أو تغييرها
                        </li>
                        <li>
                          يتوجب على العميل إخطار البنك فوراً في حال سرقة هاتفه
                          الخلوي أو في حال قام بتغيير رقم جواله المسجل لدى
                          البنك. وسيقوم البنك، بعد الإخطار، من فوره بتعطيل تشغيل
                          كافة الخدمات. ولا يتحمل البنك أي مسؤولية عن أي معاملة
                          غير مصرح بها تمت قبل الإخطار
                        </li>
                        <li>
                          يقر العميل بأن المعلومات التي تصله عن طريق الرسائل
                          القصيرة على الهاتف الجوال هي لغرض إعلامه، ويتوجب عليه
                          أن يتحمل مسؤولية الإبقاء على سريتها
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong>التحويلات المالية:</strong>
                      <ul>
                        <li>
                          يكون العميل المسؤول الوحيد عن دقة بيانات الأطراف
                          المستفيدة من الخدمة.
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong>الخدمات المتعلقة بالاستثمار:</strong>
                      <ul>
                        <li>
                          قبل الاشتراك في أي من الخدمات المتعلقة بالاستثمار،
                          يتعين على العميل التأكد من استيفائه لشروط "المستثمر
                          المؤهل" كما تم تعريفه في قسم المفاهيم من هذه الشروط
                          والأحكام
                        </li>
                      </ul>
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    <u> متفرقات:</u>
                  </strong>
                  <ol type="1">
                    <li>
                      تشكل هذه الشروط والأحكام التفاهم الكامل بين أطرافها بخصوص
                      توفير واستخدام الخدمات الالكترونية. وهي تلغي وتحل محل جميع
                      الاتفاقيات والمراسلات والإقرارات والمناقشات السابقة لها
                      والمبرمة بين العميل والبنك فيما يتعلق بالخدمات الإلكترونية
                      وتعتبر جميعها منتهية بموجب هذه الشروط والأحكام، ولن يكون
                      للعميل الحق في اتخاذ إجراء ضد البنك نتيجة لأي من
                      الاتفاقيات والمراسلات والإقرارات والمناقشات السابقة فيما
                      يتعلق بالخدمات الإلكترونية إلا في حالات الاحتيال. مع العلم
                      بأن هذه الشروط والأحكام لا تؤثر على أية اتفاقيات أخرى
                      مبرمة بين العميل والبنك أو أية شروط عمل و/ أو تفويضات
                      متعلقة بإدارة حساباتك أو تقديمنا للخدمات ذات الصلة، إلا
                      أنه في عند وجود أي تعارض بين هذه الشروط وبين تلك الشروط
                      والأحكام، فإن هذه الشروط والأحكام تسري ما دام أن التعارض
                      المذكور يتعلق بموضوع الخدمات المصرفية الإلكترونية.
                    </li>
                    <li>
                      إذا وافق البنك والعميل على التواصل فيما بينهما أو (أي طرف
                      ثالث) عبر البريد الإلكتروني أو خدمة الإنترنيت أو عبر خدمات
                      الرسائل النصية القصيرة (إس أم إس) أو أي طريقة أخرى. فإن
                      العميل يقر بالمخاطر التي قد تواجهها تلك الرسائل من اعتراض
                      أو رصد أو تعديل أو أي تدخل مهما كان من قبل أي طرف ثالث.
                      وفي هذا الصدد فإن البنك يُخلي مسؤوليته تجاه العميل أو تجاه
                      أي طرف آخر في حال وقع أي من الأحداث آنفة الذكر أو غيرها من
                      الأحداث التي قد تبدو أنها تمت بالنيابة عنه أو أية مراسلات
                      تطلب منا توجيهها إلى أي طرف ثالث.
                    </li>
                    <li>
                      يصرح العميل للبنك بتسجيل المحادثات الهاتفية في شأن الخدمة
                      المقدمة له عن طريق المركز المخصص لذلك. وتعتبر هذه
                      التسجيلات دليلاً ثابتاً معترفاً بصحته من العميل، كما يحق
                      للبنك استخدام التسجيلات المتحصل عليها في الأحوال التي يرى
                      البنك الاعتداد بها
                    </li>
                    <li>
                      يوافق العميل على دفع الرسوم والتكاليف المُستحقة حيثما أمكن
                      مقابل توفير الخدمات الإلكترونية على النحو الذي يخطره به
                      البنك من وقت لآخر ويحق للبنك الخصم من حسابات العميل
                      المختلفة مهما كان مكان أو تاريخ فتحها بما يعادل قيمة تلك
                      الرسوم والتكاليف المقررة حاليا بخصوص توفير الخدمات، ويجوز
                      للبنك تغيير تلك الرسوم و/ والتكاليف وعدد مرات وتواريخ
                      الدفع
                    </li>
                    <li>
                      يلتزم كل من الطرفين باتخاذ الاحتياطات المعقولة لضمان عدم
                      تأثر المراسلات الإلكترونية بفيروسات الحاسب أو برامج التجسس
                      (مثل برامج رصد لوحة المفاتيح) وغيرها من المكونات والبرامج
                      الضارة
                    </li>
                    <li>
                      يجوز تجزئة أي شرط من هذه الشروط والأحكام عن بقية الشروط،
                      وفي حالة ثبوت عدم صحة أو بطلان أو عدم نفاذ أي منها، فإن
                      ذلك لا يؤثر على صحة أو نفاذ أو سريان باقي الشروط.
                    </li>
                    <li>
                      إن حقوق البنك بموجب هذه الأحكام والشروط هي حقوق تراكمية
                      ولا تلغي بأي حال من الأحوال أي من حقوقه الأخرى بموجب أي
                      قانون مطبق ولا يجوز التنازل عنها إلا بصورة كتابية وعلى نحو
                      التحديد، ولا يعتبر أي تأخير أو اخفاق في ممارسة أي من تلك
                      الحقوق تنازلا عنها.
                    </li>
                    <li>
                      لا يجوز للعميل التنازل عن أي حق أو منفعة بموجب أي من أحكام
                      هذه الشروط والأحكام للغير دون الحصول على موافقة البنك
                      الخطية المسبقة
                    </li>
                    <li>
                      يجوز للبنك إجراء أية تعديلات على هذه الشروط والأحكام لأي
                      سبب أو فيما يتعلق بأية تغييرات في القوانين و/أو اللوائح
                      وسوف نخطرك في أقرب أجل ممكن بما يضمن تشغيل الخدمات بصورة
                      فعالة.
                    </li>
                    <li>
                      لا يسري أي تعديل أو اضافة على أي من هذه الشروط والأحكام
                      ولا يكون ملزما للبنك ما لم يكن كتابياً وموقعا من قبل
                      الممثلين المفوضين من البنك حسب الأصول المعمول بها.
                    </li>
                    <li>
                      قد تكون لبعض سلطات الاختصاص متطلبات قانونية أو تنظيمية
                      خاصة والتي تتطلب من العميل الموافقة على شروط تكميلية. وفي
                      حالة ضرورة الاتفاق بشأن تلك الشروط سيزود البنك العميل بتلك
                      الشروط المحدثة والتي ستشكل جزءاً لا يتجزأ من هذه الشروط
                      والأحكام.
                    </li>
                    <li>
                      إذا كان العميل عبارة عن شركة أو حساب مشترك من عدة أطراف،
                      تظل هذه الشروط والأحكام سارية ما لم يتم إلغاؤها بموجب
                      إخطار صادر من أحد المفوضين على الحساب، بصرف النظر عن أي
                      تغيير في اسم الشركة أو التنازل عنها أو قبول شريك جديد أو
                      خروج أي شريك من تلك الشراكة بسبب الوفاة أو غيره
                    </li>
                    <li>
                      يقر العميل صراحة بموجب هذه الشروط والأحكام بالحجية الكاملة
                      لمستخرجات البنك الآلية والإلكترونية المثبتة لما أصدره
                      العميل من تعليمات أو عمليات مصرفية عن طريق الخدمة سواء
                      كانت المستخرجات باللغة العربية أو اللغة الإنجليزية
                      المتداولة على نظام شبكة الإنترنيت
                    </li>
                    <li>
                      يصرح العميل للبنك بحفظ كافة المراسلات المتبادلة من خلال
                      شبكة الإنترنيت أو التلفون المحمول أو البريد الإلكتروني
                      بنظم الحفظ والأرشفة الحديثة بالكمبيوتر وغيرها، ويقر بأن
                      الصور المستخرجة تعتبر صورة طبق الأصل لها الحجية الكاملة في
                      الإثبات ويعترف بصحة توقيعه الإلكتروني على المستندات التي
                      حفظت بهذه الطريقة.
                    </li>
                    <li>
                      البنك غير مسؤول عن أي تعامل غير مسموح به من قبل طرف ثالث
                    </li>
                    <li>
                      يصرح العميل للبنك بالتعاون مع أي طرف آخر لنقل المعلومات أو
                      ارسالها عن طريق الرسائل القصيرة على الجوال المحمول كما
                      يصرح العميل بعرض المعلومات على شاشات الأجهزة الإلكترونية،
                      ويعفى البنك من أي مسؤولية في حال اختراق أي طرف من الغير
                      دون موافقة البنك أو مساهمته في الحصول على معلومات عن
                      الحسابات المفتوحة باسم العميل في سجلات البنك
                    </li>
                    <li>
                      يصرح العميل للبنك بقبول وتنفيذ تعليماته بأداء المدفوعات
                      والتحويلات من وإلى حساباته بعد التحقق من المعاملة من خلال
                      الإجراءات الأمنية المعمول بها في البنك
                    </li>
                    <li>
                      بالنسبة للحسابات المشتركة، يقوم البنك بتنفيذ العمليات
                      بناءً على التعليمات الصادرة من أي من المفوضين على الحساب،
                      وسوف يكون كل من العميل أو العملاء مسؤولا عن كل العمليات
                      المنفذة وعن سداد أي مديونية تنتج على الحساب
                    </li>
                    <li>
                      يصرح العميل للبنك بإرسال التنبيهات والإعلانات والمنتجات
                      الجديدة باستخدام أي من الوسائل الإلكترونية التي تشمل ولا
                      تقتصر على الإنترنيت والبريد الإلكتروني والرسائل القصيرة
                      ويوافق العميل على عدم اعتبار هذا انتهاكا لخصوصيته.
                    </li>
                    <li>
                      يخلي العميل ذمة البنك وموظفيه ووكلائه ويبرئهم من أية
                      مسؤولية أو ضرر أو دعوى أو مطالبات أو قضايا أو تكاليف أو
                      مصروفات والتي قد يتحملها البنك أو موظفيه نتيجة (أ) ابرام
                      البنك هذه الشروط والأحكام أو (ب) أي تعليمات مقدمة إلى
                      البنك من قبل العميل أو (ج) إخلال العميل بهذه الشروط
                      والأحكام أو أية اتفاقية أو عقد يتعلق بها.
                    </li>
                    <li>
                      يحق للبنك في أي وقت من دون إخطار مسبق تجميد و/أو مقاصة أي
                      مبلغ مستحق أو واجب الدفع إلى البنك من العميل من أي من
                      حسابات العميل المفتوحة لدى البنك بصرف النظر عن حجمها
                      وأسماءها وسواء كانت فردية أم تضامنية. وعليه يعتبر ذلك
                      المبلغ ضمانة/ كفالة للحسابات الأخرى لتسوية أية مديونية
                      مستحقة على العميل أو على كفلاءه لدى البنك.
                    </li>
                    <li>
                      يقر العميل أنه في حالة إرسال البنك لبيانات عن طريق أي من
                      الوسائل الإلكترونية وفقاً لطلب العميل فإنه يكون على العميل
                      المحافظة على سرية تلك البيانات ولا يتحمل البنك أي مسؤولية
                      عن تسرب تلك البيانات كما لا يتحمل البنك مسؤولية عدم وصول
                      هذه البيانات إلى العميل لأي أسباب خارجة عن إرادة البنك
                      ويتم خصم رسوم الخدمة حسابات العميل ولا يحق له طلب أي
                      تعويضات جراء ذلك
                    </li>
                    <li>
                      يلتزم العميل عند السفر خارج دولة قطر، أن يخطر البنك بالبلد
                      المسافر إليها والفترة المتوقع تواجده خارج البلد، كما يلتزم
                      العميل بالتأكد من أن رقم الهاتف الجوال المسجل لدى البنك
                      متاح أثناء سفره، وعليه إخطار البنك في حال استخدامه لأرقام
                      هواتف أخرى غير مسجلة لدى البنك، ولا يتحمل البنك أي أضرار
                      قد تلحق العميل نتيجة إخلاله بمقتضيات هذا البند
                    </li>
                    <li>
                      في حال علم البنك بوفاة العميل، يحق للبنك بموجب سلطته
                      التقديرية أن يقوم بإيقاف تشغيل الخدمات البنكية الإلكترونية
                      وتجميد حسابات العميل لدى البنك وفقاُ لسلطته التقديرية
                      المطلقة إلى حين اصدار تعليمات رسمية موجهة إلى البنك بخصوص
                      التصرف في حساب العميل من قبل محكمة الأسرة (الإرث) أو أي
                      جهة حكومية مختصة بشؤون الإرث، وينطبق هذا على الحسابات
                      المشتركة حتى وإن كان الطرف (الأطراف) الآخر مازالوا على قيد
                      الحياة
                    </li>
                    <li>
                      يحتفظ البنك، أو من يرخص له (إن وجد)، بحقوق الملكية الفكرية
                      وغيرها من الحقوق المتعلقة بخدمات بنك قطر الأول الإلكترونية
                      أو أية معلومات أخرى يقدمها البنك للعميل. ولا يشكل استخدام
                      العميل للخدمات البنكية الإلكترونية ترخيصاُ أو تنازلاً أو
                      منحاً للعميل لأي حق. ولا يحصل العميل على أي حق أو مصلحة في
                      هذه المواد أو حقوق الملكية الفكرية المتعلقة بهذه الخدمات
                    </li>
                    <li>
                      في حال وجود خلاف بين الصياغة العربية والصياغة الإنجليزية
                      فإن الصياغة الإنجليزية هي التي تسود ويُعمل بها
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    <u>القوة القاهرة والحقوق الأخرى:</u>
                  </strong>
                  <ol type="1">
                    <li>
                      لا يتحمل البنك مسؤولية (بما في ذلك خسارة الأرباح) أو أضرار
                      أو تأخير أو إخفاق في أداء واجباته بموجب هذه الشروط
                      والأحكام الناشئة بصورة كاملة أو جزئية نتيجة لتصرف أي حكومة
                      أو هيئة حكومية أو بسبب أي كارثة طبيعية أو القوانين
                      واللوائح أو أي تغيير في تفسيرها أو أي إنذار قضائي أو قيود
                      مفروضة على العملات أو عقوبات أو مراقبة البورصة أو
                      الإجراءات الصناعية، سواء متضمنة موظفيهم أم لا، في حال قيام
                      الحروب أو هجمات إرهابية أو تعطل المعدات أو انقطاع في
                      الإمداد بالطاقة أو أي شيء آخر خارج عن سيطرة البنك
                      المعقولة. وسيحاول البنك إبلاغ العملاء في أقرب وقت ممكن في
                      حال وجود مثل هذه الظروف.
                    </li>
                    <li>
                      يتعين على البنك أن يتصرف بموجب القوانين واللوائح المعمول
                      بها في أي سلطة الاختصاص والتي تتعلق بمكافحة غسيل الأموال
                      وتمويل الإرهاب وتوفير الخدمات المالية وغيرها إلى أشخاص أو
                      جهات قد تكون خاضعة لعقوبات
                    </li>
                    <li>
                      يجوز للبنك أن يتخذ أي إجراء يراه مناسباً وفقاً لجميع
                      القوانين واللوائح المذكورة وفقاً لتقديره المطلق. ويجوز أن
                      يشتمل هذا الإجراء، على سبيل المثال لا الحصر، على اعتراض
                      والتحري عن أية رسائل دفع وغيرها من المعلومات أو تعليمات
                      العميل المرسلة إلى أو من قبل العميل أو نيابة عنه عبر أنظمة
                      البنك وطرح المزيد من الاستفسارات حول ما إذا كانت أي من
                      الأسماء التي ربما تشير إلى شخص أو كيان محكوم عليه بأي
                      عقوبة تشير بالفعل إلى ذلك الشخص أو الكيان. وبصرف النظر عن
                      أي حكم من أحكام هذه الاتفاقية لا يتحمل البنك مسؤولية أي
                      خسارة سواء كانت خسارة مباشرة أو تبعية أو خسارة بيانات أو
                      أرباح أو ضرر تحمله أي من الأطراف بسبب: (أ) أي تأخير أو
                      إخفاق من قبل البنك في تنفيذ أي من واجباته بموجب هذه الشروط
                      والأحكام أو غير ذلك من الالتزامات الناشئة كليا أو جزئيا من
                      جراء أي خطوات والتي يعتبرها أي منهم، حسب تقديره المطلق
                      وحده، مناسبة للعمل وفقاً لجميع تلك القوانين واللوائح، أو
                      (ب) ممارسة أي من حقوقه بموجب هذه المادة. وفي ظل ظروف
                      معينة، قد يؤدي الإجراء الذي يتخذه البنك إلى منع أو تأخير
                      معالجة معلومات معينة. ومع مراعاة المتطلبات الأساسية لأي من
                      القوانين واللوائح المعمول بها. سوف يبذل البنك أقصى ما في
                      وسعه لإبلاغ العميل بوجود تلك الظروف في أقرب وقت ممكن
                      عملياً
                    </li>
                    <li>
                      لا تترتب أية مسؤولية على عاتق البنك أو الجهات المتخصصة
                      التي يتعاقد البنك معها عن أي أضرار ناجمة عن التأخير في
                      إرسال ونقل المعلومات، وعدم تلقي أو أخطاء أو ضياع
                      المعلومات، أو تعطيل قسري أو الحالات الطارئة مثل المشاكل
                      الفنية والتقنية أو انقطاع استمرارية العمل، أو الإضرابات أو
                      القوة القاهرة أو الكوارث الطبيعية، أو المشكلات الأمنية أو
                      التدابير التي تتخذها سلطات البلد، أو أي أحداث أخرى، ولا
                      تقع أية مسؤولية على عاتق البنك من جراء وقوع أي أضرار
                      للعميل أو للمعدات في حال حدوث أي من الحالات آنفة الذكر
                      بسبب ذلك
                      <br />
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    <u>حماية البيانات الشخصية:</u>
                  </strong>
                  <p>
                    بموافقة العميل على الانتفاع بخدمات البنك، يقر العميل ويوافق
                    على أن البنك سيقوم بتجميع ومعالجة وحفظ وتحويل والكشف عن
                    البيانات الشخصية الحساسة وذلك بما يتماشى مع قانون مركز قطر
                    للمال بشأن حماية البيانات وفقاً لتعديلاته من وقت لآخر
                  </p>
                </li>
                <li>
                  <strong>
                    <u>إخلاء مسؤولية:</u>
                  </strong>
                  <ol type="1">
                    <li>
                      قبل الاشتراك بخدمات بنك قطر الأول الإلكترونية، يُرجى
                      الانتباه إلى أهمية قراءة هذه الأحكام والشروط بعناية..
                    </li>
                    <li>
                      من خلال استخدامه للخدمات البنكية الإلكترونية، يقر العميل
                      ويوافق على أن جميع المعاملات الإلكترونية التي يوفرها بنك
                      قطر الأول تُعد حقيقية وأصلية وسارية المفعول وغير قابلة
                      للنقض كما لو كانت معاملات غير إلكترونية
                    </li>
                    <li>
                      يتم توفير جميع المعلومات في هذه الأحكام والشروط "كما هي"
                      بحالتها الأصلية وحسب توافرها دون تقديم أي ضمانات أو شروط
                      أو إقرارات من أي نوع، بما في ذلك ضمان القابلية للتسويق أو
                      الملائمة لغرض معين. كما يقر مستخدم هذا التطبيق ويوافق على
                      أنه لا يوجد أي ضمان بأن المعلومات المتاحة على التطبيق هي
                      معلومات حينية أو دقيقة أو كاملة كما أنها قابلة للتغيير
                      والتعديل من وقت لآخر
                    </li>
                    <li>
                      لا يتحمل بنك قطر الأول أو أحد فروعه أو تابعيه أو مدراءه أو
                      مسؤوليه أو موظفيه في أي حال من الأحوال المسؤولية عن
                      الأضرار أو التلفيات غير المباشرة أو العرضية أو الخاصة أو
                      الناتجة، منها على سبيل المثال لا الحصر، فقدان البيانات أو
                      خسارة الأرباح، حتى وإن تم التنبؤ باحتمالية وقوع مثل هذه
                      الأضرار التي تنشأ بسبب أو تتعلق باستخدام هذا التطبيق
                    </li>
                    <li>
                      بالضغط على "أقبل وأوافق"، يقر العميل بكونه مستخدم مخول
                      لاستعمال هذا التطبيق كما يقر العميل ويوافق بشكل لا رجعة
                      فيه على نفاذه واستخدامه لخدمات بنك قطر الأول الإلكترونية
                      بما يتوافق مع هذه الأحكام والشروط والأحكام والشروط العامة
                      لبنك قطر الأول
                    </li>
                    <li>
                      خدمات بنك قطر الأول الإلكترونية موجهة فقط لاستخدام
                      "المستثمر المؤهل". من خلال استعمال هذا التطبيق يقر العميل
                      على مسؤوليته الخاصة بأنه يستوفي جميع معايير التأهل
                      "للمستثمر المؤهل" كما تم تعريفه في هذه الأحكام والشروط،
                      وكما ورد تعريفه في قوانين مركز قطر للمال بصيغتها المعدلة
                      من وقت لآخر
                    </li>
                    <li>
                      في حال وجود اختلاف بين النص العربي والإنجليزي، فإن النص
                      الإنجليزي هو الذي يسود ويتم التعويل عليه
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>
                    <u>سياسة الخصوصية:</u>
                  </strong>
                  <p>
                    نحن في بنك قطر الأول ذ م م (عامة)، من مبنى إدارة البنك
                    الواقع على شارع سهيل بن حمد رقم 29، السد، ص ب: 28028،
                    الدوحة، قطر (ويشار إليه فيما يلي بلفظ “نحن” أو “البنك”)،
                    نعتز بعلاقتنا ونفخر بثقتكم بنا؛ ولذلك، يمكنكم الاعتماد علينا
                    في احترام بياناتكم الشخصية وبيانات شركتكم والمساعدة على
                    حمايتها
                  </p>
                  <p>
                    نحن نحترم خصوصيتكم، ونحمي بياناتكم، ونطبق معايير وإجراءات
                    أمان صارمة للمساعدة على حماية بياناتكم الشخصية ومكافحة
                    الاحتيال
                  </p>
                  <p>
                    ونقدم أيضًا حماية بشكل مستمر؛ إذ أننا نحمي بياناتكم الشخصية،
                    بغض النظر عن كونكم عميل حالي أم سابق
                  </p>
                  <ol type="1">
                    <li>
                      معلومات بشأن بيان الخصوصية
                      <p>
                        يتناول هذا بيان الخصوصية الطريقة التي نتعامل ونحمي بها
                        بياناتكم الشخصية وبيانات شركتكم، وطريقة جمع هذه
                        البيانات، وإدارتها على النحو الذي يخدم مصالحكم. وقد يتم
                        تغيير هذا البيان من وقت لآخر، وفق الحاجة، لكي نعكس بدقة
                        الطريقة التي نجمع بها بياناتكم ونديرها
                      </p>
                      <p>
                        وتسري جميع التغييرات التي تجرى على هذا البيان بمجرد
                        نشرها على هذا الموقع الإلكتروني دون إرسال أي إشعار آخر
                        إليكم. ويعد استخدامكم للموقع بعد إجراء هذه التغييرات
                        قبولًا من جانبكم لبيان الخصوصية المعدل والساري آنذاك.
                        وندعوكم لقراءة بيان الخصوصية بصفة دورية لمراجعة أي
                        تعديلات أجريت عليه
                      </p>
                    </li>
                    <li>
                      البيانات الشخصية
                      <p>
                        يقصد بلفظ البيانات الشخصية، أينما ورد في هذا البيان، أي
                        معلومات تتعلق بالظروف الشخصية أو المادية لأي شخص محدد أو
                        قابل للتحديد، مثل اسمكم، أو رقم هاتفكم، أو عنوان بريدكم
                        الإلكتروني
                      </p>
                      <p>
                        يقر العميل بعلمه بأن البيانات الشخصية لأي مستفيد أو طرف
                        ثالث يتم توفيرها على منصة بنك قطر الأول الإلكترونية من
                        قبل العميل تخضع هي الأخرى لأحكام البيانات الشخصية
                        المضمنة في هذه الشروط والأحكام
                      </p>
                    </li>
                    <li>
                      نطاق تطبيق بيان الخصوصية
                      <p>
                        يسري بيان الخصوصية الحالي على البيانات الشخصية المقدمة
                        إلينا من خلال هذا الموقع الإلكتروني، وتطبيقاته الأخرى،
                        وإعلاناتنا على الانترنت، والمراسلات الإلكترونية
                      </p>
                    </li>
                    <li>
                      إدارة بيان الخصوصية
                      <p>
                        ترسل أي أسئلة أو استفسارات بشأن تفسير أو تطبيق هذا
                        البيان أو بشأن ما يجوز أو لا يجوز فعله فيما يتصل
                        بمعلوماتكم الشخصية، في المقام الأول إلى القسم القانوني،
                        عبر البريد الإلكتروني LegalDept@QFB.com.qa
                      </p>
                    </li>
                    <li>
                      . ما هي المعلومات التي نجمعها عنكم، ولماذا؟
                      <p>
                        قد تشمل المعلومات التي نجمعها عنكم عبر هذا الموقع
                        الإلكتروني، ما يلي: اسمكم، وجنسكم، وبيانات الاتصال
                        الخاصة بالسكن والعمل، والمسمى الوظيفي، وعنوان البريد
                        الإلكتروني، وعنوان بروتوكول الانترنت، ورقم الهاتف،
                        وتاريخ الميلاد، والجنسية، ومعلومات السداد، وسجل
                        المشتريات، وتقييماتكم، وأراءكم بشأن المنتجات والخدمات
                        التي نقدمها.
                      </p>
                      <ol type="i">
                        <li>
                          المعلومات المقدمة من جانبكم
                          <p>
                            إذا كنتم تستخدمون هذا الموقع الإلكتروني، أو تطبيقاته
                            المتنوعة، فقد يُطلب منكم تقديم معلومات شخصية، كجزء
                            من عملية التسجيل، والتي تشمل، على سبيل المثال لا
                            الحصر، الاسم الأول، واسم العائلة، واللقب، والعنوان،
                            والمدينة، والدولة، والرمز البريدي، والهاتف، وعنوان
                            البريد الإلكتروني، وطريقة الاتصال المفضلة (البريد
                            الإلكتروني، الهاتف، البريد)، ورقم الحساب، ومعلومات
                            بشأن اهتمامك بالخدمات والمنتجات، والاستخدام المقصود
                            من الخدمات والمنتجات. وقد تختارون، إضافة إلى ذلك،
                            تقديم بيانات إضافية تتعلق بكم أو بشركاتكم للحصول على
                            الخدمات المختلفة المتاحة على هذا الموقع الإلكتروني
                          </p>
                          <p>
                            سوف تستخدم المعلومات الشخصية المقدمة عبر موقعنا
                            الإلكتروني في أي طلب توظيف في تحديد مدى ملائمتك
                            للعمل في أي وظيفة لدى بنك قطر الأول؛ وقد يتم استخدام
                            هذه المعلومات لمراقبة مبادرات التوظيف التي نطرحها
                            وسياسات تساوي الفرص. وقد يتم الإفصاح عن بيانات صاحب
                            الطلب إلى أي أطراف أخرى للتحقق من صحتها أو الحصول
                            على معلومات إضافية، بما في ذلك المعاهد والمؤسسات
                            التعليمية، وأصحاب العمل السابقين/ الحاليين ووكالات
                            الائتمان المرجعية. تحتفظ وكالات الائتمان المرجعية
                            بهذه الأبحاث في سجلاتها، ويمكنكم التواصل معنا لمعرفة
                            الوكالات التي نتعامل معها. وقد يتم الاحتفاظ بالطلبات
                            غير المقبولة من أجل مطابقة مهارتك مع أي فرص عمل في
                            المستقبل. نحتفظ عادة بهذه الطلبات لمدة 12 شهرًا،
                            وإذا كنتم ترغبون في عدم الاحتفاظ ببياناتك الشخصية
                            لهذا الغرض، يرجى إخطارنا
                          </p>
                          <p>
                            إذا كنتم تتواصلون معنا عبر البريد الإلكتروني، فقد
                            نحتفظ بسجل لهذه المراسلات
                          </p>
                          <p>
                            ورغم أننا لا نطلب بشكل عام تقديم بيانات شخصية حساسة،
                            مثل البيانات التي تكشف عن عرقكم، أو بلدكم الأصلي، أو
                            أرائكم السياسية، أو المعتقدات الدينية أو الفلسفية،
                            أو التي تكشف عن السوابق الجنائية أو الحالة الصحية أو
                            الاجتماعية، فقد نتيح فرصة الموافقة بالإيجاب وبشكل
                            صريح على معالجة هذه البيانات الحساسة والإفصاح عنها،
                            إذا كانت هناك حاجة ضرورية لجمع مثل هذه المعلومات
                          </p>
                        </li>
                        <li>
                          ملفات سجل متصفح الإنترنت
                          <p>
                            كما أننا نجمع بيانات محددة بصفة دورية بشكل تلقائي،
                            ونخزنها في ملفات سجل متصفح الانترنت. وتشمل هذه
                            البيانات نوع المتصفح، ومزود خدمات الانترنت، والصفحات
                            المرجعية/الخروج، ونظام التشغيل، وطابع التاريخ/الوقت،
                            وبيانات تصفح الانترنت.
                          </p>
                        </li>
                        <li>
                          ملفات تعريف الارتباط
                          <p>
                            يخزن موقعنا “ملفات تعريف ارتباط” لأغراض تحليلية،
                            لجعل استخدم الموقع أكثر سهولة. “ملفات تعريف
                            الارتباط” هي عبارة عن ملفات صغيرة يتم تخزينها على
                            حاسبكم باستخدام المتصفح الخاص بكم. يمكن منع تخزين
                            “ملفات تعريف الارتباط”، إذا كنتم ترغبون في ذلك، على
                            حاسبكم من خلال إعدادات المتصفح. لمعرفة طريقة حذف أو
                            تعطيل حفظ ملفات تعريف الارتباط، يرجى زيارة الموقع
                            الإلكتروني
                            <a
                              href="www.allaboutcookies.org/manage-cookies"
                              target="_blank"
                            >
                              www.allaboutcookies.org/manage-cookies
                            </a>
                            كما يرجى العلم أن هذا الإجراء قد يمنعكم من أداء
                            وتشغيل مجموعة من عروضنا.
                          </p>
                        </li>
                        <li>
                          البيانات المتعلقة بالأطفال
                          <p>
                            نحن لا نجمع، بشكل متعمد، أي بيانات من الأطفال، الذين
                            تقل أعمارهم عن 18 عامًا، ولا يستهدف موقعنا
                            الإلكتروني الأطفال دون سن 18 عامًا. وإذا علمنا أنه
                            يوجد شخص سنه دون 18 عامًا قام بتقديم معلومات إلى هذا
                            الموقع، فسنقوم بحذف تلك المعلومات
                          </p>
                        </li>
                      </ol>
                    </li>
                    <li>
                      استخدام بياناتكم الشخصية
                      <ol type="i">
                        <li>
                          البيانات الشخصية التي يقدمها المستخدم
                          <p>قد نستخدم بيانات الشخصية التي نجمعها من أجل:</p>
                          <p>
                            تزويدكم بالمعلومات والسلع و/أو الخدمات التي طلبتها،{" "}
                            <br />
                            التواصل معكم بشأن أنشطة الدعم، <br />
                            التواصل معكم في حالة كانت لدينا أي إعلانات بشأن
                            الموقع الإلكتروني أو تطبيقاته، <br />
                            تحقيق أي غرض آخر تم تقديم هذه البيانات من أجله،{" "}
                            <br />
                            لأغراض الفواتير والتحصيل، <br />
                            وأي طريقة أخرى يمكن أن نذكرها عند تقديم هذه
                            البيانات، <br />
                            أو أي غرض آخر بعد الحصول على موافقتك، <br />
                            وقد نستخدم بياناتكم للتواصل معكم بشأن سلعنا وخدماتنا
                            الجديدة التي قد تكون محل اهتمامكم. إذا كنتم ترغبون
                            في عدم استخدام معلوماتكم بهذه الطريقة أو أي طريقة
                            أخرى ورد ذكرها أعلاه، يرجى (1) التواصل معنا على
                            البريد الإلكتروني التالي: communications@qfb.com.qa،
                            (2) وضع علامة أمام الخانة ذات الصلة أو ضمان أنه تم
                            وضع علامة أمام الخانة ذات الصلة في النموذج الذي نجمع
                            بياناتك فيه لهذا الغرض، أو (3) اتباع تعليمات إلغاء
                            الاشتراك المذكورة في البريد الإلكتروني أو أي رسالة
                            أخرى قمتم باستلامها.
                          </p>
                          <p>
                            وبشكل عام، نحن لا نستخدم المعلومات التي نجمعها
                            للأغراض التسويقية، ولكن إذا تقدمتم بطلب للحصول على
                            منتجات أو خدمات عبر أي من فروعنا، فقد يتم استخدام
                            معلوماتكم من جانبنا لنخطركم بشأن المنتجات والخدمات
                            ذات الصلة، التي قد تكون محل اهتمامكم
                          </p>
                        </li>
                        <li>
                          ملفات سجل متصفح الإنترنت
                          <p>
                            يقدم سجل ملفات متصفح الانترنت صورة عامة عن أي شخص
                            يزور موقعنا الإلكتروني والصفحات التي قام بزيارتها
                            مؤخرًا. هذه المعلومات غير محددة لأي شخص، ويتم
                            تجميعها فقط لمساعدتنا في صيانة الموقع وإدارته
                            وتحسينه. يتم جمع سجل ملفات متصفح الانترنت، بشكل
                            أساسي، لأغراض بحثية، تهدف إلى معرفة الصفحات والخدمات
                            والمعلمات التي تشغل اهتمام العملاء الحاليين
                            والمحتملين. ونحن لا نربط هذه البيانات التي يتم جمعها
                            بشكل تلقائي بأي بيانات شخصية
                          </p>
                        </li>
                      </ol>
                    </li>
                    <li>
                      الإفصاح عن معلوماتكم ونقلها
                      <p>
                        في بعض الحالات، قد يطلب منا الإفصاح عن بيانات شخصية
                        محددة، بموجب حكم أو مذكرة أو أمر تفتيش من المحكمة، أو
                        طلب تنفيذ القانون، أو من أجل حماية حقوق أو ملكية أو
                        سلامة شركتنا أو عملائنا أو موظفينا، وما إلى ذلك. وقد
                        نفصح أيضًا عن معلوماتكم من أجل تفعيل شروط الاستخدام
                        لدينا أو حماية حقوق أو ملكية و/أو سلامتنا وسلامة موظفينا
                        وعملائنا الشخصية. وعلاوة على ذلك، قد نفصح أيضًا عن
                        معلوماتكم من أجل أن نستطيع الحصول على التدابير المتاحة
                        أو الحد من الأضرار التي قد نتعرض لها، أو الاستجابة لأي
                        حالة طارئة و/ أو في حالة قيامنا ببيع (أو اعتزامنا بيع)
                        أي أملاك أو أعمال أو أصول، فقد نفصح عن معلوماتكم للمشتري
                        المحتمل
                      </p>
                      <ol type="i">
                        <li>
                          . فروع بنك قطر الأول ومزودو الخدمات
                          <p>
                            قد نفصح عن بياناتكم الشخصية، حسب الحاجة، إلى أي شركة
                            تابعة لمجموعتنا. وبما أن بعض فروع بنك قطر الأول
                            يمتلكون مواقع إلكترونية خاصة بهم، ويطبقون بيانات
                            خصوصية مختلفة، وفقا للخدمات التي يقدمونها؛ لذا يرجى
                            قراءة هذه الإقرارات بعناية عند زيارة تلك المواقع
                          </p>
                          <p>
                            قد نختار، من وقت لآخر، الشركات التابعة لنا أو بعض
                            الأطراف الأخرى التي يتم اختيارها بعنايه، لتقديم
                            خدمات بالنيابة عنا، وخاصة، تجميع بياناتكم الشخصية
                            ومعالجتها واستخدامها بالنيابة عنا؛ وقد نفصح عن
                            معلوماتك إلى مزودي الخدمات المشار إليهم بما يتفق مع
                            قانون حماية البيانات المعمول به، شريطة التزامهم
                            باستخدام تلك المعلومات من أجل أغراض تقديم الخدمات
                            إلينا فقط.
                          </p>
                        </li>
                        <li>
                          نقل المعلومات للخارج
                          <p>
                            سنحتفظ بالمعلومات التي نتلقاها في أجهزة الحاسوب
                            والأنظمة الخاصة بنا في قطر وقد تكون متاحة للوصول
                            إليها من قبل موظفينا أو تقديمها لهم أو إلى أي من
                            شركاتنا التابعة أو موردينا المختارين بعناية الذين
                            يعملون في قطر أو خارجها، وبتقديم معلوماتكم لنا فإنكم
                            توافقون على نقل هذه المعلومات وتخزينها ومعالجتها.
                          </p>
                        </li>
                      </ol>
                    </li>
                    <li>
                      إلغاء الموافقة
                      <p>
                        يمكنكم إلغاء الموافقة التي قدمتموها بشأن استخدام
                        معلوماتكم من جانبنا. ولإلغاء الموافقة، يمكنكم إرسال بريد
                        إلكتروني إلى: information@qfb.com.qa.
                      </p>
                      <p>
                        سوف نقوم بتنفيذ طلبكم فورًا، ولكن قد تصلكم بعد المراسلات
                        من جانبنا أثناء تنفيذ طلبكم؛ ولذلك، قد نستمر في التواصل
                        معكم للرد على استفساراتكم الجديدة أو التواصل معكم بشأن
                        الخدمات التي اشتركتم بها
                      </p>
                    </li>
                    <li>
                      روابط الموقع الخاص بالمواقع الأخرى
                      <p>
                        ولأغراض تحقيق الراحة لكم، قد يحتوي موقعنا على روابط خاصة
                        بمواقع إلكترونية مملوكة أو يشغلها آخرون ولا تتصل ببنك
                        قطر الأول. ولا نقدم أي تعهدات أو ضمانات بشأن ممارسات جمع
                        البيانات الشخصية أو الخصوصية في المواقع التي لا يملكها
                        أو يشغلها بنك قطر الأول. ونوصي بشدة الاطلاع على سياسات
                        الخصوصية التي يطبقها هؤلاء الأطراف قبل تقديم أي بيانات
                        شخصية لهم. وقد ترسل هذه المواقع الأخرى ملفات تعريف
                        ارتباط خاصة بها للمستخدمين، وقد تجمع بيانات أو تطلب
                        بيانات شخصية؛ ولذلك، يتعين عليكم التواصل مباشرة مع تلك
                        الشركات إذا كانت لديكم أي استفسارات بشأن استخدامهم
                        للمعلومات التي يجمعونها.
                      </p>
                    </li>
                    <li>
                      الإجراءات التي نتخذها لضمان خصوصيتكم
                      <p>
                        لأن أمن بياناتك الشخصية أمر مهم لنا، فإننا نستخدم أدوات
                        وتقنيات على المعيار المعمول بها في المجال لحماية
                        بياناتكم الشخصية من أي إفصاح غير مصرح به. ومع ذلك، لا
                        توجد أي وسيلة نقل عبر الانترنت أو وسيلة تخزين إلكترونية،
                        آمنة بنسبة 100%. ولذلك، فإنه رغم سعينا لاستخدام وسائل
                        تجارية معقولة لحماية معلوماتكم الشخصية، فلا يمكننا ضمان
                        آمن معلوماتكم الشخصية بشكل مطلق.
                      </p>
                      <ol type="i">
                        <li>
                          أمن الشبكة
                          <p>
                            نحن نستخدم جدران حماية لتأمين محيط شبكة معلوماتنا
                            ولمراقبة أنظمتنا بشكل دوري.
                          </p>
                        </li>
                      </ol>
                    </li>
                    <li>
                      الوصول إلى معلوماتكم
                      <p>
                        نحن نوفر لك منافذ وصول معقولة لمعلوماتكم الشخصية، التي
                        نحتفظ بها عنكم. لمعرفة المزيد عن المعلومات التي نحتفظ
                        بها عنكم أو لتصحيح أو تعديل أو حذف هذه المعلومات، يرجى
                        التواصل معنا عبر بيانات الاتصال المذكورة أعلاه.
                      </p>
                    </li>
                  </ol>
                </li>
              </ol>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AuthTerms;
