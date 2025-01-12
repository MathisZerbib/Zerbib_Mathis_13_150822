import { React, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../components/Footer";
import Profile from "../../components/Profile";
import { userActions } from "../../_store";

import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";

function User() {
  const dispatch = useDispatch();

  // Modale
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const currentUser = useSelector((state) => state.profile.user);

  const getUsers = useCallback(async () => {
    return await dispatch(userActions.profile());
  }, [dispatch]);

  useEffect(() => {
    getUsers();
  });

  return (
    <div>
      <main className="main bg-dark-custom">
        <div className="header">
          <h1>
            Welcome back
            {currentUser &&
            currentUser?.body.length > 0 &&
            (currentUser !== undefined || null) ? (
              <>Loading data</>
            ) : (
              <>
                <pre>
                  {currentUser?.body.firstName} {currentUser?.body.lastName}
                </pre>
              </>
            )}
          </h1>
          <button className="button edit-button" onClick={handleShow}>
            Edit Name
          </button>
        </div>
        <div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modify Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Profile
                close={handleClose}
                firstName={currentUser?.body.firstName}
                lastName={currentUser?.body.lastName}
              />
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="button  transaction-button">
              View transactions
            </button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="button  transaction-button">
              View transactions
            </button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="button  transaction-button">
              View transactions
            </button>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default User;
