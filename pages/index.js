import HomePage from "@/components/templates/HomePage";
import { getToken } from "next-auth/jwt";
import { redirect } from "next/dist/server/api-utils";

const Home = () => {
  return (
    <div className="container">
      <HomePage />
    </div>
  );
};

export default Home;

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
