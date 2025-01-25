import Link from "next/link";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { RiMastodonLine } from "react-icons/ri";

const Tasks = ({ data, next, back, fetchTodos }) => {
  const changeStatus = async (id, status) => {
    try {
      const res = await fetch("/api/todos", {
        method: "PATCH",
        body: JSON.stringify({ id, status }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.status === "Success") {
        fetchTodos();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="tasks">
      {data?.map((i) => (
        <div key={i._id} className="tasks__card">
          <span className={i.status}></span>
          <RiMastodonLine />
          <h4>{i.title}</h4>
          <h3>{i.details}</h3>
          <button>
            <Link
              href={{
                pathname: "/editTodos",
                query: { id: i._id, title: i.title, details: i.details, status: i.status },
              }}
            >
              Edit
            </Link>
          </button>
          <div>
            {back ? (
              <button
                className="button-back"
                onClick={() => changeStatus(i._id, back)}
              >
                <BiLeftArrow />
                Back
              </button>
            ) : null}
            {next ? (
              <button
                className="button-next"
                onClick={() => changeStatus(i._id, next)}
              >
                Next
                <BiRightArrow />
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
