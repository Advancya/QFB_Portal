import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import dateIcon from "../../images/calendar-inactive.png";
import Breadcrumb from "../../components/Breadcrumb";
import { GetProductsAndOffersAll, DeleteProductsAndOffers } from "../../services/cmsService";
import moment from "moment";
import { localStrings as local_Strings } from '../../translations/localStrings';
import { AuthContext } from "../../providers/AuthProvider";
import ProductsAndOffersForm from "../../components/ProductsAndOffers/ProductsAndOffersForm";
import { confirmAlert } from 'react-confirm-alert';

interface IProductAndOffersProps {
  id: number;
  name: string;
  nameAr: string;
  createdDate: string;
  expiryDate: string;
  details: string;
  detailsAr: string;
}

const initialData = {
  id: 0,
  name: "",
  nameAr: "",
  createdDate: "",
  expiryDate: "",
  details: "",
  detailsAr: "",
};

function ProductsAndOffersListing() {
  const auth = useContext(AuthContext);
  local_Strings.setLanguage(auth.language);
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [data, setData] = useState<IProductAndOffersProps[]>([]);
  const [isLoading, setLoading] = useState(true);

  const [formAttributes, setFormAttributes] = useState({
    showForm: false,
    showEditable: false,
    selectedItem: initialData,
  });
  
  useEffect(() => {
    let isMounted = true;

    refreshList();

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, []);

  const refreshList = () => {
    GetProductsAndOffersAll()
      .then((responseData: IProductAndOffersProps[]) => {
        if (responseData) {
          setData(
            responseData.filter((d) => new Date(d.expiryDate) > new Date()).sort((a, b) => moment(b.createdDate).diff(moment(a.createdDate)))
          );
        } else {
          setData([]);
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => setLoading(false));
  }

  const deleteTheRecord = async (id: number) => {

    setLoading(true);
    const x = await DeleteProductsAndOffers(id);
    if (x) {
      refreshList();
    } else {
      console.log("Error while updating record");
    }
    setLoading(false);
  };

  return (
    <div>
      <Breadcrumb pageName={local_Strings.ProductsAndOffersListingTitle} />
      <div className="d-flex align-items-center">
        <div className="ib-text">
          <h3 className="mb-2">{local_Strings.ProductsAndOffersListingTitle}</h3>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-primary mt-1" style={{ marginLeft: 50 }}
          onClick={() => setFormAttributes({
            selectedItem: initialData,
            showForm: true,
            showEditable: true
          })}
        >
          {local_Strings.ProductsAndOffersAddNew}
        </button>
      </div>


      <div className="box modal-box py-0 mb-0 scrollabel-modal-box">
        <ul className="box-list" id="dataList">
          {
            data && data.length > 0 &&
            data.map((item, index) =>

              <li className="shown" key={index}>
                <a onClick={() => {
                  confirmAlert({
                    title: local_Strings.deleteSure,
                    message: local_Strings.deleteSureMessage,
                    buttons: [
                      {
                        label: local_Strings.ProductsAndOffersDeleteButton,
                        onClick: () => deleteTheRecord(item.id)
                      },
                      {
                        label: local_Strings.cancelBtn,
                        onClick: () => { }
                      }
                    ]
                  });

                }} style={{ cursor: "pointer", float: "right" }}>
                  {local_Strings.ProductsAndOffersDeleteButton}
                </a>
                <a onClick={() => setFormAttributes({
                  selectedItem: item,
                  showForm: true,
                  showEditable: true
                })} style={{ cursor: "pointer", float: "right" }}>
                  {local_Strings.BeneficiaryEditButton}
                </a>

                <a
                  href="#"
                  className="row align-items-center"
                  onClick={() => setFormAttributes({
                    selectedItem: item,
                    showForm: true,
                    showEditable: false
                  })}
                >
                  <div className="col-12 col-sm-12">
                    <div className="mb-1 d-flex align-items-center">
                      <img src={dateIcon} className="img-fluid" />
                      <span className="mx-1 text-15 color-light-gold">
                        {item.createdDate
                          ? moment(item.createdDate).format("dddd DD MM YYYY")
                          : ""}
                      </span>
                    </div>
                    <h6 className="mb-1 text-600">
                      {local_Strings.ProductsAndOffersListingNameLabel + " " +
                        (auth.language === "en" ? item.name : item.nameAr)}
                    </h6>
                    <div className="text-15">
                      {local_Strings.NotificationsExpireLabel +  " " + (item.expiryDate
                        ? moment(item.expiryDate).format("DD-MM-YYYY")
                        : "")}
                    </div>
                  </div>
                </a>

              </li>
            )}

        </ul>
      </div>
      <ProductsAndOffersForm
        item={formAttributes.selectedItem}
        show={formAttributes.showForm}
        editable={formAttributes.showEditable}
        OnHide={() => setFormAttributes({
          ...formAttributes, showForm: false
        })
        }
        OnBack={() => setFormAttributes({
          ...formAttributes, showForm: false
        })
        }
        refreshList={() => refreshList()}
      />
    </div>
  );
}

export default ProductsAndOffersListing;
