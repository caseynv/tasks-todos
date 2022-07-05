import { Icon } from "@iconify/react";
import Taskform from "./Taskform";
import Editform from "./Editform";


import { useSelector, useDispatch } from "react-redux";
import { show } from "./Features/slices/visibleSlice";
import { addCount } from "./Features/slices/countSlice";
import { editshow, gettodo } from "./Features/slices/crudSlice";



const Header = () => {
  const count = useSelector((state) => state.counter.value);
  const vvisible = useSelector((state) => state.visible.value);
  const editit = useSelector((state) => state.todos.openform);

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.details);
  const open = useSelector((state) => state.todos.isOpen);
  const alltodo = useSelector((state) => state.todos.detailtodo);
  
  console.log(alltodo, 'and', todos.id)
  return (
    <>

      <div className="w-full h-screen static top self-center my-4">
        <div className="flex w-full justify-center">
          <div className="mr-16">
            Task <span className="text-gray-400">{count}</span>
          </div>
          <button
            className="ml-16 p-2 border-solid border-black border-2"
            onClick={() => {
              dispatch(show());
              dispatch(addCount());
            }}
          >
            <Icon icon="akar-icons:plus" />
          </button>
        </div>
        <div>{vvisible ? <Taskform /> : null}</div>
        <div>{editit ? <Editform /> : null}</div>
        <>
          {open &&
              (<div
                className="absolute bottom-0 pt-2 flex justify-center h-32 w-screen"
              >
                
                <div className="h-12">
                  <img
                    className="h-12"
                    src={todos.assigned_user_icon}
                    alt="profile pic"
                  />
                </div>

                <div className="ml-6">
                  <p className="font-extrabold text-lg">{todos.task_msg}</p>
                  <p className="text-red-700 text-lg">
                    {todos.inbox_display_date}
                  </p>
                </div>

                <div className="ml-32">
                  <button
                    className="p-4 border-solid border-black border-2"
                    onClick={() => {
                      dispatch(editshow());
                      dispatch(gettodo(todos.id));
                    }}
                  >
                    <Icon icon="icon-park-outline:write" />
                  </button>
                  <button className="p-4 border-solid mx-2 border-black border-2">
                    <Icon icon="fluent:alert-snooze-12-filled" />
                  </button>
                  <button className="p-4 border-solid border-black border-2">
                    <Icon icon="charm:tick" />
                  </button>
                </div>
              </div>)
            }
        </>
      </div>
    </>
  );
};

export default Header;
