import AddTodoPage from "@/components/templates/AddTodoPage";
import { getToken } from "next-auth/jwt";

const AddTodo = () => {
  return <AddTodoPage />;
};

export default AddTodo;

export async function getServerSideProps({ req }) {
  const token = await getToken({ req });

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
