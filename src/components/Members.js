import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMember, removeMember } from "../store/thunks/memberThunk";
import MembersModal from "./MembersModal";
import ReactPaginate from "react-paginate";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Dfooter from "./Dfooter";

function Members() {
  const members = useSelector((state) => state.members.data.members);
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  useEffect(() => {
    dispatch(fetchMember());
  }, []);
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

  return (
    <div className="list-main" dir="rtl">
      <h1 className="header_text">اعضا</h1>
      <button className="add-btn" onClick={() => setShow(true)}>
        افزودن عضو
      </button>
      {show && <MembersModal setShow={setShow} />}
      <div>
        <div className="heading"></div>
        <div className="data"></div>
      </div>
      <table>
        <thead>
          <tr>
            <th>نام</th>
            <th>نام فامیلی</th>
            <th>سن</th>
            <th>شماره تماس</th>
            <th>ایمیل</th>
            <th>اکشن</th>
          </tr>
        </thead>
        <tbody>
          {membersToDisplay?.map((member) => (
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
        </tbody>
      </table>
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
