import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMember, removeMember } from "../store/thunks/memberThunk";
import { useThunk } from "../hooks/use-thunk";

import MembersModal from "./MembersModal";
import ReactPaginate from "react-paginate";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Dfooter from "./Dfooter";

function Members() {
  const [doFetchMemberr, isLoadingMember, loadingMemberError] =
    useThunk(fetchMember);
  const members = useSelector((state) => state.members.data.members);
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  useEffect(() => {
    doFetchMemberr();
  }, [doFetchMemberr, dispatch]);

  const hundelRemove = (id) => {
    dispatch(removeMember({ id }));
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
      {show && <MembersModal setShow={setShow} />}
      {showEdit && (
        <MembersModal setShowEdit={setShowEdit} editData={editData} />
      )}
      <div className="table">
        <div className="table-heading-container">
          <p className="table-heading">نام</p>
          <p className="table-heading">نام فامیلی</p>
          <p className="table-heading">سن</p>
          <p className="table-heading">شماره تماس</p>
          <p className="table-heading">ایمیل</p>
          <p className="table-heading">اکشن</p>
        </div>
        {/* <tbody> */}
        {content}
        {/* {membersToDisplay?.map((member) => (
            <tr key={member.id}>
              <td>{member["first-name"]}</td>
              <td>{member["last-name"]}</td>
              <td>{member.age}</td>
              <td>{member.phone}</td>
              <td>{member.email}</td>
              <td className="actions">
                <p
                  className="edit-btn"
                  onClick={() => {
                    setShowEdit(true);
                    setEditData(member);
                  }}
                >
                  <BiEdit />
                </p>
                {showEdit && (
                  <MembersModal setShowEdit={setShowEdit} editData={editData} />
                )}
                <p
                  className="delete-btn"
                  onClick={() => hundelRemove(member.id)}
                >
                  <RiDeleteBin6Line />
                </p>
              </td>
            </tr>
          ))}
        </tbody> */}
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
