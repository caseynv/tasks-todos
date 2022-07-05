import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { hide } from "./Features/slices/visibleSlice";
import { edittodo, deletetodo, setOpen } from "./Features/slices/crudSlice";
import { useState } from "react";


function Editform() {

  //const id = props.id;
  const [Error, setError] = useState("");
  const [Assignee, setAssignee] = useState("");
  const [descript, setDescript] = useState("");
  const [toDate, setToDate] = useState("");
  const [totime, setToTime] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.details);
  

  let dt = new window.Date();
  let secs = dt.getSeconds() + 60 * dt.getMinutes() + 60 * 60 * dt.getHours();
  const UTCTimeZone = Math.floor(secs);

  let hms = totime;
  let a = hms.split(":");
  let sec = +a[0] * 60 * 60 + +a[1] * 60;

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!toDate || !totime || !Assignee || !descript) {
      setError("Please fill all the fields");
    }else{
    dispatch(
      edittodo({
        task_id: todos.id,
        Description: descript,
        todate: toDate,
        totime: sec,
        Assignee: Assignee,
        is_completed: Math.floor(Math.random() * 2),
        timeZone: UTCTimeZone,
      })
    );
    dispatch(hide());
    dispatch(setOpen());}
  };

  const handledelete = (e) => {
    e.preventDefault();
    if (!toDate && !totime && !Assignee && !descript) {
      setError("Please fill all the fields");
      return;
    }else{
      
    dispatch(
      deletetodo({
        task_id: todos.id,
      })
    );
    dispatch(hide());
    dispatch(setOpen());
  }
};

  return (
    <>
      <div className="w-full h-3/4 flex justify-center mt-4">
        <div>
          {Error && (
            <div className="rounded py-4 mt-4 w-full px-4 bg-red-300 text-black font-semibold">
              {Error}
            </div>
          )}
          <form className="w-full p-8 bg-emerald-50 max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor=""
                >
                  Task Description
                </label>
                <input
                  className="appearance-none block text-gray-700 w-full border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="task_msg"
                  type="text"
                  placeholder="Follow up"
                  onChange={(e) => setDescript(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor=""
                >
                  Date
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="date"
                  name="task_date"
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor=""
                >
                  Time
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="time"
                  name="task_time"
                  onChange={(e) => setToTime(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor=""
                >
                  Assign User
                </label>
                <select
                  className="p-4"
                  name="assigned_user"
                  onClick={(e) => setAssignee(e.target.value)}
                >
                  <option value="Sundar Pichai">Sundar Pichai</option>
                  <option value="Saravanan C">Saravanan C</option>
                </select>
              </div>
            </div>
          </form>
          <div className="flex justify-between bg-emerald-50 pl-8 pt-2 pb-6">
            <div className="mt-2" onClick={handledelete}>
              <Icon
                icon="fluent:delete-28-filled"
                color="gray"
                width="28"
                height="28"
              />
            </div>

            <div className="flex">
              <button
                onClick={() => {
                  dispatch(hide());
                }}
              >
                Cancel
              </button>

              <button
                className="ml-12 mr-8 py-4 px-8 text-white rounded bg-emerald-500"
                onClick={handlesubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editform;
