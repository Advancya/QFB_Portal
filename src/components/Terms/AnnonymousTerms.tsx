import React, { useContext, useState } from "react";
import { Accordion, Button, Card, Collapse, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import { localStrings as local_Strings } from "../../translations/localStrings";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../providers/AuthProvider";
import xIcon from "../../images/x-icon.svg";

interface iAnnonymousTerms {
  showAnnonymousTermsModal: boolean;
  hideAnnonymousTermsModal: () => void;
}
function AnnonymousTerms(annonymousTermsProps: iAnnonymousTerms) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);

  return (
    <Modal
      show={annonymousTermsProps.showAnnonymousTermsModal}
      onHide={annonymousTermsProps.hideAnnonymousTermsModal}
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
          onClick={annonymousTermsProps.hideAnnonymousTermsModal}
        >
          <img src={xIcon} width="15" />
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="box modal-box p-4  scrollabel-modal-box ">
          <div className="EN color-grey">
            <p>
              QFB Digital Banking Application is only intended for “Qualified
              Investors”. By using this Application, you acknowledge at your own
              risk that you fulfill the eligibility criteria for Qualified
              Investors as defined under these Terms and Conditions and as set
              out under the QFC Regulations as amended from time to time.
            </p>
            <p>The “Qualified Investor” was defined as follows:</p>
            <p>
              <strong>Qualified Investor:</strong> refers to the natural persons
              and entities that meet the requirements stated in the definition
              above who shall be considered eligible for to subscribe for the
              QFB products and services.
            </p>
            <p>
              <strong>Eligibility Criteria:</strong>
            </p>
            <ol>
              <li>
                <strong>Natural Persons: </strong>
                <ul>
                  <li>
                    Shall have a minimum net worth of four (4) million QAR,
                    excluding the calculation of the value of the primary
                    residence of the Qualified Investor.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Corporate Entities:</strong>
                <ul>
                  <li>
                    <strong>
                      a body corporate that has (or, at any time during the
                      previous 2 years, has had) either:
                    </strong>
                    <ul>
                      <li>
                        called-up share capital, or net assets, of QR 18 million
                        or more; or
                      </li>
                      <li>annual net turnover of QR 30 million or more;</li>
                    </ul>
                  </li>
                  <li>
                    <strong>
                      a body corporate that has a holding company or subsidiary
                      that has (or, at any time during the previous 2 years, has
                      had) either:
                    </strong>
                    <ul>
                      <li>
                        called-up share capital, or net assets, of at least QR
                        18 million; or
                      </li>
                      <li>annual net turnover of QR 30 million or more;</li>
                    </ul>
                  </li>
                  <li>
                    <strong>
                      a partnership or unincorporated association that has (or,
                      at any time during the previous 2 years, has had) either:
                    </strong>
                    <ul>
                      <li>
                        net assets of QR 18 million or more (calculated, in the
                        case of a limited partnership, without deducting loans
                        owing to any of the partners); or
                      </li>
                      <li>annual net turnover of QR 30 million or more.</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Eligible Counterparty: </strong>
                <ul>
                  <li>an authorized firm;</li>
                  <li>a regulated financial institution;</li>
                  <li>an eligible clearing house or eligible exchange;</li>
                  <li>
                    a government, government agency, or central bank or other
                    national monetary authority, of any jurisdiction;
                  </li>
                  <li>
                    a state investment body, or a body charged with, or
                    intervening in, the management of the public debt;
                  </li>
                  <li>
                    a supranational organization, the members of which are
                    jurisdictions, central banks or national monetary
                    authorities.
                  </li>
                </ul>
              </li>
            </ol>
          </div>

          <div className="Ar color-grey">
            <p>
              تطبيق خدمات بنك قطر الأول الإلكترونية هو تطبيق موجه فقط لاستخدام
              "المستثمر المؤهل". من خلال استعمال هذا التطبيق يقر العميل على
              مسؤوليته الخاصة بأنه يستوفي جميع معايير التأهل "للمستثمر المؤهل"
              كما ورد تعريفه في هذه الأحكام والشروط، وفي قوانين مركز قطر للمال
              بصيغتها المعدلة من وقت لآخر.
            </p>
            <p>وقد تم تعريف المستثمر المؤهل كالتالي:</p>
            <p>
              <strong>المستثمر المؤهل: </strong> وتعود على الأشخاص الطبيعيين أو
              القانونيين الذين يستوفون المعايير المنصوص عليها في التعريف التالي،
              ويعد هؤلاء مؤهلون للاشتراك في خدمات ومنتجات بنك قطر الأول.
            </p>
            <p>
              <strong>معايير التأهل:</strong>
            </p>
            <ol>
              <li>
                <strong> شخص طبيعي: </strong>
                <ul>
                  <li>
                    أن يبلغ صافي قيمة ثروته أربعة (4) مليون ريال قطري على الأقل
                    ويستثنى من هذا المبلغ قيمة مسكن المستثمر المؤهل (مكان
                    إقامته) الأساسي.الأساسي.
                  </li>
                </ul>
              </li>
              <li>
                <strong> شركة:</strong>
                <ul>
                  <li>
                    <strong>
                      أن تكون الشركة قد (أو خلال السنتين الماضيتين قد) إما:
                    </strong>
                    <ul>
                      <li>
                        أن يقدر رأسمالها السهمي أو صافي قيمة أصولها بثمانية عشر
                        (18) مليون ريال قطري أو أكثر، أو
                      </li>
                      <li>
                        أن تقدر قيمة صافي حجم أعمالها السنوي بثلاثين (30) مليون
                        ريال قطري أو أكثر.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>
                      أن تمتلك الشركة المستثمرة شركة قابضة أو شركة تابعة لها
                      تكون قد (أو خلال السنتين الماضيتين قد) إما:
                    </strong>
                    <ul>
                      <li>
                        أن يقدر رأسمالها أو صافي قيمة أصولها بثمانية عشر (18)
                        مليون ريال قطري على الأقل، أو
                      </li>
                      <li>
                        أن تقدر قيمة صافي حجم أعمالها السنوي بثلاثين (30) مليون
                        ريال قطري أو أكثر.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>
                      الشراكات والشركات الفردية غير المسجلة التي تكون قد (أو
                      خلال السنتين السابقتين، قد) إما:
                    </strong>
                    <ul>
                      <li>
                        أن تقدر قيمة صافي أصولها بثمانية عشر (18) مليون ريال
                        قطري أو أكثر (ولا يستثنى من هذه القيمة احتساب القروض
                        التي ضخها أي من الشركاء في رأسمال الشراكات المحدودة) أو
                      </li>
                      <li>
                        أن تكون قيمة صافي حجم الأعمال ثلاثين (30) مليون ريال
                        قطري أو أكثر.
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <strong> الطرف المقابل المؤهل: </strong>
                <ul>
                  <li>أن تكون شركة مرخصة من قبل مركز قطر للمال.</li>
                  <li>مؤسسة مالية مرخصة حسب الأصول.</li>
                  <li>مركز مقاصة مؤهل أو بورصة مؤهلة.</li>

                  <li>
                    حكومة أو وكالة حكومية أو بنك مركزي أو غيرها من الهيئات
                    النقدية الوطنية في أي دولة.
                  </li>

                  <li>
                    هيئة استثمارية تابعة للدولة، أو أي هيئة مسؤولة عن أو تتدخل
                    في إدارة المديونية العامة.
                  </li>

                  <li>
                    منظمة إقليمية أو دولية يكون أعضاءها إما دول أو بنوك مركزية
                    أو هيئات نقدية وطنية.
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AnnonymousTerms;
