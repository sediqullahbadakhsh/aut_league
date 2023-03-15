import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeam, removeTeam } from "../store/thunks/teamThunk";
import TeamsModal from "./TeamsModal";
import ViewTeam from "./ViewTeam";
import ReactPaginate from "react-paginate";
import { BiEdit } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

function Teams() {
  const teams = useSelector((state) => state.teams.data.teams);
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [viewTeam, setViewTeam] = useState(false);
  const [editData, setEditData] = useState();
  const [viewData, setViewData] = useState();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch, fetchTeam]);

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

  return (
    <div className="list-main" dir="rtl">
      <h1 className="header_text">تیم ها</h1>
      <button className="add-btn" onClick={() => setShow(true)}>
        جدید
      </button>
      {show && <TeamsModal setShow={setShow} />}
      <div>
        <div className="heading"></div>
        <div className="data"></div>
      </div>
      <table>
        <thead>
          <tr>
            <th>شناسه</th>
            <th>نام</th>
            <th>دسته بندی</th>
            <th>تلفن</th>
            <th>آدرس</th>
            <th>اکشن</th>
          </tr>
        </thead>
        <tbody>
          {teamsToDisplay?.map((team) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              {team.category === 1 ? <td>شبه سازی</td> : <td>فزیکی</td>}
              <td>{team.phone}</td>
              <td>{team.address}</td>
              <td className="actions">
                <p
                  className="view-btn"
                  onClick={() => {
                    setViewTeam(true);
                    setViewData(team);
                  }}
                >
                  <AiFillEye />
                </p>
                {viewTeam && (
                  <ViewTeam viewData={viewData} setViewTeam={setViewTeam} />
                )}
                <p
                  className="edit-btn"
                  onClick={() => {
                    setShowEdit(true);
                    setEditData(team);
                  }}
                >
                  <BiEdit />
                </p>
                {showEdit && (
                  <TeamsModal setShowEdit={setShowEdit} editData={editData} />
                )}
                <p className="delete-btn" onClick={() => handleRemove(team.id)}>
                  <RiDeleteBin6Line />
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
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
    </div>
  );
}

export default Teams;
