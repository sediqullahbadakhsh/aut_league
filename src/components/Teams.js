import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam, removeTeam } from "../store/thunks/teamThunk";
import { useThunk } from "../hooks/use-thunk";
import TeamsModal from "./TeamsModal";
import ViewTeam from "./ViewTeam";
import ReactPaginate from "react-paginate";
import { BiEdit } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import Dfooter from "./Dfooter";

function Teams() {
  const dispatch = useDispatch();

  const [doFetchTeam, isLoadingTeam, loadingTeamError] = useThunk(fetchTeam);
  const [doRemoveTeam, isLoadingRemoveTeam, loadingRemoveTeamError] =
    useThunk(removeTeam);
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [viewTeam, setViewTeam] = useState(false);
  const [editData, setEditData] = useState();
  const [viewData, setViewData] = useState();
  const [message, setMessage] = useState("");
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

  const teams = useSelector((state) => state.teams.data.teams);
  useEffect(() => {
    doFetchTeam();
  }, [doFetchTeam, message]);

  const handleRemove = (id) => {
    dispatch(removeTeam({ id }));
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const teamsToDisplay = teams?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  let content;
  if (isLoadingTeam) {
    content = (
      <div className="table-row">
        <div>
          <p className="table-data">در حال بارگذاری</p>
        </div>
      </div>
    );
  } else if (loadingTeamError) {
    content = (
      <div className="table-row">
        <div>
          <p className="table-data">خطا در بارگذاری</p>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="table-body">
        {teamsToDisplay?.map((team) => (
          <div className="table-row" key={team.id}>
            <p className="table-data">{team.id}</p>
            <p className="table-data">{team.name}</p>
            {team.category === 1 ? (
              <p className="table-data">شبه سازی</p>
            ) : (
              <p className="table-data">فزیکی</p>
            )}
            <p className="table-data">{team.phone}</p>
            <p className="table-data">{team.address}</p>
            <div className="actions table-data">
              <span
                className="view-btn"
                onClick={() => {
                  setViewTeam(true);
                  setViewData(team);
                }}
              >
                <AiFillEye />
              </span>

              <span
                className="edit-btn"
                onClick={() => {
                  setShowEdit(true);
                  setEditData(team);
                }}
              >
                <BiEdit />
              </span>

              <span
                className="delete-btn"
                onClick={() => handleRemove(team.id)}
              >
                <RiDeleteBin6Line />
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="list-main" dir="rtl">
      <h1 className="header_text">تیم ها</h1>
      <button className="add-btn" onClick={() => setShow(true)}>
        جدید
      </button>
      {show && (
        <TeamsModal
          setMessage={setMessage}
          setShowSuccess={setShowSuccess}
          setShow={setShow}
        />
      )}
      {viewTeam && (
        <ViewTeam
          setMessage={setMessage}
          setShowSuccess={setShowSuccess}
          viewData={viewData}
          setViewTeam={setViewTeam}
        />
      )}
      {showEdit && (
        <TeamsModal
          setMessage={setMessage}
          setShowSuccess={setShowSuccess}
          setShowEdit={setShowEdit}
          editData={editData}
        />
      )}
      {showSuccess && <div className="success">{message}</div>}

      <div className="table">
        <div className="table-heading-container">
          <p className="table-heading">شناسه</p>
          <p className="table-heading">نام</p>
          <p className="table-heading">دسته بندی</p>
          <p className="table-heading">تلفن</p>
          <p className="table-heading">آدرس</p>
          <p className="table-heading">اکشن</p>
        </div>
        {content}
      </div>
      <ReactPaginate
        previousLabel={"قبلی"}
        nextLabel={"بعدی"}
        breakLabel={"..."}
        pageCount={Math.ceil(teams && teams.length / itemsPerPage)}
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

export default Teams;
