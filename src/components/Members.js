import { useEffect, useState } from "react";
import {
  useFetchMembersQuery,
  useRemoveMemberMutation,
} from "../store/slices/memberApi";
import MembersModal from "./MembersModal";
import ReactPaginate from "react-paginate";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Dfooter from "./Dfooter";

function Members() {
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState();
  const [message, setMessage] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const hideModal = () => {
    setShowSuccess(false);
  };

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(hideModal, 3000); // hide the modal after 3 seconds
      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  const {
    data: members,
    isLoading: isLoadingMember,
    error: loadingMemberError,
    refetch,
  } = useFetchMembersQuery();
  const [removeMember] = useRemoveMemberMutation();

  const hundelRemove = async (id) => {
    try {
      await removeMember({ id }).unwrap();
      refetch();
    } catch (err) {
      console.error("Error removing team:", err);
    }
  };
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const membersToDisplay = members?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  let content;
  if (isLoadingMember) {
    content = (
      <div className="table-row">
        <div>
          <p className="table-data">در حال بارگذاری</p>
        </div>
      </div>
    );
  } else if (loadingMemberError) {
    content = (
      <div className="table-row">
        <div>
          <p className="table-data">خطا در بارگذاری</p>
        </div>
      </div>
    );
  } else {
    content = membersToDisplay?.map((member) => (
      <div className="table-row" key={member.id}>
        <p className="table-data">{member["first-name"]}</p>
        <p className="table-data">{member["last-name"]}</p>
        <p className="table-data">{member.age}</p>
        <p className="table-data">{member.phone}</p>
        <p className="table-data">{member.email}</p>
        <div className="actions table-data">
          <span
            className="edit-btn"
            onClick={() => {
              setShowEdit(true);
              setEditData(member);
            }}
          >
            <BiEdit />
          </span>

          <span className="delete-btn" onClick={() => hundelRemove(member.id)}>
            <RiDeleteBin6Line />
          </span>
        </div>
      </div>
    ));
  }

  return (
    <div className="list-main" dir="rtl">
      <h1 className="header_text">اعضا</h1>
      <button className="add-btn" onClick={() => setShow(true)}>
        جدید
      </button>
      {show && (
        <MembersModal
          setMessage={setMessage}
          setShowSuccess={setShowSuccess}
          setShow={setShow}
        />
      )}
      {showEdit && (
        <MembersModal
          setMessage={setMessage}
          setShowSuccess={setShowSuccess}
          setShowEdit={setShowEdit}
          editData={editData}
        />
      )}
      {showSuccess && <div className="success">{message}</div>}
      <div className="table">
        <div className="table-heading-container">
          <p className="table-heading">نام</p>
          <p className="table-heading">نام فامیلی</p>
          <p className="table-heading">سن</p>
          <p className="table-heading">شماره تماس</p>
          <p className="table-heading">ایمیل</p>
          <p className="table-heading">اکشن</p>
        </div>
        {content}
      </div>
      <ReactPaginate
        previousLabel={"قبلی"}
        nextLabel={"بعدی"}
        breakLabel={"..."}
        pageCount={Math.ceil(members?.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <Dfooter />
    </div>
  );
}

export default Members;
