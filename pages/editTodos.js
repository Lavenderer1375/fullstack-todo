import { useRouter } from "next/router";
import EditTodosPage from "@/components/templates/EditTodosPage";

const EditTodos = () => {
  const router = useRouter();
  const { id, title, details, status } = router.query;

  return (
    <EditTodosPage id={id} title={title} details={details} status={status} />
  );
};

export default EditTodos;
